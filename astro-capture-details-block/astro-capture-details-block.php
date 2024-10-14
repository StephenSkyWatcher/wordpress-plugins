<?php
/**
 * Plugin Name:       Astro Capture Details Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       astro-capture-details-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_astro_capture_details_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_astro_capture_details_block_block_init' );

function register_layout_category( $categories ) {
    $categories[] = array(
        'slug'  => 'astronomy',
        'title' => 'Astronomy',
    );
    return $categories;
}

if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
    add_filter( 'block_categories_all', 'register_layout_category' );
} else {
    add_filter( 'block_categories', 'register_layout_category' );
}

// add_filter( 'wp_headers', 'send_cors_headers', 11, 1 );
// function send_cors_headers( $headers ) {
//     $headers['Access-Control-Allow-Origin'] = $_SERVER[ 'HTTP_ORIGIN' ];
//     return $headers;
// }

add_filter('http_request_timeout', function($timeout, $url = '') {
    $start_with = 'https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astrometry';
    $timeout = is_string($url) && strncmp($url, $start_with, strlen($start_with)) === 0
        ? 300 // TODO: set appropriate timeout
        : $timeout;
    
    if ($timeout >= 300) { // TODO: set an appropriate time limit based on what the host allows
        @set_time_limit(300 + 10);   // raise PHP execution time limit, @ suppresses errors, to prevent PHP errors and allow the site to work,
                                    // albeit with possibility of timing out and aborting further PHP execution.
    } 
    
    return $timeout; 
}, 10, 2);


/////==============================================

function find_astro_object() {
    function astro_callback($data) {
        $queryParams = $data->get_body();

        $params = json_decode(str_replace('request-json=', '', urldecode($queryParams)), true);

        $catalog_raw = file_get_contents('messier-catalog.json');
        $catalog = json_decode($catalog_raw, true); // decode the JSON into an associative array

        $found = null;

        foreach ($catalog as $item) {
            if ($item['messier'] === $params['designation']) {
                $found = $item;
                break;
            }
        }

        if ($found) {
            return $found;
        }

        return null;

    }

    register_rest_route(
        'astro-capture-details-block/v1',
        '/astronomy/catalog/messier',
        array(
            'methods'             => 'POST',
            'callback'            => 'astro_callback',
            'permission_callback' => function() {
                return true; // is_user_logged_in();
            },
        )
    );
}

function astrometry() {
    function astrometry_callback($data) {
        
        $queryParams = $data->get_body();
        
        $wcsinfo_exists = shell_exec("command -v wcsinfo");
        $solvefield_exists = shell_exec("command -v solve-field");

        if (!$wcsinfo_exists || !$solvefield_exists) {
            return new WP_Error(
                'error',
                'Astrometry tools not installed',
                [ 'wcsinfo' => $wcsinfo_exists, 'solve-field' => $solvefield_exists]
            );
        }
        
        $params = json_decode(str_replace('request-json=', '', urldecode($queryParams)), true);

        $filepath = preg_replace('/\.\w+$/', '', str_replace('https://www.stephenskywatcher.com/', '', $params['url']));
        $filename = end(explode('/', $filepath));

        $wcs_file = "/var/www/html/solves/".$filepath."/".$filename.".wcs";
        $mkdir = shell_exec("mkdir -p /var/www/html/solves/".$filepath);
        
        $solved = shell_exec("test -e ".$wcs_file." && echo 1 || echo 0");

        function getwcs($wcs_file, $annotated_file) {

            $wcs_raw=shell_exec("wcsinfo ".$wcs_file);

            $wcs_array = preg_split("/\r\n|\n|\r/", $wcs_raw);
    
            $wcs = new StdClass();
    
            foreach ($wcs_array as $item) {
                $pieces = explode(" ", $item);
                if ($pieces[0] && $pieces[1]) {
                    $wcs->{$pieces[0]} = $pieces[1];
                }
            }

            $wcs->{'annotated'} = str_replace("/var/www/html/", '/', $annotated_file);

            return $wcs;
        }
        
        
        $src_annotated_file = "/var/www/html/solves/".$filepath."/".$filename."-annotated.png";
        $dest_annotated_file = "/var/www/html/".$filepath."-annotated.png";

        if ($solved === "1") {
            return getwcs($wcs_file, $dest_annotated_file);            
        }

        $message=shell_exec("
            cd /var/www/html/solves/".$filepath." && \
            /usr/local/astrometry/bin/solve-field \
                --scale-low 0.1 \
                --scale-high 180.0 \
                --scale-units degwidth \
                --downsample 2 \
                --use-wget \
                --overwrite \
                --skip-solved ".$params['url']."\
        ");

        $annotate=shell_exec("
            cd /var/www/html/solves/".$filepath." && \
            plot-constellations \
            -N \
            -C \
            -B \
            -j \
            -w ".$wcs_file." \
            -f 24 \
            -o "."/var/www/html/solves/".$filepath."/".$filename."-annotated.png"."\
        ");

        shell_exec("cp ".$src_annotated_file." ".$dest_annotated_file);

        return getwcs($wcs_file, $dest_annotated_file);  
        // return array("solving" => true, 'solved' => $solved === "1");
    }

    register_rest_route(
        'astro-capture-details-block/v1',
        '/astrometry',
        array(
            'methods'             => 'POST',
            'callback'            => 'astrometry_callback',
            'permission_callback' => function() {
                return true; // is_user_logged_in();
            },
        )
    );
}

add_action( 'rest_api_init', "astrometry" );
add_action( 'rest_api_init', "find_astro_object" );
/////==============================================



    /*
        $queryParams = $data->get_body();
        $params = json_decode(str_replace('request-json=', '', urldecode($queryParams)), true);

        $image_url = $params['image_url'];
        $session = $params['session'];
    */
    // function proxy_astrometry_status_callback( $data ) {
    //     $queryParams = $data->get_body();
    //     $params = json_decode(str_replace('request-json=', '', urldecode($queryParams)), true);

    //     $options = array(
    //         'method' => 'POST',
    //         'headers'  => array('Content-Type' => 'application/x-www-form-urlencoded;charset=UTF-8'),
    //         // 'body' => 'request-json=%7B%22session%22%3A%22'.$params['session'].'%22%7D',
    //         // 'body' => 'request-json=%7B%22session%22%3A%22eu7s961nhis3um9izuwxbg867quwl1zg%22%7D',
    //         // eu7s961nhis3um9izuwxbg867quwl1zg
            
    //         // 'body' => urlencode('request-json={"session":"1didjg2lo0z9mikmizt4shgt9yw6qmup"}')
    //         // 'body' => urlencode('request-json=' . json_encode({'session' => $params['session']}))
    //         // 'body' => 'request-json=' . urlencode(json_encode({'session' => $params['session']}))
    //         'body' => 'request-json=' . urlencode(json_encode(array('session' => $params['session'])))
    //     );

    //     $info_url = $GLOBALS['astrometry_api_url'].'/jobs/'.$params['job_id'].'/info';

    //     $result = wp_remote_post($info_url, $options);

    //     if ( (is_wp_error($result))) {
    //         return new WP_Error(
    //             'error',
    //             'Error in response from Astrometry',
    //             [ 'input' => $data, 'options' => $options, 'url' => $info_url, 'result' => $result, 'session' => $params['session']]
    //         );
    //     }

    //     return new WP_REST_Response( json_decode( $result['body'] ) );
    // }
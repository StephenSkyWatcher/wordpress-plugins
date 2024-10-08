<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

	// if (!function_exists('Curl')) {

	// 	function Curl($url, $content)
	// 		{
	// 			$curl = curl_init($url);
	// 			curl_setopt($curl, CURLOPT_HEADER, false);
	// 			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	// 			curl_setopt($curl, CURLOPT_POST, true);
	// 			curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

	// 			$result = curl_exec($curl);

	// 			curl_close($curl);

	// 			return $result;
	// 		} 
	// }

 	// $l_res = json_decode(Curl("https://nova.astrometry.net/api/login",'request-json={"apikey": "bniwqrhwabqktjoi"}'), false);
	// $login_res = get_object_vars($l_res);
	// $res = get_object_vars($loginResponse);

	// $detailsResponse = json_decode(Curl("https://nova.astrometry.net/api/jobs/11594286/info/",'request-json={"session": "'.$login_res['session'].'"}'), false);
		
	// echo "<h4>Objects in Photo</h4>";
	// echo '<ul>';
	// foreach (get_object_vars($detailsResponse)['objects_in_field'] as $obj ) {
	// 	echo "<li>".$obj.'</li>';
	// }
	// echo '</ul>';

	// echo "<h4>Machine Tags</h4>";
	// echo '<ul>';
	// foreach (get_object_vars($detailsResponse)['machine_tags'] as $obj ) {
	// 	echo "<li>".$obj.'</li>';
	// }
	// echo '</ul>';

	// echo "<h4>Tags</h4>";
	// echo '<ul>';
	// foreach (get_object_vars($detailsResponse)['tags'] as $obj ) {
	// 	$exploded_obj = explode("(", $obj)[0];
	// 	$obj_label = str_replace(")", "", $exploded_obj);
	// 	echo "<li><a href='https://nova.astrometry.net/user_images/tag?query=".rawurlencode($obj)."' target='_blank'>".$obj_label.'</a></li>';
	// }
	// echo '</ul>';

	// echo '<img src="http://nova.astrometry.net/annotated_display/11594286"/>';
	// echo '<img src="http://nova.astrometry.net/annotated_full/11594286"/>';

	// echo "<h4>calibration</h4>";
	// echo '<ul>';
	// foreach (get_object_vars($detailsResponse)['calibration'] as $obj ) {
	// 	echo "<li>".$obj.'</li>';
	// }
	// echo '</ul>';


	// echo "<h4>original_filename</h4>";
	// echo "<p>".get_object_vars($detailsResponse)['original_filename']."</p>";


	// echo "<h4>status</h4>";
	// echo "<p>".get_object_vars($detailsResponse)['status']."</p>";

	// print_r($detailsResponse['machine_tags']);
	// print_r($detailsResponse['tags']);
	// print_r($detailsResponse['status']);
	// print_r($detailsResponse['original_filename']);
	// print_r($detailsResponse['calibration']);


	if (!function_exists('delimited_array')) {
		function delimited_array($arr, $link="", $tag="p", $delimiter=", ") {
			foreach ($arr as $i=>$frame) {
				if ($link) {

					$url_component = strtolower(str_replace(" ", "-", $frame));

					$link_str = $link.$url_component;

					echo "<a href='$link_str' style='text-decoration: none;'>$frame</a>";
				} else if ($tag) {
					echo "<$tag>$frame</$tag>";
				} else {
					echo $frame;
				}

				if (++$i !== count($arr)) { echo $delimiter; }
			}
		}
	}

	if (!function_exists('getTotalIntegrationTime')) {
		function getTotalIntegrationTime($frames, $duration) {
			$total_sec = $frames * $duration;
			$integration_hours = floor($total_sec / 3600);
			$integration_min = floor($total_sec / 60 % 60);
			$integration_sec = floor($total_sec % 60);
			return $integration_hours.'h '.$integration_min.'\' '.$integration_sec.'"';
		}
	}

	$capture_start_date = get_field('capture_start_date');
	$calibration_frames = get_field('calibration_frames');
	// $ra_center_hour = get_field('ra_center_hour');
	// $ra_center_min = get_field('ra_center_min');
	// $ra_center_sec = get_field('ra_center_sec');
	// $dec_center_deg = get_field('dec_center_deg');
	// $dec_center_min = get_field('dec_center_min');
	// $dec_center_sec = get_field('dec_center_sec');
	$ra_center_hour = $attributes['ra_center_h'];
	$ra_center_min = $attributes['ra_center_m'];
	$ra_center_sec = $attributes['ra_center_s'];
	$dec_center_sign = $attributes['dec_center_sign'];
	$dec_center_deg = $attributes['dec_center_d'];
	$dec_center_min = $attributes['dec_center_m'];
	$dec_center_sec = $attributes['dec_center_s'];	
	$pixel_scale_arcsecpixel = $attributes['pixscale'];
	$orientation = $attributes['orientation_center'];

	$constellation = get_field('constellation');
	$apparent_magnitude = get_field('apparent_magnitude');
	$distance_lya = get_field('distance_lya');
	$size_ly_diameter = get_field('size_ly_diameter');
	$designations = get_field('designations');
	$wiki_link = get_field('wiki_link');
	$bortle_level = get_field('bortle_level');
	
	//
	$iso = get_field('iso');
	$number_of_integration_frames = get_field('number_of_integration_frames');
	$light_frame_exposure_time = get_field('light_frame_exposure_time');
	$integrationValue = $number_of_integration_frames.'x '.$light_frame_exposure_time.'" ('.getTotalIntegrationTime($number_of_integration_frames, $light_frame_exposure_time).') @'.$iso;
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="wp-block-create-block-astro-capture-details-block__wrapper wp-block-create-block-astro-capture-details-block__<?php echo $attributes['alignment']; ?>">
		<div class="astro-capture-details-block_image-container">
			<img src="<?php echo $attributes['image']; ?>" />
			<div class="astro-capture-details-block_image" style="background-image: url('<?php echo $attributes['image']; ?>');">
			</div>
		</div>

		<div class="astro-capture-details-block_content">
			<!-- <h5>Status</h5>
			<p><?php echo $res['status']; ?></p>
			<h5>Message</h5>
			<p><?php echo $res['message']; ?></p>
			<h5>Session</h5>
			<p><?php echo $res['session']; ?></p> -->

			<?php if ($capture_start_date) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Capture Date
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $capture_start_date; ?>
							</p>
						</div>
					<?php } ?>

			<!-- COORDINATES -->
			<?php if (($ra_center_hour && $ra_center_min && $ra_center_sec) || ($dec_center_deg && $dec_center_min && $dec_center_sec)) {?>
				<div class="astro-capture-details-group" >
					<div class="astro-capture-details-block" >
						<h6 class="astro-capture-details-block_header">Right Ascension</h6>
						<p class="astro-capture-details-block_value">
						<?php echo $ra_center_hour; ?>h
						<?php echo $ra_center_min; ?>m
						<?php echo $ra_center_sec; ?>s
						</p>
					</div>
					<div class="astro-capture-details-block" >
						<h6 class="astro-capture-details-block_header">
							Declination
						</h6>
						<p class="astro-capture-details-block_value">
							<?php echo $dec_center_sign * $dec_center_deg; ?>°
							<?php echo $dec_center_min; ?>''
							<?php echo $dec_center_sec; ?>"
						</p>
					</div>
				</div>
			<?php } ?>

			<!-- MAGNITUDE & BORTLE LEVEL -->
			<?php if ($apparent_magnitude || $bortle_level) { ?>
				<div class="astro-capture-details-group" >
					<?php if ($apparent_magnitude) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Apparent Magnitude
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $apparent_magnitude; ?>
							</p>
						</div>
					<?php } ?>
					<?php if ($bortle_level) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Bortle Level
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $bortle_level; ?>
								<a href="https://en.wikipedia.org/wiki/Bortle_scale#:~:text=reflector%20is%2015.2-,<?php echo $bortle_level; ?>" target="_blank" style="text-decoration: none">
									<span class="dashicons dashicons-external"></span>
								</a>
							</p>
						</div>
					<?php } ?>
				</div>
			<?php } ?>

			<!-- FRAMES / CALIBRATION -->
			<?php if (($number_of_integration_frames && $light_frame_exposure_time && $iso) || $calibration_frames) {?>
				<div class="astro-capture-details-group" >

					<?php if ($number_of_integration_frames && $light_frame_exposure_time && $iso) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Integration Frames
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $integrationValue; ?>
							</p>
						</div>
					<?php } ?>

					<?php if ($calibration_frames) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Calibration Frames
							</h6>
							<p class="astro-capture-details-block_value">
								<?php delimited_array($calibration_frames, '', 'span', ' ') ?>
							</p>
						</div>
					<?php } ?>
				</div>
			<?php } ?>

			<!-- PIXEL SCALE & ORIENTATION -->
			<?php if ($pixel_scale_arcsecpixel || $orientation) { ?>
				<div class="astro-capture-details-group" >
					<?php if ($pixel_scale_arcsecpixel) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Arcsec per Pixel
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $pixel_scale_arcsecpixel; ?>
							</p>
						</div>
					<?php } ?>

					<?php if ($orientation) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Orientation
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo 180 - $orientation; ?> degrees E of N
							</p>
						</div>
					<?php } ?>
				</div>
			<?php } ?>

			<?php if ($distance_lya || $size_ly_diameter) { ?>
				<div class="astro-capture-details-group" >
					<?php if ($distance_lya) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Distance (Light Years)
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $distance_lya; ?>
							</p>
						</div>
					<?php } ?>

					<?php if ($size_ly_diameter) { ?>
						<div class="astro-capture-details-block" >
							<h6 class="astro-capture-details-block_header">
								Diameter (Light Years)
							</h6>
							<p class="astro-capture-details-block_value">
								<?php echo $size_ly_diameter; ?>
							</p>
						</div>
					<?php } ?>
				</div>
			<?php } ?>

			<?php if ($designations) { ?>
				<div class="astro-capture-details-block" >
					<h6 class="astro-capture-details-block_header">
						Designations
					</h6>
					<p class="astro-capture-details-block_value">
						<?php echo $designations; ?>
					</p>
				</div>
			<?php } ?>

			<?php if ($constellation) { ?>
				<div class="astro-capture-details-block" >
					<h6 class="astro-capture-details-block_header">
						Constellation
					</h6>
					<p class="astro-capture-details-block_value">
						<?php delimited_array($constellation, 'https://www.stephenskywatcher.com/deep-space-objects/constellations/') ?>
					</p>
				</div>
			<?php } ?>

			<?php if ($wiki_link) { ?>
				<div class="astro-capture-details-block" >
					<h6 class="astro-capture-details-block_header">
						Additional Resource
					</h6>
					<div class="astro-capture-details-block_value">

					<!-- class="wp-block-button__link"  -->
					<a href="<?php echo $wiki_link; ?>" target="_blank" style="text-decoration: none">
						<!-- <span class="stk-button__inner-text"> -->
							Learn More <span class="dashicons dashicons-external"></span>
						<!-- </span> -->
					</a>
				</div>
			<?php } ?>
					
		</div>
	</div>
</div>
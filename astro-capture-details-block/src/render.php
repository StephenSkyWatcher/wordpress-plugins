<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php
		$image = $attributes['image'];
		$designation = $attributes['designation'];
		$other_designations = $attributes['other_designations'];
		$bortle = $attributes['bortle'];
		$annotated_image = $attributes['annotated_image'];
		$solved = $attributes['solved'];
		$primary_camera = $attributes['primary_camera'];
		$guide_camera = $attributes['guide_camera'];
		$flats = $attributes['flats'];
		$darks = $attributes['darks'];
		$biases = $attributes['biases'];
		$ra_center = $attributes['ra_center'];
		$dec_center = $attributes['dec_center'];
		$ra_center_h = $attributes['ra_center_h'];
		$ra_center_m = $attributes['ra_center_m'];
		$ra_center_s = $attributes['ra_center_s'];
		$dec_center_sign = $attributes['dec_center_sign'];
		$dec_center_d = $attributes['dec_center_d'];
		$dec_center_m = $attributes['dec_center_m'];
		$dec_center_s = $attributes['dec_center_s'];
		$orientation_center = $attributes['orientation_center'];
		$pixscale = $attributes['pixscale'];
		$fieldw = $attributes['fieldw'];
		$fieldh = $attributes['fieldh'];
		$fieldunits = $attributes['fieldunits'];
		$magnitude = $attributes['magnitude'];
		$surfaceBrightness = $attributes['surfaceBrightness'];
		$arcmin = $attributes['arcmin'];
		$distance = $attributes['distance'];
		$constellation = $attributes['constellation'];
		$season = $attributes['season'];
		$objectType = $attributes['objectType'];
	?>

	<div class="main-image-wrapper">
		<aside class="image-actions">
			<div class="annotation-checkbox">
				<label class="astro-checkbox">
					<span class="astro-checkbox-name"></span>
					<input class="astro-checkbox-checkbox" id="mainImageToggle" type="checkbox" hidden/>
					<span class="astro-checkbox-toggle"></span>
				</label>
			</div>
			<div>
				<a href="<?php echo $image ?>" target="_blank" class="astro-button">Full Size</a>
			</div>
		</aside>
		<div style="position: relative;">
			<img id="main_image" class="regular-image" src="<?php echo $image ?>" width="100%" />
			<img id="annotated_image" class="annotated-image hidden" src="<?php echo $annotated_image ?>" width="100%" />
		</div>
	</div>

	<div>
		<ul>
			<li>Designation: <?php echo $designation ?></li>
			<li>Other Designations: <?php echo $other_designations ?></li>
			<li>Bortle Scale: <?php echo $bortle ?></li>
			<li>Solved: <?php echo $solved ?></li>
			<li>Primary Camera: <?php echo $primary_camera ?></li>
			<li>Guide Camera: <?php echo $guide_camera ?></li>
			<li>Flats: <?php echo $flats ?></li>
			<li>Darks: <?php echo $darks ?></li>
			<li>Biases: <?php echo $biases ?></li>
			<li>RA Center: <?php echo $ra_center ?>h <?php echo $ra_center_m ?>m <?php echo $ra_center_s ?>s</li>
			<li>Dec Center: <?php echo $dec_center_sign ?><?php echo $dec_center_d ?>° <?php echo $dec_center_m ?>' <?php echo $dec_center_s ?>"</li>
			<li>Orientation Center: <?php echo $orientation_center ?></li>
			<li>Pixscale: <?php echo $pixscale ?></li>
			<li>Field Width: <?php echo $fieldw ?></li>
			<li>Field Height: <?php echo $fieldh ?></li>
			<li>Field Units: <?php echo $fieldunits ?></li>
			<li>Magnitude: <?php echo $magnitude ?></li>
			<li>Surface Brightness: <?php echo $surfaceBrightness ?></li>
			<li>Angular Size: <?php echo $arcmin ?> arcmin</li>
			<li>Distance: <?php echo $distance ?></li>
			<li>Constellation: <?php echo $constellation ?></li>
			<li>Season: <?php echo $season ?></li>
			<li>Object Type: <?php echo $objectType ?></li>

		</ul>
	</div>
</div>

<script type="text/javascript">
	const mainImage = document.getElementById('main_image');
	const annotatedImage = document.getElementById('annotated_image');
	const mainImageToggle = document.getElementById('mainImageToggle');

	mainImageToggle.addEventListener('change', function() {
		annotatedImage.classList.toggle('hidden');
	});

</script>

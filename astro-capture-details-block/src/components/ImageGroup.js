import * as React from "react";
import { useState } from "react";
import { MediaPlaceholder } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { get } from "lodash";

const ASTROMETRY_API_URL =
	"https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astrometry";

const ImageGroup = (props) => {
	const { image, annotatedImage, onAnnotate, solved, setSolved } = props;
	
	const [showAnnotated, setShowAnnotated] = useState(false);
	const [solving, setSolving] = useState(false);

	const mediaWrapperClass = [
		"astro-capture-details-media-container",
		image !== "" ? "astro-capture-details-media-container--with-image" : "",
	].join(" ");


	const astrometrySolve = async (url) => {
		setSolving(true);

		let options = { method: "POST", body: JSON.stringify({ url }) };
		const r = await fetch(`${ASTROMETRY_API_URL}`, options);
		const res = await r.json();

		const data = {
			ra_center: parseFloat(res.ra_center) || 0,
			dec_center: parseFloat(res.dec_center) || 0,
			ra_center_h: parseFloat(res.ra_center_h) || 0,
			ra_center_m: parseFloat(res.ra_center_m) || 0,
			ra_center_s: parseFloat(res.ra_center_s) || 0,
			dec_center_sign: parseFloat(res.dec_center_sign) || 1,
			dec_center_d: parseFloat(res.dec_center_d) || 0,
			dec_center_m: parseFloat(res.dec_center_m) || 0,
			dec_center_s: parseFloat(res.dec_center_s) || 0,
			orientation_center: parseFloat(res.orientation_center),
			pixscale: parseFloat(res.pixscale),
			fieldw: parseFloat(res.fieldw),
			fieldh: parseFloat(res.fieldh),
			fieldunits: res.fieldunits,
			annotated: res.annotated,
		};

		return data
	};

	const onSelectMedia = media => {
		setSolved(false);

		const handler = async () => {
			const src =
				get(media, ["sizes", "large", "url"]) ||
				get(media, ["media_details", "sizes", "large", "source_url"]);
	
			const data = await astrometrySolve(src || media.url);
		
			onAnnotate({data, image: src || media.url});
			setSolved(true);
			setSolving(false);
		};

		handler();
	};


	return (
		<div class="astro-capture-details-block_image-container">
			<div class={mediaWrapperClass}>
				{solving && <span class="dashicons dashicons-hourglass"></span>}
				{showAnnotated && annotatedImage && <img src={annotatedImage} class="annotated" alt="Annotated Image" />}
				{image && <img src={image} alt="Main Image" />}
				
				<div
					class="astro-capture-details-block_image"
					style={{
						backgroundImage: `url('${image}')`
					}} 
				>
				</div>
				{solved && (
					<div class="astro-capture-details-overlay">
						<span class="dashicons dashicons-yes-alt"></span> Solved
					</div>
				)}
				
				<div class="stk-block-button is-style-default stk-block">
					<button onClick={() => setShowAnnotated(!showAnnotated)} class={showAnnotated ? "stk-link stk-button stk--hover-effect-darken annotations-btn annotations-btn--active" : "stk-link stk-button stk--hover-effect-darken annotations-btn"}>
						{showAnnotated ? "Hide Annotations" : "Annotate"}
					</button>
				</div>
				
				<MediaPlaceholder
					icon="format-image"
					labels={{ title: __("Main Image")}}
					className="block-image"
					onSelect={onSelectMedia}
					accept="image/*"
					allowedTypes={["image"]}
				/>
			</div>
		</div>
	);
};

export default ImageGroup;
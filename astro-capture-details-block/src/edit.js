import * as React from "react";
import { useState, useEffect } from "react";
import { at, get } from "lodash";
import constellations from './constellations.json';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
} from "@wordpress/block-editor";

import {
	SelectControl,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
// import ServerSideRender from "@wordpress/server-side-render";

import { useEntityRecords } from "@wordpress/core-data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS 
 *  that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const ASTROMETRY_API_URL =
	"https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astrometry";
const ASTRONOMY_API_URL =
	"https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astronomy";

const updateAcfField = (name, value) => {
	try {
		const fields = acf.getFields();
		const _field = fields.find(f => f.data.name === name);
		const field_key = _field.data.key

		const field = document.querySelector('[name="acf['+ field_key + ']"');
		field.value = value; 

		console.log(`Updated field: ${name} with value: ${value}`);
	} catch (e) {
		console.error(e);
	}
}

const updateAcfMultiSelect = (name, value) => {
	try {
		const fields = acf.getFields();
		const _field = fields.find(f => f.data.name === `${name}`);
		const field_key = _field.data.key
	
		const field = document.querySelector('[name="acf['+ field_key + '][]"');
		const constellation = constellations.find(c => c.abbr === value);
		const option = field.querySelector('option[value="'+constellation.name+'"]');
		field.querySelectorAll('option').forEach(o => o.selected = false);

		option.selected = true; // Select the first option
	} catch (e) {
		console.error(e);
	}

}
const astrometryApi = async (url) => {
	let options = { method: "POST", body: JSON.stringify({ url }) };
	const r = await fetch(`${ASTROMETRY_API_URL}`, options);
	return await r.json();
};

const fetchCatalogInformation = async (designation) => {
	let options = { method: "POST", body: JSON.stringify({ designation }) };
	const r = await fetch(`${ASTRONOMY_API_URL}/catalog/messier`, options);
	return await r.json();
}

const ImageGroup = (props) => {
	const { image, annotatedImage, solving, solved, onSelectMedia } = props;
	const [showAnnotated, setShowAnnotated] = useState(false);

	const mediaWrapperClass = [
		"astro-capture-details-media-container",
		image !== "" ? "astro-capture-details-media-container--with-image" : "",
	].join(" ");

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

const DetailGroup = (props) => {
	return <div class="astro-capture-details-group">{props.children}</div>;
};

const DetailBlock = (props) => {
	return (
		<div class="astro-capture-details-block">
			<h6 class="astro-capture-details-block_header">{props.title}</h6>
			<p class="astro-capture-details-block_value">{props.value}</p>
		</div>
	);
};

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const [alignment, setAlignment] = useState(attributes.alignment);
	const [image, setImage] = useState(attributes.image);
	const [annotatedImage, setAnnotatedImage] = useState(attributes.annotated_image);
	const [solving, setSolving] = useState(false);
	const [solved, setSolved] = useState(attributes.solved);
	
	console.log(acf, 'bang acf');
	console.log(props, 'bang props');
	// console.log(acf.getFields(), 'bang acf');
	// console.log(acf.getField('number_of_integration_frames').val(), 'bang acf')
	// console.log(acf.getField("wiki_link").val(), 'bang acf')

	const [astrometryData, setAstrometryData] = useState({
		ra_center: attributes.ra_center || 0,
		dec_center: attributes.dec_center || 0,
		ra_center_h: attributes.ra_center_h || 0,
		ra_center_m: attributes.ra_center_m || 0,
		ra_center_s: attributes.ra_center_s || 0,
		dec_center_sign: attributes.dec_center_sign || 1,
		dec_center_d: attributes.dec_center_d || 0,
		dec_center_m: attributes.dec_center_m || 0,
		dec_center_s: attributes.dec_center_s || 0,
		orientation_center: attributes.orientation_center,
		pixscale: attributes.pixscale,
		field_w: attributes.field_w,
		field_h: attributes.field_h,
		field_units: attributes.field_units,
	});

	useEffect(() => {
		const getCatalogInfo = async () => {
			const res = await fetchCatalogInformation('M31');
			updateAcfField('designations', [res.messier, `NGC ${res.ngc}`].join(', '));
			updateAcfField('distance_lya', res.distance);
			updateAcfField('apparent_magnitude', res.magnitude);
			updateAcfField('size_ly_diameter', res.arcmin);
			updateAcfField('season', res.season);
			updateAcfField('apparent_magnitude', res.magnitude);
			updateAcfMultiSelect('constellation', res.constellation);
			// {
			// 	"type": "Spiral Galaxy",
			// 	"constellation": "And",
			// }
		}
		
		getCatalogInfo();

		if (image) {
			astrometrySolve(image);
		}
	}, [])

	const astrometrySolve = async (url) => {
		setSolving(true);
		const loginRes = await astrometryApi(url);

		const data = {
			ra_center: parseFloat(loginRes.ra_center) || 0,
			dec_center: parseFloat(loginRes.dec_center) || 0,
			ra_center_h: parseFloat(loginRes.ra_center_h) || 0,
			ra_center_m: parseFloat(loginRes.ra_center_m) || 0,
			ra_center_s: parseFloat(loginRes.ra_center_s) || 0,
			dec_center_sign: parseFloat(loginRes.dec_center_sign) || 1,
			dec_center_d: parseFloat(loginRes.dec_center_d) || 0,
			dec_center_m: parseFloat(loginRes.dec_center_m) || 0,
			dec_center_s: parseFloat(loginRes.dec_center_s) || 0,
			orientation_center: parseFloat(loginRes.orientation_center),
			pixscale: parseFloat(loginRes.pixscale),
			fieldw: parseFloat(loginRes.fieldw),
			fieldh: parseFloat(loginRes.fieldh),
			fieldunits: loginRes.fieldunits,
			annotated: loginRes.annotated,
		};

		updateAcfField('ra_center_hour', data.ra_center_h);
		updateAcfField('ra_center_min', data.ra_center_m);
		updateAcfField('ra_center_sec', data.ra_center_s);
		updateAcfField('dec_center_deg', data.dec_center_sign * data.dec_center_d);
		updateAcfField('dec_center_min', data.dec_center_m);
		updateAcfField('dec_center_sec', data.dec_center_s);
		updateAcfField('orientation', 180 - data.orientation_center);
		updateAcfField('pixel_scale_arcsecpixel', data.pixscale);

		setAttributes({annotated_image: data.annotated });
		setAnnotatedImage(data.annotated);

		setAstrometryData(data);
		setAttributes(data);
		setAttributes({ solved: true });
		setSolved(true);
		setSolving(false);
	};

	const handleAlignment = (value) => {
		setAttributes({ alignment: value });
		setAlignment(value);
	};

	const onSelectMedia = (media) => {
		setSolved(false);
		setAstrometryData();

		const src =
			get(media, ["sizes", "large", "url"]) ||
			get(media, ["media_details", "sizes", "large", "source_url"]);
		setImage(src || media.url);
		setAttributes({ image: src || media.url });

		astrometrySolve(src || media.url);
	};

	const wrapperClass = [
		"wp-block-create-block-astro-capture-details-block__wrapper",
		alignment
			? `wp-block-create-block-astro-capture-details-block__${alignment}`
			: "",
	].join(" ");

	return (
		<>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody title="Layout" initialOpen={true}>
						<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Image Alignment", "wpdev")}
								value={attributes.alignment}
								options={[
									{ label: __("Left", "wpdev"), value: "left" },
									{ label: __("Right", "wpdev"), value: "right" },
									{ label: __("Top", "wpdev"), value: "top" },
									{ label: __("Bottom", "wpdev"), value: "bottom" },
								]}
								onChange={(value) => handleAlignment(value)}
							/>
						</PanelRow>
						{/* <PanelRow>
							<TextControl
								label={__("Right Ascension", "wpdev")}
								value={attributes.ra}
								onChange={(value) => setAttributes({ ra: value })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__("Declination", "wpdev")}
								value={attributes.dec}
								onChange={(value) => setAttributes({ dec: value })}
							/>
						</PanelRow> */}
					</PanelBody>
					<PanelBody title="Equipment" initialOpen={true}>

					<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Primary Camera", "wpdev")}
								value={attributes.primary_camera}
								options={[
									{ label: __("Canon T8i", "wpdev"), value: "Canon T8i" },
									{ label: __("Canon T2i", "wpdev"), value: "Canon T2i" },
								]}
								onChange={(primary_camera) => setAttributes({primary_camera})}
							/>
						</PanelRow>
						<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Guide Camera", "wpdev")}
								value={attributes.guide_camera}
								options={[
									{ label: __("ZWO ASI120MM Mini", "wpdev"), value: "ZWO ASI120MM Mini" },
									{ label: __("None", "wpdev"), value: "" },
								]}
								onChange={(guide_camera) => setAttributes({guide_camera})}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Calibration Frames" initialOpen={true}>
						<PanelRow>
							<ToggleControl
								__unstableInputWidth="100%"
								label="Biases"
								checked={attributes.biases}
								onChange={(biases) => setAttributes({ biases })}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								__unstableInputWidth="100%"
								label="Flats"
								checked={attributes.flats}
								onChange={(flats) => setAttributes({ flats })}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								__unstableInputWidth="100%"
								label="Darks"
								checked={attributes.darks}
								onChange={(darks) => setAttributes({ darks })}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div class="astro-capture-details-block">
				<div {...useBlockProps()}>
					<div class={wrapperClass}>
						<ImageGroup
							image={image}
							annotatedImage={annotatedImage}
							solving={solving}
							solved={solved}
							onSelectMedia={onSelectMedia}
						></ImageGroup>
						<div class="astro-capture-details-block_content">
							{astrometryData && (
								<>
									<DetailBlock
										title="Capture Date"
										value="01/30/1999"
									/>
									<DetailGroup>
										<DetailBlock
											title="Right Ascension"
											value={`${astrometryData.ra_center_h}h ${astrometryData.ra_center_m}m ${astrometryData.ra_center_s}s`}
										/>
										<DetailBlock
											title="Declination"
											value={`${
												astrometryData.dec_center_d *
												astrometryData.dec_center_sign
											}° ${astrometryData.dec_center_m}' ${
												astrometryData.dec_center_s
											}"`}
										/>
									</DetailGroup>

									<DetailGroup>
										<DetailBlock
											title="Apparent Magnitude"
											value="7.4"
										/>
										<DetailBlock
											title="Bortle Level"
											value="5"
										/>
									</DetailGroup>
									<DetailGroup>
										<DetailBlock
											title="Orientation"
											value={`${(180 - attributes.orientation_center).toFixed(2)} degrees E of N`}
										/>
										<DetailBlock
											title="Arcseconds per Pixel"
											value={attributes.pixscale}
										/>
									</DetailGroup>

									<DetailGroup>
										<DetailBlock
											title="Integration"
											value="200x 120″ (6h 40′ 0″) @ISO100"
										/>

										{ (attributes.biases || attributes.darks || attributes.flats) &&
											<DetailBlock
												title="Calibration Frames"
												value={(
													<>
														{ attributes.biases && <><span class="dashicons dashicons-yes"></span> Biases</> }
														{ attributes.darks && <><span class="dashicons dashicons-yes"></span> Darks</> }
														{ attributes.flats && <><span class="dashicons dashicons-yes"></span> Flats</> }
													</>
												)}
											/>
										}
									</DetailGroup>
									<DetailGroup>
										<DetailBlock
											title="Distance (Light Years)"
											value="1,500"
										/>
										<DetailBlock
											title="Diameter (Light Years)"
											value="250"
										/>
									</DetailGroup>

									<DetailBlock
										title="Designation(s)"
										value="M78, NGC 1234"
									/>

									<DetailBlock
										title="Constellation(s)"
										value={(<a style={{pointerEvents: 'none'}} href="/deep-space-objects/constellations/circinus">Andromeda</a>)}
									/>
									<DetailBlock
										title="Additional Resources"
										value={(
											<a style={{pointerEvents: 'none'}} href="#">
												Learn More <span class="dashicons dashicons-external"></span>
											</a>
										)}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

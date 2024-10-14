import * as React from "react";
import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useDispatch, useSelect } from '@wordpress/data';

import "./editor.scss";

import { AdminControls, DetailBlock, DetailGroup, ImageGroup } from "./components";
import categoriesHook from './hooks/categories';

import constellations from './lib/constellations.json';
import messierCatalog from './lib/messier-catalog.json';
import fullCatalog from './lib/ngc-ic-messier.catalog.json';

const ASTRONOMY_API_URL =
	"https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astronomy";

const setPostTitle = (designation, common_names) => {
	let title = '';
	if (designation.startsWith('M')) {
		title = `Messier ${ designation.replace('M', '') }`;
	} else if (designation.startsWith('NGC')) {
		title = `NGC ${ designation.replace('NGC', '') }`;
	} else if (designation.startsWith('IC')) {
		title = `IC ${ designation.replace('IC', '') }`;
	}
	
	if (common_names) title += ` ${common_names}`;

	wp.data.dispatch( 'core/editor' ).editPost( { title } );
}

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	console.log({attributes});

	const { postCategories, currentCategories } = useSelect(categoriesHook, []);

	const updateData = (d) => setData({ ...data, ...d });

	const constellationCategory = postCategories?.constellation?.find(c => currentCategories.includes(c.id))

	const [ data, setData ] = useState({
		image: attributes.image,
		annotatedImage: attributes.annotated_image,
		bortle: attributes.bortle,
		designation: attributes.designation,
		other_designations: attributes.other_designations,
		magnitude: attributes.magnitude,
		surfaceBrightness: attributes.surfaceBrightness,
		arcmin: attributes.arcmin,
		distance: attributes.distance,
		constellation: attributes.constellation,
		season: attributes.season,
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

	const handleDesignation = (designation) => {
		const findObject = i => {
			const des = designation.toLowerCase();
			if (des.startsWith('m')) return i.m && i.m.includes(designation)
			return i.name.toLowerCase() === des;
		};

		const {
			v_mag, ngc, ic,
			object_definition,
			const: _constellation,
			common_names,
			surfbr: surfaceBrightness
		} = fullCatalog.find(findObject);
		
		const other_designations = [];

		if (ngc) other_designations.push(ngc);
		if (ic) other_designations.push(ic);

		let matchData = {
			designation,
			objectType: object_definition,
			other_designations: other_designations.join(', '),
			magnitude: v_mag,
			surfaceBrightness,
			constellation: constellations.find(c => c.abbr === _constellation).name,
		}

		if (designation.startsWith('M')) {
			const messierMatch = messierCatalog.find(i => i.messier === designation);
			matchData = {
				...matchData,
				arcmin: messierMatch.arcmin,
				distance: messierMatch.distance,
				season: messierMatch.season,
			}
		}
		
		setPostTitle(designation, common_names);
		
		const constellationCategory = postCategories.constellation.find(
			c => c.name.toLowerCase() === matchData.constellation.toLowerCase()
		);

		const catalogCategory = postCategories.catalog.find(c => {
			const d = designation.toLowerCase();

			if (d.startsWith('m')) {
				return c.name.toLowerCase() === 'messier'
			} else if (d.startsWith('ngc')) {
				return c.name.toLowerCase() === 'ngc'
			} else if (d.startsWith('ic')) {
				return c.name.toLowerCase() === 'ic'
			}
		});

		const objectTypeCategory =  postCategories.all.find(c => c.name.toLowerCase() === matchData.objectType.toLowerCase());

		const _categories = [...currentCategories];

		if (catalogCategory) _categories.push(catalogCategory.id);
		if (constellationCategory) _categories.push(constellationCategory.id);
		if (objectTypeCategory) _categories.push(objectTypeCategory.id);
		
		setAttributes({ matchData, designation });
		updateData({...data, ...matchData });

		wp.data.dispatch( 'core/editor' ).editPost( { categories: _categories } );
	}

	const onAnnotate = async (data) => {
		setAttributes({ ...data, solved: true });
		updateData(data);
	};

	return (
		<>
			<AdminControls
				attributes={attributes}
				setAttributes={setAttributes}
				handleDesignation={handleDesignation}
			/>
			<div class="astro-capture-details-block">
				<div {...useBlockProps()}>
					<div class="wp-block-create-block-astro-capture-details-block__wrapper">
						<ImageGroup
							image={data.image}
							annotatedImage={data.annotatedImage}
							solved={attributes.solved}
							onAnnotate={onAnnotate}
							setSolved={(value) => setAttributes({ solved: value })}
						></ImageGroup>
						<div class="astro-capture-details-block_content">
							<DetailBlock title="Capture Date" value="01/30/1999" />
							<DetailBlock title="Right Ascension" value={`${data.ra_center_h}h ${data.ra_center_m}m ${data.ra_center_s}s`} />
							<DetailBlock
								title="Declination"
								value={`${
									data.dec_center_d *
									data.dec_center_sign
								}° ${data.dec_center_m}' ${
									data.dec_center_s
								}"`}
							/>
							<DetailBlock title="Apparent Magnitude" value={data.magnitude} />
							<DetailBlock title="Bortle Level" value={data.bortle} />
							<DetailBlock title="Orientation" value={`${(180 - data.orientation_center).toFixed(2)} degrees E of N`} />
							<DetailBlock title="Arcseconds per Pixel" value={data.pixscale} />
							<DetailBlock title="Integration" value="200x 120″ (6h 40′ 0″) @ISO100" />

							{ (data.biases || data.darks || data.flats) &&
								<DetailBlock
									title="Calibration Frames"
									value={(
										<>
											{ data.biases && <><span class="dashicons dashicons-yes"></span> Biases</> }
											{ data.darks && <><span class="dashicons dashicons-yes"></span> Darks</> }
											{ data.flats && <><span class="dashicons dashicons-yes"></span> Flats</> }
										</>
									)}
								/>
							}
							<DetailBlock title="Diameter (Light Years)" value={data.arcmin} />
							<DetailBlock title="Designation(s)" value={data.other_designations} />

							<DetailBlock
								title="Constellation"
								value={
									constellationCategory ? (
									<a
										style={{pointerEvents: 'none'}}
										href={constellationCategory.link}
									>
										{ data.constellation }
									</a>
								): ''}
							/>

							<DetailBlock
								title="Additional Resources"
								value={(
									<a style={{pointerEvents: 'none'}} href="#">
										Learn More <span class="dashicons dashicons-external"></span>
									</a>
								)}
							/>
							{/* <DetailGroup></DetailGroup> */}

						</div>
					</div>
				</div>
			</div>
		</>
	);
}

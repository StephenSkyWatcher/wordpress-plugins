/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
	RadioControl,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const telescopeOptions = [
	"Sharpstar 76EDPH",
	"Celestron SCT 6\"",
	"Canon 75mm-300mm Lens",
	"Canon 18mm-55mm Lens",
	"Other"
].map(t => ({ label: __(t, "wpdev"), value: t }));

const mountOptions = [
	"12\" Pier",
	"6\" Pier",
	"Star Adventurer Mini",
	"Camera Tripod",
	"None/Other"
].map(t => ({ label: __(t, "wpdev"), value: t }));

const primaryCameraOptions = [
	"Canon T8i",
	"Canon T2i"
].map(t => ({ label: __(t, "wpdev"), value: t }));

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { primary_telescope, primary_camera, mount, guiding } = attributes;

	const [ defaults, setDefaults ] = React.useState(attributes.defaults);

	const handleDefaultsChange = (defaults) => {
		setDefaults( defaults );
	};

	const handleConfirmDefaultsChange = () => {
		const telescope = {
			'Refractor': 'Sharpstar 76EDPH',
			'SCT': 'Celestron SCT 6"',
			'75-300mm': 'Canon 75-300mm Lens',
			'18-55mm': 'Canon 18mm-55mm Lens',
		}

		const mount = {
			'Refractor': '12" Pier',
			'SCT': '12" Pier',
			'75-300mm': 'Star Adventurer Mini',
			'18-55mm': 'Star Adventurer Mini',
		}

		const camera = {
			"Refractor": "Canon T8i",
			"SCT": "Canon T8i",
		}

		setAttributes({
			primary_telescope: telescope[defaults],
			primary_camera: camera[defaults],
			mount: mount[defaults],
		});
		setDefaults('');
		setAttributes( defaults );
	}

	console.log(props, 'bang123');

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="equipment">
				<Panel>
					<PanelBody title="Defaults" initialOpen={true}>
						<PanelRow style={{ width: "100%" }}>
							<RadioControl
								label="Set defaults"
								help="Sets common set of equipment"
								selected={ defaults }
								options={ [
									{ label: 'Refractor', value: 'Refractor' },
									{ label: 'SCT', value: 'SCT' },
									{ label: '75-300mm', value: '75-300mm' },
									{ label: '18-55mm', value: '18-55mm' },
								] }
								onChange={handleDefaultsChange}
							/>
						</PanelRow>
						<PanelRow style={{ width: "100%" }}>
							<button disabled={!defaults} onClick={handleConfirmDefaultsChange} class="components-button is-primary is-compact">Set Defaults</button>
						</PanelRow>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody title="Equipment" initialOpen={true}>
						<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Primary Telescope", "wpdev")}
								value={primary_telescope}
								options={telescopeOptions}
								onChange={(primary_telescope) => setAttributes({primary_telescope})}
							/>
						</PanelRow>
						<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Primary Camera", "wpdev")}
								value={primary_camera}
								options={primaryCameraOptions}
								onChange={(primary_camera) => setAttributes({primary_camera})}
							/>
						</PanelRow>
						<PanelRow style={{ width: "100%" }}>
							<SelectControl
								__unstableInputWidth="100%"
								label={__("Mount", "wpdev")}
								value={mount}
								options={mountOptions}
								onChange={(mount) => setAttributes({mount})}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			{ __(
				'Astro Capture Equipment Details – hello from the editor!',
				'astro-capture-equipment-details'
			) }
		</div>
	);
}

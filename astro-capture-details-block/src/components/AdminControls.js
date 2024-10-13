import * as React from "react";

import { useState, useEffect } from "react";

import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import {
	SelectControl,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	Button
} from "@wordpress/components";

const AdminControls = (props) => {
    const { attributes, setAttributes, handleDesignation } = props;

	const [designation, setDesignation] = useState(attributes.designation);
    return (
        <InspectorControls key="setting">
				<Panel>
					<PanelBody title="Designation" initialOpen={true}>
						<PanelRow>
							<TextControl
								label={__("Designation", "wpdev")}
								defaultValue={designation}
								onChange={(value) => setDesignation(value.toUpperCase())}
							/>
						</PanelRow>
						<PanelRow>
							<Button variant="primary" onClick={() => handleDesignation(designation)}>Set Designation</Button>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Location" initialOpen={true}>
						<PanelRow>
							<TextControl
								label={__("Bortle", "wpdev")}
								defaultValue={attributes.bortle}
								onChange={(bortle) => setAttributes({bortle})}
							/>
						</PanelRow>
						<PanelRow>
							<Button variant="primary" onClick={() => handleDesignation(designation)}>Set Designation</Button>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Equipment" initialOpen={false}>
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
					<PanelBody title="Calibration Frames" initialOpen={false}>
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
    )
}

export default AdminControls;
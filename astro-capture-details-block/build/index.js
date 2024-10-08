/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constellations_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constellations.json */ "./src/constellations.json");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);





/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


// import ServerSideRender from "@wordpress/server-side-render";



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS 
 *  that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const ASTROMETRY_API_URL = "https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astrometry";
const ASTRONOMY_API_URL = "https://www.stephenskywatcher.com/wp-json/astro-capture-details-block/v1/astronomy";
const updateAcfField = (name, value) => {
  try {
    const fields = acf.getFields();
    const _field = fields.find(f => f.data.name === name);
    const field_key = _field.data.key;
    const field = document.querySelector('[name="acf[' + field_key + ']"');
    field.value = value;
    console.log(`Updated field: ${name} with value: ${value}`);
  } catch (e) {
    console.error(e);
  }
};
const updateAcfMultiSelect = (name, value) => {
  try {
    const fields = acf.getFields();
    const _field = fields.find(f => f.data.name === `${name}`);
    const field_key = _field.data.key;
    const field = document.querySelector('[name="acf[' + field_key + '][]"');
    const constellation = _constellations_json__WEBPACK_IMPORTED_MODULE_2__.find(c => c.abbr === value);
    const option = field.querySelector('option[value="' + constellation.name + '"]');
    field.querySelectorAll('option').forEach(o => o.selected = false);
    option.selected = true; // Select the first option
  } catch (e) {
    console.error(e);
  }
};
const astrometryApi = async url => {
  let options = {
    method: "POST",
    body: JSON.stringify({
      url
    })
  };
  const r = await fetch(`${ASTROMETRY_API_URL}`, options);
  return await r.json();
};
const fetchCatalogInformation = async designation => {
  let options = {
    method: "POST",
    body: JSON.stringify({
      designation
    })
  };
  const r = await fetch(`${ASTRONOMY_API_URL}/catalog/messier`, options);
  return await r.json();
};
const ImageGroup = props => {
  const {
    image,
    annotatedImage,
    solving,
    solved,
    onSelectMedia
  } = props;
  const [showAnnotated, setShowAnnotated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const mediaWrapperClass = ["astro-capture-details-media-container", image !== "" ? "astro-capture-details-media-container--with-image" : ""].join(" ");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    class: "astro-capture-details-block_image-container",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      class: mediaWrapperClass,
      children: [solving && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        class: "dashicons dashicons-hourglass"
      }), showAnnotated && annotatedImage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
        src: annotatedImage,
        class: "annotated",
        alt: "Annotated Image"
      }), image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
        src: image,
        alt: "Main Image"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        class: "astro-capture-details-block_image",
        style: {
          backgroundImage: `url('${image}')`
        }
      }), solved && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        class: "astro-capture-details-overlay",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          class: "dashicons dashicons-yes-alt"
        }), " Solved"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        class: "stk-block-button is-style-default stk-block",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
          onClick: () => setShowAnnotated(!showAnnotated),
          class: showAnnotated ? "stk-link stk-button stk--hover-effect-darken annotations-btn annotations-btn--active" : "stk-link stk-button stk--hover-effect-darken annotations-btn",
          children: showAnnotated ? "Hide Annotations" : "Annotate"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaPlaceholder, {
        icon: "format-image",
        labels: {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Main Image")
        },
        className: "block-image",
        onSelect: onSelectMedia,
        accept: "image/*",
        allowedTypes: ["image"]
      })]
    })
  });
};
const DetailGroup = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    class: "astro-capture-details-group",
    children: props.children
  });
};
const DetailBlock = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    class: "astro-capture-details-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h6", {
      class: "astro-capture-details-block_header",
      children: props.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
      class: "astro-capture-details-block_value",
      children: props.value
    })]
  });
};
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const [alignment, setAlignment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.alignment);
  const [image, setImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.image);
  const [annotatedImage, setAnnotatedImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.annotated_image);
  const [solving, setSolving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [solved, setSolved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(attributes.solved);
  console.log(acf, 'bang acf');
  console.log(props, 'bang props');
  // console.log(acf.getFields(), 'bang acf');
  // console.log(acf.getField('number_of_integration_frames').val(), 'bang acf')
  // console.log(acf.getField("wiki_link").val(), 'bang acf')

  const [astrometryData, setAstrometryData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
    field_units: attributes.field_units
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
    };
    getCatalogInfo();
    if (image) {
      astrometrySolve(image);
    }
  }, []);
  const astrometrySolve = async url => {
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
      annotated: loginRes.annotated
    };
    updateAcfField('ra_center_hour', data.ra_center_h);
    updateAcfField('ra_center_min', data.ra_center_m);
    updateAcfField('ra_center_sec', data.ra_center_s);
    updateAcfField('dec_center_deg', data.dec_center_sign * data.dec_center_d);
    updateAcfField('dec_center_min', data.dec_center_m);
    updateAcfField('dec_center_sec', data.dec_center_s);
    updateAcfField('orientation', 180 - data.orientation_center);
    updateAcfField('pixel_scale_arcsecpixel', data.pixscale);
    setAttributes({
      annotated_image: data.annotated
    });
    setAnnotatedImage(data.annotated);
    setAstrometryData(data);
    setAttributes(data);
    setAttributes({
      solved: true
    });
    setSolved(true);
    setSolving(false);
  };
  const handleAlignment = value => {
    setAttributes({
      alignment: value
    });
    setAlignment(value);
  };
  const onSelectMedia = media => {
    setSolved(false);
    setAstrometryData();
    const src = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(media, ["sizes", "large", "url"]) || (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(media, ["media_details", "sizes", "large", "source_url"]);
    setImage(src || media.url);
    setAttributes({
      image: src || media.url
    });
    astrometrySolve(src || media.url);
  };
  const wrapperClass = ["wp-block-create-block-astro-capture-details-block__wrapper", alignment ? `wp-block-create-block-astro-capture-details-block__${alignment}` : ""].join(" ");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Panel, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Layout",
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            style: {
              width: "100%"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
              __unstableInputWidth: "100%",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Image Alignment", "wpdev"),
              value: attributes.alignment,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Left", "wpdev"),
                value: "left"
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Right", "wpdev"),
                value: "right"
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Top", "wpdev"),
                value: "top"
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Bottom", "wpdev"),
                value: "bottom"
              }],
              onChange: value => handleAlignment(value)
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Equipment",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            style: {
              width: "100%"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
              __unstableInputWidth: "100%",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Primary Camera", "wpdev"),
              value: attributes.primary_camera,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Canon T8i", "wpdev"),
                value: "Canon T8i"
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Canon T2i", "wpdev"),
                value: "Canon T2i"
              }],
              onChange: primary_camera => setAttributes({
                primary_camera
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            style: {
              width: "100%"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
              __unstableInputWidth: "100%",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Guide Camera", "wpdev"),
              value: attributes.guide_camera,
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("ZWO ASI120MM Mini", "wpdev"),
                value: "ZWO ASI120MM Mini"
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("None", "wpdev"),
                value: ""
              }],
              onChange: guide_camera => setAttributes({
                guide_camera
              })
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Calibration Frames",
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
              __unstableInputWidth: "100%",
              label: "Biases",
              checked: attributes.biases,
              onChange: biases => setAttributes({
                biases
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
              __unstableInputWidth: "100%",
              label: "Flats",
              checked: attributes.flats,
              onChange: flats => setAttributes({
                flats
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
              __unstableInputWidth: "100%",
              label: "Darks",
              checked: attributes.darks,
              onChange: darks => setAttributes({
                darks
              })
            })
          })]
        })]
      })
    }, "setting"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      class: "astro-capture-details-block",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          class: wrapperClass,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(ImageGroup, {
            image: image,
            annotatedImage: annotatedImage,
            solving: solving,
            solved: solved,
            onSelectMedia: onSelectMedia
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            class: "astro-capture-details-block_content",
            children: astrometryData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                title: "Capture Date",
                value: "01/30/1999"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(DetailGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Right Ascension",
                  value: `${astrometryData.ra_center_h}h ${astrometryData.ra_center_m}m ${astrometryData.ra_center_s}s`
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Declination",
                  value: `${astrometryData.dec_center_d * astrometryData.dec_center_sign}° ${astrometryData.dec_center_m}' ${astrometryData.dec_center_s}"`
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(DetailGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Apparent Magnitude",
                  value: "7.4"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Bortle Level",
                  value: "5"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(DetailGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Orientation",
                  value: `${(180 - attributes.orientation_center).toFixed(2)} degrees E of N`
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Arcseconds per Pixel",
                  value: attributes.pixscale
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(DetailGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Integration",
                  value: "200x 120\u2033 (6h 40\u2032 0\u2033) @ISO100"
                }), (attributes.biases || attributes.darks || attributes.flats) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Calibration Frames",
                  value: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                    children: [attributes.biases && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                        class: "dashicons dashicons-yes"
                      }), " Biases"]
                    }), attributes.darks && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                        class: "dashicons dashicons-yes"
                      }), " Darks"]
                    }), attributes.flats && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                        class: "dashicons dashicons-yes"
                      }), " Flats"]
                    })]
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(DetailGroup, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Distance (Light Years)",
                  value: "1,500"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                  title: "Diameter (Light Years)",
                  value: "250"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                title: "Designation(s)",
                value: "M78, NGC 1234"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                title: "Constellation(s)",
                value: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                  style: {
                    pointerEvents: 'none'
                  },
                  href: "/deep-space-objects/constellations/circinus",
                  children: "Andromeda"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(DetailBlock, {
                title: "Additional Resources",
                value: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("a", {
                  style: {
                    pointerEvents: 'none'
                  },
                  href: "#",
                  children: ["Learn More ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    class: "dashicons dashicons-external"
                  })]
                })
              })]
            })
          })]
        })
      })
    })]
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/astro-capture-details-block","version":"0.1.0","title":"Astro Capture Details Block","category":"astronomy","icon":"camera","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false,"color":{"background":true,"text":true,"link":true}},"attributes":{"alignment":{"enum":["left","right","top","bottom"],"default":"left"},"image":{"type":"string","default":""},"annotated_image":{"type":"string","default":""},"solved":{"type":"boolean","default":false},"primary_camera":{"enum":["Canon T8i","Canon T2i"],"default":"Canon T8i"},"guide_camera":{"enum":["ZWO ASI120MM Mini",""],"default":"Canon T8i"},"flats":{"type":"boolean","default":true},"darks":{"type":"boolean","default":true},"biases":{"type":"boolean","default":true},"ra_center":{"type":"number","default":0},"dec_center":{"type":"number","default":0},"ra_center_h":{"type":"number","default":0},"ra_center_m":{"type":"number","default":0},"ra_center_s":{"type":"number","default":0},"dec_center_sign":{"type":"number","default":1},"dec_center_d":{"type":"number","default":0},"dec_center_m":{"type":"number","default":0},"dec_center_s":{"type":"number","default":0},"orientation_center":{"type":"number","default":0},"pixscale":{"type":"number","default":0},"fieldw":{"type":"number","default":0},"fieldh":{"type":"number","default":0},"fieldunits":{"type":"string","default":"degrees"}},"textdomain":"astro-capture-details-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/constellations.json":
/*!*********************************!*\
  !*** ./src/constellations.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"name":"Andromeda","abbr":"And"},{"name":"Antlia","abbr":"Ant"},{"name":"Apus","abbr":"Aps"},{"name":"Aquarius","abbr":"Aqr"},{"name":"Aquila","abbr":"Aql"},{"name":"Ara","abbr":"Ara"},{"name":"Aries","abbr":"Ari"},{"name":"Auriga","abbr":"Aur"},{"name":"Bootes","abbr":"Boo"},{"name":"Caelum","abbr":"Cae"},{"name":"Camelopardalis","abbr":"Cam"},{"name":"Cancer","abbr":"Cnc"},{"name":"Canes Venatici","abbr":"CVn"},{"name":"Canis Major","abbr":"CMa"},{"name":"Canis Minor","abbr":"CMi"},{"name":"Capricornus","abbr":"Cap"},{"name":"Carina","abbr":"Car"},{"name":"Cassiopeia","abbr":"Cas"},{"name":"Centaurus","abbr":"Cen"},{"name":"Cepheus","abbr":"Cep"},{"name":"Cetus","abbr":"Cet"},{"name":"Chamaeleon","abbr":"Cha"},{"name":"Circinus","abbr":"Cir"},{"name":"Columba","abbr":"Col"},{"name":"Coma Berenices","abbr":"Com"},{"name":"Corona Australis","abbr":"CrA"},{"name":"Corona Borealis","abbr":"CrB"},{"name":"Corvus","abbr":"Crv"},{"name":"Crater","abbr":"Crt"},{"name":"Crux","abbr":"Cru"},{"name":"Cygnus","abbr":"Cyg"},{"name":"Delphinus","abbr":"Del"},{"name":"Dorado","abbr":"Dor"},{"name":"Draco","abbr":"Dra"},{"name":"Equuleus","abbr":"Equ"},{"name":"Eridanus","abbr":"Eri"},{"name":"Fornax","abbr":"For"},{"name":"Gemini","abbr":"Gem"},{"name":"Grus","abbr":"Gru"},{"name":"Hercules","abbr":"Her"},{"name":"Horologium","abbr":"Hor"},{"name":"Hydra","abbr":"Hya"},{"name":"Hydrus","abbr":"Hyi"},{"name":"Indus","abbr":"Ind"},{"name":"Lacerta","abbr":"Lac"},{"name":"Leo","abbr":"Leo"},{"name":"Leo Minor","abbr":"LMi"},{"name":"Lepus","abbr":"Lep"},{"name":"Libra","abbr":"Lib"},{"name":"Lupus","abbr":"Lup"},{"name":"Lynx","abbr":"Lyn"},{"name":"Lyra","abbr":"Lyr"},{"name":"Mensa","abbr":"Men"},{"name":"Microscopium","abbr":"Mic"},{"name":"Monoceros","abbr":"Mon"},{"name":"Musca","abbr":"Mus"},{"name":"Norma","abbr":"Nor"},{"name":"Octans","abbr":"Oct"},{"name":"Ophiuchus","abbr":"Oph"},{"name":"Orion","abbr":"Ori"},{"name":"Pavo","abbr":"Pav"},{"name":"Pegasus","abbr":"Peg"},{"name":"Perseus","abbr":"Per"},{"name":"Phoenix","abbr":"Phe"},{"name":"Pictor","abbr":"Pic"},{"name":"Pisces","abbr":"Psc"},{"name":"Piscis Austrinus","abbr":"PsA"},{"name":"Puppis","abbr":"Pup"},{"name":"Pyxis","abbr":"Pyx"},{"name":"Reticulum","abbr":"Ret"},{"name":"Sagitta","abbr":"Sge"},{"name":"Sagittarius","abbr":"Sgr"},{"name":"Scorpius","abbr":"Sco"},{"name":"Sculptor","abbr":"Scl"},{"name":"Scutum","abbr":"Sct"},{"name":"Serpens","abbr":"Ser"},{"name":"Sextans","abbr":"Sex"},{"name":"Taurus","abbr":"Tau"},{"name":"Telescopium","abbr":"Tel"},{"name":"Triangulum","abbr":"Tri"},{"name":"Triangulum Australe","abbr":"TrA"},{"name":"Tucana","abbr":"Tuc"},{"name":"Ursa Major","abbr":"UMa"},{"name":"Ursa Minor","abbr":"UMi"},{"name":"Vela","abbr":"Vel"},{"name":"Virgo","abbr":"Vir"},{"name":"Volans","abbr":"Vol"},{"name":"Vulpecula","abbr":"Vul"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkastro_capture_details_block"] = self["webpackChunkastro_capture_details_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
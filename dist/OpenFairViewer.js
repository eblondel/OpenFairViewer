require("./OpenFairViewer.css");
require("jquery-ui-dist/jquery-ui.css");
require("jquery-ui-dist/jquery-ui.js");
var $hzBBV$select2 = require("select2");
require("select2/dist/css/select2.css");
require("jquery-datetimepicker");
require("jquery-datetimepicker/jquery.datetimepicker.css");
require("datatables.net-dt");
require("datatables.net-dt/css/jquery.dataTables.css");
require("bootstrap");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap-slider/dist/css/bootstrap-slider.css");
require("bootstrap-slider/dist/bootstrap-slider.js");
require("@fortawesome/fontawesome-free/js/all.js");
require("academicons/css/academicons.css");
require("bootpag/lib/jquery.bootpag");
var $hzBBV$mustachemustachemjs = require("mustache/mustache.mjs");
var $hzBBV$olcsOLCesiumjs = require("olcs/OLCesium.js");
require("ol/ol.css");
var $hzBBV$olMap = require("ol/Map");
require("ol/Observable");
var $hzBBV$olControl = require("ol/Control");
var $hzBBV$olsource = require("ol/source");
var $hzBBV$oltilegridWMTS = require("ol/tilegrid/WMTS");
var $hzBBV$ollayer = require("ol/layer");
var $hzBBV$olView = require("ol/View");
var $hzBBV$proj4 = require("proj4");
var $hzBBV$olprojproj4 = require("ol/proj/proj4");
var $hzBBV$olextent = require("ol/extent");
var $hzBBV$olproj = require("ol/proj");
var $hzBBV$olstyle = require("ol/style");
var $hzBBV$olcoordinate = require("ol/coordinate");
var $hzBBV$olgeom = require("ol/geom");
var $hzBBV$olgeomPolygon = require("ol/geom/Polygon");
var $hzBBV$olformat = require("ol/format");
var $hzBBV$olFeature = require("ol/Feature");
var $hzBBV$olinteraction = require("ol/interaction");
var $hzBBV$oleventscondition = require("ol/events/condition");
var $hzBBV$olloadingpanel = require("ol-loadingpanel");
require("ol-loadingpanel/src/ol-loadingpanel.css");
var $hzBBV$ollayerswitcher = require("ol-layerswitcher");
require("ol-layerswitcher/dist/ol-layerswitcher.css");
var $hzBBV$olpopup = require("ol-popup");
require("ol-popup/src/ol-popup.css");
var $hzBBV$olextlayerAnimatedClusterjs = require("ol-ext/layer/AnimatedCluster.js");
var $hzBBV$olextinteractionSelectClusterjs = require("ol-ext/interaction/SelectCluster.js");
var $hzBBV$filesaver = require("file-saver");
var $hzBBV$simplestatistics = require("simple-statistics");
var $hzBBV$colorbrewerindexjs = require("colorbrewer/index.js");
var $hzBBV$jquery = require("jquery");
var $hzBBV$jsonixjsonix = require("jsonix/jsonix");
var $hzBBV$w3cschemaslibXLink_1_0 = require("w3c-schemas/lib/XLink_1_0");
var $hzBBV$ogcschemaslibOWS_1_0_0 = require("ogc-schemas/lib/OWS_1_0_0");
var $hzBBV$ogcschemaslibOWS_1_1_0 = require("ogc-schemas/lib/OWS_1_1_0");
var $hzBBV$ogcschemaslibOWS_2_0 = require("ogc-schemas/lib/OWS_2_0");
var $hzBBV$ogcschemaslibDC_1_1 = require("ogc-schemas/lib/DC_1_1");
var $hzBBV$ogcschemaslibDCT = require("ogc-schemas/lib/DCT");
var $hzBBV$ogcschemaslibCSW_2_0_2_Full = require("ogc-schemas/lib/CSW_2_0_2_Full");
var $hzBBV$ogcschemaslibWMS_1_1_1 = require("ogc-schemas/lib/WMS_1_1_1");
var $hzBBV$ogcschemaslibWMS_1_3_0 = require("ogc-schemas/lib/WMS_1_3_0");
var $hzBBV$ogcschemaslibFilter_1_1_0 = require("ogc-schemas/lib/Filter_1_1_0");
var $hzBBV$ogcschemaslibGML_3_1_1 = require("ogc-schemas/lib/GML_3_1_1");
var $hzBBV$ogcschemaslibGML_3_2_0 = require("ogc-schemas/lib/GML_3_2_0");
var $hzBBV$ogcschemaslibGML_3_2_1 = require("ogc-schemas/lib/GML_3_2_1");
var $hzBBV$ogcschemaslibSMIL_2_0_Language = require("ogc-schemas/lib/SMIL_2_0_Language");
var $hzBBV$ogcschemaslibSMIL_2_0 = require("ogc-schemas/lib/SMIL_2_0");
var $hzBBV$ogcschemaslibISO19139_GCO_20060504 = require("ogc-schemas/lib/ISO19139_GCO_20060504");
var $hzBBV$ogcschemaslibISO19139_GMD_20060504 = require("ogc-schemas/lib/ISO19139_GMD_20060504");
var $hzBBV$ogcschemaslibISO19139_GTS_20060504 = require("ogc-schemas/lib/ISO19139_GTS_20060504");
var $hzBBV$ogcschemaslibISO19139_GSS_20060504 = require("ogc-schemas/lib/ISO19139_GSS_20060504");
var $hzBBV$ogcschemaslibISO19139_GSR_20060504 = require("ogc-schemas/lib/ISO19139_GSR_20060504");
var $hzBBV$ogcschemaslibISO19139_GMX_20060504 = require("ogc-schemas/lib/ISO19139_GMX_20060504");
var $hzBBV$ogcschemaslibISO19139_SRV_20060504 = require("ogc-schemas/lib/ISO19139_SRV_20060504");
var $hzBBV$ogcschemaslibISO19139_GCO_20070417 = require("ogc-schemas/lib/ISO19139_GCO_20070417");
var $hzBBV$ogcschemaslibISO19139_GMD_20070417 = require("ogc-schemas/lib/ISO19139_GMD_20070417");
var $hzBBV$ogcschemaslibISO19139_GTS_20070417 = require("ogc-schemas/lib/ISO19139_GTS_20070417");
var $hzBBV$ogcschemaslibISO19139_GSS_20070417 = require("ogc-schemas/lib/ISO19139_GSS_20070417");
var $hzBBV$ogcschemaslibISO19139_GSR_20070417 = require("ogc-schemas/lib/ISO19139_GSR_20070417");
var $hzBBV$ogcschemaslibISO19139_GMX_20070417 = require("ogc-schemas/lib/ISO19139_GMX_20070417");
var $hzBBV$ogcschemaslibISO19139_2_GMI_1_0 = require("ogc-schemas/lib/ISO19139_2_GMI_1_0");
require("ol/control/Control");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire14dc"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire14dc"] = parcelRequire;
}
parcelRequire.register("dwrOc", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $9d83d5c18bf7151e$export$2e2bcd8739ae039);
/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer
 * Copyright (c) 2018 Emmanuel Blondel
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *		   
 */ //jquery
parcelRequire("2ueYb");














parcelRequire("gRlUG");
parcelRequire("8a8x0");
parcelRequire("dt7Im");
parcelRequire("5jtNU");
parcelRequire("9Kl7j");
parcelRequire("h8Opi");
parcelRequire("1lsLX");

var $MXQFO = parcelRequire("MXQFO");
parcelRequire("6d4gj");
parcelRequire("7Fhga");
parcelRequire("9Mx5c");
parcelRequire("38N2h");
parcelRequire("82GVD");
parcelRequire("DS9GW");

var $8rzju = parcelRequire("8rzju");

var $kgzwJ = parcelRequire("kgzwJ");

var $d7Gjo = parcelRequire("d7Gjo");
parcelRequire("a24tQ");

var $6eueJ = parcelRequire("6eueJ");

var $a7gdG = parcelRequire("a7gdG");



































var $iftof = parcelRequire("iftof");
parcelRequire("7diFq");

(0, ($parcel$interopDefault($hzBBV$select2)))($); //Hook up select2 to jQuery      
window.AnimatedCluster = (0, ($parcel$interopDefault($hzBBV$olextlayerAnimatedClusterjs)));
window.SelectCluster = (0, ($parcel$interopDefault($hzBBV$olextinteractionSelectClusterjs)));
window.colorbrewer = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)));
var bootstrapButton = $.fn.button.noConflict(); // return $.fn.button to previously assigned value
$.fn.bootstrapBtn = bootstrapButton;
/**
 * @classdesc
 * OpenFairViewer
 */ class OpenFairViewer {
    /**
	 * @param {Object} The OpenFairViewer config.
	 * @param {Object} options
	 *
	 */ constructor(config, opt_options){
        var this_ = this;
        //version
        this.versioning = {
            VERSION: "2.7.8",
            DATE: new Date("2022-12-01")
        };
        //protocol
        this.protocol = window.origin.split("://")[0];
        this.secure = this.protocol == "https";
        //Cesium 3D support?
        this.enable_3d = window.Cesium != undefined;
        //set-up application labels
        this.initApplicationLanguage(config, opt_options).then(function(labels) {
            this_.initApplicationConfig(config, opt_options, labels);
            this_.init(true);
        });
    }
    /**
	 * @param {Object} The OpenFairViewer config.
	 * @param {Object} opt_options
	 * @return a Jquery promise
	 */ initApplicationLanguage(config, opt_options) {
        var options = opt_options || {};
        var this_ = this;
        var language_auto = true;
        var language_default = "en";
        if (options.language) {
            console.log(options.language);
            if (typeof options.language.auto != "undefined") language_auto = options.language.auto;
            if (options.language.default) language_default = options.language.default;
        }
        var url = "./i18n/" + language_default + ".json";
        if (language_auto) {
            console.log("Language auto mode enabled");
            var lang = navigator.language || navigator.userLanguage;
            switch(lang.substr(0, 2)){
                case "fr":
                    url = "./i18n/fr.json";
                    break;
                case "en":
                    url = "./i18n/en.json";
                    break;
                case "es":
                    url = "./i18n/es.json";
                    break;
                default:
                    url = "./i18n/" + language_default + ".json";
                    break;
            }
            console.log("Browser language '" + lang + "' detected -> Load labels from JSON file '" + url + "'");
        }
        if (options.labels) {
            if (options.labels.file) url = options.labels.file;
        }
        console.log("Use language labels from JSON file: '" + url + "'");
        var deferred = $.Deferred();
        $.ajax({
            type: "GET",
            url: url,
            success: function(labels) {
                deferred.resolve(labels);
            }
        });
        return deferred.promise();
    }
    /**
	 * @param {Object} The OpenFairViewer config.
	 * @param {Object} opt_options
	 * @param {Object} labels
	 *
	 */ initApplicationConfig(config, opt_options, labels) {
        var this_ = this;
        //CSW
        if (!config.OGC_CSW_BASEURL) alert("OpenFairViewer cannot be instantiated. Missing CSW endpoint");
        this.config = config;
        this.config.OFV_ID = config.id ? config.id : "OFV";
        var defaultProfile = {
            about: "About OpenFairViewer"
        };
        this.config.OFV_PROFILE = config.profile ? config.profile : defaultProfile;
        this.config.OFV_CONTAINERID = config.containerId ? config.containerId : "body";
        this.config.OGC_CSW_VERSION = "2.0.2";
        this.config.OGC_CSW_SCHEMA = "http://www.isotc211.org/2005/gmd";
        this.config.OGC_CSW_MAXRECORDS = 5;
        this.config.OGC_FILTER_VERSION = null;
        this.config.OGC_OWS_FILTER_SCHEMAS = [];
        switch(this.config.OGC_CSW_VERSION){
            case "2.0.2":
                this.config.OGC_FILTER_VERSION = "1.1.0";
                this.config.OGC_FILTER_SCHEMAS = [
                    CSW_2_0_2
                ];
                break;
            case "3.0.0":
                this.config.OGC_FILTER_VERSION = "2.0";
                this.config.OGC_FILTER_SCHEMAS = [
                    CSW_3_0
                ];
                break;
        }
        var options = opt_options || {};
        this.options = {};
        //oninit
        if (options.oninit) this.options.oninit = options.oninit;
        //LABELS
        //--------------------------------------------------------------------------------------------------
        this.options.labels = labels;
        //apply option labels if defined
        if (options.labels) {
            if (options.labels.terms) Object.keys(this_.options.labels).forEach(function(label) {
                if (options.labels[label]) this_.options.labels[label] = options.labels.terms[label];
            });
        }
        //FIND options
        //--------------------------------------------------------------------------------------------------
        this.options.find = {};
        this.options.find.maxitems = null;
        this.options.find.filter = undefined;
        this.options.find.filterByWMS = false;
        this.options.find.datasetInfoHandler = function(metadata) {
            var datasetInfoUrl = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&id=" + metadata.fileIdentifier;
            window.open(datasetInfoUrl, "_blank");
        };
        this.options.find.facets = [];
        if (options.find) {
            if (options.find.maxitems) this.options.find.maxitems = options.find.maxitems;
            if (options.find.filter) this.options.find.filter = options.find.filter;
            if (options.find.datasetInfoHandler) this.options.find.datasetInfoHandler = options.find.datasetInfoHandler;
            if (options.find.filterByWMS) {
                this.options.find.filterByWMS = options.find.filterByWMS;
                var wmsFilter = new (0, $MXQFO.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, "csw:OnlineResourceType", "%WMS%");
                if (typeof this.options.find.filter == "undefined") this.options.find.filter = wmsFilter;
                else this.options.find.filter = new (0, $kgzwJ.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
                    this.options.find.filter,
                    wmsFilter
                ]);
            }
            if (options.find.facets) {
                if (options.find.facets.length > 0) {
                    this.options.find.facets = options.find.facets;
                    $("#find-facets-title").show();
                }
            }
        }
        //spatial coverage vector layer params
        this.options.find.defaultStyle = new (0, $hzBBV$olstyle.Style)({
            fill: new (0, $hzBBV$olstyle.Fill)({
                color: [
                    0,
                    153,
                    255,
                    0.5
                ]
            }),
            stroke: new (0, $hzBBV$olstyle.Stroke)({
                color: [
                    0,
                    153,
                    255,
                    1
                ],
                width: 2
            })
        });
        this.options.find.selectStyle = new (0, $hzBBV$olstyle.Style)({
            fill: new (0, $hzBBV$olstyle.Fill)({
                color: [
                    255,
                    255,
                    255,
                    0.8
                ]
            }),
            stroke: new (0, $hzBBV$olstyle.Stroke)({
                color: [
                    0,
                    153,
                    255,
                    1
                ],
                width: 2
            })
        });
        this.options.find.hoverStyle = new (0, $hzBBV$olstyle.Style)({
            image: new (0, $hzBBV$olstyle.Circle)({
                radius: 3,
                fill: new (0, $hzBBV$olstyle.Fill)({
                    color: [
                        255,
                        255,
                        255,
                        0.2
                    ]
                }),
                stroke: new (0, $hzBBV$olstyle.Stroke)({
                    color: [
                        0,
                        153,
                        255,
                        1
                    ],
                    width: 2
                })
            }),
            fill: new (0, $hzBBV$olstyle.Fill)({
                color: [
                    255,
                    255,
                    255,
                    0.2
                ]
            }),
            stroke: new (0, $hzBBV$olstyle.Stroke)({
                color: [
                    0,
                    153,
                    255,
                    1
                ],
                width: 2
            })
        });
        //QUERY options
        //--------------------------------------------------------------------------------------------------
        //Access
        this.options.access = {};
        this.options.access.columns = 2;
        this.options.access.time = "datePicker";
        this.options.access.values_to_exclude_for = null;
        if (options.access) {
            if (options.access.columns) {
                if ([
                    1,
                    2
                ].indexOf(options.access.columns) != -1) this.options.access.columns = options.access.columns;
            }
            if (options.access.time) this.options.access.time = options.access.time;
            if (options.access.values_to_exclude_for) this.options.access.values_to_exclude_for = options.access.values_to_exclude_for;
        }
        //dashboard
        this.options.access.dashboard = {};
        this.options.access.dashboard.enabled = true;
        //Set default handlers
        this.options.access.dashboard.handlers = new Array();
        //handler option
        if (options.access) {
            if (options.access.dashboard) {
                if (options.access.dashboard.enabled) this.options.access.dashboard.enabled = options.access.dashboard.enabled;
                if (options.access.dashboard.handlers) this.options.access.dashboard.handlers = options.access.dashboard.handlers;
            }
        }
        //MAP options
        //--------------------------------------------------------------------------------------------------
        this.options.map = {};
        //mode
        this.options.map.mode = "2D";
        //controls
        this.options.map.control_options = {};
        this.options.map.control_options.loadingpanel = {
            widget: "progressbar"
        };
        if (options.map) {
            if (options.map.control_options) {
                if (options.map.control_options.loadingpanel) this.options.map.control_options.loadingpanel = options.map.control_options.loadingpanel;
            }
        }
        //watermark
        this.options.map.attribution = null;
        if (options.map) this.options.map.attribution = options.map.attribution ? options.map.attribution : null;
        //projections
        this.options.map.projection = "EPSG:4326";
        this.options.map.proj4defs = [
            {
                epsgcode: "EPSG:4326",
                proj4string: "+proj=longlat +datum=WGS84 +no_defs"
            },
            {
                epsgcode: "EPSG:3031",
                proj4string: "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
            },
            {
                epsgcode: "EPSG:2154",
                proj4string: "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
            }
        ];
        if (options.map) {
            if (options.map.mode) {
                if ([
                    "2D",
                    "3D"
                ].indexOf(options.map.mode) != -1) this.options.map.mode = options.map.mode;
            }
            if (options.map.projection) this.options.map.projection = options.map.projection;
            if (options.map.proj4defs) for(var p = 0; p < options.map.proj4defs.length; p++)this.options.map.proj4defs.push(options.map.proj4defs[p]);
            for(var i = 0; i < this.options.map.proj4defs.length; i++){
                var proj4def = this.options.map.proj4defs[i];
                (0, ($parcel$interopDefault($hzBBV$proj4))).defs(proj4def.epsgcode, proj4def.proj4string);
            }
            (0, $hzBBV$olprojproj4.register)((0, ($parcel$interopDefault($hzBBV$proj4))));
        }
        //vectorizing/clustering
        this.options.map.point_vectorizing = false;
        this.options.map.point_clustering = false;
        this.options.map.point_clustering_options = {
            distance: 50,
            pointRadius: 15,
            radiusFactor: 1.3,
            spiral: true,
            circleMaxObjects: 10,
            animate: true,
            animationDuration: 700,
            style: function(feature1, resolution) {
                var styleText = feature1.get("features") ? feature1.get("features").length == 1 ? "" : feature1.get("features").length.toString() : "";
                return new (0, $hzBBV$olstyle.Style)({
                    image: new (0, $hzBBV$olstyle.Circle)({
                        stroke: new (0, $hzBBV$olstyle.Stroke)({
                            color: "rgba(0,0,192,0.5)",
                            width: 2
                        }),
                        fill: new (0, $hzBBV$olstyle.Fill)({
                            color: "rgba(0,0,192,0.3)"
                        }),
                        radius: styleText == "" ? 5 : 8
                    }),
                    text: new (0, $hzBBV$olstyle.Text)({
                        text: styleText,
                        //font: 'bold 12px comic sans ms',
                        //textBaseline: 'top',
                        fill: new (0, $hzBBV$olstyle.Fill)({
                            color: "#fff"
                        })
                    })
                });
            },
            selectClusterFeatureStyle: function(feature1, resolution) {
                var styles = [
                    new (0, $hzBBV$olstyle.Style)({
                        image: new (0, $hzBBV$olstyle.Circle)({
                            radius: 3,
                            fill: new (0, $hzBBV$olstyle.Fill)({
                                color: [
                                    255,
                                    255,
                                    255,
                                    0.2
                                ]
                            }),
                            stroke: new (0, $hzBBV$olstyle.Stroke)({
                                color: "orange",
                                width: 3
                            })
                        }),
                        fill: new (0, $hzBBV$olstyle.Fill)({
                            color: [
                                255,
                                255,
                                255,
                                0.2
                            ]
                        }),
                        stroke: new (0, $hzBBV$olstyle.Stroke)({
                            color: "gray",
                            width: 1,
                            lineDash: [
                                4,
                                4
                            ]
                        })
                    })
                ];
                return styles;
            },
            selectClusterStyle: function(feature1, resolution) {
                var styleText = feature1.get("features") ? feature1.get("features").length == 1 ? "" : feature1.get("features").length.toString() : "";
                return [
                    new (0, $hzBBV$olstyle.Style)({
                        image: new (0, $hzBBV$olstyle.Circle)({
                            stroke: new (0, $hzBBV$olstyle.Stroke)({
                                color: "rgba(0,0,192,0.5)",
                                width: 2
                            }),
                            fill: new (0, $hzBBV$olstyle.Fill)({
                                color: "rgba(0,0,192,0.3)"
                            }),
                            radius: styleText == "" ? 5 : 8
                        }),
                        text: new (0, $hzBBV$olstyle.Text)({
                            text: styleText,
                            //font: 'bold 12px comic sans ms',
                            //textBaseline: 'top',
                            fill: new (0, $hzBBV$olstyle.Fill)({
                                color: "#fff"
                            })
                        })
                    })
                ];
            }
        };
        if (options.map) {
            if (options.map.point_vectorizing) this.options.map.point_vectorizing = options.map.point_vectorizing;
            if (options.map.point_clustering) this.options.map.point_clustering = options.map.point_clustering;
            if (options.map.point_clustering_options) {
                if (options.map.point_clustering_options.distance) this.options.map.point_clustering_options.distance = options.map.point_clustering_options.distance;
                if (options.map.point_clustering_options.pointRadius) this.options.map.point_clustering_options.pointRadius = options.map.point_clustering_options.pointRadius;
                if (options.map.point_clustering_options.radiusFactor) this.options.map.point_clustering_options.radiusFactor = options.map.point_clustering_options.radiusFactor;
                if (options.map.point_clustering_options.spiral) this.options.map.point_clustering_options.spiral = options.map.point_clustering_options.spiral;
                if (options.map.point_clustering_options.circleMaxObjects) this.options.map.point_clustering_options.circleMaxObjects = options.map.point_clustering_options.circleMaxObjects;
                if (options.map.point_clustering_options.animate) this.options.map.point_clustering_options.animate = options.map.point_clustering_options.animate;
                if (options.map.point_clustering_options.animationDuration) this.options.map.point_clustering_options.animationDuration = options.map.point_clustering_options.animationDuration;
                if (options.map.point_clustering_options.style) this.options.map.point_clustering_options.style = options.map.point_clustering_options.style;
                if (options.map.point_clustering_options.selectClusterFeatureStyle) this.options.map.point_clustering_options.selectClusterFeatureStyle = options.map.point_clustering_options.selectClusterFeatureStyle;
                if (options.map.point_clustering_options.selectClusterStyle) this.options.map.point_clustering_options.selectClusterStyle = options.map.point_clustering_options.selectClusterStyle;
            }
        }
        //zoom
        this.options.map.zoom = 3;
        if (options.map) this.options.map.zoom = options.map.zoom ? options.map.zoom : 3;
        //extent
        this.options.map.extent = undefined;
        if (options.map) {
            if (options.map.extent) {
                if (!(options.map.extent instanceof Array)) console.error("Map extent should be an array");
                else if (options.map.extent.length != 4) console.error("Map extent array should be of length 4");
                else this.options.map.extent = options.map.extent;
            }
        }
        //layergroups
        this.options.map.baselayergroup = {
            name: this_.options.labels.basemaps,
            fold: "open"
        };
        if (options.map) {
            if (options.map.baselayergroup) this.options.map.baselayergroup = options.map.baselayergroup;
        }
        this.options.map.layergroups = [
            {
                name: "Base overlays",
                fold: "open"
            },
            {
                name: "Statistical maps",
                fold: "open"
            }
        ];
        if (options.map) {
            if (options.map.layergroups) this.options.map.layergroups = options.map.layergroups;
        }
        //statistics layergroup
        this.options.map.mainlayergroup = this.options.map.layergroups.length - 1;
        if (options.map) {
            if (options.map.mainlayergroup) this.options.map.mainlayergroup = options.map.mainlayergroup;
        }
        //baselayers
        this.options.map.baselayers = [
            new (0, $hzBBV$ollayer.Tile)({
                title: "EMODnet Bathymetry World baselayer",
                //extent: [-180,-90,180,90],
                type: "base",
                source: new (0, $hzBBV$olsource.WMTS)({
                    url: "https://tiles.emodnet-bathymetry.eu/2020/{Layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png",
                    layer: "baselayer",
                    requestEncoding: "REST",
                    matrixSet: "inspire_quad",
                    format: "image/png",
                    projection: "EPSG:4326",
                    tileGrid: this_.inspireWgs84Grid(12, "")
                })
            }),
            new (0, $hzBBV$ollayer.Tile)({
                title: "UN Clear Map (Dark)",
                type: "base",
                source: new (0, $hzBBV$olsource.TileArcGISRest)({
                    url: "https://geoservices.un.org/arcgis/rest/services/ClearMap_Dark/MapServer",
                    crossOrigin: "anonymous",
                    wrapX: true
                })
            }),
            new (0, $hzBBV$ollayer.Tile)({
                title: "UN Clear Map",
                type: "base",
                source: new (0, $hzBBV$olsource.TileArcGISRest)({
                    url: "https://geoservices.un.org/arcgis/rest/services/ClearMap_Topo/MapServer",
                    crossOrigin: "anonymous",
                    wrapX: true
                })
            }),
            new (0, $hzBBV$ollayer.Tile)({
                title: "OpenStreetMaps",
                type: "base",
                source: new (0, $hzBBV$olsource.OSM)()
            }),
            new (0, $hzBBV$ollayer.Tile)({
                title: "World Imagery",
                type: "base",
                source: new (0, $hzBBV$olsource.XYZ)({
                    projection: $hzBBV$olproj.get(this_.options.map.projection),
                    url: "https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    tileSize: 256,
                    maxResolution: 180 / 256,
                    crossOrigin: "anonymous",
                    wrapX: true
                })
            })
        ];
        if (options.map) {
            if (options.map.baselayers) this.options.map.baselayers = options.map.baselayers;
        }
        //overlays
        this.options.map.overlays = [];
        if (options.map) {
            if (options.map.overlays) this.options.map.overlays = options.map.overlays;
        }
        //layer_options
        this.options.map.layer_options = {};
        this.options.map.layer_options.tiled = true;
        this.options.map.layer_options.opacity = 0.9;
        if (options.map) {
            if (options.map.layer_options) {
                if (options.map.layer_options.tiled) this.options.map.layer_options.tiled = options.map.layer_options.tiled;
                if (options.map.layer_options.opacity) this.options.map.layer_options.opacity = options.map.layer_options.opacity;
            }
        }
        //thematic options
        this.options.map.thematicmapping_options = {
            breaks: [
                "",
                " to ",
                ""
            ],
            thresholding: true,
            threshold: "> 0"
        };
        if (options.map) {
            if (options.map.thematicmapping_options) {
                //breaks
                if (options.map.thematicmapping_options.breaks) {
                    if (!(options.map.thematicmapping_options.breaks instanceof Array)) console.error("Styling breaks should be an array");
                    else if (options.map.thematicmapping_options.breaks.length != 3) console.error("Styling breaks array should be of length 3");
                    else this.options.map.thematicmapping_options.breaks = options.map.thematicmapping_options.breaks;
                }
                //threshold
                if (options.map.thematicmapping_options.thresholding) this.options.map.thematicmapping_options.thresholding = options.map.thematicmapping_options.thresholding;
                if (options.map.thematicmapping_options.threshold) this.options.map.thematicmapping_options.threshold = options.map.thematicmapping_options.threshold;
            }
        }
        //popup
        this.options.map.popup = {};
        this.options.map.popup.mode = "map";
        this.options.map.popup.enabled = true;
        this.options.map.popup.onopen = function(layer, features) {};
        this.options.map.popup.onclose = function(layer, features) {};
        //default handlers
        this.options.map.popup.DEFAULT_HANDLER = function(layer, features) {
            console.log(layer);
            console.log(features);
            console.log("Inherit DSD from layer in popup");
            console.log(layer.dsd);
            //patterns
            var regexps = {
                DATE: new RegExp("^([1-9][0-9]{3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$"),
                DATETIME: new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$")
            };
            //featureHandler
            var featureHandler = function(layer, feature1) {
                var props = feature1.getProperties();
                console.log(props);
                var html = '<table class="table table-condensed">';
                var propNames = Object.keys(props);
                //text fields
                for(var i = 0; i < propNames.length; i++){
                    var propName = propNames[i];
                    if (propName == "boundedBy") continue;
                    var prop = props[propName];
                    if (prop) {
                        var propFromDsd = null;
                        //propName
                        var propNameLabel = "<b>" + propName + "</b>";
                        if (layer.dsd) {
                            propFromDsd = layer.dsd.filter(function(item) {
                                if (item.primitiveCode == propName) return item;
                            });
                            if (propFromDsd.length > 0) {
                                propFromDsd = propFromDsd[0];
                                propNameLabel = "<b>" + propFromDsd.name + '</b> <span class="dsd-ui-item-code">[' + propFromDsd.primitiveCode + "]</span>";
                                if (propFromDsd.definition) {
                                    if (propFromDsd.definition.length > 0) propNameLabel += ' <span class="glyphicon glyphicon-info-sign attribute-info" title="' + propFromDsd.definition + '"></span>';
                                }
                            }
                        }
                        if (typeof prop == "string") {
                            if (prop.indexOf("http") == 0) prop = '<a href="' + prop + '" target="_blank" style="color:#337ab7">Link</a>';
                        }
                        var isBase64 = false;
                        if (typeof prop == "string") isBase64 = prop.startsWith("base64:") || prop.startsWith("data:image/png;base64,");
                        var isDate = false;
                        if (typeof prop == "string") isDate = prop.match(regexps.DATE) != null;
                        var isDateTime = false;
                        if (typeof prop == "string") isDateTime = prop.match(regexps.DATETIME) != null;
                        if (typeof prop != "undefined" && !(prop instanceof $hzBBV$olgeom.Geometry)) {
                            if (!isBase64) {
                                var propToDisplay = prop;
                                if (isDateTime) {
                                    var date = new Date(Date.parse(prop));
                                    propToDisplay = date.toISOString().split("T")[0] + "T" + date.toLocaleTimeString();
                                }
                                html += "<tr><td>" + propNameLabel + "</td><td>" + propToDisplay;
                                if (propFromDsd) {
                                    if (propFromDsd.uom) html += " " + propFromDsd.uom;
                                }
                                if (isDate || isDateTime) {
                                    html += '<button style="margin: 0px 10px;font-size:inherit;" class="btn btn-xs" ';
                                    html += 'onclick="' + this_.config.OFV_ID + ".getNextFeatureInfoInTime('" + layer.id + "','" + layer.baseDataUrl + "','1.0.0','" + layer.getSource().getParams().LAYERS + "','" + propName + "','" + prop + "')\">Next</button>";
                                }
                                html += "</td></tr>";
                            }
                        }
                    }
                }
                //image fields
                var imgPropNames = propNames.filter(function(propName) {
                    var prop = props[propName];
                    if (typeof prop == "undefined") return false;
                    var isBase64 = false;
                    if (typeof prop == "string") isBase64 = prop.startsWith("base64:") || prop.startsWith("data:image/png;base64,");
                    if (isBase64) return propName;
                });
                if (imgPropNames.length > 0) {
                    html += "<tr><td><b>Images</b></td><td>";
                    for(var i = 0; i < imgPropNames.length; i++){
                        var imgPropName = imgPropNames[i];
                        var prop = props[imgPropName];
                        if (prop.startsWith("base64:")) prop = "data:image/png;base64," + prop.split("base64:")[1];
                        html += '<img src="' + prop + '" width="45%" style="margin:2px;" alt="' + imgPropName + '" title="' + imgPropName + '"/>';
                    }
                    html += "</td></tr>";
                }
                html += "</table>";
                return html;
            };
            if (features.length == 1) return featureHandler(layer, features[0]);
            else return features.map(function(item) {
                return featureHandler(layer, item);
            }).join("<br>");
        };
        //Set default handler
        this.options.map.popup.handler = this.options.map.popup.DEFAULT_HANDLER;
        //popup handler option
        if (options.map) {
            if (options.map.popup) {
                if (options.map.popup.mode) this.options.map.popup.mode = options.map.popup.mode;
                if (options.map.popup.enabled) this.options.map.popup.enabled = options.map.popup.enabled;
                if (options.map.popup.handler) this.options.map.popup.handler = options.map.popup.handler;
                if (options.map.popup.onopen) this.options.map.popup.onopen = options.map.popup.onopen;
                if (options.map.popup.onclose) this.options.map.popup.onclose = options.map.popup.onclose;
            }
        }
        //cesium
        this.options.cesium = {};
        this.options.cesium.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWY1NmQzZS1hNzMyLTRlNDMtOTI3Yi1kZWY5ZWZlM2Q0NDUiLCJpZCI6MzcyMTgsImlhdCI6MTYwNDY3NDAyN30.9tFv8RqF2p-oYLTrp-b5AIg5u721Ohh9psMgSJFMY3s";
        if (options.cesium) {
            if (options.cesium.accessToken) this.options.cesium.defaultAccessToken = options.cesium.accessToken;
        }
        //events
        this.mapEvents = new Array();
        //panels
        this.options.panel = {};
        if (options.panel) this.options.panel.welcome = options.panel.about ? options.panel.about : "aboutDialog2";
        //datasets caching
        this.datasets = new Array();
        //dataset access export (managed at the end to support config conditions
        //export methods
        this.options.access.defaultExports = [
            {
                "id": "data-table",
                "main": true,
                "enabled": true,
                "services": [
                    "wms",
                    "wfs"
                ],
                "title": this.options.labels.tabulardata_title,
                "handler": this.displayDataTable,
                "class": "data-table"
            },
            /*{
				'id': 'data-dashboard',
				'main': true,
				'enabled': (this.options.access.dashboard.enabled && this.options.access.dashboard.handlers.length > 0),
				'services': ['wms', 'wfs'],
				'title': this.options.labels.dashboard_title,
				'handler': this.displayDashboard,
				'class': 'data-dashboard'
			},*/ {
                "id": "data-csv-raw",
                "main": true,
                "enabled": true,
                "services": [
                    "wfs"
                ],
                "title": this.options.labels.download_data,
                "handler": this.exportToCSV,
                "class": "data-csv-raw"
            },
            {
                "id": "data-png-map",
                "main": true,
                "enabled": true,
                "services": [
                    "wms"
                ],
                "title": this.options.labels.download_map,
                "handler": this.exportToPNG,
                "class": "data-png-map"
            },
            {
                "id": "data-wfs",
                "main": false,
                "enabled": true,
                "services": [
                    "wfs"
                ],
                "title": this.options.labels.download_wfs,
                "handler": this.exportToWFS,
                "class": "data-wfs"
            },
            {
                "id": "data-rscript",
                "main": false,
                "enabled": true,
                "services": [
                    "wfs"
                ],
                "title": this.options.labels.download_rscript,
                "handler": this.exportToRScript,
                "class": "data-rscript"
            },
            {
                "id": "data-jupyter-notebook",
                "main": false,
                "enabled": true,
                "services": [
                    "wfs"
                ],
                "title": this.options.labels.download_jupyter,
                "handler": this.exportToRJupyterNotebook,
                "class": "data-jupyter-notebook"
            }
        ];
        this.options.access.exports = this.options.access.defaultExports;
        if (options.access) {
            if (options.access.exports) {
                //overwrite default methods in case they are declared from config
                this.options.access.exports = this.options.access.exports.map(function(item) {
                    var export_method = item;
                    options.access.exports.forEach(function(added_method) {
                        if (item.id == added_method.id) export_method = added_method;
                    });
                    return export_method;
                });
                //add extra methods?
                console.log(this_.options.access.exports.map(function(method) {
                    return method.id;
                }));
                options.access.exports.forEach(function(toadd) {
                    if (this_.options.access.exports.map(function(method) {
                        return method.id;
                    }).indexOf(toadd.id) == -1) this_.options.access.exports.push(toadd);
                });
            }
        }
        //main OFV instance object
        window[this.config.OFV_ID] = this;
    }
    /**
	 * OpenFairViewer.prototype.initMarkup
	 *
	 */ initMarkup(intro) {
        var this_ = this;
        var deferred = $.Deferred();
        this.loadTemplate("templates/main.tpl.html", "mainTpl").then(function(template) {
            var main = (0, ($parcel$interopDefault($hzBBV$mustachemustachemjs))).render(template, {
                OFV_ID: this_.config.OFV_ID,
                OFV_PROFILE: this_.config.OFV_PROFILE,
                labels: this_.options.labels,
                mode: this_.options.map.mode == "2D" ? "3D" : "2D"
            });
            if (this_.config.OFV_CONTAINERID == "body") main = '<div class="wrapper">' + main + "</div>";
            if (intro) $(this_.config.OFV_CONTAINERID == "body" ? "body" : "#" + this_.config.OFV_CONTAINERID).append(main);
            this_.initFindFacets();
            deferred.resolve();
        });
        return deferred.promise();
    }
    /**
	 * init
	 */ init(intro) {
        var this_ = this;
        this.initMarkup(intro).then(function() {
            this_.selection = new Array();
            this_.initBrowseCatalogue();
            this_.initBrowseAdvancedSettings();
            this_.initBrowsePagination();
            this_.initDataViewer();
            //event on page number selection
            $("select[id='datasets_length']").on("change", function() {
                var maxrecords = parseInt(this.value);
                console.log("Browsing " + maxrecords + " records...");
                this_.displayDatasets(maxrecords);
            });
            //get Datasets from CSW
            this_.displayDatasets(this_.config.OGC_CSW_MAXRECORDS);
            $("#dataset-form").submit(function(e) {
                e.preventDefault();
                var maxrecords = parseInt($("select[id='datasets_length']").val());
                if ($("#dataset-search-bbox-on-search").prop("checked") && $("#dataset-search-bbox-on-mapinteraction").prop("checked")) {
                    var bbox = this_.map.getView().calculateExtent(this_.map.getSize());
                    this_.displayDatasets(maxrecords, bbox);
                } else this_.displayDatasets(maxrecords);
                return false;
            });
            //init widgets
            this_.initDialog("aboutDialog", this_.options.labels.about, {
                "ui-dialog": "about-dialog",
                "ui-dialog-title": "dialog-title"
            }, null, 0);
            this_.initDialog("findDialog", this_.options.labels.find, {
                "ui-dialog": "find-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "left top",
                at: "left center",
                of: window
            }, 1);
            this_.initDialog("accessDialog", this_.options.labels.access, {
                "ui-dialog": "access-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "left top",
                at: "left center",
                of: window
            }, 2);
            this_.initDialog("infoDialog", this_.options.labels.info, {
                "ui-dialog": "info-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "left top",
                at: "left center",
                of: window
            }, 3);
            this_.initDialog("dataDialog", this_.options.labels.tabulardata, {
                "ui-dialog": "data-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "left top",
                at: "left center",
                of: window
            }, 4);
            this_.initDialog("dashboardDialog", this_.options.labels.dashboard, {
                "ui-dialog": "dashboard-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "left top",
                at: "left center",
                of: window
            }, 5, function() {}, function() {
                $("#dashboard-selector").val("").trigger("change");
            });
            this_.initDialog("featureDialog", this_.options.labels.featureinfo, {
                "ui-dialog": "feature-dialog",
                "ui-dialog-title": "dialog-title"
            }, {
                my: "right bottom",
                at: "right bottom",
                of: window
            }, 6, function() {}, function() {}, true, true);
            this_.closeAccessDialog();
            this_.closeDataDialog();
            this_.closeDashboardDialog();
            this_.closeInfoDialog();
            this_.closeFeatureDialog();
            this_.openFindDialog();
            if (intro) this_.openAboutDialog();
            //resolve viewer from URL
            this_.resolveViewer();
            //message listener
            this_.enableMessageListener();
            this_._copyright();
            //on init
            this_.oninit();
        });
    }
    oninit() {
        if (this.options.oninit) this.options.oninit();
    }
    /**
	 * reset
	 */ reset() {
        var mainpage = document.location.href.split("?")[0];
        if (window.history.replaceState) window.history.replaceState("", "", mainpage);
        else document.location.href = mainpage;
        this.init(false);
    }
    /**
	 * rewriteURL
	 * @param {String} url
	 */ rewriteURL(url) {
        if (window.location.origin.startsWith("https")) url = url.replace(/^http:\/\//i, "https://");
        return url;
    }
    /**
	 * OpenFairViewer.prototype.getAllUrlParams util function to get URL param valus
	 * Here the primary use is to be able to grab a security token that would be
	 * passed from within a i-Marine VRE portlet
	 * @param url
	 * @returns an object with all parameter values
	 */ getAllUrlParams(url) {
        var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
        var obj = {};
        if (queryString) {
            queryString = queryString.split("#")[0];
            var arr = queryString.split("&");
            for(var i = 0; i < arr.length; i++){
                var a = arr[i].split("=");
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = v.slice(1, -1);
                    return "";
                });
                var paramValue = typeof a[1] === "undefined" ? true : a[1];
                if (obj[paramName]) {
                    if (typeof obj[paramName] === "string") obj[paramName] = [
                        obj[paramName]
                    ];
                    if (typeof paramNum === "undefined") obj[paramName].push(paramValue);
                    else obj[paramName][paramNum] = paramValue;
                } else obj[paramName] = paramValue;
            }
        }
        return obj;
    }
    /**
	 * setEmbedLink
	 */ setEmbedLink() {
        if (!document.getElementById) return void 0;
        var url = location.href.replace(/#.*$/, "").replace(/\?.*$/, "");
        url += "?";
        var ofv_params = [
            "mode",
            "dataset",
            "baseview",
            "views",
            "extent",
            "center",
            "zoom",
            "popup_id",
            "popup_coords"
        ];
        var custom_params = Object.keys(this.getAllUrlParams()).filter(function(item) {
            if (ofv_params.indexOf(item) < 0 && item != "") return item;
        });
        if (custom_params.length > 0) for(var i = 0; i < custom_params.length; i++)url += (i == 0 ? "" : "&") + custom_params[i] + "=" + this.getAllUrlParams()[custom_params[i]];
        //dataset on query
        if (this.dataset_on_query) url += (url.endsWith("?") ? "" : "&") + "dataset=" + this.dataset_on_query.pid;
        //mode
        url += (url.endsWith("?") ? "" : "&") + "mode=" + (this.enable_3d ? this.ol3d.getEnabled() ? "3D" : "2D" : "2D");
        //baseview
        var baseview = this.map.getLayers().getArray()[0].getLayersArray().filter(function(item) {
            return item.getVisible();
        })[0];
        url += "&baseview=" + encodeURIComponent(baseview.getProperties().title);
        //views
        var encoded_views = new Array();
        var viewlayers = this.layers.overlays[this.options.map.mainlayergroup].getLayers().getArray().filter(function(item) {
            if (item.id != "ofv-csw-spatial-coverages" && typeof item.strategy != "undefined") return item;
        });
        viewlayers.sort((a, b)=>{
            return a.getZIndex() - b.getZIndex() > 0 ? 1 : -1;
        });
        console.log(viewlayers);
        for(var i = 0; i < viewlayers.length; i++){
            var encoded_view = "";
            var viewlayer = viewlayers[i];
            //if(!viewlayer.getSource().getParams) continue;
            var params = viewlayer.params;
            var pid = viewlayer.pid;
            var lyr = viewlayer.id;
            var strategy1 = viewlayer.strategy;
            encoded_view += "pid=" + pid + ",";
            encoded_view += "lyr=" + lyr + ",";
            encoded_view += "strategy=" + strategy1 + ",";
            switch(strategy1){
                case "ogc_filters":
                    console.log("Setting embed link for view with strategy 'ogc_filters'");
                    if (viewlayer.dsd) {
                        if (params["CQL_FILTER"]) encoded_view += "par=" + params["CQL_FILTER"] + ",";
                        //map options
                        if (viewlayer.variable) encoded_view += "var=" + viewlayer.variable + ",";
                        if (viewlayer.envfun) encoded_view += "fun=" + viewlayer.envfun + ",";
                        if (viewlayer.envmaptype) encoded_view += "maptype=" + viewlayer.envmaptype + ",";
                        if (viewlayer.envmaptype) encoded_view += "env=" + params["env"] + ",";
                        if (viewlayer.envcolscheme) encoded_view += "cs=" + viewlayer.envcolscheme + ",";
                        if (viewlayer.count) encoded_view += "count=" + viewlayer.count + ",";
                        if (params["STYLES"]) encoded_view += "style=" + params["STYLES"] + ",";
                        if (viewlayer.geom) encoded_view += "geom=" + viewlayer.geom + ",";
                        if (viewlayer.geomtype) encoded_view += "geomtype=" + viewlayer.geomtype + ",";
                    }
                    break;
                case "ogc_dimensions":
                    console.log("Setting embed link for view with strategy 'ogc_dimensions'");
                    if (params["TIME"] != null | params["ELEVATION"] != null) encoded_view += "par=";
                    if (params["TIME"]) {
                        encoded_view += "TIME:" + params["TIME"];
                        if (params["ELEVATION"]) encoded_view += ";";
                        else encoded_view += ",";
                    }
                    if (params["ELEVATION"]) encoded_view += "ELEVATION:" + params["ELEVATION"] + ",";
                    //map options
                    if (viewlayer.variable) encoded_view += "var=" + viewlayer.variable + ",";
                    if (viewlayer.envfun) encoded_view += "fun=" + viewlayer.envfun + ",";
                    if (viewlayer.envmaptype) encoded_view += "maptype=" + viewlayer.envmaptype + ",";
                    if (viewlayer.envmaptype) encoded_view += "env=" + params["env"] + ",";
                    if (viewlayer.envcolscheme) encoded_view += "cs=" + viewlayer.envcolscheme + ",";
                    if (viewlayer.count) encoded_view += "count=" + viewlayer.count + ",";
                    if (params["STYLES"]) encoded_view += "style=" + params["STYLES"] + ",";
                    if (viewlayer.geom) encoded_view += "geom=" + viewlayer.geom + ",";
                    if (viewlayer.geomtype) encoded_view += "geomtype=" + viewlayer.geomtype + ",";
                    break;
                case "ogc_viewparams":
                    console.log("Setting embed link for view with strategy 'ogc_viewparams'");
                    if (params["VIEWPARAMS"]) encoded_view += "par=" + params["VIEWPARAMS"] + ",";
                    //map options
                    if (viewlayer.variable) encoded_view += "var=" + viewlayer.variable + ",";
                    if (viewlayer.envfun) encoded_view += "fun=" + viewlayer.envfun + ",";
                    if (viewlayer.envmaptype) encoded_view += "maptype=" + viewlayer.envmaptype + ",";
                    if (viewlayer.envmaptype) encoded_view += "env=" + params["env"] + ",";
                    if (viewlayer.envcolscheme) encoded_view += "cs=" + viewlayer.envcolscheme + ",";
                    if (viewlayer.count) encoded_view += "count=" + viewlayer.count + ",";
                    if (params["STYLES"]) encoded_view += "style=" + params["STYLES"] + ",";
                    if (viewlayer.geom) encoded_view += "geom=" + viewlayer.geom + ",";
                    if (viewlayer.geomtype) encoded_view += "geomtype=" + viewlayer.geomtype + ",";
                    break;
            }
            if (this.dataset_on_query) {
                if (this.dataset_on_query.pid == pid) encoded_view += "q=true";
                else encoded_view += "q=false";
            }
            encoded_views.push(encoded_view);
        }
        console.log("viewlayers");
        console.log(viewlayers);
        if (viewlayers.length > 0) url += "&views=" + encodeURIComponent(JSON.stringify(encoded_views));
        //extent, center, zoom
        url += "&extent=" + this.map.getView().calculateExtent(this.map.getSize()).join(",");
        url += "&center=" + this.map.getView().getCenter().join(",");
        url += "&zoom=" + this.map.getView().getZoom();
        //popup coords
        if (this.popup) {
            if (this.popup.id) url += "&popup_id=" + this.popup.id;
            if (this.popup.coords) url += "&popup_coords=" + this.popup.coords.join(",");
        }
        document.getElementById("OpenFairViewer-link").value = url;
    }
    //===========================================================================================
    //CATALOGUE
    //===========================================================================================
    /**
	 * initBrowseCatalogue
	 */ initBrowseCatalogue() {
        this.cswConfig = [
            [
                OWS_1_0_0,
                DC_1_1,
                DCT,
                XLink_1_0,
                SMIL_2_0,
                SMIL_2_0_Language,
                GML_3_1_1,
                Filter_1_1_0,
                CSW_2_0_2,
                GML_3_2_0,
                GML_3_2_1,
                ISO19139_GCO_20060504,
                ISO19139_GMD_20060504,
                ISO19139_GTS_20060504,
                ISO19139_GSS_20060504,
                ISO19139_GSR_20060504,
                ISO19139_GMX_20060504,
                ISO19139_GCO_20070417,
                ISO19139_GMD_20070417,
                ISO19139_GTS_20070417,
                ISO19139_GSS_20070417,
                ISO19139_GSR_20070417,
                ISO19139_GMX_20070417,
                ISO19139_SRV_20060504,
                ISO19139_2_GMI_1_0
            ],
            {
                namespacePrefixes: {
                    "http://www.opengis.net/cat/csw/2.0.2": "csw",
                    "http://www.opengis.net/ogc": "ogc",
                    "http://www.opengis.net/gml": "gml",
                    "http://purl.org/dc/elements/1.1/": "dc",
                    "http://purl.org/dc/terms/": "dct",
                    "http://www.isotc211.org/2005/gmd": "gmd",
                    "http://www.isotc211.org/2005/gmi": "gmi",
                    "http://www.isotc211.org/2005/gco": "gco"
                },
                mappingStyle: "standard"
            }
        ];
        this.csw = new (0, $6eueJ.default)(this.config.OGC_CSW_BASEURL, this.config.OGC_CSW_VERSION, this.cswConfig);
        //this.csw.GetCapabilities();
        //this.csw.GetRecordById(['fao-species-map-grn'], this.config.OGC_CSW_SCHEMA);
        //this.csw.GetRecords(1, this.config.OGC_CSW_MAXRECORDS, undefined, this.config.OGC_CSW_SCHEMA);
        return this.csw;
    }
    /**
	 * initBrowseAdvancedSettings
	 */ initBrowseAdvancedSettings() {
        var this_ = this;
        //spatial coverage layer visibility
        $("#dataset-spatial-coverage-visible").change(function() {
            var layer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
            layer.setVisible(this.checked);
        });
        //spatial coverage layer extended or not
        $("#dataset-spatial-coverage-extended").change(function() {
            this_.setSpatialCoverageLayer(this_.records_on_find, this.checked, $("#dataset-spatial-coverage-visible").is(":checked"));
        });
    }
    /**
	 * initBrowsePagination
	 */ initBrowsePagination() {
        var this_ = this;
        //Set paginated browsing operated by OGC CSW protocol
        $("#dataset-pages").bootpag({
            page: 1,
            total: 5,
            maxVisible: 5,
            leaps: true,
            firstLastUse: true,
            first: "←",
            last: "→"
        }).on("page", function(event, num) {
            var maxrecords = parseInt($("select[id='datasets_length']").val());
            this_.getDatasetsFromCSWPage(maxrecords, num);
        });
    }
    lightenMetadata(inObj) {
        var obj = inObj;
        if (obj instanceof Array) {
            var newObj = new Array();
            for(var i = 0; i < obj.length; i++){
                var newObjItem = this.lightenMetadata(obj[i]);
                newObj.push(newObjItem);
            }
            obj = newObj;
        } else if (typeof obj === "object") {
            if (obj["TYPE_NAME"]) delete obj["TYPE_NAME"];
            if (typeof obj.name != "undefined") {
                if (typeof obj.name.CLASS_NAME != "undefined") {
                    if (obj.name.CLASS_NAME == "Jsonix.XML.QName") obj = this.lightenMetadata(obj.value);
                }
            }
            if (typeof obj === "object") {
                var keys = Object.keys(obj);
                for(var i = 0; i < keys.length; i++){
                    var p = keys[i];
                    if ([
                        "characterString",
                        "integer",
                        "real",
                        "decimal",
                        "_boolean"
                    ].indexOf(p) != -1 || p.startsWith("abstract")) {
                        var newobj = obj[p];
                        if (p == "abstractRing") newobj = {
                            value: {
                                ring: {
                                    value: obj[p]
                                }
                            }
                        };
                        obj = this.lightenMetadata(newobj);
                    } else if (typeof obj != "string") obj[p] = this.lightenMetadata(obj[p]);
                }
            }
        }
        return obj;
    }
    /**
	 * getDataProtocolsFromMetadataEntry
	 * @param md_entry
	 * @param service
	 * @param layerSuffix
	 * @returns a WFS base URL
	 */ getDataProtocolsFromMetadataEntry(md_entry, service, layerSuffix) {
        var out = new Array();
        if (!md_entry.metadata.distributionInfo.mdDistribution.transferOptions) return out;
        if (!md_entry.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine) return out;
        var onLines = md_entry.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine.filter(function(item) {
            var url = item.ciOnlineResource.linkage.url;
            if (!url) return;
            var protocol = item.ciOnlineResource.protocol;
            if (!protocol) return;
            var urlFilter = url.indexOf(service) != -1 | url.indexOf(service.toLowerCase()) != -1;
            var protocolFilter = service == "wms" ? protocol.startsWith("OGC:" + service.toUpperCase()) : true;
            var layerFilter = layerSuffix ? item.ciOnlineResource.name.endsWith(layerSuffix) : true;
            var filter = urlFilter && protocolFilter && layerFilter;
            if (filter) return item;
        });
        //if(onLines.length == 0) console.warn("No Dataset URL from metadata entry");
        if (onLines.length > 0) for(var i = 0; i < onLines.length; i++){
            //layerUrl
            var layerUrl = onLines[i].ciOnlineResource.linkage.url;
            if (layerUrl.indexOf("ows?") > 0) layerUrl = layerUrl.split("ows?")[0] + "ows?service=" + service;
            if (layerUrl.indexOf(service.toLowerCase() + "?") > 0) layerUrl = layerUrl.split(service.toLowerCase() + "?")[0] + "ows?service=" + service;
            //layerName
            var layerName = onLines[i].ciOnlineResource.name;
            if (layerSuffix) layerName = layerName + layerSuffix;
            //layerDescription
            var layerDescription = onLines[i].ciOnlineResource.description;
            //serviceVersion
            var serviceVersion = null;
            var url = onLines[i].ciOnlineResource.linkage.url;
            if (url.indexOf("&version=") > 0) serviceVersion = url.split("&version=")[1].split("&")[0];
            if (url.indexOf("&VERSION=") > 0) serviceVersion = url.split("&VERSION=")[1].split("&")[0];
            //protocol
            var protocol = onLines[i].ciOnlineResource.protocol;
            if (serviceVersion == null) switch(protocol){
                case "OGC:WMS":
                    serviceVersion = "1.1.0";
                    break;
                case "OGC:WMS-1.1.0-http-get-map":
                    serviceVersion = "1.1.0";
                    break;
                case "OGC:WMS-1.1.1-http-get-map":
                    serviceVersion = "1.1.1";
                    break;
                case "OGC:WMS-1.3.0-http-get-map":
                    serviceVersion = "1.3.0";
                    break;
                case "OGC:WFS":
                    serviceVersion = "2.0.0";
                    break;
                case "OGC:WFS-1.0.0-http-get-feature":
                    serviceVersion = "1.0.0";
                    break;
                case "OGC:WFS-1.1.0-http-get-feature":
                    serviceVersion = "1.1.0";
                    break;
                case "OGC:WFS-2.0.0-http-get-feature":
                    serviceVersion = "2.0.0";
                    break;
                case "OGC:WCS":
                    serviceVersion = "2.0.1";
                    break;
                case "OGC:WCS-1.0.0-http-get-coverage":
                    serviceVersion = "1.0.0";
                    break;
                case "OGC:WCS-1.1-http-get-coverage":
                    serviceVersion = "1.1";
                    break;
                case "OGC:WCS-1.1.0-http-get-coverage":
                    serviceVersion = "1.1.0";
                    break;
                case "OGC:WCS-1.1.1-http-get-coverage":
                    serviceVersion = "1.1.1";
                    break;
                case "OGC:WCS-2.0.1-http-get-coverage":
                    serviceVersion = "2.0.1";
                    break;
                case "OGC:WCS-2.1.0-http-get-coverage":
                    serviceVersion = "2.1.0";
                    break;
            }
            out.push({
                url: layerUrl,
                version: serviceVersion,
                name: layerName,
                description: layerDescription
            });
        }
        return out;
    }
    /**
	 * getDatasetGeometryComponent
	 * @param dataset
	 */ getDatasetGeometryComponent(dataset) {
        if (!dataset.dsd) return;
        var geom_component = dataset.dsd.filter(function(item) {
            if (item.primitiveType.startsWith("gml")) return item;
        });
        if (geom_component.length == 0) return;
        return geom_component[0];
    }
    /**
	 * buildDynamicStylename
	 * @param
	 */ buildDynamicStylename(dataset, variable, maptype, classnb) {
        if (!variable) return null;
        var geom_component = this.getDatasetGeometryComponent(dataset);
        var geom = null;
        switch(geom_component.primitiveType){
            case "gml:PointPropertyType":
                geom = "point";
                break;
            case "gml:MultiPointPropertyType":
                geom = "point";
                break;
            case "gml:LineStringPropertyType":
                geom = "linestring";
                break;
            case "gml:MultiLineStringPropertyType":
                geom = "linestring";
                break;
            case "gml:PolygonPropertyType":
                geom = "polygon";
                break;
            case "gml:MultiPolygonPropertyType":
                geom = "polygon";
                break;
        }
        if (!geom) console.warn("No 'geom' type set for builing dynamic stylename. Check DSD geometry type");
        return "dyn_geom-" + geom + "_map-" + maptype + "_class-" + classnb;
    }
    /**
	 * OpenFairViewer.prototype.getDatasetFeatures
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param queryparams
	 * @param cql_filter
	 * @param propertyNames
	 * @param format
	 * @param projection
	 * @returns a Jquery promise
	 */ getDatasetFeatures(layerUrl, serviceVersion, layerName, strategy1, queryparams, cql_filter, propertyNames, format, projection) {
        if (!format) format = "json";
        var wfsRequest = this.getDatasetWFSLink(layerUrl, serviceVersion, layerName, strategy1, queryparams, cql_filter, propertyNames, format, projection);
        var deferred = $.Deferred();
        $.ajax({
            url: wfsRequest,
            contentType: "application/json",
            type: "GET",
            success: function(response1) {
                var features = response1.features;
                deferred.resolve(features);
            },
            error: function(error) {
                console.error(error);
                deferred.reject(error);
            }
        });
        return deferred.promise();
    }
    /**
	 * OpenFairViewer.prototype.getGeometryColumn
	 * @param dsd
	 */ getGeometryColumn(dsd) {
        if (!dsd) return null;
        var gmlProperty = dsd.filter(function(item) {
            if (item.primitiveType.startsWith("gml")) return item;
        });
        if (gmlProperty.length == 0) return null;
        return gmlProperty[0].primitiveCode;
    }
    /**
	 * OpenFairViewer.prototype.getGeometryType
	 * @param dsd
	 */ getGeometryType(dsd) {
        if (!dsd) return null;
        var gmlProperty = dsd.filter(function(item) {
            if (item.primitiveType.startsWith("gml")) return item;
        });
        if (gmlProperty.length == 0) return null;
        return gmlProperty[0].primitiveType;
    }
    /**
	 * OpenFairViewer.prototype.getFeatureInfos
	 * @param layers
	 * @param coords
	 */ getFeatureInfos(layers, coords) {
        var this_ = this;
        //feature info requests
        var featureinfo_promises = new Array();
        for(var i = 0; i < layers.length; i++){
            var layerid = layers[i];
            var layer = this.getLayerByProperty(layerid, "id");
            featureinfo_promises.push(this.getWMSFeatureInfo(layer, coords));
        }
        //$("#"+layerid+"_featureinfo")
        Promise.all(featureinfo_promises).then((values)=>{
            if (values.length > 0) {
                var total_features = values.map(function(item) {
                    return item.features.length;
                }).reduce((a, b)=>a + b, 0);
                if (total_features > 0) {
                    console.log("Total feature infos fetched => " + total_features);
                    console.log(values);
                    //html
                    var div = $("<div id='featureinfo-tabs' style='font-size:9px;'>");
                    var ul = $("<ul>");
                    for(var i = 0; i < layers.length; i++){
                        var layerid = layers[i];
                        var layer = this.getLayerByProperty(layerid, "id");
                        var featureinfos = values.filter(function(item) {
                            if (item.id == layerid) return item;
                        });
                        if (featureinfos[0].features.length > 0) ul.append($("<li><a href='#" + layerid + "_featureinfo'>" + layerid + "</a></li>"));
                    }
                    div.append(ul);
                    for(var i = 0; i < layers.length; i++){
                        var layerid = layers[i];
                        var layer = this.getLayerByProperty(layerid, "id");
                        var layer_tab = $("<div id='" + layerid + "_featureinfo'></div>");
                        div.append(layer_tab);
                    }
                    if (this_.options.map.popup.mode == "map") {
                        var popup = this_.map.getOverlayById("featureinfos");
                        popup.show(coords, div.prop("outerHTML"));
                        //this.options.map.popup.onopen(layer, feature); //TODO HOW TO DEAL WITH THAT
                        this_.popup = {
                            id: "featureinfos",
                            coords: coords
                        };
                    } else if (this_.options.map.popup.mode == "dialog") {
                        $("#datasetFeatureInfo").html(div.prop("outerHTML"));
                        this_.openFeatureDialog();
                    }
                    for(var i = 0; i < layers.length; i++){
                        var layerid = layers[i];
                        var layer = this.getLayerByProperty(layerid, "id");
                        var layer_tab = $("<div id='" + layerid + "_featureinfo'></div>");
                        var featureinfos = values.filter(function(item) {
                            if (item.id == layerid) return item;
                        });
                        console.log(featureinfos);
                        if (featureinfos[0].features.length > 0) $("#" + layerid + "_featureinfo").append(this_.options.map.popup.handler(layer, featureinfos[0].features));
                        else $("#" + layerid + "_featureinfo").remove();
                    }
                    $("#featureinfo-tabs").tabs();
                } else if (this_.options.map.popup.mode == "map") {
                    var popup = this_.map.getOverlayById("featureinfos");
                    popup.hide();
                    this_.popup = {};
                }
            }
        });
    }
    /**
	 * OpenFairViewer.prototype.getWMSFeatureInfo
	 * @param layer
	 * @param coords
	 */ getWMSFeatureInfo(layer, coords) {
        console.log("Get WMS FeatureInfo on layer = " + layer.id);
        var this_ = this;
        var viewResolution = this_.map.getView().getResolution();
        var viewProjection = this_.map.getView().getProjection().getCode();
        var default_info_format = "application/vnd.ogc.gml";
        if (layer.getSource().getUrl) {
            if (layer.getSource().getUrl().indexOf("thredds") != -1) default_info_format = "text/xml";
        }
        if (layer.getSource().getUrls) {
            if (layer.getSource().getUrls()[0].indexOf("thredds") != -1) default_info_format = "text/xml";
        }
        var featureInfoUrl = layer.getSource().getFeatureInfoUrl(coords, viewResolution, viewProjection, {
            "INFO_FORMAT": default_info_format
        });
        if (this.secure) featureInfoUrl = featureInfoUrl.replace("http://", "https://");
        var featureInfoParams = featureInfoUrl.split("?")[1].split("&").map(function(item) {
            return item.split("=");
        });
        var deferred = $.Deferred();
        $.ajax({
            url: featureInfoUrl,
            crossOrigin: true,
            type: "GET",
            success: function(response1) {
                var parser = new $hzBBV$olformat.WMSGetFeatureInfo();
                var features = parser.readFeatures(response1);
                if (featureInfoUrl.indexOf("thredds") != -1) {
                    var featureinfo = $(response1.childNodes[0].childNodes).filter(function(idx, item) {
                        if (item.nodeName == "FeatureInfo") return item;
                    });
                    const props = featureinfo.children().map(function(i, item) {
                        var obj = new Object();
                        obj[item.nodeName] = item.textContent;
                        return obj;
                    });
                    const feature_props = new Object();
                    for(var i = 0; i < props.length; i++){
                        var key = Object.keys(props[i])[0];
                        feature_props[key] = props[i][key];
                    }
                    const fi = new (0, ($parcel$interopDefault($hzBBV$olFeature)))();
                    fi.setProperties(feature_props);
                    features = [
                        fi
                    ];
                }
                console.log(features);
                var feature1 = null;
                if (features.length > 0) {
                    console.log("Nb of features on layer " + layer.id + ": " + features.length);
                    features = features.map(function(item) {
                        feature1 = item;
                        feature1.geometry_column = feature1.getGeometryName();
                        feature1.popup_coordinates = coords;
                        //TODO investigate how to deal with similar in shiny popup when layer is vector
                        //(for now shiny popups limited to WMS layers)
                        feature1.info = {
                            x: featureInfoParams.filter(function(item) {
                                if (item[0] == (layer.getSource().getParams().VERSION == "1.3.0" ? "I" : "X")) return item;
                            })[0][1],
                            y: featureInfoParams.filter(function(item) {
                                if (item[0] == (layer.getSource().getParams().VERSION == "1.3.0" ? "J" : "Y")) return item;
                            })[0][1],
                            width: featureInfoParams.filter(function(item) {
                                if (item[0] == "WIDTH") return item;
                            })[0][1],
                            height: featureInfoParams.filter(function(item) {
                                if (item[0] == "HEIGHT") return item;
                            })[0][1],
                            bbox: featureInfoParams.filter(function(item) {
                                if (item[0] == "BBOX") return item;
                            })[0][1]
                        };
                        return feature1;
                    });
                    deferred.resolve({
                        id: layer.id,
                        features: features
                    });
                } else deferred.resolve({
                    id: layer.id,
                    features: []
                });
            }
        });
        return deferred;
    }
    /**
	 * OpenFairViewer.prototype.getVectorFeatureInfo
	 * @param layer
	 * @param feature
	 * @param coords
	 */ getVectorFeatureInfo(layer, feature1, coords) {
        var this_ = this;
        var popup = this.map.getOverlayById(layer.id);
        if (feature1) {
            if (!coords) {
                var geom = feature1.getGeometry();
                coords = $hzBBV$olextent.getCenter(geom.getExtent());
                if (geom instanceof $hzBBV$olgeom.LineString || geom instanceof $hzBBV$olgeom.MultiLineString || geom instanceof $hzBBV$olgeom.MultiPoint) coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length / 2)];
                if (geom instanceof $hzBBV$olgeom.Point) coords = geom.getCoordinates();
            }
            feature1.geometry_column = feature1.getGeometryName();
            feature1.popup_coordinates = coords;
            //if(this.options.map.popup.mode == 'map'){
            popup.show(coords, this_.options.map.popup.handler(layer, [
                feature1
            ]));
            this_.options.map.popup.onopen(layer, [
                feature1
            ]);
            this_.popup = {
                id: layer.id,
                coords: coords
            };
        //}
        /*else if(this.options.map.popup.mode == 'dialog'){
				$("#datasetFeatureInfo").html(this_.options.map.popup.handler(layer, [feature]));
				this.openFeatureDialog();
			}*/ } else {
            //if(this.options.map.popup.mode == 'map'){
            popup.hide();
            this_.popup = {};
            this_.options.map.popup.onclose(layer, [
                feature1
            ]);
            //}
            /*else if(this.options.map.popup.mode == 'dialog'){
				$("#datasetFeatureInfo").html("");
				this.closeFeatureDialog();
			}*/ //in case feature markers are highlighted we remove them
            var markersId = "ofv-feature-marker";
            var markers = this_.getLayerByProperty(markersId, "id");
            if (markers) {
                var source = new (0, $hzBBV$olsource.Vector)({
                    features: []
                });
                markers.setSource(source);
            }
        }
    }
    /**
	 * OpenFairViewer.prototype.getDatasetNextFeatureInTime
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param propertyName
	 * @param propertyValue
	 * @returns a Jquery promise
	 */ getDatasetNextFeatureInTime(layerUrl, serviceVersion, layerName, propertyName, propertyValue) {
        var this_ = this;
        var projection = this_.map.getView().getProjection().getCode();
        var wfsRequest = this.getDatasetWFSLink(layerUrl, serviceVersion, layerName, "ogc_filters", null, propertyName + " > " + propertyValue, null, "json", projection);
        wfsRequest += "&sortBy=" + propertyName + "&maxFeatures=1";
        var deferred = $.Deferred();
        $.ajax({
            url: wfsRequest,
            contentType: "application/json",
            type: "GET",
            success: function(response1) {
                var geojson = new $hzBBV$olformat.GeoJSON();
                var features = geojson.readFeatures(response1);
                deferred.resolve(features);
            },
            error: function(error) {
                console.error(error);
                deferred.reject(error);
            }
        });
        return deferred.promise();
    }
    /**
	 * OpenFairViewer.prototype.getNextFeatureInfoInTime
	 * @param pid
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param propertyName
	 * @param propertyValue
	 */ getNextFeatureInfoInTime(pid, layerUrl, serviceVersion, layerName, propertyName, propertyValue) {
        var this_ = this;
        var layer = this.getLayerByProperty(pid, "id");
        var viewResolution = this_.map.getView().getResolution();
        var viewProjection = this_.map.getView().getProjection().getCode();
        this.getDatasetNextFeatureInTime(layerUrl, serviceVersion, layerName, propertyName, propertyValue).then(function(nextresponse) {
            var nextfeature = null;
            var coords = null;
            if (nextresponse.length > 0) {
                nextfeature = nextresponse[0];
                var geom = nextfeature.getGeometry();
                coords = $hzBBV$olextent.getCenter(geom.getExtent());
                if (geom instanceof $hzBBV$olgeom.LineString || geom instanceof $hzBBV$olgeom.MultiLineString || geom instanceof $hzBBV$olgeom.MultiPoint) coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length / 2)];
                if (geom instanceof $hzBBV$olgeom.Point) coords = geom.getCoordinates();
                console.log("Feature In Time");
                console.log(coords);
            }
            //popup handling
            this_.getVectorFeatureInfo(layer, nextfeature, coords);
        });
    }
    /**
	 * registerFeatureInfoLayer
	 * @param layer
	 */ registerFeatureInfoLayer(layer) {
        this.layers_with_featureinfo.push(layer.id);
    }
    /**
	 * unregisterFeatureInfoLayer
	 * @param layer
	 */ unregisterFeatureInfoLayer(layer) {
        const index = this.layers_with_featureinfo.indexOf(layer.id);
        if (index > -1) this.layers_with_featureinfo.splice(index, 1);
    }
    /**
	 * addVectorLayerPopup
	 * @param layer
	 */ addVectorLayerPopup(layer) {
        var this_ = this;
        //configure popup
        var popup = new (0, ($parcel$interopDefault($hzBBV$olpopup)))({
            id: layer.id
        });
        this.map.addOverlay(popup);
    }
    /**
	 * removeLayerByProperty Util method to remove a layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */ removeLayerByProperty(layerProperty, by) {
        console.log("Remove layer dataset with property " + by + " = " + layerProperty);
        var removed = false;
        if (!by) byTitle = false;
        var target = undefined;
        var layerGroups = this.map.getLayers().getArray();
        for(var i = 0; i < layerGroups.length; i++){
            var layerGroup = layerGroups[i];
            var layers = layerGroup.getLayers().getArray();
            for(var j = 0; j < layers.length; j++){
                var layer = layers[j];
                var condition = by ? layer.get(by) === layerProperty : layer.getSource().getParams()["LAYERS"] === layerProperty;
                if (condition) {
                    this.layers.overlays[i - 1].getLayers().remove(layer);
                    this.unregisterFeatureInfoLayer(layer);
                    this.renderMapLegend();
                    removed = true;
                    break;
                }
            }
        }
        return removed;
    }
    /**
	 * OpenFairViewer.prototype.getDatasetValues
	 * @param an array of features
	 * @param propertyName
	 * @returns a array of values
	 */ getDatasetValues(features, propertyName) {
        var values = new Array();
        if (features.length > 0) values = features.map(function(f) {
            return propertyName ? f.properties[propertyName] : f.properties;
        });
        return values;
    }
    /**
     * OpenFairViewer.prototype.calculateBreaks
	 * @param values an array of numeric values
	 * @param classType the type of classification to apply
	 * @param classNb the number N of class breaks
	 * @returns an array of N+1 class breaks
     */ calculateBreaks(values, classType, classNb) {
        var breaks = new Array();
        switch(classType){
            //CKmeans
            case "ckmeans":
                var clusters = $hzBBV$simplestatistics.ckmeans(values, classNb);
                breaks = new Array();
                for(var i = 0; i < clusters.length; i++){
                    var cluster = clusters[i];
                    breaks.push($hzBBV$simplestatistics.min(cluster));
                    if (i == clusters.length - 1) breaks.push($hzBBV$simplestatistics.max(cluster));
                }
                break;
            //Equal intervals
            case "equal":
                breaks = $hzBBV$simplestatistics.equalIntervalBreaks(values, classNb);
                break;
            //quantiles
            case "quantile":
                var qpt = 1 / classNb;
                breaks = new Array();
                breaks.push($hzBBV$simplestatistics.min(values));
                for(var i = 1; i <= classNb; i++)breaks.push($hzBBV$simplestatistics.quantile(values, qpt * i));
                breaks;
        }
        return breaks;
    }
    /**
	 * OpenFairViewer.prototype.buildEnvParams
	 * @param geom
	 * @param variable
	 * @param breaks
	 * @param colors
	 */ buildEnvParams(geom, variable, breaks, colors) {
        var envparams = "geom:" + geom + ";var:" + variable + ";";
        for(var i = 1; i <= breaks.length; i++)envparams += "v" + i + ":" + breaks[i - 1] + ";";
        for(var i = 1; i <= colors.length; i++)envparams += "c" + i + ":" + colors[i - 1] + ";";
        return envparams;
    }
    /**
	 * OpenFairViewer.prototype.getDatasetViewTitle
	 * @param uuid
	 * @param dataset
	 * @param strategyparams
	 * @param from_query_form
	 */ getDatasetViewTitle(dataset, strategyparams, from_query_form) {
        var this_ = this;
        var layer = undefined;
        if (from_query_form) layer = this_.getStrategyLayer();
        else layer = dataset.lyr ? dataset.lyr : dataset.entry.wms[0].name;
        console.log(layer);
        var lyr = dataset.entry.wms.filter(function(item) {
            return item.name == layer;
        })[0];
        var layerTitle = '<button class="btn btn-xs dataset-button dataset-button-remove" data-pid="' + dataset.pid + '" data-lyr="' + lyr.name + '" title="' + this_.options.labels.dataset_remove + '" onclick="' + this_.config.OFV_ID + '.unselectDatasetView(this)"> X </button>';
        layerTitle += "<span>" + dataset.entry.title + "</span>";
        layerTitle += "</br>";
        layerTitle += '<p style="font-weight:normal !important;font-size:90%;"><span class="glyphicon glyphicon-pushpin"></span><b style="margin-left:4px;">' + this_.options.labels.layer + "</b>: " + lyr.description + " [" + lyr.name + "]";
        if (strategyparams) {
            if (strategyparams instanceof Array) {
                if (strategyparams.length > 0) {
                    var strategyName;
                    switch(dataset.strategy){
                        case "ogc_filters":
                            strategyName = this.options.labels.ogc_filters;
                            break;
                        case "ogc_dimensions":
                            strategyName = this.options.labels.ogc_dimensions;
                            break;
                        case "ogc_viewparams":
                            strategyName = this.options.labels.ogc_viewparams;
                            break;
                    }
                    layerTitle += "</br>";
                    layerTitle += '<p style="font-weight:normal !important;font-size:90%;overflow-wrap:break-word;"><span class="glyphicon glyphicon-pushpin"></span><b style="margin-left:4px;">' + strategyName + ":</b></br>";
                    switch(dataset.strategy){
                        case "ogc_filters":
                            if (strategyparams[0].CQL_FILTER) layerTitle += strategyparams[0].CQL_FILTER;
                            else for(var i = 0; i < strategyparams.length; i++){
                                var strategyparam = strategyparams[i];
                                var key = Object.keys(strategyparam)[0];
                                var component = strategyparam[key];
                                if (!(component.content instanceof Array)) component.content = [
                                    component.content
                                ];
                                var component_info;
                                switch(component.type){
                                    case "list":
                                        component_info = component.content.join(",");
                                        break;
                                    case "range":
                                        component_info = component.content[0];
                                        if (component.content.length > 1) component_info += " – " + component.content[component.content.length - 1];
                                        break;
                                    case "timeperiod":
                                        component_info = component.content.join("/");
                                        break;
                                    default:
                                        component.content.join("/");
                                        break;
                                }
                                layerTitle += "&#8226; " + key + ": " + component_info + "</br>";
                            }
                            break;
                        case "ogc_dimensions":
                            for(var i = 0; i < strategyparams.length; i++){
                                var strategyparam = strategyparams[i];
                                var key = Object.keys(strategyparam)[0];
                                layerTitle += "&#8226; " + key + ": " + strategyparam[key].content[0] + "</br>";
                            }
                            break;
                        case "ogc_viewparams":
                            for(var i = 0; i < strategyparams.length; i++){
                                var strategyparam = strategyparams[i];
                                var key = Object.keys(strategyparam)[0];
                                var component = strategyparam[key];
                                if (!(component.content instanceof Array)) component.content = [
                                    component.content
                                ];
                                var component_info;
                                switch(component.type){
                                    case "list":
                                        component_info = component.content.join(",");
                                        break;
                                    case "range":
                                        component_info = component.content[0];
                                        if (component.content.length > 1) component_info += " – " + component.content[component.content.length - 1];
                                        break;
                                    case "timeperiod":
                                        component_info = component.content.join("/");
                                        break;
                                    default:
                                        component.content.join("/");
                                        break;
                                }
                                layerTitle += "&#8226; " + key + ": " + component_info + "</br>";
                            }
                            break;
                    }
                }
            }
        }
        return layerTitle;
    }
    getDatasetDOILink(md_entry) {
        var ident = md_entry.metadata.identificationInfo;
        if (!ident) return null;
        var identifiers = ident[0].citation.ciCitation.identifier;
        if (!identifiers) return null;
        var doi_identifiers = identifiers.filter(function(identifier) {
            var hasDOI = false;
            if (identifier.mdIdentifier.code.href) {
                if (identifier.mdIdentifier.code.href.indexOf("dx.doi.org") != -1) hasDOI = true;
            }
            if (!hasDOI) {
                if (identifier.mdIdentifier.code.value) {
                    if (identifier.mdIdentifier.code.value.startsWith("doi:") != -1) hasDOI = true;
                }
            }
            if (hasDOI) return identifier;
        });
        if (doi_identifiers.length == 0) return null;
        var doi = null;
        var doi_identifier = doi_identifiers[0].mdIdentifier;
        if (doi_identifier.code.href) doi = doi_identifier.code.href.split("dx.doi.org/")[1];
        else doi = doi_identifier.code.value.split("doi:")[1];
        return doi;
    }
    /**
	 * createMetadataEntry
	 * @param value
	 */ createMetadataEntry(value) {
        var this_ = this;
        var md_entry = new Object();
        md_entry.metadata = this_.lightenMetadata(value);
        //delete csw_result.value;
        md_entry.pid = md_entry.metadata.fileIdentifier;
        md_entry.pidinfo = md_entry.pid;
        //title
        md_entry.title = md_entry.metadata.identificationInfo[0].citation.ciCitation.title;
        md_entry.title_tooltip = md_entry.title;
        //graphic overviews
        var graphicOverviews = md_entry.metadata.identificationInfo[0].graphicOverview;
        if (graphicOverviews) {
            if (graphicOverviews.length > 0) md_entry.graphic_overview = graphicOverviews[0].mdBrowseGraphic.fileName;
        }
        md_entry._abstract = md_entry.metadata.identificationInfo[0]._abstract;
        //extents
        var extents = md_entry.metadata.identificationInfo[0].extent;
        if (extents) {
            if (extents[0].exExtent.temporalElement) {
                if (extents[0].exExtent.temporalElement.length >= 0) {
                    if (extents[0].exExtent.temporalElement[0].exTemporalExtent) {
                        var temporalExtent = extents[0].exExtent.temporalElement[0].exTemporalExtent.extent;
                        if (temporalExtent.beginPosition) md_entry.time_start = temporalExtent.beginPosition.value[0];
                        if (temporalExtent.endPosition) md_entry.time_end = temporalExtent.endPosition.value[0];
                        if (temporalExtent.timePosition) md_entry.time_position = temporalExtent.timePosition.value; //TODO to see how to deal with that
                    }
                }
            }
        }
        //projection
        md_entry.projection = new $hzBBV$olproj.get("EPSG:4326");
        if (md_entry.metadata.referenceSystemInfo) {
            var srs = md_entry.metadata.referenceSystemInfo[0].mdReferenceSystem.referenceSystemIdentifier.rsIdentifier;
            var srs_proj = new $hzBBV$olproj.get(srs.codeSpace + ":" + srs.code);
            if (srs_proj.code_) md_entry.projection = srs_proj;
        }
        //spatial representation
        md_entry.dataModel = "vector";
        if (md_entry.metadata.spatialRepresentationInfo) {
            if (md_entry.metadata.spatialRepresentationInfo[0].geometryObjects) md_entry.dataModel = "vector";
            else if (md_entry.metadata.spatialRepresentationInfo[0].axisDimensionProperties) md_entry.dataModel = "grid";
        }
        //content information
        md_entry.dsd = false;
        md_entry.dsdModel = "none";
        if (md_entry.metadata.contentInfo) {
            if (md_entry.metadata.contentInfo[0].featureCatalogueCitation) {
                if (md_entry.metadata.contentInfo[0].featureCatalogueCitation[0].uuidref) {
                    //build fc_url, adding patch to encode isotc211 namespace in case full rewriting of url components to https is done on server
                    var fc_url = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema= " + encodeURIComponent("http://www.isotc211.org") + "/2005/gfc&id=" + md_entry.metadata.contentInfo[0].featureCatalogueCitation[0].uuidref;
                    md_entry.dsd = this_.rewriteURL(fc_url);
                    md_entry.dsdModel = "FeatureCatalogue";
                }
            }
            if (md_entry.metadata.contentInfo[0].dimension) {
                md_entry.dsd = true;
                md_entry.dsdModel = "CoverageDescription";
            }
        }
        //distribution information
        md_entry.csw = [
            {
                url: this.csw.url,
                version: this.csw.version
            }
        ];
        md_entry.wms = this.getDataProtocolsFromMetadataEntry(md_entry, "WMS");
        md_entry.wfs = this.getDataProtocolsFromMetadataEntry(md_entry, "WFS");
        md_entry.queryable = md_entry.wms.length > 0;
        //doi
        md_entry.doi = this.getDatasetDOILink(md_entry);
        return md_entry;
    }
    /**
	 * buildSpatialCoverageFeature
	 * @param dataset
	 * @param extended
	 */ buildSpatialCoverageFeature(dataset, extended) {
        var this_ = this;
        var idents = dataset.metadata.identificationInfo;
        if (!idents) return;
        if (idents.length == 0) return;
        var extents = idents[0].extent;
        if (!extents) return;
        if (extents.length == 0) return;
        var geo_extents = extents[0].exExtent.geographicElement;
        if (!geo_extents) return;
        if (geo_extents.length == 0) return;
        var geometries = new Array();
        for(var i = 0; i < geo_extents.length; i++){
            var geo_extent = geo_extents[i];
            var geo_keys = Object.keys(geo_extent);
            var is_bbox = geo_keys.indexOf("westBoundLongitude") != -1 && geo_keys.indexOf("eastBoundLongitude") != -1 && geo_keys.indexOf("southBoundLatitude") != -1 && geo_keys.indexOf("northBoundLatitude") != -1;
            if (is_bbox) {
                //case of bounding box
                var coords = [
                    geo_extent.westBoundLongitude,
                    geo_extent.southBoundLatitude,
                    geo_extent.eastBoundLongitude,
                    geo_extent.northBoundLatitude
                ];
                var polyCoords = [
                    [
                        coords[0],
                        coords[1]
                    ],
                    [
                        coords[0],
                        coords[3]
                    ],
                    [
                        coords[2],
                        coords[3]
                    ],
                    [
                        coords[2],
                        coords[1]
                    ],
                    [
                        coords[0],
                        coords[1]
                    ]
                ];
                var polyCoordsGeom = new $hzBBV$olgeom.LineString(polyCoords);
                //reproject if needed
                var srs_data = dataset.projection;
                var srs_map = this.map.getView().getProjection();
                console.log(srs_data);
                if (srs_data) {
                    if (srs_data.getCode() != srs_map.getCode()) polyCoordsGeom.transform(srs_data, srs_map);
                }
                geometries.push(polyCoordsGeom);
            } else {
                //case of bounding polygons
                if (extended) {
                    if (geo_keys.length == 1 && geo_keys[0] == "polygon") {
                        var polygons = geo_extent.polygon;
                        //jsonix to Geojson
                        var geomConverter = new GML_V_3_1_1.GeoJSON.ForwardGeometryConverter();
                        polygons.forEach(function(polygon) {
                            var geojson_geom = geomConverter.createGeometry(polygon);
                            console.log("Convert JSONIX to GeoJSON");
                            console.log("from JSONIX = " + JSON.stringify(polygon));
                            console.log("to GeoJSON = " + JSON.stringify(geojson_geom));
                            console.log(geojson_geom);
                            var ol_geom_handler = null;
                            switch(geojson_geom.type){
                                case "Point":
                                    ol_geom_handler = $hzBBV$olgeom.Point;
                                    break;
                                case "MultiPoint":
                                    ol_geom_handler = $hzBBV$olgeom.MultiPoint;
                                    break;
                                case "LineString":
                                    ol_geom_handler = $hzBBV$olgeom.LineString;
                                    break;
                                case "MultiLineString":
                                    ol_geom_handler = $hzBBV$olgeom.MultiLineString;
                                    break;
                                case "Polygon":
                                    ol_geom_handler = $hzBBV$olgeom.Polygon;
                                    break;
                                case "MultiPolygon":
                                    ol_geom_handler = $hzBBV$olgeom.MultiPolygon;
                                    break;
                            }
                            var geom = new ol_geom_handler(geojson_geom.coordinates);
                            //reproject if needed
                            var srs_data = dataset.projection;
                            var srs_map = this_.map.getView().getProjection();
                            if (srs_data) {
                                if (srs_data.getCode() != srs_map.getCode()) geom.transform(srs_data, srs_map);
                            }
                            if (ol_geom_handler) geometries.push(geom);
                        });
                    }
                }
            }
        }
        var feature_geom = null;
        if (geometries.length == 1) feature_geom = geometries[0];
        else {
            feature_geom = new $hzBBV$olgeom.GeometryCollection();
            feature_geom.setGeometriesArray(geometries);
        }
        const feature1 = new (0, ($parcel$interopDefault($hzBBV$olFeature)))({
            geometry: feature_geom,
            style: this_.options.find.defaultStyle
        });
        feature1.setId(dataset.pid);
        feature1.ol_uid = dataset.pid;
        return feature1;
    }
    /**
	 * buildSpatialCoverageDataset
	 * @param datasets
	 */ buildSpatialCoverageDataset(datasets, extended) {
        var this_ = this;
        var features = datasets.map(function(dataset, i) {
            return this_.buildSpatialCoverageFeature(dataset, extended);
        });
        features = features.filter(function(feature1) {
            if (typeof feature1 != "undefined") return feature1;
        });
        return features;
    }
    /**
	 * setSpatialCoverageLayer
	 * @param datasets
	 */ setSpatialCoverageLayer(datasets, extended, visible) {
        var this_ = this;
        var features = this_.buildSpatialCoverageDataset(datasets, extended);
        var layerId = "ofv-csw-spatial-coverages";
        var layer = this.getLayerByProperty(layerId, "id");
        var source = new (0, $hzBBV$olsource.Vector)({
            features: features
        });
        if (!layer) {
            var layer = new (0, $hzBBV$ollayer.Vector)({
                id: undefined,
                title: undefined,
                source: source,
                visible: visible
            });
            layer.id = layerId;
            this.layers.overlays[this_.options.map.mainlayergroup + 1].getLayers().push(layer);
            var layerPointer = new $hzBBV$olinteraction.Select({
                condition: (0, $hzBBV$oleventscondition.pointerMove),
                layers: [
                    layer
                ]
            });
            layerPointer.on("select", function(evt) {
                if (evt.selected) {
                    if (evt.selected.length > 0) evt.selected.forEach(function(feature1) {
                        feature1.setStyle(this_.options.find.hoverStyle);
                        $("#" + feature1.getId()).addClass("hovered");
                    });
                }
                if (evt.deselected) {
                    if (evt.deselected.length > 0) evt.deselected.forEach(function(feature1) {
                        feature1.setStyle(null);
                        $("#" + feature1.getId()).removeClass("hovered");
                    });
                }
            });
            this.map.addInteraction(layerPointer);
        } else layer.setSource(source);
    }
    /**
	 * getRecords
	 * @param maxrecords
	 * @param page
	 * @param filter
	 */ getRecords(maxrecords, page, filter) {
        var deferred = $.Deferred();
        var this_ = this;
        var last = page * maxrecords;
        var first = last - maxrecords + 1;
        console.log("Get CSW Records for page " + page + " [from index " + first + " to " + last + "] ...");
        this.csw.GetRecords(first, maxrecords, filter, this.config.OGC_CSW_SCHEMA).then(function(result) {
            var csw_results = result.value.searchResults.any;
            var datasets = new Array();
            //post-process results
            if (csw_results) for(var i = 0; i < csw_results.length; i++){
                var csw_result = csw_results[i];
                var md_entry = this_.createMetadataEntry(csw_result.value);
                datasets.push(md_entry);
            }
            deferred.resolve(datasets);
        });
        return deferred.promise();
    }
    /**
	 * createFilter
	 * @param bbox
	 */ createFilter(bbox) {
        var this_ = this;
        //base filter
        //on all dc types
        var dctypes = [
            "dataset",
            "nonGeographicDataset",
            "sensor",
            "sensorSeries",
            "platformSeries",
            "productionSeries",
            "series",
            "transferAggregate",
            "otherAggregate"
        ];
        var filter = new (0, $d7Gjo.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, dctypes.map(function(dctype) {
            return new (0, $MXQFO.default)(this_.config.OGC_FILTER_VERSION, this_.config.OGC_FILTER_SCHEMAS, "dc:type", dctype);
        }));
        //add config filters?
        if (typeof this.options.find.filter != "undefined") filter = new (0, $kgzwJ.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
            filter,
            this.options.find.filter
        ]);
        //add free text filter?
        var txt = $("#dataset-search-text").val();
        if (txt != "") {
            txt = "%" + txt + "%";
            var txtFilter = new (0, $d7Gjo.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
                new (0, $MXQFO.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, "dc:title", txt),
                new (0, $MXQFO.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, "dc:subject", txt)
            ]);
            if (typeof filter == "undefined") filter = txtFilter;
            else filter = new (0, $kgzwJ.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
                filter,
                txtFilter
            ]);
        }
        //add spatial filter?
        if (bbox) filter = new (0, $kgzwJ.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
            filter,
            new (0, $8rzju.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, bbox[1], bbox[0], bbox[3], bbox[2], "urn:x-ogc:def:crs:EPSG:6.11:4326")
        ]);
        //category filter
        if ($(".dataset-facetitem.selected").length > 0) {
            var facet_item_filters = new Array();
            $(".dataset-facetitem.selected").each(function(i, item) {
                var facet_item = $(item).attr("id").split("_facet_item")[0];
                var facetitems = [].concat.apply([], this_.options.find.facets.map(function(facet) {
                    return facet.items;
                }));
                var filter_on_facetitem = facetitems.filter(function(item) {
                    if (item.id == facet_item) return item;
                })[0].filter;
                facet_item_filters.push(filter_on_facetitem);
            });
            var facet_item_filter = null;
            if (facet_item_filters.length == 1) facet_item_filter = facet_item_filters[0];
            else facet_item_filter = new (0, $d7Gjo.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, facet_item_filters);
            filter = new (0, $kgzwJ.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
                filter,
                facet_item_filter
            ]);
            $("#find-facets-reset").show();
        } else $("#find-facets-reset").hide();
        return filter;
    }
    /**
	 * loadTemplate
	 * @param {String} path
	 * @param {String} id
	 */ loadTemplate(path, id) {
        var deferred = $.Deferred();
        $.get(path, function(template, textStatus, jqXhr) {
            var template = $(template).filter("#" + id).html();
            deferred.resolve(template);
        });
        return deferred.promise();
    }
    /**
	 * initFindFacets
	 */ initFindFacets() {
        var this_ = this;
        $("#find-facets").empty();
        this.loadTemplate("templates/facet_item_tag.tpl.html", "facetItemTagTpl").then(function(template) {
            var dataHtml = "";
            for(var i = 0; i < this_.options.find.facets.length; i++){
                var facet = this_.options.find.facets[i];
                dataHtml += '<h6 style="font-weight:bold; margin-top:10px;margin-bottom:0px;">' + facet.title + '</h6><hr style="margin:4px;">';
                facet.type = "tag";
                for(var j = 0; j < facet.items.length; j++){
                    var item = facet.items[j];
                    item.withIcon = item.icon ? true : false;
                    var item_html = (0, ($parcel$interopDefault($hzBBV$mustachemustachemjs))).render(template, {
                        OFV_ID: this_.config.OFV_ID,
                        item: item
                    });
                    dataHtml += item_html;
                }
            }
            $("#find-facets").html(dataHtml);
        });
    }
    /**
	 * getDatasetsFromCSWPage
	 * @param maxrecords
	 * @param page
	 */ getDatasetsFromCSWPage(maxrecords, page) {
        var this_ = this;
        $("#dataset-articles").empty();
        $("#dataset-articles").html('<p id="dataset-loader" class="loader-generic loader-generic-wide"><br /><br /><br />' + this_.options.labels.datasets_loader + "</p>");
        $("#dataset-loader").show();
        var thebbox = null;
        if ($("#dataset-search-bbox-on-search").prop("checked")) thebbox = this_.map.getView().calculateExtent(this_.map.getSize());
        var thefilter = this_.createFilter(thebbox);
        console.log("OGC Filter:");
        console.log(thefilter);
        //display based on templates
        this.loadTemplate("templates/dataset.tpl.html", "datasetTpl").then(function(template) {
            //get CSW records for page
            this_.getRecords(maxrecords, page, thefilter).then(function(records) {
                this_.records_on_find = records;
                $("#dataset-loader").hide();
                var dataHtml = '<section class="col-xs-12 col-sm-12 col-md-12">';
                console.log(records);
                for(var i = 0; i < records.length; i++){
                    var record = records[i];
                    record.OFV_ID = this_.config.OFV_ID;
                    record.labels = this_.options.labels;
                    this_.cacheDataset(record);
                    var item_html = (0, ($parcel$interopDefault($hzBBV$mustachemustachemjs))).render(template, record);
                    dataHtml += item_html;
                }
                dataHtml += "</section>";
                $("#dataset-articles").html(dataHtml);
                this_.displayGraphicOverviews();
                //spatial coverage
                var extended = $("#dataset-spatial-coverage-extended").is(":checked");
                var visible = $("#dataset-spatial-coverage-visible").is(":checked");
                this_.setSpatialCoverageLayer(records, extended, visible);
                $("article").each(function(i, item) {
                    $(item).on("mouseenter", function(evt) {
                        var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
                        var vectorFeature = vectorLayer.getSource().getFeatureById($(item)[0].id);
                        if (vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")) {
                            var select = this_.map.getInteractions().getArray().filter(function(item) {
                                return item instanceof $hzBBV$olinteraction.Select;
                            });
                            if (select.length > 0) select = select[0];
                            vectorFeature.setStyle(this_.options.find.hoverStyle);
                            select.getFeatures().push(vectorFeature);
                            select.dispatchEvent("select");
                        }
                    });
                });
                $("article").each(function(i, item) {
                    $(item).on("mouseleave", function(evt) {
                        var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
                        var vectorFeature = vectorLayer.getSource().getFeatureById($(item)[0].id);
                        if (vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")) {
                            var select = this_.map.getInteractions().getArray().filter(function(item) {
                                return item instanceof $hzBBV$olinteraction.Select;
                            });
                            if (select.length > 0) select = select[0];
                            vectorFeature.setStyle(null);
                            select.getFeatures().remove(vectorFeature);
                            select.dispatchEvent("select");
                        }
                    });
                });
            });
        });
    }
    /**
	 * getDatasetsFromCSW
	 * @param maxrecords
	 * @param bbox
	 */ getDatasetsFromCSW(maxrecords, bbox) {
        $("#dataset-count").empty();
        $("#dataset-articles").empty();
        $("#dataset-articles").html('<p id="dataset-loader" class="loader-generic loader-generic-wide"><br /><br /><br />Fetching datasets...</p>');
        $("#dataset-loader").show();
        //business logic
        var this_ = this;
        var deferred = $.Deferred();
        if (!this.csw) deferred.reject("CSW endpoint is not instantiated!");
        if (this.csw) {
            //filter
            var filter = this.createFilter(bbox);
            console.log("OGC Filter:");
            console.log(filter);
            //get 1st record to get numberOfRecordsMatched
            this.csw.GetRecords(1, 1, filter, this.config.OGC_CSW_SCHEMA).then(function(response1) {
                //manage maxNb
                var numberOfRecordsMatched = response1.value.searchResults.numberOfRecordsMatched;
                console.log("CSW GetRecords matched " + numberOfRecordsMatched + " records");
                var maxNb = numberOfRecordsMatched;
                if (this_.options.find.maxitems && numberOfRecordsMatched > this_.options.find.maxitems) {
                    console.log("Max items option set. Restraining number of records retrieved to " + this_.options.find.maxitems + " records");
                    maxNb = this_.options.find.maxitems;
                }
                //add datasets counting
                $("#dataset-count").html(maxNb + " " + this_.options.labels.datasets);
                //Set paginated browsing operated by OGC CSW protocol
                $("#dataset-pages").bootpag({
                    total: Math.ceil(maxNb / maxrecords)
                }).trigger("page", 1);
            });
        }
        return deferred.promise();
    }
    /**
	 * displayDatasets
	 * @param maxrecords
	 * @param bbox
	 * @param facetItem
	 */ displayDatasets(maxrecords, bbox, facetItem) {
        var this_ = this;
        if ($("#dataset-search-bbox-on-search").prop("checked") && !bbox) bbox = this.map.getView().calculateExtent(this.map.getSize());
        this.getDatasetsFromCSW(maxrecords, bbox, facetItem);
    }
    /**
	 * displayGraphicOverviews
	 */ displayGraphicOverviews() {
        var imgs = $("img.graphic_overview");
        $.each(imgs, function() {
            var $this = $(this);
            var im = new Image();
            im.onload = function() {
                var theImage = $this;
                $this.hide();
                theImage[0].src = im.src;
                $this.removeClass("loader-generic");
                $this.show();
            };
            im.onerror = function() {
                var theImage = $this;
                $this.hide();
                $this.removeAttr("alt");
                $this[0].src = "img/loading-error.svg";
                $this.show();
            };
            $this.addClass("loader-generic");
            im.src = $this.attr("src");
        });
    }
    /**
	 * displayDatasetMetadata
	 * Display the metadata associated to a dataset
	 * @param elm
	 *
	 **/ displayDatasetMetadata(elm) {
        var pid = elm.getAttribute("data-pid");
        console.log("Display metadata dataset with pid = " + pid);
        var dataset = null;
        if (this.dataset_on_query) {
            if (pid == this.dataset_on_query.pid) dataset = this.dataset_on_query.entry;
        }
        if (!dataset) dataset = this.datasets.filter(function(data) {
            if (data.pid == pid) return data;
        })[0];
        if (!dataset) {
            console.warn("displayDatasetMetadata disabled, can't find dataset for pid '" + pid + "'");
            return;
        }
        this.options.find.datasetInfoHandler(dataset.metadata);
    }
    /**
	 * displayDatasetQueryForm
	 * Displays a dataset query form
	 * @param elm
	 *
	 **/ displayDatasetQueryForm(elm) {
        var pid = elm.getAttribute("data-pid");
        console.log("Display query form dataset with pid = " + pid);
        var dataset = this.datasets.filter(function(data) {
            if (data.pid == pid) return data;
        });
        if (dataset.length > 0) dataset = dataset[0];
        this.handleQueryForm(dataset, false);
    }
    /**
	 * zoomToExtent
	 * Zooms to dataset extent
	 * @param elm
	 *
	 **/ zoomToExtent(elm) {
        var pid = elm.getAttribute("data-pid");
        console.log("Zoom to dataset with pid = " + pid);
        var dataset = null;
        if (this.dataset_on_query) {
            if (pid == this.dataset_on_query.pid) dataset = this.dataset_on_query.entry;
        }
        if (!dataset) {
            dataset = this.datasets.filter(function(data) {
                if (data.pid == pid) return data;
            });
            if (dataset.length > 0) dataset = dataset[0];
        }
        if (!dataset) {
            console.warn("zoomToExtent disabled, no dataset identified from pid '" + pid + "'");
            return;
        }
        var idents = dataset.metadata.identificationInfo;
        if (!idents) return;
        if (idents.length == 0) return;
        var extents = idents[0].extent;
        if (!extents) return;
        if (extents.length == 0) return;
        var geo_extents = extents[0].exExtent.geographicElement;
        if (!geo_extents) return;
        if (geo_extents.length == 0) return;
        var geo_extent = geo_extents[0];
        var geo_keys = Object.keys(geo_extent);
        var is_bbox = geo_keys.indexOf("westBoundLongitude") != -1 && geo_keys.indexOf("eastBoundLongitude") != -1 && geo_keys.indexOf("southBoundLatitude") != -1 && geo_keys.indexOf("northBoundLatitude") != -1;
        //bounding box coords
        var coords = undefined;
        if (is_bbox) //case of bounding box
        coords = [
            geo_extent.westBoundLongitude,
            geo_extent.southBoundLatitude,
            geo_extent.eastBoundLongitude,
            geo_extent.northBoundLatitude
        ];
        //projection
        var srs_data = dataset.projection;
        var srs_map = this.map.getView().getProjection();
        if (srs_data) {
            if (srs_data.getCode() != srs_map.getCode()) {
                console.log("Dataset projection:");
                console.log(srs_data);
                console.log("Map projection:");
                console.log(srs_map);
                console.log("Dataset projection ('" + srs_data + "') differs from map projection ('" + srs_map + "'). Reprojecting bounding box!");
                console.log("Coordinates (source) = [" + coords + "]");
                var extentGeom = (0, $hzBBV$olgeomPolygon.fromExtent)(coords);
                extentGeom.transform(srs_data, srs_map);
                coords = extentGeom.getExtent();
                console.log("Coordinates (reprojected) = [" + coords + "]");
            }
        }
        //zoom
        if (coords) this.map.getView().fit(coords, this.map.getSize());
    }
    /**
	 * cacheDataset
	 * Cache a dataset
	 * @param dataset
	 *
	 **/ cacheDataset(dataset) {
        var pid = dataset.pid;
        console.log("Cache dataset with pid = " + pid);
        var out = false;
        if (this.datasets.map(function(i) {
            return i.pid;
        }).indexOf(pid) == -1) {
            this.datasets.push(dataset);
            out = true;
        }
        return out;
    }
    /**
	 * selectDatasetView
	 * Selects a dataset
	 * @param dataset
	 * @param lyr
	 *
	 **/ selectDatasetView(dataset, lyr) {
        console.log("Select dataset with pid = " + dataset.pid + ", lyr = " + lyr);
        var out = false;
        if (this.selection.map(function(i) {
            return i.lyr;
        }).indexOf(lyr) == -1) {
            dataset.lyr = lyr;
            this.selection.push(dataset);
            out = true;
        }
        return out;
    }
    /**
	 * unselectDatasetView
	 * Unselects a dataset
	 * @param elm
	**/ unselectDatasetView(elm) {
        var this_ = this;
        var lyr = elm.getAttribute("data-lyr");
        console.log("Unselect dataset view with lyr = " + lyr);
        //var thepid = null;
        //if(this.dataset_on_query) thepid = this.dataset_on_query.pid;
        var out = false;
        var len1 = this.selection.length;
        this.selection = this.selection.filter(function(i, data) {
            if (data.lyr != lyr) return data;
        });
        var len2 = this.selection.length;
        out = len2 < len1;
        //clear dsd interface in case selected dataset
        //if(this.dataset_on_query) if(this.dataset_on_query.pid == pid){
        //	$("#dsd-ui").empty();
        //	this.dataset_on_query = null;
        //}
        this.removeLayerByProperty(lyr, "id");
        this.map.changed();
        this_.renderMapLegend();
        //if(pid == thepid) this.openFindDialog();
        return out;
    }
    resolveDatasetDOI(elm) {
        var pid = elm.getAttribute("data-pid");
        console.log("Resove DOI for dataset pid = " + pid);
        var the_dataset = null;
        if (this.dataset_on_query) {
            if (pid == this.dataset_on_query.pid) the_dataset = this.dataset_on_query.entry;
        }
        if (!the_dataset) {
            the_dataset = this.datasets.filter(function(item) {
                if (item.pid == pid) return item;
            });
            if (the_dataset.length > 0) the_dataset = the_dataset[0];
        }
        if (!the_dataset) {
            console.warn("resolveDatasetDOI disabled, can't find dataset for pid '" + pid + "'");
            return;
        }
        window.open("//dx.doi.org/" + the_dataset.doi, "_blank");
    }
    /**
	 * getCSWRecord
	 * @param pid
	 * @returns a promise
	 */ getCSWRecord(pid) {
        console.log("Fetching metadata record from CSW for pid = '" + pid + "'");
        var this_ = this;
        var deferred = $.Deferred();
        var pidFilter = new (0, $MXQFO.default)(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, "dc:identifier", pid);
        this_.csw.GetRecords(1, 1, pidFilter, this_.config.OGC_CSW_SCHEMA).then(function(result) {
            var md_entry = new Object();
            if (result.value.searchResults.numberOfRecordsMatched > 0) {
                var csw_results = result.value.searchResults.any;
                md_entry = this_.createMetadataEntry(csw_results[0].value);
            }
            deferred.resolve(md_entry);
        });
        return deferred.promise();
    }
    //===========================================================================================
    //QUERY
    //===========================================================================================
    /**
	 * OpenFairViewer.prototype.parseFeatureCatalogue
	 * @param {#document} response from a Get request over the FeatureCatalogue ISO 19110 XML
	 * @returns {Object} a DSD json object
	 */ parseFeatureCatalogue(response1) {
        //artisanal parsing of feature catalog XML
        //TODO keep investigating ogc-schemas extension for gfc.xsd with jsonix!!!!
        var dsd = {
            strategy: undefined,
            components: new Array()
        };
        var featureCatalogue = $(response1.childNodes[0].childNodes).filter(function(idx, item) {
            if (item.nodeName == "gfc:FC_FeatureCatalogue") return item;
        });
        if (featureCatalogue.length == 0) {
            console.warn("No feature catalogue!");
            return;
        }
        //inherit feature catalogue scopes to define query strategy
        //Note: code maintained for backward compatibility for old files produced by geoflow. Next this will be inherited from ISO 19115/ ServiceIdentification
        var strategy1 = "ogc_filters";
        var scopes = $(featureCatalogue[0].childNodes).filter(function(i, item) {
            if (item.nodeName == "gmx:scope") return item;
        });
        if (scopes.length == 0) console.warn("No feature catalogue scope, setting default strategy to 'ogc_filters'");
        else {
            var ofv_scopes = scopes.filter(function(i, item) {
                if (item.children[0].textContent.startsWith("openfairviewer")) return item;
            });
            if (ofv_scopes.length > 0) {
                strategy1 = ofv_scopes[0].children[0].textContent.split(":")[1];
                console.log("OpenFairViewer Strategy read from Feature catalogue scope: " + strategy1);
            }
        }
        dsd.strategy = strategy1;
        //get feature types
        var featureTypes = $(featureCatalogue[0].childNodes).filter(function(idx, item) {
            if (item.nodeName == "gfc:featureType") return item;
        });
        var ft = featureTypes[0];
        //get carrier of characteristics
        var characteristics = $(ft.childNodes[1].childNodes).filter(function(idx, item) {
            if (item.nodeName == "gfc:carrierOfCharacteristics") return item;
        });
        for(var i = 0; i < characteristics.length; i++){
            var characteristic = characteristics[i];
            var featureAttribute = characteristic.childNodes[1];
            //name
            var fatName = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:memberName") return item;
            });
            if (fatName.length > 0) fatName = fatName[0].childNodes[1].textContent;
            //def
            var fatDef = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:definition") return item;
            });
            if (fatDef.length > 0) {
                if (fatDef[0].childNodes.length > 0) fatDef = fatDef[0].childNodes[1].textContent;
                else fatDef = null;
            }
            //code
            var fatCode = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:code") return item;
            });
            if (fatCode.length > 0) fatCode = fatCode[0].childNodes[1].textContent;
            //primitive type
            var fatType = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:valueType") return item;
            });
            var fatColType = null;
            var fatPrimType = null;
            if (fatType.length > 0) {
                var fatChildNode = fatType[0].childNodes[1].childNodes[1].childNodes[1];
                fatPrimType = fatChildNode.textContent;
                if (fatChildNode.hasAttribute("xlink:href")) fatColType = fatChildNode.getAttribute("xlink:href");
                else {
                    console.warn("No attribute/variable href defined as column type for attribute " + fatCode + " - default set to 'attribute'");
                    fatColType = "attribute";
                }
            }
            //cardinality
            var minOccurs = 0;
            var maxOccurs = 1;
            var fatCardinality = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:cardinality") return item;
            });
            if (fatCardinality.length > 0) {
                fatCardinality = fatCardinality[0].childNodes[1].childNodes[1].childNodes[1].childNodes;
                minOccurs = parseInt(fatCardinality[1].childNodes[1].textContent);
                if (fatCardinality[3].childNodes[1].getAttribute("isInfinite") == "true") maxOccurs = Infinity;
                else maxOccurs = parseInt(fatCardinality[3].childNodes[1].textContent);
            }
            //measurementUnit
            var gmlUnitIdentifier = null;
            var gmlUnitName = null;
            var fatMeasurementUnit = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:valueMeasurementUnit") return item;
            });
            if (fatMeasurementUnit.length > 0) {
                if (fatMeasurementUnit[0].childNodes.length > 0) {
                    var gmlUnit = $(fatMeasurementUnit[0].childNodes[1]);
                    var gmlUnitIdentifierXml = gmlUnit.children().filter(function(i, item) {
                        if (item.nodeName == "gml:identifier") return item;
                    });
                    if (gmlUnitIdentifierXml.length > 0) gmlUnitIdentifier = gmlUnitIdentifierXml[0].textContent;
                    var gmlUnitNameXml = gmlUnit.children().filter(function(i, item) {
                        if (item.nodeName == "gml:name") return item;
                    });
                    if (gmlUnitNameXml.length > 0) gmlUnitName = gmlUnitNameXml[0].textContent;
                }
            }
            //featureAttributeModel
            var featureAttributeModel = {
                name: fatName,
                definition: fatDef,
                primitiveCode: fatCode,
                primitiveType: fatPrimType,
                columnType: fatColType,
                minOccurs: minOccurs,
                maxOccurs: maxOccurs,
                uom: gmlUnitIdentifier,
                uomLabel: gmlUnitName,
                values: null
            };
            //values
            var listedValues = $(featureAttribute.childNodes).filter(function(i, item) {
                if (item.nodeName == "gfc:listedValue") return item;
            });
            if (listedValues.length > 0) {
                featureAttributeModel.values = new Array();
                for(var j = 0; j < listedValues.length; j++){
                    var listedValue = listedValues[j];
                    var props = listedValue.childNodes[1].childNodes;
                    var clCode = props[3].childNodes[1].textContent;
                    var clLabel = props[1].childNodes.length > 0 ? props[1].childNodes[1].textContent : "";
                    var clDefinition = undefined;
                    if (props[5]) {
                        if (props[5].childNodes.length > 0) clDefinition = props[5].childNodes[1].textContent;
                    }
                    var clHref = props[3].childNodes[1].getAttribute("xlink:href");
                    var clItem = {
                        id: clCode,
                        text: clLabel,
                        alternateText: clDefinition ? clDefinition : null,
                        codelist: featureAttributeModel.primitiveCode,
                        href: clHref
                    };
                    featureAttributeModel.values.push(clItem);
                }
            }
            dsd.components.push(featureAttributeModel);
        }
        console.log(dsd);
        return dsd;
    }
    /**
	 * OpenFairViewer.prototype.parseCoverageDescription
	 * @param dataset
	 * @returns {Object} a DSD json object
	 */ parseCoverageDescription(dataset) {
        var this_ = this;
        var pid = dataset.pid;
        var lyr = dataset.lyr;
        var entry = dataset.entry ? dataset.entry : dataset;
        var dsd = {
            strategy: this.getStrategy(dataset),
            components: new Array()
        };
        var serviceContentInfo = entry.metadata.contentInfo.filter(function(item) {
            return item.attributeDescription.recordType.value == "service";
        });
        if (serviceContentInfo.length > 0) {
            serviceContentInfo = serviceContentInfo[0];
            if (serviceContentInfo.dimension) {
                if (serviceContentInfo.dimension.length > 0) dsd.components = serviceContentInfo.dimension.map(function(item) {
                    var name = item.mdRangeDimension.sequenceIdentifier.memberName.aName;
                    var primitiveType = item.mdRangeDimension.sequenceIdentifier.memberName.attributeType.typeName.aName;
                    var dimensionModel = {
                        name: name,
                        definition: null,
                        primitiveCode: name,
                        primitiveType: primitiveType,
                        columnType: "attribute",
                        minOccurs: null,
                        maxOccurs: null,
                        uom: null,
                        uomLabel: null,
                        values: null
                    };
                    if (serviceContentInfo.rangeElementDescription) {
                        var rangeElementDesc = serviceContentInfo.rangeElementDescription.filter(function(rangedesc) {
                            console.log(rangedesc);
                            if (rangedesc.miRangeElementDescription.name == name) return rangedesc;
                        });
                        if (rangeElementDesc.length > 0) {
                            rangeElementDesc = rangeElementDesc[0].miRangeElementDescription;
                            if (rangeElementDesc.rangeElement) {
                                if (rangeElementDesc.rangeElement.length > 0) {
                                    dimensionModel.minOccurs = rangeElementDesc.rangeElement[0].record.content[0];
                                    dimensionModel.maxOccurs = rangeElementDesc.rangeElement[rangeElementDesc.rangeElement.length - 1].record.content[0];
                                    dimensionModel.values = rangeElementDesc.rangeElement.map(function(rangeElem) {
                                        return {
                                            id: rangeElem.record.content[0],
                                            text: "",
                                            alternateText: null,
                                            codelist: name,
                                            href: null
                                        };
                                    });
                                }
                            }
                        }
                    }
                    return dimensionModel;
                });
            }
        }
        return dsd;
    }
    /**
	 * parseLayerDescription
	 * @param dataset
	 * @param ogclayer
	 * @returns {Object} a DSD json object
	 */ parseLayerDescription(dataset, ogclayer) {
        var this_ = this;
        var pid = dataset.pid;
        var lyr = dataset.lyr;
        var entry = dataset.entry ? dataset.entry : dataset;
        var dsd = {
            strategy: this.getStrategy(dataset),
            components: new Array()
        };
        var ogc_layers = dataset.capabilities.capability.layer.layer[0].layer.filter(function(item) {
            if (item.name == ogclayer) return ogclayer;
        });
        if (ogc_layers.length > 0) {
            var ogc_layer = ogc_layers[0];
            var ogc_dims = ogc_layer.dimension;
            if (ogc_dims.length > 0) dsd.components = ogc_dims.map(function(item) {
                var primitiveType = null;
                var name = item.name.toUpperCase();
                switch(name){
                    case "TIME":
                        primitiveType = "xsd:datetime";
                        break;
                    case "ELEVATION":
                        primitiveType = "xsd:decimal";
                        break;
                }
                var dimensionModel = {
                    name: name,
                    definition: null,
                    primitiveCode: name,
                    primitiveType: primitiveType,
                    columnType: "attribute",
                    minOccurs: null,
                    maxOccurs: null,
                    uom: null,
                    uomLabel: null,
                    values: null
                };
                var dimension_values = item.value.replaceAll(" ", "").replace("\n", "").split(",");
                dimensionModel.values = dimension_values.map(function(value) {
                    return {
                        id: value,
                        text: "",
                        alternateText: null,
                        codelist: name,
                        href: null
                    };
                });
                dimensionModel.minOccurs = dimension_values[0];
                dimensionModel.maxOccurs = dimension_values[dimension_values.length - 1];
                return dimensionModel;
            });
        }
        console.log(dsd);
        return dsd;
    }
    /**
	 * handleQueryForm
	 * @param {Object} dataset
	 * @param {Boolean} dsdOnly
	 */ handleQueryForm(dataset, dsdOnly) {
        console.log(dataset);
        $("#dsd-ui").empty();
        var entry = dataset.entry ? dataset.entry : dataset;
        if (entry.dsdModel == "FeatureCatalogue") {
            console.log("Handle DSD Query Form from FeatureCatalogue (ISO 19110) for dataset with pid = " + dataset.pid);
            return this.handleDSDFromFeatureCatalogue(dataset, dsdOnly);
        } else if (entry.dsdModel == "CoverageDescription") {
            console.log("Handle DSD Query Form from CoverageDescription (ISO 19115-2) for dataset with pid = " + dataset.pid);
            return this.handleDSDFromCoverageDescription(dataset, dsdOnly);
        } else if (entry.dsdModel == "none") {
            console.log("Handle Filter Query Form for dataset with pid = " + dataset.pid);
            return this.handleFilter(dataset);
        }
    }
    /**
	 * Enable the query and map button
	 * @param columnIdx
	 */ handleQueryAndMapButton(columnIdx) {
        $("#dsd-ui-col-" + columnIdx).append("<br><br>");
        $("#dsd-ui-col-" + columnIdx).append('<button type="submit" id="datasetMapper" style="width:90%;" title="' + this.options.labels.dataset_query_map_title + '" data-loading-text="<span class=\'query-loader\'></span>" class="btn btn-primary">' + this.options.labels.dataset_query_map + "</button>");
        $("#dsd-ui-col-" + columnIdx).append('<br><span class="query-nodata" style="display:none;">' + this.options.labels.nodata + "</span>");
    }
    /**
	 * handleQueryFormButtons
	 * @param columnIdx
	 */ handleQueryFormButtons(columnIdx) {
        var this_ = this;
        var layerName = this_.dataset_on_query.pid;
        var layer = this_.getLayerByProperty(this_.dataset_on_query.pid, "id");
        //main export methods
        //------------------------------
        $("#dsd-ui-col-" + columnIdx).append('<div id="dsd-ui-export-methods1" style="margin: 0 auto;width: 90%;text-align: center !important;"><p style="margin:0;"></div>');
        this.options.access.exports.filter(function(item) {
            if (item.main) return item;
        }).forEach(function(export_method) {
            var services_are_available = true;
            if (export_method.services) {
                if (export_method.services.length > 0) services_are_available = export_method.services.filter(function(item) {
                    var service_is_available = false;
                    if (this_.dataset_on_query.entry[item]) {
                        if (this_.dataset_on_query.entry[item].length > 0) service_is_available = true;
                    }
                    return service_is_available;
                }).length == export_method.services.length;
            }
            var add = export_method.enabled && services_are_available;
            if (export_method.id == "data-dashboard") add = add && this_.hasDashboards(this_.dataset_on_query);
            if (add) {
                var button_id = "dsd-ui-button-" + export_method.id;
                var button_class = "btn data-action-button " + export_method["class"];
                var button_export_method = '<button type="button" id="' + button_id + '" class="' + button_class + '" title="' + export_method.title + '" onclick="' + this_.config.OFV_ID + ".triggerExport('" + export_method.id + "')\"></button>";
                $("#dsd-ui-export-methods1").append(button_export_method);
            }
        });
        //additional export buttons
        $("#dsd-ui-col-" + columnIdx).append('<div id="dsd-ui-export-methods2" style="padding:0px 15px;text-align: left !important;"></div>');
        var export_more = '<a data-toggle="collapse" href="#dataset-export-methods2" role="button" aria-expanded="false" aria-controls="dataset-export-methods2">' + this_.options.labels.export_options_more + "</a><br>";
        export_more += '<div class="collapse multi-collapse" id="dataset-export-methods2">';
        export_more += '<fieldset style="border: 1px #ccc solid;border-radius:4px;padding:4px;">';
        export_more += '<div class="data-export-buttons">';
        var exports_added = new Array();
        this.options.access.exports.filter(function(item) {
            if (!item.main) return item;
        }).forEach(function(export_method) {
            var services_are_available = true;
            if (export_method.services) {
                if (export_method.services.length > 0) services_are_available = export_method.services.filter(function(item) {
                    var service_is_available = false;
                    if (this_.dataset_on_query.entry[item]) {
                        if (this_.dataset_on_query.entry[item].length > 0) service_is_available = true;
                    }
                    return service_is_available;
                }).length == export_method.services.length;
            }
            var add = export_method.enabled && services_are_available;
            //if(export_method.id == "data-dashboard") add = add && this_.hasDashboards(this_.dataset_on_query);
            if (add) {
                var button_id = "dsd-ui-button-" + export_method.id;
                var button_class = "btn data-action-button " + export_method["class"];
                var button_export_method = '<button type="button" id="' + button_id + '" class="' + button_class + '" title="' + export_method.title + '" onclick="' + this_.config.OFV_ID + ".triggerExport('" + export_method.id + "')\"></button>";
                export_more += button_export_method;
            }
            if (add) exports_added.push(export_method);
        });
        export_more += "</div>";
        export_more += "</fieldset>";
        export_more += "</div>";
        if (exports_added.length > 0) $("#dsd-ui-export-methods2").append(export_more);
        //export options
        if (this_.dataset_on_query.entry.wfs.length > 0) {
            $("#dsd-ui-col-" + columnIdx).append('<div id="dsd-ui-export-options" style="padding:0px 15px;text-align: left !important;display:none;"></div>');
            var export_options = '<a data-toggle="collapse" href="#dataset-export-options" role="button" aria-expanded="false" aria-controls="dataset-export-options">' + this_.options.labels.export_options + "</a><br>";
            export_options += '<div class="collapse multi-collapse" id="dataset-export-options">';
            export_options += '<fieldset style="border: 1px #ccc solid;border-radius:4px;padding:4px;">';
            //option to prettify column names
            export_options += '<div class="form-check" style="float:left;margin-right:20px;"><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-colnames" type="checkbox" class="form-check-input">' + this_.options.labels.export_options_prettify + "</label></div>";
            //option to enrich with data labels
            export_options += '<div class="form-check" ><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-labels" type="checkbox" class="form-check-input">' + this_.options.labels.export_options_labels + "</label></div>";
            export_options += "</fieldset>";
            export_options += "</div>";
            $("#dsd-ui-export-options").append(export_options);
        }
        if (layer) {
            this_.enableQueryFormButtons();
            $("#dsd-ui-export-options").show();
            this_.enableDashboardOptions();
        } else {
            this_.disableQueryFormButtons();
            $("#dsd-ui-export-options").hide();
            this_.disableDashboardOptions();
        }
    }
    /**
	 * disableQueryFormButtons
	 */ disableQueryFormButtons() {
        $(".data-action-button").each(function(i, item) {
            $(item).prop("disabled", true);
        });
    }
    /**
	 * enableQueryFormButtons
	 */ enableQueryFormButtons() {
        $(".data-action-button").each(function(i, item) {
            $(item).prop("disabled", false);
        });
    }
    /**
	 * handleQueryThematicMappingOptions
	 * @param {String} geomtype
	 * @param {Integer} columnIdx
	 */ handleQueryThematicMappingOptions(geomtype, columnIdx) {
        var this_ = this;
        //id
        var map_type_id = "map-type-selector";
        //html
        $("#dsd-ui-col-" + columnIdx).append('<select id = "' + map_type_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.maptype_selector_title + '"></select>');
        //jquery widget
        var formatMaptype = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + "</span>");
            return $item;
        };
        var map_type_placeholder = this_.options.labels.maptype_selector;
        //map types
        var choropleth = {
            id: "choropleth",
            text: this_.options.labels.maptype_choropleth
        };
        var graduated = {
            id: "graduated",
            text: this_.options.labels.maptype_graduated
        };
        var has_choropleth = [
            "gml:PolygonPropertyType",
            "gml:MultiPolygonPropertyType"
        ].indexOf(geomtype) != -1;
        var map_types = [
            choropleth,
            graduated
        ];
        if (!has_choropleth) map_types = [
            graduated
        ];
        $("#" + map_type_id).select2({
            theme: "classic",
            allowClear: false,
            placeholder: map_type_placeholder,
            data: map_types,
            templateResult: formatMaptype,
            templateSelection: formatMaptype
        });
        $("#" + map_type_id).val(map_types[0].id).trigger("change");
        //6. Map classifications
        //Classification type
        //-------------------
        //id
        var map_classtype_id = "map-classtype-selector";
        //html
        $("#dsd-ui-col-" + columnIdx).append('<select id = "' + map_classtype_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.class_selector_title + '"></select>');
        //jquery widget
        var formatClasstype = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + "</span>");
            return $item;
        };
        var map_classtype_placeholder = this_.options.labels.class_selector;
        $("#" + map_classtype_id).select2({
            theme: "classic",
            allowClear: false,
            placeholder: map_classtype_placeholder,
            data: [
                {
                    id: "ckmeans",
                    text: this_.options.labels.class_ckmeans
                },
                {
                    id: "equal",
                    text: this_.options.labels.class_equal
                },
                {
                    id: "quantile",
                    text: this_.options.labels.class_quantile
                }
            ],
            templateResult: formatClasstype,
            templateSelection: formatClasstype
        });
        $("#" + map_classtype_id).val("ckmeans").trigger("change");
        //Number of class intervals
        //-------------------------
        //id
        var map_classnb_id = "map-classnb-selector";
        //html
        $("#dsd-ui-col-" + columnIdx).append('<select id = "' + map_classnb_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.classnb_selector_title + '"></select>');
        //jquery widget
        var formatClassnb = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + "</span>");
            return $item;
        };
        var map_classnb_placeholder = this_.options.labels.classnb_selector;
        $("#" + map_classnb_id).select2({
            theme: "classic",
            allowClear: false,
            placeholder: map_classnb_placeholder,
            data: [
                {
                    id: "3",
                    text: "3"
                },
                {
                    id: "4",
                    text: "4"
                },
                {
                    id: "5",
                    text: "5"
                }
            ],
            templateResult: formatClassnb,
            templateSelection: formatClassnb
        });
        $("#" + map_classnb_id).val("5").trigger("change");
        //Color palettes
        //-------------------
        //id
        var map_colorscheme_id = "map-colorscheme-selector";
        //html
        if (has_choropleth) $("#dsd-ui-col-" + columnIdx).append('<select id = "' + map_colorscheme_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.colorscheme_selector_title + '"></select>');
        //jquery widget
        var formatColorscheme = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span title="' + item.text + '">' + item.svg + " <em>(" + item.text + ")</em></span>");
            return $item;
        };
        var map_colorscheme_placeholder = this_.options.labels.colorscheme_selector;
        var getPaletteAsSVG = function(id) {
            var classnb = parseInt($("#map-classnb-selector").val());
            var colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[id][classnb];
            var sq_width = 15;
            var sq_height = 15;
            var svg = '<svg width="' + sq_width * classnb + '" height="' + sq_height + '" style="vertical-align:middle;">';
            var colorHeight = 0;
            colors.forEach(function(color) {
                svg += '<rect fill="' + color + '" width="' + sq_width + '" height="' + sq_height + '" x="' + colorHeight + '"></rect>';
                colorHeight = colorHeight + sq_width;
            });
            svg += "</svg>";
            return svg;
        };
        var initColorschemeSelector = function() {
            $("#" + map_colorscheme_id).select2({
                theme: "classic",
                allowClear: false,
                placeholder: map_colorscheme_placeholder,
                data: Object.keys((0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs))).schemeGroups).splice(0, 3).map(function(schemeGroup) {
                    return {
                        text: this_.options.labels["colorscheme_" + schemeGroup],
                        children: (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs))).schemeGroups[schemeGroup].map(function(item) {
                            return {
                                id: item,
                                text: item,
                                svg: getPaletteAsSVG(item)
                            };
                        })
                    };
                }),
                templateResult: formatColorscheme,
                templateSelection: formatColorscheme
            });
        };
        if (has_choropleth) {
            initColorschemeSelector();
            $("#" + map_colorscheme_id).val("Reds").trigger("change");
            //events related to colorscheme selection
            $("#" + map_classnb_id).on("select2:select", function(e) {
                initColorschemeSelector();
            });
            $("#" + map_type_id).on("select2:select", function(e) {
                if (e.target.value == "choropleth") $("#" + map_colorscheme_id).next(".select2-container").show();
                else $("#" + map_colorscheme_id).next(".select2-container").hide();
            });
        }
    }
    /**
	 * handleQueryStylingOptions
	 * @param {Integer} columnIdx
	 */ handleQueryStylingOptions(columnIdx) {
        var this_ = this;
        //id
        var map_style_id = "map-style-selector";
        //html
        $("#dsd-ui-col-" + columnIdx).append('<select id = "' + map_style_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.styling_selector_title + '"></select>');
        //jquery widget
        var formatMapstyle = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + "</span>");
            return $item;
        };
        var map_style_placeholder = this_.options.labels.styling_selector;
        //map styles
        var map_layers = this.dataset_on_query.capabilities.capability.layer.layer[0].layer;
        var map_styles = new Array();
        var map_ogclayer = null;
        var map_ogclayer_filter = map_layers.filter(function(layer) {
            if (layer.name == this_.dataset_on_query.lyr) return layer;
        });
        if (map_ogclayer_filter.length > 0) map_ogclayer = map_ogclayer_filter[0];
        if (map_ogclayer) map_styles = map_ogclayer.style.map(function(style) {
            return {
                id: style.name,
                text: style.title,
                alternateText: style._abstract,
                href: style.legendURL[0].onlineResource.href
            };
        });
        $("#" + map_style_id).select2({
            theme: "classic",
            allowClear: true,
            placeholder: map_style_placeholder,
            data: map_styles,
            templateResult: formatMapstyle,
            templateSelection: formatMapstyle
        });
        $("#ui-ogc_layer").trigger("change");
        if (map_styles.length > 0) $("#" + map_style_id).val(map_styles[0].id).trigger("change");
        $("#ui-ogc_layer").on("select2:select", function(e) {
            var map_ogclayer = null;
            var map_ogclayer_filter = map_layers.filter(function(layer) {
                if (layer.name == e.target.value) return layer;
            });
            if (map_ogclayer_filter.length > 0) map_ogclayer = map_ogclayer_filter[0];
            if (map_ogclayer) {
                var styles = map_ogclayer.style.map(function(style) {
                    return {
                        id: style.name,
                        text: style.title,
                        alternateText: style._abstract,
                        href: style.legendURL[0].onlineResource.href
                    };
                });
                $("#" + map_style_id).select2().empty();
                $("#" + map_style_id).select2({
                    data: styles
                });
                $("#" + map_style_id).val(styles[0].id).trigger("change");
            }
        });
    }
    /**
	 * handleDashboardOptions
	 * @param {Integer} columnIdx
	 */ handleDashboardOptions(columnIdx) {
        var this_ = this;
        //id
        var dashboard_id = "dashboard-selector";
        //header
        var html = $('<div id="dashboard-options" style="display:none;">');
        html.append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-blackboard"></span><label style="margin-left:4px;">' + this_.options.labels.dashboard_options + '</label></p><hr style="margin:0px;"></div>');
        //html
        html.append('<select id = "' + dashboard_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.dashboard_selector_title + '"><option></option></select>');
        $("#dsd-ui-col-" + columnIdx).append(html);
        //jquery widget
        var formatDashboard = function(item) {
            if (!item.id) return item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + "</span>");
            return $item;
        };
        var dashboard_placeholder = this_.options.labels.dashboard_selector;
        $("#" + dashboard_id).select2({
            theme: "classic",
            allowClear: true,
            placeholder: dashboard_placeholder,
            data: this_.getDashboards(this_.dataset_on_query).map(function(item) {
                return {
                    id: item.name,
                    text: item.name
                };
            }),
            templateResult: formatDashboard,
            templateSelection: formatDashboard
        });
        //event related to selection
        $("#" + dashboard_id).on("select2:select", function(e) {
            this_.displayDashboard(e.target.value);
        });
        $("#" + dashboard_id).on("select2:clear", function(e) {
            this_.closeDashboardDialog();
        });
    }
    /**
	 * enableDashboardOptions
	 */ enableDashboardOptions() {
        $("#dashboard-options").show();
    }
    /**
	 * disableDashboardOptions
	 */ disableDashboardOptions() {
        $("#dashboard-options").hide();
    }
    /**
	 * getStrategy
	 * @param dataset
	 */ getStrategy(dataset) {
        var strategy1 = "ogc_filters";
        var entry = dataset.entry ? dataset.entry : dataset;
        var idents = entry.metadata.identificationInfo;
        if (idents.length > 0) {
            var srv_idents = idents.filter(function(item) {
                if (item.containsOperations) return item;
            });
            if (srv_idents.length > 0) for(var j = 0; j < srv_idents.length; j++){
                var item = srv_idents[j];
                if (item.containsOperations) {
                    if (item.containsOperations.length > 0) for(var i = 0; i < item.containsOperations.length; i++){
                        var op = item.containsOperations[i];
                        if (op.svOperationMetadata.parameters) {
                            if (op.svOperationMetadata.parameters.length > 0) {
                                if (typeof op.svOperationMetadata.parameters[0].nilReason == "undefined") {
                                    var op_params = op.svOperationMetadata.parameters.map(function(item) {
                                        return item.svParameter.name.aName;
                                    });
                                    if (op_params.indexOf("TIME") >= 0 || op_params.indexOf("ELEVATION") >= 0) {
                                        strategy1 = "ogc_dimensions";
                                        break;
                                    }
                                    if (op_params.indexOf("VIEWPARAMS") >= 0) {
                                        strategy1 = "ogc_viewparams";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return strategy1;
    }
    /**
	 * getDatasetServiceCouplingType
	 * @param dataset
	 */ getDatasetServiceCouplingType(dataset) {
        var couplingType = "loose";
        var entry = dataset.entry ? dataset.entry : dataset;
        var idents = entry.metadata.identificationInfo;
        if (idents.length > 0) {
            var srv_idents = idents.filter(function(item) {
                if (item.containsOperations) return item;
            });
            if (srv_idents.length > 0) {
                var srv_ident = srv_idents[0];
                if (srv_ident.couplingType) couplingType = srv_ident.couplingType.svCouplingType.codeListValue;
            }
        }
        return couplingType;
    }
    /**
	 * handleDatasetServiceCapabilities
	 * @param dataset
	 */ handleDatasetServiceCapabilities(dataset) {
        var deferred = $.Deferred();
        var this_ = this;
        var pid = dataset.pid;
        var entry = dataset.entry ? dataset.entry : dataset;
        var wmsConfig = [
            [
                DC_1_1,
                DCT,
                XLink_1_0,
                SMIL_2_0,
                SMIL_2_0_Language,
                OWS_1_0_0,
                OWS_1_1_0,
                WMS_1_1_1,
                WMS_1_3_0
            ],
            {
                namespacePrefixes: {
                    "http://www.opengis.net/wms": "wms",
                    "http://www.w3.org/2001/XMLSchema-instance": "xsi"
                }
            }
        ];
        //find wms caps url
        var wms_caps_url = null;
        //first look at service Identification
        var idents = entry.metadata.identificationInfo;
        if (idents.length > 0) {
            var srv_idents = idents.filter(function(item) {
                if (item.containsOperations) return item;
            });
            if (srv_idents.length > 0) for(var j = 0; j < srv_idents.length; j++){
                var item = srv_idents[j];
                if (item.containsOperations) {
                    if (item.containsOperations.length > 0) for(var i = 0; i < item.containsOperations.length; i++){
                        var op = item.containsOperations[i];
                        if (op.svOperationMetadata.operationName == "GetCapabilities") {
                            if (op.svOperationMetadata.connectPoint) {
                                if (op.svOperationMetadata.connectPoint.length > 0) {
                                    wms_caps_url = op.svOperationMetadata.connectPoint[0].ciOnlineResource.linkage.url.split("?")[0];
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!wms_caps_url) //if null then look at online resources
        wms_caps_url = entry.wms[0].url.split("?")[0];
        var wms_service = new (0, $a7gdG.default)(wms_caps_url, entry.wms[0].version, wmsConfig);
        wms_service.GetCapabilities().then(function(capabilities) {
            deferred.resolve(this_.lightenMetadata(capabilities));
        });
        return deferred.promise();
    }
    /**
	 * handleFilter
	 * @param {String} pid
	 */ handleFilter(dataset) {
        var deferred = $.Deferred();
        var this_ = this;
        var pid = dataset.pid;
        var entry = dataset.entry ? dataset.entry : dataset;
        this.dataset_on_query = {
            pid: pid,
            layer: dataset.layer,
            entry: entry,
            strategy: "ogc_filters",
            dsd: null,
            query: null,
            thematicmapping: false,
            point_vectorizing: false,
            point_clustering: false //for simple filter no way to know if it is a point layer?
        };
        //build UI
        var bootstrapClass = "col-md-" + 12 / this_.options.access.columns;
        $("#dsd-ui").append('<div id="dsd-ui-header"></div>');
        $("#dsd-ui-header").append('<div class="alert alert-info" style="padding:6px;margin:6px;text-align:left;"><h5><b>' + entry.title + " <small><em>[" + entry.pid + "]</em></small></b></h5></div>");
        $("#dsd-ui").append('<form id="dsd-ui-body" onsubmit="' + this_.config.OFV_ID + ".mapDatasetView(" + this_.config.OFV_ID + '.dataset_on_query, true);return false"></form>');
        $(document).on("submit", "#dsd-ui-body", function(event) {
            event.preventDefault();
        });
        $("#dsd-ui").append('<input type="text" autofocus="autofocus" style="display:none" />'); //Avoid autofocus on query inputs
        $("#dsd-ui-body").append('<div id="dsd-ui-col-1" class="' + bootstrapClass + '"></div>');
        //ogc layer
        var ogclayers = entry.wms.map(function(item) {
            return {
                id: item.name,
                text: item.description ? item.description : item.name,
                url: item.url
            };
        });
        console.log(ogclayers);
        //ogc layer id
        var ogclayer_id = "ui-ogc_layer";
        //html
        $("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-th-list"></span><label style="margin-left:4px;">' + this_.options.labels.layer_selection + '</label></p><hr style="margin:0px;"></div>');
        $("#dsd-ui-col-1").append('<select id = "' + ogclayer_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.layer_selection_title + '" required></select><span style="color:red;font-weight:bold;margin-left:2px;font-size:14px;">*</span>');
        //jquery widget
        var formatLayer = function(item) {
            if (!item.id) return item.text;
            var txt = item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
            return $item;
        };
        var ogclayer_placeholder = this_.options.labels.layer_selection_placeholder;
        $("#" + ogclayer_id).select2({
            theme: "classic",
            allowClear: false,
            placeholder: ogclayer_placeholder,
            data: ogclayers,
            templateResult: formatLayer,
            templateSelection: formatLayer
        });
        if (ogclayers.length == 1) $("#" + ogclayer_id).val(ogclayers[0].id).trigger("change");
        //ogc filter id
        var ogcfilter_component_id = "ui-ogc_filter";
        //ogc filter html
        $("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-filter"></span><label style="margin-left:4px;">' + this_.options.labels.filtering + '</label style="margin-left:4px;"></p><hr style="margin:0px;"></div>');
        $("#dsd-ui-col-1").append('<input type="text" id="' + ogcfilter_component_id + '" class="dsd-ui-dimension" style="margin-left:10px;" title="' + this_.options.labels.filtering_title + '" autofocus="true" ></select>');
        //query form buttons
        this.handleQueryAndMapButton(1);
        this.handleQueryFormButtons(1);
        //query service capabilities
        console.log(this_.getDatasetServiceCouplingType(this_.dataset_on_query));
        if (this_.getDatasetServiceCouplingType(this_.dataset_on_query) == "tight") this_.handleDatasetServiceCapabilities(this_.dataset_on_query).then(function(capabilities) {
            console.log(strategy);
            if (strategy == "ogc_dimensions") {
                this_.dataset_on_query.capabilities = capabilities;
                var ogc_dsd = this_.parseLayerDescription(this_.dataset_on_query, entry.wms[0].name);
                console.log(ogc_dsd);
                this_.dataset_on_query.dsd = ogc_dsd.components;
            }
            //build UI
            $("#dsd-loader").hide();
            deferred.resolve(this_.dataset_on_query);
        });
        else {
            $("#dsd-loader").hide();
            deferred.resolve(this_.dataset_on_query);
        }
        return deferred.promise();
    }
    /**
	 * handleDSDUserInterface
	 * @param dataset
	 */ handleDSDUserInterface(dataset) {
        var this_ = this;
        var this_ = this;
        var pid = dataset.pid;
        var lyr = dataset.lyr;
        var strategy1 = this.getStrategy(dataset);
        var entry = dataset.entry ? dataset.entry : dataset;
        var bootstrapClass = "col-md-" + 12 / this_.options.access.columns;
        $("#dsd-ui").append('<div id="dsd-ui-header"></div>');
        //acccess dataset header
        var accessHeader = '<div class="row" style="padding:6px;margin:6px;text-align:left;background-color: #d9edf7;color: #31708f;"><div class="col-md-10"><h5><b>' + entry.title + " <small><em>[" + entry.pid + "]</em></small></b></h5></div>";
        accessHeader += '<div class="col-md-2">';
        //button-->doi
        if (entry.doi) accessHeader += '<button class="btn btn-xs dataset-button dataset-button-doi" style="top:10px;" data-pid="' + entry.pid + '" title="' + this_.options.labels.dataset_access_doi + '" onclick="' + this_.config.OFV_ID + '.resolveDatasetDOI(this)"><span class="ai ai-doi" style="font-size:120%;"></span></button>';
        //button-->info (metadata)
        accessHeader += '<button class="btn btn-xs dataset-button dataset-button-info" style="top:10px;" data-pid="' + entry.pid + '" title="' + this_.options.labels.dataset_access_metadata + '" onclick="' + this_.config.OFV_ID + '.displayDatasetMetadata(this)"><span class="glyphicon glyphicon-info-sign"></span></button>';
        //button-->zoom
        accessHeader += '<button class="btn btn-xs dataset-button dataset-button-zoom" style="top:10px;" data-pid="' + entry.pid + '" title="' + this_.options.labels.dataset_zoom_extent + '" onclick="' + this_.config.OFV_ID + '.zoomToExtent(this)"><span class="glyphicon glyphicon-zoom-in"></span></button>';
        accessHeader += "</div></div>";
        $("#dsd-ui-header").append(accessHeader);
        //access dataset query form
        $("#dsd-ui").append('<form id="dsd-ui-body" onsubmit="' + this_.config.OFV_ID + ".mapDatasetView(" + this_.config.OFV_ID + '.dataset_on_query, true);return false"></form>');
        $(document).on("submit", "#dsd-ui-body", function(event) {
            event.preventDefault();
        });
        $("#dsd-ui").append('<input type="text" autofocus="autofocus" style="display:none" />'); //Avoid autofocus on query inputs
        $("#dsd-ui-body").append('<div id="dsd-ui-col-1" class="' + bootstrapClass + '"></div>');
        //0. Add layer selection (required for multi-layer metadata)
        //-------------------------------------------
        //ogc layer
        var ogclayers = entry.wms.map(function(item) {
            return {
                id: item.name,
                text: item.description ? item.description : item.name,
                url: item.url
            };
        });
        console.log(ogclayers);
        //ogc layer id
        var ogclayer_id = "ui-ogc_layer";
        //html
        $("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-th-list"></span><label style="margin-left:4px;">' + this_.options.labels.layer_selection + '</label style="margin-left:4px;"></p><hr style="margin:0px;"></div>');
        $("#dsd-ui-col-1").append('<select id = "' + ogclayer_id + '" class="dsd-ui-dimension" title="' + this_.options.labels.layer_title + '" required></select><span style="color:red;font-weight:bold;margin-left:2px;font-size:14px;">*</span>');
        //jquery widget
        var formatLayer = function(item) {
            if (!item.id) return item.text;
            var txt = item.text;
            var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
            return $item;
        };
        var ogclayer_placeholder = this_.options.labels.layer_placeholder;
        $("#" + ogclayer_id).select2({
            theme: "classic",
            allowClear: false,
            placeholder: ogclayer_placeholder,
            data: ogclayers,
            templateResult: formatLayer,
            templateSelection: formatLayer
        });
        if (ogclayers.length == 1) $("#" + ogclayer_id).val(ogclayers[0].id).trigger("change");
        else $("#" + ogclayer_id).val("").trigger("change");
        //1. Build UI from ATTRIBUTES filtering
        //-------------------------------------------
        var attributes = this_.dataset_on_query.dsd.filter(function(item) {
            if (item.columnType == "attribute") return item;
        });
        if (attributes.length > 0) {
            $("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-filter"></span><label style="margin-left:4px;">' + this_.options.labels.filtering + '</label style="margin-left:4px;"></p><hr style="margin:0px;"></div>');
            var attributeMatcher = function(params, data) {
                params.term = params.term || "";
                if ($.trim(params.term) === "") return data;
                var term = params.term.toUpperCase();
                var altText = data.alternateText ? data.alternateText : "";
                if (data.text.toUpperCase().indexOf(term) > -1 | data.id.toUpperCase().indexOf(term) > -1 | altText.toUpperCase().indexOf(term) > -1) return data;
                return null;
            };
            $("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>' + this_.options.labels.attributes + "</label></p></div>");
            var dsd = this_.dataset_on_query.dsd;
            for(var i = 0; i < this_.dataset_on_query.dsd.length; i++){
                var dsd_component = this_.dataset_on_query.dsd[i];
                if (dsd_component.columnType == "attribute") {
                    //attribute with list values --> DROPDOWNLISTS
                    if (dsd_component.values) {
                        var withNames = dsd_component.values.map(function(item) {
                            return item.text;
                        }).every(function(element, index, array) {
                            return element != null && element != "";
                        });
                        //id
                        var dsd_component_id = "dsd-ui-dimension-attribute-" + dsd_component.primitiveCode;
                        var isRequired = dsd_component.minOccurs == 1 ? true : false;
                        var isMultiple = dsd_component.maxOccurs == Infinity ? true : false;
                        if (dsd_component.primitiveType == "xsd:string" || withNames) {
                            //html
                            $("#dsd-ui-col-1").append('<select id = "' + dsd_component_id + '" ' + (isMultiple ? 'multiple="multiple"' : "") + (isRequired ? "required" : "") + ' class="dsd-ui-dimension dsd-ui-dimension-attribute" data-dimension-code="' + dsd_component.primitiveCode + '" title="' + this_.options.labels.filtering_on + " " + dsd_component.name + '">' + (isMultiple ? "" : "<option></option>") + "</select>" + (isRequired ? '<span style="color:red;font-weight:bold;margin-left:2px;font-size:14px;">*</span>' : ""));
                            //jquery widget
                            var attributeItemSelection = function(item) {
                                if (!item.id) return item.text;
                                //TODO vocabulary stuff for countries
                                if ([
                                    "flag",
                                    "flagstate",
                                    "country"
                                ].filter(function(el) {
                                    return item.codelist.toLowerCase().match(el);
                                }).length > 0) var $item = $('<img src="img/flags/' + item.id.toLowerCase() + '.gif" class="img-flag" />' + '<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
                                else if (item.alternateText) var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>" + '<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + "</span>" + (item.href ? ' <a href="' + item.href + '" target="_blank" style="color:blue;">' + this_.options.labels.listedvalue_href_placeholder + "</a>" : ""));
                                else var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>" + (item.href ? '<br><a href="' + item.href + '" target="_blank" style="color:blue;">' + this_.options.labels.listedvalue_href_placeholder + "</a>" : ""));
                                return $item;
                            };
                            var attributeItemResult = function(item) {
                                if (!item.id) return item.text;
                                //TODO vocabulary stuff for countries
                                if ([
                                    "flag",
                                    "flagstate",
                                    "country"
                                ].filter(function(el) {
                                    return item.codelist.toLowerCase().match(el);
                                }).length > 0) var $item = $('<img src="img/flags/' + item.id.toLowerCase() + '.gif" class="img-flag" />' + '<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
                                else if (item.alternateText) var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>" + '<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + "</span>");
                                else var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
                                return $item;
                            };
                            var dsd_component_placeholder = dsd_component.name;
                            $("#" + dsd_component_id).select2({
                                theme: "classic",
                                allowClear: true,
                                placeholder: dsd_component_placeholder,
                                data: dsd_component.values.filter(function(item) {
                                    if (!this_.options.access.values_to_exclude_for) return item;
                                    if (this_.options.access.values_to_exclude_for) {
                                        var values_to_exclude = this_.options.access.values_to_exclude_for[dsd_component.primitiveCode];
                                        if (values_to_exclude) {
                                            if (values_to_exclude.indexOf(item.id) == -1) return item;
                                        } else return item;
                                    } else return item;
                                }),
                                templateResult: attributeItemResult,
                                templateSelection: attributeItemSelection,
                                matcher: attributeMatcher
                            });
                            //add info button
                            if (dsd_component.definition) {
                                if (dsd_component.definition.length > 0) $("#dsd-ui-col-1").append('<span class="glyphicon glyphicon-info-sign attribute-info" title="' + dsd_component.definition + '"></span>');
                            }
                        } else if ((dsd_component.primitiveType == "xsd:int" || dsd_component.primitiveType == "xsd:decimal") && !withNames) {
                            var values = dsd_component.values.map(function(item) {
                                return parseInt(item.id);
                            });
                            var values_min = Math.min.apply(Math, values);
                            var values_max = Math.max.apply(Math, values);
                            //html
                            var dsd_component_id_range = dsd_component_id + "-range";
                            var dsd_component_id_slider = dsd_component_id + "-slider";
                            var dsd_component_slider_html = '<div id="' + dsd_component_id + '" class="dsd-ui-dimension dsd-ui-dimension-attribute dsd-ui-dimension-slider" data-dimension-code="' + dsd_component.primitiveCode + '">' + '<p><label for="' + dsd_component_id_range + '">' + dsd_component.name + ": </label>" + '<input type="text" id="' + dsd_component_id_range + '" readonly style="margin-left:5px; border:0; color:#f6931f; font-weight:bold;"></p>' + '<input id="' + dsd_component_id_slider + '" type="text" data-slider-min="' + values_min + '" data-slider-max="' + values_max + '" data-slider-value="' + (isMultiple ? "[" + values_min + ", " + values_max + "]" : values_max) + '"/>' + "</div>";
                            $("#dsd-ui-col-1").append(dsd_component_slider_html);
                            console.log(dsd_component_id_slider);
                            //jquery widget
                            /*$("#"+dsd_component_id_slider).slider({
							  range: isMultiple, min: values_min, max: values_max,
							  values: (isMultiple? [ values_min, values_max ] : values_min),
							  slide: function( event, ui ) {
								var value = ui.values? ui.values[ 0 ] + " - " + ui.values[ 1 ] : ui.value;
								$("#"+event.target.id.split("-slider")[0]+"-range").val(value);
							  },
							  change: function( event, ui ) {
								var value = ui.values? ui.values[ 0 ] + " - " + ui.values[ 1 ] : ui.value;
								$("#"+event.target.id.split("-slider")[0]+"-range").val(value); 
							  }
							});
							var value = isMultiple? $("#"+dsd_component_id_slider).slider( "values", 0 ) + " - " +  $("#"+dsd_component_id_slider).slider( "values", 1 ) : $("#"+dsd_component_id_slider).slider( "value");
							$("#"+dsd_component_id_range).val(value);*/ $("#" + dsd_component_id_slider).bootstrapSlider({
                                id: dsd_component_id_slider + "_widget",
                                range: isMultiple,
                                min: values_min,
                                max: values_max,
                                value: isMultiple ? [
                                    values_min,
                                    values_max
                                ] : values_max,
                                ticks: dsd_component.values.map(function(instant) {
                                    return parseFloat(instant.id);
                                }),
                                lock_to_ticks: true
                            });
                            $("#" + dsd_component_id_slider).on("slide", function(event) {
                                console.log(event);
                                console.log(event.value);
                                var value = event.value instanceof Array ? event.value[0] + " - " + event.value[1] : event.value;
                                $("#" + event.target.id.split("-slider")[0] + "-range").val(value);
                            });
                            $("#" + dsd_component_id_slider).on("change", function(event) {
                                var evt_value = event.value.newValue;
                                var value = evt_value instanceof Array ? evt_value[0] + " - " + evt_value[1] : evt_value;
                                $("#" + event.target.id.split("-slider")[0] + "-range").val(value);
                            });
                            var value = isMultiple ? $("#" + dsd_component_id_slider).data("bootstrapSlider").getValue()[0] + " - " + $("#" + dsd_component_id_slider).data("bootstrapSlider").getValue()[1] : $("#" + dsd_component_id_slider).data("bootstrapSlider").getValue();
                            $("#" + dsd_component_id_range).val(value);
                        }
                    }
                    //attribute with time --> datepicker / datetimepicker or slider
                    if (dsd_component.primitiveType == "xsd:date" || dsd_component.primitiveType == "xsd:datetime") {
                        if (!dsd_component.values) {
                            //indicates local tzone but required to display well the original date
                            var entry_time_start = entry.time_start;
                            if (entry_time_start.length == 4) entry_time_start = entry_time_start + "-01-01";
                            var time_start_local = new Date(Date.parse(entry_time_start.split("Z")[0]));
                            var time_start_local_offset = time_start_local.getTimezoneOffset() * 60000;
                            var time_start = new Date(time_start_local.getTime() + time_start_local_offset);
                            var entry_time_end = entry.time_end;
                            if (entry_time_end.length == 4) entry_time_end = entry_time_end + "-12-31";
                            var time_end_local = new Date(Date.parse(entry_time_end.split("Z")[0]));
                            var time_end_local_offset = time_end_local.getTimezoneOffset() * 60000;
                            var time_end = new Date(time_end_local.getTime() + time_end_local_offset);
                            //id
                            var dsd_component_id_start = "dsd-ui-dimension-time-start-" + dsd_component.primitiveCode;
                            var dsd_component_id_end = "dsd-ui-dimension-time-end-" + dsd_component.primitiveCode;
                            //html
                            var dsd_component_time_html = '<div class="dsd-ui-dimension-time" style="text-align:left;margin-left:0px;margin-bottom:5px;">';
                            dsd_component_time_html += '<label style="width:120px;font-weight:normal;">' + dsd_component.name + '</label><br> <input type="text" id="' + dsd_component_id_start + '" class="dsd-ui-dimension-datepicker" autocomplete="off" >';
                            if (strategy1 == "ogc_filters") dsd_component_time_html += '<input type="text" id="' + dsd_component_id_end + '" class="dsd-ui-dimension-datepicker" autocomplete="off">';
                            dsd_component_time_html += "</div>";
                            $("#dsd-ui-col-1").append(dsd_component_time_html);
                            var startRange = $("#" + dsd_component_id_start);
                            var endRange = $("#" + dsd_component_id_end);
                            //jquery widget
                            if (dsd_component.primitiveType == "xsd:date") switch(strategy1){
                                case "ogc_filters":
                                    startRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        formatDate: "Y-d-m",
                                        formatTime: "HH:mm:ss",
                                        timepicker: false,
                                        onShow: function(ct) {
                                            this.setOptions({
                                                maxDate: endRange.val() ? endRange.val() : false
                                            });
                                        }
                                    });
                                    //startRange.val(time_start.toISOString().split('T')[0]);
                                    endRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        formatDate: "Y-d-m",
                                        formatTime: "HH:mm:ss",
                                        timepicker: false,
                                        onShow: function(ct) {
                                            this.setOptions({
                                                minDate: startRange.val() ? startRange.val() : false
                                            });
                                        }
                                    });
                                    break;
                                case "ogc_viewparams":
                                    startRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        yearStart: time_start.getFullYear(),
                                        yearEnd: time_end.getFullYear(),
                                        format: "Y-d-m",
                                        timepicker: false
                                    });
                                    break;
                            }
                            else if (dsd_component.primitiveType == "xsd:datetime") switch(strategy1){
                                case "ogc_filters":
                                    startRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        formatDate: "Y-d-m",
                                        formatTime: "HH:mm:ss",
                                        onShow: function(ct) {
                                            this.setOptions({
                                                maxDate: endRange.val() ? endRange.val() : false
                                            });
                                        }
                                    });
                                    //startRange.val(time_start.toISOString().replace('T', ' '));
                                    endRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        formatDate: "Y-d-m",
                                        formatTime: "HH:mm:ss",
                                        onShow: function(ct) {
                                            this.setOptions({
                                                minDate: startRange.val() ? startRange.val() : false
                                            });
                                        }
                                    });
                                    break;
                                case "ogc_viewparams":
                                    startRange.datetimepicker({
                                        minDate: time_start,
                                        maxDate: time_end,
                                        formatDate: "Y-d-m",
                                        formatTime: "HH:mm:ss"
                                    });
                            }
                        } else {
                            //html
                            /*$("#dsd-ui-col-1").append('<select id = "'+dsd_component_id+'" '
								+ (isMultiple? 'multiple="multiple"' : '')
								+ (isRequired? 'required' : '')
								+' class="dsd-ui-dimension dsd-ui-dimension-attribute" data-dimension-code="'+dsd_component.primitiveCode+'" title="'+this_.options.labels.filtering_on+' '+dsd_component.name+'">'+(isMultiple? '' : '<option></option>')+'</select>'
								+ (isRequired? '<span style="color:red;font-weight:bold;margin-left:2px;font-size:14px;">*</span>' : ''));
							
							//jquery widget
							var attributeItemSelection = function(item) {
							  if (!item.id) { return item.text; }
							  //TODO vocabulary stuff for countries
							  if(["flag", "flagstate", "country"].filter(function(el){return item.codelist.toLowerCase().match(el)}).length > 0){
								  var $item = $(
									'<img src="img/flags/' + item.id.toLowerCase() + '.gif" class="img-flag" />' +
									'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'
								  );
							  }else{
								  if(item.alternateText){
									  var $item = $(
										'<span class="dsd-ui-item-label" >' + 
											item.text + 
											' <span class="dsd-ui-item-code">['+item.id+']</span>' + 	
										'</span>'+
										'<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + '</span>' +
										(item.href? ' <a href="'+item.href+'" target="_blank" style="color:blue;">'+this_.options.labels.listedvalue_href_placeholder+'</a>' : '' )
									  );
								  }else{
									  var $item = $(
										'<span class="dsd-ui-item-label" >' + 
											item.text + 
											' <span class="dsd-ui-item-code">['+item.id+']</span>' + 
										'</span>' +
										(item.href? '<br><a href="'+item.href+'" target="_blank" style="color:blue;">'+this_.options.labels.listedvalue_href_placeholder+'</a>' : '' )
									  );
								  }
							  }
							  return $item;
							};
							var attributeItemResult = function(item) {
							  if (!item.id) { return item.text; }
							  //TODO vocabulary stuff for countries
							  if(["flag", "flagstate", "country"].filter(function(el){return item.codelist.toLowerCase().match(el)}).length > 0){
								  var $item = $(
									'<img src="img/flags/' + item.id.toLowerCase() + '.gif" class="img-flag" />' +
									'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'
								  );
							  }else{
								  if(item.alternateText){
									  var $item = $(
										'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'+
										'<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + '</span>'
									  );
								  }else{
									  var $item = $(
										'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'
									  );
								  }
							  }
							  return $item;
							};
							var dsd_component_placeholder = dsd_component.name;

							$("#" + dsd_component_id).select2({
								theme: 'classic',
								allowClear: true,
								placeholder: dsd_component_placeholder,
								data: dsd_component.values,
								templateResult: attributeItemResult,
								templateSelection: attributeItemSelection,
								matcher: attributeMatcher
							});*/ //slider when they are listed values
                            var values_min = new Date(dsd_component.minOccurs).getTime() / 1000;
                            var values_max = new Date(dsd_component.maxOccurs).getTime() / 1000;
                            //html
                            var dsd_component_id_range = dsd_component_id + "-range";
                            var dsd_component_id_slider = dsd_component_id + "-slider";
                            var dsd_component_slider_html = '<div id="' + dsd_component_id + '" class="dsd-ui-dimension dsd-ui-dimension-attribute dsd-ui-dimension-slider" data-dimension-code="' + dsd_component.primitiveCode + '">' + '<p><label for="' + dsd_component_id_range + '">' + dsd_component.name + ": </label>" + '<input type="text" id="' + dsd_component_id_range + '" readonly style="margin-left:5px; border:0; color:#f6931f; font-weight:bold;"></p>' + '<input id="' + dsd_component_id_slider + '" type="text" data-slider-min="' + values_min + '" data-slider-max="' + values_max + '" data-slider-value="' + (isMultiple ? "[" + values_min + ", " + values_max + "]" : values_max) + '"/>' + "</div>";
                            $("#dsd-ui-col-1").append(dsd_component_slider_html);
                            console.log("TIME");
                            console.log(dsd_component_id_slider);
                            //jquery widget
                            console.log(isMultiple);
                            $("#" + dsd_component_id_slider).bootstrapSlider({
                                range: isMultiple,
                                min: values_min,
                                max: values_max,
                                value: isMultiple ? [
                                    values_min,
                                    values_max
                                ] : values_max,
                                ticks: dsd_component.values.map(function(instant) {
                                    return new Date(instant.id).getTime() / 1000;
                                }),
                                lock_to_ticks: true
                            });
                            $("#" + dsd_component_id_slider).on("slide", function(event) {
                                console.log(event);
                                var value = event.value instanceof Array ? new Date(event.value[0] * 1000).toISOString() + " - " + new Date(event.value[1] * 1000).toISOString() : new Date(event.value * 1000).toISOString();
                                $("#" + event.target.id.split("-slider")[0] + "-range").val(value);
                            });
                            $("#" + dsd_component_id_slider).on("change", function(event) {
                                var evt_value = event.value.newValue;
                                var value = evt_value instanceof Array ? new Date(evt_value[0] * 1000).toISOString() + " - " + new Date(evt_value[1] * 1000).toISOString() : new Date(evt_value * 1000).toISOString();
                                $("#" + event.target.id.split("-slider")[0] + "-range").val(value);
                            });
                            var value = isMultiple ? new Date($("#" + dsd_component_id_slider).data("bootstrapSlider").getValue()[0] * 1000).toISOString() + " - " + new Date($("#" + dsd_component_id_slider).data("bootstrapSlider").getValue()[1] * 1000).toISOString() : new Date($("#" + dsd_component_id_slider).data("bootstrapSlider").getValue() * 1000).toISOString();
                            $("#" + dsd_component_id_range).val(value);
                        }
                    }
                }
            }
        }
        // Next follow UI for variables
        var variables = this_.dataset_on_query.dsd.filter(function(item) {
            if (item.columnType == "variable") return item;
        });
        //2. Build UI from VARIABLES filtering
        //-------------------------------------------
        /*if(variables.length > 0) {
				$("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.labels.variables+'</label></p></div>');
				$("#dsd-ui-col-1").append('<p><em>Coming Soon!</em></p>');
		}*/ //3. Build UI for THEMATIC MAPPING on Variables
        //---------------------------------------------	
        $("#dsd-ui-body").append('<div id="dsd-ui-col-2" class="' + bootstrapClass + '"></div>');
        if (this_.dataset_on_query.thematicmapping) {
            //VARIABLES handling as drop-down list
            //------------------------------------
            //variable matcher
            var variableMatcher = function(params, data) {
                params.term = params.term || "";
                if ($.trim(params.term) === "") return data;
                var term = params.term.toUpperCase();
                var altText = data.alternateText ? data.alternateText : "";
                if (data.text.toUpperCase().indexOf(term) > -1 | data.id.toUpperCase().indexOf(term) > -1 | altText.toUpperCase().indexOf(term) > -1) return data;
                return null;
            };
            //variableItem
            var variableItem = function(item, alternate) {
                if (!item.id) return item.text;
                if (alternate && item.alternateText) var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>" + '<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + "</span>");
                else var $item = $('<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">[' + item.id + "]</span>" + "</span>");
                return $item;
            };
            var variableItemSelection = function(item) {
                return variableItem(item, false);
            };
            var variableItemResult = function(item) {
                return variableItem(item, true);
            };
            $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant:petite-caps;font-size:110%;"><span class="glyphicon glyphicon-globe"></span><label style="margin-left:4px;">' + this_.options.labels.thematicmapping + '</label></p><hr style="margin:0px;"></div>');
            $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label style="font-weight:normal;">' + this_.options.labels.thematicmapping_variable + "</label></p></div>");
            //prepare dropdownlist items
            var variable_items = new Array();
            for(var i = 0; i < variables.length; i++){
                var dsd_variable = variables[i];
                variable_items.push({
                    id: dsd_variable.primitiveCode,
                    text: dsd_variable.name,
                    alternateText: dsd_variable.definition,
                    type: dsd_variable.primitiveType
                });
            }
            //init selector
            //id
            var dsd_variables_id = "dsd-ui-dimension-variable";
            //html
            $("#dsd-ui-col-2").append('<select id = "' + dsd_variables_id + '" class="dsd-ui-dimension dsd-ui-dimension-variable" title="' + this_.options.labels.thematicmapping_variable + '"><option></option></select>');
            $("#" + dsd_variables_id).select2({
                theme: "classic",
                allowClear: true,
                data: variable_items,
                templateResult: variableItemResult,
                templateSelection: variableItemSelection,
                matcher: variableMatcher,
                placeholder: this_.options.labels.thematicmapping_variable
            });
            //VARIABLES OPTIONS
            //------------------------------------
            $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label style="font-weight:normal;">' + this_.options.labels.thematicmapping_options + "</label></p></div>");
            var geomtype = this_.getGeometryType(this_.dataset_on_query.dsd);
            this_.handleQueryThematicMappingOptions(geomtype, 2);
        }
        //4. Build UI for styling options (if service capabilities available with dataset)
        //--------------------------------------------------------------------------------
        if (this_.dataset_on_query.capabilities) {
            $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant:petite-caps;font-size:110%;"><span class="glyphicon glyphicon-globe"></span><label style="margin-left:4px;">' + this_.options.labels.thematicmapping + '</label></p><hr style="margin:0px;"></div>');
            $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label style="font-weight:normal;">' + this_.options.labels.styling_options + "</label></p></div>");
            this_.handleQueryStylingOptions(2);
        }
        //query & map button
        this_.handleQueryAndMapButton(2);
        //query form buttons
        $("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;font-size:110%;"><span class="glyphicon glyphicon-download-alt"></span><label style="margin-left:4px;">' + this_.options.labels.download_options + '</label></p><hr style="margin:0px;"></div>');
        this_.handleQueryFormButtons(2);
        //ANALYTICS (if any dashboard associated to the dataset)
        if (this_.hasDashboards(this_.dataset_on_query)) this_.handleDashboardOptions(2);
    }
    /**
	 * handleDSDFromFeatureCatalogue
	 * @param {Object} dataset
	 * @param {Boolean} dsdOnly
	 */ handleDSDFromFeatureCatalogue(dataset, dsdOnly) {
        var deferred = $.Deferred();
        $("#dsd-loader").show();
        var this_ = this;
        var pid = dataset.pid;
        var lyr = dataset.lyr;
        var strategy1 = this.getStrategy(dataset);
        var entry = dataset.entry ? dataset.entry : dataset;
        $.ajax({
            url: dataset.dsd,
            contentType: "application/xml",
            type: "GET",
            success: function(response1) {
                //parse DSD
                var dsd = this_.parseFeatureCatalogue(response1);
                console.log(dsd);
                /*if(!dsd){
					console.warn("No feature catalogue available although referenced in metadata. Delegate to simple filter form");
					this_.handleFilter(dataset);
					$("#dsd-loader").hide();
					return;
				}*/ if (dsd.strategy) strategy1 = dsd.strategy; //Backward compatibility for datasets having their OFV strategy set-up in feature catalogues
                this_.dataset_on_query = {
                    pid: pid,
                    lyr: lyr,
                    entry: entry,
                    strategy: strategy1,
                    dsd: dsd.components,
                    query: null,
                    thematicmapping: dsd.components.filter(function(item) {
                        if (item.columnType == "variable") return item;
                    }).length > 0,
                    point_vectorizing: this_.options.map.point_vectorizing && dsd.components.filter(function(item) {
                        if (item.primitiveType == "gml:PointPropertyType") return item;
                    }).length > 0,
                    point_clustering: this_.options.map.point_vectorizing && this_.options.map.point_clustering && dsd.components.filter(function(item) {
                        if (item.primitiveType == "gml:PointPropertyType") return item;
                    }).length > 0
                };
                if (this_.dataset_on_query.point_vectorizing) this_.dataset_on_query.thematicmapping = false;
                if (this_.dataset_on_query.point_clustering) this_.dataset_on_query.thematicmapping = false;
                //query service capabilities
                console.log(this_.getDatasetServiceCouplingType(this_.dataset_on_query));
                if (this_.getDatasetServiceCouplingType(this_.dataset_on_query) == "tight") this_.handleDatasetServiceCapabilities(this_.dataset_on_query).then(function(capabilities) {
                    console.log(strategy1);
                    if (strategy1 == "ogc_dimensions") {
                        this_.dataset_on_query.capabilities = capabilities;
                        var ogc_dsd = this_.parseLayerDescription(this_.dataset_on_query, entry.wms[0].name);
                        console.log(ogc_dsd);
                        this_.dataset_on_query.dsd = ogc_dsd.components;
                    }
                    //build UI
                    $("#dsd-loader").hide();
                    if (!dsdOnly) this_.handleDSDUserInterface(this_.dataset_on_query);
                    deferred.resolve(this_.dataset_on_query);
                });
                else {
                    $("#dsd-loader").hide();
                    if (!dsdOnly) this_.handleDSDUserInterface(this_.dataset_on_query);
                    deferred.resolve(this_.dataset_on_query);
                }
            }
        });
        return deferred.promise();
    }
    /**
	 * handleDSDFromCoverageDescription
	 * @param {Object} dataset
	 * @param {Boolean} dsdOnly	 
	 */ handleDSDFromCoverageDescription(dataset, dsdOnly) {
        var deferred = $.Deferred();
        $("#dsd-loader").show();
        var this_ = this;
        var pid = dataset.pid;
        var lyr = dataset.lyr;
        var entry = dataset.entry ? dataset.entry : dataset;
        var strategy1 = this.getStrategy(dataset);
        var dsd = this_.parseCoverageDescription(dataset);
        console.log(dsd);
        /*if(!dsd){
			console.warn("No coverage description available. Delegate to simple filter form");
			this_.handleFilter(dataset);
			$("#dsd-loader").hide();
			return;
		}*/ if (dsd.strategy) strategy1 = dsd.strategy;
        this_.dataset_on_query = {
            pid: pid,
            lyr: lyr,
            entry: entry,
            strategy: strategy1,
            dsd: dsd.components ? dsd.components : null,
            query: null,
            thematicmapping: false,
            point_vectorizing: false,
            point_clustering: false
        };
        //query service capabilities
        console.log(this_.getDatasetServiceCouplingType(this_.dataset_on_query));
        if (this_.getDatasetServiceCouplingType(this_.dataset_on_query) == "tight") this_.handleDatasetServiceCapabilities(this_.dataset_on_query).then(function(capabilities) {
            console.log(strategy1);
            if (strategy1 == "ogc_dimensions") {
                this_.dataset_on_query.capabilities = capabilities;
                var ogc_dsd = this_.parseLayerDescription(this_.dataset_on_query, entry.wms[0].name);
                console.log(ogc_dsd);
                this_.dataset_on_query.dsd = ogc_dsd.components;
            }
            //build UI
            $("#dsd-loader").hide();
            if (!dsdOnly) this_.handleDSDUserInterface(this_.dataset_on_query);
            deferred.resolve(this_.dataset_on_query);
        });
        else {
            $("#dsd-loader").hide();
            if (!dsdOnly) this_.handleDSDUserInterface(this_.dataset_on_query);
            deferred.resolve(this_.dataset_on_query);
        }
        return deferred.promise();
    }
    /**
	 * stringifyStrategyParams
	 * @param {Object} dataset
	 * @param {Object} strategyparams
	 */ stringifyStrategyParams(dataset, strategyparams) {
        var strategyparams_str = null;
        switch(dataset.strategy){
            case "ogc_filters":
                if (dataset.dsd) {
                    console.log("Stringify 'ogc_filters' strategy params - with DSD");
                    console.log(strategyparams);
                    if (strategyparams) strategyparams_str = strategyparams.map(function(item) {
                        var fieldname = Object.keys(item);
                        var item_component = item[fieldname];
                        var item_values = item_component.content;
                        var filter = null;
                        switch(item_component.type){
                            case "list":
                                if (!(item_values instanceof Array)) item_values = [
                                    item_values
                                ];
                                var item_values_str = item_values.map(function(item) {
                                    return encodeURIComponent(item);
                                }).join(",");
                                filter = "(" + fieldname + " IN(" + item_values_str + "))";
                                break;
                            case "range":
                                if (!(item_values instanceof Array)) item_values = [
                                    item_values
                                ];
                                var item_values_str = item_values.map(function(item) {
                                    return encodeURIComponent(item);
                                }).join(",");
                                filter = "(" + fieldname + " IN(" + item_values_str + "))";
                                break;
                            case "timeperiod":
                                filter = "(" + fieldname + " AFTER " + item_values[0] + " AND " + fieldname + " BEFORE " + item_values[1] + ")";
                                break;
                        }
                        return filter;
                    }).join(" AND ");
                } else {
                    console.log("Stringify 'ogc_filters' strategy params - with Filter");
                    if (strategyparams) strategyparams_str = strategyparams.map(function(item) {
                        return Object.keys(item) + ":" + item[Object.keys(item)];
                    }).join(";");
                }
                break;
            case "ogc_dimensions":
                console.info("No strategy params stringify implementation for strategy 'ogc_dimensions': TIME/ELEVATION managed directly through strategy params");
                break;
            case "ogc_viewparams":
                console.log("Stringify 'ogc_viewparams' strategy params");
                console.log(strategyparams);
                if (strategyparams) strategyparams_str = strategyparams.map(function(item) {
                    var fieldname = Object.keys(item);
                    var item_component = item[fieldname];
                    var item_values = item_component.content;
                    var viewparam = null;
                    switch(item_component.type){
                        case "list":
                            if (!(item_values instanceof Array)) item_values = [
                                item_values
                            ];
                            viewparam = Object.keys(item) + ":" + item_values.join("+");
                            break;
                        case "range":
                            if (!(item_values instanceof Array)) item_values = [
                                item_values
                            ];
                            viewparam = Object.keys(item) + ":" + item_values.join("+");
                            break;
                        case "timeinstant":
                            viewparam = fieldname + ":" + item_values[0];
                            break;
                    }
                    return viewparam;
                }).join(";");
                break;
        }
        return strategyparams_str;
    }
    /**
	 * getStrategyLayer
	 */ getStrategyLayer() {
        return $("#ui-ogc_layer").val();
    }
    /**
	 * getStrategyParams
	 * @param {Object} dataset
	 * @param {Boolean} stringify
	 */ getStrategyParams(dataset, stringify) {
        //TODO refactor getStrategyParams? Apart from the case of ogc_filters without dsd, all cases seems the same business logic code
        // (Common User interface to query the data, whatever the strategy considered = objective of OFV)
        var this_ = this;
        var data_query = new Array();
        console.log("Getting '" + dataset.strategy + "' strategy params for dataset '" + dataset.pid + "'");
        switch(dataset.strategy){
            case "ogc_filters":
                //Get params according to 'filters' strategy
                //2 cases: simple filter vs. featurecatalogue
                if (dataset.dsd) {
                    $.each($(".dsd-ui-dimension-attribute"), function(i, item) {
                        var clazz = $("#" + item.id).attr("class");
                        var dim = dataset.dsd.filter(function(comp) {
                            if (comp.primitiveCode == $("#" + item.id).data().dimensionCode) return comp;
                        })[0];
                        var widget = null;
                        if (clazz.indexOf("select2") > 0) widget = "select2";
                        if (clazz.indexOf("slider") > 0) widget = "slider";
                        var type = null;
                        var values = null;
                        switch(widget){
                            case "select2":
                                type = "list";
                                values = $("#" + item.id).val();
                                break;
                            case "slider":
                                type = "range";
                                var slide = $("#" + item.id + "-slider");
                                var slide_data = slide.data("bootstrapSlider").getValue();
                                if (slide_data instanceof Array) {
                                    //multiple values
                                    var min = slide_data[0];
                                    var max = slide_data[1];
                                    if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = Array.apply(null, {
                                        length: max + 1 - min
                                    }).map(function(_, idx) {
                                        return idx + min;
                                    });
                                    else if (dim.primitiveType == "xsd:datetime") {
                                        var instants = dim.values.map(function(item) {
                                            return item.id;
                                        });
                                        //TODO manage period/list of dates 
                                        values = [
                                            new Date(min * 1000).toISOString(),
                                            new Date(max * 1000).toISOString()
                                        ];
                                    }
                                } else {
                                    //single value
                                    var value = slide_data;
                                    if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = [
                                        value
                                    ];
                                    else if (dim.primitiveType == "xsd:datetime") values = [
                                        new Date(value * 1000).toISOString()
                                    ];
                                }
                                break;
                        }
                        if (values) {
                            if (values.length > 0) {
                                var data_component_query = new Object();
                                var attribute = item.id.split("dsd-ui-dimension-attribute-")[1];
                                var attributeDef = dataset.dsd.filter(function(component) {
                                    if (component.primitiveCode == attribute) return component;
                                })[0];
                                if (attributeDef.primitiveType == "xsd:string") {
                                    if (values instanceof Array) values = values.map(function(item) {
                                        return "'" + item.replace(/[\']/g, "''") + "'";
                                    });
                                    else values = "'" + values.replace(/[\']/g, "''") + "'";
                                }
                                data_component_query[attribute] = {
                                    type: type,
                                    content: values
                                };
                                data_query.push(data_component_query);
                            }
                        }
                    });
                    $.each($(".dsd-ui-dimension-time"), function(i, item) {
                        var inputs = $(item).find("input");
                        var val_start = $(inputs[0]).val();
                        var val_end = $(inputs[1]).val();
                        if (val_start != "" && val_end != "") {
                            var attribute = inputs[0].id.split("dsd-ui-dimension-time-start-")[1];
                            var attributeDef = dataset.dsd.filter(function(component) {
                                if (component.primitiveCode == attribute) return component;
                            })[0];
                            var date_start = new Date(Date.parse(val_start + (attributeDef.primitiveType == "xsd:datetime" ? "Z" : "")));
                            var date_end = new Date(Date.parse(val_end + (attributeDef.primitiveType == "xsd:datetime" ? "Z" : "")));
                            var data_component_query = new Object();
                            data_component_query[attribute] = {
                                type: "timeperiod",
                                content: [
                                    date_start.toISOString().split(attributeDef.primitiveType == "xsd:datetime" ? ".000Z" : "T")[0],
                                    date_end.toISOString().split(attributeDef.primitiveType == "xsd:datetime" ? ".000Z" : "T")[0]
                                ]
                            };
                            data_query.push(data_component_query);
                        }
                    });
                } else {
                    var filter = $("#ui-ogc_filter").val();
                    if (filter) data_query.push({
                        CQL_FILTER: filter
                    });
                }
                break;
            case "ogc_dimensions":
                //Get params according to 'dimensions' strategy
                $.each($(".dsd-ui-dimension-attribute"), function(i, item) {
                    var clazz = $("#" + item.id).attr("class");
                    var dim = dataset.dsd.filter(function(comp) {
                        if (comp.primitiveCode == $("#" + item.id).data().dimensionCode) return comp;
                    })[0];
                    var widget = null;
                    if (clazz.indexOf("select2") > 0) widget = "select2";
                    if (clazz.indexOf("slider") > 0) widget = "slider";
                    var type = null;
                    var values = null;
                    switch(widget){
                        case "select2":
                            type = "list";
                            values = $("#" + item.id).val();
                            break;
                        case "slider":
                            type = "range";
                            var slide = $("#" + item.id + "-slider");
                            var slide_data = slide.data("bootstrapSlider").getValue();
                            if (slide_data instanceof Array) {
                                //multiple values
                                var min = slide_data[0];
                                var max = slide_data[1];
                                if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = Array.apply(null, {
                                    length: max + 1 - min
                                }).map(function(_, idx) {
                                    return idx + min;
                                });
                                else if (dim.primitiveType == "xsd:datetime") {
                                    var instants = dim.values.map(function(item) {
                                        return item.id;
                                    });
                                    //TODO manage period/list of dates 
                                    values = [
                                        new Date(min * 1000).toISOString(),
                                        new Date(max * 1000).toISOString()
                                    ];
                                }
                            } else {
                                //single value
                                var value = slide_data;
                                if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = [
                                    value
                                ];
                                else if (dim.primitiveType == "xsd:datetime") values = [
                                    new Date(value * 1000).toISOString()
                                ];
                            }
                            break;
                    }
                    if (values) {
                        if (values.length > 0) {
                            var data_component_query = new Object();
                            var attribute = item.id.split("dsd-ui-dimension-attribute-")[1];
                            data_component_query[attribute] = {
                                type: type,
                                content: values
                            };
                            data_query.push(data_component_query);
                        }
                    }
                });
                if ($(".dsd-ui-dimension-time").length > 0) $.each($(".dsd-ui-dimension-time"), function(i, item) {
                    var inputs = $(item).find("input");
                    var val_start = $(inputs[0]).val();
                    if (val_start != "") {
                        var attribute = inputs[0].id.split("dsd-ui-dimension-time-start-")[1];
                        var attributeDef = dataset.dsd.filter(function(component) {
                            if (component.primitiveCode == attribute) return component;
                        })[0];
                        var date_start = new Date(Date.parse(val_start + (attributeDef.primitiveType == "xsd:datetime" ? "Z" : "")));
                        var data_component_query = new Object();
                        data_component_query[attribute] = {
                            type: "timeinstant",
                            content: [
                                date_start.toISOString().split(attributeDef.primitiveType == "xsd:datetime" ? ".000Z" : "T")[0]
                            ]
                        };
                        data_query.push(data_component_query);
                    }
                });
                break;
            case "ogc_viewparams":
                //Get params according to 'viewparams' strategy
                //grab codelist values (including extra time codelists)
                $.each($(".dsd-ui-dimension-attribute"), function(i, item) {
                    var clazz = $("#" + item.id).attr("class");
                    var dim = dataset.dsd.filter(function(comp) {
                        if (comp.primitiveCode == $("#" + item.id).data().dimensionCode) return comp;
                    })[0];
                    var widget = null;
                    if (clazz.indexOf("select2") > 0) widget = "select2";
                    if (clazz.indexOf("slider") > 0) widget = "slider";
                    var type = null;
                    var values = null;
                    switch(widget){
                        case "select2":
                            type = "list";
                            values = $("#" + item.id).val();
                            break;
                        case "slider":
                            type = "range";
                            var slide = $("#" + item.id + "-slider");
                            var slide_data = slide.data("bootstrapSlider").getValue();
                            if (slide_data instanceof Array) {
                                //multiple values
                                var min = slide_data[0];
                                var max = slide_data[1];
                                if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = Array.apply(null, {
                                    length: max + 1 - min
                                }).map(function(_, idx) {
                                    return idx + min;
                                });
                                else if (dim.primitiveType == "xsd:datetime") {
                                    var instants = dim.values.map(function(item) {
                                        return item.id;
                                    });
                                    //TODO manage period/list of dates 
                                    values = [
                                        new Date(min * 1000).toISOString(),
                                        new Date(max * 1000).toISOString()
                                    ];
                                }
                            } else {
                                //single value
                                var value = slide_data;
                                if (dim.primitiveType == "xsd:decimal" || dim.primitiveType == "xsd:int") values = [
                                    value
                                ];
                                else if (dim.primitiveType == "xsd:datetime") values = [
                                    new Date(value * 1000).toISOString()
                                ];
                            }
                            break;
                    }
                    if (values) {
                        if (values.length > 0) {
                            var data_component_query = new Object();
                            var attribute = item.id.split("dsd-ui-dimension-attribute-")[1];
                            data_component_query[attribute] = {
                                type: type,
                                content: values
                            };
                            data_query.push(data_component_query);
                        }
                    }
                });
                if ($(".dsd-ui-dimension-time").length > 0) $.each($(".dsd-ui-dimension-time"), function(i, item) {
                    var inputs = $(item).find("input");
                    var val_start = $(inputs[0]).val();
                    if (val_start != "") {
                        var attribute = inputs[0].id.split("dsd-ui-dimension-time-start-")[1];
                        var attributeDef = dataset.dsd.filter(function(component) {
                            if (component.primitiveCode == attribute) return component;
                        })[0];
                        var date_start = new Date(Date.parse(val_start + (attributeDef.primitiveType == "xsd:datetime" ? "Z" : "")));
                        var data_component_query = new Object();
                        data_component_query[attribute] = {
                            type: "timeinstant",
                            content: [
                                date_start.toISOString().split(attributeDef.primitiveType == "xsd:datetime" ? ".000Z" : "T")[0]
                            ]
                        };
                        data_query.push(data_component_query);
                    }
                });
                break;
        }
        if (stringify) data_query = this_.stringifyStrategyParams(dataset, data_query);
        return data_query;
    }
    /**
	 * OgetStrategyVariable
	 */ getStrategyVariable() {
        var variable = $("#dsd-ui-dimension-variable").val();
        if (variable == "") variable = null;
        return variable;
    }
    /**
	 * OpenFairViewer.prototype.mapDatasetView
	 * @param dataset
	 * @param from_query_form
	 */ mapDatasetView(dataset, from_query_form) {
        var this_ = this;
        var opacity = this_.options.map.layer_options.opacity;
        var tiled = this_.options.map.layer_options.tiled;
        var pid = dataset.pid;
        $("#datasetMapper").prop("disabled", true);
        $("#datasetMapper").bootstrapBtn("loading");
        $(".query-nodata").hide();
        //layer properties
        var baseWfsUrl = undefined;
        var baseWmsUrl = undefined;
        var layerName = undefined;
        var layerDescription = undefined;
        var wfsVersion = undefined;
        var wmsVersion = undefined;
        if (dataset.entry.wfs.length > 0) {
            var baseWFS = dataset.entry.wfs;
            if (baseWFS.length > 0) baseWFS = dataset.entry.wfs[0];
            if (this.secure) baseWFS.url = baseWFS.url.replace("http://", "https://");
            baseWfsUrl = baseWFS.url;
            wfsVersion = baseWFS.version;
        }
        if (dataset.entry.wms.length > 0) {
            //var baseWMS = dataset.entry.wms;
            //if(baseWMS.length>0){ baseWMS = dataset.entry.wms[0] };
            var layerid = undefined;
            if (from_query_form) var layerid = this_.getStrategyLayer();
            else var layerid = dataset.lyr ? dataset.lyr : dataset.entry.wms[0].name;
            var baseWMS = dataset.entry.wms.filter(function(item) {
                return item.name == layerid;
            })[0];
            console.log(baseWMS);
            baseWmsUrl = baseWMS.url;
            layerName = baseWMS.name;
            layerDescription = baseWMS.description;
            wmsVersion = baseWMS.version;
            console.log("Selection of layer '" + layerName + "'");
        }
        //layerid
        var lyr = layerName;
        console.log(lyr);
        //var layer = this_.getLayerByProperty(dataset.entry.pid, 'id');
        var layer = this_.getLayerByProperty(lyr, "id");
        var strategyparams = from_query_form ? this_.getStrategyParams(dataset, false) : dataset.queryparams;
        console.log(strategyparams);
        var strategyparams_str = from_query_form ? this_.getStrategyParams(dataset, true) : this_.stringifyStrategyParams(dataset, dataset.queryparams);
        console.log("Strategy params = " + strategyparams_str);
        var strategyvariable = from_query_form ? this_.getStrategyVariable(dataset) : dataset.variable;
        console.log("Strategy variable = " + strategyvariable);
        var layerTitle = this_.getDatasetViewTitle(dataset, strategyparams, from_query_form);
        var shortTitle = dataset.entry.title;
        //thematic mapping properties
        var mapType = from_query_form ? $("#map-type-selector").select2("val") : dataset.envmaptype;
        var classType = from_query_form ? $("#map-classtype-selector").select2("val") : dataset.envfun;
        var colorScheme = from_query_form ? $("#map-colorscheme-selector").select2("val") : dataset.envcolscheme;
        var classNb = from_query_form ? $("#map-classnb-selector").select2("val") : dataset.envparams ? dataset.envparams.split(";").filter(function(item) {
            if (item != "" && item.startsWith("v")) return item;
        }).length - 2 : null;
        var layerStyle = from_query_form ? $("#map-style-selector").select2("val") ? $("#map-style-selector").select2("val") : this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
        var geom = from_query_form ? this_.getGeometryColumn(dataset.dsd) : dataset.geom;
        var geomtype = from_query_form ? this_.getGeometryType(dataset.dsd) : dataset.geomtype;
        console.log("Geometry information: " + geom + " [" + geomtype + "]");
        if (!layer) {
            console.log("Adding new layer");
            //ADD LAYER
            //////////////////////////////////////////////////////////////////////////////////////////
            switch(dataset.strategy){
                case "ogc_filters":
                    if (dataset.dsd) {
                        if (dataset.thematicmapping && typeof strategyvariable != "undefined") {
                            console.log("Add vector layer with strategy 'ogc_filters' based on Feature Catalogue");
                            //thematic mapping
                            this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, this_.options.map.thematicmapping_options.thresholding && strategyvariable ? strategyvariable + this_.options.map.thematicmapping_options.threshold : null, strategyvariable ? [
                                strategyvariable
                            ] : null).then(function(features) {
                                console.log("Data series with " + features.length + " features");
                                var values = undefined;
                                var breaks = undefined;
                                var envparams = undefined;
                                var colors = [];
                                if (strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
                                if (values) {
                                    if (values.length > 0) {
                                        if (values.length < classNb) {
                                            classNb = values.length;
                                            layerStyle = from_query_form ? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
                                        }
                                        breaks = this_.calculateBreaks(values, classType, classNb);
                                        if (breaks.length == 1) breaks = [
                                            0,
                                            breaks[0]
                                        ];
                                        if (breaks.length == 2) breaks[0] = 0;
                                        if (colorScheme) {
                                            colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][classNb];
                                            if (classNb < 3) colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][3].slice(0, classNb);
                                        }
                                        envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colors);
                                    }
                                }
                                this_.selectDatasetView(dataset, lyr);
                                var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, strategyparams == null ? null : decodeURIComponent(strategyparams_str), layerStyle, null, null, null, classType, envparams, values ? values.length : null);
                                layer.strategy = dataset.strategy;
                                layer.dsd = dataset.dsd;
                                layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                                layer.variable = strategyvariable;
                                layer.envfun = classType;
                                layer.envmaptype = mapType;
                                layer.envcolscheme = colorScheme;
                                layer.count = values ? values.length : null;
                                layer.params = layer.getSource().getParams();
                                layer.geom = geom;
                                layer.geomtype = geomtype;
                                this_.registerFeatureInfoLayer(layer);
                                this_.setLegendGraphic(layer, breaks, colors);
                                this_.map.changed();
                                this_.renderMapLegend();
                                this_.showLegendPanel();
                                $("#datasetMapper").bootstrapBtn("reset");
                                $("#datasetMapper").prop("disabled", false);
                                //actions o download buttons
                                this_.enableQueryFormButtons();
                                $("#dsd-ui-export-options").show();
                                //action on dashboard options
                                this_.enableDashboardOptions();
                                //action on no data
                                if (values) {
                                    if (values.length == 0) {
                                        console.log("Actions on no data");
                                        $("#datasetMapper").bootstrapBtn("reset");
                                        $("#datasetMapper").prop("disabled", false);
                                        $(".query-nodata").show();
                                        //actions o download buttons
                                        this_.disableQueryFormButtons();
                                        $("#dsd-ui-export-options").hide();
                                        this_.disableDashboardOptions();
                                    }
                                }
                            });
                        } else if (dataset.point_vectorizing) {
                            console.log("Add vector layer with strategy 'ogc_filters' (vector rendering)");
                            this_.selectDatasetView(dataset, lyr);
                            var projection = this_.map.getView().getProjection().getCode();
                            var layer = undefined;
                            this_.addWFSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams == null ? null : decodeURIComponent(strategyparams_str), null, projection, dataset.point_clustering).then(function(response1) {
                                layer = response1;
                                layer.strategy = dataset.strategy;
                                layer.dsd = dataset.dsd;
                                layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                                this_.addVectorLayerPopup(layer);
                                layer.variable = null;
                                layer.envfun = null;
                                layer.envmaptype = null;
                                layer.envcolscheme = null;
                                layer.count = null;
                                layer.params = {
                                    CQL_FILTER: strategyparams == null ? null : decodeURIComponent(strategyparams_str)
                                };
                                layer.geom = geom;
                                layer.geomtype = geomtype;
                                this_.setLegendGraphic(layer);
                                //this_.map.changed();
                                this_.renderMapLegend();
                                $("#datasetMapper").bootstrapBtn("reset");
                                $("#datasetMapper").prop("disabled", false);
                                //actions o download buttons
                                this_.enableQueryFormButtons();
                                $("#dsd-ui-export-options").show();
                                //action on dashboard options
                                this_.enableDashboardOptions();
                            });
                        } else {
                            //static styling
                            console.log("Add " + dataset.entry.dataModel + " layer with strategy 'ogc_filters' (static styling)");
                            this_.selectDatasetView(dataset, lyr);
                            var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, strategyparams == null ? null : decodeURIComponent(strategyparams_str), layerStyle);
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            this_.registerFeatureInfoLayer(layer);
                            layer.variable = null;
                            layer.envfun = null;
                            layer.envmaptype = null;
                            layer.envcolscheme = null;
                            layer.count = null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.registerFeatureInfoLayer(layer);
                            this_.setLegendGraphic(layer);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                        }
                    } else {
                        console.log("Add " + dataset.entry.dataModel + " layer with strategy 'ogc_filters' with simple CQL filter");
                        var cql_filter = null;
                        if (strategyparams) {
                            if (strategyparams.length > 0) cql_filter = strategyparams[0].CQL_FILTER;
                        }
                        this_.selectDatasetView(dataset, lyr);
                        var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, cql_filter, layerStyle);
                        layer.strategy = dataset.strategy;
                        layer.dsd = false;
                        layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                        layer.variable = null;
                        layer.envfun = null;
                        layer.envmaptype = null;
                        layer.envcolscheme = null;
                        layer.count = null;
                        layer.params = layer.getSource().getParams();
                        this_.registerFeatureInfoLayer(layer);
                        this_.setLegendGraphic(layer);
                        this_.map.changed();
                        this_.renderMapLegend();
                        this_.showLegendPanel();
                        $("#datasetMapper").bootstrapBtn("reset");
                        $("#datasetMapper").prop("disabled", false);
                        //actions o download buttons
                        this_.enableQueryFormButtons();
                        $("#dsd-ui-export-options").show();
                        //action on dashboard options
                        this_.enableDashboardOptions();
                    }
                    break;
                case "ogc_dimensions":
                    //The strategy 'ogc_dimensions' may target vector or grid datasets
                    //ogc dimensions
                    //TIME
                    var ogc_time_dimension = null;
                    var time_dimension = strategyparams.filter(function(item) {
                        if (Object.keys(item) == "TIME") return item;
                    });
                    if (time_dimension.length > 0) ogc_time_dimension = time_dimension[0].TIME.content[0];
                    var ogc_elevation_dimension = null;
                    var elevation_dimension = strategyparams.filter(function(item) {
                        if (Object.keys(item) == "ELEVATION") return item;
                    });
                    if (elevation_dimension.length > 0) ogc_elevation_dimension = elevation_dimension[0].ELEVATION.content[0];
                    switch(dataset.entry.dataModel){
                        case "vector":
                            //TODO manage case dynamic (getDatasetFeatures) / static
                            if (dataset.thematicmapping && strategyvariable) console.warn("Add vector layer with strategy 'ogc_dimensions' (thematic mapping) - NOT YET IMPLEMENTED");
                            else if (dataset.point_vectorizing) console.warn("Add vector layer with strategy 'ogc_dimensions' (vector rendering) - NOT YET IMPLEMENTED");
                            else console.warn("Add vector layer with strategy 'ogc_dimensions' (static styling) - NOT YET IMPLEMENTED");
                            break;
                        case "grid":
                            console.log("Add grid layer with strategy 'ogc_dimensions' (static styling)");
                            //static styling
                            this_.selectDatasetView(dataset, lyr);
                            var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, null, layerStyle, null, ogc_time_dimension, ogc_elevation_dimension);
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.variable = null;
                            layer.envfun = null;
                            layer.envmaptype = null;
                            layer.envcolscheme = null;
                            layer.count = null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.registerFeatureInfoLayer(layer);
                            this_.setLegendGraphic(layer);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                            break;
                    }
                    break;
                case "ogc_viewparams":
                    //The strategy 'ogc_viewparams' will always point to vector/feature datasets
                    if (dataset.thematicmapping && strategyvariable) {
                        console.log("Add vector layer with strategy 'ogc_viewparams' (thematic mapping)");
                        //thematic mapping
                        this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, this_.options.map.thematicmapping_options.thresholding && strategyvariable ? strategyvariable + this_.options.map.thematicmapping_options.threshold : null, strategyvariable ? [
                            strategyvariable
                        ] : null).then(function(features) {
                            console.log("Data series features");
                            console.log(features);
                            console.log("Data series values");
                            var values = undefined;
                            var breaks = undefined;
                            var envparams = undefined;
                            var colors = [];
                            if (strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
                            if (values) {
                                if (values.length > 0) {
                                    if (values.length < classNb) {
                                        classNb = values.length;
                                        layerStyle = from_query_form ? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
                                    }
                                    var breaks = this_.calculateBreaks(values, classType, classNb);
                                    if (breaks.length == 1) breaks = [
                                        0,
                                        breaks[0]
                                    ];
                                    if (breaks.length == 2) breaks[0] = 0;
                                    if (colorScheme) {
                                        colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][classNb];
                                        if (classNb < 3) colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][3].slice(0, classNb);
                                    }
                                    envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colors);
                                }
                            }
                            this_.selectDatasetView(dataset, lyr);
                            var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, null, layerStyle, strategyparams_str, null, null, classType, envparams, values ? values.length : 0);
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.variable = strategyvariable;
                            layer.envfun = classType;
                            layer.envmaptype = mapType;
                            layer.envcolscheme = colorScheme;
                            layer.count = values ? values.length : null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.registerFeatureInfoLayer(layer);
                            this_.setLegendGraphic(layer, breaks, colors);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                            //action on no data
                            if (values) {
                                if (values.length == 0) {
                                    console.log("Actions on no data");
                                    $("#datasetMapper").bootstrapBtn("reset");
                                    $("#datasetMapper").prop("disabled", false);
                                    $(".query-nodata").show();
                                    //actions o download buttons
                                    this_.disableQueryFormButtons();
                                    $("#dsd-ui-export-options").hide();
                                    this_.disableDashboardOptions();
                                }
                            }
                        });
                    } else if (dataset.point_vectorizing) {
                        console.log("Add vector layer with strategy 'ogc_viewparams' (vector rendering)");
                        this_.selectDatasetView(dataset, lyr);
                        var projection = this_.map.getView().getProjection().getCode();
                        var layer = undefined;
                        this_.addWFSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, baseWfsUrl, wfsVersion, layerName, strategyparams_str, null, projection, dataset.point_clustering).then(function(layer) {
                            layer = response;
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            this_.addVectorLayerPopup(layer);
                            layer.variable = null;
                            layer.envfun = null;
                            layer.envmaptype = null;
                            layer.envcolscheme = null;
                            layer.count = null;
                            layer.params = {
                                "VIEWPARAMS": strategyparams_str
                            };
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.setLegendGraphic(layer);
                            //this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                        });
                    } else {
                        console.log("Add vector layer with strategy 'ogc_viewparams' (static styling)");
                        //static styling
                        this_.selectDatasetView(dataset, lyr);
                        var layer = this_.addWMSLayer(this_.options.map.mainlayergroup, pid, lyr, layerTitle, shortTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, opacity, tiled, null, null, strategyparams_str);
                        layer.strategy = dataset.strategy;
                        layer.dsd = dataset.dsd;
                        layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                        this_.registerFeatureInfoLayer(layer);
                        layer.variable = null;
                        layer.envfun = null;
                        layer.envmaptype = null;
                        layer.envcolscheme = null;
                        layer.count = null;
                        layer.params = layer.getSource().getParams();
                        layer.geom = geom;
                        layer.geomtype = geomtype;
                        this_.registerFeatureInfoLayer(layer);
                        this_.setLegendGraphic(layer);
                        this_.map.changed();
                        this_.renderMapLegend();
                        this_.showLegendPanel();
                        $("#datasetMapper").bootstrapBtn("reset");
                        $("#datasetMapper").prop("disabled", false);
                        //actions o download buttons
                        this_.enableQueryFormButtons();
                        $("#dsd-ui-export-options").show();
                        //action on dashboard options
                        this_.enableDashboardOptions();
                    }
                    break;
            }
        } else {
            console.log("Updating existing layer");
            //UPDATE LAYER
            //////////////////////////////////////////////////////////////////////////////////////////
            switch(dataset.strategy){
                case "ogc_filters":
                    if (dataset.dsd) {
                        if (dataset.thematicmapping && strategyvariable) {
                            console.log("Update " + dataset.entry.dataModel + " layer with strategy 'ogc_filters' based on Feature Catalogue (thematic mapping)");
                            //thematic mapping
                            this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams == null ? null : decodeURIComponent(strategyparams_str), this_.options.map.thematicmapping_options.thresholding && strategyvariable ? strategyvariable + this_.options.map.thematicmapping_options.threshold : null, strategyvariable ? [
                                strategyvariable
                            ] : null).then(function(features) {
                                console.log("Data series features");
                                console.log(features);
                                console.log("Data series values");
                                var values = undefined;
                                var breaks = undefined;
                                var envparams = undefined;
                                var colors = [];
                                if (strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
                                if (values) {
                                    if (values.length > 0) {
                                        if (values.length < classNb) {
                                            classNb = values.length;
                                            layerStyle = from_query_form ? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
                                        }
                                        //update breaks
                                        var breaks = this_.calculateBreaks(values, classType, classNb);
                                        if (breaks.length == 1) breaks = [
                                            0,
                                            breaks[0]
                                        ];
                                        if (breaks.length == 2) breaks[0] = 0;
                                        if (colorScheme) {
                                            colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][classNb];
                                            if (classNb < 3) colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][3].slice(0, classNb);
                                        }
                                        envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colors);
                                    }
                                }
                                //update viewparams, envparams & legend
                                layer.strategy = dataset.strategy;
                                layer.dsd = dataset.dsd;
                                layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                                layer.setProperties({
                                    title: layerTitle
                                });
                                if (strategyparams_str != "") layer.getSource().updateParams({
                                    "CQL_FILTER": strategyparams == null ? null : decodeURIComponent(strategyparams_str)
                                });
                                else layer.getSource().updateParams({
                                    "CQL_FILTER": "INCLUDE"
                                });
                                layer.getSource().updateParams({
                                    "STYLES": layerStyle
                                });
                                if (envparams) layer.getSource().updateParams({
                                    "env": envparams
                                });
                                layer.variable = strategyvariable;
                                layer.envfun = classType;
                                layer.envmaptype = mapType;
                                layer.envcolscheme = colorScheme;
                                layer.count = values ? values.length : null;
                                layer.params = layer.getSource().getParams();
                                layer.geom = geom;
                                layer.geomtype = geomtype;
                                this_.setLegendGraphic(layer, breaks, colors);
                                this_.map.changed();
                                this_.renderMapLegend();
                                this_.showLegendPanel();
                                $("#datasetMapper").bootstrapBtn("reset");
                                $("#datasetMapper").prop("disabled", false);
                                //actions o download buttons
                                this_.enableQueryFormButtons();
                                $("#dsd-ui-export-options").show();
                                //action on dashboard options
                                this_.enableDashboardOptions();
                                //action on no data
                                if (values) {
                                    if (values.length == 0) {
                                        this_.removeLayerByProperty(pid, "id");
                                        this_.map.changed();
                                        this_.renderMapLegend();
                                        this_.showLegendPanel();
                                        $("#datasetMapper").bootstrapBtn("reset");
                                        $("#datasetMapper").prop("disabled", false);
                                        $(".query-nodata").show();
                                        //actions o download buttons
                                        this_.disableQueryFormButtons();
                                        $("#dsd-ui-export-options").hide();
                                        this_.disableDashboardOptions();
                                    }
                                }
                            });
                        } else if (dataset.point_vectorizing) {
                            console.log("Update vector layer with strategy 'ogc_filters' based on Feature Catalogue (vector rendering)");
                            var projection = this_.map.getView().getProjection().getCode();
                            this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams == null ? null : decodeURIComponent(strategyparams_str), null, strategyvariable ? [
                                strategyvariable
                            ] : null, "json", projection).then(function(response1) {
                                var format = new $hzBBV$olformat.GeoJSON();
                                var features = response1.map(function(item) {
                                    var feature1 = format.readFeature(item);
                                    feature1.layerid = pid; //hack required to control layer-specific SelectCluster interaction
                                    return feature1;
                                });
                                console.log(features);
                                var source = new (0, $hzBBV$olsource.Vector)({
                                    projection: projection,
                                    features: features
                                });
                                //update viewparams, envparams & legend
                                layer.strategy = dataset.strategy;
                                layer.dsd = dataset.dsd;
                                layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                                layer.setProperties({
                                    title: layerTitle
                                });
                                if (layer.getSource() instanceof (0, $hzBBV$olsource.Cluster)) layer.getSource().setSource(source);
                                else layer.setSource(source);
                                layer.params = {
                                    CQL_FILTER: strategyparams == null ? null : decodeURIComponent(strategyparams_str)
                                };
                                layer.geom = geom;
                                layer.geomtype = geomtype;
                                var selectCluster = this_.getSelectCluster();
                                if (selectCluster) this_.map.removeInteraction(selectCluster);
                                this_.configureSelectCluster();
                                //this_.map.changed();
                                this_.renderMapLegend();
                                this_.showLegendPanel();
                                $("#datasetMapper").bootstrapBtn("reset");
                                $("#datasetMapper").prop("disabled", false);
                                //actions o download buttons
                                this_.enableQueryFormButtons();
                                $("#dsd-ui-export-options").show();
                                //action on dashboard options
                                this_.enableDashboardOptions();
                            });
                        } else {
                            console.log("Update " + dataset.entry.dataModel + " layer with strategy 'ogc_filters' (static styling)");
                            //static styling
                            layer.setProperties({
                                title: layerTitle
                            });
                            if (layerStyle) layer.getSource().updateParams({
                                "STYLES": layerStyle
                            });
                            else layer.getSource().updateParams({
                                "STYLES": ""
                            });
                            if (strategyparams_str != "") layer.getSource().updateParams({
                                "CQL_FILTER": strategyparams == null ? null : decodeURIComponent(strategyparams_str)
                            });
                            else layer.getSource().updateParams({
                                "CQL_FILTER": "INCLUDE"
                            });
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.variable = null;
                            layer.envfun = null;
                            layer.envmaptype = null;
                            layer.envcolscheme = null;
                            layer.count = null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.setLegendGraphic(layer);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            $("#dsd-ui-export-options").show();
                        }
                    } else {
                        console.log("Update " + dataset.entry.dataModel + " layer with strategy 'ogc_filters' with simple CQL filter");
                        layer.strategy = dataset.strategy;
                        layer.dsd = false;
                        layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                        layer.setProperties({
                            title: layerTitle
                        });
                        if (strategyparams_str != "") layer.getSource().updateParams({
                            "CQL_FILTER": strategyparams == null ? null : decodeURIComponent(strategyparams_str)
                        });
                        else layer.getSource().updateParams({
                            "CQL_FILTER": "INCLUDE"
                        });
                        layer.params = layer.getSource().getParams();
                        layer.geom = geom;
                        layer.geomtype = geomtype;
                        this_.map.changed();
                        this_.renderMapLegend();
                        this_.showLegendPanel();
                        $("#datasetMapper").bootstrapBtn("reset");
                        $("#datasetMapper").prop("disabled", false);
                        //actions o download buttons
                        this_.enableQueryFormButtons();
                        $("#dsd-ui-export-options").show();
                        //action on dashboard options
                        this_.enableDashboardOptions();
                    }
                    break;
                case "ogc_dimensions":
                    //The strategy 'ogc_dimensions' may target vector or grid datasets
                    //ogc dimensions
                    //TIME
                    var ogc_time_dimension = null;
                    var time_dimension = strategyparams.filter(function(item) {
                        if (Object.keys(item) == "TIME") return item;
                    });
                    if (time_dimension.length > 0) ogc_time_dimension = time_dimension[0].TIME.content[0];
                    var ogc_elevation_dimension = null;
                    var elevation_dimension = strategyparams.filter(function(item) {
                        if (Object.keys(item) == "ELEVATION") return item;
                    });
                    if (elevation_dimension.length > 0) ogc_elevation_dimension = elevation_dimension[0].ELEVATION.content[0];
                    switch(dataset.entry.dataModel){
                        case "vector":
                            //TODO manage case dynamic (getDatasetFeatures) / static
                            if (dataset.thematicmapping && strategyvariable) console.warn("Update vector layer with strategy 'ogc_dimensions' (thematic mapping) - NOT YET IMPLEMENTED");
                            else if (dataset.point_vectorizing) console.warn("Update vector layer with strategy 'ogc_dimensions' (vector rendering) - NOT YET IMPLEMENTED");
                            else console.warn("Update vector layer with strategy 'ogc_dimensions' (static styling) - NOT YET IMPLEMENTED");
                            break;
                        case "grid":
                            console.log("Update grid layer with strategy 'ogc_dimensions' (static styling)");
                            //static styling
                            layer.setProperties({
                                title: layerTitle
                            });
                            if (layerStyle) layer.getSource().updateParams({
                                "STYLES": layerStyle
                            });
                            else layer.getSource().updateParams({
                                "STYLES": ""
                            });
                            if (ogc_time_dimension) layer.getSource().updateParams({
                                "TIME": ogc_time_dimension
                            });
                            if (ogc_elevation_dimension) layer.getSource().updateParams({
                                "ELEVATION": ogc_elevation_dimension
                            });
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.variable = null;
                            layer.envfun = null;
                            layer.envmaptype = null;
                            layer.envcolscheme = null;
                            layer.count = null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.setLegendGraphic(layer);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                    }
                    break;
                case "ogc_viewparams":
                    if (dataset.thematicmapping && strategyvariable) {
                        console.log("Update vector layer with strategy 'ogc_viewparams' (thematic mapping)");
                        //thematic mapping
                        this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, this_.options.map.thematicmapping_options.thresholding && strategyvariable ? strategyvariable + this_.options.map.thematicmapping_options.threshold : null, strategyvariable ? [
                            strategyvariable
                        ] : null).then(function(features) {
                            console.log("Data series features");
                            console.log(features);
                            console.log("Data series values");
                            var values = undefined;
                            var breaks = undefined;
                            var envparams = undefined;
                            var colors = [];
                            if (strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
                            if (values) {
                                if (values.length > 0) {
                                    if (values.length < classNb) {
                                        classNb = values.length;
                                        layerStyle = from_query_form ? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
                                    }
                                    //update breaks
                                    var breaks = this_.calculateBreaks(values, classType, classNb);
                                    if (breaks.length == 1) breaks = [
                                        0,
                                        breaks[0]
                                    ];
                                    if (breaks.length == 2) breaks[0] = 0;
                                    if (colorScheme) {
                                        var colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][classNb];
                                        if (classNb < 3) colors = (0, ($parcel$interopDefault($hzBBV$colorbrewerindexjs)))[colorScheme][3].slice(0, classNb);
                                    }
                                    envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colors);
                                }
                            }
                            //update viewparams, envparams & legend
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.setProperties({
                                title: layerTitle
                            });
                            if (strategyparams_str != "") layer.getSource().updateParams({
                                "VIEWPARAMS": strategyparams_str
                            });
                            else delete layer.getSource().params_.VIEWPARAMS;
                            layer.getSource().updateParams({
                                "STYLES": layerStyle
                            });
                            layer.variable = strategyvariable;
                            if (envparams) layer.getSource().updateParams({
                                "env": envparams
                            });
                            layer.envfun = classType;
                            layer.envmaptype = mapType;
                            layer.envcolscheme = colorScheme;
                            layer.count = values ? values.length : null;
                            layer.params = layer.getSource().getParams();
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.setLegendGraphic(layer, breaks, colors);
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                            //action on no data
                            if (values) {
                                if (values.length == 0) {
                                    this_.removeLayerByProperty(pid, "id");
                                    this_.map.changed();
                                    this_.renderMapLegend();
                                    this_.showLegendPanel();
                                    $("#datasetMapper").bootstrapBtn("reset");
                                    $("#datasetMapper").prop("disabled", false);
                                    $(".query-nodata").show();
                                    //actions o download buttons
                                    this_.disableQueryFormButtons();
                                    $("#dsd-ui-export-options").hide();
                                    this_.disableDashboardOptions();
                                }
                            }
                        });
                    } else if (dataset.point_vectorizing) {
                        console.log("Update vector layer with strategy 'ogc_viewparams' (vector rendering)");
                        var projection = this_.map.getView().getProjection().getCode();
                        this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, strategyvariable ? [
                            strategyvariable
                        ] : null, "json", projection).then(function(response1) {
                            var format = new $hzBBV$olformat.GeoJSON();
                            var features = response1.map(function(item) {
                                return format.readFeature(item);
                            });
                            var source = new (0, $hzBBV$olsource.Vector)({
                                projection: projection,
                                features: features
                            });
                            //update viewparams, envparams & legend
                            layer.strategy = dataset.strategy;
                            layer.dsd = dataset.dsd;
                            layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                            layer.setProperties({
                                title: layerTitle
                            });
                            if (layer.getSource() instanceof (0, $hzBBV$olsource.Cluster)) layer.getSource().setSource(source);
                            else layer.setSource(source);
                            layer.params = {
                                "VIEWPARAMS": strategyparams_str
                            };
                            layer.geom = geom;
                            layer.geomtype = geomtype;
                            this_.map.changed();
                            this_.renderMapLegend();
                            this_.showLegendPanel();
                            $("#datasetMapper").bootstrapBtn("reset");
                            $("#datasetMapper").prop("disabled", false);
                            //actions o download buttons
                            this_.enableQueryFormButtons();
                            $("#dsd-ui-export-options").show();
                            //action on dashboard options
                            this_.enableDashboardOptions();
                        });
                    } else {
                        console.log("Update vector layer with strategy 'ogc_viewparams' (static styling)");
                        //static styling
                        layer.setProperties({
                            title: layerTitle
                        });
                        if (layerStyle) layer.getSource().updateParams({
                            "STYLES": layerStyle
                        });
                        else layer.getSource().updateParams({
                            "STYLES": ""
                        });
                        layer.getSource().updateParams({
                            "VIEWPARAMS": strategyparams_str
                        });
                        layer.strategy = dataset.strategy;
                        layer.dsd = dataset.dsd;
                        layer.baseDataUrl = baseWfsUrl ? baseWfsUrl : null;
                        layer.variable = null;
                        layer.envfun = null;
                        layer.envmaptype = null;
                        layer.envcolscheme = null;
                        layer.count = null;
                        layer.params = layer.getSource().getParams();
                        layer.geom = geom;
                        layer.geomtype = geomtype;
                        this_.setLegendGraphic(layer);
                        this_.map.changed();
                        this_.renderMapLegend();
                        this_.showLegendPanel();
                        $("#datasetMapper").bootstrapBtn("reset");
                        $("#datasetMapper").prop("disabled", false);
                        //actions o download buttons
                        this_.enableQueryFormButtons();
                        $("#dsd-ui-export-options").show();
                        //action on dashboard options
                        this_.enableDashboardOptions();
                    }
                    break;
            }
        }
        //if data dialog is opened then update tabular dataset
        if ($(".data-dialog").is(":visible")) {
            $("#data-table").DataTable().destroy();
            this_.displayDataTable();
        }
    }
    /**
	 * getDatasetWFSLink
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param strategy
	 * @param strategyparams_str
	 * @param cql_filter a cql filter to filter out the dataset
	 * @param propertyNames
   	 * @param format optional format to be specified, by default it will provide a CSV
	 * @param projection
	 * @return the WFS layer URL
	 */ getDatasetWFSLink(layerUrl, serviceVersion, layerName, strategy1, strategyparams_str, cql_filter, propertyNames, format, projection) {
        if (layerUrl) {
            if (layerUrl.indexOf("?") < 0) layerUrl += "?";
        }
        layerUrl += "&version=" + (serviceVersion ? serviceVersion : "1.0.0");
        layerUrl += "&request=GetFeature";
        layerUrl += "&typeName=" + layerName;
        if (strategyparams_str) {
            if (strategy1 == "ogc_filters") layerUrl += "&CQL_FILTER=" + strategyparams_str;
            if (strategy1 == "ogc_viewparams") layerUrl += "&VIEWPARAMS=" + strategyparams_str;
        }
        if (cql_filter) layerUrl += "&CQL_FILTER=" + cql_filter;
        if (propertyNames) layerUrl += "&propertyName=" + propertyNames.join(",");
        if (format) layerUrl += "&outputFormat=" + format;
        if (projection) layerUrl += "&srsName=" + projection;
        return layerUrl;
    }
    /**
	 * triggerExport
	 * @param id
	 *
	 */ triggerExport(id) {
        var export_method = this.options.access.exports.filter(function(item) {
            if (item.id == id) return item;
        })[0];
        this._triggerExporthHandler = export_method.handler;
        this._triggerExporthHandler();
        delete this._triggerExporthHandler;
    }
    /**
	 * exportToWFS
	 */ exportToWFS() {
        console.log("Download dataset as OGC WFS");
        var this_ = this;
        var wfsResources = this.dataset_on_query.entry.wfs;
        var baseWFS = wfsResources[0];
        var baseWfsUrl = baseWFS.url;
        var layerName = baseWFS.name;
        var wfsVersion = baseWFS.version;
        var strategy1 = this.dataset_on_query.strategy;
        var strategyparams = this.getStrategyParams(this.dataset_on_query, false);
        var cql_filter = null;
        var strategyparams_str = null;
        if (strategyparams) {
            strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
            if (strategyparams.length > 0) {
                if (strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;
            }
        }
        var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, strategy1, strategyparams_str, null, null);
        window.open(wfs_link, "_blank");
    }
    /**
	 * prepareDatasetExportHeader
	 * @param main
	 * @param markdown
	 * @return the R script header as text
	 */ prepareDatasetExportHeader(main, markdown) {
        var comment_prefix = markdown ? "" : "#";
        var b = markdown ? "**" : "";
        var em = markdown ? "_" : "";
        var query_url = window.location.href;
        if (markdown) query_url = "[Link](" + window.location.href + ")";
        var header = "";
        header += "# " + main + " generated by OpenFairViewer\n";
        header += comment_prefix + "The following script provides a standard way to get data and metadata handled in a OpenFairViewer application \n\n";
        header += comment_prefix + b + "Creation date" + b + ": " + new Date().toISOString() + "\n\n";
        header += comment_prefix + b + "Application details" + b + ": \n";
        header += comment_prefix + "* " + em + "OpenFairViewer Base URL" + em + ": " + window.location.href.split("?")[0] + "\n";
        header += comment_prefix + "* " + em + "OGC CSW Catalogue URL" + em + ": " + this.config.OGC_CSW_BASEURL + "\n\n";
        header += comment_prefix + b + "Dataset details" + b + ": \n";
        header += comment_prefix + "* " + em + "pid" + em + ": " + this.dataset_on_query.pid + "\n";
        header += comment_prefix + "* " + em + "title" + em + ": " + this.dataset_on_query.entry.title + "\n";
        header += comment_prefix + "* " + em + "abstract" + em + ": " + this.dataset_on_query.entry._abstract + "\n";
        header += comment_prefix + "* " + em + "OpenFairViewer Query URL" + em + ": " + query_url + "\n";
        return header;
    }
    /**
	 * prepareDatasetRScript
	 * @param add_header
	 * @return the R script as text
	 */ prepareDatasetRScript(add_header) {
        console.log("Prepare dataset as Rscript...");
        var this_ = this;
        var wfsResources = this.dataset_on_query.entry.wfs;
        var baseWFS = wfsResources[0];
        var baseWfsUrl = baseWFS.url;
        var layerName = baseWFS.name;
        var serviceVersion = baseWFS.version;
        console.log(baseWFS);
        var strategy1 = this.dataset_on_query.strategy;
        var strategyparams = this.getStrategyParams(this.dataset_on_query, false);
        var cql_filter = null;
        var strategyparams_str = null;
        if (strategyparams) {
            strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
            if (strategyparams.length > 0) {
                if (strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;
            }
        }
        //script header
        var script = "";
        if (add_header) {
            script += this.prepareDatasetExportHeader("R script", false);
            script += "#---------------------------------------------------------------------------------------------------------\n";
        }
        //script body
        script += "#packages\n";
        script += 'if(!require(ows4R)){\n	install.packages("ows4R")\n	require(ows4R)\n}\n\n';
        script += 'if(!require(sp)){\n	install.packages("sp")\n	require(sp)\n}\n\n';
        script += "#Dataset PID\n";
        script += 'pid <- "' + this.dataset_on_query.pid + '"\n\n';
        script += 'layer <- "' + layerName + '"\n\n';
        script += "#Connect to OGC CSW Catalogue to get METADATA\n";
        script += "CSW <- CSWClient$new(\n";
        script += '	url = "' + this.config.OGC_CSW_BASEURL + '",\n';
        script += '	serviceVersion = "2.0.2",\n';
        script += '	logger = "INFO"\n';
        script += ")\n";
        script += "#Get metadata for dataset '" + this.dataset_on_query.pid + "'\n";
        script += 'md <- CSW$getRecordById(pid, outputSchema = "http://www.isotc211.org/2005/gmd")\n';
        script += 'fc <- CSW$getRecordById(paste0(pid,"_dsd"), outputSchema = "http://www.isotc211.org/2005/gfc")\n';
        script += "\n";
        script += "#Connect to OGC WFS to get DATA\n";
        var baseUrl = baseWfsUrl.split("?")[0];
        script += "WFS <- WFSClient$new(\n";
        script += '	url = "' + baseUrl + '",\n';
        script += '	serviceVersion = "' + serviceVersion + '",\n';
        script += '	logger = "INFO"\n';
        script += ")\n";
        script += "#Get feature type for dataset '" + this.dataset_on_query.pid + "' (layer = '" + layerName + "' )\n";
        script += "ft <- WFS$capabilities$findFeatureTypeByName(layer, exact = FALSE)\n";
        script += "#Get data features for dataset '" + this.dataset_on_query.pid + "' (layer = '" + layerName + "' )\n";
        script += "data.sf <- ft$getFeatures(";
        if (strategyparams_str) {
            if (strategy1 == "ogc_filters") script += 'cql_filter = gsub(" ", "%20", gsub("\'\'", "%27%27", URLencode("' + strategyparams_str + '")))';
            if (strategy1 == "ogc_viewparams") script += 'viewparams = "' + strategyparams_str + '"';
        } else if (cql_filter) script += ', cql_filter = gsub(" ", "%20", gsub("\'\'", "%27%27", URLencode("' + cql_filter + '")))';
        script += ")\n";
        script += 'data.sp <- as(data.sf, "Spatial")\n';
        return script;
    }
    /**
	 * exportToRScript
	 * @return 
	 */ exportToRScript() {
        //rscript 
        var script = this.prepareDatasetRScript(true);
        //download
        console.log("Download dataset as Rscript...");
        var fileName = this.dataset_on_query.pid + "_" + this.getDateTimeString(new Date()) + ".R";
        this.download(script, fileName, "");
    }
    /**
	 * prepareDatasetJupyterNotebook
	 * @param language
	 * @return the Jupyter notebook
	 */ prepareDatasetJupyterNotebook(language) {
        console.log("Prepare dataset as Jupyter notebook...");
        var notebook = null;
        if (language == "R") {
            var header = this.prepareDatasetExportHeader("Jupyter notebook", true);
            var rscript = this.prepareDatasetRScript(false);
            notebook = {
                "cells": [
                    {
                        "cell_type": "markdown",
                        "metadata": {},
                        "source": header.split("\n").map(function(item) {
                            return item + "\n";
                        })
                    },
                    {
                        "cell_type": "code",
                        "execution_count": null,
                        "metadata": {},
                        "outputs": [],
                        "source": rscript.split("\n").map(function(item) {
                            return item + "\n";
                        })
                    }
                ],
                "metadata": {
                    "kernelspec": {
                        "display_name": "R",
                        "language": "R",
                        "name": "ir"
                    },
                    "language_info": {
                        "codemirror_mode": "r",
                        "file_extension": ".r",
                        "mimetype": "text/x-r-source",
                        "name": "R",
                        "pygments_lexer": "r",
                        "version": "4.0.2"
                    }
                },
                "nbformat": 4,
                "nbformat_minor": 4
            };
        } else console.warn("Language " + language + " is currently not supported as Jupyter notebook export method in OpenFairViewer");
        return notebook;
    }
    /**
	 * exportToJupyterNotebook
	 * @param language
	 * @return
	 */ exportToJupyterNotebook(language) {
        //Jupyter notebook 
        var notebook = this.prepareDatasetJupyterNotebook(language);
        //download
        var fileName = this.dataset_on_query.pid + "_" + this.getDateTimeString(new Date()) + ".ipynb";
        this.download(JSON.stringify(notebook), fileName, "");
    }
    /**
	 * exportToRJupyterNotebook
	 * @return
	 */ exportToRJupyterNotebook() {
        this.exportToJupyterNotebook("R");
    }
    getWFSSupportedFormats(layerUrl, serviceVersion) {
        var deferred = $.Deferred();
        if (layerUrl.indexOf("?") < 0) layerUrl += "?";
        if (layerUrl.indexOf("service=WFS") < 0) layerUrl += "&service=WFS";
        layerUrl += "&version=" + (serviceVersion ? serviceVersion : "1.1.0");
        layerUrl += "&request=GetCapabilities";
        $.ajax({
            url: layerUrl,
            crossOrigin: true,
            type: "GET",
            success: function(response1) {
                console.log("WFS get capabilities");
                var caps = $(response1);
                console.log(caps);
                var supportedFormats = new Array();
                deferred.resolve(caps);
            }
        });
        return deferred.promise();
    }
    /**
	 *describeFeatureType
	 * @param layerUrl
	 * @param serviceVersion
	 * @param typeName
	 * @return a feature type description
	 */ describeFeatureType(layerUrl, serviceVersion, typeName) {
        var deferred = $.Deferred();
        if (layerUrl.indexOf("?") < 0) layerUrl += "?";
        if (layerUrl.indexOf("service=WFS") < 0) layerUrl += "&service=WFS";
        layerUrl += "&version=" + (serviceVersion ? serviceVersion : "1.1.0");
        layerUrl += "&request=DescribeFeatureType";
        layerUrl += "&typeName=" + typeName;
        $.ajax({
            url: layerUrl,
            crossOrigin: true,
            type: "GET",
            success: function(response1) {
                console.log("WFS describe feature type");
                var fc = $(response1);
                console.log(fc);
                var featuretype = new Array();
                var elems = fc.children().children().filter(function(i, item) {
                    if (item.tagName.endsWith("complexType")) return item;
                })[0].childNodes[1].childNodes[1].childNodes[1].childNodes;
                for(var i = 0; i < elems.length; i++)if (i % 2 != 0) {
                    var elem = $(elems[i]);
                    featuretype.push({
                        maxOccurs: elem.attr("maxOccurs"),
                        minOccurs: elem.attr("minOccurs"),
                        name: elem.attr("name"),
                        nillable: elem.attr("nillable"),
                        type: elem.attr("type")
                    });
                }
                deferred.resolve(featuretype);
            }
        });
        return deferred.promise();
    }
    /**
	 * Simple json2csv util
	 * @param objArray
	 * @returns a string representive the CSV
	 */ json2csv(objArray) {
        var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        var str = "";
        var line = "";
        //add colnames
        var head = array[0];
        for(var index in array[0])line += index + ",";
        line = line.slice(0, -1);
        str += line + "\r\n";
        //add data
        for(var i = 0; i < array.length; i++){
            var line = "";
            for(var index in array[i]){
                var val = array[i][index];
                if (typeof val == "string") val = '"' + val + '"';
                line += val + ",";
            }
            line = line.slice(0, -1);
            str += line + "\r\n";
        }
        return str;
    }
    /**
	 * Download file
	 * @param content
	 * @param fileName
	 * @param mimeType
	 */ download(content, fileName, mimeType) {
        var a = document.createElement("a");
        mimeType = mimeType || "application/octet-stream";
        if (navigator.msSaveBlob) navigator.msSaveBlob(new Blob([
            content
        ], {
            type: mimeType
        }), fileName);
        else if (URL && "download" in a) {
            a.href = URL.createObjectURL(new Blob([
                content
            ], {
                type: mimeType
            }));
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else location.href = "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
    }
    /**
	 * Download CSV
	 * @param content csv string
	 * @param fileName
	 */ downloadCSV(content, fileName) {
        this.download(content, fileName, "text/csv;charset=utf-8;");
    }
    /**
	 * OpenFairViewer.prototype.getateTimeString
	 * @param date
	 */ getDateTimeString(date) {
        var str = date.toISOString();
        return (str.split("T")[0] + "" + str.split("T")[1].split(".")[0]).replace(/-/g, "").replace(/:/g, "");
    }
    /**
	 * OpenFairViewer.prototype.exportToCSV
	 */ exportToCSV() {
        //options
        var add_colnames = $("#dataset-export-option-colnames").prop("checked");
        var add_labels = $("#dataset-export-option-labels").prop("checked");
        var this_ = this;
        var wfsResources = this.dataset_on_query.entry.wfs;
        var baseWFS = wfsResources[0];
        var baseLayerUrl = baseWFS.url;
        var layerName = baseWFS.name;
        var serviceVersion = "1.1.0"; //baseWFS.version;
        var strategyparams = this.getStrategyParams(this.dataset_on_query, false);
        var cql_filter = null;
        var strategyparams_str = null;
        if (strategyparams) {
            strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
            if (strategyparams.length > 0) {
                if (strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;
            }
        }
        var layerUrl = this.getDatasetWFSLink(baseLayerUrl, serviceVersion, layerName, this.dataset_on_query.strategy, strategyparams_str, cql_filter, null);
        $.get(layerUrl, function(response1) {
            var features = new $hzBBV$olformat.WFS().readFeatures(response1);
            console.log(features);
            var featuresToExport = new Array();
            for(var i = 0; i < features.length; i++){
                var feature1 = features[i];
                var props = feature1.getProperties();
                var prop_keys = Object.keys(props);
                var newprops = new Object();
                for(var j = 0; j < prop_keys.length; j++){
                    var key = prop_keys[j];
                    if (key == "boundedBy") continue;
                    var prop_value = props[key];
                    if (typeof prop_value == "object") prop_value = prop_value[0];
                    if (key != feature1.getGeometryName()) {
                        var fieldAttribute = this_.dataset_on_query.dsd.filter(function(item) {
                            if (item.primitiveCode == key) return item;
                        });
                        var keyname = key;
                        var labelname = key + "_label";
                        if (add_colnames) {
                            if (fieldAttribute.length > 0) {
                                keyname = fieldAttribute[0].name + " [Code]";
                                labelname = fieldAttribute[0].name + " [Label]";
                            }
                        }
                        newprops[keyname] = prop_value;
                        if (add_labels) {
                            if (fieldAttribute.length > 0) {
                                if (fieldAttribute[0].values) {
                                    var fieldValue = fieldAttribute[0].values.filter(function(item) {
                                        if (item.id == prop_value) return item;
                                    });
                                    if (fieldValue.length > 0) newprops[labelname] = fieldValue[0].text;
                                }
                            }
                        }
                    }
                }
                if (feature1.getGeometry() != null) newprops["geometry"] = new $hzBBV$olformat.WKT().writeGeometry(props[feature1.getGeometryName()]);
                featuresToExport.push(newprops);
            }
            var csv = this_.json2csv(featuresToExport);
            var fileName = this_.dataset_on_query.pid;
            fileName += "_" + this_.getDateTimeString(new Date()) + ".csv";
            this_.downloadCSV(csv, fileName);
        });
    }
    /**
	 * OpenFairViewer.prototype.formatTabularDataset
	 * @param features
	 *
	 */ formatTabularDataset(features) {
        var this_ = this;
        var featuresToExport = new Array();
        for(var i = 0; i < features.length; i++){
            var feature1 = features[i];
            var props = feature1.getProperties();
            var prop_keys = Object.keys(props);
            var newprops = new Object();
            newprops["fid"] = feature1.getId();
            for(var j = 0; j < prop_keys.length; j++){
                var key = prop_keys[j];
                if (key == "bbox") continue;
                if (key != feature1.getGeometryName()) {
                    var fieldAttribute = null;
                    if (this_.dataset_on_query.dsd) fieldAttribute = this_.dataset_on_query.dsd.filter(function(item) {
                        if (item.primitiveCode == key) return item;
                    });
                    var keyname = key;
                    var labelname = key + "_label";
                    var oldkeyname = keyname;
                    var oldlabelname = labelname;
                    var newkeyname = "";
                    var newlabelname = "";
                    if (fieldAttribute != null) {
                        if (fieldAttribute.length > 0) {
                            newkeyname = fieldAttribute[0].name + " [Code]";
                            newlabelname = fieldAttribute[0].name + " [Label]";
                            keyname = newkeyname;
                            labelname = newlabelname;
                        }
                    }
                    newprops[keyname] = props[key];
                    if (fieldAttribute != null) {
                        if (fieldAttribute.length > 0) {
                            if (fieldAttribute[0].values) {
                                var fieldValue = fieldAttribute[0].values.filter(function(item) {
                                    if (item.id == props[key]) return item;
                                });
                                if (fieldValue.length > 0) newprops[labelname] = fieldValue[0].text;
                            }
                        }
                    }
                }
            }
            if (feature1.getGeometry() != null) newprops["geometry"] = new $hzBBV$olformat.WKT().writeGeometry(props[feature1.getGeometryName()]);
            featuresToExport.push(newprops);
        }
        return featuresToExport;
    }
    /**
	 * featureTypeToColumns
	 * @param featuretype
	 *
	 */ featureTypeToColumns(featuretype) {
        var columnsToExport = new Array();
        var prop_keys = featuretype.map(function(item) {
            return item;
        });
        for(var j = 0; j < prop_keys.length; j++){
            var key = prop_keys[j].name;
            var type = prop_keys[j].type;
            if (key == "bbox") continue;
            if (!type.startsWith("gml")) {
                var fieldAttribute = null;
                if (this.dataset_on_query.dsd) fieldAttribute = this.dataset_on_query.dsd.filter(function(item) {
                    if (item.primitiveCode == key) return item;
                });
                var oldkeyname = key;
                var oldlabelname = key + "_label";
                var newkeyname = "";
                var newlabelname = "";
                if (fieldAttribute != null) {
                    if (fieldAttribute.length > 0) {
                        newkeyname = fieldAttribute[0].name + " [Code]";
                        newlabelname = fieldAttribute[0].name + " [Label]";
                    }
                }
                var column1 = {
                    id: oldkeyname,
                    title: newkeyname != "" ? newkeyname : oldkeyname
                };
                columnsToExport.push(column1);
                if (fieldAttribute != null) {
                    if (fieldAttribute.length > 0) {
                        if (fieldAttribute[0].values) {
                            if (fieldAttribute[0].values.length > 0) {
                                var column2 = {
                                    id: oldlabelname,
                                    title: newlabelname != "" ? newlabelname : oldlabelname
                                };
                                columnsToExport.push(column2);
                            }
                        }
                    }
                }
            }
        }
        var geom_props = featuretype.filter(function(item) {
            if (item.type.startsWith("gml")) return item;
        });
        if (geom_props.length > 0) {
            var geom_prop = geom_props[0];
            columnsToExport.push({
                id: geom_prop.name,
                title: "geometry"
            });
        }
        return columnsToExport;
    }
    /**
	 * displayDataTable
	 *
	 */ displayDataTable() {
        var pageLength = 5;
        var this_ = this;
        var wfsResources = this.dataset_on_query.entry.wfs;
        var baseWFS = wfsResources[0];
        var baseLayerUrl = baseWFS.url;
        if (baseLayerUrl.indexOf("?") < 0) baseLayerUrl += "?";
        var layerName = baseWFS.name;
        var serviceVersion = baseWFS.version;
        var strategyparams = this.getStrategyParams(this.dataset_on_query, false);
        var cql_filter = null;
        var strategyparams_str = null;
        if (strategyparams) {
            strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
            if (strategyparams.length > 0) {
                if (this_.dataset_on_query.strategy == "ogc_filters") cql_filter = strategyparams_str;
                if (strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;
            }
        }
        //this.getWFSSupportedFormats(baseLayerUrl, '2.0.0');
        this.describeFeatureType(baseLayerUrl, serviceVersion, layerName).then(function(featuretype) {
            console.log(featuretype);
            //get columns defs from feature type
            var columnsToExport = new Array();
            columnsToExport.push({
                id: "fid",
                title: "fid",
                sTitle: "fid"
            });
            var featureTypeColumns = this_.featureTypeToColumns(featuretype);
            for(var i = 0; i < featureTypeColumns.length; i++)columnsToExport.push(featureTypeColumns[i]);
            var data_columns = columnsToExport.map(function(item) {
                return item.title;
            });
            var sortablePropertyNames = featuretype.filter(function(item) {
                if (!item.type.startsWith("gml")) return item;
            });
            var sortByPropertyName = sortablePropertyNames[0].name;
            //wfs params to send to WFS server
            var wfsParams = {
                service: "WFS",
                serviceVersion: "2.0.0",
                request: "GetFeature",
                typeName: layerName,
                outputFormat: encodeURIComponent("application/gml+xml; version=3.2"),
                //outputFormat: encodeURIComponent("application/json"),
                sortBy: sortByPropertyName
            };
            if (this_.dataset_on_query.strategy == "ogc_filters") wfsParams.cql_filter = cql_filter;
            if (this_.dataset_on_query.strategy == "ogc_viewparams") wfsParams.viewparams = strategyparams_str;
            var strategyvariable = this_.getStrategyVariable(this_.dataset_on_query);
            if (this_.options.map.thematicmapping_options.thresholding && strategyvariable) {
                var th_cql = strategyvariable + this_.options.map.thematicmapping_options.threshold;
                if (wfsParams.cql_filter) wfsParams.cql_filter += " AND " + th_cql;
                else wfsParams.cql_filter = th_cql;
            }
            this_.closeDashboardDialog();
            this_.openDataDialog();
            $("#data-table").empty();
            console.log(columnsToExport);
            console.log(data_columns);
            //DataTables
            $("#data-table").DataTable({
                processing: true,
                serverSide: true,
                serverMethod: "get",
                ajax: function(data, callback) {
                    var ajaxParams = Object.assign(wfsParams, {
                        startIndex: data.start,
                        count: data.length
                    });
                    var ajaxUrl = baseLayerUrl + "&service=" + ajaxParams.service + "&version=" + ajaxParams.serviceVersion + "&request=" + ajaxParams.request + "&typeName=" + ajaxParams.typeName;
                    if (ajaxParams.cql_filter) ajaxUrl += "&cql_filter=" + ajaxParams.cql_filter;
                    if (ajaxParams.viewparams) ajaxUrl += "&viewparams=" + ajaxParams.viewparams;
                    ajaxUrl += "&sortBy=" + ajaxParams.sortBy + "&startIndex=" + ajaxParams.startIndex + "&count=" + ajaxParams.count;
                    if (wfsParams.outputFormat) ajaxUrl += "&outputFormat=" + wfsParams.outputFormat;
                    $.get(ajaxUrl, function(response1) {
                        console.log($(response1));
                        var format = new $hzBBV$olformat.WFS({
                            version: "2.0.0"
                        });
                        if (wfsParams.outputFormat) format = wfsParams.outputFormat.indexOf("gml") > 0 ? new $hzBBV$olformat.WFS({
                            version: "2.0.0"
                        }) : new $hzBBV$olformat.GeoJSON();
                        var features = format.readFeatures(response1);
                        console.log(features);
                        var data_export = this_.formatTabularDataset(features);
                        console.log(data_export);
                        callback({
                            recordsTotal: response1.totalFeatures,
                            recordsFiltered: response1.totalFeatures,
                            data: data_export.map(function(item) {
                                return data_columns.map(function(key) {
                                    return item[key];
                                });
                            })
                        });
                    });
                },
                //data: data_series, order: [[0, 'asc']],
                columns: columnsToExport,
                searching: false,
                destroy: true,
                pageLength: pageLength,
                lengthMenu: [
                    5,
                    10,
                    25,
                    50
                ],
                scrollY: 200,
                scrollX: true,
                columnDefs: [
                    {
                        targets: columnsToExport.map(function(item, idx) {
                            return idx;
                        }),
                        render: function(data, type, row, meta) {
                            if (data == null || typeof data == "undefined") data = "-";
                            //generic renderer
                            //case of http(s) links
                            if (typeof data == "string") {
                                if (data.indexOf("http") == 0) data = '<a href="' + data + '" target="_blank" style="color:#337ab7">Link</a>';
                            }
                            //case of images
                            var isBase64 = false;
                            if (typeof data == "string") isBase64 = data.startsWith("base64:") || data.startsWith("data:image/png;base64,");
                            if (isBase64) {
                                if (data.startsWith("base64:")) data = "data:image/png;base64," + data.split("base64:")[1];
                                data = '<img src="' + data + '" width="100%" style="margin:2px;" alt="' + meta.col + '" title="' + meta.col + '"/>';
                            }
                            //case of geometry
                            if (meta.col == data_columns.indexOf("geometry")) {
                                var wkt = data;
                                if (wkt != "–") {
                                    var button_id_zoom = "zoom_feature-" + row[0];
                                    var button_id_disp = "display_feature" + row[0];
                                    //button to zoom to feature
                                    data = '<button id="' + button_id_zoom + '" class="btn btn-xs dataset-button-zoom" title="Zoom to feature" ';
                                    data += 'onclick="' + this_.config.OFV_ID + ".zoomToFeature('" + wkt.toUpperCase() + '\')"><span class="glyphicon glyphicon-zoom-in"></span></button>';
                                    //button to display feature
                                    data += '<button id="' + button_id_disp + '" class="btn btn-xs dataset-button-add" style="margin-left:10px"  title="Display feature" ';
                                    data += 'onclick="' + this_.config.OFV_ID + ".highlightFeature('" + this_.dataset_on_query.lyr + "','" + row[0] + "','" + wkt.toUpperCase() + '\')"><span class="glyphicon glyphicon-map-marker"></span></button>';
                                }
                            }
                            return data;
                        }
                    },
                    {
                        targets: [
                            data_columns.indexOf("geometry")
                        ],
                        orderable: false
                    },
                    {
                        targets: [
                            0
                        ],
                        visible: false
                    }
                ]
            });
        });
    }
    /**
	 * getDashboards
	 */ getDashboards(dataset) {
        if (!dataset) return new Array();
        if (this.options.access.dashboard.enabled) {
            if (this.options.access.dashboard.handlers.length > 0) {
                var eligible_dashboards = this.options.access.dashboard.handlers.filter(function(item) {
                    if (item.targets.filter(function(target) {
                        if (dataset.pid.indexOf(target) >= 0) return target;
                    }).length > 0) return item;
                });
                return eligible_dashboards;
            } else return new Array();
        }
    }
    /**
	 * hasDashboards
	 *
	 */ hasDashboards(dataset) {
        return this.getDashboards(dataset).length > 0;
    }
    /**
	 * displayDashboard
	 *
	 */ displayDashboard(name) {
        this.closeDataDialog();
        this.openDashboardDialog();
        var dashboard = null;
        if (name) dashboard = this.options.access.dashboard.handlers.filter(function(item) {
            if (item.name == name) return item;
        })[0];
        else dashboard = this.getDashboards(this.dataset_on_query)[0];
        var dashboard_html = dashboard.handler(this.dataset_on_query);
        if (dashboard_html) $("#datasetDashboard").html(dashboard_html);
        else $("#datasetDashboard").html("<p>No dashboard configured for this layer</p>");
    }
    /**

	/**
	 * processWKT
	 *
	 */ processWKT(wkt) {
        var format = new $hzBBV$olformat.WKT();
        var feature1 = format.readFeature(wkt);
        var geom = feature1.getGeometry();
        //reproject if needed
        var srs_data = null;
        if (this.dataset_on_query) srs_data = this.dataset_on_query.entry.projection;
        var srs_map = this.map.getView().getProjection();
        if (srs_data) {
            if (srs_data.getCode() != srs_map.getCode()) geom.transform(srs_data, srs_map);
        }
        return geom;
    }
    /**
	 * utcToLocale
	 *
	 */ utcToLocale(str) {
        var date = new Date(Date.parse(str));
        return date.toISOString().split("T")[0] + "T" + date.toLocaleTimeString();
    }
    /**
	 * drawFeatureFromGeom
	 * @param geom
	 * @param style
	 */ drawFeatureFromGeom(geom, style) {
        var this_ = this;
        var feature_style = style ? style : this_.options.find.defaultStyle;
        var feature1 = new (0, ($parcel$interopDefault($hzBBV$olFeature)))({
            geometry: geom
        });
        feature1.setId("generic");
        var layerId = "ofv-feature-marker";
        var layer = this.getLayerByProperty(layerId, "id");
        var source = new (0, $hzBBV$olsource.Vector)({
            features: [
                feature1
            ]
        });
        if (!layer) {
            var layer = new (0, $hzBBV$ollayer.Vector)({
                source: new (0, $hzBBV$olsource.Vector)({
                    features: [
                        feature1
                    ]
                }),
                style: feature_style
            });
            layer.id = layerId;
            this_.layers.overlays[this_.options.map.mainlayergroup].getLayers().push(layer);
        } else {
            layer.setSource(source);
            if (style) layer.setStyle(style);
        }
    }
    /**
	 * drawFeatureFromWKT
	 * @param wkt
	 * @param style
	 */ drawFeatureFromWKT(wkt, style) {
        var this_ = this;
        var geom = this.processWKT(wkt);
        this.drawFeatureFromGeom(geom, style);
    }
    /**
	 * drawFeaturesFromGeoJSON
	 * @param json
	 * @param style
	 */ drawFeaturesFromGeoJSON(json, style) {
        var this_ = this;
        var format = new $hzBBV$olformat.GeoJSON();
        if (!json.features) return;
        var features = json.features.map(function(item) {
            var feature1 = format.readFeature(item, {
                featureProjection: this_.map.getView().getProjection()
            });
            return feature1;
        });
        var feature_style = style ? style : this_.options.find.defaultStyle;
        var layerId = "ofv-feature-marker";
        var layer = this.getLayerByProperty(layerId, "id");
        var source = new (0, $hzBBV$olsource.Vector)({
            features: features
        });
        if (!layer) {
            var layer = new (0, $hzBBV$ollayer.Vector)({
                source: source,
                style: feature_style
            });
            layer.id = layerId;
            this_.layers.overlays[this_.options.map.mainlayergroup].getLayers().push(layer);
        } else {
            layer.setSource(source);
            if (style) layer.setStyle(style);
        }
    }
    /**
	 * zoomToFeature
	 *
	 */ zoomToFeature(wkt) {
        var geom = this.processWKT(wkt);
        var extent = geom.getExtent();
        this.map.getView().fit(extent, this.map.getSize());
    }
    /**
	 * highlightFeature
	 *
	 */ highlightFeature(lyr, id, wkt) {
        var this_ = this;
        var geom = this.processWKT(wkt);
        this.drawFeatureFromGeom(geom);
        //add popup
        var target_layer = this_.getLayerByProperty(lyr, "id");
        var coords = $hzBBV$olextent.getCenter(geom.getExtent());
        if (geom instanceof $hzBBV$olgeom.LineString || geom instanceof $hzBBV$olgeom.MultiLineString || geom instanceof $hzBBV$olgeom.MultiPoint) coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length / 2)];
        if (geom instanceof $hzBBV$olgeom.Point) coords = geom.getCoordinates();
        this.map.getView().setCenter(coords);
        if (target_layer instanceof (0, $hzBBV$ollayer.Vector)) {
            var vectorSource = target_layer.getSource();
            if (vectorSource instanceof (0, $hzBBV$olsource.Cluster)) vectorSource = vectorSource.getSource();
            feature = vectorSource.getFeatureById(id);
            this_.getVectorFeatureInfo(target_layer, feature, coords);
        } else this_.getFeatureInfos([
            lyr
        ], coords);
    }
    /**
	 * OpenFairViewer.prototype.exportToPNG
	 *
	 */ exportToPNG() {
        var this_ = this;
        this.map.once("rendercomplete", function(event) {
            var mapCanvas = document.createElement("canvas");
            var size = this_.map.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            var mapContext = mapCanvas.getContext("2d");
            Array.prototype.forEach.call(document.querySelectorAll(".ol-layer canvas"), function(canvas) {
                if (canvas.width > 0) {
                    var opacity = canvas.parentNode.style.opacity;
                    mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
                    var transform = canvas.style.transform;
                    // Get the transform parameters from the style's transform matrix
                    var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(",").map(Number);
                    // Apply the transform to the export map context
                    CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                    mapContext.drawImage(canvas, 0, 0);
                }
            });
            var fileName = this_.dataset_on_query.pid + "_" + this_.getDateTimeString(new Date()) + ".png";
            if (navigator.msSaveBlob) navigator.msSaveBlob(mapCanvas.msToBlob(), fileName);
            else mapCanvas.toBlob(function(blob) {
                (0, ($parcel$interopDefault($hzBBV$filesaver)))(blob, fileName);
            });
        });
        this.map.renderSync();
    }
    //===========================================================================================
    //MAP
    //===========================================================================================
    /**
	 * initDataViewer
	 */ initDataViewer() {
        var this_ = this;
        this_.initMap("map", true, false);
        if (this_.enable_3d) {
            Cesium.Ion.defaultAccessToken = this.options.cesium.defaultAccessToken;
            this_.ol3d = new (0, ($parcel$interopDefault($hzBBV$olcsOLCesiumjs)))({
                map: this_.map,
                time () {
                    return Cesium.JulianDate.now();
                }
            });
            const scene = this_.ol3d.getCesiumScene();
            scene.terrainProvider = Cesium.createWorldTerrain();
            this_.ol3d.setEnabled(this_.options.map.mode == "3D" ? true : false);
            this_.ol3d.enableAutoRenderLoop();
        } else $("#map-olcesium-switcher").hide();
        $($("li[data-where='#pageMap']")).on("click", function(e) {
            $($("#map").find("canvas")).show();
        });
    }
    inspireWgs84Grid(levels, prefix) {
        var projection = $hzBBV$olproj.get("EPSG:4326");
        var projectionExtent = projection.getExtent();
        var resolution = $hzBBV$olextent.getWidth(projectionExtent) / 512;
        var resolutions = new Array(levels);
        var matrixIds = new Array(levels);
        for(var z = 0; z < levels; z++){
            resolutions[z] = resolution / Math.pow(2, z);
            matrixIds[z] = z;
        }
        return new (0, ($parcel$interopDefault($hzBBV$oltilegridWMTS)))({
            origin: $hzBBV$olextent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
        });
    }
    /**
	 * switchMapView
	 * Switches from 2D to 3D and vice-versa
	 */ switchMapView() {
        var this_ = this;
        if (this.ol3d.getEnabled()) {
            this.ol3d.setEnabled(false);
            $("#map-olcesium-switcher-to").html("3D");
        } else {
            this.ol3d.setEnabled(true);
            $("#map-olcesium-switcher-to").html("2D");
        }
    }
    /**
	 * initMap
	 * @param {String} id the map target id
	 * @param {Boolean} main
	 * @param {Array} extent
	 */ initMap(id, main, extent) {
        var map;
        var this_ = this;
        this_.layers = new Object();
        //baselayers
        var baseLayers = [
            new (0, $hzBBV$ollayer.Group)({
                "title": this_.options.map.baselayergroup.name,
                fold: this_.options.map.baselayergroup.fold,
                layers: this_.options.map.baselayers
            })
        ];
        //overlay groups
        var overlays = new Array();
        for(var i = 0; i < this.options.map.layergroups.length; i++){
            var overlay = new (0, $hzBBV$ollayer.Group)({
                "title": this_.options.map.layergroups[i].name,
                fold: this_.options.map.layergroups[i].fold,
                layers: []
            });
            overlays.push(overlay);
        }
        //special overlay group for coverages
        var covOverlay = new (0, $hzBBV$ollayer.Group)({
            layers: []
        });
        overlays.push(covOverlay);
        //extent/zoom
        var defaultMapExtent = this.options.map.extent;
        var defaultMapZoom = this.options.map.zoom;
        if (main) {
            this.layers.baseLayers = baseLayers;
            this.layers.overlays = overlays;
            this.defaultMapExtent = defaultMapExtent;
            this.defaultMapZoom = defaultMapZoom;
        }
        //mapgetLa
        var mapId = id ? id : "map";
        $("#" + mapId).empty();
        this.map = new (0, ($parcel$interopDefault($hzBBV$olMap)))({
            id: mapId,
            target: mapId,
            layers: this_.layers.baseLayers.concat(this_.layers.overlays),
            view: new (0, ($parcel$interopDefault($hzBBV$olView)))({
                projection: this_.enable_3d ? undefined : this_.options.map.projection,
                center: defaultMapExtent ? $hzBBV$olextent.getCenter(defaultMapExtent) : [
                    0,
                    0
                ],
                extent: this_.enable_3d ? undefined : defaultMapExtent,
                zoom: defaultMapZoom
            }),
            controls: [],
            logo: false
        });
        this.map.addControl(new (0, $hzBBV$olControl.MousePosition)({
            projection: "EPSG:4326",
            coordinateFormat: function(coordinate) {
                return $hzBBV$olcoordinate.format(coordinate, "Lat: {y} Lon: {x}", 2);
            },
            undefinedHTML: "Lat: - Lon: -"
        }));
        //layers of interest
        if (this.map) for(var i = 0; i < this.options.map.overlays.length; i++){
            var layerDef = this.options.map.overlays[i];
            var wmsVersion = layerDef.wmsVersion ? layerDef.wmsVersion : "1.1.1";
            this.addWMSLayer(layerDef.group, layerDef.pid, layerDef.id, layerDef.title, layerDef.shortTitle, layerDef.wmsUrl, wmsVersion, layerDef.layer, layerDef.hidden, layerDef.visible, layerDef.showLegend, layerDef.opacity, layerDef.tiled, layerDef.cql_filter, layerDef.style);
        }
        //Loading panel
        this.map.addControl(new (0, ($parcel$interopDefault($hzBBV$olloadingpanel)))(this_.options.map.control_options.loadingpanel));
        /*map.addControl( new OverviewMap({
			className: 'ol-overviewmap ol-custom-overviewmap',
			layers: [ this_.layers.baseLayers[0] ],
			view : new View({
				projection: this_.options.map.projection,
				center : olExtent.getCenter(defaultMapExtent),
				extent: defaultMapExtent,
				zoom : defaultMapZoom
			}),
			collapseLabel: '\u00BB',
  			label: '\u00AB',
  			collapsed: true
		}) );*/ this.map.addControl(new (0, $hzBBV$olControl.Zoom)());
        this.map.addControl(new (0, $hzBBV$olControl.ZoomToExtent)({
            extent: extent ? extent : defaultMapExtent,
            zoom: defaultMapZoom,
            label: "",
            tipLabel: this_.options.labels.fit_to_extent
        }));
        //TODO
        //map.addControl( new ol.control.Snapshot({dpi: 300}) );
        if (main) this.map.addControl(new (0, $iftof.default)({
            activationMode: "click",
            tipLabel: this_.options.labels.legend_title_show,
            collapseTipLabel: this_.options.labels.legend_title_hide,
            collapseLabel: "",
            dragAndDrop: true
        }));
        if (extent) this.map.getView().fit(extent, this.map.getSize());
        if (main && this.options.map.zoom) this.map.getView().setZoom(this.options.map.zoom);
        //Attribution
        if (this.options.map.attribution) {
            //create base attribution for handling the watermark
            var baseAttribution = new (0, $hzBBV$olControl.Attribution)({
                className: "ol-attribution-map",
                collapsible: false
            });
            this.map.addControl(baseAttribution);
            //manage the display of watermark (logo)
            var attMaps = this.map.getTargetElement().getElementsByClassName("ol-attribution-map");
            if (attMaps.length > 0) $(attMaps[0].getElementsByTagName("ul")[0]).append("<li>" + this_.options.map.attribution + "</li>");
        //hack to remove the baselayer attribution that for some reason is also added to the ol-attribution-map
        //while explicitely referenced on ol-attribution-baselayer (to investigate if there is a cleaner solution)
        //TODO
        /*map.on('postrender', function() {
				var attMaps = this.getTargetElement().getElementsByClassName("ol-attribution-map");
				if( attMaps.length > 0){
					var attLis = attMaps[0].getElementsByTagName("li");
					if( attLis.length > 1) attLis[1].remove();
				}
			});*/ }
        //events
        //------
        //map click (for feature info)
        //configure popup (for popup featureinfo mode)
        var popup = new (0, ($parcel$interopDefault($hzBBV$olpopup)))({
            id: "featureinfos"
        });
        this.map.addOverlay(popup);
        this.layers_with_featureinfo = new Array();
        this.map.on("singleclick", function(evt) {
            this_.getFeatureInfos(this_.layers_with_featureinfo, evt.coordinate);
        });
        //spatial search
        this.map.on("moveend", function(evt) {
            if ($("#dataset-search-bbox-on-search").prop("checked") && $("#dataset-search-bbox-on-mapinteraction").prop("checked")) {
                var bbox = evt.map.getView().calculateExtent(evt.map.getSize());
                var maxrecords = parseInt($("select[id='datasets_length']").val());
                this_.displayDatasets(maxrecords, bbox);
            }
        });
    }
    /**
	 * renderMapLegend
	 */ renderMapLegend() {
        var control = this.map.getControls().getArray().filter(function(control) {
            if (control instanceof (0, ($parcel$interopDefault($hzBBV$ollayerswitcher)))) return control;
        });
        if (control.length > 0) control[0].renderPanel();
    }
    /**
	 * showLegendPanel
	 */ showLegendPanel() {
        var control = this.map.getControls().getArray().filter(function(control) {
            if (control instanceof (0, ($parcel$interopDefault($hzBBV$ollayerswitcher)))) return control;
        });
        if (control.length > 0) control[0].showPanel();
    }
    /**
	 * hideLegendPanel
	 */ hideLegendPanel() {
        var control = this.map.getControls().getArray().filter(function(control) {
            if (control instanceof (0, ($parcel$interopDefault($hzBBV$ollayerswitcher)))) return control;
        });
        if (control.length > 0) control[0].hidePanel();
    }
    /**
	 * setLegendGraphic Set legend graphic
	 * @param {ol/Layer} lyr layer object
	 * @param {Array} breaks an array of break values
	 * @param {Array} colors
	 */ setLegendGraphic(lyr, breaks, colors) {
        var this_ = this;
        var source = lyr.getSource();
        if (source instanceof (0, $hzBBV$olsource.TileWMS) | source instanceof (0, $hzBBV$olsource.ImageWMS)) {
            console.log("Adding legend graphic");
            var params = source.getParams();
            var request = "";
            var wmsUrl = source instanceof (0, $hzBBV$olsource.TileWMS) ? source.getUrls()[0] : source.getUrl();
            var serviceSeparator = wmsUrl.indexOf("wms?") > 0 || wmsUrl.indexOf("ows?") > 0 ? "&" : "?";
            request += wmsUrl + (wmsUrl.endsWith("?") ? "" : serviceSeparator);
            request += "SERVICE=WMS";
            request += "&VERSION=1.0.0";
            request += "&REQUEST=GetLegendGraphic";
            request += "&LAYER=" + params.LAYERS.split(",")[0];
            request += "&STYLE=" + (params.STYLES ? params.STYLES : "");
            request += "&LEGEND_OPTIONS=forcelabels:on;forcerule:True;fontSize:12"; //maybe to let as options
            request += "&SCALE=139770286.4465912"; //to investigate
            request += "&FORMAT=image/png";
            request += "&TRANSPARENT=true";
            request += "&WIDTH=30";
            request += "&SLD_VERSION=1.1.0";
            if (params.STYLES) {
                var style_splits = params.STYLES.split("/");
                if (style_splits.length > 1) //detect presence of palette
                request += "&PALETTE=" + style_splits[1];
            }
            if (colors) {
                request += "&env=";
                var colreq = "";
                for(var i = 1; i <= colors.length; i++)colreq += "c" + i + ":" + colors[i - 1] + ";";
                request += encodeURIComponent(colreq);
            }
            console.log(request);
            //case of dynamic maps
            if (breaks) {
                var canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
                var palYStart = 20;
                var canvasHeight = breaks ? (breaks.length - 1) * 20 + palYStart : 100;
                canvas.height = String(canvasHeight);
                canvas.width = "200";
                var ctx = canvas.getContext("2d");
                //add variable (+uom) header
                ctx.font = "bold 8pt Arial";
                var variable = lyr.dsd.filter(function(item) {
                    if (item.primitiveCode == lyr.variable) return item;
                });
                if (variable.length > 0) variable = variable[0];
                var varLabel = variable.name;
                if (variable.uom) varLabel = varLabel + " (" + variable.uom + ")";
                ctx.fillText(varLabel, 4, 10);
                ctx.font = "normal 8pt Arial";
                //add palette
                var palette = new Image();
                palette.crossOrigin = "anonymous";
                palette.src = request;
                palette.onload = function() {
                    //draw color palette
                    ctx.drawImage(palette, 0, palYStart, 32, canvasHeight - palYStart);
                    //draw break legends
                    ctx.font = "9pt Arial";
                    var breakPt = 14;
                    var breakSpace = 6;
                    var dx = 36;
                    var dy = breakPt + palYStart;
                    if (breaks) {
                        var break_signs = this_.options.map.thematicmapping_options.breaks;
                        for(var i = 1; i < breaks.length; i++){
                            var minVal = Math.round(breaks[i - 1] * 100) / 100;
                            var maxVal = Math.round(breaks[i] * 100) / 100;
                            var class_start = break_signs[0];
                            var class_sep = break_signs[1];
                            var class_end = break_signs[2];
                            if (i == breaks.length - 1) {
                                if (class_end == "[") class_end = "]";
                                if (class_end == "(") class_end = ")";
                            }
                            var breakLegend = class_start + " " + minVal + " " + class_sep + " " + maxVal + " " + class_end;
                            if (lyr.count) {
                                if (lyr.count == breaks.length - 1) breakLegend = lyr.count == 1 ? maxVal : minVal;
                            }
                            ctx.fillText(breakLegend, dx, dy);
                            dy = breakPt * (i + 1) + breakSpace * i + palYStart;
                        }
                        lyr.legendGraphic = canvas.toDataURL("image/png");
                        this_.renderMapLegend();
                    }
                };
            } else lyr.legendGraphic = request;
        }
        if (source instanceof (0, $hzBBV$olsource.Vector)) {
            var features = source instanceof (0, $hzBBV$olsource.Cluster) ? source.source.getFeatures() : source.getFeatures();
            if (features.length > 0) {
                var style = lyr.getStyle();
                if (typeof style == "function") style = style(features[0]);
                var img = style.getImage();
                if (img) {
                    if (img instanceof (0, $hzBBV$olstyle.Icon)) lyr.legendGraphic = img.getSrc();
                    else {
                        var canvas = img.getImage();
                        lyr.legendGraphic = canvas.toDataURL("image/png");
                        this_.renderMapLegend();
                    }
                }
            }
        }
    }
    /**
	 * addWMSLayer Adds layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} shortTitle
	 * @param {String} wmsUrl
	 * @param {String} wmsVersion
	 * @param {String} layer
	 * @param {String} cql_filter
	 * @param {String} style
	 * @param {String} viewparams
	 * @param {String} time
	 * @param {String} elevation
	 * @param {String} envfun
	 * @param {String} envparams
	 * @param {Number} count
	 */ addWMSLayer(mainOverlayGroup, pid, id, title, shortTitle, wmsUrl, wmsVersion, layer, hidden, visible, showLegend, opacity, tiled, cql_filter, style, viewparams, time, elevation, envfun, envparams, count) {
        var this_ = this;
        var layerParams = {
            "LAYERS": layer,
            "VERSION": wmsVersion ? wmsVersion : "1.1.1",
            "FORMAT": "image/png"
        };
        var olLayerClass = (0, $hzBBV$ollayer.Image);
        var olSourceClass = (0, $hzBBV$olsource.ImageWMS);
        if (tiled) {
            layerParams["TILED"] = true;
            layerParams["TILESORIGIN"] = [
                -180,
                -90
            ].join(",");
            olLayerClass = (0, $hzBBV$ollayer.Tile);
            olSourceClass = (0, $hzBBV$olsource.TileWMS);
        }
        if (cql_filter) layerParams["CQL_FILTER"] = cql_filter;
        if (viewparams) layerParams["VIEWPARAMS"] = viewparams;
        if (time) layerParams["TIME"] = time;
        if (elevation) layerParams["ELEVATION"] = elevation;
        hidden = hidden ? hidden : false;
        if (envparams) layerParams["env"] = envparams;
        if (style) layerParams["STYLES"] = style;
        console.log(layerParams);
        var layer = new olLayerClass({
            id: hidden ? undefined : id,
            title: hidden ? undefined : title,
            source: new olSourceClass({
                url: wmsUrl,
                params: layerParams,
                wrapX: true,
                serverType: "geoserver",
                crossOrigin: "anonymous"
            }),
            opacity: opacity,
            visible: visible
        });
        this.setLegendGraphic(layer);
        if (!pid) pid = id;
        layer.pid = pid;
        layer.id = id;
        layer.envfun = envfun;
        layer.count = count;
        layer.showLegendGraphic = showLegend;
        layer.shortTitle = shortTitle;
        if (mainOverlayGroup > this.layers.overlays.length - 1) alert("Overlay group with index " + mainOverlayGroup + " doesn't exist");
        layer.overlayGroup = this.options.map.layergroups[mainOverlayGroup];
        layer.setZIndex(this_.layers.overlays[mainOverlayGroup].getLayers().length);
        this.layers.overlays[mainOverlayGroup].getLayers().push(layer);
        //inherit properties
        layer.csw_server = this.config.OGC_CSW_BASEURL;
        layer.csw_version = this.config.OGC_CSW_VERSION;
        //update map legend;
        this.renderMapLegend(layer);
        return layer;
    }
    /**
	 * addWFSLayer Adds layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} wfsUrl
	 * @param {String} wfsVersion
	 * @param {String} layerName
	 * @param {String} strategy
	 * @param {String} cql_filter
	 * @param {String} viewparams
	 * @param {Boolean} clustering
	 */ addWFSLayer(mainOverlayGroup, pid, id, title, wfsUrl, wfsVersion, layerName, strategy1, viewparams, cql_filter, projection, clustering) {
        var this_ = this;
        var deferred = $.Deferred();
        this_.getDatasetFeatures(wfsUrl, wfsVersion, layerName, strategy1, viewparams, cql_filter, null, "json", projection).then(function(response1) {
            console.log("Get features to set WFS layer");
            var format = new $hzBBV$olformat.GeoJSON();
            var features = response1.map(function(item) {
                var feature1 = format.readFeature(item);
                feature1.pid = pid;
                feature1.layerid = id; //hack required to control layer-specific SelectCluster interaction
                return feature1;
            });
            console.log(features);
            var source = new (0, $hzBBV$olsource.Vector)({
                projection: projection ? projection : "EPSG:4326",
                features: features
            });
            var layer = undefined;
            if (!clustering) {
                //vectorizing without cluster
                layer = new (0, $hzBBV$ollayer.Vector)({
                    id: id,
                    title: title,
                    source: source,
                    visible: true
                });
                layer.pid = pid;
                layer.id = id;
                layer.showLegendGraphic = true;
                layer.setZIndex(this_.layers.overlays[mainOverlayGroup].getLayers().length);
                this_.layers.overlays[mainOverlayGroup].getLayers().push(layer);
                var layerPointer = new $hzBBV$olinteraction.Select({
                    condition: (0, $hzBBV$oleventscondition.pointerMove),
                    layers: [
                        layer
                    ]
                });
                layerPointer.on("select", function(evt) {
                    if (evt.selected) {
                        if (evt.selected.length > 0) evt.selected.forEach(function(feature1) {
                            feature1.setStyle(this_.options.find.hoverStyle);
                            $("#" + feature1.getId()).addClass("hovered");
                        });
                    }
                    if (evt.deselected) {
                        if (evt.deselected.length > 0) evt.deselected.forEach(function(feature1) {
                            feature1.setStyle(null);
                            $("#" + feature1.getId()).removeClass("hovered");
                        });
                    }
                });
                this_.map.addInteraction(layerPointer);
            } else {
                //vectorizing with cluster approach
                var clusterSource = new (0, $hzBBV$olsource.Cluster)({
                    distance: this_.options.map.point_clustering_options.distance,
                    source: source
                });
                console.log(clusterSource);
                layer = new AnimatedCluster({
                    id: id,
                    title: title,
                    source: clusterSource,
                    animationDuration: this_.options.map.point_clustering_options.animationDuration,
                    style: this_.options.map.point_clustering_options.style
                });
                layer.pid = pid;
                layer.id = id;
                layer.showLegendGraphic = true;
                layer.setZIndex(this_.layers.overlays[mainOverlayGroup].getLayers().length);
                this_.layers.overlays[mainOverlayGroup].getLayers().push(layer);
                var selectCluster = this_.getSelectCluster();
                if (!selectCluster) this_.configureSelectCluster();
            }
            deferred.resolve(layer);
        });
        return deferred.promise();
    }
    /**
	 * getVectorLayerViewTitle
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} description
	 */ getVectorLayerViewTitle(pid, id, title, description) {
        var this_ = this;
        var layerTitle = '<button class="btn btn-xs dataset-button dataset-button-remove" data-pid="' + pid + '" data-lyr="' + id + '" title="' + this_.options.labels.dataset_remove + '" onclick="' + this_.config.OFV_ID + '.unselectDatasetView(this)"> X </button>';
        layerTitle += "<span>" + title + "</span>";
        layerTitle += "</br>";
        layerTitle += '<p style="font-weight:normal !important;font-size:90%;"><span class="glyphicon glyphicon-pushpin"></span><b style="margin-left:4px;">' + this_.options.labels.layer + "</b>: " + description + " [" + id + "]";
        return layerTitle;
    }
    /**
	 * addVectorLayer Adds a vector layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} description
	 * @param {Object} data
	 * @param {Object} style
	 * @param {Boolean} clustering
	 * @param {String} projection
	 * @param {ol/format} format
	 */ addVectorLayer(mainOverlayGroup, pid, id, title, description, data, style, clustering, projection, format) {
        var this_ = this;
        var layerTitle = this.getVectorLayerViewTitle(pid, id, title, description);
        if (!data.features) console.error("Invalid GeoJSON data for GeoJSON layer = " + id);
        var features = data.features.map(function(item) {
            var feature1 = format.readFeature(item, {
                featureProjection: this_.map.getView().getProjection()
            });
            if (feature1.getProperties()["gml_id"]) feature1.setId(feature1.getProperties()["gml_id"]);
            if (feature1.getProperties()["id"]) feature1.setId(feature1.getProperties()["id"]);
            feature1.pid = pid;
            feature1.layerid = id; //hack required to control layer-specific SelectCluster interaction
            return feature1;
        });
        console.log(features);
        var source = new (0, $hzBBV$olsource.Vector)({
            projection: projection ? projection : "EPSG:4326",
            features: features
        });
        var feature_style = style ? style : this_.options.find.defaultStyle;
        var layer = undefined;
        if (!clustering) {
            //vectorizing without cluster
            layer = new (0, $hzBBV$ollayer.Vector)({
                id: id,
                title: layerTitle,
                source: source,
                style: feature_style,
                visible: true
            });
            layer.pid = pid;
            layer.id = id;
            layer.showLegendGraphic = true;
            layer.setZIndex(this_.layers.overlays[mainOverlayGroup].getLayers().length);
            this_.layers.overlays[mainOverlayGroup].getLayers().push(layer);
            //Select interactions
            //click
            var layerClick = new $hzBBV$olinteraction.Select({
                layers: [
                    layer
                ]
            });
            layerClick.on("select", function(evt) {
                if (evt.deselected) {
                    if (evt.deselected.length > 0) evt.deselected.forEach(function(feature1) {
                        feature1.setStyle(null);
                        $("#" + feature1.getId()).removeClass("selected");
                        //popup behaviour
                        var popup = this_.map.getOverlayById(layer.id);
                        popup.hide();
                        this_.popup = {};
                        this_.options.map.popup.onclose(layer, [
                            evt.element
                        ]);
                    });
                }
                if (evt.selected) {
                    if (evt.selected.length > 0) evt.selected.forEach(function(feature1) {
                        feature1.setStyle(this_.options.find.selectStyle);
                        $("#" + feature1.getId()).addClass("selected");
                        //popup behaviour
                        this_.getVectorFeatureInfo(layer, feature1);
                    });
                }
            });
            this_.map.addInteraction(layerClick);
        } else {
            //vectorizing with cluster approach
            var clusterSource = new (0, $hzBBV$olsource.Cluster)({
                distance: this_.options.map.point_clustering_options.distance,
                source: source
            });
            console.log(clusterSource);
            layer = new AnimatedCluster({
                id: id,
                title: title,
                source: clusterSource,
                animationDuration: this_.options.map.point_clustering_options.animationDuration,
                style: this_.options.map.point_clustering_options.style
            });
            layer.id = id;
            layer.showLegendGraphic = true;
            layer.setZIndex(this_.layers.overlays[mainOverlayGroup].getLayers().length);
            this_.layers.overlays[mainOverlayGroup].getLayers().push(layer);
            var selectCluster = this_.getSelectCluster();
            if (!selectCluster) this_.configureSelectCluster();
        }
        layer.strategy = null;
        layer.dsd = null;
        layer.baseDataUrl = null;
        this_.addVectorLayerPopup(layer);
        layer.variable = null;
        layer.envfun = null;
        layer.envmaptype = null;
        layer.envcolscheme = null;
        layer.count = null;
        layer.params = null;
        layer.geom = null;
        layer.geomtype = null;
        this_.setLegendGraphic(layer);
        //this_.map.changed();
        this_.renderMapLegend();
        this_.showLegendPanel();
    }
    /**
	 * setVectorLayer Adds a vector layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} description
	 * @param {Object} data
	 * @param {Object} style
	 * @param {Boolean} clustering
	 * @param {String} projection
	 * @param {ol/format} format
	 */ setVectorLayer(mainOverlayGroup, pid, id, title, description, data, style, clustering, projection, format) {
        var this_ = this;
        var layer = this_.getLayerByProperty(id, "id");
        if (!layer) this.addVectorLayer(mainOverlayGroup, pid, id, title, description, data, style, clustering, projection, format);
        else {
            var layerTitle = this.getVectorLayerViewTitle(pid, id, title, description);
            if (!data.features) console.error("Invalid GeoJSON data for GeoJSON layer = " + id);
            var features = data.features.map(function(item) {
                var feature1 = format.readFeature(item, {
                    featureProjection: this_.map.getView().getProjection()
                });
                if (feature1.getProperties()["gml_id"]) feature1.setId(feature1.getProperties()["gml_id"]);
                if (feature1.getProperties()["id"]) feature1.setId(feature1.getProperties()["id"]);
                feature1.pid = pid;
                feature1.layerid = id; //hack required to control layer-specific SelectCluster interaction
                return feature1;
            });
            console.log(features);
            var source = new (0, $hzBBV$olsource.Vector)({
                projection: projection ? projection : "EPSG:4326",
                features: features
            });
            var feature_style = style ? style : this_.options.find.defaultStyle;
            layer.setStyle(feature_style);
            //update viewparams, envparams & legend
            layer.setProperties({
                title: layerTitle
            });
            if (layer.getSource() instanceof (0, $hzBBV$olsource.Cluster)) {
                layer.getSource().setSource(source);
                var selectCluster = this_.getSelectCluster();
                if (selectCluster) this_.map.removeInteraction(selectCluster);
                this_.configureSelectCluster();
            } else layer.setSource(source);
            this_.renderMapLegend();
            this_.showLegendPanel();
        }
    }
    /**
	 * addGeoJSONLayer Adds a vector layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} pid
	 * @param {String} id
	 * @param {String} title
	 * @param {String} description
	 * @param {Object} data
	 * @param {Object} style
	 * @param {Boolean} clustering
	 * @param {String} projection
	 */ setGeoJSONLayer(mainOverlayGroup, pid, id, title, description, data, style, clustering, projection) {
        var format = new $hzBBV$olformat.GeoJSON();
        this.setVectorLayer(mainOverlayGroup, pid, id, title, description, data, style, clustering, projection, format);
    }
    /**
	 * getSelectCluster
	 */ getSelectCluster() {
        var selectClusters = this.map.getInteractions().getArray().filter(function(item) {
            if (item instanceof SelectCluster) return item;
        });
        if (selectClusters.length == 0) return null;
        return selectClusters[0];
    }
    /**
	 * configureSelectCluster
	 * @param layer
	 */ configureSelectCluster() {
        var this_ = this;
        var layerPointer = new SelectCluster({
            pointRadius: this_.options.map.point_clustering_options.pointRadius,
            radiusFactor: this_.options.map.point_clustering_options.radiusFactor,
            spiral: this_.options.map.point_clustering_options.spiral,
            circleMaxObjects: this_.options.map.point_clustering_options.circleMaxObjects,
            animate: this_.options.map.point_clustering_options.animate,
            featureStyle: this_.options.map.point_clustering_options.selectClusterFeatureStyle,
            style: this_.options.map.point_clustering_options.selectClusterStyle
        });
        this_.map.addInteraction(layerPointer);
        layerPointer.getFeatures().on([
            "add",
            "remove"
        ], function(e) {
            var c = e.element.get("features");
            if (e.type == "add") {
                var layer = this_.getLayerByProperty(c[0].layerid, "id");
                if (c.length == 1) {
                    var feature1 = c[0];
                    this_.getVectorFeatureInfo(layer, feature1);
                } else {
                    console.log("Cluster (" + c.length + " features)");
                    this_.options.map.popup.onclose(layer, [
                        e.element
                    ]);
                }
            } else if (e.type == "remove") {
                var feature1 = c[0];
                var layer = this_.getLayerByProperty(feature1.layerid, "id");
                var popup = this_.map.getOverlayById(layer.id);
                popup.hide();
                this_.popup = {};
                this_.options.map.popup.onclose(layer, [
                    e.element
                ]);
                //in case feature markers are highlighted we remove them
                var markersId = "ofv-feature-marker";
                var markers = this_.getLayerByProperty(markersId, "id");
                if (markers) {
                    var source = new (0, $hzBBV$olsource.Vector)({
                        features: []
                    });
                    markers.setSource(source);
                }
            }
        });
    }
    /**
	 * getLayerByProperty Util method to get layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */ getLayerByProperty(layerProperty, by) {
        if (!by) byTitle = false;
        var target = undefined;
        for(var i = 0; i < this.map.getLayerGroup().getLayersArray().length; i++){
            var layer = this.map.getLayerGroup().getLayersArray()[i];
            var condition = by ? layer[by] === layerProperty : layer.getSource().getParams()["LAYERS"] === layerProperty;
            if (condition) {
                target = this.map.getLayerGroup().getLayersArray()[i];
                break;
            }
        }
        return target;
    }
    //===========================================================================================
    //URL resolvers
    //===========================================================================================
    /**
	 * resolveDatasetForQuery
	 * @param {Object} datasetDef
	 * @param {Boolean} resolveMap
	 */ resolveDatasetForQuery(datasetDef, resolveMap) {
        var this_ = this;
        console.log("Fetching query interface for pid = '" + datasetDef.pid + "'");
        if (datasetDef.query) this_.openAccessDialog();
        this_.handleQueryForm(datasetDef, !datasetDef.query).then(function(dataset) {
            datasetDef.dsd = dataset.dsd;
            if (datasetDef.query) {
                //Layer
                $("#ui-ogc_layer").val(datasetDef.lyr).trigger("change");
                //Filters
                switch(datasetDef.strategy){
                    case "ogc_filters":
                        console.log("Resolve query for dataset '" + datasetDef.pid + "' using 'ogc_filters' strategy");
                        if (datasetDef.queryparams) for(var i = 0; i < datasetDef.queryparams.length; i++){
                            var key = Object.keys(datasetDef.queryparams[i])[0];
                            //controller over type "list" or "range"
                            var clazz = $("#dsd-ui-dimension-attribute-" + key).attr("class");
                            if (clazz) {
                                var widget = null;
                                if (clazz.indexOf("select2") > 0) widget = "select2";
                                if (clazz.indexOf("slider") > 0) widget = "slider";
                                switch(widget){
                                    case "select2":
                                        datasetDef.queryparams[i][key].type = "list";
                                        break;
                                    case "slider":
                                        datasetDef.queryparams[i][key].type = "range";
                                        break;
                                }
                            }
                            var queryparam = datasetDef.queryparams[i];
                            var component = queryparam[key];
                            var values = component.content;
                            values = values.map(function(item) {
                                if (item.startsWith("'") && item.endsWith("'")) item = item.substr(1, item.length - 2);
                                item = item.replace("''", "'") //need to replace double single quote (in case of cql filter strings containing single quote)
                                ;
                                return item;
                            });
                            //fill values depending on component type
                            if (component.type == "list") $("#dsd-ui-dimension-attribute-" + key).val(values).trigger("change");
                            else if (component.type == "range") {
                                var slide = $("#dsd-ui-dimension-attribute-" + key + "-slider");
                                values = values.map(function(item) {
                                    return parseInt(item);
                                });
                                if (values.length > 1) {
                                    var min = Math.min.apply(Math, values);
                                    var max = Math.max.apply(Math, values);
                                    slide.data("bootstrapSlider").setValue([
                                        min,
                                        max
                                    ]);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: [
                                            min,
                                            max
                                        ]
                                    });
                                } else {
                                    slide.data("bootstrapSlider").setValue(values[0]);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: values[0]
                                    });
                                }
                            } else if (component.type == "timeinstant") $("#dsd-ui-dimension-time-start-" + key).val(component.content[0].replace("T", " ")).trigger("change");
                            else if (component.type == "timeperiod") {
                                $("#dsd-ui-dimension-time-start-" + key).val(component.content[0].replace("T", " ")).trigger("change");
                                $("#dsd-ui-dimension-time-end-" + key).val(component.content[1].replace("T", " ")).trigger("change");
                            }
                        }
                        //variable
                        $("#dsd-ui-dimension-variable").val(datasetDef.variable).trigger("change");
                        //map options
                        var envfun = datasetDef.envfun;
                        if (envfun) $("#map-classtype-selector").val(envfun).trigger("change");
                        var envmaptype = datasetDef.envmaptype;
                        if (envmaptype) $("#map-type-selector").val(envmaptype).trigger("change");
                        if (datasetDef.breaks) {
                            var classnb = String(datasetDef.breaks.length - 1);
                            if ($("#map-classnb-selector").find("option").map(function() {
                                return $(this).val();
                            }).get().indexOf(classnb) == -1) classnb = 5;
                            $("#map-classnb-selector").val(classnb).trigger("change");
                        }
                        var envcolscheme = datasetDef.envcolscheme;
                        if (envcolscheme) $("#map-colorscheme-selector").val(envcolscheme).trigger("change");
                        var style = datasetDef.style;
                        if (style) {
                            if ($("#map-style-selector").length > 0) $("#map-style-selector").val(style).trigger("change");
                        }
                        break;
                    case "ogc_dimensions":
                        console.log("Resolve query for dataset '" + datasetDef.pid + "' using 'ogc_dimensions' strategy");
                        if (datasetDef.queryparams) //var timeparams = new Array();
                        for(var i = 0; i < datasetDef.queryparams.length; i++){
                            var key = Object.keys(datasetDef.queryparams[i])[0];
                            var clazz = $("#dsd-ui-dimension-attribute-" + key).attr("class");
                            if (clazz) {
                                var widget = null;
                                if (clazz.indexOf("select2") > 0) widget = "select2";
                                if (clazz.indexOf("slider") > 0) widget = "slider";
                                switch(widget){
                                    case "select2":
                                        datasetDef.queryparams[i][key].type = "list";
                                        break;
                                    case "slider":
                                        datasetDef.queryparams[i][key].type = "range";
                                        break;
                                }
                            }
                            var queryparam = datasetDef.queryparams[i];
                            var component = queryparam[key];
                            var values = component.content;
                            if (component.type == "list") $("#dsd-ui-dimension-attribute-" + key).val(values).trigger("change");
                            else if (component.type == "range") {
                                var slide = $("#dsd-ui-dimension-attribute-" + key + "-slider");
                                if (values.length > 1) {
                                    var min = key == "TIME" ? new Date(values[0]).getTime() / 1000 : Math.min.apply(Math, values);
                                    var max = key == "TIME" ? new Date(values[values.length - 1]).getTime() / 1000 : Math.max.apply(Math, values);
                                    slide.data("bootstrapSlider").setValue([
                                        min,
                                        max
                                    ]);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: [
                                            min,
                                            max
                                        ]
                                    });
                                } else {
                                    var value = key == "TIME" ? new Date(values[0]).getTime() / 1000 : values[0];
                                    console.log(key);
                                    console.log(values[0]);
                                    console.log(value);
                                    console.log(slide);
                                    slide.data("bootstrapSlider").setValue(value);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: value
                                    });
                                }
                            } else if (component.type == "timeinstant") $("#dsd-ui-dimension-time-start-" + key).val(component.content[0]).trigger("change");
                            else if (component.type == "timeperiod") {
                                $("#dsd-ui-dimension-time-start-" + key).val(component.content[0].replace("T", " ")).trigger("change");
                                $("#dsd-ui-dimension-time-end-" + key).val(component.content[1].replace("T", " ")).trigger("change");
                            }
                        }
                        //variable
                        $("#dsd-ui-dimension-variable").val(datasetDef.variable).trigger("change");
                        //map options
                        var envfun = datasetDef.envfun;
                        if (envfun) $("#map-classtype-selector").val(envfun).trigger("change");
                        var envmaptype = datasetDef.envmaptype;
                        if (envmaptype) $("#map-type-selector").val(envmaptype).trigger("change");
                        if (datasetDef.breaks) {
                            var classnb = String(datasetDef.breaks.length - 1);
                            if ($("#map-classnb-selector").find("option").map(function() {
                                return $(this).val();
                            }).get().indexOf(classnb) == -1) classnb = 5;
                            $("#map-classnb-selector").val(classnb).trigger("change");
                        }
                        var envcolscheme = datasetDef.envcolscheme;
                        if (envcolscheme) $("#map-colorscheme-selector").val(envcolscheme).trigger("change");
                        var style = datasetDef.style;
                        if (style) {
                            if ($("#map-style-selector").length > 0) $("#map-style-selector").val(style).trigger("change");
                        }
                        break;
                    case "ogc_viewparams":
                        console.log("Resolve query for dataset '" + datasetDef.pid + "' using 'ogc_viewparams' strategy");
                        if (datasetDef.queryparams) //var timeparams = new Array();
                        for(var i = 0; i < datasetDef.queryparams.length; i++){
                            var key = Object.keys(datasetDef.queryparams[i])[0];
                            var clazz = $("#dsd-ui-dimension-attribute-" + key).attr("class");
                            if (clazz) {
                                var widget = null;
                                if (clazz.indexOf("select2") > 0) widget = "select2";
                                if (clazz.indexOf("slider") > 0) widget = "slider";
                                switch(widget){
                                    case "select2":
                                        datasetDef.queryparams[i][key].type = "list";
                                        break;
                                    case "slider":
                                        datasetDef.queryparams[i][key].type = "range";
                                        break;
                                }
                            }
                            var queryparam = datasetDef.queryparams[i];
                            var component = queryparam[key];
                            var values = component.content;
                            if (component.type == "list") $("#dsd-ui-dimension-attribute-" + key).val(values).trigger("change");
                            else if (component.type == "range") {
                                var slide = $("#dsd-ui-dimension-attribute-" + key + "-slider");
                                values = values.map(function(item) {
                                    return parseInt(item);
                                });
                                if (values.length > 1) {
                                    var min = Math.min.apply(Math, values);
                                    var max = Math.max.apply(Math, values);
                                    slide.data("bootstrapSlider").setValue([
                                        min,
                                        max
                                    ]);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: [
                                            min,
                                            max
                                        ]
                                    });
                                } else {
                                    slide.data("bootstrapSlider").setValue(values[0]);
                                    slide.bootstrapSlider().trigger({
                                        type: "slide",
                                        value: values[0]
                                    });
                                }
                            } else if (component.type == "timeinstant") $("#dsd-ui-dimension-time-start-" + key).val(component.content[0]).trigger("change");
                            else if (component.type == "timeperiod") {
                                $("#dsd-ui-dimension-time-start-" + key).val(component.content[0].replace("T", " ")).trigger("change");
                                $("#dsd-ui-dimension-time-end-" + key).val(component.content[1].replace("T", " ")).trigger("change");
                            }
                        }
                        //variable
                        $("#dsd-ui-dimension-variable").val(datasetDef.variable).trigger("change");
                        //map options
                        var envfun = datasetDef.envfun;
                        if (envfun) $("#map-classtype-selector").val(envfun).trigger("change");
                        var envmaptype = datasetDef.envmaptype;
                        if (envmaptype) $("#map-type-selector").val(envmaptype).trigger("change");
                        if (datasetDef.breaks) {
                            var classnb = String(datasetDef.breaks.length - 1);
                            if ($("#map-classnb-selector").find("option").map(function() {
                                return $(this).val();
                            }).get().indexOf(classnb) == -1) classnb = 5;
                            $("#map-classnb-selector").val(classnb).trigger("change");
                        }
                        var envcolscheme = datasetDef.envcolscheme;
                        if (envcolscheme) $("#map-colorscheme-selector").val(envcolscheme).trigger("change");
                        var style = datasetDef.style;
                        if (style) {
                            if ($("#map-style-selector").length > 0) $("#map-style-selector").val(style).trigger("change");
                        }
                        break;
                }
            }
            //update
            datasetDef.title = this_.getDatasetViewTitle(datasetDef, datasetDef.queryparams, false);
            //resolve map
            if (resolveMap) this_.resolveDatasetForMap(datasetDef);
        });
    }
    /**
	 * resolveDatasetForMap
	 * @param {Object} dataset
	 */ resolveDatasetForMap(dataset) {
        console.log("Resolving map for pid = '" + dataset.pid + "'");
        console.log(dataset);
        this.mapDatasetView(dataset, false);
    }
    /**
	 * resolveViewer
	 * Resolves the map viewer from URL parameters
	 */ resolveViewer() {
        var this_ = this;
        //url params
        var params = this_.getAllUrlParams();
        console.log(params);
        //mode
        if (params.mode) {
            if (params.mode != this.options.map.mode) this.switchMapView();
        }
        //baseview
        if (params.baseview) {
            var baseviews = this_.map.getLayers().getArray()[0].getLayersArray();
            for(var i = 0; i < baseviews.length; i++)if (baseviews[i].get("title") == decodeURIComponent(params.baseview)) baseviews[i].setVisible(true);
            else baseviews[i].setVisible(false);
        }
        //dynamic parameters
        //embedded link feature 'dataset' decoding
        if (params.dataset && !params.views) {
            var datasetDef = {
                pid: params.dataset
            };
            this_.getCSWRecord(datasetDef.pid).then(function(md_entry) {
                console.log("we should add the dataset to the selection here");
                console.log(md_entry);
                datasetDef.entry = md_entry;
                datasetDef.dsd = md_entry.dsd;
                datasetDef.query = true;
                datasetDef.strategy = this_.getStrategy(datasetDef);
                if (this_.selection.map(function(i) {
                    return i.pid;
                }).indexOf(pid) == -1) this_.selection.push(datasetDef.entry);
                this_.resolveDatasetForQuery(datasetDef, false);
            });
        }
        //embedded link feature 'views'
        if (params.views) {
            var encoded_views = JSON.parse(decodeURIComponent(params.views));
            console.log(encoded_views);
            var encoded_datasets = new Array();
            for(var i = 0; i < encoded_views.length; i++){
                var encoded_view = encoded_views[i];
                var encoded_view_settings = encoded_view.split(/(?!<(?:\(|\[)[^)\]]+),(?![^(\[]+(?:\)|\]))/g).map(function(item) {
                    var elems = item.split("=");
                    var out = new Object();
                    out[elems[0]] = elems[1];
                    return out;
                });
                var encoded_view_obj = new Object();
                for(var j = 0; j < encoded_view_settings.length; j++){
                    var setting = encoded_view_settings[j];
                    var setting_key = Object.keys(setting)[0];
                    encoded_view_obj[setting_key] = setting[setting_key] != "undefined" ? setting[setting_key] : null;
                }
                var pid = encoded_view_obj.pid;
                var lyr = encoded_view_obj.lyr;
                var strategy1 = encoded_view_obj.strategy;
                var queryparams = encoded_view_obj.par;
                console.log(encoded_view_obj);
                console.log("Strategy = " + strategy1);
                console.log("Query params = " + queryparams);
                if (queryparams) switch(strategy1){
                    case "ogc_filters":
                        queryparams = queryparams.split(") AND (").map(function(item) {
                            var out = null;
                            if (item.startsWith("(") && item.endsWith(")")) item = item.substr(1, item.length - 2);
                            if (item.indexOf("IN(") > 0) {
                                var elems = item.split(" IN(");
                                var attribute = elems[0];
                                var values = elems[1].split(")")[0].split(/(?!'),(?![^'])/g);
                                values.length = 1;
                                values = values[0].split(",");
                                values = values.map(function(item) {
                                    return item;
                                }); //replace double single quote for cql filter text with single quote
                                values = values.map(function(item) {
                                    return decodeURIComponent(item);
                                });
                                out = new Object();
                                out[attribute] = {
                                    type: "list",
                                    content: values
                                };
                            } else if (item.indexOf("BEFORE") > 0 && item.indexOf("AFTER")) {
                                var elems = item.split(" AND ");
                                var time_filter_start = elems[0].split(" AFTER ");
                                var time_filter_end = elems[1].split(" BEFORE ");
                                var attribute = time_filter_start[0];
                                var values = [
                                    time_filter_start[1],
                                    time_filter_end[1]
                                ];
                                out = new Object();
                                out[attribute] = {
                                    type: "timeperiod",
                                    content: values
                                };
                            }
                            return out;
                        });
                        if (queryparams.length == 1 && queryparams[0] == null) queryparams = new Array();
                        break;
                    case "ogc_dimensions":
                        queryparams = queryparams.split(";").map(function(item) {
                            var dimension = item.split(":")[0];
                            var values = [
                                decodeURIComponent(item.split(dimension + ":")[1])
                            ];
                            var out = new Object();
                            out[dimension] = {
                                type: !isNaN(Date.parse(values[0])) & values[0].length >= 10 ? "range" : "list",
                                content: values
                            };
                            return out;
                        });
                        console.log(queryparams);
                        break;
                    case "ogc_viewparams":
                        queryparams = queryparams.split(";").map(function(item) {
                            var elems = item.split(":");
                            var attribute = elems[0];
                            var values = elems[1].split("+");
                            values = values.map(function(item) {
                                return decodeURIComponent(item);
                            });
                            var out = new Object();
                            out[attribute] = {
                                type: !isNaN(Date.parse(values[0])) & values[0].length >= 10 ? "timeinstant" : "list",
                                content: values
                            };
                            return out;
                        });
                        break;
                }
                console.log(encoded_view_obj);
                var variable = encoded_view_obj["var"];
                var envfun = encoded_view_obj.fun;
                var envmaptype = encoded_view_obj.maptype;
                var envparams = encoded_view_obj.env;
                var envcolscheme = encoded_view_obj.cs;
                var count = encoded_view_obj.count;
                var style = encoded_view_obj.style;
                var query = encoded_view_obj.q == "true";
                var breaks = undefined;
                if (envparams) {
                    breaks = envparams.split(";");
                    breaks.splice(-1, 1);
                    breaks.splice(0, 2);
                    breaks = breaks.map(function(key) {
                        return parseFloat(key.split(":")[1]);
                    });
                }
                var pt = "false";
                if (encoded_view_obj.geomtype) {
                    if (encoded_view_obj.geomtype == "gml:PointPropertyType") pt = "true";
                }
                encoded_datasets.push({
                    pid: pid,
                    lyr: lyr,
                    strategy: strategy1,
                    queryparams: queryparams,
                    variable: variable,
                    envfun: envfun,
                    envmaptype: envmaptype,
                    envparams: envparams,
                    envcolscheme: envcolscheme,
                    count: count,
                    breaks: breaks,
                    style: style,
                    query: query,
                    thematicmapping: variable ? true : false,
                    point_vectorizing: this_.options.map.point_vectorizing && pt,
                    point_clustering: this_.options.map.point_vectorizing && this_.options.map.point_clustering && pt
                });
            }
            var metadata_promises = new Array();
            console.log(encoded_datasets);
            for(var i = 0; i < encoded_datasets.length; i++)metadata_promises.push(this_.getCSWRecord(encoded_datasets[i].pid));
            console.log(encoded_datasets);
            console.log("Sending " + metadata_promises.length + " metadata record request(s)...");
            metadata_promises.forEach(function(promise, i) {
                $.when(promise).then(function(md_entry) {
                    var encoded_dataset = encoded_datasets[i];
                    encoded_dataset.entry = md_entry;
                    if (!encoded_dataset.lyr) encoded_dataset.lyr = encoded_dataset.entry.wms[0].name; //set for backward-compatibility in case no lyr in url
                    //encoded_dataset.title = this_.getDatasetViewTitle(encoded_dataset, encoded_dataset.queryparams, false);
                    encoded_dataset.dsd = encoded_dataset.entry.dsd;
                    console.log(encoded_dataset);
                    this_.selection.push(encoded_dataset);
                    //if it was the last dataset queried by user we fill the query interface with param values
                    //otherwise DSD (if existing) will be fetched but no html markup will be managed
                    this_.resolveDatasetForQuery(encoded_dataset, true);
                    /*if(encoded_dataset.query){
						this_.resolveDatasetForQuery(encoded_dataset, true);
					}else{
						this_.resolveDatasetForMap(encoded_dataset);	
					}*/ //popup coords
                    if (params.popup_id) {
                        if (params.popup_id == encoded_dataset.pid) {
                            if (params.popup_coords) {
                                triggerPopup = function() {
                                    var layer = this_.getLayerByProperty(encoded_dataset.pid, "id");
                                    var coords = params.popup_coords.split(",").map(function(coord, i) {
                                        return parseFloat(coord);
                                    });
                                    this_.getFeatureInfos([
                                        layer.id
                                    ], coords);
                                };
                                window.setTimeout(triggerPopup, 1000); //TO TEST, IF LAYER IS LOW TO RENDER THIS FAILS
                            }
                        }
                    }
                    this_.map.changed();
                    this_.showLegendPanel();
                    this_.renderMapLegend();
                });
            });
        }
        //extent, center, zoom
        if (params.extent) {
            var extent = params.extent.split(",");
            for(var i = 0; i < extent.length; i++)extent[i] = parseFloat(extent[i]);
            this.map.getView().fit(extent, this.map.getSize());
        }
        if (params.center) {
            var center = params.center.split(",");
            center[0] = parseFloat(center[0]);
            center[1] = parseFloat(center[1]);
            this.map.getView().setCenter(center);
        }
        if (params.zoom) this.map.getView().setZoom(parseInt(params.zoom));
    }
    /**
	 * enableMessageListener
	 */ enableMessageListener() {
        //testing messaging between children (Shiny popups) and parent (OFV)
        // Create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        // Listen to message from child window
        eventer(messageEvent, function(e) {
            console.log("parent received message! = ", e.data);
            eval(e.data);
        }, false);
    }
    //===========================================================================================
    //Widgets UIs
    //===========================================================================================
    /**
     * initDialog Init dialoginitDialog
	 */ initDialog(id, title, classes, position, liIdx, onopen, onclose, draggable, resizable) {
        var is_draggable = draggable ? draggable : false;
        var is_resizable = resizable ? resizable : false;
        var this_ = this;
        if (!classes) classes = {
            "ui-dialog": "ui-corner-all",
            "ui-dialog-titlebar": "ui-corner-all"
        };
        if (!position) position = {
            my: "center",
            at: "top",
            of: window
        };
        $("#" + id).dialog({
            width: id == "accessDialog" ? this_.options.access.columns * 400 + "px" : undefined,
            autoOpen: false,
            draggable: is_draggable,
            resizable: is_resizable,
            title: title,
            classes: classes,
            position: position,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            open: function(event, ui) {
                $($("nav li")[liIdx]).addClass("active");
                if (onopen) onopen();
            },
            close: function(event, ui) {
                $($("nav li")[liIdx]).removeClass("active");
                if (onclose) onclose();
            }
        });
    }
    /**
	 * openDialog Open dialog
	 */ openDialog(id) {
        if (!$("#" + id).dialog("isOpen")) $("#" + id).dialog("open");
    }
    /**
	 * closeDialog Close dialog
	 */ closeDialog(id) {
        if ($("#" + id).dialog("isOpen")) $("#" + id).dialog("close");
    }
    /**
	 * openAboutDialog Open 'About' dialog
	 */ openAboutDialog() {
        this.closeFindDialog();
        this.closeAccessDialog();
        this.openDialog("aboutDialog");
    }
    /**
	 * closeAboutDialog Close 'About' dialog
	 */ closeAboutDialog() {
        this.closeDialog("aboutDialog");
    }
    /**
	 * openFindDialog Open 'Data' dialog
	 */ openFindDialog() {
        this.closeAboutDialog();
        this.closeAccessDialog();
        this.openDialog("findDialog");
    }
    /**
	* closeFindDialog Close 'Data' dialog
	*/ closeFindDialog() {
        this.closeDialog("findDialog");
    }
    /**
	* openAccessDialog Open 'Query' dialog
	*/ openAccessDialog() {
        this.closeAboutDialog();
        this.closeFindDialog();
        this.openDialog("accessDialog");
    }
    /**
	* closeAccessDialog Close 'Query' dialog
	*/ closeAccessDialog() {
        this.closeDialog("accessDialog");
    }
    /**
	* openInfoDialog Open 'Info' dialog
	*/ openInfoDialog() {
        this.openDialog("infoDialog");
    }
    /**
	* closeInfoDialog Close 'Info' dialog
	*/ closeInfoDialog() {
        this.closeDialog("infoDialog");
    }
    /**
	* openDataDialog Open 'Data' dialog
	*/ openDataDialog() {
        this.openDialog("dataDialog");
    }
    /**
	* closeDataDialog Close 'Data' dialog
	*/ closeDataDialog() {
        this.closeDialog("dataDialog");
    }
    /**
	* closeInfoDialog Close 'Info' dialog
	*/ closeInfoDialog() {
        this.closeDialog("infoDialog");
    }
    /**
	* openDashboardDialog Open 'Dashboard' dialog
	*/ openDashboardDialog() {
        this.openDialog("dashboardDialog");
    }
    /**
	* closeDashboardDialog Close 'Dashboard' dialog
	*/ closeDashboardDialog() {
        this.closeDialog("dashboardDialog");
    }
    /**
	* openFeatureDialog Open 'Feature' dialog
	*/ openFeatureDialog() {
        this.openDialog("featureDialog");
    }
    /**
	* closeFeatureDialog Close 'Feature' dialog
	*/ closeFeatureDialog() {
        this.closeDialog("featureDialog");
    }
    /**
	*
	*/ _copyright() {
        $("body").append("<footer><a href='https://doi.org/10.5281/zenodo.2249305'>&copy; OpenFairViewer <small>(version " + this.versioning.VERSION + ")</small</a></footer>");
    }
}
var $9d83d5c18bf7151e$export$2e2bcd8739ae039 = OpenFairViewer;

});
parcelRequire.register("2ueYb", function(module, exports) {

var $1cf9fecb57c96c68$export$2e2bcd8739ae039 = window.$ = window.jQuery = (0, ($parcel$interopDefault($hzBBV$jquery)));

});

parcelRequire.register("gRlUG", function(module, exports) {

var $c46298178253bfb9$export$2e2bcd8739ae039 = window.Jsonix = (0, $hzBBV$jsonixjsonix.Jsonix);

});

parcelRequire.register("8a8x0", function(module, exports) {
parcelRequire("2RmwF");
var $5f15e0118a46d306$export$2e2bcd8739ae039 = window.GML_V_3_1_1 = GML_V_3_1_1;

});
parcelRequire.register("2RmwF", function(module, exports) {
GML_V_3_1_1 = {};
GML_V_3_1_1.GeoJSON = {};
GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter = Jsonix.Class({
    initialize: function() {},
    createGeometry: function(geometry) {
        Jsonix.Util.Ensure.ensureObject(geometry);
        var result = this.doCreateGeometry(geometry);
        // getSridConverter().convert(locator, geometryType, geometry);
        return result;
    },
    doCreateGeometry: function(geometry) {
        throw "Abstract method.";
    },
    createGeometryFromProperty: function(property) {
        throw "Abstract method.";
    },
    createGeometryFromElement: function(geometryElement) {
        Jsonix.Util.Ensure.ensureObject(geometryElement);
        Jsonix.Util.Ensure.ensureObject(geometryElement.name);
        Jsonix.Util.Ensure.ensureObject(geometryElement.value);
        return this.createGeometry(geometryElement.value);
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter"
});
GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter = Jsonix.Class({
    initialize: function() {},
    createGeometryType: function(geometry) {
        var target = this.doCreateGeometryType(geometry);
        //getSrsReferenceGroupConverter().convert(geometry, target);
        return target;
    },
    doCreateGeometryType: function(geometry) {
        throw "Abstract method";
    },
    createPropertyType: function(geometry) {
        throw "Abstract method";
    },
    createElement: function(geometry) {
        throw "Abstract method";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter"
});
GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter = Jsonix.Class({
    initialize: function() {},
    createCoordinateFromDirectPositionType: function(directPositionType) {
        var value = directPositionType.value;
        var count = value.length;
        if (count == 2) {
            var x0 = value[0];
            var y0 = value[1];
            return [
                x0,
                y0
            ];
        } else if (count == 3) {
            var x1 = value[0];
            var y1 = value[1];
            var z1 = value[2];
            return [
                x1,
                y1,
                z1
            ];
        } else throw "Direct position type is expected to have 2 or 3 items.";
    },
    createCoordinatesFromDirectPositionListType: function(directPositionListType) {
        var dimensions = Jsonix.Util.Type.isNumber(directPositionListType.srsDimension) ? directPositionListType.srsDimension : 2;
        if (dimensions < 2 || dimensions > 3) throw "Only two- or three-dimensional coordinates are supported.";
        var values = directPositionListType.value;
        if (values.length % dimensions !== 0) throw "Wrong number of entries [" + values.length + "] in the list.";
        var coordinates = [];
        for(var index = 0; index < values.length / dimensions; index++){
            if (dimensions == 2) coordinates.push([
                values[index * dimensions],
                values[index * dimensions + 1]
            ]);
            else if (dimensions == 3) coordinates.push([
                values[index * dimensions],
                values[index * dimensions + 1],
                values[index * dimensions + 2]
            ]);
        }
        return coordinates;
    },
    createCoordinateFromCoordType: function(coordType) {
        Jsonix.Util.Ensure.ensureObject(coordType);
        if (Jsonix.Util.Type.exists(coordType.x) && Jsonix.Util.Type.exists(coordType.y) && !Jsonix.Util.Type.exists(coordType.z)) {
            Jsonix.Util.Ensure.ensureNumber(coordType.x);
            Jsonix.Util.Ensure.ensureNumber(coordType.y);
            return [
                coordType.x,
                coordType.y
            ];
        } else if (Jsonix.Util.Type.exists(coordType.x) && Jsonix.Util.Type.exists(coordType.y) && Jsonix.Util.Type.exists(coordType.z)) {
            Jsonix.Util.Ensure.ensureNumber(coordType.x);
            Jsonix.Util.Ensure.ensureNumber(coordType.y);
            Jsonix.Util.Ensure.ensureNumber(coordType.z);
            return [
                coordType.x,
                coordType.y,
                coordType.z
            ];
        } else throw "Either X, Y or X, Y, Z values are required.";
    },
    createCoordinatesFromCoordinatesType: function(coordinates) {
        Jsonix.Util.Ensure.ensureObject(coordinates);
        var coords = this.createCoordinates(coordinates.value, coordinates.decimal, coordinates.cs, coordinates.ts);
        return coords;
    },
    createCoordinates: function(value, ds, cs, ts) {
        Jsonix.Util.Ensure.ensureString(value);
        var tupleSeparator = Jsonix.Util.Type.isString(ts) ? ts : " ";
        var tuples = value.split(tupleSeparator);
        var coordinates = [];
        for(var index = 0; index < tuples.length; index++)coordinates.push(this.createCoordinate(tuples[index], ds, cs));
        return coordinates;
    },
    createCoordinate: function(value, ds, cs) {
        Jsonix.Util.Ensure.ensureString(value);
        var coordinateSeparator = Jsonix.Util.Type.isString(cs) ? cs : ",";
        var coordinates = value.split(coordinateSeparator);
        var coordinateComponents = [];
        for(var index = 0; index < coordinates.length; index++)coordinateComponents.push(this.createCoordinateComponent(coordinates[index], ds));
        if (coordinateComponents.length == 2) return [
            coordinateComponents[0],
            coordinateComponents[1]
        ];
        else if (coordinateComponents.length == 3) return [
            coordinateComponents[0],
            coordinateComponents[1],
            coordinateComponents[2]
        ];
        else throw "Expected two or three coordinates in [" + value + "].";
    },
    createCoordinateComponent: function(value, ds) {
        Jsonix.Util.Ensure.ensureString(value);
        var decimalSeparator = Jsonix.Util.Type.isString(ds) ? ds : ".";
        var decimalSeparatorIndex = value.indexOf(decimalSeparator);
        var text;
        if (decimalSeparatorIndex < 0) text = value;
        else text = value.substring(0, decimalSeparatorIndex) + "." + value.substring(decimalSeparatorIndex + decimalSeparator.length);
        var n = Number(text);
        return n;
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter"
});
GML_V_3_1_1.GeoJSON.ForwardGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    coordinateConverter: null,
    pointConverter: null,
    lineStringConverter: null,
    linearRingConverter: null,
    polygonConverter: null,
    multiPointConverter: null,
    multiLineStringConverter: null,
    multiPolygonConverter: null,
    multiGeometryConverter: null,
    properties: null,
    propertyConverters: null,
    elementConverters: null,
    initialize: function(options) {
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, arguments);
        this.coordinateConverter = new GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter();
        this.pointConverter = new GML_V_3_1_1.GeoJSON.ForwardPointConverter({
            coordinateConverter: this.coordinateConverter
        });
        this.lineStringConverter = new GML_V_3_1_1.GeoJSON.ForwardLineStringConverter({
            coordinateConverter: this.coordinateConverter,
            pointConverter: this.pointConverter
        });
        this.linearRingConverter = new GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter({
            coordinateConverter: this.coordinateConverter,
            pointConverter: this.pointConverter
        });
        this.polygonConverter = new GML_V_3_1_1.GeoJSON.ForwardPolygonConverter({
            linearRingConverter: this.linearRingConverter
        });
        this.multiPointConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter({
            pointConverter: this.pointConverter
        });
        this.multiLineStringConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter({
            lineStringConverter: this.lineStringConverter
        });
        this.multiPolygonConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter({
            polygonConverter: this.polygonConverter
        });
        this.multiGeometryConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiGeometryConverter({
            geometryConverter: this
        });
        this.properties = [
            "point",
            "lineString",
            "polygon",
            "multiPoint",
            "multiLineString",
            "multiPolygon",
            "geometricAggregate"
        ];
        this.propertyConverters = {
            "point": this.pointConverter,
            "lineString": this.lineStringConverter,
            "polygon": this.polygonConverter,
            "multiPoint": this.multiPointConverter,
            "multiLineString": this.multiLineStringConverter,
            "multiPolygon": this.multiPolygonConverter,
            "geometricAggregate": this.multiGeometryConverter
        };
        this.elementConverters = {
            "{http://www.opengis.net/gml}Point": this.pointConverter,
            "{http://www.opengis.net/gml}LineString": this.lineStringConverter,
            "{http://www.opengis.net/gml}Polygon": this.polygonConverter,
            "{http://www.opengis.net/gml}MultiPoint": this.multiPointConverter,
            "{http://www.opengis.net/gml}MultiLineString": this.multiLineStringConverter,
            "{http://www.opengis.net/gml}MultiPolygon": this.multiPolygonConverter,
            "{http://www.opengis.net/gml}MultiGeometry": this.multiGeometryConverter
        };
    },
    doCreateGeometry: function(geometry) {
        if (Jsonix.Util.Type.exists(geometry.pos) || Jsonix.Util.Type.exists(geometry.coordinates) || Jsonix.Util.Type.exists(geometry.coords)) return this.pointConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.posOrPointPropertyOrPointRep) || Jsonix.Util.Type.exists(geometry.posList) || Jsonix.Util.Type.exists(geometry.coordinates)) return this.lineStringConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.exterior) || Jsonix.Util.Type.exists(geometry.interior)) return this.polygonConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.pointMember) || Jsonix.Util.Type.exists(geometry.pointMembers)) return this.multiPointConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.lineStringMember) || Jsonix.Util.Type.exists(geometry.lineStringMembers)) return this.multiLineStringConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.polygonMember) || Jsonix.Util.Type.exists(geometry.polygonMembers)) return this.multiPolygonConverter.createGeometry(geometry);
        else if (Jsonix.Util.Type.exists(geometry.geometryMember) || Jsonix.Util.Type.exists(geometry.geometryMembers)) return this.multiGeometryConverter.createGeometry(geometry);
        else throw "Geometry [" + geometry + "] was not recognized.";
    },
    createGeometryFromProperty: function(geometryProperty) {
        Jsonix.Util.Ensure.ensureObject(geometryProperty);
        if (Jsonix.Util.Type.exists(geometryProperty.geometry)) return this.createGeometryFromElement(geometryProperty.geometry);
        else {
            for(var index1 = 0; index1 < this.properties.length; index1++){
                var p = this.properties[index1];
                if (Jsonix.Util.Type.exists(geometryProperty[p])) {
                    var converter0 = this.propertyConverters[p];
                    return converter0.createGeometryFromProperty(geometryProperty);
                }
            }
            throw "Geometry property [" + geometryProperty + "] is not supported.";
        }
    },
    createGeometryFromElement: function(geometryElement) {
        Jsonix.Util.Ensure.ensureObject(geometryElement);
        Jsonix.Util.Ensure.ensureObject(geometryElement.name);
        Jsonix.Util.Ensure.ensureObject(geometryElement.value);
        var key = Jsonix.XML.QName.fromObject(geometryElement.name).key;
        var converter1 = this.elementConverters[key];
        if (Jsonix.Util.Type.exists(converter1)) return converter1.createGeometryFromElement(geometryElement);
        else throw "Geometry element [" + key + "] is not supported.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardGeometryConverter"
});
GML_V_3_1_1.GeoJSON.ForwardLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    coordinateConverter: null,
    pointConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
        this.coordinateConverter = options.coordinateConverter;
        Jsonix.Util.Ensure.ensureObject(options.pointConverter);
        this.pointConverter = options.pointConverter;
    },
    doCreateGeometry: function(lineString) {
        if (Jsonix.Util.Type.exists(lineString.posOrPointPropertyOrPointRep)) {
            Jsonix.Util.Ensure.ensureArray(lineString.posOrPointPropertyOrPointRep);
            var coordinates0 = [];
            for(var index = 0; index < lineString.posOrPointPropertyOrPointRep.length; index++){
                var item = lineString.posOrPointPropertyOrPointRep[index];
                var name = item.name;
                var value = item.value;
                if (name.namespaceURI === "http://www.opengis.net/gml" && (name.localPart === "pointProperty" || name.localPart === "pointRep")) coordinates0.push(this.pointConverter.createGeometryFromProperty(value).coordinates);
                else if (name.namespaceURI === "http://www.opengis.net/gml" && name.localPart === "coord") coordinates0.push(this.coordinateConverter.createCoordinateFromCoordType(value));
                else if (name.namespaceURI === "http://www.opengis.net/gml" && name.localPart === "pos") coordinates0.push(this.coordinateConverter.createCoordinateFromDirectPositionType(value));
                else throw "Expected Unexpected type.";
            }
            return {
                type: "LineString",
                coordinates: coordinates0
            };
        } else if (Jsonix.Util.Type.exists(lineString.posList)) {
            var coordinates1 = this.coordinateConverter.createCoordinatesFromDirectPositionListType(lineString.posList);
            return {
                type: "LineString",
                coordinates: coordinates1
            };
        } else if (Jsonix.Util.Type.exists(lineString.coordinates)) {
            var coordinates2 = this.coordinateConverter.createCoordinatesFromCoordinatesType(lineString.coordinates);
            return {
                type: "LineString",
                coordinates: coordinates2
            };
        } else throw "Either [pos], [pointProperty], [pointRep], [coord] or [coordinates] elements are expected.";
    },
    createGeometryFromProperty: function(lineStringProperty) {
        if (Jsonix.Util.Type.exists(lineStringProperty.lineString)) return this.createGeometry(lineStringProperty.lineString);
        else throw "Expected [LineString] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardLineStringConverter"
});
GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.ForwardLineStringConverter, {
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.ForwardLineStringConverter.prototype.initialize.apply(this, [
            options
        ]);
    },
    createGeometryFromProperty: function(linearRingProperty) {
        if (Jsonix.Util.Type.exists(linearRingProperty.linearRing)) return {
            type: "LineString",
            coordinates: this.createGeometry(linearRingProperty.linearRing).coordinates
        };
        else throw "Expected [LinearRing] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter"
});
GML_V_3_1_1.GeoJSON.ForwardMultiGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    geometryConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.geometryConverter);
        this.geometryConverter = options.geometryConverter;
    },
    doCreateGeometry: function(multiGeometry) {
        var geometries = [];
        if (Jsonix.Util.Type.exists(multiGeometry.geometryMember)) {
            Jsonix.Util.Ensure.ensureArray(multiGeometry.geometryMember);
            for(var index0 = 0; index0 < multiGeometry.geometryMember.length; index0++)geometries.push(this.geometryConverter.createGeometryFromProperty(multiGeometry.geometryMember[index0]));
        }
        if (Jsonix.Util.Type.exists(multiGeometry.geometryMembers)) {
            Jsonix.Util.Ensure.ensureObject(multiGeometry.geometryMembers);
            Jsonix.Util.Ensure.ensureArray(multiGeometry.geometryMembers.geometry);
            for(var index1 = 0; index1 < multiGeometry.geometryMembers.geometry.length; index1++)geometries.push(this.geometryConverter.createGeometryFromElement(multiGeometry.geometryMembers.geometry[index1]));
        }
        return {
            type: "GeometryCollection",
            geometries: geometries
        };
    },
    createGeometryFromProperty: function(multiGeometryProperty) {
        if (Jsonix.Util.Type.exists(multiGeometryProperty.geometricAggregate)) return this.createGeometryFromElement(multiGeometryProperty.geometricAggregate);
        else throw "Expected [_GeometricAggregate] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter"
});
GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    lineStringConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.lineStringConverter);
        this.lineStringConverter = options.lineStringConverter;
    },
    doCreateGeometry: function(multiLineString) {
        var coordinates = [];
        if (Jsonix.Util.Type.exists(multiLineString.lineStringMember)) {
            Jsonix.Util.Ensure.ensureArray(multiLineString.lineStringMember);
            for(var index0 = 0; index0 < multiLineString.lineStringMember.length; index0++)coordinates.push(this.lineStringConverter.createGeometryFromProperty(multiLineString.lineStringMember[index0]).coordinates);
        }
        return {
            type: "MultiLineString",
            coordinates: coordinates
        };
    },
    createGeometryFromProperty: function(multiLineStringProperty) {
        if (Jsonix.Util.Type.exists(multiLineStringProperty.multiLineString)) return this.createGeometry(multiLineStringProperty.multiLineString);
        else throw "Expected [MultiLineString] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter"
});
GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    pointConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.pointConverter);
        this.pointConverter = options.pointConverter;
    },
    doCreateGeometry: function(multiPoint) {
        var coordinates = [];
        if (Jsonix.Util.Type.exists(multiPoint.pointMember)) {
            Jsonix.Util.Ensure.ensureArray(multiPoint.pointMember);
            for(var index0 = 0; index0 < multiPoint.pointMember.length; index0++)coordinates.push(this.pointConverter.createGeometryFromProperty(multiPoint.pointMember[index0]).coordinates);
        }
        if (Jsonix.Util.Type.exists(multiPoint.pointMembers)) {
            Jsonix.Util.Ensure.ensureObject(multiPoint.pointMembers);
            Jsonix.Util.Ensure.ensureArray(multiPoint.pointMembers.point);
            for(var index1 = 0; index1 < multiPoint.pointMembers.point.length; index1++)coordinates.push(this.pointConverter.createGeometry(multiPoint.pointMembers.point[index1]).coordinates);
        }
        return {
            type: "MultiPoint",
            coordinates: coordinates
        };
    },
    createGeometryFromProperty: function(multiPointProperty) {
        if (Jsonix.Util.Type.exists(multiPointProperty.multiPoint)) return this.createGeometry(multiPointProperty.multiPoint);
        else throw "Expected [MultiPoint] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter"
});
GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    polygonConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.polygonConverter);
        this.polygonConverter = options.polygonConverter;
    },
    doCreateGeometry: function(multiPolygon) {
        var coordinates = [];
        if (Jsonix.Util.Type.exists(multiPolygon.polygonMember)) {
            Jsonix.Util.Ensure.ensureArray(multiPolygon.polygonMember);
            for(var index0 = 0; index0 < multiPolygon.polygonMember.length; index0++)coordinates.push(this.polygonConverter.createGeometryFromProperty(multiPolygon.polygonMember[index0]).coordinates);
        }
        return {
            type: "MultiPolygon",
            coordinates: coordinates
        };
    },
    createGeometryFromProperty: function(multiPolygonProperty) {
        if (Jsonix.Util.Type.exists(multiPolygonProperty.multiPolygon)) return this.createGeometry(multiPolygonProperty.multiPolygon);
        else throw "Expected [MultiPolygon] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter"
});
GML_V_3_1_1.GeoJSON.ForwardPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    coordinateConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
        this.coordinateConverter = options.coordinateConverter;
    },
    doCreateGeometry: function(point) {
        if (Jsonix.Util.Type.exists(point.pos)) return {
            type: "Point",
            coordinates: this.coordinateConverter.createCoordinateFromDirectPositionType(point.pos)
        };
        else if (Jsonix.Util.Type.exists(point.coordinates)) {
            var coords = this.coordinateConverter.createCoordinatesFromCoordinatesType(point.coordinates);
            if (coords.length != 1) throw "Expected exactly one coordinate.";
            else return {
                type: "Point",
                coordinates: coords[0]
            };
        } else if (Jsonix.Util.Type.exists(point.coord)) return {
            type: "Point",
            coordinates: this.coordinateConverter.createCoordinateFromCoordType(point.coord)
        };
        else throw "Either [pos], [coordinates] or [coord] elements are expected.";
    },
    createGeometryFromProperty: function(pointProperty) {
        if (Jsonix.Util.Type.exists(pointProperty.point)) return this.createGeometry(pointProperty.point);
        else throw "Expected [Point] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardPointConverter"
});
GML_V_3_1_1.GeoJSON.ForwardPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
    linearRingConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.linearRingConverter);
        this.linearRingConverter = options.linearRingConverter;
    },
    doCreateGeometry: function(polygon) {
        var coordinates = [];
        if (Jsonix.Util.Type.exists(polygon.exterior)) {
            Jsonix.Util.Ensure.ensureObject(polygon.exterior);
            Jsonix.Util.Ensure.ensureObject(polygon.exterior.value);
            var shell = polygon.exterior.value;
            if (Jsonix.Util.Type.exists(shell.ring)) {
                Jsonix.Util.Ensure.ensureObject(shell.ring);
                Jsonix.Util.Ensure.ensureObject(shell.ring.value);
                coordinates.push(this.linearRingConverter.createGeometry(shell.ring.value).coordinates);
            } else throw "The [_Ring] element is expected.";
        } else throw "The [exterior] element is expected.";
        if (Jsonix.Util.Type.exists(polygon.interior)) {
            Jsonix.Util.Ensure.ensureArray(polygon.interior);
            var hole;
            for(var index = 0; index < polygon.interior.length; index++){
                Jsonix.Util.Ensure.ensureObject(polygon.interior[index]);
                Jsonix.Util.Ensure.ensureObject(polygon.interior[index].value);
                hole = polygon.interior[index].value;
                if (Jsonix.Util.Type.exists(hole.ring)) {
                    Jsonix.Util.Ensure.ensureObject(hole.ring);
                    Jsonix.Util.Ensure.ensureObject(hole.ring.value);
                    coordinates.push(this.linearRingConverter.createGeometry(hole.ring.value).coordinates);
                } else throw "The [_Ring] element is expected.";
            }
        }
        return {
            type: "Polygon",
            coordinates: coordinates
        };
    },
    createGeometryFromProperty: function(polygonProperty) {
        if (Jsonix.Util.Type.exists(polygonProperty.polygon)) return this.createGeometry(polygonProperty.polygon);
        else throw "Expected [Polygon] element.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.ForwardPolygonConverter"
});
GML_V_3_1_1.GeoJSON.InverseCoordinateConverter = Jsonix.Class({
    initialize: function() {},
    convertCoordinate: function(coordinate) {
        Jsonix.Util.Ensure.ensureArray(coordinate);
        if (coordinate.length < 2 || coordinate.length > 3) throw "Coordinate must contain two or three components.";
        Jsonix.Util.Ensure.ensureNumber(coordinate[0]);
        Jsonix.Util.Ensure.ensureNumber(coordinate[1]);
        if (coordinate.length > 2) {
            Jsonix.Util.Ensure.ensureNumber(coordinate[2]);
            return {
                value: [
                    coordinate[0],
                    coordinate[1],
                    coordinate[2]
                ]
            };
        } else return {
            value: [
                coordinate[0],
                coordinate[1]
            ]
        };
    },
    convertCoordinates: function(coordinates) {
        Jsonix.Util.Ensure.ensureArray(coordinates);
        var directPositions = [];
        if (coordinates.length > 0) {
            var firstCoordinate = this.convertCoordinate(coordinates[0]);
            var dimension = firstCoordinate.value.length;
            var index, jndex;
            var coordinate;
            for(index = 0; index < coordinates.length; index++){
                coordinate = this.convertCoordinate(coordinates[index]);
                if (coordinate.value.length !== dimension) throw "Not all of the coordinates have the same number of components [" + dimension + "].";
                for(jndex = 0; jndex < dimension; jndex++)directPositions.push(coordinate.value[jndex]);
            }
            return {
                value: directPositions,
                srsDimension: dimension
            };
        } else return {
            value: []
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseCoordinateConverter"
});
GML_V_3_1_1.GeoJSON.InversePointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    coordinateConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
        this.coordinateConverter = options.coordinateConverter;
    },
    doCreateGeometryType: function(point) {
        Jsonix.Util.Ensure.ensureObject(point);
        Jsonix.Util.Ensure.ensureArray(point.coordinates);
        var resultPoint = {};
        var directPosition = this.coordinateConverter.convertCoordinate(point.coordinates);
        resultPoint.pos = directPosition;
        return resultPoint;
    },
    createPropertyType: function(point) {
        var pointPropertyType = {};
        pointPropertyType.point = this.createGeometryType(point);
        return pointPropertyType;
    },
    createElement: function(point) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "Point"),
            value: this.createGeometryType(point)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InversePointConverter"
});
GML_V_3_1_1.GeoJSON.InverseGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    coordinateConverter: null,
    pointConverter: null,
    lineStringConverter: null,
    linearRingConverter: null,
    polygonConverter: null,
    multiPointConverter: null,
    multiLineStringConverter: null,
    multiPolygonConverter: null,
    multiGeometryConverter: null,
    converters: null,
    initialize: function() {
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, arguments);
        this.coordinateConverter = new GML_V_3_1_1.GeoJSON.InverseCoordinateConverter();
        this.pointConverter = new GML_V_3_1_1.GeoJSON.InversePointConverter({
            coordinateConverter: this.coordinateConverter
        });
        this.lineStringConverter = new GML_V_3_1_1.GeoJSON.InverseLineStringConverter({
            coordinateConverter: this.coordinateConverter,
            pointConverter: this.pointConverter
        });
        this.linearRingConverter = new GML_V_3_1_1.GeoJSON.InverseLinearRingConverter({
            coordinateConverter: this.coordinateConverter,
            pointConverter: this.pointConverter
        });
        this.polygonConverter = new GML_V_3_1_1.GeoJSON.InversePolygonConverter({
            linearRingConverter: this.linearRingConverter
        });
        this.multiPointConverter = new GML_V_3_1_1.GeoJSON.InverseMultiPointConverter({
            pointConverter: this.pointConverter
        });
        this.multiLineStringConverter = new GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter({
            lineStringConverter: this.lineStringConverter
        });
        this.multiPolygonConverter = new GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter({
            polygonConverter: this.polygonConverter
        });
        this.multiGeometryConverter = new GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter({
            geometryConverter: this
        });
        this.converters = {
            "Point": this.pointConverter,
            "LineString": this.lineStringConverter,
            "Polygon": this.polygonConverter,
            "MultiPoint": this.multiPointConverter,
            "MultiLineString": this.multiLineStringConverter,
            "MultiPolygon": this.multiPolygonConverter,
            "GeometryCollection": this.multiGeometryConverter
        };
    },
    doCreateGeometryType: function(geometry) {
        Jsonix.Util.Ensure.ensureObject(geometry);
        Jsonix.Util.Ensure.ensureString(geometry.type);
        var converter0 = this.converters[geometry.type];
        if (Jsonix.Util.Type.exists(converter0)) return converter0.createGeometryType(geometry);
        else throw "Geometry type [" + geometry.type + "] is not supported.";
    },
    createPropertyType: function(geometry) {
        var geometryPropertyType = {};
        geometryPropertyType.geometry = this.createElement(geometry);
        return geometryPropertyType;
    },
    createElement: function(geometry) {
        Jsonix.Util.Ensure.ensureObject(geometry);
        Jsonix.Util.Ensure.ensureString(geometry.type);
        var converter1 = this.converters[geometry.type];
        if (Jsonix.Util.Type.exists(converter1)) return converter1.createElement(geometry);
        else throw "Geometry type [" + geometry.type + "] is not supported.";
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseGeometryConverter"
});
GML_V_3_1_1.GeoJSON.InverseLinearRingConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.InverseLineStringConverter, {
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.InverseLineStringConverter.prototype.initialize.apply(this, [
            options
        ]);
    },
    createElement: function(linearRing) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "LinearRing"),
            value: this.createGeometryType(linearRing)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseLinearRingConverter"
});
GML_V_3_1_1.GeoJSON.InverseLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    coordinateConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
        this.coordinateConverter = options.coordinateConverter;
    },
    doCreateGeometryType: function(lineString) {
        Jsonix.Util.Ensure.ensureObject(lineString);
        Jsonix.Util.Ensure.ensureArray(lineString.coordinates);
        var resultLineString = {
            posList: this.coordinateConverter.convertCoordinates(lineString.coordinates)
        };
        return resultLineString;
    },
    createPropertyType: function(lineString) {
        var lineStringPropertyType = {};
        lineStringPropertyType.lineString = this.createGeometryType(lineString);
        return lineStringPropertyType;
    },
    createElement: function(lineString) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "LineString"),
            value: this.createGeometryType(lineString)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseLineStringConverter"
});
GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    geometryConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.geometryConverter);
        this.geometryConverter = options.geometryConverter;
    },
    doCreateGeometryType: function(multiGeometry) {
        Jsonix.Util.Ensure.ensureObject(multiGeometry);
        Jsonix.Util.Ensure.ensureArray(multiGeometry.geometries);
        var resultMultiGeometry = {
            geometryMember: []
        };
        for(var index = 0; index < multiGeometry.geometries.length; index++)resultMultiGeometry.geometryMember.push(this.geometryConverter.createPropertyType(multiGeometry.geometries[index]));
        return resultMultiGeometry;
    },
    createPropertyType: function(multiGeometry) {
        var multiGeometryPropertyType = {};
        multiGeometryPropertyType.multiGeometry = this.createGeometryType(multiGeometry);
        return multiGeometryPropertyType;
    },
    createElement: function(multiGeometry) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiGeometry"),
            value: this.createGeometryType(multiGeometry)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter"
});
GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    lineStringConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.lineStringConverter);
        this.lineStringConverter = options.lineStringConverter;
    },
    doCreateGeometryType: function(multiLineString) {
        Jsonix.Util.Ensure.ensureObject(multiLineString);
        Jsonix.Util.Ensure.ensureArray(multiLineString.coordinates);
        var resultMultiLineString = {
            lineStringMember: []
        };
        for(var index = 0; index < multiLineString.coordinates.length; index++)resultMultiLineString.lineStringMember.push(this.lineStringConverter.createPropertyType({
            type: "LineString",
            coordinates: multiLineString.coordinates[index]
        }));
        return resultMultiLineString;
    },
    createPropertyType: function(multiLineString) {
        var multiLineStringPropertyType = {};
        multiLineStringPropertyType.multiLineString = this.createGeometryType(multiLineString);
        return multiLineStringPropertyType;
    },
    createElement: function(multiLineString) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiLineString"),
            value: this.createGeometryType(multiLineString)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter"
});
GML_V_3_1_1.GeoJSON.InverseMultiPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    pointConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.pointConverter);
        this.pointConverter = options.pointConverter;
    },
    doCreateGeometryType: function(multiPoint) {
        Jsonix.Util.Ensure.ensureObject(multiPoint);
        Jsonix.Util.Ensure.ensureArray(multiPoint.coordinates);
        var resultMultiPoint = {
            pointMember: []
        };
        for(var index = 0; index < multiPoint.coordinates.length; index++)resultMultiPoint.pointMember.push(this.pointConverter.createPropertyType({
            type: "Point",
            coordinates: multiPoint.coordinates[index]
        }));
        return resultMultiPoint;
    },
    createPropertyType: function(multiPoint) {
        var multiPointPropertyType = {};
        multiPointPropertyType.multiPoint = this.createGeometryType(multiPoint);
        return multiPointPropertyType;
    },
    createElement: function(multiPoint) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiPoint"),
            value: this.createGeometryType(multiPoint)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseMultiPointConverter"
});
GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    polygonConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.polygonConverter);
        this.polygonConverter = options.polygonConverter;
    },
    doCreateGeometryType: function(multiPolygon) {
        Jsonix.Util.Ensure.ensureObject(multiPolygon);
        Jsonix.Util.Ensure.ensureArray(multiPolygon.coordinates);
        var resultMultiPolygon = {
            polygonMember: []
        };
        for(var index = 0; index < multiPolygon.coordinates.length; index++)resultMultiPolygon.polygonMember.push(this.polygonConverter.createPropertyType({
            type: "Polygon",
            coordinates: multiPolygon.coordinates[index]
        }));
        return resultMultiPolygon;
    },
    createPropertyType: function(multiPolygon) {
        var multiPolygonPropertyType = {};
        multiPolygonPropertyType.multiPolygon = this.createGeometryType(multiPolygon);
        return multiPolygonPropertyType;
    },
    createElement: function(multiPolygon) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiPolygon"),
            value: this.createGeometryType(multiPolygon)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter"
});
GML_V_3_1_1.GeoJSON.InversePolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
    linearRingConverter: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [
            options
        ]);
        Jsonix.Util.Ensure.ensureObject(options.linearRingConverter);
        this.linearRingConverter = options.linearRingConverter;
    },
    doCreateGeometryType: function(polygon) {
        Jsonix.Util.Ensure.ensureObject(polygon);
        Jsonix.Util.Ensure.ensureArray(polygon.coordinates);
        if (polygon.coordinates.length < 0) throw "At least one element (shell) is expected in the coordinates array.";
        var resultPolygon = {};
        Jsonix.Util.Ensure.ensureArray(polygon.coordinates[0]);
        resultPolygon.exterior = {};
        resultPolygon.exterior = {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "exterior"),
            value: {
                ring: this.linearRingConverter.createElement({
                    type: "LinearRing",
                    coordinates: polygon.coordinates[0]
                })
            }
        };
        if (polygon.coordinates.length > 1) {
            resultPolygon.interior = [];
            for(var index = 1; index < polygon.coordinates.length; index++)resultPolygon.interior.push({
                name: new Jsonix.XML.QName("http://www.opengis.net/gml", "interior"),
                value: {
                    ring: this.linearRingConverter.createElement({
                        type: "LinearRing",
                        coordinates: polygon.coordinates[index]
                    })
                }
            });
        }
        return resultPolygon;
    },
    createPropertyType: function(polygon) {
        var polygonPropertyType = {};
        polygonPropertyType.polygon = this.createGeometryType(polygon);
        return polygonPropertyType;
    },
    createElement: function(polygon) {
        return {
            name: new Jsonix.XML.QName("http://www.opengis.net/gml", "Polygon"),
            value: this.createGeometryType(polygon)
        };
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.InversePolygonConverter"
});
GML_V_3_1_1.GeoJSON.GeometryAdapter = Jsonix.Class({
    forwardGeometryConverter: null,
    inverseGeometryConverter: null,
    initialize: function(options) {
        this.forwardGeometryConverter = new GML_V_3_1_1.GeoJSON.ForwardGeometryConverter();
        this.inverseGeometryConverter = new GML_V_3_1_1.GeoJSON.InverseGeometryConverter();
    },
    unmarshal: function(context, input, typeInfo) {
        var name = Jsonix.XML.QName.fromObject(input.getName());
        var value = typeInfo.unmarshal(context, input);
        var geometryElement = {
            name: name,
            value: value
        };
        var geometry = this.forwardGeometryConverter.createGeometryFromElement(geometryElement);
        return geometry;
    },
    marshal: function(context, geometry, output, typeInfo) {
        var geometryElement = this.inverseGeometryConverter.createElement(geometry);
        typeInfo.marshal(context, geometryElement.value, output);
    },
    CLASS_NAME: "GML_V_3_1_1.GeoJSON.GeometryAdapter"
});
GML_V_3_1_1.GeoJSON.GeometryAdapter.INSTANCE = new GML_V_3_1_1.GeoJSON.GeometryAdapter();

});


parcelRequire.register("dt7Im", function(module, exports) {

var $9ce3f7c162df812e$export$2e2bcd8739ae039 = window.XLink_1_0 = (0, $hzBBV$w3cschemaslibXLink_1_0.XLink_1_0);

});

parcelRequire.register("5jtNU", function(module, exports) {




























window.OWS_1_0_0 = (0, $hzBBV$ogcschemaslibOWS_1_0_0.OWS_1_0_0);
window.OWS_1_1_0 = (0, $hzBBV$ogcschemaslibOWS_1_1_0.OWS_1_1_0);
window.OWS_2_0 = (0, $hzBBV$ogcschemaslibOWS_2_0.OWS_2_0);
window.DC_1_1 = (0, $hzBBV$ogcschemaslibDC_1_1.DC_1_1);
window.DCT = (0, $hzBBV$ogcschemaslibDCT.DCT);
window.CSW_2_0_2 = (0, $hzBBV$ogcschemaslibCSW_2_0_2_Full.CSW_2_0_2);
window.WMS_1_1_1 = (0, $hzBBV$ogcschemaslibWMS_1_1_1.WMS_1_1_1);
window.WMS_1_3_0 = (0, $hzBBV$ogcschemaslibWMS_1_3_0.WMS_1_3_0);
window.Filter_1_1_0 = (0, $hzBBV$ogcschemaslibFilter_1_1_0.Filter_1_1_0);
window.GML_3_1_1 = (0, $hzBBV$ogcschemaslibGML_3_1_1.GML_3_1_1);
window.GML_3_2_0 = (0, $hzBBV$ogcschemaslibGML_3_2_0.GML_3_2_0);
window.GML_3_2_1 = (0, $hzBBV$ogcschemaslibGML_3_2_1.GML_3_2_1);
window.SMIL_2_0_Language = (0, $hzBBV$ogcschemaslibSMIL_2_0_Language.SMIL_2_0_Language);
window.SMIL_2_0 = (0, $hzBBV$ogcschemaslibSMIL_2_0.SMIL_2_0);
window.ISO19139_GCO_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GCO_20060504.ISO19139_GCO_20060504);
window.ISO19139_GMD_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GMD_20060504.ISO19139_GMD_20060504);
window.ISO19139_GTS_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GTS_20060504.ISO19139_GTS_20060504);
window.ISO19139_GSS_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GSS_20060504.ISO19139_GSS_20060504);
window.ISO19139_GSR_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GSR_20060504.ISO19139_GSR_20060504);
window.ISO19139_GMX_20060504 = (0, $hzBBV$ogcschemaslibISO19139_GMX_20060504.ISO19139_GMX_20060504);
window.ISO19139_SRV_20060504 = (0, $hzBBV$ogcschemaslibISO19139_SRV_20060504.ISO19139_SRV_20060504);
window.ISO19139_GCO_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GCO_20070417.ISO19139_GCO_20070417);
window.ISO19139_GMD_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GMD_20070417.ISO19139_GMD_20070417);
window.ISO19139_GTS_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GTS_20070417.ISO19139_GTS_20070417);
window.ISO19139_GSS_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GSS_20070417.ISO19139_GSS_20070417);
window.ISO19139_GSR_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GSR_20070417.ISO19139_GSR_20070417);
window.ISO19139_GMX_20070417 = (0, $hzBBV$ogcschemaslibISO19139_GMX_20070417.ISO19139_GMX_20070417);
window.ISO19139_2_GMI_1_0 = (0, $hzBBV$ogcschemaslibISO19139_2_GMI_1_0.ISO19139_2_GMI_1_0);

});

parcelRequire.register("9Kl7j", function(module, exports) {

$parcel$export(module.exports, "default", () => $7188ca57589dfc5f$export$2e2bcd8739ae039);
class $7188ca57589dfc5f$var$CSWConstraint {
    constructor(version, filter){
        var owsVersion = null;
        switch(version){
            case "2.0.2":
                owsVersion = "1.1.0";
                break;
            case "3.0.0":
                owsVersion = "2.0";
                break;
        }
        this.TYPE_NAME = "CSW_" + version.replaceAll(".", "_") + ".QueryConstraintType";
        this.version = owsVersion;
        this.filter = filter.get();
    }
}
var $7188ca57589dfc5f$export$2e2bcd8739ae039 = $7188ca57589dfc5f$var$CSWConstraint;

});

parcelRequire.register("h8Opi", function(module, exports) {

$parcel$export(module.exports, "default", () => $c7aa48d0d33be2e1$export$2e2bcd8739ae039);
class $c7aa48d0d33be2e1$var$CSWQuery {
    constructor(version, elementSetName, constraint){
        this["csw:Query"] = {
            TYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".QueryType",
            elementSetName: {
                TYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".ElementSetNameType",
                value: elementSetName
            },
            typeNames: [
                {
                    key: "{http://www.opengis.net/cat/csw/" + version + "}Record",
                    localPart: "Record",
                    namespaceURI: "http://www.opengis.net/cat/csw/" + version,
                    prefix: "csw",
                    string: "{http://www.opengis.net/cat/csw/" + version + "}csw:Record"
                }
            ]
        };
        if (constraint) {
            this["csw:Query"].constraint = constraint;
            console.log(this);
        }
    }
}
var $c7aa48d0d33be2e1$export$2e2bcd8739ae039 = $c7aa48d0d33be2e1$var$CSWQuery;

});

parcelRequire.register("1lsLX", function(module, exports) {

$parcel$export(module.exports, "default", () => $0fae123c152ae48e$export$2e2bcd8739ae039);
class $0fae123c152ae48e$var$Filter {
    constructor(version, schemas){
        this.version = version;
        this.object = new Object();
        this.object["ogc:Filter"] = {
            TYPE_NAME: "Filter_" + this.version.replaceAll(".", "_") + ".FilterType"
        };
        var contextSchemas = [
            OWS_1_0_0,
            DC_1_1,
            DCT,
            XLink_1_0,
            SMIL_2_0,
            SMIL_2_0_Language,
            GML_3_1_1
        ];
        switch(this.version){
            case "1.1.0":
                contextSchemas.push(Filter_1_1_0);
                for(var i = 0; i < schemas.length; i++)contextSchemas.push(schemas[i]);
                break;
            case "2.0":
                contextSchemas.push(Filter_2_0);
                for(var i = 0; i < schemas.length; i++)contextSchemas.push(schemas[i]);
                break;
        }
        this.jsonixContext = new Jsonix.Context(contextSchemas, {
            namespacePrefixes: {
                "http://www.opengis.net/cat/csw/2.0.2": "csw",
                "http://www.opengis.net/ogc": "ogc",
                "http://www.opengis.net/gml": "gml"
            },
            mappingStyle: "simplified"
        });
    }
    get() {
        return this.object;
    }
    getJsonixContext() {
        return this.jsonixContext;
    }
    getXML() {
        var doc;
        var marshaller = this.getJsonixContext().createMarshaller();
        doc = marshaller.marshalDocument(this);
        return doc;
    }
    getBasicFilterFromXML(xml) {
        var unmarshaller = this.getJsonixContext().createUnmarshaller();
        return unmarshaller.unmarshalDocument(xml);
    }
    static getOperator(filter) {
        var operator;
        if (typeof filter.object["ogc:Filter"].comparisonOps !== "undefined") // Only has one previous filter and it is a comparison operator.
        operator = filter.object["ogc:Filter"].comparisonOps;
        else if (typeof filter.object["ogc:Filter"].spatialOps !== "undefined") // Only has one previous filter and it is a spatial operator.
        operator = filter.object["ogc:Filter"].spatialOps;
        else if (typeof filter.object["ogc:Filter"].logicOps !== "undefined") operator = filter.object["ogc:Filter"].logicOps;
        else {
            console.error(filter);
            throw "Not Implemented yet, another operators";
        }
        return operator;
    }
}
var $0fae123c152ae48e$export$2e2bcd8739ae039 = $0fae123c152ae48e$var$Filter;

});

parcelRequire.register("MXQFO", function(module, exports) {

$parcel$export(module.exports, "default", () => $0932e87d38fb97a4$export$2e2bcd8739ae039);

var $1lsLX = parcelRequire("1lsLX");
class $0932e87d38fb97a4$var$IsLike extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsLike": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsLikeType",
                escapeChar: "",
                singleChar: "_",
                wildCard: "%",
                literal: {
                    TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                    content: [
                        literal
                    ]
                },
                propertyName: {
                    TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                    content: [
                        propertyName
                    ]
                }
            }
        };
    }
}
var $0932e87d38fb97a4$export$2e2bcd8739ae039 = $0932e87d38fb97a4$var$IsLike;

});

parcelRequire.register("6d4gj", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $485743523774ae24$var$IsEqualTo extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal, matchCase){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsEqualTo": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsEqualTo",
                matchCase: matchCase ? matchCase : false,
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $485743523774ae24$export$2e2bcd8739ae039 = $485743523774ae24$var$IsEqualTo;

});

parcelRequire.register("7Fhga", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $5949c02d2e5cca68$var$IsNotEqualTo extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsNotEqualTo": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsNotEqualTo",
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $5949c02d2e5cca68$export$2e2bcd8739ae039 = $5949c02d2e5cca68$var$IsNotEqualTo;

});

parcelRequire.register("9Mx5c", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $71f2424e9a1d6339$var$IsLessThan extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsLessThan": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsLessThan",
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $71f2424e9a1d6339$export$2e2bcd8739ae039 = $71f2424e9a1d6339$var$IsLessThan;

});

parcelRequire.register("38N2h", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $249827eb042c45cc$var$IsLessThanOrEqualTo extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsLessThanOrEqualTo": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsLessThanOrEqualTo",
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $249827eb042c45cc$export$2e2bcd8739ae039 = $249827eb042c45cc$var$IsLessThanOrEqualTo;

});

parcelRequire.register("82GVD", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $5dafcf5993034956$var$IsGreaterThan extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsGreaterThan": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsGreaterThan",
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $5dafcf5993034956$export$2e2bcd8739ae039 = $5dafcf5993034956$var$IsGreaterThan;

});

parcelRequire.register("DS9GW", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $077da6c02181bb5d$var$IsGreaterThanOrEqualTo extends (0, $1lsLX.default) {
    constructor(version, schemas, propertyName, literal){
        super(version, schemas);
        this.object["ogc:Filter"].comparisonOps = {
            "ogc:PropertyIsGreaterThanOrEqualTo": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyIsGreaterThanOrEqualTo",
                expression: [
                    {
                        "ogc:Literal": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".LiteralType",
                            content: [
                                literal
                            ]
                        }
                    },
                    {
                        "ogc:PropertyName": {
                            TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".PropertyNameType",
                            content: [
                                propertyName
                            ]
                        }
                    }
                ]
            }
        };
    }
}
var $077da6c02181bb5d$export$2e2bcd8739ae039 = $077da6c02181bb5d$var$IsGreaterThanOrEqualTo;

});

parcelRequire.register("8rzju", function(module, exports) {

$parcel$export(module.exports, "default", () => $625c3cd50d5657e5$export$2e2bcd8739ae039);

var $1lsLX = parcelRequire("1lsLX");
class $625c3cd50d5657e5$var$BBOX extends (0, $1lsLX.default) {
    constructor(version, llat, llon, ulat, ulon, srsName){
        super(version);
        this.object["ogc:Filter"].spatialOps = {
            "ogc:BBOX": {
                TYPE_NAME: "Filter_" + version.replaceAll(".", "_") + ".BBOXType",
                envelope: {
                    "gml:Envelope": {
                        TYPE_NAME: "GML_3_1_1.EnvelopeType",
                        lowerCorner: {
                            TYPE_NAME: "GML_3_1_1.DirectPositionType",
                            value: [
                                llat,
                                llon
                            ]
                        },
                        upperCorner: {
                            TYPE_NAME: "GML_3_1_1.DirectPositionType",
                            value: [
                                ulat,
                                ulon
                            ]
                        },
                        srsName: srsName
                    }
                }
            }
        };
    }
}
var $625c3cd50d5657e5$export$2e2bcd8739ae039 = $625c3cd50d5657e5$var$BBOX;

});

parcelRequire.register("kgzwJ", function(module, exports) {

$parcel$export(module.exports, "default", () => $ec10dc2a8274b736$export$2e2bcd8739ae039);

var $1lsLX = parcelRequire("1lsLX");
class $ec10dc2a8274b736$var$And extends (0, $1lsLX.default) {
    constructor(version, schemas, filters){
        super(version, schemas);
        this.object["ogc:Filter"].logicOps = {
            "ogc:And": {
                TYPE_NAME: "Filter_1_1_0.BinaryLogicOpType"
            }
        };
        this.object["ogc:Filter"].logicOps["ogc:And"].ops = filters.map(function(filter) {
            return (0, $1lsLX.default).getOperator(filter);
        });
    }
}
var $ec10dc2a8274b736$export$2e2bcd8739ae039 = $ec10dc2a8274b736$var$And;

});

parcelRequire.register("d7Gjo", function(module, exports) {

$parcel$export(module.exports, "default", () => $98dcc00b2ac5f2de$export$2e2bcd8739ae039);

var $1lsLX = parcelRequire("1lsLX");
class $98dcc00b2ac5f2de$var$Or extends (0, $1lsLX.default) {
    constructor(version, schemas, filters){
        super(version, schemas);
        this.object["ogc:Filter"].logicOps = {
            "ogc:Or": {
                TYPE_NAME: "Filter_1_1_0.BinaryLogicOpType"
            }
        };
        this.object["ogc:Filter"].logicOps["ogc:Or"].ops = filters.map(function(filter) {
            return (0, $1lsLX.default).getOperator(filter);
        });
    }
}
var $98dcc00b2ac5f2de$export$2e2bcd8739ae039 = $98dcc00b2ac5f2de$var$Or;

});

parcelRequire.register("a24tQ", function(module, exports) {

var $1lsLX = parcelRequire("1lsLX");
class $74dd9100cdfd1c4b$var$Not extends (0, $1lsLX.default) {
    constructor(version, schemas, filter){
        super(version, schemas);
        this.object["ogc:Filter"].logicOps = {
            "ogc:Not": {
                TYPE_NAME: "Filter_1_1_0.UnaryLogicOpType"
            }
        };
        console.log((0, $1lsLX.default).getOperator(filter));
        var filters = new Array();
        filters.push((0, $1lsLX.default).getOperator(filter));
        this.object["ogc:Filter"].logicOps["ogc:Not"].comparisonOps = (0, $1lsLX.default).getOperator(filter);
    }
}
var $74dd9100cdfd1c4b$export$2e2bcd8739ae039 = $74dd9100cdfd1c4b$var$Not;

});

parcelRequire.register("6eueJ", function(module, exports) {

$parcel$export(module.exports, "default", () => $489b814278c628cf$export$2e2bcd8739ae039);
parcelRequire("gRlUG");
parcelRequire("5jtNU");

var $bmB1l = parcelRequire("bmB1l");

var $gtKiJ = parcelRequire("gtKiJ");

var $gjH1l = parcelRequire("gjH1l");

var $hIKYK = parcelRequire("hIKYK");
parcelRequire("bUqtq");

var $9Kl7j = parcelRequire("9Kl7j");

var $h8Opi = parcelRequire("h8Opi");
parcelRequire("1lsLX");
parcelRequire("MXQFO");
parcelRequire("6d4gj");
parcelRequire("7Fhga");
parcelRequire("9Mx5c");
parcelRequire("38N2h");
parcelRequire("82GVD");
parcelRequire("DS9GW");
parcelRequire("8rzju");
parcelRequire("kgzwJ");
parcelRequire("d7Gjo");
class $489b814278c628cf$var$CSW extends (0, $bmB1l.default) {
    constructor(url, version, config){
        var owsVersion = null;
        switch(version){
            case "2.0.2":
                owsVersion = "1.1.0";
                break;
            case "3.0.0":
                owsVersion = "2.0";
                break;
        }
        super(url, owsVersion, config);
        this.version = version;
        /**
		 * Jsonix Configuration
		 * */ if (config == null) throw "Missing Configuration! It is a must to CSW to know the profile";
        else if (config[2] != undefined) this.credentials = config[2];
        this.jsonnixContext = new Jsonix.Context(config[0], config[1]);
        // init by doing a GetCapabilities and parsing metadata
        this.url = url;
    }
    GetCapabilities() {
        var getCapabilities = new (0, $gtKiJ.default)(this.owsVersion, this.version);
        // XML to Post.
        var myXML = this.marshalDocument(getCapabilities);
        var this_ = this;
        return this.httpPost(this.url, "application/xml", myXML, this.credentials).then(function(responseXML) {
            var capabilities = this_.unmarshalDocument(responseXML);
            console.log(capabilities);
            return capabilities;
        });
    }
    GetDomain(propertyName) {
        var this_ = this;
        var getdomainAction = new GetDomain(this.owsVersion, this.version, propertyName);
        var myXML = this.marshalDocument(getdomainAction);
        return Ows4js.Util.httpPost(this.url, "application/xml", myXML, this.credentials).then(function(responseXML) {
            return this_.unmarshalDocument(responseXML);
        });
    }
    GetRecords(startPosition, maxRecords, filter, outputSchema) {
        var this_ = this;
        var query;
        if (filter === undefined || filter === null) query = new (0, $h8Opi.default)(this.version, "full");
        else // Create Query
        query = new (0, $h8Opi.default)(this.version, "full", new (0, $9Kl7j.default)(this.version, filter));
        // Create de GetRecords Action.
        var recordAction = new (0, $gjH1l.default)(this.owsVersion, this.version, startPosition, maxRecords, query, outputSchema);
        // XML to Post.
        var myXML = this.marshalDocument(recordAction);
        console.log(recordAction);
        console.log(myXML);
        // Post XML
        return this.httpPost(this.url, "application/xml", myXML, this.credentials).then(function(responseXML) {
            var records = this_.unmarshalDocument(responseXML);
            console.log(records);
            return records;
        });
    }
    GetRecordById(ids, outputSchema) {
        var this_ = this;
        var byIdAction = new (0, $hIKYK.default)(this.owsVersion, this.version, ids, outputSchema);
        //console.log(byIdAction);
        var myXML = this.marshalDocument(byIdAction);
        //console.log(myXML);
        return this.httpPost(this.url, "application/xml", myXML, this.credentials).then(function(responseXML) {
            var records = this_.unmarshalDocument(responseXML);
            console.log(records);
            return records;
        });
    }
}
var $489b814278c628cf$export$2e2bcd8739ae039 = $489b814278c628cf$var$CSW;

});
parcelRequire.register("bmB1l", function(module, exports) {

$parcel$export(module.exports, "default", () => $845e774e20dd8ed1$export$2e2bcd8739ae039);
parcelRequire("gRlUG");
parcelRequire("5jtNU");
class $845e774e20dd8ed1$var$OWS {
    constructor(url, owsVersion, config){
        this.url = url;
        this.owsVersion = owsVersion;
        this.config = config;
    }
    httpGet(url) {
        return new Promise(function(fulfill, reject) {
            var httpRequest;
            try {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    httpRequest = new XMLHttpRequest();
                }
                httpRequest.onreadystatechange = function() {
                    if (httpRequest.readyState == 4 && httpRequest.status == 200) fulfill(httpRequest.responseXML);
                };
                httpRequest.open("GET", url, true);
                httpRequest.send(null);
                return httpRequest;
            } catch (e1) {
                throw e1;
            }
        });
    }
    httpPost(url, lang, request, credentials) {
        return new Promise(function(fulfill, reject) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    console.log(request);
                    fulfill(httpRequest.responseXML);
                }
            };
            httpRequest.open("POST", url, true);
            httpRequest.setRequestHeader("Accept-Language", lang);
            if (credentials != undefined && credentials.user != undefined && credentials.pass != undefined) httpRequest.setRequestHeader("Authorization", "Basic " + btoa(credentials.user + ":" + credentials.pass));
            httpRequest.send(request);
        });
    }
    buildUrl(url, params) {
        var kvps = [];
        for(var key in params)if (params[key] !== null) kvps.push(key + "=" + params[key]);
        return url + "?" + kvps.join("&");
    }
    marshalDocument(object) {
        return this.jsonnixContext.createMarshaller().marshalDocument(object);
    }
    unmarshalDocument(xml) {
        return this.jsonnixContext.createUnmarshaller().unmarshalDocument(xml);
    }
    xmlToObject(xml) {
        return this.unmarshalDocument(xml);
    }
    objectToXML(object) {
        return this.marshalDocument(object);
    }
    unmarshalString(string) {
        return this.jsonnixContext.createUnmarshaller().unmarshalString(string);
    }
}
var $845e774e20dd8ed1$export$2e2bcd8739ae039 = $845e774e20dd8ed1$var$OWS;

});

parcelRequire.register("gtKiJ", function(module, exports) {

$parcel$export(module.exports, "default", () => $bff3453064c1ddcb$export$2e2bcd8739ae039);
class $bff3453064c1ddcb$var$CSWCapabilities {
    constructor(owsVersion, version){
        this["csw:GetCapabilities"] = {
            "TYPE_NAME": "CSW_" + version.replaceAll(".", "_") + ".GetCapabilitiesType",
            "service": "CSW",
            "acceptVersions": {
                "TYPE_NAME": "OWS_" + owsVersion.replaceAll(".", "_") + ".AcceptVersionsType",
                "version": [
                    version
                ]
            },
            "acceptFormats": {
                "TYPE_NAME": "OWS_" + owsVersion.replaceAll(".", "_") + ".AcceptFormatsType",
                "outputFormat": [
                    "application/xml"
                ]
            }
        };
    }
}
var $bff3453064c1ddcb$export$2e2bcd8739ae039 = $bff3453064c1ddcb$var$CSWCapabilities;

});

parcelRequire.register("gjH1l", function(module, exports) {

$parcel$export(module.exports, "default", () => $be0fcab872b6df0c$export$2e2bcd8739ae039);
class $be0fcab872b6df0c$var$CSWGetRecords {
    constructor(owsVersion, version, startPosition, maxRecords, query, outputSchema){
        this["csw:GetRecords"] = {
            TYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".GetRecordsType",
            abstractQuery: query,
            startPosition: startPosition,
            maxRecords: maxRecords,
            resultType: "results",
            service: "CSW",
            version: version
        };
        if (outputSchema) this["csw:GetRecords"].outputSchema = outputSchema;
    }
}
var $be0fcab872b6df0c$export$2e2bcd8739ae039 = $be0fcab872b6df0c$var$CSWGetRecords;

});

parcelRequire.register("hIKYK", function(module, exports) {

$parcel$export(module.exports, "default", () => $ce6afcc20f559746$export$2e2bcd8739ae039);
class $ce6afcc20f559746$var$CSWGetRecordById {
    constructor(owsVersion, version, ids, outputSchema){
        this["csw:GetRecordById"] = {
            TYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".GetRecordByIdType",
            elementSetName: {
                ObjectTYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".ElementSetNameType",
                value: "full"
            },
            id: ids,
            service: "CSW",
            version: version
        };
        if (outputSchema) this["csw:GetRecordById"].outputSchema = outputSchema;
    }
}
var $ce6afcc20f559746$export$2e2bcd8739ae039 = $ce6afcc20f559746$var$CSWGetRecordById;

});

parcelRequire.register("bUqtq", function(module, exports) {
class $8ab975c7d0d5c2c6$var$CSWGetDomain {
    constructor(owsVersion, version, propertyName){
        this["csw:GetDomain"] = {
            TYPE_NAME: "CSW_" + version.replaceAll(".", "_") + ".GetDomainType",
            propertyName: propertyName,
            service: "CSW",
            version: version
        };
    }
}
var $8ab975c7d0d5c2c6$export$2e2bcd8739ae039 = $8ab975c7d0d5c2c6$var$CSWGetDomain;

});


parcelRequire.register("a7gdG", function(module, exports) {

$parcel$export(module.exports, "default", () => $75d723b6e4868fdf$export$2e2bcd8739ae039);
parcelRequire("gRlUG");
parcelRequire("5jtNU");

var $bmB1l = parcelRequire("bmB1l");
class $75d723b6e4868fdf$var$WMS extends (0, $bmB1l.default) {
    constructor(url, version, config){
        var owsVersion = null;
        switch(version){
            case "1.1.1":
                owsVersion = "1.1.0";
                break;
            case "1.3.0":
                owsVersion = "1.1.0";
                break;
        }
        super(url, owsVersion, config);
        this.version = version;
        /**
		 * Jsonix Configuration
		 * */ if (config == null) throw "Missing Configuration! It is a must to WMS to know the profile";
        else if (config[2] != undefined) this.credentials = config[2];
        this.jsonnixContext = new Jsonix.Context(config[0], config[1]);
        // init by doing a GetCapabilities and parsing metadata
        this.url = url;
    }
    GetCapabilities() {
        var this_ = this;
        return this.httpGet(this.buildUrl(this.url, {
            service: "WMS",
            request: "GetCapabilities",
            version: this.version
        }), "application/xml", this.credentials).then(function(responseXML) {
            var capabilities = this_.unmarshalDocument(responseXML);
            console.log(capabilities);
            return capabilities;
        });
    }
}
var $75d723b6e4868fdf$export$2e2bcd8739ae039 = $75d723b6e4868fdf$var$WMS;

});

parcelRequire.register("iftof", function(module, exports) {

$parcel$export(module.exports, "default", () => $d4906cfdfdeddcf7$export$2e2bcd8739ae039);





var $d4906cfdfdeddcf7$var$CSS_PREFIX = "layer-switcher-";
class $d4906cfdfdeddcf7$export$2e2bcd8739ae039 extends (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))) {
    constructor(opt_options){
        super(opt_options);
        var options = opt_options || {};
        this.reverse = options.reverse !== false;
        this.dragAndDrop = options.dragAndDrop !== false;
        this.dragSrcEl = null;
    }
    /**
	 * Render a legend graphic for an extended OFV OL layer object
	 * @private 
	 * @param {Layer} lyr Layer for which the legend should be rendered.
	 */ static renderLegendGraphic_(lyr, li) {
        if (lyr.get("type") != "base" && lyr.showLegendGraphic) {
            var imgSrc = lyr.legendGraphic ? lyr.legendGraphic : false;
            if (imgSrc) {
                var legend = document.createElement("div");
                var legendId = lyr.get("title").replace(" ", "-") + "_legend";
                legend.id = legendId;
                var img = new Image();
                img.src = imgSrc;
                var smallLegend = img.width <= 32 && img.height <= 20;
                var legendCss = "margin-left:40px;max-height:250px;";
                //var smallLegendCss = smallLegend? 'margin-right:10px;float:right;' : 'margin-left:40px;';
                legend.style.display = lyr.getVisible() ? smallLegend ? "block" : "table" : "none";
                var img = '<img src="' + imgSrc + '" style="' + legendCss + '"/>';
                legend.innerHTML = img;
                li.appendChild(legend);
            }
        }
    }
    /**
	 * Toggles a layer legend (hide/show legend image)
	 * @private
	 * @param {ol.layer.Base} lyr Layer for which the legend should be rendered
	 */ static toggleLegendGraphic_(lyr) {
        var legendId = lyr.get("title").replace(" ", "-") + "_legend";
        var legend = document.getElementById(legendId);
        legend.style.display = lyr.getVisible() ? "block" : "none";
    }
    /**
	 * Render a layer opacity slider for an extended OFV OL layer object
	 * @private
	 * @param {Layer} lyr Layer for which the opacity should be changed
	 */ static renderOpacitySlider_(lyr, li) {
        if (lyr.get("type") != "base") {
            var layer_id = lyr.id + "_op";
            var layer_slider = lyr.id + "_opslider";
            var layer_slider_html = document.createElement("p");
            layer_slider_html.id = layer_id;
            layer_slider_html.className = "not-draggable";
            layer_slider_html.style = "margin-left:32px;font-weight:normal !important;font-size:90%;overflow-wrap:break-word;";
            layer_slider_html.style.display = lyr.getVisible() ? "table" : "none";
            //input
            var layer_slider_input = document.createElement("input");
            console.log(layer_slider_input);
            layer_slider_input.id = layer_slider;
            layer_slider_input.name = layer_slider;
            layer_slider_input.type = "range";
            layer_slider_input.step = "0.1";
            layer_slider_input.min = "0";
            layer_slider_input.max = "1";
            layer_slider_input.setAttribute("value", String(lyr.getOpacity()));
            layer_slider_input.style = "width:75%;margin-left:35px;margin-top:5px;margin-bottom:10px;height:5px;";
            layer_slider_input.className = "not-draggable";
            layer_slider_html.append(layer_slider_input);
            layer_slider_html.innerHTML = layer_slider_html.innerHTML + '<span class="glyphicon glyphicon-eye-close"></span>';
            li.append(layer_slider_html);
        }
    }
    /**
	 * Toggles a layer opacity slider (hide/show opacity slider)
	 * @private
	 * @param {ol.layer.Base} lyr Layer for which the legend should be rendered
	 */ static toggleOpacitySlider_(lyr) {
        var layerOpId = lyr.id + "_op";
        var layerOp = document.getElementById(layerOpId);
        layerOp.style.display = lyr.getVisible() ? "block" : "none";
    }
    /** LayerSwitcher Overwritten methods  **/ renderPanel() {
        this.dispatchEvent({
            type: "render"
        });
        $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderPanel(this.getMap(), this.panel, {
            groupSelectStyle: this.groupSelectStyle,
            reverse: this.reverse,
            dragAndDrop: this.dragAndDrop
        });
        this.dispatchEvent({
            type: "rendercomplete"
        });
    }
    /**
	 * **Static** Re-draw the layer panel to represent the current state of the layers.
	 * @param {ol/Map~Map} map The OpenLayers Map instance to render layers for
	 * @param {Element} panel The DOM Element into which the layer tree will be rendered
	 * @param {Object} options Options for panel, group, and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 */ static renderPanel(map, panel, options) {
        // Create the event.
        var render_event = new Event("render");
        // Dispatch the event.
        panel.dispatchEvent(render_event);
        options = options || {};
        options.groupSelectStyle = (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).getGroupSelectStyle(options.groupSelectStyle);
        (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).ensureTopVisibleBaseLayerShown(map);
        while(panel.firstChild)panel.removeChild(panel.firstChild);
        // Reset indeterminate state for all layers and groups before
        // applying based on groupSelectStyle
        (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).forEachRecursive(map, function(l, idx, a) {
            l.set("indeterminate", false);
        });
        if (options.groupSelectStyle === "children" || options.groupSelectStyle === "none") // Set visibile and indeterminate state of groups based on
        // their children's visibility
        (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).setGroupVisibility(map);
        else if (options.groupSelectStyle === "group") // Set child indetermiate state based on their parent's visibility
        (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).setChildVisibility(map);
        var ul = document.createElement("ul");
        panel.appendChild(ul);
        // passing two map arguments instead of lyr as we're passing the map as the root of the layers tree
        $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderLayers_(map, map, ul, options, function render(changedLyr) {
            // console.log('render');
            $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderPanel(map, panel, options);
        });
        // Create the event.
        var rendercomplete_event = new Event("rendercomplete");
        // Dispatch the event.
        panel.dispatchEvent(rendercomplete_event);
        //refresh layer tree
        if (options.dragAndDrop) $d4906cfdfdeddcf7$export$2e2bcd8739ae039.refreshLayerTree_(map, panel, options, function render(changedLyr) {
            // console.log('render');
            $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderPanel(map, panel, options);
        });
    }
    /**
	 * **Static** Render all layers that are children of a group.
	 * @private
	 * @param {ol/Map~Map} map The map instance.
	 * @param {ol/layer/Base~BaseLayer} lyr Layer to be rendered (should have a title property).
	 * @param {Object} options Options for groups and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 * @param {Function} render Callback for change event on layer
	 * @returns {HTMLElement} List item containing layer control markup
	 */ static renderLayer_(map, lyr, options, render) {
        var li = document.createElement("li");
        var lyrTitle = lyr.get("title");
        var checkboxId = (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).uuid();
        var label = document.createElement("label");
        if (lyr.getLayers && !lyr.get("combine")) {
            const isBaseGroup = (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).isBaseGroup(lyr);
            li.classList.add("group");
            if (isBaseGroup) li.classList.add($d4906cfdfdeddcf7$var$CSS_PREFIX + "base-group");
            // Group folding
            if (lyr.get("fold")) {
                li.classList.add($d4906cfdfdeddcf7$var$CSS_PREFIX + "fold");
                li.classList.add($d4906cfdfdeddcf7$var$CSS_PREFIX + lyr.get("fold"));
                const btn = document.createElement("button");
                btn.onclick = function(e) {
                    e = e || window.event;
                    (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).toggleFold_(lyr, li);
                    e.preventDefault();
                };
                li.appendChild(btn);
            }
            if (!isBaseGroup && options.groupSelectStyle != "none") {
                const input = document.createElement("input");
                input.type = "checkbox";
                input.id = checkboxId;
                input.checked = lyr.getVisible();
                input.indeterminate = lyr.get("indeterminate");
                input.onchange = function(e) {
                    e.target.parentElement.setAttribute("data-checked", e.target.checked);
                    (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).setVisible_(map, lyr, e.target.checked, options.groupSelectStyle);
                    render(lyr);
                };
                li.setAttribute("data-checked", lyr.get("visible"));
                li.appendChild(input);
                label.htmlFor = checkboxId;
            }
            label.innerHTML = lyrTitle;
            li.appendChild(label);
            var ul = document.createElement("ul");
            li.appendChild(ul);
            $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderLayers_(map, lyr, ul, options, render);
        } else {
            li.className = "layer";
            var input1 = document.createElement("input");
            if (lyr.get("type") === "base") {
                input1.type = "radio";
                input1.name = "base";
            } else input1.type = "checkbox";
            input1.id = checkboxId;
            input1.checked = lyr.get("visible");
            input1.indeterminate = lyr.get("indeterminate");
            input1.onchange = function(e) {
                e.target.parentElement.setAttribute("data-checked", e.target.checked);
                (0, ($parcel$interopDefault($hzBBV$ollayerswitcher))).setVisible_(map, lyr, e.target.checked, options.groupSelectStyle);
                $d4906cfdfdeddcf7$export$2e2bcd8739ae039.toggleLegendGraphic_(lyr);
                $d4906cfdfdeddcf7$export$2e2bcd8739ae039.toggleOpacitySlider_(lyr);
                render(lyr);
            };
            li.setAttribute("data-pid", lyr.id);
            li.setAttribute("data-checked", lyr.get("visible"));
            li.appendChild(input1);
            label.htmlFor = checkboxId;
            label.innerHTML = lyrTitle;
            var rsl = map.getView().getResolution();
            if (rsl > lyr.getMaxResolution() || rsl < lyr.getMinResolution()) label.className += " disabled";
            li.appendChild(label);
            //handling layer opacity slider for overlays
            $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderOpacitySlider_(lyr, li);
            //handling legend graphic for overlays
            $d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderLegendGraphic_(lyr, li);
        }
        return li;
    }
    /**
	 * **Static** Render all layers that are children of a group.
	 * @private
	 * @param {ol/Map~Map} map The map instance.
	 * @param {ol/layer/Group~LayerGroup} lyr Group layer whose children will be rendered.
	 * @param {Element} elm DOM element that children will be appended to.
	 * @param {Object} options Options for groups and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 * @param {Function} render Callback for change event on layer
	 */ static renderLayers_(map, lyr, elm, options, render) {
        var lyrs = lyr.getLayers().getArray().slice();
        if (options.reverse) lyrs = lyrs.reverse();
        if (options.dragAndDrop) {
            if (lyrs[0]) {
                if (!(lyrs[0] instanceof (0, $hzBBV$ollayer.Group))) {
                    if (lyrs[0].getZIndex() != NaN) lyrs.sort((a, b)=>{
                        return a.getZIndex() - b.getZIndex() > 0 ? -1 : 1;
                    });
                }
            }
        }
        for(var i = 0, l; i < lyrs.length; i++){
            l = lyrs[i];
            if (l.get("title")) elm.appendChild($d4906cfdfdeddcf7$export$2e2bcd8739ae039.renderLayer_(map, l, options, render));
        }
    }
    /**
	 * **Static** .
	 * @private
	 * @param {ol/Map~Map} map The map instance.
	 * @param {Element} panel The DOM Element into which the layer tree will be rendered
	 * @param {Object} options Options for panel, group, and layers
	 */ static refreshLayerTree_(map, panel, options, render) {
        var this_ = this;
        var addDragAndDropLayerEvents = function(el) {
            var dragAuth = function(target) {
                return target.className !== "not-draggable";
            };
            var dragLayerStart = function(e) {
                //this.style.opacity = '0.4';
                var draggable = dragAuth(e.target);
                this_.dragSrcEl = this;
                if (draggable) {
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/html", this.outerHTML);
                }
            };
            var dragLayerEnter = function(e) {
                var draggable = dragAuth(e.target);
                if (draggable) this.classList.add("draggable-layer-over");
                return false;
            };
            var dragLayerLeave = function(e) {
                this.style.backgroundColor = "transparent";
                e.stopPropagation();
                this.classList.remove("draggable-layer-over");
            };
            var dragLayerOver = function(e) {
                var draggable = dragAuth(e.srcElement);
                if (draggable) {
                    this.style.backgroundColor = "#DCDCDC";
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                }
                return false;
            };
            var dragLayerDrop = function(e) {
                this.style.backgroundColor = "transparent";
                //this.style.opacity = '1';
                var draggable = dragAuth(e.srcElement);
                if (draggable) {
                    if (this_.dragSrcEl) {
                        if (this_.dragSrcEl != this) {
                            this_.dragSrcEl.outerHTML = this.outerHTML;
                            this.outerHTML = e.dataTransfer.getData("text/html");
                            this_.refreshLayerTree_(map, panel, options, render);
                            this_.renderPanel(map, panel, options);
                        }
                    }
                }
                return false;
            };
            var dragLayerEnd = function(e) {
                var listItens = document.querySelectorAll(".draggable-layer");
                [].forEach.call(listItens, function(item) {
                    item.childNodes[0].checked = item.getAttribute("data-checked") === "true";
                    item.classList.remove("draggable-layer-over");
                });
                this.style.opacity = "1";
            };
            el.addEventListener("dragstart", dragLayerStart, false);
            el.addEventListener("dragenter", dragLayerEnter, false);
            el.addEventListener("dragover", dragLayerOver, false);
            el.addEventListener("dragleave", dragLayerLeave, false);
            el.addEventListener("drop", dragLayerDrop, false);
            el.addEventListener("dragend", dragLayerEnd, false);
        };
        var mapLayerGroups = new Array();
        var total = 0;
        map.getLayers().getArray().forEach(function(item) {
            mapLayerGroups.push(item);
        });
        mapLayerGroups.shift(); //not applied on baselayers
        $($(".group").filter(function(i, item) {
            if ($(item).prop("class").indexOf("base") == -1) return item;
        }).get().reverse()).each(function(i, layergroup) {
            var mapLayerGroup = mapLayerGroups[i];
            var mapLayers = mapLayerGroup.getLayers().getArray().filter(function(item) {
                if (item.id != "ofv-csw-spatial-coverages") return item;
            });
            var layers = $(layergroup).find(".layer").get().reverse();
            $(layers).each(function(j, item) {
                $(item).prop("draggable", "true");
                $(item).addClass("draggable-layer");
                $(item).attr("data-order", total + j);
                addDragAndDropLayerEvents(item);
            });
            total += mapLayers.length;
        });
        $($(".group").filter(function(i, item) {
            if ($(item).prop("class").indexOf("base") == -1) return item;
        }).get().reverse()).each(function(i, layergroup) {
            var mapLayerGroup = mapLayerGroups[i];
            var mapLayers = mapLayerGroup.getLayers().getArray().filter(function(item) {
                if (item.id != "ofv-csw-spatial-coverages") return item;
            });
            var layers = $(layergroup).find(".layer").get().reverse();
            $(layers).each(function(j, item) {
                var mapLayer = $d4906cfdfdeddcf7$export$2e2bcd8739ae039.getLayerByProperty(map, $(item).attr("data-pid"), "id");
                mapLayer.setZIndex(parseInt($(item).attr("data-order")));
                //activate opacity slider for each layer
                var layer_slider = mapLayer.id + "_opslider";
                var slider = document.getElementById(layer_slider);
                slider.draggable = "true";
                slider.oninput = function(e) {
                    this.title = this.value;
                    mapLayer.setOpacity(Number(this.value));
                //e.preventDefault();
                //e.stopPropagation();
                };
            });
        });
    }
    static getLayerByProperty(map, layerProperty, by) {
        var target = undefined;
        for(var i = 0; i < map.getLayerGroup().getLayersArray().length; i++){
            var layer = map.getLayerGroup().getLayersArray()[i];
            var condition = by ? layer[by] === layerProperty : layer.getSource().getParams()["LAYERS"] === layerProperty;
            if (condition) {
                target = map.getLayerGroup().getLayersArray()[i];
                break;
            }
        }
        return target;
    }
}

});

parcelRequire.register("7diFq", function(module, exports) {
/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer
 * Copyright (c) 2018 Emmanuel Blondel
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *		   
 */ class $54083a3609386057$export$2e2bcd8739ae039 {
    /**
	 * popupHandler
	 * @param {String} shinyAppUrl
	 * @param {Layer} openlayers layer object extended within OpenFairViewer
	 * @param {Feature} openlayers feature object
	 * @param {Boolean} withGeom 
	 */ static popupHandler(shinyAppUrl, layer, feature, withGeom) {
        console.log("Custom popup handler with Shiny app");
        console.log(layer);
        console.log(feature);
        var pid = layer.id;
        var layername = layer.getSource().getParams().LAYERS;
        var shinyapp_url = shinyAppUrl + "?";
        shinyapp_url += "pid=" + pid;
        shinyapp_url += "&layer=" + layername;
        shinyapp_url += "&csw_server=" + layer.csw_server;
        shinyapp_url += "&csw_version=" + layer.csw_version;
        shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split("?")[0];
        shinyapp_url += "&wfs_version=1.0.0";
        shinyapp_url += "&wms_server=" + (layer.getSource().getUrl ? layer.getSource().getUrl() : layer.getSource().getUrls()[0]).replace("ows?service=WMS", "wms");
        shinyapp_url += "&wms_version=" + layer.getSource().getParams().VERSION;
        shinyapp_url += "&feature_geom=" + withGeom;
        shinyapp_url += "&strategy=" + layer.strategy;
        var params = null;
        switch(layer.strategy){
            case "ogc_filters":
                params = layer.getSource().getParams().CQL_FILTER;
                break;
            case "ogc_viewparams":
                params = layer.getSource().getParams().VIEWPARAMS;
                break;
        }
        if (params) shinyapp_url += "&par=" + params;
        shinyapp_url += "&geom=" + feature.geometry_column;
        shinyapp_url += "&x=" + feature.info.x;
        shinyapp_url += "&y=" + feature.info.y;
        shinyapp_url += "&width=" + feature.info.width;
        shinyapp_url += "&height=" + feature.info.height;
        shinyapp_url += "&bbox=" + feature.info.bbox;
        shinyapp_url += "&srs=EPSG:4326";
        if (layer.dsd) {
            var dsd_small = layer.dsd.map(function(item) {
                var newItem = item;
                delete newItem.values;
                if (newItem.definition) {
                    if (newItem.definition.length == 0) newItem.definition = null;
                }
                return newItem;
            });
            console.log(JSON.stringify(dsd_small));
            shinyapp_url += "&dsd=" + encodeURI(JSON.stringify(dsd_small));
        }
        var html = '<iframe src ="' + shinyapp_url + '" width="400" height="400" frameborder="0" marginheight="0"></iframe>';
        return html;
    }
    /**
	 * dashboardHandler
	 * @param {String} shinyAppUrl
	 * @param {Layer} openlayers layer object extended within OpenFairViewer
	 * @param {Boolean} withGeom 
	 */ static dashboardHandler(shinyAppUrl, layer, withGeom) {
        console.log("Custom dashboard handler with Shiny app");
        var pid = layer.id;
        var layername = layer.getSource().getParams().LAYERS;
        var shinyapp_url = shinyAppUrl + "?";
        shinyapp_url += "pid=" + pid;
        shinyapp_url += "&layer=" + layername;
        shinyapp_url += "&csw_server=" + layer.csw_server;
        shinyapp_url += "&csw_version=" + layer.csw_version;
        shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split("?")[0];
        shinyapp_url += "&wfs_version=1.0.0";
        shinyapp_url += "&feature_geom=" + withGeom;
        shinyapp_url += "&strategy=" + layer.strategy;
        var params = null;
        switch(layer.strategy){
            case "ogc_filters":
                params = layer.getSource().getParams().CQL_FILTER;
                break;
            case "ogc_viewparams":
                params = layer.getSource().getParams().VIEWPARAMS;
                break;
        }
        if (params) shinyapp_url += "&par=" + params;
        shinyapp_url += "&srs=EPSG:4326";
        if (layer.dsd) {
            var dsd_small = layer.dsd.map(function(item) {
                var newItem = item;
                delete newItem.values;
                if (newItem.definition) {
                    if (newItem.definition.length == 0) newItem.definition = null;
                }
                return newItem;
            });
            console.log(JSON.stringify(dsd_small));
            shinyapp_url += "&dsd=" + encodeURI(JSON.stringify(dsd_small));
        }
        var html = '<iframe src ="' + shinyapp_url + '" width="100%" height="100%" frameborder="0" marginheight="0"></iframe>';
        return html;
    }
}

});



parcelRequire("dwrOc");

//# sourceMappingURL=OpenFairViewer.js.map

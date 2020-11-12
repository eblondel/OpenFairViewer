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
 */

//jquery
import './import-jquery';
import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui.js';
//select2
import select2 from 'select2';
select2($); //Hook up select2 to jQuery      
import 'select2/dist/css/select2.css';
//jquery datetimepicker
import datetimepicker from 'jquery-datetimepicker';
import 'jquery-datetimepicker/jquery.datetimepicker.css';
//datatables
import dataTables from 'datatables.net';
dataTables(window, $);
import 'datatables.net-dt/css/jquery.dataTables.css';
//bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
//academicons
import 'academicons/css/academicons.css';
//jsonix
import './import-jsonix';
import './import-jsonix-geojson';
//W3C schemas
import './import-w3c-schemas';
//OGC schemas
import './import-ogc-schemas';
//ows4js
//import './import-ows';
import CSWConstraint from './vendor/ows/CSWConstraint';
import CSWQuery from './vendor/ows/CSWQuery';
import Filter from './vendor/ows/Filter';
import IsLike from './vendor/ows/IsLike';
import IsEqualTo from './vendor/ows/IsEqualTo';
import IsNotEqualTo from './vendor/ows/IsNotEqualTo';
import IsLessThan from './vendor/ows/IsLessThan';
import IsLessThanOrEqualTo from './vendor/ows/IsLessThanOrEqualTo';
import IsGreaterThan from './vendor/ows/IsGreaterThan';
import IsGreaterThanOrEqualTo from './vendor/ows/IsGreaterThanOrEqualTo';
import BBOX from './vendor/ows/BBOX';
import And from './vendor/ows/And';
import Or from './vendor/ows/Or';
import CSW from './vendor/ows/CSW';
//bootpag
import bootpag from 'bootpag/lib/jquery.bootpag';
//mustache
import mustache from 'mustache/mustache.mjs';
//ol-cesium
//import Cesium from 'cesium';
import OLCesium from 'olcs/OLCesium.js';
//openlayers
import 'ol/ol.css';
import Map from 'ol/Map';
import {unByKey} from 'ol/Observable';
import {MousePosition, OverviewMap, Zoom, ZoomToExtent, Attribution} from 'ol/Control';
import {OSM, WMTS, TileArcGISRest, XYZ, TileWMS, ImageWMS, Vector} from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {Group as LayerGroup, Tile as TileLayer, Image as ImageLayer, Vector as VectorLayer} from 'ol/layer';
import View from 'ol/View';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import * as olExtent from 'ol/extent';
import * as olProj from 'ol/proj';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import * as olCoordinate from 'ol/coordinate';
import * as olGeom from 'ol/geom';
import {fromExtent} from 'ol/geom/Polygon'
import * as olFormat from 'ol/format';
import GML32 from 'ol/format/GML32';
import Feature from 'ol/Feature';
import * as olInteraction from 'ol/interaction';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
//openlayers plugins
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import Popup from 'ol-popup';
import 'ol-popup/src/ol-popup.css';
//filesaver
import saveAs from 'file-saver';
//statistics
import * as stats from 'simple-statistics';
//colorbrewer
import colorbrewer from 'colorbrewer/index.js';
window.colorbrewer = colorbrewer;
//ofv
import OpenFairLayerSwitcher from './OpenFairLayerSwitcher.js';
import OpenFairShiny from './OpenFairShiny.js';
import './OpenFairViewer.css';


var bootstrapButton = $.fn.button.noConflict(); // return $.fn.button to previously assigned value
$.fn.bootstrapBtn = bootstrapButton ;

/**
 * @classdesc
 * OpenFairViewer
 */
class OpenFairViewer {
	
	/**
	 * @param {Object} The OpenFairViewer config.
	 * @param {Object} options
	 *
	 */
	constructor(config, opt_options){
		
		var this_ = this;
		
		//version
		this.versioning = {VERSION: "2.1.0", DATE: new Date(2020,11,11)}
		
		//protocol
		this.protocol = window.origin.split("://")[0];
		this.secure = this.protocol == "https";
		
		//Cesium 3D support?
		this.enable_3d = window.Cesium != undefined;

		//CSW
		if(!config.OGC_CSW_BASEURL){
			alert("OpenFairViewer cannot be instantiated. Missing CSW endpoint")
		}
		this.config = config;
		this.config.OFV_ID = config.id? config.id : 'OFV';
		var defaultProfile = {
			about: 'About OpenFairViewer'
		};
		this.config.OFV_PROFILE = config.profile? config.profile : defaultProfile;
		this.config.OGC_CSW_VERSION = "2.0.2";
		this.config.OGC_CSW_SCHEMA = "http://www.isotc211.org/2005/gmd";
		this.config.OGC_CSW_MAXRECORDS = 5;
		this.config.OGC_FILTER_VERSION = null;
		this.config.OGC_OWS_FILTER_SCHEMAS =  [];
		switch(this.config.OGC_CSW_VERSION){
			case "2.0.2":
				this.config.OGC_FILTER_VERSION = "1.1.0"; 
				this.config.OGC_FILTER_SCHEMAS = [CSW_2_0_2]; 
				break;
			case "3.0.0": 
				this.config.OGC_FILTER_VERSION = "2.0";
				this.config.OGC_FILTER_SCHEMAS = [CSW_3_0];
				break;
		}
		
		var options = opt_options || {};
		this.options = {};
		
		//BROWSE options
		//--------------------------------------------------------------------------------------------------
		this.options.find = {};
		this.options.find.maxitems = null;
		this.options.find.filters = [];
		this.options.find.filterByWMS = false;
		this.options.find.datasetInfoHandler = function(metadata){
			var datasetInfoUrl = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&id=" + metadata.fileIdentifier;
			window.open(datasetInfoUrl, '_blank');
		}
		if(options.find){
			if(options.find.maxitems) this.options.find.maxitems = options.find.maxitems;
			if(options.find.filters) this.options.find.filters = options.find.filters;
			if(options.find.datasetInfoHandler) this.options.find.datasetInfoHandler = options.find.datasetInfoHandler;
			if(options.find.filterByWMS){
				this.options.find.filterByWMS = options.find.filterByWMS;
				this.options.find.filters.push( {name: 'csw:OnlineResourceType', value: '%WMS%'} );
			}
		}
		
		//spatial coverage vector layer params
		this.options.find.defaultStyle = new Style({
		   stroke : new Stroke({color : [0, 153, 255, 1], width: 3})
		})
		this.options.find.hoverStyle = new Style({
		   image: new CircleStyle({
			    radius: 3,
				fill : new Fill({color: [255, 255, 255, 0.2]}),
				stroke : new Stroke({color : "orange", width: 3})
		   }),
		   fill : new Fill({color: [255, 255, 255, 0.2]}),
		   stroke : new Stroke({color : "orange", width: 3})
		});
		
		//QUERY options
		//--------------------------------------------------------------------------------------------------
		//labels
		this.options.labels = {
			about : 'About',
			about_title : 'Welcome',
			find: 'Find',
			find_title: 'Find data by browsing the data catalogue',
			search: 'Search',
			info: 'Dataset information',
			access: 'Access',
			access_title: 'Access and query data',
			link: 'Link',
			link_title: 'Paste the link in email or chat',
			settings: 'Advanced settings',
			settings_mapextent: 'Enable Search on map extent',
			settings_mapmove: 'Auto-Search on map move',
			settings_bbox: 'Display dataset bounding box (if any)',
			settings_geom: 'Display dataset extent geometries (if any)',
			show: 'Show',
			datasets: 'datasets',
			datasets_loader: 'Fetching datasets...',
			datasets_search_placeholder: 'Search a dataset',
			dataset_access_doi: 'Access resource with DOI',
			dataset_access_metadata: 'Access dataset metadata',
			dataset_zoom_extent: 'Zoom to dataset spatial extent',
			dataset_query_map: 'Query & Map',
			dataset_query_map_title: 'Query & Map dataset',
			dataset_remove: 'Remove from map',
			dsd_loader: 'Fetching data structure definition...',
			listedvalue_href_placeholder: 'More info...',
			filtering: 'Filtering',
			attributes: 'Attributes',
			variable: 'Variable',
			variables: 'Variables',
			thematicmapping: 'Thematic Mapping',
			thematicmapping_variable: 'Select a variable',
			thematicmapping_options: 'Map options',
			ogc_filters: "Filters",
			ogc_dimensions: "Dimensions",
			ogc_viewparams: "View parameters",
			export_options: 'Export options',
			export_options_prettify: 'Prettify column names',
			export_options_labels: 'Enrich with data labels',
			export_options_more: 'More export methods?',
			tabulardata: "Tabular data",
			tabulardata_title: 'Open tabular data',
			dashboard: "Dashboard",
			dashboard_title: 'Open dashboard',
			legend_title_show: 'Show legend',
			legend_title_hide: 'Hide legend',
			fit_to_extent: 'Fit to extent',
			nodata: 'Ups! There is no data for this query...',
			download_data: 'Download data (CSV)',
			download_map: 'Download map (PNG)',
			download_rscript: 'Download R Script',
			download_wfs: 'Get OGC WFS features',
			basemaps: 'Basemaps',
			maptype_selector: 'Select a map type',
			maptype_selector_title: 'Select the type of statistical map',
			maptype_choropleth: 'Choropleth map',
			maptype_graduated: 'Graduated symbol map',
			class_selector: 'Select a classification',
			class_selector_title: 'Select the type of data interval classification',
			class_ckmeans: 'Ckmeans clustering',
			class_equal: 'Equal intervals',
			class_quantile: 'Quantiles',
			classnb_selector: 'Select the number of intervals',
			classnb_selector_title: 'Select the number of data intervals',
			switchto: 'Switch to',
			colorscheme_selector: 'Select a color palette',
			colorscheme_selector_title: 'Select a color palette to apply to data intervals'
		};
		console.log(Object.keys(this.options.labels));
		//apply option labels if defined
		if(options.labels){
			Object.keys(this.options.labels).forEach(function(label){
				if(options.labels[label]) this_.options.labels[label] = options.labels[label];
			});
		}
		
		//Access
		this.options.access = {};
		this.options.access.columns = 2;
		this.options.access.time = 'datePicker';
		if(options.access){
			if(options.access.columns){
				if([1,2].indexOf(options.access.columns) != -1) this.options.access.columns = options.access.columns;
			}
			if(options.access.time) this.options.access.time = options.access.time;
		}

		//dashboard
		this.options.access.dashboard = {};
		this.options.access.dashboard.enabled = true;
		this.options.access.dashboard.DEFAULT_HANDLER = undefined;
		//Set default handler
		this.options.access.dashboard.handler = this.options.access.dashboard.DEFAULT_HANDLER;
		//handler option
		if(options.access) if(options.access.dashboard) {
			if(options.access.dashboard.enabled) this.options.access.dashboard.enabled = options.access.dashboard.enabled;
			if(options.access.dashboard.handler) this.options.access.dashboard.handler = options.access.dashboard.handler;
		}

		//MAP options
		//--------------------------------------------------------------------------------------------------
		this.options.map = {};
		//mode
		this.options.map.mode = '2D',
		//watermark
		this.options.map.attribution = null;
		if(options.map) this.options.map.attribution = options.map.attribution? options.map.attribution : null;
		//projections
		this.options.map.projection = 'EPSG:4326';
		this.options.map.proj4defs = [
			{epsgcode: "EPSG:4326", proj4string: "+proj=longlat +datum=WGS84 +no_defs"},
			{epsgcode: "EPSG:3031", proj4string: "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"},
			{epsgcode: "EPSG:2154", proj4string: "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"}
		];
		if(options.map) {
			if(options.map.mode) if(['2D', '3D'].indexOf(options.map.mode) != -1) this.options.map.mode = options.map.mode;
			if(options.map.projection) this.options.map.projection = options.map.projection;
			if(options.map.proj4defs) for(var p = 0; p < options.map.proj4defs.length; p++) this.options.map.proj4defs.push(options.map.proj4defs[p]);
			for(var i=0;i<this.options.map.proj4defs.length;i++){
				var proj4def = this.options.map.proj4defs[i];
				proj4.defs(proj4def.epsgcode, proj4def.proj4string);
			}
			register(proj4);
		}	
			
		//zoom
		this.options.map.zoom = 3;
		if(options.map) this.options.map.zoom = options.map.zoom? options.map.zoom : 3;
		//extent
		this.options.map.extent = undefined;
		if(options.map) if(options.map.extent){
			if(!(options.map.extent instanceof Array)){
				console.error("Map extent should be an array");
			}else{
				if(options.map.extent.length != 4){
					console.error("Map extent array should be of length 4");
				}else{
					this.options.map.extent = options.map.extent;	
				}
			}	
		}
		//layergroups
		this.options.map.baselayergroup = {name: this_.options.labels.basemaps, fold: 'open'};
		if(options.map) if(options.map.baselayergroup) {
			this.options.map.baselayergroup = options.map.baselayergroup;
		}
		this.options.map.layergroups = [{name: "Base overlays", fold: 'open'},{name: "Statistical maps", fold: 'open'}];
		if(options.map) if(options.map.layergroups){
			this.options.map.layergroups = options.map.layergroups;
		}
		//statistics layergroup
		this.options.map.mainlayergroup = this.options.map.layergroups.length-1;
		if(options.map) if(options.map.mainlayergroup){
			this.options.map.mainlayergroup = options.map.mainlayergroup;
		}
		//baselayers
		this.options.map.baselayers = [
			new TileLayer({
				title: "EMODnet Bathymetry World baselayer",
				//extent: [-180,-90,180,90],
				type: 'base',
				source : new WMTS({
					url : 'https://tiles.emodnet-bathymetry.eu/2020/{Layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
					layer : 'baselayer',
					requestEncoding : 'REST',
					matrixSet : 'inspire_quad',
					format : 'image/png',
					projection : "EPSG:4326",
					tileGrid : this_.inspireWgs84Grid(12, '')
				})
			}),
			new TileLayer({
				title : "UN Clear Map (Dark)",
				type: 'base',
				source : new TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Dark/MapServer',
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),
			new TileLayer({
				title : "UN Clear Map",
				type: 'base',
				source : new TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Topo/MapServer',
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),
			new TileLayer({
				title: "OpenStreetMaps",
				type: 'base',
				source: new OSM()
			}),
			new TileLayer({
				title : "World Imagery",
				type: 'base',
				source : new XYZ({
					projection: olProj.get(this_.options.map.projection),
					url: 'https://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}',
					tileSize: 512, // the tile size supported by the ArcGIS tile service
					maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
					crossOrigin: 'anonymous',
					wrapX: true
				})
			})
		];
		if(options.map) if(options.map.baselayers) this.options.map.baselayers = options.map.baselayers;
		//overlays
		this.options.map.overlays = [];
		if(options.map) if(options.map.overlays) this.options.map.overlays = options.map.overlays;
		
		//aggregate
		this.options.map.aggregated_layer_suffix = "_aggregated";
		if(options.map) if(options.map.aggregated_layer_suffix){
			this.options.map.aggregated_layer_suffix = options.map.aggregated_layer_suffix;
		}

		//styling
		this.options.map.styling = {};
		this.options.map.styling.breaks = [""," to ",""]; 
		if(options.map) if(options.map.styling){
			if(options.map.styling.breaks){
				if(!(options.map.styling.breaks instanceof Array)){
					console.error("Styling breaks should be an array");
				}else{
					if(options.map.styling.breaks.length != 3){
						console.error("Styling breaks array should be of length 3");
					}else{
						this.options.map.styling.breaks = options.map.styling.breaks;		
					}
				}			
			}
		}
		
		//tooltip
		this.options.map.tooltip = {};
		this.options.map.tooltip.enabled = true;
		//default handlers
		this.options.map.tooltip.DEFAULT_HANDLER = function(layer, feature){
			console.log(layer);
			console.log(feature);
			console.log("Inherit DSD from layer in popup");
			console.log(layer.dsd);
			console.log("Inherit properties for custom popup");
			console.log(feature.geometry_column);
			console.log(feature.popup_coordinates);
			
			//patterns
			var regexps = {
			  DATE: new RegExp("^([1-9][0-9]{3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$"),
			  DATETIME: new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$")
			}
			var props = feature.getProperties();
			var html = '<table class="table table-condensed">';
			var propNames = Object.keys(props);
			//text fields
			for(var i=0;i<propNames.length;i++){
				var propName = propNames[i];
				var prop = props[propName];
				if(prop){
					
				  var propFromDsd = null;
				
				  //propName
				  var propNameLabel = '<b>'+propName+'</b>';
				  if(layer.dsd) {
					propFromDsd = layer.dsd.filter(function(item){if(item.primitiveCode == propName) return item});
					if(propFromDsd.length > 0) {
						propFromDsd = propFromDsd[0];
						propNameLabel = '<b>' + propFromDsd.name + '</b> <span class="dsd-ui-item-code">['+propFromDsd.primitiveCode+']</span>';
						if(propFromDsd.definition) if(propFromDsd.definition.length > 0) propNameLabel += ' <span class="glyphicon glyphicon-info-sign attribute-info" title="'+propFromDsd.definition+'"></span>'
					}
				  }
				
				  if(typeof prop == "string") if(prop.indexOf("http")==0){
				    prop = '<a href="'+prop+'" target="_blank" style="color:#337ab7">Link</a>';
				  }

				  var isBase64 = false; if(typeof prop == "string") isBase64 = prop.startsWith('base64:') || prop.startsWith('data:image/png;base64,');
				  var isDate = false; if(typeof prop == "string") isDate = prop.match(regexps.DATE) != null;
				  var isDateTime = false; if(typeof prop == "string") isDateTime = prop.match(regexps.DATETIME) != null;
				  if(typeof prop != "undefined" && !(prop instanceof olGeom.Geometry)) if(!isBase64) {
					var propToDisplay = prop;
					if(isDateTime){
						var date = new Date(Date.parse(prop));
						propToDisplay = date.toISOString().split("T")[0] + 'T' + date.toLocaleTimeString();
					}
					html += '<tr><td>' + propNameLabel + "</td><td>" + propToDisplay;
					if(propFromDsd) if(propFromDsd.uom) {
						html += ' '+ propFromDsd.uom;
					}
					if(isDate || isDateTime){
						html += '<button style="margin: 0px 10px;font-size:inherit;" class="btn btn-xs" ';
						html += 'onclick="'+this_.config.OFV_ID+'.getNextFeatureInfoInTime(\''+layer.id+'\',\''+layer.baseDataUrl+'\',\'1.0.0\',\''+layer.getSource().getParams().LAYERS+'\',\''+propName+'\',\''+prop+'\')">Next</button>';
					}
					html += "</td></tr>";
				  }
				}
			}			
			
			//image fields
			var imgPropNames = propNames.filter(function(propName){
				var prop = props[propName];
				if(typeof prop == 'undefined') return false;
				var isBase64 = false;
				if(typeof prop == "string") isBase64 = prop.startsWith('base64:') || prop.startsWith('data:image/png;base64,');
				if(isBase64) return propName;
			});
			if(imgPropNames.length>0){
			  html += "<tr><td><b>Images</b></td><td>";
			  for(var i=0;i<imgPropNames.length;i++){
				var imgPropName = imgPropNames[i];
				var prop = props[imgPropName];
				if(prop.startsWith('base64:')) prop = 'data:image/png;base64,' + prop.split('base64:')[1];
				html += '<img src="'+prop+'" width="45%" style="margin:2px;" alt="'+imgPropName+'" title="'+imgPropName+'"/>';
			  }
		  	  html += '</td></tr>';
			}
			html += '</table>';
			return html;
		} 
		
		//Set default handler
		this.options.map.tooltip.handler = this.options.map.tooltip.DEFAULT_HANDLER;
		//handler option
		if(options.map) if(options.map.tooltip) {
			if(options.map.tooltip.enabled) this.options.map.tooltip.enabled = options.map.tooltip.enabled;
			if(options.map.tooltip.handler) this.options.map.tooltip.handler = options.map.tooltip.handler;
		}
		
		//cesium
		this.options.cesium = {};
		this.options.cesium.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWY1NmQzZS1hNzMyLTRlNDMtOTI3Yi1kZWY5ZWZlM2Q0NDUiLCJpZCI6MzcyMTgsImlhdCI6MTYwNDY3NDAyN30.9tFv8RqF2p-oYLTrp-b5AIg5u721Ohh9psMgSJFMY3s';
		if(options.cesium) if(options.cesium.accessToken) this.options.cesium.defaultAccessToken = options.cesium.accessToken;
		
		//events
		this.mapEvents = new Array();

		//panels
		this.options.panel = {}
		if(options.panel) {
				this.options.panel.welcome = options.panel.about? options.panel.about : 'aboutDialog2';				
		}
		
		//datasets caching
		this.datasets = new Array();
		
		//main OFV instance object
		window[this.config.OFV_ID] = this;
	}
	
	
	/**
	 * OpenFairViewer.prototype.initMarkup
	 *
	 */
	initMarkup(intro){
		var this_ = this;
		var deferred = $.Deferred();
		this.loadTemplate('templates/main.tpl.html', 'mainTpl').then(function(template){
			var main = mustache.render(template, {OFV_ID : this_.config.OFV_ID, OFV_PROFILE: this_.config.OFV_PROFILE, labels: this_.options.labels, mode: (this_.options.map.mode == '2D'? '3D':'2D')});
			if(intro) $("body").append(main);
			deferred.resolve();
		});
		return deferred.promise();
	}
	
	/**
	 * init
	 */
	init(intro){
		var this_ = this;
		this.initMarkup(intro).then(function(){
		
			this_.selection = new Array();
			this_.initBrowseCatalogue();
			this_.initBrowseAdvancedSettings();
			this_.initBrowsePagination();
				
			this_.initDataViewer();
		
			//event on page number selection
			$("select[id='datasets_length']").on('change', function() {
			  var maxrecords = parseInt(this.value);
			  console.log('Browsing '+maxrecords+' records...');
			  this_.displayDatasets(maxrecords);
			});
		
			//get Datasets from CSW
			this_.displayDatasets(this_.config.OGC_CSW_MAXRECORDS);
			$("#dataset-form").submit(function(e) {
				e.preventDefault();
				var maxrecords = parseInt($("select[id='datasets_length']").val());
				this_.displayDatasets(maxrecords);
				return false;
			});
					
			//init widgets
			this_.initDialog("aboutDialog", this_.options.labels.about,{"ui-dialog": "about-dialog", "ui-dialog-title": "dialog-title"}, null, 0);
			this_.initDialog("findDialog", this_.options.labels.find, {"ui-dialog": "find-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 1);
			this_.initDialog("accessDialog", this_.options.labels.access, {"ui-dialog": "access-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 2);
			this_.initDialog("infoDialog", this_.options.labels.info, {"ui-dialog": "info-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 3);
			this_.initDialog("dataDialog", this_.options.labels.tabulardata, {"ui-dialog": "data-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 4);
			this_.initDialog("dashboardDialog", this_.options.labels.dashboard, {"ui-dialog": "dashboard-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 4);

			this_.closeAccessDialog();
			this_.closeDataDialog();
			this_.closeDashboardDialog();
			this_.closeInfoDialog();
			this_.openFindDialog();
			
			if(intro) this_.openAboutDialog();
			
			//resolve viewer from URL
			this_.resolveViewer();
			
			this_._copyright();
		});
	}
	
	
	/**
	 * reset
	 */
	reset(){
		var mainpage = document.location.href.split('?')[0];
		if(window.history.replaceState){
			window.history.replaceState('', '', mainpage);
		}else{
			document.location.href = mainpage;
		}
		this.init(false);
	}
	
	/**
	 * rewriteURL
	 * @param {String} url
	 */
	rewriteURL(url){
		if(window.location.origin.startsWith("https")){
			url = url.replace(/^http:\/\//i, 'https://');
		}
		return url;
	}
	
	/**
	 * OpenFairViewer.prototype.getAllUrlParams util function to get URL param valus
	 * Here the primary use is to be able to grab a security token that would be
	 * passed from within a i-Marine VRE portlet
	 * @param url
	 * @returns an object with all parameter values
	 */
	getAllUrlParams(url) {
		var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

		var obj = {};
		if (queryString) {
			queryString = queryString.split('#')[0];
			var arr = queryString.split('&');
			for (var i=0; i<arr.length; i++) {
			  var a = arr[i].split('=');
			  var paramNum = undefined;
			  var paramName = a[0].replace(/\[\d*\]/, function(v) {
				paramNum = v.slice(1,-1);
				return '';
			  });
			  var paramValue = typeof(a[1])==='undefined' ? true : a[1];

			  if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
				  obj[paramName] = [obj[paramName]];
				}
				if (typeof paramNum === 'undefined') {
				  obj[paramName].push(paramValue);
				}else {
				  obj[paramName][paramNum] = paramValue;
				}
			  }else {
				obj[paramName] = paramValue;
			  }
			}
		}
		return obj;
	}
	
	/**
	 * setEmbedLink
	 */
	setEmbedLink(){
		if ( ! ( document.getElementById ) ) return void(0);
		var url = location.href.replace(/#.*$/,'').replace(/\?.*$/,'');
		
		//dataset on query
		url += '?';
		if(this.dataset_on_query) url += 'dataset=' + this.dataset_on_query.pid;
		
		//mode
		url += '&mode=' + (this.enable_3d? (this.ol3d.getEnabled()? '3D' : '2D') : '2D');
		
		//baseview
		var baseview = this.map.getLayers().getArray()[0].getLayersArray().filter(function(item){return item.getVisible()})[0];
		url += '&baseview=' + encodeURIComponent(baseview.getProperties().title);

		//views
		var encoded_views = new Array();
		var viewlayers = this.layers.overlays[this.options.map.mainlayergroup].getLayers().getArray().filter(function(item){if(item.id != "ofv-csw-spatial-coverages") return item});
		for(var i=0;i<viewlayers.length;i++){
			var encoded_view = "";
			var viewlayer = viewlayers[i];
			if(!viewlayer.getSource().getParams) continue;
			var params = viewlayer.getSource().getParams();
			var pid = viewlayer.id;
			var strategy = viewlayer.strategy;
			encoded_view += 'pid=' + pid + ',';
			encoded_view += 'strategy=' + strategy + ',';
			
			switch(strategy){
				case "ogc_filters":
					console.log("Setting embed link for view with strategy 'ogc_filters'");
					if(viewlayer.dsd){
						if(params['CQL_FILTER']) encoded_view += 'par=' + params['CQL_FILTER'] +',';
						//map options
						if(viewlayer.variable) encoded_view += 'var=' + viewlayer.variable +',';
						if(viewlayer.envfun) encoded_view += 'fun=' + viewlayer.envfun + ',';
						if(viewlayer.envmaptype) encoded_view += 'maptype=' + viewlayer.envmaptype + ',';
						if(viewlayer.envmaptype) encoded_view += 'env=' + params['env'] + ',';
						if(viewlayer.envcolscheme) encoded_view += 'cs=' + viewlayer.envcolscheme + ',';
						if(viewlayer.count) encoded_view += 'count=' + viewlayer.count + ',';
						if(params['STYLES']) encoded_view += 'style=' + params['STYLES'] + ',';
					}
					break;
				case "ogc_dimensions":
					console.warn("No embed link setter for view with strategy 'ogc_dimensions'");
					//TODO
					break;
				case "ogc_viewparams":
					console.log("Setting embed link for view with strategy 'ogc_viewparams'");
					if(params['VIEWPARAMS']) encoded_view += 'par=' + params['VIEWPARAMS'] + ',';
					//map options
					if(viewlayer.variable) encoded_view += 'var=' + viewlayer.variable +',';
					if(viewlayer.envfun) encoded_view += 'fun=' + viewlayer.envfun + ',';
					if(viewlayer.envmaptype) encoded_view += 'maptype=' + viewlayer.envmaptype + ',';
					if(viewlayer.envmaptype) encoded_view += 'env=' + params['env'] + ',';
					if(viewlayer.envcolscheme) encoded_view += 'cs=' + viewlayer.envcolscheme + ',';
					if(viewlayer.count) encoded_view += 'count=' + viewlayer.count + ',';
					if(params['STYLES']) encoded_view += 'style=' + params['STYLES'] + ',';
					break;
			}	
			
			if(this.dataset_on_query) if(this.dataset_on_query.pid == pid){
				encoded_view += 'q=true';
			}else{
				encoded_view += 'q=false';
			}
			encoded_views.push(encoded_view);
		}
		console.log("viewlayers");
		console.log(viewlayers);
		if(viewlayers.length > 0) url += '&views=' + encodeURIComponent(JSON.stringify(encoded_views));
		
		//extent, center, zoom
		url += '&extent=' + this.map.getView().calculateExtent(this.map.getSize()).join(',');
		url += "&center=" + this.map.getView().getCenter().join(',');
		url += "&zoom=" + this.map.getView().getZoom();

		//popup coords
		if(this.popup) {
			if(this.popup.id) url += '&popup_id=' + this.popup.id; 
			if(this.popup.coords) url += '&popup_coords=' + this.popup.coords.join(',');
		}

		document.getElementById('OpenFairViewer-link').value = url;
	}
	
	//===========================================================================================
	//CATALOGUE
	//===========================================================================================
	
	/**
	 * initBrowseCatalogue
	 */
	initBrowseCatalogue(){
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
				ISO19139_SRV_20060504
			],
			{
				namespacePrefixes: {
					"http://www.opengis.net/cat/csw/2.0.2": "csw",
					"http://www.opengis.net/ogc": 'ogc',
					"http://www.opengis.net/gml": "gml",
					"http://purl.org/dc/elements/1.1/":"dc",
					"http://purl.org/dc/terms/":"dct",
					"http://www.isotc211.org/2005/gmd" : "gmd",
					"http://www.isotc211.org/2005/gco" : "gco",
				},
				mappingStyle : 'standard'
			}
		];
		this.csw = new CSW(this.config.OGC_CSW_BASEURL, this.config.OGC_CSW_VERSION, this.cswConfig);
		//this.csw.GetCapabilities();
		//this.csw.GetRecordById(['fao-species-map-grn'], this.config.OGC_CSW_SCHEMA);
		//this.csw.GetRecords(1, this.config.OGC_CSW_MAXRECORDS, undefined, this.config.OGC_CSW_SCHEMA);
		return this.csw;
	}
	
	/**
	 * initBrowseAdvancedSettings
	 */
	initBrowseAdvancedSettings(){
		var this_ = this;
		//spatial coverage layer visibility
		$('#dataset-spatial-coverage-visible').change(function() {
			var layer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
			layer.setVisible(this.checked);
		});
		//spatial coverage layer extended or not
		$('#dataset-spatial-coverage-extended').change(function() {
			this_.setSpatialCoverageLayer(this_.records_on_find, this.checked, $('#dataset-spatial-coverage-visible').is(":checked"));
		});
	}
	
	/**
	 * initBrowsePagination
	 */
	initBrowsePagination(){
		var this_ = this;
		//Set paginated browsing operated by OGC CSW protocol
		$("#dataset-pages").bootpag({
			page: 1,
			total: 5,
			maxVisible: 5,
			leaps: true,
			firstLastUse: true,
			first: '←',
			last: '→',
		}).on("page", function(event, num){
			var maxrecords = parseInt($("select[id='datasets_length']").val());
			this_.getDatasetsFromCSWPage(maxrecords, num);
		});
	}
	
	lightenMetadata(inObj) {
		var obj = inObj;
		if(obj instanceof Array){
			var newObj = new Array();
			for(var i=0;i<obj.length;i++) {
			   var newObjItem = this.lightenMetadata(obj[i]);
			   newObj.push(newObjItem);
			}
			obj = newObj;
	
		}else{
	
			if(typeof obj === 'object'){
				if (obj['TYPE_NAME']){
					delete obj['TYPE_NAME'];
				};

				if(typeof obj.name != "undefined"){
				  if(typeof obj.name.CLASS_NAME != "undefined"){
					if(obj.name.CLASS_NAME == 'Jsonix.XML.QName'){
						obj = this.lightenMetadata(obj.value);  
					}
				  }
				}

			if(typeof obj === 'object'){	
				  var keys = Object.keys(obj);
				  for(var i=0;i<keys.length;i++) {
					var p = keys[i];
					if( ["characterString", "integer", "real", "decimal", "_boolean"].indexOf(p) != -1 || p.startsWith("abstract")){
					  var newobj = obj[p];
					  if(p=="abstractRing") {
						newobj = {
							value: {
								ring: {
									value: obj[p]
								}
							}
						};
					  }
					  obj = this.lightenMetadata(newobj);
					}else{
					  obj[p] = this.lightenMetadata(obj[p]);
					}
				  }
				}
			 
			}
		}
		return obj;
	}
	
	/**
	 * getDataProtocolsFromMetadataEntry
	 * @param md_entry
	 * @param protocol
	 * @param layerSuffix
	 * @returns a WFS base URL
	 */
	getDataProtocolsFromMetadataEntry(md_entry, protocol, layerSuffix){
		var out = new Array();
		if(!md_entry.metadata.distributionInfo.mdDistribution.transferOptions) return out;
		if(!md_entry.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine) return out;
		var onLines = md_entry.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine.filter(
		   function(item){
			var url = item.ciOnlineResource.linkage.url;
			if(!url) return;
			var protocolFilter = url.indexOf(protocol)!=-1 | url.indexOf(protocol.toLowerCase())!=-1;
			var layerFilter = layerSuffix? item.ciOnlineResource.name.endsWith(layerSuffix) : true;
			var filter = protocolFilter && layerFilter;
			if(filter) return item;
		   }
		);
		//if(onLines.length == 0) console.warn("No Dataset URL from metadata entry");
		if(onLines.length > 0){
			for(var i=0;i<onLines.length;i++){
				//layerUrl
				console.log(onLines);
				var layerUrl = onLines[i].ciOnlineResource.linkage.url;
				if(layerUrl.indexOf("ows?")>0) layerUrl = layerUrl.split("ows?")[0] + "ows?service="+ protocol;
				if(layerUrl.indexOf(protocol.toLowerCase()+"?")>0) layerUrl = layerUrl.split(protocol.toLowerCase()+"?")[0] + "ows?service=" + protocol;
				//layerName
				var layerName = onLines[i].ciOnlineResource.name;
				if(layerSuffix) layerName = layerName + layerSuffix;
				//serviceVersion
				var serviceVersion = null;
				var url = onLines[i].ciOnlineResource.linkage.url;
				if(url.indexOf("&version=") > 0) serviceVersion = url.split("&version=")[1].split("&")[0];
				if(url.indexOf("&VERSION=") > 0) serviceVersion = url.split("&VERSION=")[1].split("&")[0];
				out.push({url : layerUrl, version: serviceVersion, name: layerName});
			}
		}
		return out;
	}
	
	/**
	 * getDatasetGeometryComponent
	 * @param dataset
	 */
	getDatasetGeometryComponent(dataset){
		if(!dataset.dsd) return;
		var geom_component = dataset.dsd.filter(function(item){if(item.primitiveType.startsWith("gml")) return item});
		if(geom_component.length==0) return;
		return geom_component[0];
	}
	
	/**
	 * buildDynamicStylename
	 * @param
	 */
	buildDynamicStylename(dataset, variable, maptype, classnb){
		if(!variable) return null;
		var geom_component = this.getDatasetGeometryComponent(dataset);
		var geom = null;
		switch(geom_component.primitiveType){
			case "gml:PointPropertyType": geom = "point"; break;
			case "gml:MultiPointPropertyType": geom="point"; break;
			case "gml:LineStringPropertyType": geom = "linestring"; break;
			case "gml:MultiLineStringPropertyType": geom = "linestring"; break;
			case "gml:PolygonPropertyType": geom = "polygon"; break;
			case "gml:MultiPolygonPropertyType": geom = "polygon"; break;
		}
		if(!geom) console.warn("No 'geom' type set for builing dynamic stylename. Check DSD geometry type");
		return "dyn_geom-"+geom+"_map-"+maptype+"_class-"+classnb;
	}
	
	/**
	 * OpenFairViewer.prototype.getDatasetFeatures
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param queryparams
	 * @param cql_filter
	 * @param propertyNames
	 * @returns a Jquery promise
	 */
	getDatasetFeatures(layerUrl, serviceVersion, layerName, strategy, queryparams, cql_filter, propertyNames){
	    var wfsRequest = this.getDatasetWFSLink(layerUrl, serviceVersion, layerName, strategy, queryparams, cql_filter, propertyNames, "json");
	    var deferred = $.Deferred();
	    $.ajax({
                url: wfsRequest,
                contentType: 'application/json',
                type: 'GET',
                success: function(response){
			var features = response.features;			
			deferred.resolve(features);
		},
		error: function(error){
			console.error(error);
			deferred.reject(error);
		}
	    });
	    return deferred.promise();
	}
	
	/**
	 * OpenFairViewer.prototype.getGeometryColumn
	 * @param dsd
	 */
	
	getGeometryColumn(dsd){
		var gmlProperty = dsd.filter(function(item){if(item.primitiveType.startsWith("gml")) return item});
		if(gmlProperty.length == 0) return null;
		return gmlProperty[0].primitiveCode;
	}
	
	/**
	 * OpenFairViewer.prototype.getFeatureInfo
	 * @param layer
	 * @param coords
	 */
	getFeatureInfo(layer, coords){
		var this_ = this;
		var viewResolution = this_.map.getView().getResolution();
		var viewProjection = this_.map.getView().getProjection().getCode();
		var popup = this.map.getOverlayById(layer.id);

		var featureInfoUrl = layer.getSource().getFeatureInfoUrl(coords, viewResolution, viewProjection, {'INFO_FORMAT': "application/vnd.ogc.gml"});
		if(this.secure) featureInfoUrl = featureInfoUrl.replace("http://", "https://");

		$.ajax({
			url: featureInfoUrl,
			crossOrigin: true,
			type: 'GET',
			success: function(text){
				var parser = new olFormat.WMSGetFeatureInfo();
				var features = parser.readFeatures(text);
				console.log(features);
				if(features.length > 0){
					var feature = features[0];
					feature.geometry_column = feature.getGeometryName();
					feature.popup_coordinates = coords;
					popup.show(coords, this_.options.map.tooltip.handler(layer, feature));
					this_.popup = {id: layer.id, coords: coords};
				}else{
					popup.hide();
					this_.popup = {};

					//in case feature markers are highlighted we remove them
					var markersId = 'ofv-feature-marker';
					var markers = this_.getLayerByProperty(markersId, 'id');
					if(markers){
						var source = new Vector({ features: [] });
						markers.setSource(source);
					}
			
				}
			}
		});
	}

	/**
	 * OpenFairViewer.prototype.getDatasetNextFeatureInTime
	 * @param layerUrl
	 * @param serviceVersion
	 * @param layerName
	 * @param propertyName
	 * @param propertyValue
	 * @returns a Jquery promise
	 */
	getDatasetNextFeatureInTime(layerUrl, serviceVersion, layerName, propertyName, propertyValue){
	    var wfsRequest = this.getDatasetWFSLink(layerUrl, serviceVersion, layerName, 'ogc_filters', null, propertyName + ' > ' + propertyValue, null, 'json');
	    wfsRequest += '&sortBy='+propertyName+'&maxFeatures=1';
	    var deferred = $.Deferred();
	    $.ajax({
                url: wfsRequest,
                contentType: 'application/json',
                type: 'GET',
                success: function(response){
			var geojson = new olFormat.GeoJSON();
			var features = geojson.readFeatures(response);			
			deferred.resolve(features);
		},
		error: function(error){
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
	 */
   getNextFeatureInfoInTime(pid, layerUrl, serviceVersion, layerName, propertyName, propertyValue){
		var this_ = this;
		var layer = this.getLayerByProperty(pid, "id");
		var viewResolution = this_.map.getView().getResolution();
		var viewProjection = this_.map.getView().getProjection().getCode();
		var popup = this.map.getOverlayById(layer.id);

		this.getDatasetNextFeatureInTime(layerUrl, serviceVersion, layerName, propertyName, propertyValue).then(function(nextresponse){
			
			if(nextresponse.length > 0){
				var nextfeature = nextresponse[0];
				var geom = nextfeature.getGeometry();
				var coords = olExtent.getCenter(geom.getExtent());
				if(geom instanceof olGeom.LineString ||
		   	   	   geom instanceof olGeom.MultiLineString ||
	 	   	   	   geom instanceof olGeom.MultiPoint){
					coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length/2)];
				}
				if(geom instanceof olGeom.Point) coords = geom.getCoordinates();			

				//popup handling
				popup.show(coords, this_.options.map.tooltip.handler(layer, nextfeature));
				this_.popup = {id: layer.id, coords: coords};
			}else{
				popup.hide();
				this_.popup = {};
			}
		});
	}
	
	/**
	 * addLayerPopup
	 * @param layer
	 */
    addLayerPopup(layer){
		var this_ = this;
		//configure popup
		var popup = new Popup({id: layer.id});
		this.map.addOverlay(popup);
	
		//display popup on mouse hover
		var featureInfoEvent = this.map.on('singleclick', function(evt) {		
			this_.getFeatureInfo(layer, evt.coordinate);
		});
		featureInfoEvent.id = layer.id;
		this.mapEvents.push(featureInfoEvent);
	}

    /**
	 * removeMapEventByProperty Util method to remove a map event by property
	 * @param eventProperty the property value
	 * @param by the property 
	 */
    removeMapEventByProperty(eventProperty, by){
		console.log("Remove map event with property "+by+" = " + eventProperty);
		var removed = false;
		var target = undefined;
		var events = this.mapEvents;
		for(var i=0;i<events.length;i++){
			var event = events[i];
			if(event[by] === eventProperty){
				unByKey(event);
				removed = true;
				break;
			}
		}
		this.mapEvents = this.mapEvents.filter(function(value, index, arr){return value.id != eventProperty});
		return removed;
	}
	

    /**
	 * removeLayerByProperty Util method to remove a layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
    removeLayerByProperty(layerProperty, by){
		console.log("Remove layer dataset with property "+by+" = " + layerProperty);
		var removed = false;
		if(!by) byTitle = false;
		var target = undefined;
		var layerGroups = this.map.getLayers().getArray();
		for(var i=0;i<layerGroups.length;i++){
			var layerGroup = layerGroups[i];
			var layers = layerGroup.getLayers().getArray();
			for(var j=0;j<layers.length;j++){
				var layer = layers[j];
				var condition  = by? (layer.get(by) === layerProperty) : (layer.getSource().getParams()["LAYERS"] === layerProperty);
				if(condition){
					this.layers.overlays[i-1].getLayers().remove(layer);
					var related_overlay = this.map.getOverlayById(layer.id)
					if(related_overlay) this.map.removeOverlay(related_overlay);
					this.removeMapEventByProperty(layer.id, "id");
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
	 */
	getDatasetValues(features, propertyName){
		var values = new Array();
		if(features.length > 0){
			values = features.map(function(f){
				return (propertyName? f.properties[propertyName] : f.properties)
			});
		}
		return values;
	}

	/**
     * OpenFairViewer.prototype.calculateBreaks
	 * @param values an array of numeric values
	 * @param classType the type of classification to apply
	 * @param classNb the number N of class breaks
	 * @returns an array of N+1 class breaks
     */
	calculateBreaks(values, classType, classNb){
	    var breaks =  new Array();
	    switch(classType){
		//CKmeans
		case "ckmeans":
		    var clusters = stats.ckmeans(values, classNb);
		    breaks = new Array();
		    for(var i=0;i<clusters.length;i++){
			var cluster = clusters[i];
			breaks.push(stats.min(cluster));
			if(i==clusters.length-1) breaks.push(stats.max(cluster));
		    }
		    break;
		//Equal intervals
		case "equal":
		    breaks = stats.equalIntervalBreaks(values, classNb);
		    break;
		//quantiles
		case "quantile":
		    var qpt = 1/classNb;
		    breaks = new Array();
		    breaks.push(stats.min(values));
		    for(var i=1;i<=classNb;i++){
			breaks.push(stats.quantile(values,qpt*i));
		    }
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
	 */
	buildEnvParams(geom, variable, breaks, colors){
	    var envparams = "geom:"+ geom +";var:"+variable+";";
	    for(var i=1;i<=breaks.length;i++){
			envparams += "v"+ i +":"+ breaks[i-1] + ";";
	    }
		for(var i=1;i<=colors.length;i++){
			envparams += "c"+ i +":"+ colors[i-1] + ";";
		}
	    return envparams;
	}

	/**
	 * OpenFairViewer.prototype.getDatasetViewTitle
	 * @param dataset
	 * @param strategyparams
	 */
	getDatasetViewTitle(dataset, strategyparams){
		var this_ = this;
		var layerTitle = '<button class="btn btn-xs dataset-button dataset-button-remove" data-pid="'+dataset.pid+'" title="'+this_.options.labels.dataset_remove+'" '
		layerTitle += 'onclick="'+this_.config.OFV_ID+'.unselectDataset(this)"> X </button>';
		layerTitle += '<span>'+dataset.entry.title+'</span>';

		if(strategyparams) if(strategyparams instanceof Array) if(strategyparams.length > 0){
			var strategyName;
			switch(dataset.strategy){
				case "ogc_filters": strategyName = this.options.labels.ogc_filters; break;
				case "ogc_dimensions": strategyName = this.options.labels.ogc_dimensions; break;
				case "ogc_viewparams": strategyName = this.options.labels.ogc_viewparams; break;
			}
			layerTitle += '</br>';
			layerTitle += '<p style="font-weight:normal !important;font-size:90%;overflow-wrap:break-word;"><b>'+strategyName+':</b></br>';
			if(dataset.strategy == "ogc_filters"){
				if(strategyparams[0].CQL_FILTER){
					layerTitle += strategyparams[0].CQL_FILTER;
				}else{
					for(var i=0;i<strategyparams.length;i++){
						var strategyparam = strategyparams[i];
						var key = Object.keys(strategyparam)[0];
						var component = strategyparam[key];
						if(!(component.content instanceof Array)) component.content = [component.content];
						layerTitle += '&#8226; ' + key + ': '+ (component.type=="list"? component.content.join(',') : component.content.join('/') ) + '</br>';
					}
				}
				
			}else{
				for(var i=0;i<strategyparams.length;i++){
					var strategyparam = strategyparams[i];
					var key = Object.keys(strategyparam)[0];
					var component = strategyparam[key];
					if(!(component.content instanceof Array)) component.content = [component.content];
					layerTitle += '&#8226; ' + key + ': '+ component.content.join(',') + '</br>';
				}
			}
			layerTitle += '</p>';
		}
		return layerTitle;
	}
	
	getDatasetDOILink(md_entry){
		var ident = md_entry.metadata.identificationInfo; if(!ident) return null;
		var identifiers = ident[0].citation.ciCitation.identifier; if(!identifiers) return null;
		var doi_identifiers = identifiers.filter(function(identifier){
			var hasDOI = false;
			if(identifier.mdIdentifier.code.href) if(identifier.mdIdentifier.code.href.indexOf("dx.doi.org")!=-1) hasDOI = true;
			if(!hasDOI) if(identifier.mdIdentifier.code.value) if(identifier.mdIdentifier.code.value.startsWith("doi:")!=-1) hasDOI = true;
			if(hasDOI) return identifier;
		});
		if(doi_identifiers.length == 0) return null;
		var doi = null;
		var doi_identifier = doi_identifiers[0].mdIdentifier;
		if(doi_identifier.code.href){
			doi = doi_identifier.code.href.split("dx.doi.org/")[1];
		}else{
			doi = doi_identifier.code.value.split("doi:")[1];
		}
		return doi;
	}
        
	/**
	 * createMetadataEntry
	 * @param value
	 */
	createMetadataEntry(value){
		var this_ = this;
		var md_entry = new Object();
		console.log(value);
		md_entry.metadata = this_.lightenMetadata(value);

		//delete csw_result.value;
		md_entry.pid = md_entry.metadata.fileIdentifier;
		md_entry.pidinfo = md_entry.pid;
		//title
		md_entry.title = md_entry.metadata.identificationInfo[0].citation.ciCitation.title;
		md_entry.title_tooltip = md_entry.title;
		//graphic overviews
		var graphicOverviews = md_entry.metadata.identificationInfo[0].graphicOverview
		if(graphicOverviews) if(graphicOverviews.length > 0) md_entry.graphic_overview = graphicOverviews[0].mdBrowseGraphic.fileName;
		md_entry._abstract = md_entry.metadata.identificationInfo[0]._abstract;
		//extents
		var extents = md_entry.metadata.identificationInfo[0].extent; 
		if(extents) if(extents[0].exExtent.temporalElement){                          
			var temporalExtent = extents[0].exExtent.temporalElement[0].exTemporalExtent.extent;
			if(temporalExtent.beginPosition) md_entry.time_start = temporalExtent.beginPosition.value[0];
			if(temporalExtent.endPosition) md_entry.time_end = temporalExtent.endPosition.value[0];
			if(temporalExtent.timePosition) md_entry.time_position = temporalExtent.timePosition.value; //TODO to see how to deal with that
		}
		//projection
		md_entry.projection = new olProj.get('EPSG:4326');
		if(md_entry.metadata.referenceSystemInfo) {
			var srs = md_entry.metadata.referenceSystemInfo[0].mdReferenceSystem.referenceSystemIdentifier.rsIdentifier;
			var srs_proj = new olProj.get(srs.codeSpace + ':' + srs.code);
			if(srs_proj.code_) md_entry.projection = srs_proj;
		}
		//content information
		if(md_entry.metadata.contentInfo) if(md_entry.metadata.contentInfo[0].featureCatalogueCitation) if(md_entry.metadata.contentInfo[0].featureCatalogueCitation[0].uuidref){
			var fc_url = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gfc&id=" + md_entry.metadata.contentInfo[0].featureCatalogueCitation[0].uuidref;
			md_entry.dsd = this_.rewriteURL(fc_url);
		}
		//distribution information
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
	 */
	buildSpatialCoverageFeature(dataset, extended){
		var this_ = this;
		var idents = dataset.metadata.identificationInfo;
		if(!idents) return; if(idents.length == 0) return;
		var extents = idents[0].extent;
		if(!extents) return; if(extents.length == 0) return;
		var geo_extents = extents[0].exExtent.geographicElement;
		if(!geo_extents) return; if(geo_extents.length == 0) return;
		
		var geometries = new Array();
		for(var i=0;i<geo_extents.length;i++){
			var geo_extent = geo_extents[i];
			var geo_keys = Object.keys(geo_extent);
			var is_bbox = geo_keys.indexOf("westBoundLongitude")!=-1 && geo_keys.indexOf("eastBoundLongitude")!=-1 && 
						  geo_keys.indexOf("southBoundLatitude")!=-1 && geo_keys.indexOf("northBoundLatitude")!=-1;
			if(is_bbox){
				//case of bounding box
				var coords = [
					geo_extent.westBoundLongitude, geo_extent.southBoundLatitude,
					geo_extent.eastBoundLongitude, geo_extent.northBoundLatitude
				]
				var polyCoords = [
					[coords[0],coords[1]],
					[coords[0],coords[3]],
					[coords[2],coords[3]],
					[coords[2],coords[1]],
					[coords[0],coords[1]]
				];
				var polyCoordsGeom = new olGeom.LineString(polyCoords);
				//reproject if needed
				var srs_data = dataset.projection;
				var srs_map = this.map.getView().getProjection();
				console.log(srs_data);
				if(srs_data) if(srs_data.getCode() != srs_map.getCode()){
					polyCoordsGeom.transform(srs_data, srs_map);
				}
				geometries.push(polyCoordsGeom);
			}else{
				//case of bounding polygons
				if(extended) if(geo_keys.length == 1 && geo_keys[0]=="polygon"){
					var polygons = geo_extent.polygon;
					//jsonix to Geojson
					var geomConverter = new GML_V_3_1_1.GeoJSON.ForwardGeometryConverter();	
					polygons.forEach(function(polygon){
						var geojson_geom = geomConverter.createGeometry(polygon);
						console.log("Convert JSONIX to GeoJSON");
						console.log("from JSONIX = "+JSON.stringify(polygon));
						console.log("to GeoJSON = "+JSON.stringify(geojson_geom));
						console.log(geojson_geom);
						var ol_geom_handler = null;
						switch(geojson_geom.type){
							case "Point": ol_geom_handler = olGeom.Point; break;
							case "MultiPoint": ol_geom_handler = olGeom.MultiPoint; break;
							case "LineString":  ol_geom_handler = olGeom.LineString; break;
							case "MultiLineString":  ol_geom_handler = olGeom.MultiLineString; break;
							case "Polygon":  ol_geom_handler = olGeom.Polygon; break;
							case "MultiPolygon":  ol_geom_handler = olGeom.MultiPolygon; break;
						}
						var geom = new ol_geom_handler(geojson_geom.coordinates);
						//reproject if needed
						var srs_data = dataset.projection;
						var srs_map = this_.map.getView().getProjection();
						if(srs_data) if(srs_data.getCode() != srs_map.getCode()){
							geom.transform(srs_data, srs_map);
						}
						if(ol_geom_handler) geometries.push( geom );
					});
					
				}
			}
		}
		
		var feature_geom = null;
		if(geometries.length==1){
			feature_geom = geometries[0];
		}else{
			feature_geom = new olGeom.GeometryCollection();
			feature_geom.setGeometriesArray(geometries);
		}
		const feature = new Feature({
			geometry: feature_geom,
			style : this_.options.find.defaultStyle
		});
		feature.setId(dataset.pid);
		feature.ol_uid = dataset.pid;
		
		return feature;
	}
	
	/**
	 * buildSpatialCoverageDataset
	 * @param datasets
	 */
	buildSpatialCoverageDataset(datasets, extended){
		var this_ = this;
		var features = datasets.map(function(dataset,i){return this_.buildSpatialCoverageFeature(dataset, extended)});
		features = features.filter(function(feature){if(typeof feature != "undefined") return feature;});
		return features;
	}
	
	/**
	 * setSpatialCoverageLayer
	 * @param datasets
	 */
	setSpatialCoverageLayer(datasets, extended, visible){
		var this_ = this;
		
		var features = this_.buildSpatialCoverageDataset(datasets, extended);
		
		var layerId = 'ofv-csw-spatial-coverages';
		var layer = this.getLayerByProperty(layerId, 'id');
		var source = new Vector({features: features});
		if(!layer){
			var layer = new VectorLayer({
				id: undefined, title: undefined,
				source: source,
				visible: visible
			});
			layer.id = layerId;
			this.layers.overlays[this_.options.map.mainlayergroup].getLayers().push(layer);
			var layerPointer = new olInteraction.Select({
				condition: pointerMove,
				layers: [layer]
			});

			layerPointer.on('select', function(evt){
				if(evt.selected) if(evt.selected.length>0){
					evt.selected.forEach(function(feature){
						feature.setStyle(this_.options.find.hoverStyle);
						$("#"+feature.getId()).addClass("hovered");
					});
					
				}
				if(evt.deselected) if(evt.deselected.length>0){
					evt.deselected.forEach(function(feature){
						feature.setStyle(null);
						$("#"+feature.getId()).removeClass("hovered");
					});
				}
			});
			this.map.addInteraction(layerPointer);
		}else{
			layer.setSource(source);
		}
	}
	
	/**
	 * getRecords
	 * @param maxrecords
	 * @param page
	 * @param filter
	 */
	getRecords(maxrecords, page, filter){
		var deferred = $.Deferred();
		var this_ = this;
		var last = page * maxrecords;
		var first = last - maxrecords + 1;
		console.log("Get CSW Records for page "+page+" [from index "+first+" to "+last+"] ...");
		this.csw.GetRecords(first, maxrecords, filter, this.config.OGC_CSW_SCHEMA).then(function(result){				 
			var csw_results = result.value.searchResults.any;
			var datasets = new Array();	
			//post-process results
			if(csw_results) for(var i=0;i<csw_results.length;i++){
				var csw_result = csw_results[i];    
				var md_entry = this_.createMetadataEntry(csw_result.value);
				datasets.push(md_entry);
			}                       
			  
			deferred.resolve(datasets);
		});
		return deferred.promise();
	 };
		
	/**
	 * createFilter
	 * @param bbox
	 */
	createFilter(bbox){
		var this_ = this;
		//base filter
		//on all dc types
		var dctypes = ['dataset', 'nonGeographicDataset', 'sensor', 'sensorSeries', 'platformSeries', 'productionSeries', 'series', 'transferAggregate', 'otherAggregate'];
		var filter = new Or(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, dctypes.map(function(dctype){
			return new IsLike(this_.config.OGC_FILTER_VERSION, this_.config.OGC_FILTER_SCHEMAS, 'dc:type', dctype);
		}));
		for(var i=0;i<this.options.find.filters.length;i++){
			var inputFilter = this.options.find.filters[i];
			var cswFilter = new IsLike(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, inputFilter.name, inputFilter.value);
			if(typeof filter == 'undefined'){
				filter = cswFilter;
			}else{
				filter = new And(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [filter, cswFilter]);
			}
		}
		
		//free text filter
		var txt = $("#dataset-search-text").val();
		if(txt != ""){
			txt = '%'+txt+'%';
			var txtFilter = new Or(
				this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
					new IsLike(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, 'dc:title', txt),
					new IsLike(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, 'dc:subject', txt)
				]
			)
			if(typeof filter == 'undefined'){
				filter = txtFilter;
			}else{
				filter = new And(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [filter, txtFilter]);
			}
		}
		
		//spatial filter
		if(bbox){
			filter = new And(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, [
				filter, new BBOX(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, bbox[1], bbox[0], bbox[3], bbox[2], 'urn:x-ogc:def:crs:EPSG:6.11:4326')
			]);
		}
		return filter;
	}
	
	/**
	 * loadTemplate
	 * @param {String} path
	 * @param {String} id
	 */
	loadTemplate(path, id){
		var deferred = $.Deferred();
		$.get(path, function(template, textStatus, jqXhr) {
			var template = $(template).filter('#'+id).html();
            deferred.resolve(template);
        });
		return deferred.promise();
	}
	
	/**
	 * getDatasetsFromCSWPage
	 * @param maxrecords
	 * @param page
	 */
	getDatasetsFromCSWPage(maxrecords, page){
		var this_ = this;
		$("#dataset-articles").empty();
		$("#dataset-articles").html('<p id="dataset-loader" class="loader-generic loader-generic-wide"><br /><br /><br />'+this_.options.labels.datasets_loader+'</p>');
		$("#dataset-loader").show();
		
		var thebbox = null;
		if($("#dataset-search-bbox-on-search").prop("checked")){
			thebbox = this_.map.getView().calculateExtent(this_.map.getSize());
		}
		
		var thefilter = this_.createFilter(thebbox); 
		console.log(thefilter);
		
		//display based on templates
		this.loadTemplate('templates/dataset.tpl.html', 'datasetTpl').then(function(template){
		
		  //get CSW records for page
		  this_.getRecords(maxrecords, page, thefilter).then(function(records){
			
			this_.records_on_find = records;
			
			$("#dataset-loader").hide();
			
			var dataHtml = '<section class="col-xs-12 col-sm-12 col-md-12">';
			console.log(records);
			for(var i=0;i<records.length;i++){
			  var record = records[i];
			  record.OFV_ID = this_.config.OFV_ID;
			  record.labels = this_.options.labels;
			  this_.cacheDataset(record);
			  var item_html = mustache.render(template, record);
			  dataHtml += item_html;
			}
			dataHtml += '</section>';
			$("#dataset-articles").html(dataHtml);
			this_.displayGraphicOverviews();
			
			//spatial coverage
			var extended = $("#dataset-spatial-coverage-extended").is(":checked");
			var visible = $("#dataset-spatial-coverage-visible").is(":checked");
			this_.setSpatialCoverageLayer(records, extended, visible);
			$("article").each(function(i,item){$(item).on('mouseenter', function(evt){
				var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
				var vectorFeature = vectorLayer.getSource().getFeatureById($(item)[0].id);
				if(vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")){
					var select = this_.map.getInteractions().getArray().filter(function(item){return item instanceof olInteraction.Select});
					if(select.length>0) select = select[0];
					vectorFeature.setStyle(this_.options.find.hoverStyle);
					select.getFeatures().push(vectorFeature);
					select.dispatchEvent('select');
				}
			})});
			$("article").each(function(i,item){$(item).on('mouseleave', function(evt){
				var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
				var vectorFeature = vectorLayer.getSource().getFeatureById($(item)[0].id);
				if(vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")){
					var select = this_.map.getInteractions().getArray().filter(function(item){return item instanceof olInteraction.Select});
					if(select.length>0) select = select[0];
					vectorFeature.setStyle(null);
					select.getFeatures().remove(vectorFeature);
					select.dispatchEvent('select');					
				}
			})});
		  });
		  
		});
	}
		
	/**
	 * getDatasetsFromCSW
	 * @param maxrecords
	 * @param bbox
	 */
	getDatasetsFromCSW(maxrecords, bbox){
		
		$("#dataset-count").empty();
		$("#dataset-articles").empty();
		$("#dataset-articles").html('<p id="dataset-loader" class="loader-generic loader-generic-wide"><br /><br /><br />Fetching datasets...</p>');
		$("#dataset-loader").show();
		
		//business logic
		var this_ = this;
		var deferred = $.Deferred();
		if(!this.csw) deferred.reject("CSW endpoint is not instantiated!");
		if(this.csw){
			
			//filter
			var filter = this.createFilter(bbox);
			
			//get 1st record to get numberOfRecordsMatched
			this.csw.GetRecords(1,1, filter, this.config.OGC_CSW_SCHEMA).then(function(response){
				
				//manage maxNb
				var numberOfRecordsMatched = response.value.searchResults.numberOfRecordsMatched;
				console.log("CSW GetRecords matched "+numberOfRecordsMatched+" records");
				var maxNb = numberOfRecordsMatched;
				if(this_.options.find.maxitems && numberOfRecordsMatched > this_.options.find.maxitems){
					console.log("Max items option set. Restraining number of records retrieved to "+this_.options.find.maxitems+" records");
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
	 */
	displayDatasets(maxrecords, bbox){
		var this_ = this;
		if($("#dataset-search-bbox-on-search").prop("checked") && !bbox){
			bbox = this.map.getView().calculateExtent(this.map.getSize());
		}
		this.getDatasetsFromCSW(maxrecords, bbox);
	}
	 
	/**
	 * displayGraphicOverviews
	 */
	displayGraphicOverviews(){
		var imgs = $("img.graphic_overview");
		$.each(imgs, function () {
			var $this = $(this);
			var im = new Image();
			im.onload = function () {
				var theImage = $this;
				$this.hide();
				theImage[0].src = im.src;
				$this.removeClass("loader-generic");
				$this.show();
			};
			im.onerror = function(){
				var theImage = $this;
				$this.hide();
				$this.removeAttr("alt");
				$this[0].src = "img/loading-error.svg";
				$this.show();
			}
			$this.addClass("loader-generic");
			im.src = $this.attr("src");
		});
	}
  
	/**
	 * displayDatasetMetadata
	 * Display the metadata associated to a dataset
	 * @param elm
	 *
	 **/
	displayDatasetMetadata(elm){  
		var pid = elm.getAttribute('data-pid');
		console.log("Display metadata dataset with pid = " + pid);
		var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}})[0];
		this.options.find.datasetInfoHandler(dataset.metadata);
	}
	  
	/**
	 * displayDatasetQueryForm
	 * Displays a dataset query form
	 * @param elm
	 *
	 **/  
	displayDatasetQueryForm(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Display query form dataset with pid = " + pid);
		var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}});
		if(dataset.length>0) dataset = dataset[0];
		this.handleQueryForm(dataset);
	}
	
	/**
	 * zoomToExtent
	 * Zooms to dataset extent
	 * @param elm
	 *
	 **/  
	zoomToExtent(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Zoom to dataset with pid = " + pid);
		var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}});
		if(dataset.length>0) dataset = dataset[0];
		var idents = dataset.metadata.identificationInfo;
		if(!idents) return; if(idents.length == 0) return;
		var extents = idents[0].extent;
		if(!extents) return; if(extents.length == 0) return;
		var geo_extents = extents[0].exExtent.geographicElement;
		if(!geo_extents) return; if(geo_extents.length == 0) return;

		var geo_extent = geo_extents[0];
		var geo_keys = Object.keys(geo_extent);
		var is_bbox = geo_keys.indexOf("westBoundLongitude")!=-1 && geo_keys.indexOf("eastBoundLongitude")!=-1 && 
					  geo_keys.indexOf("southBoundLatitude")!=-1 && geo_keys.indexOf("northBoundLatitude")!=-1;
		
		//bounding box coords
		var coords = undefined;
		if(is_bbox){
			//case of bounding box
			coords = [
				geo_extent.westBoundLongitude, geo_extent.southBoundLatitude,
				geo_extent.eastBoundLongitude, geo_extent.northBoundLatitude
			]
		}else{
			//TODO get bounding box from bounding polygon - not implemented
		}
		
		//projection
		var srs_data = dataset.projection;
		var srs_map = this.map.getView().getProjection();
		if(srs_data) if(srs_data.getCode() != srs_map.getCode()){
			console.log("Dataset projection:");
			console.log(srs_data);
			console.log("Map projection:");
			console.log(srs_map);
			console.log("Dataset projection ('"+srs_data+"') differs from map projection ('"+srs_map+"'). Reprojecting bounding box!");
			console.log("Coordinates (source) = ["+ coords + "]")
			var extentGeom = fromExtent(coords);
			extentGeom.transform(srs_data, srs_map);
			coords = extentGeom.getExtent();
			console.log("Coordinates (reprojected) = ["+ coords + "]")
		}
		
		//zoom
		if(coords) this.map.getView().fit(coords,this.map.getSize());
	}
	  
	/**
	 * cacheDataset
	 * Cache a dataset
	 * @param dataset
	 *
	 **/
	cacheDataset(dataset){
		var pid = dataset.pid;
		console.log("Cache dataset with pid = " + pid);
		var out =false;
		if(this.datasets.map(function(i){return i.pid}).indexOf(pid) == -1){
			this.datasets.push(dataset);
			out = true;   
		}
		return out;
	}	  
	  
	/**
	 * selectDataset
	 * Selects a dataset
	 * @param pid
	 *
	 **/
	selectDataset(pid){
		console.log("Select dataset with pid = " + pid);
		var out =false;
		if(this.selection.map(function(i){return i.pid}).indexOf(pid) == -1){
			var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}})[0];
			this.selection.push(dataset);
			out = true;   
		}
		return out;
	}
         
	/**
	 * unselectDataset
	 * Unselects a dataset
	 * @param elm
	**/
	unselectDataset(elm){
		var this_ = this;
		var pid = elm.getAttribute('data-pid');
		console.log("Unselect dataset with pid = " + pid);
		var thepid = null;
		if(this.dataset_on_query) thepid = this.dataset_on_query.pid;
		var out = false;
		var len1 = this.selection.length;
		this.selection = this.selection.filter(function(i,data){if(data.pid != pid){return data}});
		var len2 =  this.selection.length;
		out = len2<len1;

		//clear dsd interface in case selected dataset
		if(this.dataset_on_query) if(this.dataset_on_query.pid == pid){
			$("#dsd-ui").empty();
			this.dataset_on_query = null;
		}
		
		this.removeLayerByProperty(pid, "id");
		this.map.changed();
		this_.renderMapLegend();
		if(pid == thepid) this.openFindDialog();

		return out;
	}
	
	
	resolveDatasetDOI(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Resove DOI for dataset pid = " + pid);
		var the_dataset = this.datasets.filter(function(item){if(item.pid == pid) return item});
		if(the_dataset.length > 0) the_dataset = the_dataset[0]; window.open("//dx.doi.org/" + the_dataset.doi,'_blank');
	}

	
	/**
	 * getCSWRecord
	 * @param pid
	 * @returns a promise
	 */
	getCSWRecord(pid){
		console.log("Fetching metadata record from CSW for pid = '"+pid+"'");
		var this_ = this;
		var deferred = $.Deferred();
		var pidFilter =  new IsLike(this.config.OGC_FILTER_VERSION, this.config.OGC_FILTER_SCHEMAS, 'dc:identifier', pid);
		this_.csw.GetRecords(1, 1, pidFilter, this_.config.OGC_CSW_SCHEMA).then(function(result){
			var md_entry = new Object();
			if(result.value.searchResults.numberOfRecordsMatched > 0){                 
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
	 * @param {#document} response
	 * @returns {Object} a DSD json object
	 */
	parseFeatureCatalogue(response){
	
		//artisanal parsing of feature catalog XML
		//TODO keep investigating ogc-schemas extension for gfc.xsd with jsonix!!!!
		var dsd = { strategy: undefined, components: new Array() };
		var featureCatalogue = $(response.childNodes[0].childNodes).filter(function(idx,item){if(item.nodeName == "gfc:FC_FeatureCatalogue") return item;})
		if(featureCatalogue.length == 0){
			console.warn("No feature catalogue!")
			return;
		}
		
		//inherit feature catalogue scopes to define query strategy
		var strategy = "ogc_filters";
		var scopes = $(featureCatalogue[0].childNodes).filter(function(i,item){if(item.nodeName == "gmx:scope") return item});
		if(scopes.length == 0) {
			console.warn("No feature catalogue scope, setting default strategy to 'ogc_filters'");
		}else{
			var ofv_scopes = scopes.filter(function(i,item){if(item.children[0].textContent.startsWith("openfairviewer")) return item});
			if(ofv_scopes.length > 0){
				strategy = ofv_scopes[0].children[0].textContent.split(":")[1];
				console.log("OpenFairViewer Strategy read from Feature catalogue scope: "+strategy);
			}
		}
		dsd.strategy = strategy;
		
		//get feature types
		var featureTypes = $(featureCatalogue[0].childNodes).filter(function(idx,item){if(item.nodeName == "gfc:featureType") return item;});
	
		var ft = featureTypes[0];
		//get carrier of characteristics
		var characteristics = $(ft.childNodes[1].childNodes).filter(function(idx,item){ if(item.nodeName == "gfc:carrierOfCharacteristics") return item;});
		for(var i=0;i<characteristics.length;i++){
			var characteristic = characteristics[i];
			var featureAttribute = characteristic.childNodes[1];
			//name
			var fatName = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:memberName") return item;}); 
			if(fatName.length > 0) fatName = fatName[0].childNodes[1].textContent;
			//def
			var fatDef = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:definition") return item;});
			if(fatDef.length > 0) if(fatDef[0].childNodes.length > 0) {
				fatDef = fatDef[0].childNodes[1].textContent;
			}else{
				fatDef = null;
			}
			//code
			var fatCode = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:code") return item;});
			if(fatCode.length > 0) fatCode = fatCode[0].childNodes[1].textContent;
			//primitive type
			var fatType = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:valueType") return item;});
			var fatColType = null;
			var fatPrimType = null;	
			if(fatType.length > 0){
				var fatChildNode = fatType[0].childNodes[1].childNodes[1].childNodes[1];
				fatPrimType = fatChildNode.textContent;
				if(fatChildNode.hasAttribute("xlink:href")){
					fatColType = fatChildNode.getAttribute("xlink:href");
				}else{
					console.warn("No attribute/variable href defined as column type for attribute "+fatCode+" - default set to 'attribute'");
					fatColType = "attribute";
				}
			}
			//cardinality
			var minOccurs = 0;
			var maxOccurs = 1;
			var fatCardinality = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:cardinality") return item;});
			if(fatCardinality.length > 0) {
				fatCardinality = fatCardinality[0].childNodes[1].childNodes[1].childNodes[1].childNodes;
				minOccurs = parseInt(fatCardinality[1].childNodes[1].textContent);
				if(fatCardinality[3].childNodes[1].getAttribute("isInfinite") == "true"){
					maxOccurs = Infinity;
				}else{
					maxOccurs = parseInt(fatCardinality[3].childNodes[1].textContent);
				}
			}
			//measurementUnit
			var gmlUnitIdentifier = null;
			var gmlUnitName = null;
			var fatMeasurementUnit = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:valueMeasurementUnit") return item;});
			if(fatMeasurementUnit.length > 0){
				if(fatMeasurementUnit[0].childNodes.length > 0){
					var gmlUnit = $(fatMeasurementUnit[0].childNodes[1]);
					var gmlUnitIdentifierXml = gmlUnit.children().filter(function(i,item){if(item.nodeName == "gml:identifier") return item;});
					if(gmlUnitIdentifierXml.length > 0) gmlUnitIdentifier = gmlUnitIdentifierXml[0].textContent;
					var gmlUnitNameXml = gmlUnit.children().filter(function(i,item){if(item.nodeName == "gml:name") return item;});
					if(gmlUnitNameXml.length > 0) gmlUnitName = gmlUnitNameXml[0].textContent;
				}
			}
			
			//featureAttributeModel
			var featureAttributeModel = {
				name : fatName, definition : fatDef, primitiveCode: fatCode, primitiveType: fatPrimType, columnType: fatColType, 
				minOccurs: minOccurs, maxOccurs: maxOccurs,
				uom : gmlUnitIdentifier, uomLabel: gmlUnitName,
				values: null
			};
			//values
			var listedValues = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:listedValue") return item;});
			if(listedValues.length > 0){
				featureAttributeModel.values = new Array();
				for(var j=0;j<listedValues.length;j++){
					var listedValue = listedValues[j];
					var props = listedValue.childNodes[1].childNodes;
					var clCode = props[3].childNodes[1].textContent;
					var clLabel = props[1].childNodes.length > 0? props[1].childNodes[1].textContent : "";
					var clDefinition = undefined;
					if(props[5]) if(props[5].childNodes.length > 0) clDefinition = props[5].childNodes[1].textContent;
					var clHref = props[3].childNodes[1].getAttribute('xlink:href');
					var clItem = {id: clCode, text: clLabel, alternateText: (clDefinition? clDefinition : null), codelist: featureAttributeModel.primitiveCode, href: clHref};
					featureAttributeModel.values.push(clItem);
				}
			}
			
			dsd.components.push(featureAttributeModel);
		}
		console.log(dsd);
		return dsd;
	}
	

	/**
	 * handleQueryForm
	 * @param {Object} dataset
	 */
	handleQueryForm(dataset){
		console.log(dataset);
		$("#dsd-ui").empty();
		if(dataset.dsd){
			console.log("Handle DSD Query Form for dataset with pid = " + dataset.pid );
			return this.handleDSD(dataset);
		}else{ 
			console.log("Handle Filter Query Form for dataset with pid = " + dataset.pid );
			return this.handleFilter(dataset);
		};		
	}

	/**
	 * handleQueryFormButtons
	 * @param columnIdx
	 */
	handleQueryFormButtons(columnIdx){
		var this_ = this;
		//Query and mapbutton
		//------------------------------
		$("#dsd-ui-col-"+columnIdx).append('<br><br>');
		$("#dsd-ui-col-"+columnIdx).append('<button type="submit" id="datasetMapper" style="width:90%;" title="'+this_.options.labels.dataset_query_map_title+'" data-loading-text="<span class=\'query-loader\'></span>" class="btn btn-primary">'+this_.options.labels.dataset_query_map+'</button>');
		$("#dsd-ui-col-"+columnIdx).append('<br><span class="query-nodata" style="display:none;">'+this_.options.labels.nodata+'</span>');
				
		//download buttons
		//------------------------------
		$("#dsd-ui-col-"+columnIdx).append('<div id="dsd-ui-buttons" style="margin: 0 auto;width: 90%;text-align: center !important;"><p style="margin:0;"></div>');
		if(this.dataset_on_query.entry.wfs){
			//tabular viewer
			var button_tabulardata = '<button type="button" id="dsd-ui-button-table" class="btn data-action-button data-table" title="'+this_.options.labels.tabulardata_title+'" onclick="'+this_.config.OFV_ID+'.displayTabularDataset()"></button>';
			$("#dsd-ui-buttons").append(button_tabulardata);
			//dashboard
			if(this.options.access.dashboard.enabled) if(this.options.access.dashboard.handler){ 
				console.log("dashboard");
				var button_dashboard = '<button type="button" id="dsd-ui-button-dashboard" class="btn data-action-button data-dashboard" title="'+this_.options.labels.dashboard_title+'" onclick="'+this_.config.OFV_ID+'.accessDatasetDashboard()"></button>';
				$("#dsd-ui-buttons").append(button_dashboard);
			}
			//data download
			var button_csv_raw = '<button type="button" id="dsd-ui-button-csv2" class="btn data-action-button data-csv-raw" title="'+this_.options.labels.download_data+'" onclick="'+this_.config.OFV_ID+'.downloadDatasetCSV(false)"></button>';
			$("#dsd-ui-buttons").append(button_csv_raw);
		}
		var button_png_map = '<button type="button" id="dsd-ui-button-png" class="btn data-action-button data-png-map" title="'+this_.options.labels.download_map+'" onclick="'+this_.config.OFV_ID+'.downloadMapPNG()"></button>';
		$("#dsd-ui-buttons").append(button_png_map);
		
		$("#dsd-ui-col-"+columnIdx).append('<div id="dsd-ui-export-options" style="padding:0px 15px;text-align: left !important;display:none;"></div>');
		var export_options = '<a data-toggle="collapse" href="#dataset-export-options" role="button" aria-expanded="false" aria-controls="dataset-export-options">'+this_.options.labels.export_options+'</a><br>';
		export_options += '<div class="collapse multi-collapse" id="dataset-export-options">';
		export_options += '<fieldset style="border: 1px #ccc solid;border-radius:4px;padding:4px;">';
		//option to prettify column names
		export_options += '<div class="form-check" style="float:left;margin-right:20px;"><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-colnames" type="checkbox" class="form-check-input">'+this_.options.labels.export_options_prettify+'</label></div>';
		//option to enrich with data labels
		export_options += '<div class="form-check" ><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-labels" type="checkbox" class="form-check-input">'+this_.options.labels.export_options_labels+'</label></div>';
		
		export_options += '<span style="margin-top:10px;">'+this_.options.labels.export_options_more+'</span>';
		export_options += '<div class="data-export-buttons">';
		export_options += '<button type="button" id="dataset-export-option-wfs" class="btn data-action-button data-wfs" title="'+this_.options.labels.download_wfs+'" onclick="'+this_.config.OFV_ID+'.downloadDatasetWFS()"></button>';
		export_options += '<button type="button" id="dataset-export-option-rscript" class="btn data-action-button data-rscript" title="'+this_.options.labels.download_rscript+'" onclick="'+this_.config.OFV_ID+'.downloadDatasetRScript()"></button>';
		export_options += '</div>';
		export_options += '</fieldset>';
		export_options += '</div>';
		$("#dsd-ui-export-options").append(export_options);
		
		var layerName = this_.dataset_on_query.pid;
		var layer = this_.getLayerByProperty(this_.dataset_on_query.pid, 'id');
		if(layer){
			$('#dsd-ui-button-csv1').prop('disabled', false);
			$('#dsd-ui-button-csv2').prop('disabled', false);
			$('#dsd-ui-button-table').prop('disabled', false);
			$('#dsd-ui-button-dashboard').prop('disabled', false);
			this_.checkDatasetDashboardAvailability(layer);
			$('#dsd-ui-button-png').prop('disabled', false);
			$("#dsd-ui-export-options").show();
		}else{
			$('#dsd-ui-button-csv1').prop('disabled', true);
			$('#dsd-ui-button-csv2').prop('disabled', true);
			$('#dsd-ui-button-table').prop('disabled', true);
			$('#dsd-ui-button-dashboard').prop('disabled', true);
			this_.checkDatasetDashboardAvailability(layer);
			$('#dsd-ui-button-png').prop('disabled', true);
			$("#dsd-ui-export-options").hide();
		}
		
	}
	
	/**
	 * handleQueryMapOptions
	 * @param {Integer} columnIdx
	 */
	handleQueryMapOptions(columnIdx){		
		var this_ = this;
		//id
		var map_type_id = "map-type-selector";
		//html
		$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_type_id+'" class="dsd-ui-dimension" title="'+this_.options.labels.maptype_selector_title+'"></select>');
		//jquery widget
		var formatMaptype = function(item) {
			if (!item.id) { return item.text; }
			var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
			return $item;
		};
		var map_type_placeholder = this_.options.labels.maptype_selector;
		$("#" + map_type_id).select2({
			theme: 'classic',
			allowClear: false,
			placeholder: map_type_placeholder,
			data: [{id:'choropleth', text: this_.options.labels.maptype_choropleth},{id:'graduated', text: this_.options.labels.maptype_graduated}],
			templateResult: formatMaptype,
			templateSelection: formatMaptype
		});
		$("#" + map_type_id).val("choropleth").trigger("change");

		//6. Map classifications
		//Classification type
		//-------------------
		//id
		var map_classtype_id = "map-classtype-selector";
		//html
		$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_classtype_id+'" class="dsd-ui-dimension" title="'+this_.options.labels.class_selector_title+'"></select>');
		//jquery widget
		var formatClasstype = function(item) {
			if (!item.id) { return item.text; }
			var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
			return $item;
		};
		var map_classtype_placeholder = this_.options.labels.class_selector;
		$("#" + map_classtype_id).select2({
			theme: 'classic',
			allowClear: false,
			placeholder: map_classtype_placeholder,
			data: [{id:'ckmeans', text: this_.options.labels.class_ckmeans},{id:'equal', text: this_.options.labels.class_equal},{id:'quantile', text: this_.options.labels.class_quantile}],
			templateResult: formatClasstype,
			templateSelection: formatClasstype
		});
		$("#" + map_classtype_id).val("ckmeans").trigger("change");
		
		//Number of class intervals
		//-------------------------
		//id
		var map_classnb_id = "map-classnb-selector";
		//html
		$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_classnb_id+'" class="dsd-ui-dimension" title="'+this_.options.labels.classnb_selector_title+'"></select>');
		//jquery widget
		var formatClassnb = function(item) {
			if (!item.id) { return item.text; }
			var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
			return $item;
		};
		var map_classnb_placeholder = this_.options.labels.classnb_selector;
		$("#" + map_classnb_id).select2({
			theme: 'classic',
			allowClear: false,
			placeholder: map_classnb_placeholder,
			data: [{id: '3', text: '3'},{id: '4', text: '4'}, {id: '5', text: '5'}],
			templateResult: formatClassnb,
			templateSelection: formatClassnb
		});
		$("#" + map_classnb_id).val("5").trigger("change");
		
		//Color palettes
		//-------------------
		//id
		var map_colorscheme_id = "map-colorscheme-selector";
		//html
		$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_colorscheme_id+'" class="dsd-ui-dimension" title="'+this_.options.labels.colorscheme_selector_title+'"></select>');
		//jquery widget
		var formatColorscheme = function(item){
			if(!item.id) { return item.text; };
			var $item = $('<span title="'+item.text+'">'+item.svg+' <em>('+item.text+')</em></span>');
			return $item;
		};
		var map_colorscheme_placeholder = this_.options.labels.colorscheme_selector;
		var getPaletteAsSVG = function(id){
			var classnb = parseInt($("#map-classnb-selector").val());
			var colors = colorbrewer[id][classnb];
			console.log(colors);
			
			var sq_width = 15;
			var sq_height = 15;
			var svg = '<svg width="'+sq_width*classnb+'" height="'+sq_height+'" style="vertical-align:middle;">';
			var colorHeight = 0;
			colors.forEach(function(color){ 
				svg += '<rect fill="'+color+'" width="'+sq_width+'" height="'+sq_height+'" x="'+colorHeight+'"></rect>';
				colorHeight = colorHeight + sq_width;
			});
			svg += '</svg>';
			return svg;
		}
		var initColorschemeSelector = function(){
			$("#"+ map_colorscheme_id).select2({
				theme: 'classic',
				allowClear: false,
				placeholder: map_colorscheme_placeholder,
				data: Object.keys(colorbrewer.schemeGroups).splice(0,3).map(function(schemeGroup){
					return { 
						text: schemeGroup, 
						children: colorbrewer.schemeGroups[schemeGroup].map(function(item){
							return {id: item, text: item, svg: getPaletteAsSVG(item)}
						}) 
					} 
				}),
				templateResult: formatColorscheme,
				templateSelection: formatColorscheme
			});
		}
		initColorschemeSelector();
		$("#" + map_colorscheme_id).val("Reds").trigger("change");
		//events related to colorscheme selection
		$("#" + map_classnb_id).on('select2:select', function (e) { 
			initColorschemeSelector();
		});
		$("#" + map_type_id).on('select2:select', function(e) {
			console.log(e.target.value);
			if(e.target.value == 'choropleth'){
				$("#" + map_colorscheme_id).next(".select2-container").show();
			}else{
				$("#" + map_colorscheme_id).next(".select2-container").hide();
			}
		});
	}

	/**
	 * handleFilter
	 * @param {String} pid
	 */
	handleFilter(dataset){
		
		var deferred = $.Deferred();
		
		var this_ = this;
		var pid = dataset.pid;
		var entry = dataset.entry? dataset.entry : dataset;
		this.dataset_on_query = {pid: pid, entry: entry, strategy: "ogc_filters", dsd: null, query: null, thematicmapping: false};	
		
		//build UI
		var bootstrapClass = "col-md-" + 12/this_.options.access.columns;
		$("#dsd-ui").append('<div id="dsd-ui-header"></div>');
		$("#dsd-ui-header").append('<div class="alert alert-info" style="padding:6px;margin:6px;text-align:left;"><h5><b>'+entry.title+' <small><em>['+entry.pid+']</em></small></b></h5></div>');

		$("#dsd-ui").append('<form id="dsd-ui-body" onsubmit="'+this_.config.OFV_ID+'.mapDataset('+this_.config.OFV_ID+'.dataset_on_query, true);return false"></form>');
		$(document).on('submit', '#dsd-ui-body', function(event) {
			event.preventDefault();
		});
				
		$("#dsd-ui").append('<input type="text" autofocus="autofocus" style="display:none" />'); //Avoid autofocus on query inputs
		$("#dsd-ui-body").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');

		//id
		var ogcfilter_component_id = "ui-ogc_filter";
		//html
		$("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Filter</label></p></div>');
		$("#dsd-ui-col-1").append('<input type="text" id = "'+ogcfilter_component_id+'" class="dsd-ui-dimension" title="Filter data with CQL" autofocus="true" ></select>');
		
		//query form buttons
		this.handleQueryFormButtons(1);
		
		deferred.resolve(dataset);
		return deferred.promise();
	}

	/**
	 * handleDSD
	 * @param {Object} dataset
	 */
	handleDSD(dataset){

	    var deferred = $.Deferred();	
          
		$("#dsd-loader").show();
	  
		var this_ = this;
		var pid = dataset.pid;
		var entry = dataset.entry? dataset.entry : dataset;
		$.ajax({
			url: dataset.dsd,
			contentType: 'application/xml',
			type: 'GET',
			success: function(response){
				$("#dsd-loader").hide();
				
				//parse DSD
				var dsd = this_.parseFeatureCatalogue(response);
				if(!dsd){
					console.warn("No feature catalogue available although referenced in metadata. Delegate to simple filter form");
					this_.handleFilter(dataset);
					return;
				}
				this_.dataset_on_query = { 
					pid: pid, 
					entry: entry, 
					strategy: dsd.strategy, 
					dsd: dsd.components, 
					query: null, 
					thematicmapping: dsd.components.filter(function(item){if(item.columnType == "variable") return item}).length > 0
				};
				
				
				//build UI
				var bootstrapClass = "col-md-" + 12/this_.options.access.columns;
				$("#dsd-ui").append('<div id="dsd-ui-header"></div>');
				$("#dsd-ui-header").append('<div class="alert alert-info" style="padding:6px;margin:6px;text-align:left;"><h5><b>'+entry.title+' <small><em>['+entry.pid+']</em></small></b></h5></div>');

				$("#dsd-ui").append('<form id="dsd-ui-body" onsubmit="'+this_.config.OFV_ID+'.mapDataset('+this_.config.OFV_ID+'.dataset_on_query, true);return false"></form>');
				$(document).on('submit', '#dsd-ui-body', function(event) {
					event.preventDefault();
				});
				
				$("#dsd-ui").append('<input type="text" autofocus="autofocus" style="display:none" />'); //Avoid autofocus on query inputs
				$("#dsd-ui-body").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');
				
				//1. Build UI from ATTRIBUTES filtering
				//-------------------------------------------
				var attributes = this_.dataset_on_query.dsd.filter(function(item){if(item.columnType == "attribute") return item});
				if(attributes.length > 0){
					$("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;"><label>'+ this_.options.labels.filtering+'</label></p><hr style="margin:0px;"></div>');
					var attributeMatcher = function(params, data){
						params.term = params.term || '';
						if ($.trim(params.term) === '') {
						  return data;
						}  
						
						var term = params.term.toUpperCase();
						var altText = data.alternateText? data.alternateText : '';
						if (data.text.toUpperCase().indexOf(term) > -1  |
							data.id.toUpperCase().indexOf(term) > -1    |
							altText.toUpperCase().indexOf(term) > -1    ) {
							return data;
						}
						return null;
					}

					$("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.labels.attributes+'</label></p></div>');
					for(var i=0;i<this_.dataset_on_query.dsd.length;i++){
						var dsd_component = this_.dataset_on_query.dsd[i];
						if(dsd_component.columnType == "attribute"){
							
							//attribute with list values --> DROPDOWNLISTS
							if(dsd_component.values){
								
								var withNames = dsd_component.values.map(function(item){return item.text}).every(function(element, index, array){return element != null && element != ""});
								
								//id
								var dsd_component_id = "dsd-ui-dimension-attribute-" + dsd_component.primitiveCode;
									
								var isRequired = dsd_component.minOccurs == 1? true : false;
								var isMultiple = dsd_component.maxOccurs == Infinity? true : false; 								

								if(dsd_component.primitiveType == "xsd:string" || withNames){
								
									//html
									$("#dsd-ui-col-1").append('<select id = "'+dsd_component_id+'" '
										+ (isMultiple? 'multiple="multiple"' : '')
										+ (isRequired? 'required' : '')
										+' class="dsd-ui-dimension dsd-ui-dimension-attribute" title="Filter on '+dsd_component.name+'">'+(isMultiple? '' : '<option></option>')+'</select>'
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
									});
									
									//add info button
									if(dsd_component.definition) if(dsd_component.definition.length > 0){
										$("#dsd-ui-col-1").append('<span class="glyphicon glyphicon-info-sign attribute-info" title="'+dsd_component.definition+'"></span>');
									}
								}else if((dsd_component.primitiveType == "xsd:int" ||
										 dsd_component.primitiveType == "xsd:decimal") && !withNames){
									
									var values = dsd_component.values.map(function(item){return parseInt(item.id)});
									var values_min = Math.min.apply(Math, values);
									var values_max = Math.max.apply(Math, values);					
									
									//html
									var dsd_component_id_range = dsd_component_id + "-range";
									var dsd_component_id_slider = dsd_component_id + "-slider";
									var dsd_component_slider_html = '<div id="'+dsd_component_id+'" class="dsd-ui-dimension dsd-ui-dimension-attribute dsd-ui-dimension-slider">' +
									'<p><label for="'+dsd_component_id_range+'">'+dsd_component.name+': </label>' +
									'<input type="text" id="'+dsd_component_id_range+'" readonly style="margin-left:5px; border:0; color:#f6931f; font-weight:bold;"></p>' +
									'<div id="'+dsd_component_id_slider+'"></div>' +
									'</div>';
									$("#dsd-ui-col-1").append(dsd_component_slider_html);
									
									//jquery widget
									$("#"+dsd_component_id_slider).slider({
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
									$("#"+dsd_component_id_range).val(value);
									
								}
								
							}
							
							//attribute with time --> datepicker / datetimepicker
							if(dsd_component.primitiveType == "xsd:date" || dsd_component.primitiveType == "xsd:datetime"){
								//indicates local tzone but required to display well the original date
								var entry_time_start = entry.time_start; if(entry_time_start.length == 4) entry_time_start = entry_time_start + "-01-01";
								var time_start_local = new Date(Date.parse(entry_time_start.split('Z')[0]));
								var time_start_local_offset = time_start_local.getTimezoneOffset()*60000;
								var time_start = new Date(time_start_local.getTime() + time_start_local_offset);
								var entry_time_end = entry.time_end; if(entry_time_end.length == 4) entry_time_end = entry_time_end + "-12-31";
								var time_end_local = new Date(Date.parse(entry_time_end.split('Z')[0]));
								var time_end_local_offset = time_end_local.getTimezoneOffset()*60000;
								var time_end = new Date(time_end_local.getTime() + time_end_local_offset);
		
								//id
								var dsd_component_id_start = "dsd-ui-dimension-time-start-"+dsd_component.primitiveCode;
								var dsd_component_id_end = "dsd-ui-dimension-time-end-"+dsd_component.primitiveCode;
								//html
								var dsd_component_time_html = '<div class="dsd-ui-dimension-time" style="text-align:left;margin-left:0px;margin-bottom:5px;">';
								dsd_component_time_html += '<label style="width:120px;font-weight:normal;">'+dsd_component.name+ '</label><br> <input type="text" id="'+dsd_component_id_start+'" class="dsd-ui-dimension-datepicker" autocomplete="off" >'
								if(dsd.strategy=="ogc_filters") dsd_component_time_html += '<input type="text" id="'+dsd_component_id_end+'" class="dsd-ui-dimension-datepicker" autocomplete="off">'
								$("#dsd-ui-col-1").append(dsd_component_time_html);
								
								var startRange = $("#"+dsd_component_id_start);
								var endRange = $("#"+dsd_component_id_end);
								
								//jquery widget
								if(dsd_component.primitiveType == "xsd:date"){
									switch(dsd.strategy){
										case "ogc_filters":
											startRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												formatDate:'Y-d-m',
												formatTime: 'HH:mm:ss',
												timepicker:false,
												onShow:function( ct ){
													this.setOptions({
														maxDate:endRange.val()?endRange.val():false
													})
												}
											});
											//startRange.val(time_start.toISOString().split('T')[0]);
											endRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												formatDate:'Y-d-m',
												formatTime: 'HH:mm:ss',
												timepicker:false,
												onShow:function( ct ){
													this.setOptions({
														minDate:startRange.val()?startRange.val():false
													})
												}
											});
											//endRange.val(time_end.toISOString().split('T')[0]);
											break;
										case "ogc_viewparams":
											startRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												yearStart: time_start.getFullYear(), yearEnd: time_end.getFullYear(),
												format:'Y-d-m', timepicker:false
											});
											//startRange.val(time_start.toISOString().split('T')[0]); break;
									}
								}else if(dsd_component.primitiveType == "xsd:datetime"){
									switch(dsd.strategy){
										case "ogc_filters":
											startRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												formatDate:'Y-d-m',
												formatTime: 'HH:mm:ss',
												onShow:function( ct ){
													this.setOptions({
														maxDate:endRange.val()?endRange.val():false
													})
												}
											});
											//startRange.val(time_start.toISOString().replace('T', ' '));
											endRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												formatDate:'Y-d-m',
												formatTime: 'HH:mm:ss',
												onShow:function( ct ){
													this.setOptions({
														minDate:startRange.val()?startRange.val():false
													})
												}
											});
											//endRange.val(time_end.toISOString().replace('T', ' '));
											break;
										case "ogc_viewparams":
											startRange.datetimepicker({
												minDate: time_start, maxDate: time_end,
												formatDate:'Y-d-m',
												formatTime: 'HH:mm:ss'
											});
											//startRange.val(time_start.toISOString().replace('T', ' ')); break;
									}
								}
								
								$("#dsd-ui-col-1").append('</div>');
							}

						}
					}
				}
				
				// Next follow UI for variables
				var variables = this_.dataset_on_query.dsd.filter(function(item){if(item.columnType == "variable") return item});
				
				//2. Build UI from VARIABLES filtering
				//-------------------------------------------
				/*if(variables.length > 0) {
						$("#dsd-ui-col-1").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.labels.variables+'</label></p></div>');
						$("#dsd-ui-col-1").append('<p><em>Coming Soon!</em></p>');
				}*/
				
				//3. Build UI for THEMATIC MAPPING on Variables
				//---------------------------------------------	
				$("#dsd-ui-body").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
				if(this_.dataset_on_query.thematicmapping) {
					
					//VARIABLES handling as drop-down list
					//------------------------------------
					//variable matcher
					var variableMatcher = function(params, data){
						params.term = params.term || '';
						if ($.trim(params.term) === '') {
						  return data;
						}  
						var term = params.term.toUpperCase();
						var altText = data.alternateText? data.alternateText : '';
						if (data.text.toUpperCase().indexOf(term) > -1  |
							data.id.toUpperCase().indexOf(term) > -1    |
							altText.toUpperCase().indexOf(term) > -1    ) {
							return data;
						}
						return null;
					}
					//variableItem
					var variableItem = function(item, alternate) {
					  if (!item.id) { return item.text; }			 
					  if(alternate && item.alternateText){
						  var $item = $(
							'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'+
							'<br><span class="dsd-ui-item-sublabel"> ' + item.alternateText + '</span>'
						  );
					  }else{
						  var $item = $(
							'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'
						  );
					  }
					  return $item;
					};
					var variableItemSelection = function(item){
						return variableItem(item, false);
					}
					var variableItemResult = function(item){
						return variableItem(item, true);
					}
					
					$("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;font-variant: petite-caps;"><label>'+ this_.options.labels.thematicmapping+'</label></p><hr style="margin:0px;"></div>');
					
					$("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label style="font-weight:normal;">'+ this_.options.labels.thematicmapping_variable+'</label></p></div>');
					
					//prepare dropdownlist items
					var variable_items = new Array();
					for(var i=0;i<variables.length;i++){
						var dsd_variable = variables[i];
						variable_items.push( {
							id: dsd_variable.primitiveCode, 
							text: dsd_variable.name, 
							alternateText: dsd_variable.definition, 
							type: dsd_variable.primitiveType
						} );
					}
					//init selector
					//id
					var dsd_variables_id = "dsd-ui-dimension-variable";
					//html
					$("#dsd-ui-col-2").append('<select id = "'+dsd_variables_id+'" class="dsd-ui-dimension dsd-ui-dimension-variable" title="'+this_.options.labels.thematicmapping_variable+'"><option></option></select>');
					$("#" + dsd_variables_id).select2({
						theme: 'classic',
						allowClear: true,
						data: variable_items,
						templateResult: variableItemResult,
						templateSelection: variableItemSelection,
						matcher: variableMatcher,
						placeholder: this_.options.labels.thematicmapping_variable
					});
					
					//VARIABLES OPTIONS
					//------------------------------------
					$("#dsd-ui-col-2").append('<div style="margin: 0px;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label style="font-weight:normal;">'+ this_.options.labels.thematicmapping_options+'</label></p></div>');
					this_.handleQueryMapOptions(2);
				}
				
				//query form buttons
				if(variables.length == 0) $("#dsd-ui-body").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
				this_.handleQueryFormButtons(2);

				deferred.resolve(this_.dataset_on_query);
			}
		});
	
		return deferred.promise();

	}
	
	/**
	 * stringifyStrategyParams
	 * @param {Object} dataset
	 * @param {Object} strategyparams
	 */
	stringifyStrategyParams(dataset, strategyparams){
		var strategyparams_str = null;
		switch(dataset.strategy){
			 case "ogc_filters":
				if(dataset.dsd){
					console.log("Stringify 'ogc_filters' strategy params - with DSD")
					console.log(strategyparams);
					if(strategyparams) strategyparams_str = strategyparams.map(function(item){
						var fieldname = Object.keys(item);
						var item_component = item[fieldname];
						var item_values = item_component.content;
						var filter = null
						switch(item_component.type){
							case "list":
								if(!(item_values instanceof Array)) item_values = [item_values];
								var item_values_str = item_values.map(function(item){return encodeURIComponent(item)}).join(',');
								filter = '(' + fieldname + ' IN(' + item_values_str + '))';
								break;
							case "timeperiod":
								filter = '(' + fieldname +' AFTER '+ item_values[0] + ' AND ' + fieldname + ' BEFORE ' + item_values[1] +')';
								break;
						}
						console.log(filter);
						return filter;
					}).join(' AND ');
				}else{
					console.log("Stringify 'ogc_filters' strategy params - with Filter");
					if(strategyparams) strategyparams_str = strategyparams.map(function(item){return Object.keys(item) + ':' + item[Object.keys(item)]}).join(';');					
				}
				break;
			case  "ogc_dimensions":
				console.warn("No strategy params stringify implementation for strategy 'ogc_dimensions'");
				//TODO
				break;
			case "ogc_viewparams":
				console.log("Stringify 'ogc_viewparams' strategy params");
				console.log(strategyparams);
				if(strategyparams) strategyparams_str = strategyparams.map(function(item){
					var fieldname = Object.keys(item);
					var item_component = item[fieldname];
					var item_values = item_component.content
					var viewparam = null;
					switch(item_component.type){
						case "list":
							if(!(item_values instanceof Array)) item_values = [item_values];
							viewparam = Object.keys(item) + ':' + item_values.join('+');
							break;
						case "timeinstant":
							viewparam = fieldname + ':' + item_values[0];
							break;
					}
					console.log(viewparam);
					return viewparam;
				}).join(';');
				break;	
		}
		return strategyparams_str;
	};
	
	/**
	 * getStrategyParams
	 * @param {Object} dataset
	 * @param {Boolean} stringify
	 */
	 getStrategyParams(dataset, stringify){
		var this_ = this;
		var data_query = new Array();
		var tostring = stringify? stringify : false;
		console.log("Getting '"+dataset.strategy+"' strategy params for dataset '"+dataset.pid+"'");
		switch(dataset.strategy){
		    case "ogc_filters":
				//Get params according to 'filters' strategy
				//2 cases: simple filter vs. featurecatalogue
				if(dataset.dsd){
					$.each($(".dsd-ui-dimension-attribute"), function(i,item){
						
						var clazz = $("#"+item.id).attr('class');
						var widget = null;
						if(clazz.indexOf("select2")>0) widget = "select2";
						if(clazz.indexOf("slider")>0) widget = "slider";
						var values = null;
						switch(widget){
							case "select2": 
								values = $("#"+item.id).val(); 
								break;
							case "slider": 
								var slide = $($("#"+item.id).find(".ui-slider")[0]);
								if(slide.slider('values').length > 0){
									//multiple values
									var min = slide.slider('values', 0);
									var max = slide.slider('values', 1);
									values = Array.apply(null, {length: max + 1 - min}).map(function(_, idx) { return idx + min; });
								}else{
									//single value
									var value = slide.slider('value');
									values = [value];
								}
								break;
						}
						if(values) if(values.length > 0){
							var data_component_query = new Object();
							var attribute = item.id.split('dsd-ui-dimension-attribute-')[1];
							var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
							if(attributeDef.primitiveType == "xsd:string"){
								if(values instanceof Array){
									values = values.map(function(item){return "'"+item.replace(/[\']/g, "''")+"'"});
								}else{
									values = "'"+values.replace(/[\']/g, "''")+"'";
								}
							}
							data_component_query[attribute] = {type: 'list', content: values};
							data_query.push(data_component_query);
						}
					});
					$.each($(".dsd-ui-dimension-time"), function(i,item){
						var inputs = $(item).find("input");
						var val_start = $(inputs[0]).val();
						var val_end = $(inputs[1]).val();
						if(val_start != "" && val_end != ""){
							
							var attribute = inputs[0].id.split('dsd-ui-dimension-time-start-')[1];
							var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
							
							var date_start = new Date(Date.parse(val_start+ (attributeDef.primitiveType == "xsd:datetime"? 'Z' : '')));
							var date_end = new Date(Date.parse(val_end+ (attributeDef.primitiveType == "xsd:datetime"? 'Z' : '')));
							var data_component_query = new Object();
							data_component_query[attribute] = {type: 'timeperiod', content: [date_start.toISOString().split(attributeDef.primitiveType == "xsd:datetime"? ".000Z" : "T")[0], date_end.toISOString().split(attributeDef.primitiveType == "xsd:datetime"? ".000Z" : "T")[0]]};
							data_query.push(data_component_query);
						}
					});
				}else{
					var filter = $("#ui-ogc_filter").val();
					if(filter) data_query.push({CQL_FILTER : filter});
				}
				break;

		    case "ogc_dimensions":
				//Get params according to 'dimensions' strategy
				//TODO strategy params
				break;
		
		    case "ogc_viewparams":
				//Get params according to 'viewparams' strategy
				//grab codelist values (including extra time codelists)
				$.each($(".dsd-ui-dimension-attribute"), function(i,item){ 
					var clazz = $("#"+item.id).attr('class');
					var widget = null;
					if(clazz.indexOf("select2")>0) widget = "select2";
					if(clazz.indexOf("slider")>0) widget = "slider";
					var values = null;
					switch(widget){
						case "select2": 
							values = $("#"+item.id).val(); 
							break;
						case "slider": 
							var slide = $($("#"+item.id).find(".ui-slider")[0]);
							if(slide.slider('values').length > 0){
								//multiple values
								var min = slide.slider('values', 0);
								var max = slide.slider('values', 1);
								values = Array.apply(null, {length: max + 1 - min}).map(function(_, idx) { return idx + min; });
							}else{
								//single value
								var value = slide.slider('value');
								values = [value];
							}
							break;
					}
					if(values) if(values.length > 0){
						var data_component_query = new Object();
						var attribute = item.id.split('dsd-ui-dimension-attribute-')[1];
						data_component_query[attribute] = {type: 'list', content: values};
						data_query.push(data_component_query);
					}
				});
				if($(".dsd-ui-dimension-time").length > 0){
					$.each($(".dsd-ui-dimension-time"), function(i,item){
						var inputs = $(item).find("input");
						var val_start = $(inputs[0]).val();
						if(val_start != ""){
							var attribute = inputs[0].id.split('dsd-ui-dimension-time-start-')[1];
							var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
								
							var date_start = new Date(Date.parse(val_start+ (attributeDef.primitiveType == "xsd:datetime"? 'Z' : '')));
							var data_component_query = new Object();
							data_component_query[attribute] = {type: 'timeinstant', content: [date_start.toISOString().split(attributeDef.primitiveType == "xsd:datetime"? ".000Z" : "T")[0]]};
							data_query.push(data_component_query);
						}
					});
				}
				
				
				break;

		}

		if(stringify) data_query = this_.stringifyStrategyParams(dataset, data_query);

		return data_query;
	}
	
	/**
	 * OgetStrategyVariable
	 */
	getStrategyVariable(){
		var variable = $("#dsd-ui-dimension-variable").val();
		if(variable == "") variable = null;
		return variable;
	}
	
	/**
	 * OpenFairViewer.prototype.mapDataset
	 * @param dataset
	 * @param from_query_form
	 */
	mapDataset(dataset, from_query_form){
		var this_ = this;

		var pid = dataset.pid;
		
		$("#datasetMapper").prop('disabled', true);
		$("#datasetMapper").bootstrapBtn('loading');
		$(".query-nodata").hide();

	    //layer properties
		var baseWfsUrl = undefined;
		var baseWmsUrl = undefined;
		var layerName = undefined;
		var wfsVersion = undefined;
		var wmsVersion = undefined;
		if(dataset.entry.wfs.length > 0){
			var baseWFS = dataset.entry.wfs.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>-1});
			if(baseWFS.length>0){ baseWFS = baseWFS[0] } else { baseWFS = dataset.entry.wfs[0] };
			if(this.secure) baseWFS.url = baseWFS.url.replace("http://", "https://");
			baseWfsUrl = baseWFS.url;
			wfsVersion = baseWFS.version;
		}
		if(dataset.entry.wms.length > 0){
			var baseWMS = dataset.entry.wms.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>-1});
			if(baseWMS.length>0){ baseWMS = baseWMS[0] } else { baseWMS = dataset.entry.wms[0] };
			baseWmsUrl = baseWMS.url;
			layerName = baseWMS.name;
			wmsVersion = baseWMS.version;
		}
		
	    	var layer = this_.getLayerByProperty(dataset.entry.pid, 'id');
		var strategyparams = from_query_form? this_.getStrategyParams(dataset, false, false) : dataset.queryparams;
		console.log(strategyparams);
		var strategyparams_str = from_query_form? this_.getStrategyParams(dataset, true) : this_.stringifyStrategyParams(dataset, dataset.queryparams);
		console.log("Strategy params = " + strategyparams_str);
		var strategyvariable = from_query_form? this_.getStrategyVariable(dataset): dataset.variable;
		console.log("Strategy variable = " + strategyvariable);
	    	var layerTitle = this_.getDatasetViewTitle(dataset, strategyparams);
		
		//thematic mapping properties
		var mapType =  from_query_form? $("#map-type-selector").select2('val') : dataset.envmaptype;
		var classType = from_query_form? $("#map-classtype-selector").select2('val') : dataset.envfun;
		var colorScheme = from_query_form? $("#map-colorscheme-selector").select2('val') : dataset.envcolscheme;
		console.log(colorScheme);
		
		var classNb = from_query_form? $("#map-classnb-selector").select2('val') : (dataset.envparams? dataset.envparams.split(";").filter(function(item){if(item!="" && item.startsWith("v")) return item}).length-2 : null);
		var layerStyle =  from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;

		if(!layer){
			console.log("Adding new layer");
		    //ADD LAYER
			//////////////////////////////////////////////////////////////////////////////////////////
		    switch(dataset.strategy){
			 case "ogc_filters":
				if(dataset.dsd){
					console.log("Add layer with strategy 'ogc_filters' based on Feature Catalogue");
					if(strategyvariable && dataset.thematicmapping){
						//thematic mapping
						this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
							console.log("Data series with "+features.length+" features");
							var values = undefined;
							var breaks = undefined;
							var envparams = undefined;
							var geom = this_.getGeometryColumn(dataset.dsd);
							if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
							if(values) if(values.length > 0){
								if(values.length < classNb){
									classNb = values.length;
									layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
								}
								breaks = this_.calculateBreaks(values, classType, classNb);
								if(breaks.length == 1) breaks = [0, breaks[0]];
								if(breaks.length == 2) breaks[0] = 0;
								envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colorbrewer[colorScheme][classNb]);
							}
							
							this_.selectDataset(pid);
							var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, (strategyparams == null)? null : decodeURIComponent(strategyparams_str), layerStyle, null, classType, envparams, (values? values.length : null));
							layer.strategy = dataset.strategy;
							layer.dsd = dataset.dsd;
							layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
							layer.variable = strategyvariable;
							layer.envfun = classType;
							layer.envmaptype = mapType;
							layer.envcolscheme = colorScheme;
							layer.count = values? values.length : null;
							this_.addLayerPopup(layer);
							this_.setLegendGraphic(layer, breaks, colorbrewer[colorScheme][classNb]);	
							this_.map.changed();
							this_.renderMapLegend();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
								
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', false);
							$('#dsd-ui-button-csv2').prop('disabled', false);
							$('#dsd-ui-button-table').prop('disabled', false);
							$('#dsd-ui-button-dashboard').prop('disabled', false);
							this_.checkDatasetDashboardAvailability(layer);
							$('#dsd-ui-button-png').prop('disabled', false);
							$("#dsd-ui-export-options").show();
							
							//action on no data
							if(values) if(values.length == 0){
								console.log("Actions on no data");
								$("#datasetMapper").bootstrapBtn('reset');
								$("#datasetMapper").prop('disabled', false);
								$(".query-nodata").show();
								//actions o download buttons
								$('#dsd-ui-button-csv1').prop('disabled', true);
								$('#dsd-ui-button-csv2').prop('disabled', true);
								$('#dsd-ui-button-table').prop('disabled', true);
								$('#dsd-ui-button-dashboard').prop('disabled', true);
								this_.checkDatasetDashboardAvailability(layer);
								$('#dsd-ui-button-png').prop('disabled', true);
								$("#dsd-ui-export-options").hide();
							}
							
						});
					}else{
						//static styling
						console.log("Add layer with strategy 'ogc_filters' based on Feature Catalogue (static styling)");
						this_.selectDataset(pid);
						var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, (strategyparams == null)? null : decodeURIComponent(strategyparams_str), null,null);
						layer.strategy = dataset.strategy;
						layer.dsd = dataset.dsd;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						this_.addLayerPopup(layer);
						layer.variable = null;
						layer.envfun = null;
						layer.envmaptype = null;
						layer.envcolscheme = null;
						layer.count = null;
						this_.setLegendGraphic(layer);
						this_.map.changed();
						this_.renderMapLegend();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-dashboard').prop('disabled', false);
						this_.checkDatasetDashboardAvailability(layer);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();

					}
				}else{
					console.log("Add layer with strategy 'ogc_filters' with simple CQL filter");
					var cql_filter = null;
					if(strategyparams) if(strategyparams.length >0) cql_filter = strategyparams[0].CQL_FILTER;
					this_.selectDataset(pid);
					var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, cql_filter, null, null, null, null, null);
					layer.strategy = dataset.strategy;
					layer.dsd = false;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					layer.variable = null;
					layer.envfun = null;
					layer.envmaptype = null;
					layer.envcolscheme = null;
					layer.count = null;
					this_.addLayerPopup(layer);
					this_.setLegendGraphic(layer);
					this_.map.changed();
					this_.renderMapLegend();
					$("#datasetMapper").bootstrapBtn('reset');
					$("#datasetMapper").prop('disabled', false);
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-dashboard').prop('disabled', false);
					this_.checkDatasetDashboardAvailability(layer);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
				}
				break;
				
			 case "ogc_dimensions":
				//TODO
				break;
				
			 case "ogc_viewparams":
			    if(strategyvariable && dataset.thematicmapping){
					console.log("Add layer with strategy 'ogc_viewparams' (thematic mapping)");
					//thematic mapping
					this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
						console.log("Data series features");
						console.log(features);
						console.log("Data series values");
						var values = undefined;
						var breaks = undefined;
						var envparams = undefined;
						var geom = this_.getGeometryColumn(dataset.dsd);
						if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
						if(values) if(values.length > 0){
							if(values.length < classNb){
								classNb = values.length;
								layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style
							}
							var breaks = this_.calculateBreaks(values, classType, classNb);
							if(breaks.length == 1) breaks = [0, breaks[0]];
							if(breaks.length == 2) breaks[0] = 0;
							console.log(colorScheme);
							console.log(classNb);
							console.log(colorbrewer[colorScheme][classNb]);
							envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colorbrewer[colorScheme][classNb]);
						}
						this_.selectDataset(pid);
						var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, null, layerStyle, strategyparams_str, classType, envparams, (values? values.length : 0));
						layer.strategy = dataset.strategy;
						layer.dsd = dataset.dsd;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						layer.variable = strategyvariable;
						layer.envfun = classType;
						layer.envmapsetLegendGraphictype = mapType;
						layer.envcolscheme = colorScheme;
						layer.count = values? values.length: null;
						this_.addLayerPopup(layer);
						this_.setLegendGraphic(layer, breaks, colorbrewer[colorScheme][classNb]);	
						this_.map.changed();
						this_.renderMapLegend();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
							
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-dashboard').prop('disabled', false);
						this_.checkDatasetDashboardAvailability(layer);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//action on no data
						if(values) if(values.length == 0){
							console.log("Actions on no data");
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							$(".query-nodata").show();
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', true);
							$('#dsd-ui-button-csv2').prop('disabled', true);
							$('#dsd-ui-button-table').prop('disabled', true);
							$('#dsd-ui-button-dashboard').prop('disabled', true);
							this_.checkDatasetDashboardAvailability(layer);
							$('#dsd-ui-button-png').prop('disabled', true);
							$("#dsd-ui-export-options").hide();
						}
					});
			    }else{
					console.log("Add layer with strategy 'ogc_viewparams' (static styling)");
					//static styling
					this_.selectDataset(pid);
					var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, null, null,strategyparams_str);
					layer.strategy = dataset.strategy;
					layer.dsd = dataset.dsd;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					this_.addLayerPopup(layer);
					layer.variable = null;
					layer.envfun = null;
					layer.envmaptype = null;
					layer.envcolscheme = null;
					layer.count = null;
					this_.setLegendGraphic(layer);
					this_.map.changed();
					this_.renderMapLegend();
					$("#datasetMapper").bootstrapBtn('reset');
					$("#datasetMapper").prop('disabled', false);
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
			    }
			    break;
			}    
		}else{ 
			console.log("Updating existing layer");
		    //UPDATE LAYER
			//////////////////////////////////////////////////////////////////////////////////////////
		    switch(dataset.strategy){
			case "ogc_filters":
				if(dataset.dsd){
					if(strategyvariable && dataset.thematicmapping){
						console.log("Update layer with strategy 'ogc_filters' based on Feature Catalogue (thematic mapping)");
						//thematic mapping
						this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, (strategyparams == null)? null :  decodeURIComponent(strategyparams_str), null, (strategyvariable? [strategyvariable] : null )).then(function(features){
							console.log("Data series features");
							console.log(features);
							console.log("Data series values");
							var values = undefined;
							var breaks = undefined;
							var envparams = undefined;
							var geom = this_.getGeometryColumn(dataset.dsd);
							if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
							if(values) if(values.length > 0){
								if(values.length < classNb){
									classNb = values.length;
									layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
								}
								//update breaks
								var breaks = this_.calculateBreaks(values, classType, classNb);
								if(breaks.length == 1) breaks = [0, breaks[0]];
								if(breaks.length == 2) breaks[0] = 0;
								envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colorbrewer[colorScheme][classNb]);
							}
							
							//update viewparams, envparams & legend
							layer.strategy = dataset.strategy;
							layer.dsd = dataset.dsd;
							layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
							layer.setProperties({title: layerTitle});
							if(strategyparams_str != ""){
								layer.getSource().updateParams({'CQL_FILTER' : ((strategyparams == null)? null : decodeURIComponent(strategyparams_str))});
							}else{
								layer.getSource().updateParams({'CQL_FILTER' : 'INCLUDE'});
							}
							layer.getSource().updateParams({'STYLES' : layerStyle});
							if(envparams) layer.getSource().updateParams({'env' : envparams});
							layer.variable = strategyvariable;
							layer.envfun = classType;
							layer.envmaptype = mapType;
							layer.envcolscheme = colorScheme;
							layer.count = values? values.length : null;
							this_.setLegendGraphic(layer, breaks, colorbrewer[colorScheme][classNb]);
							this_.map.changed();
							this_.renderMapLegend();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', false);
							$('#dsd-ui-button-csv2').prop('disabled', false);
							$('#dsd-ui-button-table').prop('disabled', false);
							$('#dsd-ui-button-dashboard').prop('disabled', false);
							this_.checkDatasetDashboardAvailability(layer);
							$('#dsd-ui-button-png').prop('disabled', false);
							$("#dsd-ui-export-options").show();
							
							//action on no data
							if(values) if(values.length==0){
								this_.removeLayerByProperty(pid, "id");
								this_.map.changed();
								this_.renderMapLegend();
								$("#datasetMapper").bootstrapBtn('reset');
								$("#datasetMapper").prop('disabled', false);
								$(".query-nodata").show();
								//actions o download buttons
								$('#dsd-ui-button-csv1').prop('disabled', true);
								$('#dsd-ui-button-csv2').prop('disabled', true);
								$('#dsd-ui-button-table').prop('disabled', true);
								$('#dsd-ui-button-dashboard').prop('disabled', true);
								this_.checkDatasetDashboardAvailability(layer);
								$('#dsd-ui-button-png').prop('disabled', true);
								$("#dsd-ui-export-options").hide();
							}
						});
					}else{
						console.log("Update layer with strategy 'ogc_filters' based on Feature Catalogue (static styling)");
						//static styling
						layer.setProperties({title: layerTitle});
						layer.getSource().updateParams({'STYLES' : ''});
						if(strategyparams_str != ""){
							layer.getSource().updateParams({'CQL_FILTER' : ((strategyparams == null)? null : decodeURIComponent(strategyparams_str))});
						}else{
							layer.getSource().updateParams({'CQL_FILTER' : 'INCLUDE'});
						}
						layer.strategy = dataset.strategy;
						layer.dsd = dataset.dsd;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						layer.variable = null;
						layer.envfun = null;
						layer.envmaptype = null;
						layer.envcolscheme = null;
						layer.count = null;
						this_.setLegendGraphic(layer);
						this_.map.changed();
						this_.renderMapLegend();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-dashboard').prop('disabled', false);
						this_.checkDatasetDashboardAvailability(layer);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
					}
				}else{
					console.log("Update layer with strategy 'ogc_filters' with simple CQL filter");
					layer.strategy = dataset.strategy;
					layer.dsd = false;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					layer.setProperties({title: layerTitle});
					if(strategyparams_str != ""){
						layer.getSource().updateParams({'CQL_FILTER' : ((strategyparams == null)? null : decodeURIComponent(strategyparams_str))});
					}else{
						layer.getSource().updateParams({'CQL_FILTER' : 'INCLUDE'});
					}
					this_.map.changed();
					this_.renderMapLegend();
					$("#datasetMapper").bootstrapBtn('reset');
					$("#datasetMapper").prop('disabled', false);
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-dashboard').prop('disabled', false);
					this_.checkDatasetDashboardAvailability(layer);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
				}
			    break;
			case "ogc_dimensions":
			    //TODO
			    break;
			case "ogc_viewparams":
			    if(strategyvariable && dataset.thematicmapping){
					console.log("Update layer with strategy 'ogc_viewparams' (thematic mapping)");
					//thematic mapping
					this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
						console.log("Data series features");
						console.log(features);
						console.log("Data series values");
						var values = undefined;
						var breaks = undefined;
						var envparams = undefined;
						var geom = this_.getGeometryColumn(dataset.dsd);
						if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
						if(values) if(values.length > 0){
							if(values.length < classNb){
								classNb = values.length;
								layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
							}
							//update breaks
							var breaks = this_.calculateBreaks(values, classType, classNb);
							if(breaks.length == 1) breaks = [0, breaks[0]];
							if(breaks.length == 2) breaks[0] = 0;
							envparams = this_.buildEnvParams(geom, strategyvariable, breaks, colorbrewer[colorScheme][classNb]);
						}
						//update viewparams, envparams & legend
						layer.strategy = dataset.strategy;
						layer.dsd = dataset.dsd;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						layer.setProperties({title: layerTitle});
						if(strategyparams_str != ""){
							layer.getSource().updateParams({'VIEWPARAMS' : strategyparams_str});
						}else{
							delete layer.getSource().params_.VIEWPARAMS;
						}
						layer.getSource().updateParams({'STYLES' : layerStyle});
						layer.variable = strategyvariable;
						if(envparams) layer.getSource().updateParams({'env' : envparams});
						layer.envfun = classType;
						layer.envmaptype = mapType;
						layer.envcolscheme = colorScheme;
						layer.count = values? values.length : null;
						this_.setLegendGraphic(layer, breaks, colorbrewer[colorScheme][classNb]);
						this_.map.changed();
						this_.renderMapLegend();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-dashboard').prop('disabled', false);
						this_.checkDatasetDashboardAvailability(layer);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//action on no data
						if(values) if(values.length == 0){
							this_.removeLayerByProperty(pid, "id");
							this_.map.changed();
							this_.renderMapLegend();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							$(".query-nodata").show();
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', true);
							$('#dsd-ui-button-csv2').prop('disabled', true);
							$('#dsd-ui-button-table').prop('disabled', true);
							$('#dsd-ui-button-dashboard').prop('disabled', true);
							this_.checkDatasetDashboardAvailability(layer);
							$('#dsd-ui-button-png').prop('disabled', true);
							$("#dsd-ui-export-options").hide();
						}
					});
			    }else{
					console.log("Update layer with strategy 'ogc_viewparams' (static styling)");
					//static styling
					layer.setProperties({title: layerTitle});
					layer.getSource().updateParams({'STYLES' : ''});
					layer.getSource().updateParams({'VIEWPARAMS' : strategyparams_str});
					layer.strategy = dataset.strategy;
					layer.dsd = dataset.dsd;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					layer.variable = null;
					layer.envfun = null;
					layer.envmaptype = null;
					layer.envcolscheme = null;
					layer.count = null;
					this_.setLegendGraphic(layer);
					this_.map.changed();
					this_.renderMapLegend();
					$("#datasetMapper").bootstrapBtn('reset');
					$("#datasetMapper").prop('disabled', false);
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-dashboard').prop('disabled', false);
					this_.checkDatasetDashboardAvailability(layer);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
			    }
			    break;
			}
		}
		
		//if data dialog is opened then update tabular dataset
		if($(".data-dialog").is(":visible")){
			$('#data-table').DataTable().destroy();
			this_.displayTabularDataset();
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
	 * @return the WFS layer URL
	 */
	getDatasetWFSLink(layerUrl, serviceVersion, layerName, strategy, strategyparams_str, cql_filter, propertyNames, format){		
		if(layerUrl) if(layerUrl.indexOf("?")<0) layerUrl += "?"
		layerUrl += "&version=" + (serviceVersion? serviceVersion : "1.0.0");
		layerUrl += "&request=GetFeature";
		layerUrl += "&typeName=" + layerName;
	    if(strategyparams_str){
			if(strategy == "ogc_filters") layerUrl += "&CQL_FILTER=" + strategyparams_str;
			if(strategy == "ogc_viewparams") layerUrl += "&VIEWPARAMS=" + strategyparams_str;
		}
	    if(cql_filter) layerUrl += "&CQL_FILTER=" + cql_filter;
	    if(propertyNames) layerUrl += "&propertyName=" + propertyNames.join(",");
	    if(format) layerUrl += "&outputFormat=" + format;
 	    return layerUrl;	
	}
	
	/**
	 * downloadDatasetWFS
	 */
	 downloadDatasetWFS(){
		console.log("Download dataset as OGC WFS");
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		var baseWFS = wfsResources[0];
		var baseWfsUrl = baseWFS.url;
		var layerName = baseWFS.name;
		var wfsVersion = baseWFS.version;
		var strategy = this.dataset_on_query.strategy;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false, true);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		 
		var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, strategy, strategyparams_str, null, null);
		window.open(wfs_link, '_blank');
	}

	/**
	 * downloadDatasetRScript
	 * @return 
	 */
	downloadDatasetRScript(){	
		console.log("Download dataset as Rscript ready to use");
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		var baseWFS = wfsResources[0];
		var baseWfsUrl = baseWFS.url;
		var layerName = baseWFS.name;
		var serviceVersion = baseWFS.version;
		console.log(baseWFS);
		var strategy = this.dataset_on_query.strategy;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false, true);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		
		//script header
		var script = "";
		script += "#R Script generated by OpenFairViewer (https://github.com/eblondel/OpenFairViewer) on " + new Date().toISOString() + "\n";
		script += "#This script provides a standard way to get data and metadata handled in a OpenFairViewer application \n\n";
		script += "#Application details: \n";
		script += "# • OpenFairViewer Base URL: " + window.location.href.split("?")[0] + "\n";
		script += "# • OGC CSW Catalogue URL: " + this.config.OGC_CSW_BASEURL + "\n";
		script += "#Dataset details: \n";
		script += "# • pid: " + this.dataset_on_query.pid + "\n";
		script += "# • title: "+ this.dataset_on_query.entry.title + "\n";
		script += "# • abstract: "+ this.dataset_on_query.entry._abstract + "\n";
		script += "# • OpenFairViewer Query URL: " + window.location.href + "\n";
		script += "#---------------------------------------------------------------------------------------------------------\n";
		
		//script body
		script += "#packages\n";
		script += "if(!require(ows4R)){\n	install.packages(\"ows4R\")\n	require(ows4R)\n}\n\n";
		script += "if(!require(sp)){\n	install.packages(\"sp\")\n	require(sp)\n}\n\n";
		
		script += "#Dataset PID\n";
		script += "pid <- \""+this.dataset_on_query.pid+"\"\n\n";
		script += "layer <- \""+layerName+"\"\n\n";
		
		script += "#Connect to OGC CSW Catalogue to get METADATA\n";
		script += "CSW <- CSWClient$new(\n";
		script += "	url = \""+this.config.OGC_CSW_BASEURL + "\",\n";
		script += "	serviceVersion = \"2.0.2\",\n";
		script += "	logger = \"INFO\"\n"
		script += ")\n";
		script += "#Get metadata for dataset '"+this.dataset_on_query.pid+"'\n";
		script += "md <- CSW$getRecordById(pid, outputSchema = \"http://www.isotc211.org/2005/gmd\")\n";
		script += "fc <- CSW$getRecordById(paste0(pid,\"_dsd\"), outputSchema = \"http://www.isotc211.org/2005/gfc\")\n";
		script += "\n";
		
		script += "#Connect to OGC WFS to get DATA\n";
		var baseUrl = baseWfsUrl.split("?")[0];
		script += "WFS <- WFSClient$new(\n";
		script += "	url = \""+baseUrl + "\",\n";
		script += "	serviceVersion = \""+serviceVersion+"\",\n";
		script += "	logger = \"INFO\"\n"
		script += ")\n";
		script += "#Get feature type for dataset '"+this.dataset_on_query.pid+"' (layer = '"+layerName+"' )\n";
		script += "ft <- WFS$capabilities$findFeatureTypeByName(layer)\n";
		script += "#Get data features for dataset '"+this.dataset_on_query.pid+"' (layer = '"+layerName+"' )\n";	
		script += "data.sf <- ft$getFeatures(";
		if(strategyparams_str){
			if(strategy == "ogc_filters") script += "cql_filter = gsub(\" \", \"%20\", gsub(\"''\", \"%27%27\", URLencode(\"" + strategyparams_str + "\")))";
			if(strategy == "ogc_viewparams") script += "viewparams = \"" + strategyparams_str + "\"";
		}else if(cql_filter){
			 script += ", cql_filter = gsub(\" \", \"%20\", gsub(\"''\", \"%27%27\", URLencode(\"" + cql_filter + "\")))";
		}
		script += ")\n";
		script += "data.sp <- as(data.sf, \"Spatial\")\n";
		
		//download
		var fileName = this_.dataset_on_query.pid +"_"+ this_.getDateTimeString(new Date()) + ".R";
		this.download(script, fileName, '');
	}	
	
	getWFSSupportedFormats(layerUrl, serviceVersion){
		var deferred = $.Deferred();
		if(layerUrl.indexOf("?")<0) layerUrl += "?";
		if(layerUrl.indexOf("service=WFS")<0) layerUrl += "&service=WFS";
		layerUrl += "&version=" + (serviceVersion? serviceVersion : "1.1.0");
		layerUrl += "&request=GetCapabilities";
		$.ajax({
			url: layerUrl,
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				console.log("WFS get capabilities");
				var caps = $(response); console.log(caps);
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
	 */	
	describeFeatureType(layerUrl, serviceVersion, typeName){
		var deferred = $.Deferred();
		if(layerUrl.indexOf("?")<0) layerUrl += "?";
		if(layerUrl.indexOf("service=WFS")<0) layerUrl += "&service=WFS";
		layerUrl += "&version=" + (serviceVersion? serviceVersion : "1.1.0");
		layerUrl += "&request=DescribeFeatureType";
		layerUrl += "&typeName=" + typeName;
		$.ajax({
			url: layerUrl,
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				console.log("WFS describe feature type");
				var fc = $(response); console.log(fc);
				var featuretype = new Array();
				var elems = fc.children().children().filter(function(i,item){if(item.tagName.endsWith("complexType")) return item;})[0].childNodes[1].childNodes[1].childNodes[1].childNodes;
				for(var i=0;i<elems.length;i++){
					if(i%2 != 0){
						var elem = $(elems[i]);
						featuretype.push({
							maxOccurs: elem.attr('maxOccurs'), 
							minOccurs: elem.attr('minOccurs'),
							name: elem.attr('name'),
							nillable: elem.attr('nillable'),
							type: elem.attr('type')
						});
					}
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
	 */
	json2csv(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		var line = '';

		//add colnames
		var head = array[0];
			for (var index in array[0]) {
				line += index + ',';
			}
		line = line.slice(0, -1);
		str += line + '\r\n';
		
		//add data
		for (var i = 0; i < array.length; i++) {
			var line = '';
				for (var index in array[i]) {
			var val = array[i][index];
			if(typeof val == 'string') val = '"' + val + '"';
					line += val + ',';
				}
			line = line.slice(0, -1);
			str += line + '\r\n';
		}
		return str;
	}
	
	/**
	 * Download file
	 * @param content
	 * @param fileName
	 * @param mimeType
	 */
	download(content, fileName, mimeType) {
		var a = document.createElement('a');
		mimeType = mimeType || 'application/octet-stream';

		if (navigator.msSaveBlob) { // IE10
				navigator.msSaveBlob(new Blob([content], {
				  type: mimeType
				}), fileName);
		} else if (URL && 'download' in a) { //html5 A[download]
				a.href = URL.createObjectURL(new Blob([content], {
					type: mimeType
				}));
				a.setAttribute('download', fileName);
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
		} else {
				location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
		}
	}	

	/**
	 * Download CSV
	 * @param content csv string
	 * @param fileName
	 */
	downloadCSV(content, fileName) {
		this.download(content, fileName, 'text/csv;charset=utf-8;');
	}
	
	/**
	 * OpenFairViewer.prototype.getateTimeString
	 * @param date
	 */
	getDateTimeString(date){
		var str = date.toISOString();
		return (str.split("T")[0] + "" + str.split("T")[1].split(".")[0]).replace(/-/g,"").replace(/:/g,"");
	}
	
	/**
	 * OpenFairViewer.prototype.downloadDatasetCSV
	 * @param aggregated true if aggregated, false otherwise
	 */
	downloadDatasetCSV(aggregated){
		
		//options
		var add_colnames = $("#dataset-export-option-colnames").prop("checked");
		var add_labels = $("#dataset-export-option-labels").prop("checked");
		
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		if(aggregated) wfsResources = wfsResources.filter(function(item){item.name.indexOf(this_.options.map.aggregated_layer_suffix)>0});
		var baseWFS = wfsResources[0];
		var baseLayerUrl = baseWFS.url;
		var layerName = baseWFS.name;
		var serviceVersion = '1.1.0';//baseWFS.version;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false, true);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		var layerUrl = this.getDatasetWFSLink(baseLayerUrl, serviceVersion, layerName, this.dataset_on_query.strategy, strategyparams_str, cql_filter, null);
		$.get(layerUrl, function(response){
			var features = new olFormat.WFS().readFeatures(response);
			console.log(features);
			console.log( new olFormat.WFS());
			var featuresToExport = new Array();
			for(var i=0;i<features.length;i++){
				var feature = features[i];
				var props = feature.getProperties();
				var prop_keys = Object.keys(props);
				var newprops = new Object();
				for(var j=0;j<prop_keys.length;j++){
					var key = prop_keys[j];
					if(key == "boundedBy") continue;
					var prop_value = props[key];
					if(typeof prop_value == "object") prop_value = prop_value[0];
					if(key != feature.getGeometryName()){
						var fieldAttribute = this_.dataset_on_query.dsd.filter(function(item){if(item.primitiveCode == key) return item});
						var keyname = key;
						var labelname = key + "_label";
						if(add_colnames) if(fieldAttribute.length>0){
							keyname = fieldAttribute[0].name + " [Code]";
							labelname = fieldAttribute[0].name + " [Label]";
						}
						newprops[keyname] = prop_value;
						if(add_labels) if(fieldAttribute.length>0){
							if(fieldAttribute[0].values){
								var fieldValue = fieldAttribute[0].values.filter(function(item){if(item.id == prop_value) return item});
								if(fieldValue.length>0) newprops[labelname] = fieldValue[0].text;
							}
						}
					}
				}
				
				if(feature.getGeometry() != null) {
					newprops["geometry"] = new olFormat.WKT().writeGeometry(props[feature.getGeometryName()]);
				}

				featuresToExport.push(newprops);
			}
			var csv = this_.json2csv(featuresToExport);
			var fileName = this_.dataset_on_query.pid;
			if(aggregated) fileName += this_.options.map.aggregated_layer_suffix;
			fileName += "_"+ this_.getDateTimeString(new Date()) + ".csv";
			this_.downloadCSV(csv, fileName); 
		});
	}

	/**
	 * OpenFairViewer.prototype.formatTabularDataset
	 * @param features
	 *
	 */
	formatTabularDataset(features){	
		var this_ = this;
		var featuresToExport = new Array();
		for(var i=0;i<features.length;i++){
			var feature = features[i];
			var props = feature.getProperties();
			var prop_keys = Object.keys(props);
			var newprops = new Object();
			for(var j=0;j<prop_keys.length;j++){
				var key = prop_keys[j];
				if(key == "bbox") continue;
				if(key != feature.getGeometryName()){
					var fieldAttribute = null;
					if(this_.dataset_on_query.dsd) fieldAttribute = this_.dataset_on_query.dsd.filter(function(item){if(item.primitiveCode == key) return item});
					var keyname = key;
					var labelname = key + "_label";
					var oldkeyname = keyname;
					var oldlabelname = labelname;
					var newkeyname = "";
					var newlabelname = "";
					if(fieldAttribute != null) if(fieldAttribute.length>0){
						newkeyname = fieldAttribute[0].name + " [Code]";
						newlabelname = fieldAttribute[0].name + " [Label]";
						keyname = newkeyname;
						labelname = newlabelname;
					}
					newprops[keyname] = props[key];
					if(fieldAttribute != null) if(fieldAttribute.length>0){
						if(fieldAttribute[0].values){
							var fieldValue = fieldAttribute[0].values.filter(function(item){if(item.id == props[key]) return item});
							if(fieldValue.length>0){
								newprops[labelname] = fieldValue[0].text;
							}
						}
					}
				}
			}
			if(feature.getGeometry() != null) {
				newprops["geometry"] = new olFormat.WKT().writeGeometry(props[feature.getGeometryName()]);
			}
			featuresToExport.push(newprops);
		}
		return featuresToExport;
	}
	
	/**
	 * featureTypeToColumns
	 * @param featuretype
	 *
	 */
	featureTypeToColumns(featuretype){
		var columnsToExport = new Array();
		var prop_keys = featuretype.map(function(item){return item});
		for(var j=0;j<prop_keys.length;j++){
			var key = prop_keys[j].name;
			var type = prop_keys[j].type;
			if(key == "bbox") continue;
			if(!type.startsWith('gml')){
				var fieldAttribute = null;
				if(this.dataset_on_query.dsd) fieldAttribute = this.dataset_on_query.dsd.filter(function(item){if(item.primitiveCode == key) return item});
				var oldkeyname = key;
				var oldlabelname = key + "_label";
				var newkeyname = "";
				var newlabelname = "";
				if(fieldAttribute != null) if(fieldAttribute.length>0){
					newkeyname = fieldAttribute[0].name + " [Code]";
					newlabelname = fieldAttribute[0].name + " [Label]";
				}
				var column1 = {id: oldkeyname, title: (newkeyname != ""? newkeyname: oldkeyname)}; columnsToExport.push(column1);
				if(fieldAttribute != null) if(fieldAttribute.length>0){
					if(fieldAttribute[0].values) if(fieldAttribute[0].values.length > 0){
						var column2 = {id: oldlabelname, title: (newlabelname != ""? newlabelname : oldlabelname)}; columnsToExport.push(column2);
					}
				}
			}
		}
		var geom_props = featuretype.filter(function(item){if(item.type.startsWith('gml')) return item});
		if(geom_props.length > 0){
			var geom_prop = geom_props[0];
			columnsToExport.push({id: geom_prop.name, title: 'geometry'});
		}
		return columnsToExport;
	}
	
	/**
	 * displayTabularDataset
	 *
	 */
	displayTabularDataset(){
				
		var pageLength = 5;
				
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		var baseWFS = wfsResources[0];
		var baseLayerUrl = baseWFS.url;
		if(baseLayerUrl.indexOf("?")<0) baseLayerUrl += "?";
		var layerName = baseWFS.name;
		var serviceVersion = baseWFS.version;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false, true);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		
		//this.getWFSSupportedFormats(baseLayerUrl, '2.0.0');
		
		this.describeFeatureType(baseLayerUrl, serviceVersion, layerName).then(function(featuretype){
			
			console.log(featuretype);
			
			//get columns defs from feature type
			var columnsToExport = this_.featureTypeToColumns(featuretype);
			var data_columns = columnsToExport.map(function(item){return item.title});
			var sortablePropertyNames = featuretype.filter(function(item){if(!item.type.startsWith('gml')) return item;});
			var sortByPropertyName = sortablePropertyNames[0].name;
			
			//wfs params to send to WFS server
			var wfsParams = {
				service: 'WFS',
				serviceVersion: '2.0.0',
				request: 'GetFeature',
				typeName: layerName,
				outputFormat: encodeURIComponent("application/json"),
				sortBy: sortByPropertyName
			}
			if(this_.dataset_on_query.strategy == "ogc_filters")  wfsParams.cql_filter = strategyparams_str;
			if(this_.dataset_on_query.strategy == "ogc_viewparams") wfsParams.viewparams = strategyparams_str;
			
			this_.closeDashboardDialog();
			this_.openDataDialog();
			$('#data-table').empty();
			
			console.log(columnsToExport);
			console.log(data_columns);
			
			//DataTables
			$('#data-table').DataTable( {
				processing: true,
				serverSide: true,
				serverMethod: 'get',
				ajax: function(data, callback){
					var ajaxParams = Object.assign(wfsParams,{startIndex: data.start, count: data.length});
					var ajaxUrl = baseLayerUrl + "&service=" +ajaxParams.service+ "&version=" + ajaxParams.serviceVersion + "&request=" + ajaxParams.request + "&typeName="+ajaxParams.typeName;
					if(ajaxParams.cql_filter) ajaxUrl += "&cql_filter="+ajaxParams.cql_filter;
					if(ajaxParams.viewparams) ajaxUrl += "&viewparams="+ajaxParams.viewparams;
					ajaxUrl += "&sortBy=" +ajaxParams.sortBy + "&startIndex=" + ajaxParams.startIndex + "&count=" + ajaxParams.count;
					if(wfsParams.outputFormat) ajaxUrl += "&outputFormat=" + wfsParams.outputFormat;
					$.get(ajaxUrl, function(response) {
						console.log($(response));
						var format = new GML32();
						if(wfsParams.outputFormat) format = (wfsParams.outputFormat.indexOf("gml")>0)? new GML32() : new olFormat.GeoJSON();
						var features = format.readFeatures(response);
						console.log(features);
						var test = $(response);
						console.log(test);
						var data_export = this_.formatTabularDataset(features);
						console.log(data_export);
						callback({
							recordsTotal: response.totalFeatures,
							recordsFiltered: response.totalFeatures,
							data: data_export.map(function(item){return data_columns.map(function(key){return item[key]})}),
						});
					});
				},
				//data: data_series, order: [[0, 'asc']],
				columns: columnsToExport,
				searching: false, destroy: true, pageLength: pageLength, lengthMenu: [ 5, 10, 25, 50],
				scrollY: 200, scrollX: true,
				columnDefs : [ {
					targets : columnsToExport.map(function(item,idx){return idx;}),
					render : function(data, type, row, meta) {
						if(data == null || typeof data == "undefined") data = "-";
						//generic renderer
						//case of http(s) links
						if(typeof data == "string") if(data.indexOf("http")==0){
							data = '<a href="'+data+'" target="_blank" style="color:#337ab7">Link</a>';
						}
						//case of images
						var isBase64 = false; if(typeof data == "string") isBase64 = data.startsWith('base64:') || data.startsWith('data:image/png;base64,');
						if(isBase64){
							if(data.startsWith('base64:')) data = 'data:image/png;base64,' + data.split('base64:')[1];
							data = '<img src="'+data+'" width="100%" style="margin:2px;" alt="'+meta.col+'" title="'+meta.col+'"/>';
						}
						//case of geometry
						if(meta.col == data_columns.indexOf('geometry')){
							var wkt = data;
							if(wkt != "–"){
								var button_id_zoom = 'zoom_feature-'+row[0];
								var button_id_disp = 'display_feature'+row[0];
								//button to zoom to feature
								data = '<button id="'+button_id_zoom+'" class="btn btn-xs dataset-button-zoom" title="Zoom to feature" ';
								data += 'onclick="'+this_.config.OFV_ID+'.zoomToFeature(\''+wkt.toUpperCase()+'\')"><span class="glyphicon glyphicon-zoom-in"></span></button>';
								//button to display feature
								data += '<button id="'+button_id_disp+'" class="btn btn-xs dataset-button-add" style="margin-left:10px"  title="Display feature" ';
								data += 'onclick="'+this_.config.OFV_ID+'.highlightFeature(\''+this_.dataset_on_query.pid+'\',\''+row[0]+'\',\''+wkt.toUpperCase()+'\')"><span class="glyphicon glyphicon-map-marker"></span></button>';
							}
						}
						return data;
					}
				}
				,{
					targets : [data_columns.indexOf('geometry')],
					orderable: false
				}
				]
			});

		});
	}
	
	/**
	 * checkDatasetDashboardAvailability
	 *
	 */
	checkDatasetDashboardAvailability(layer){
		if(!layer) return;
		if(this.options.access.dashboard.enabled) if(this.options.access.dashboard.handler){
			var dashboard_html = this.options.access.dashboard.handler(layer);
			if(dashboard_html){
				$("#dsd-ui-button-dashboard").show();
			}else{
				$("#dsd-ui-button-dashboard").hide();
			}
		}else{
			$("#dsd-ui-button-dashboard").hide();
		}
	}

	/**
	 * accessDatasetDashboard
	 *
	 */
	accessDatasetDashboard(){
		this.closeDataDialog();
		this.openDashboardDialog();
		var layer = this.getLayerByProperty(this.dataset_on_query.pid, "id");
		var dashboard_html = this.options.access.dashboard.handler(layer);
		if(dashboard_html){
			$("#datasetDashboard").html(dashboard_html);
		}else{
			$("#datasetDashboard").html("<p>No dashboard configured for this layer</p>");
		}
	}

	/**

	/**
	 * processWKT
	 *
	 */
	processWKT(wkt){
		var format = new olFormat.WKT();
		var feature = format.readFeature(wkt);
		var geom = feature.getGeometry();
		//reproject if needed
		var srs_data = this.dataset_on_query.entry.projection;
		var srs_map = this.map.getView().getProjection();
		if(srs_data) if(srs_data.getCode() != srs_map.getCode()){
			geom.transform(srs_data, srs_map);
		}
		return geom;
	}

	/**
	 * utcToLocale
	 *
	 */
	utcToLocale(str){	
		var date = new Date(Date.parse(str));
		return date.toISOString().split("T")[0] + 'T' + date.toLocaleTimeString();
	}

	/**

	/**
	 * zoomToFeature
	 *
	 */
	zoomToFeature(wkt){
		var geom = this.processWKT(wkt);
		var extent = geom.getExtent();
		this.map.getView().fit(extent,this.map.getSize());
	}

	/**
	 * highlightFeature
	 *
	 */
	highlightFeature(pid, id, wkt){
		var this_ = this;
		var geom = this.processWKT(wkt);
		var feature = new Feature({
			geometry: geom,
			style : this_.options.find.defaultStyle
		});
		feature.setId(id);

		var layerId = 'ofv-feature-marker';
		var layer = this.getLayerByProperty(layerId, 'id');
		var source = new Vector({ features: [feature] });
		if(!layer){
			var layer = new VectorLayer({
			  source: new Vector({
			    features: [feature]
			  })
			});
			layer.id = layerId;
			this_.layers.overlays[this_.options.map.mainlayergroup].getLayers().push(layer);
		}else{
			layer.setSource(source);
		}
		
		//add popup
		var target_layer = this_.getLayerByProperty(pid, "id");
		var coords = olExtent.getCenter(geom.getExtent());
		if(geom instanceof olGeom.LineString ||
		   geom instanceof olGeom.MultiLineString ||
	 	   geom instanceof olGeom.MultiPoint){
			coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length/2)];
		}
		if(geom instanceof olGeom.Point) coords = geom.getCoordinates();
		this_.getFeatureInfo(target_layer, coords);
		
	}

	
	/**
	 * OpenFairViewer.prototype.downloadMapPNG
	 *
	 */
	downloadMapPNG(){
		var this_ = this;
		this.map.once('rendercomplete', function(event) {
			var mapCanvas = document.createElement('canvas');
			var size = this_.map.getSize();
			mapCanvas.width = size[0];
			mapCanvas.height = size[1];
			var mapContext = mapCanvas.getContext('2d');
			Array.prototype.forEach.call(
			  document.querySelectorAll('.ol-layer canvas'),
			  function (canvas) {
				if (canvas.width > 0) {
				  var opacity = canvas.parentNode.style.opacity;
				  mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
				  var transform = canvas.style.transform;
				  // Get the transform parameters from the style's transform matrix
				  var matrix = transform
					.match(/^matrix\(([^\(]*)\)$/)[1]
					.split(',')
					.map(Number);
				  // Apply the transform to the export map context
				  CanvasRenderingContext2D.prototype.setTransform.apply(
					mapContext,
					matrix
				  );
				  mapContext.drawImage(canvas, 0, 0);
				}
			  }
			);
			var fileName = this_.dataset_on_query.pid +"_"+ this_.getDateTimeString(new Date()) + ".png";
			if (navigator.msSaveBlob) {
				navigator.msSaveBlob(mapCanvas.msToBlob(), fileName);
			} else {
				mapCanvas.toBlob(function(blob){
					saveAs(blob, fileName);
				});
			}
		});
        this.map.renderSync();
	}
	
	//===========================================================================================
	//MAP
	//===========================================================================================
	
	
	/**
	 * initDataViewer
	 */
	initDataViewer(){
		var this_ = this;
		this_.map = this_.initMap('map', true, false);
		
		if(this_.enable_3d){
			Cesium.Ion.defaultAccessToken = this.options.cesium.defaultAccessToken;
			this_.ol3d = new OLCesium({
			  map: this_.map,
			  time() {
				return Cesium.JulianDate.now();
			  }
			});
			const scene = this_.ol3d.getCesiumScene();
			scene.terrainProvider = Cesium.createWorldTerrain();
			this_.ol3d.setEnabled(this_.options.map.mode == '3D'? true : false);
			this_.ol3d.enableAutoRenderLoop();
		}else{
			$("#map-olcesium-switcher").hide();
		}
		
		$($("li[data-where='#pageMap']")).on("click", function(e){
			$($("#map").find("canvas")).show();
		});
		
		//layers of interest
		if(this.map){
			for(var i=0;i<this.options.map.overlays.length;i++){
				var layerDef = this.options.map.overlays[i];
				var wmsVersion = layerDef.wmsVersion? layerDef.wmsVersion : "1.1.0";
				this_.addLayer(
					layerDef.group, layerDef.id, layerDef.title, layerDef.wmsUrl, wmsVersion, layerDef.layer, layerDef.hidden,
					layerDef.visible, layerDef.showLegend, layerDef.opacity, layerDef.tiled, layerDef.cql_filter, layerDef.style
				);
			}
		}
	}
	
		inspireWgs84Grid(levels, prefix) {
		var projection = olProj.get('EPSG:4326');

		var projectionExtent = projection.getExtent();
		var resolution = olExtent.getWidth(projectionExtent) / 512;
		
		var resolutions = new Array(levels);
		var matrixIds = new Array(levels);
		
		for (var z = 0; z < levels; z++) {
			resolutions[z] = resolution / Math.pow(2, z);
			matrixIds[z] = z;
		}
		
		return new WMTSTileGrid({
			origin: olExtent.getTopLeft(projectionExtent),
			resolutions: resolutions,
			matrixIds: matrixIds
		});				
	}
	
	/**
	 * switchMapView
	 * Switches from 2D to 3D and vice-versa
	 */
	switchMapView(){
		var this_ = this;
		if(this.ol3d.getEnabled()){
			this.ol3d.setEnabled(false);
			$("#map-olcesium-switcher-to").html('3D');
		}else{
			this.ol3d.setEnabled(true);
			$("#map-olcesium-switcher-to").html('2D');
		}
	}
	
	/**
	 * initMap
	 * @param {String} id the map target id
	 * @param {Boolean} main
	 * @param {Array} extent
	 */
	initMap(id, main, extent){
        
		var map;
		var this_ = this;
		this_.layers = new Object();
		
		//baselayers
		var baseLayers = [
			new LayerGroup({
				'title': this_.options.map.baselayergroup.name,
				fold: this_.options.map.baselayergroup.fold,
				layers: this_.options.map.baselayers
			})
		];

		//overlay groups
		var overlays = new Array();
		for(var i=0;i< this.options.map.layergroups.length;i++){
			var overlay = new LayerGroup({
				'title': this_.options.map.layergroups[i].name,
				fold: this_.options.map.layergroups[i].fold,
				layers: [],
			});
			overlays.push(overlay);
		}
	    var defaultMapExtent = this.options.map.extent;
	    var defaultMapZoom = this.options.map.zoom;
            
		if(main){
			this.layers.baseLayers = baseLayers;
			this.layers.overlays = overlays;
			this.defaultMapExtent = defaultMapExtent;
			this.defaultMapZoom = defaultMapZoom;
		}     
        
	    //mapgetLa
		var mapId = id? id : 'map';
	    $("#"+mapId).empty();
		
		var map = new Map({
			id: mapId,
			target : mapId,
			layers : this_.layers.baseLayers.concat(this_.layers.overlays),
			view : new View({
				projection: (this_.enable_3d? undefined : this_.options.map.projection),
				center : defaultMapExtent? olExtent.getCenter(defaultMapExtent) : [0,0],
				extent: (this_.enable_3d? undefined : defaultMapExtent),
				zoom : defaultMapZoom
			}),
			controls: [],
			logo: false
		});
		map.addControl( new MousePosition({
			projection: 'EPSG:4326',
			coordinateFormat: function(coordinate) {
				return olCoordinate.format(coordinate, 'Lat: {y} Lon: {x}', 2);
			},
			undefinedHTML: 'Lat: - Lon: -'
 		}));
		
		//TODO
		//map.addControl( new ol.control.LoadingPanel() );
		
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
		}) );*/
		
		map.addControl( new Zoom() );
		
		map.addControl( new ZoomToExtent({
			extent	: extent? extent : defaultMapExtent,
			zoom	: defaultMapZoom,
			label : '',
			tipLabel: this_.options.labels.fit_to_extent
		}));
		
		//TODO
		//map.addControl( new ol.control.Snapshot({dpi: 300}) );

		if(main){
			map.addControl( new OpenFairLayerSwitcher({
				activationMode: 'click',
				tipLabel: this_.options.labels.legend_title_show, // Optional label for button
				collapseTipLabel: this_.options.labels.legend_title_hide, // Optional label for button
				collapseLabel: ''
			}));
		}      
					
		if(extent){
		   map.getView().fit(extent, map.getSize());
		}
		
		if(main && this.options.map.zoom){
			map.getView().setZoom(this.options.map.zoom);
		}
		
		//Attribution
		if(this.options.map.attribution){
			
			//create base attribution for handling the watermark
			var baseAttribution = new Attribution({
				className: 'ol-attribution-map',
				collapsible: false
			});
			map.addControl(baseAttribution);
			
			//manage the display of watermark (logo)
			var attMaps = map.getTargetElement().getElementsByClassName("ol-attribution-map");
			if( attMaps.length > 0) attMaps[0].getElementsByTagName("li")[0].innerHTML = this.options.map.attribution;
			
			//hack to remove the baselayer attribution that for some reason is also added to the ol-attribution-map
			//while explicitely referenced on ol-attribution-baselayer (to investigate if there is a cleaner solution)
			//TODO
			/*map.on('postrender', function() {
				var attMaps = this.getTargetElement().getElementsByClassName("ol-attribution-map");
				if( attMaps.length > 0){
					var attLis = attMaps[0].getElementsByTagName("li");
					if( attLis.length > 1) attLis[1].remove();
				}
			});*/
		}
		
		//events
		//------
		//spatial search
		map.on('moveend', function(evt){
			if($("#dataset-search-bbox-on-search").prop("checked") && $("#dataset-search-bbox-on-mapinteraction").prop("checked")){
				var bbox = evt.map.getView().calculateExtent(evt.map.getSize());
				var maxrecords = parseInt($("select[id='datasets_length']").val());
				this_.displayDatasets(maxrecords, bbox); 
			}
		});
	
		return map;
	}
	
	renderMapLegend(){
		this.map.getControls().getArray().filter(function(control){if(control instanceof LayerSwitcher) return control})[0].renderPanel();
	}
	
	/**
	 * setLegendGraphic Set legend graphic
	 * @param {ol/Layer} lyr layer object
	 * @param {Array} breaks an array of break values
	 * @param {Array} colors
	 */	 
	setLegendGraphic(lyr, breaks, colors) {
		var this_ = this;
		var source = lyr.getSource();
		if( source instanceof TileWMS | source instanceof ImageWMS ){
			console.log("Adding legend graphic");
			var params = source.getParams();
			var request = '';
			var wmsUrl = (source instanceof TileWMS? source.getUrls()[0] : source.getUrl());
			var serviceSeparator = (wmsUrl.indexOf("wms?") > 0 || wmsUrl.indexOf("ows?") > 0)? "&" : "?";
			request += wmsUrl + serviceSeparator;
			request += 'VERSION=1.0.0';
			request += '&REQUEST=GetLegendGraphic';
			request += '&LAYER=' + params.LAYERS.split(",")[0];
			request += '&STYLE=' + ( (params.STYLES)? params.STYLES : '');
			request += '&LEGEND_OPTIONS=forcelabels:on;forcerule:True;fontSize:12'; //maybe to let as options
			request += '&SCALE=139770286.4465912'; //to investigate
			request += '&FORMAT=image/png';
			request += '&TRANSPARENT=true';
			request += '&WIDTH=30';
			
			if(colors){
				request += '&env=';
				var colreq = '';
				for(var i=1;i<=colors.length;i++){
					colreq += "c"+ i +":"+ colors[i-1] + ";";
				}
				request += encodeURIComponent(colreq);
			}
			
			console.log(request);

			//case of dynamic maps
		 	if(breaks){
				var canvas = document.createElement('canvas');
				document.body.appendChild(canvas);
				var palYStart = 20;
				var canvasHeight = breaks? ((breaks.length-1) * 20 + palYStart) : 100;
				canvas.height = String(canvasHeight);
				canvas.width = '200';
				var ctx = canvas.getContext('2d');
				
				//add variable (+uom) header
				ctx.font = "bold 8pt Arial";
				var variable = lyr.dsd.filter(function(item){if(item.primitiveCode == lyr.variable) return item});
				if(variable.length > 0) variable = variable[0];
				var varLabel = variable.name; 
				if(variable.uom) varLabel = varLabel +' ('+variable.uom + ')';
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
				    if(breaks){
						var break_signs = this_.options.map.styling.breaks;
						for(var i=1;i<breaks.length;i++){
							var minVal = (Math.round(breaks[i-1] * 100) / 100);
							var maxVal = (Math.round(breaks[i] * 100) / 100);
							var class_start = break_signs[0];
							var class_sep = break_signs[1];
							var class_end = break_signs[2];
							if(i==breaks.length-1){
								if(class_end == "[") class_end = "]";
								if(class_end == "(") class_end = ")";
							}
							var breakLegend = class_start+" " + minVal + " "+class_sep+" " + maxVal + " " + class_end;
							if(lyr.count) if(lyr.count == breaks.length-1){
								breakLegend = (lyr.count == 1)? maxVal : minVal;
							} 
							ctx.fillText(breakLegend, dx, dy);
							dy = breakPt*(i+1) + breakSpace*i + palYStart;
						} 
						lyr.legendGraphic = canvas.toDataURL("image/png");
						this_.renderMapLegend();
				    }
				};	
			}else{
				lyr.legendGraphic = request;
			}
		}
	}
	
	/**
	 * addLayer Adds layer
	 * @param {Integer} mainOverlayGroup
	 * @param {String} id
	 * @param {String} title
	 * @param {String} wmsUrl
	 * @param {String} wmsVersion
	 * @param {String} layer
	 * @param {String} cql_filter
	 * @param {String} style
	 * @param {String} viewparams
	 * @param {String} envfun
	 * @param {String} envparams
	 * @param {Number} count
	 */
	addLayer(
		mainOverlayGroup, id, title, wmsUrl, wmsVersion, layer,
		hidden, visible, showLegend, opacity, tiled, cql_filter, style, 
		viewparams, envfun, envparams, count){
			
		var this_ = this;
		var layerParams = {
				'LAYERS' : layer,
				'VERSION': '1.1.0', //TODO support wmsVersion for 1.3.0,
				'FORMAT' : 'image/png'
		}
		var olLayerClass = ImageLayer;
		var olSourceClass = ImageWMS;
		if(tiled){
			layerParams['TILED'] = true;
			layerParams['TILESORIGIN'] = [-180,-90].join(',');
			olLayerClass = TileLayer;
			olSourceClass = TileWMS;
		}
		
		if(cql_filter){ layerParams['CQL_FILTER'] = cql_filter; }
		if(viewparams){ layerParams['VIEWPARAMS'] = viewparams; }
		hidden = hidden? hidden : false;
	    if(envparams){ layerParams['env'] = envparams; }
	    if(style) layerParams['STYLES'] = style;
	    var layer = new olLayerClass({
			id : (hidden? undefined : id),
			title : (hidden? undefined : title),
			source : new olSourceClass({
				url : wmsUrl,
				params : layerParams,
				wrapX: true,
				serverType : 'geoserver',
				crossOrigin : 'anonymous'
			}),
			opacity : opacity,
			visible: visible
	    });
            
	    this.setLegendGraphic(layer);
		layer.id = id;
	    layer.envfun = envfun;
	    layer.count = count;
	    layer.showLegendGraphic = showLegend;
			
 	    if(mainOverlayGroup > this.layers.overlays.length-1){
			alert("Overlay group with index " + mainOverlayGroup + " doesn't exist");
	    }
	    layer.overlayGroup = this.options.map.layergroups[mainOverlayGroup];
	    this.layers.overlays[mainOverlayGroup].getLayers().push(layer);
	    
 	    //inherit properties
	    layer.csw_server = this.config.OGC_CSW_BASEURL;
	    layer.csw_version = this.config.OGC_CSW_VERSION;
		
		//update map legend;
		this.renderMapLegend(layer);
	    return layer;
	}
	
	/**
	 * getLayerByProperty Util method to get layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
	getLayerByProperty(layerProperty, by){
		if(!by) byTitle = false;
		var target = undefined;
		for(var i=0;i<this.map.getLayerGroup().getLayersArray().length;i++){
			var layer = this.map.getLayerGroup().getLayersArray()[i];
			var condition  = by? (layer[by] === layerProperty) : (layer.getSource().getParams()["LAYERS"] === layerProperty);
			if(condition){
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
	 */
	resolveDatasetForQuery(datasetDef, resolveMap){
		var this_ = this;
		console.log("Fetching query interface for pid = '"+datasetDef.pid+"'");
		this_.openAccessDialog();
		this_.handleQueryForm(datasetDef).then(function(dataset){					

			datasetDef.dsd = dataset.dsd;
			if(datasetDef.query){
				
				switch(datasetDef.strategy){
					case "ogc_filters":
						console.log("Resolve query for dataset '"+datasetDef.pid+"' using 'ogc_filters' strategy");
						var queryparams = datasetDef.queryparams;
						console.log(queryparams);
						if(queryparams) for(var i=0;i<queryparams.length;i++){
							var queryparam = queryparams[i];
							var key = Object.keys(queryparam)[0];
							var component = queryparam[key];
							var values = component.content;
							values = values.map(function(item){
								if(item.startsWith("'") && item.endsWith("'")){
									item = item.substr(1,item.length-2);
								}
								item = item.replace("''", "'") //need to replace double single quote (in case of cql filter strings containing single quote)
								return item;
							});
							if(component.type == "list"){
								var clazz = $("#dsd-ui-dimension-attribute-"+key).attr('class');
								var widget = null;
								if(clazz.indexOf("select2")>0) widget = "select2";
								if(clazz.indexOf("slider")>0) widget = "slider";
								switch(widget){
									case "select2": 
										$("#dsd-ui-dimension-attribute-"+key).val(values).trigger('change');
										break;
									case "slider": 
										var slide = $($("#dsd-ui-dimension-attribute-"+key).find(".ui-slider")[0]);
										values = values.map(function(item){return parseInt(item)});
										if(values.length > 1){
											var min = Math.min.apply(Math, values);
											var max = Math.max.apply(Math, values);
											slide.slider("values", 0, min);
											slide.slider("values", 1, max);
										}else{
											slide.slider("value", values[0]);
										}
										break;
								}
							}else if(component.type == "timeinstant"){
								$("#dsd-ui-dimension-time-start-"+key).val(component.content[0].replace("T", " ")).trigger('change');
							}else if(component.type == "timeperiod"){
								$("#dsd-ui-dimension-time-start-"+key).val(component.content[0].replace("T", " ")).trigger('change');
								$("#dsd-ui-dimension-time-end-"+key).val(component.content[1].replace("T"," ")).trigger('change');
							}
						}
						//variable
						$("#dsd-ui-dimension-variable").val(datasetDef.variable).trigger('change');
						//map options
						var envfun = datasetDef.envfun;
						if(envfun) $("#map-classtype-selector").val(envfun).trigger('change');
						var envmaptype = datasetDef.envmaptype;
						if(envmaptype) $("#map-type-selector").val(envmaptype).trigger('change'); 
						if(datasetDef.breaks){
							var classnb = String(datasetDef.breaks.length-1);
							if( $("#map-classnb-selector").find('option').map(function() { return $(this).val(); }).get().indexOf(classnb) == -1) classnb = 5;
							$("#map-classnb-selector").val(classnb).trigger('change');
						}
						var envcolscheme = datasetDef.envcolscheme;
						if(envcolscheme) $("#map-colorscheme-selector").val(envcolscheme).trigger('change'); 
						break;
					
					case "ogc_dimensions":
						console.log("Resolve query for dataset '"+datasetDef.pid+"' using 'ogc_dimensions' strategy");
						console.warn("Dataset query resolving not implemented for strategy 'ogc_dimensions'");
						//TODO
						break;
					case "ogc_viewparams":
						console.log("Resolve query for dataset '"+datasetDef.pid+"' using 'ogc_viewparams' strategy");
						var queryparams = datasetDef.queryparams;
						console.log(queryparams);
						if(queryparams){
							//var timeparams = new Array();
							for(var i=0;i<queryparams.length;i++){
								var queryparam = queryparams[i];
								var key = Object.keys(queryparam)[0];
								var component = queryparam[key];
								var values = component.content;
								if(component.type == "list"){
									var clazz = $("#dsd-ui-dimension-attribute-"+key).attr('class');
									var widget = null;
									if(clazz.indexOf("select2")>0) widget = "select2";
									if(clazz.indexOf("slider")>0) widget = "slider";
									switch(widget){
										case "select2": 
											$("#dsd-ui-dimension-attribute-"+key).val(values).trigger('change');
											break;
										case "slider": 
											var slide = $($("#dsd-ui-dimension-attribute-"+key).find(".ui-slider")[0]);
											values = values.map(function(item){return parseInt(item)});
											if(values.length > 1){
												var min = Math.min.apply(Math, values);
												var max = Math.max.apply(Math, values);
												slide.slider("values", 0, min);
												slide.slider("values", 1, max);
											}else{
												slide.slider("value", values[0]);
											}
											break;
									}
								}else if(component.type=="timeinstant"){
									$("#dsd-ui-dimension-time-start-"+key).val(component.content[0]).trigger('change');
								}else if(component.type == "timeperiod"){
									$("#dsd-ui-dimension-time-start-"+key).val(component.content[0].replace("T", " ")).trigger('change');
									$("#dsd-ui-dimension-time-end-"+key).val(component.content[1].replace("T"," ")).trigger('change');
								}
							}
						}
						//variable
						$("#dsd-ui-dimension-variable").val(datasetDef.variable).trigger('change');
						//map options
						var envfun = datasetDef.envfun;
						if(envfun) $("#map-classtype-selector").val(envfun).trigger('change');
						var envmaptype = datasetDef.envmaptype;
						if(envmaptype) $("#map-type-selector").val(envmaptype).trigger('change'); 
						if(datasetDef.breaks){
							var classnb = String(datasetDef.breaks.length-1);
							if( $("#map-classnb-selector").find('option').map(function() { return $(this).val(); }).get().indexOf(classnb) == -1) classnb = 5;
							$("#map-classnb-selector").val(classnb).trigger('change');
						}
						var envcolscheme = datasetDef.envcolscheme;
						if(envcolscheme) $("#map-colorscheme-selector").val(envcolscheme).trigger('change'); 
						break;
				}
			}
			
			//resolve map
			if(resolveMap) this_.resolveDatasetForMap(datasetDef);
			
		});
	}

	/**
	 * resolveDatasetForMap
	 * @param {Object} dataset
	 */
	resolveDatasetForMap(dataset){
		console.log("Resolving map for pid = '"+dataset.pid+"'");
		console.log(dataset);
		this.mapDataset(dataset, false);		
	}

	/**
	 * resolveViewer
	 * Resolves the map viewer from URL parameters
	 */
	resolveViewer(){
		var this_ = this;
		
		//url params
		var params = this_.getAllUrlParams();
		console.log(params);
		
		//mode
		if(params.mode){
			if(params.mode != this.options.map.mode){
				this.switchMapView();
			}
		}
		
		//baseview
		if(params.baseview){
			var baseviews = this_.map.getLayers().getArray()[0].getLayersArray();
			for(var i=0;i<baseviews.length;i++){
				if(baseviews[i].get('title') == decodeURIComponent(params.baseview)){
					baseviews[i].setVisible(true);
				}else{
					baseviews[i].setVisible(false);
				}
			}
		}

		//dynamic parameters
		//embedded link feature 'dataset' decoding
		if(params.dataset && !params.views){
			var datasetDef = {pid: params.dataset};
			this_.getCSWRecord(datasetDef.pid).then(function(md_entry){
				if(this_.selection.map(function(i){return i.pid}).indexOf(pid) == -1){
					console.log("we should add the dataset to the selection here");
					console.log(md_entry);
					datasetDef.entry = md_entry;
					datasetDef.dsd = md_entry.dsd;
					datasetDef.strategy = md_entry.metadata.contentInfo? "ogc_viewparams" : "ogc_filters";
					this_.selection.push(datasetDef.entry);	
					this_.resolveDatasetForQuery(datasetDef, false);		
				}
			});
		}
			
		//embedded link feature 'views'
		if(params.views){
			var encoded_views = JSON.parse(decodeURIComponent(params.views));
			console.log(encoded_views);
			var encoded_datasets = new Array();
			for(var i=0;i<encoded_views.length;i++){
				var encoded_view = encoded_views[i];
				var encoded_view_settings = encoded_view.split(/(?!<(?:\(|\[)[^)\]]+),(?![^(\[]+(?:\)|\]))/g).map(function(item){var elems = item.split("="); var out = new Object(); out[elems[0]] = elems[1]; return out});
				var encoded_view_obj = new Object();
				for(var j=0;j<encoded_view_settings.length;j++){
					var setting = encoded_view_settings[j];
					var setting_key = Object.keys(setting)[0];
					encoded_view_obj[setting_key] = setting[setting_key] != "undefined"? setting[setting_key] :  null;
				}
				var pid = encoded_view_obj.pid;
				var strategy = encoded_view_obj.strategy;
				var queryparams = encoded_view_obj.par;
				if(queryparams){
					switch(strategy){
						case "ogc_filters":
							queryparams = queryparams.split(") AND (").map(function(item){
								var out = null;
								if(item.startsWith('(') && item.endsWith(')')) item = item.substr(1, item.length-2);
								if(item.indexOf('IN(') > 0){
									var elems = item.split(" IN(");
									var attribute = elems[0];
									var values = elems[1].split(")")[0].split(/(?!'),(?![^'])/g);
									values = values.map(function(item){return item}); //replace double single quote for cql filter text with single quote
									out = new Object();
									out[attribute] = {type: 'list', content: values};
								}else if(item.indexOf('BEFORE')>0 && item.indexOf('AFTER')){
									var elems = item.split(" AND ");
									var time_filter_start = elems[0].split(" AFTER ");
									var time_filter_end = elems[1].split(" BEFORE ");
									var attribute = time_filter_start[0];
									var values = [time_filter_start[1], time_filter_end[1]];
									out = new Object();
									out[attribute] = {type: 'timeperiod', content: values};
								}
								return out;
							});
							if(queryparams.length == 1 && queryparams[0] == null) queryparams = new Array();
							break;
						case "ogc_dimensions": 
							console.warn("Resolving URL query params for strategy 'ogc_dimensions' no supported yet");
							break;
						case "ogc_viewparams": 
							queryparams = queryparams.split(";").map(function(item){
								var elems = item.split(":"); 
								var attribute = elems[0];
								var values = elems[1].split('+');
								var out = new Object(); 
								out[attribute] = {type: ( (!isNaN(Date.parse(values[0])) & values[0].length >= 10)? "timeinstant" : "list"), content: values};
								return out;
							});
							break;
					}
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
				if(envparams){
					breaks = envparams.split(";"); breaks.splice(-1,1); breaks.splice(0,2);
					breaks = breaks.map(function(key){return parseFloat(key.split(":")[1])});
				}
				encoded_datasets.push({
					pid: pid, strategy: strategy, queryparams : queryparams, 
					variable: variable, envfun: envfun, envmaptype: envmaptype, envparams: envparams, envcolscheme: envcolscheme, 
					count : count, breaks: breaks, style: style, 
					query: query, thematicmapping: (variable? true : false)
				});
			}

			var metadata_promises = new Array();
			for(var i=0;i<encoded_datasets.length;i++){
				metadata_promises.push( this_.getCSWRecord(encoded_datasets[i].pid) );
			}
			console.log(encoded_datasets);
			console.log("Sending "+metadata_promises.length+" metadata record request(s)...");
			metadata_promises.forEach(function(promise, i){
				$.when(promise).then(function(md_entry) {
					var encoded_dataset = encoded_datasets[i];
					encoded_dataset.entry = md_entry;
					encoded_dataset.title = this_.getDatasetViewTitle(encoded_dataset, encoded_dataset.queryparams);
					encoded_dataset.dsd = encoded_dataset.entry.dsd;
					console.log(encoded_dataset);
					this_.selection.push(encoded_dataset);	
					
					//if it was the last dataset queried by user we fill the query interface with param values
					if(encoded_dataset.query){
						this_.resolveDatasetForQuery(encoded_dataset, true);
					}else{
						this_.resolveDatasetForMap(encoded_dataset);	
					} 

					//popup coords
					if(params.popup_id) if(params.popup_id == encoded_dataset.pid) {
						if(params.popup_coords){
							triggerPopup = function(){
								var layer = this_.getLayerByProperty(encoded_dataset.pid, "id");
								var coords = params.popup_coords.split(",").map(function(coord,i){return parseFloat(coord)});
								this_.getFeatureInfo(layer, coords);
							}
							window.setTimeout(triggerPopup, 1000); //TO TEST, IF LAYER IS LOW TO RENDER THIS FAILS
						}
					}

					this_.map.changed();
					this_.renderMapLegend();
				});
			});
		}
		
		//extent, center, zoom
		if(params.extent){
			var extent = params.extent.split(",")
			for (var i=0; i<extent.length; i++) { extent[i] = parseFloat(extent[i]); }
			this.map.getView().fit(extent, this.map.getSize());
		}
		if(params.center){
			var center = params.center.split(",");
			center[0] = parseFloat(center[0]);
			center[1] = parseFloat(center[1]);
			this.map.getView().setCenter(center);
		}
		if(params.zoom) this.map.getView().setZoom(parseInt(params.zoom));

	}

	
	//===========================================================================================
	//Widgets UIs
	//===========================================================================================
    
	/**
     * initDialog Init dialog
	 */
	initDialog(id, title, classes, position, liIdx, onopen, onclose){
		var this_ = this;
		if(!classes){
			classes  = {
			  "ui-dialog": "ui-corner-all",
			  "ui-dialog-titlebar": "ui-corner-all",
			}
		}
		if(!position){
			position = { my: "center", at: "top", of: window };
		}
		$( "#" + id ).dialog({
			width: ((id=='accessDialog')? ((this_.options.access.columns * 400)+'px') : undefined),
			autoOpen: false,
			draggable: false,
			resizable: false,
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
			open: function( event, ui ) {
				$($("nav li")[liIdx]).addClass("active");
				if(onopen) onopen();
			},
			close: function( event, ui ) {
				$($("nav li")[liIdx]).removeClass("active");
				if(onclose) onclose();
			}
		});
    }
   
	/**
	 * openDialog Open dialog
	 */
	openDialog(id){
		if(!$("#" + id).dialog("isOpen")){
			$("#" + id).dialog("open");
		}
	}
   
	/**
	 * closeDialog Close dialog
	 */
	closeDialog(id){
		if($("#" + id).dialog("isOpen")){
			$("#" + id).dialog("close");
		}
	}
	
	/**
	 * openAboutDialog Open 'About' dialog
	 */
	openAboutDialog(){
		this.closeFindDialog();
		this.closeAccessDialog();
		this.openDialog("aboutDialog");
	}
	
	/**
	 * closeAboutDialog Close 'About' dialog
	 */
	closeAboutDialog(){
		this.closeDialog("aboutDialog");
	}
   
    	/**
	 * openFindDialog Open 'Data' dialog
	 */
	openFindDialog(){
		this.closeAboutDialog();
		this.closeAccessDialog();
		this.openDialog("findDialog");
	}
   
    	/**
	* closeFindDialog Close 'Data' dialog
	*/
	closeFindDialog(){
		this.closeDialog("findDialog");
	}
	
	/**
	* openAccessDialog Open 'Query' dialog
	*/
	openAccessDialog(){
		this.closeAboutDialog();
		this.closeFindDialog();
		this.openDialog("accessDialog");
	}
   
   	/**
	* closeAccessDialog Close 'Query' dialog
	*/
	closeAccessDialog(){
		this.closeDialog("accessDialog");
	}
	
	/**
	* openInfoDialog Open 'Info' dialog
	*/
	openInfoDialog(){
		this.openDialog("infoDialog");
	}
   
   	/**
	* closeInfoDialog Close 'Info' dialog
	*/
	closeInfoDialog(){
		this.closeDialog("infoDialog");
	}

	/**
	* openDataDialog Open 'Data' dialog
	*/
	openDataDialog(){
		this.openDialog("dataDialog");
	}
   
   	/**
	* closeDataDialog Close 'Data' dialog
	*/
	closeDataDialog(){
		this.closeDialog("dataDialog");
	}


   	/**
	* closeInfoDialog Close 'Info' dialog
	*/
	closeInfoDialog(){
		this.closeDialog("infoDialog");
	}

	/**
	* openDashboardDialog Open 'Dashboard' dialog
	*/
	openDashboardDialog(){
		this.openDialog("dashboardDialog");
	}
   
   	/**
	* closeDashboardDialog Close 'Dashboard' dialog
	*/
	closeDashboardDialog(){
		this.closeDialog("dashboardDialog");
	}
	
  	/**
	*
	*/
	_copyright(){
		$("body").append("<footer><a href='https://doi.org/10.5281/zenodo.2249305'>&copy; OpenFairViewer <small>(version "+this.versioning.VERSION+")</small</a></footer>")
	}
	
};

export default OpenFairViewer;
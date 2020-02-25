/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer (20200221)
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
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module unless amdModuleId is set
		define([], function () {
			return (factory());
		});
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		factory();
	}
}(this, function(){
	
	//conflict resolvers
	var bootstrapButton = $.fn.button.noConflict() // return $.fn.button to previously assigned value
	$.fn.bootstrapBtn = bootstrapButton       
	

	//polyfills
	//===========================================================================================
	if (!String.prototype.startsWith) {
  	    String.prototype.startsWith = function(searchString, position) {
    		position = position || 0;
    		return this.indexOf(searchString, position) === position;
  	    };
	}

	//Ows.js overwriten functions
	//===========================================================================================
	Ows4js.Filter.prototype.BBOX = function(llat, llon, ulat, ulon, srsName) {
    		this['ogc:Filter'].spatialOps = {
        		'ogc:BBOX' : {
            		   TYPE_NAME: "Filter_1_1_0.BBOXType",
            		   envelope :{
                	    'gml:Envelope' : {
                    		TYPE_NAME: "GML_3_1_1.EnvelopeType",
                    		lowerCorner: {
                        		TYPE_NAME: "GML_3_1_1.DirectPositionType",
                        		value : [llat, llon]
                    		},
                    		upperCorner : {
                        		TYPE_NAME: "GML_3_1_1.DirectPositionType",
                        		value : [ulat, ulon]
                    		},
                    		srsName: srsName
                	     }
            		  },
               	       }
    		};
    		return this;
	};	

	//Proj4js projections
	//===========================================================================================
	proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
	proj4.defs("EPSG:3031","+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
	proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
	
	/**
	 * Function to instantiate an OpenFairViewer
	 */
	OpenFairViewer = function(config, opt_options){
		var this_ = this;
		
		//version
		this.versioning = {VERSION: "1.0.9000", DATE: new Date(2020,2,21)}
		
		if(!config.OGC_CSW_BASEURL){
			alert("OpenFairViewer cannot be instantiated. Missing CSW endpoint")
		}
		this.config = config;
		this.config.OGC_CSW_SCHEMA = "http://www.isotc211.org/2005/gmd";
		this.config.OGC_CSW_MAXRECORDS = 5;
		
		var options = opt_options || {};
		this.options = {};
		
		//BROWSE options
		//--------------------------------------------------------------------------------------------------
		this.options.browse = {};
		this.options.browse.maxitems = null;
		this.options.browse.filters = [];
		this.options.browse.filterByWMS = false;
		this.options.browse.datasetInfoHandler = function(metadata){
			var datasetInfoUrl = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&id=" + metadata.fileIdentifier;
			window.open(datasetInfoUrl, '_blank');
		}
		if(options.browse){
			if(options.browse.maxitems) this.options.browse.maxitems = options.browse.maxitems;
			if(options.browse.filters) this.options.browse.filters = options.browse.filters;
			if(options.browse.datasetInfoHandler) this.options.browse.datasetInfoHandler = options.browse.datasetInfoHandler;
			if(options.browse.filterByWMS){
				this.options.browse.filterByWMS = options.browse.filterByWMS;
				this.options.browse.filters.push( {name: 'csw:OnlineResourceType', value: '%WMS%'} );
			}
		}
		
		//spatial coverage vector layer params
		this.options.browse.defaultStyle = new ol.style.Style({
		   stroke : new ol.style.Stroke({color : [0, 153, 255, 1], width: 3})
		})
		this.options.browse.hoverStyle = new ol.style.Style({
		   image: new ol.style.Circle({
			    radius: 3,
				fill : new ol.style.Fill({color: [255, 255, 255, 0.2]}),
				stroke : new ol.style.Stroke({color : "orange", width: 3})
		   }),
		   fill : new ol.style.Fill({color: [255, 255, 255, 0.2]}),
		   stroke : new ol.style.Stroke({color : "orange", width: 3})
		});
		
		//QUERY options
		//--------------------------------------------------------------------------------------------------
		this.options.query = {};
		this.options.query.labels = {
			attributes: 'Attributes',
			variables: 'Variable',
			options: 'Variable options'
		}
		this.options.query.columns = 1;
		this.options.query.time = 'datePicker';
		if(options.query){
			if(options.query.labels){
				if(options.query.labels.attributes) this.options.query.labels.attributes = options.query.labels.attributes;
				if(options.query.labels.variables) this.options.query.labels.variables = options.query.labels.variables;
				if(options.query.labels.options) this.options.query.labels.options = options.query.labels.options;
			}
			if(options.query.columns){
				if([1,2].indexOf(options.query.columns) != -1) this.options.query.columns = options.query.columns;
			}
			if(options.query.time) this.options.query.time = options.query.time;
		}

		//MAP options
		//--------------------------------------------------------------------------------------------------
		this.options.map = {};
		//watermark
		this.options.map.attribution = null;
		if(options.map) this.options.map.attribution = options.map.attribution? options.map.attribution : null;
		//projection
		this.options.map.projection = 'EPSG:4326';
		if(options.map) this.options.map.projection = options.map.projection? options.map.projection : 'EPSG:4326';
		//zoom
		this.options.map.zoom = 3;
		if(options.map) this.options.map.zoom = options.map.zoom? options.map.zoom : 3;
		//extent
		this.options.map.extent = [-180, -90, 180, 90];
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
		this.options.map.layergroups = [{name: "Base overlays"},{name: "Statistical maps"}];
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
			new ol.layer.Tile({
				title : "World Imagery",
				type: 'base',
				source : new ol.source.XYZ({
					projection: ol.proj.get(this_.options.map.projection),
					tileSize: 512,
					tileUrlFunction: function(tileCoord) {
						var esriUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}';
						return esriUrl.replace('{z}', (tileCoord[0] - 1).toString())
								.replace('{x}', tileCoord[1].toString())
								.replace('{y}', (-tileCoord[2] - 1).toString());
					},
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),
			new ol.layer.Tile({
				title: "OpenStreetMaps",
				type: 'base',
				source: new ol.source.OSM()
			}),
			/*new ol.layer.Tile({
				title : "UN Clear Map (Plain)",
				type: 'base',
				source : new ol.source.TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Plain/MapServer',
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),
			new ol.layer.Tile({
				title : "UN Clear Map (Dark)",
				type: 'base',
				source : new ol.source.TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Dark/MapServer',
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),
			new ol.layer.Tile({
				title : "UN Clear Map (Gray)",
				type: 'base',
				source : new ol.source.TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Gray/MapServer',
					crossOrigin: 'anonymous',
					wrapX: true
				})
			}),*/
			new ol.layer.Tile({
				title : "UN Clear Map",
				type: 'base',
				source : new ol.source.TileArcGISRest({							
					url: 'https://geoservices.un.org/arcgis/rest/services/ClearMap_Topo/MapServer',
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
		this.options.map.styling.dynamic = true;
		this.options.map.styling.breaks = [""," to ",""]; 
		if(options.map) if(options.map.styling){
			this.options.map.styling.dynamic = options.map.styling.dynamic? options.map.styling.dynamic : true;
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
		this.options.map.tooltip.handler = function(layer, feature){

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
				
				  if(typeof prop == "string") if(prop.indexOf("http")==0){
				    prop = '<a href="'+prop+'" target="_blank" style="color:#337ab7">Link</a>';
				  }

				  var isBase64 = false; if(typeof prop == "string") isBase64 = prop.startsWith('base64:') || prop.startsWith('data:image/png;base64,');
				  var isDate = false; if(typeof prop == "string") isDate = prop.match(regexps.DATE) != null;
				  var isDateTime = false; if(typeof prop == "string") isDateTime = prop.match(regexps.DATETIME) != null;
				  if(typeof prop != "undefined" && !(prop instanceof ol.geom.Geometry)) if(!isBase64) {
					var propToDisplay = prop;
					if(isDateTime){
						var date = new Date(Date.parse(prop));
						propToDisplay = date.toISOString().split("T")[0] + 'T' + date.toLocaleTimeString();
					}
					html += "<tr><td><b>" + propName + "</b></td><td>" + propToDisplay;
					if(isDate || isDateTime){
						html += '<button style="margin: 0px 10px" class="btn btn-xs" ';
						html += 'onclick="app.getNextFeatureInfoInTime(\''+layer.id+'\',\''+layer.baseDataUrl+'\',\'1.0.0\',\''+layer.getSource().getParams().LAYERS+'\',\''+propName+'\',\''+prop+'\')">Next</button>';
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
		if(options.map) if(options.map.tooltip) {
			if(options.map.tooltip.enabled) this.options.map.tooltip.enabled = options.map.tooltip.enabled;
			if(options.map.tooltip.handler) this.options.map.tooltip.handler = options.map.tooltip.handler;
		}
		
		
		//events
		this.mapEvents = new Array();

		//panels
		this.options.panel = {}
		if(options.panel) {
				this.options.panel.welcome = options.panel.about? options.panel.about : 'aboutDialog2';				
		}
		
		//datasets caching
		this.datasets = new Array();
	}
	
	//Init
	//==========================================================================================
    /**
	 * OpenFairViewer.prototype.init
	 */
	OpenFairViewer.prototype.init = function(){
		var this_ = this;
		this.selection = new Array();
		this.initBrowseCatalogue();
		this.initBrowseAdvancedSettings();
		this.initBrowsePagination();
			
		this.initDataViewer();
	
		//event on page number selection
		$("select[id='datasets_length']").on('change', function() {
		  var maxrecords = parseInt(this.value);
		  console.log('Browsing '+maxrecords+' records...');
		  this_.displayDatasets(maxrecords);
		});
	
		//get Datasets from CSW
		this.displayDatasets(this.config.OGC_CSW_MAXRECORDS);
		$("#dataset-form").submit(function() {
			var maxrecords = parseInt($("select[id='datasets_length']").val());
			this_.displayDatasets(maxrecords);
			return false;
		});
				
		//init widgets
		this.initDialog("aboutDialog", "Welcome!",{"ui-dialog": "about-dialog", "ui-dialog-title": "dialog-title"}, null, 0);
		this.initDialog("browseDialog", "Browse", {"ui-dialog": "browse-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 1);
		this.initDialog("queryDialog", "Query", {"ui-dialog": "query-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 2);
		this.initDialog("infoDialog", "Dataset information", {"ui-dialog": "info-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 3);
		this.initDialog("dataDialog", "Tabular data", {"ui-dialog": "data-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 4);

		this.openAboutDialog();
		
		//resolve viewer from URL
		this.resolveViewer();
		
		this._copyright();
	}
        
	//Utils
	//===========================================================================================
	
	/**
	 * OpenFairViewer.prototype.rewriteURL
	 * @param
	 */
	OpenFairViewer.prototype.rewriteURL = function(url){
		if(window.location.origin.startsWith("https")){
			url = url.replace(/^http:\/\//i, 'https://');
		}
		return url;
	}
        
	/**
	 * OpenFairViewer.prototype.ligthenMetadata
	 * Ligthens a metadata parsed with ogc-schemas library
	 * @param inObj
	 */
	OpenFairViewer.prototype.lightenMetadata = function(inObj) {
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
	 * OpenFairViewer.prototype.getAllUrlParams util function to get URL param valus
	 * Here the primary use is to be able to grab a security token that would be
	 * passed from within a i-Marine VRE portlet
	 * @param url
	 * @returns an object with all parameter values
	 */
	OpenFairViewer.prototype.getAllUrlParams = function(url) {
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

        
	// ISO/OGC metadata management
	//==========================================================================================
		
	/**
	 * OpenFairViewer.prototype.initBrowseCatalogue
	 */
	OpenFairViewer.prototype.initBrowseCatalogue = function(){
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
		this.csw = new Ows4js.Csw(this.config.OGC_CSW_BASEURL, this.cswConfig);
		return this.csw;
	}
	
	/**
	 * OpenFairViewer.prototype.initBrowseAdvancedSettings
	 */
	OpenFairViewer.prototype.initBrowseAdvancedSettings = function(){
		var this_ = this;
		//spatial coverage layer visibility
		$('#dataset-spatial-coverage-visible').change(function() {
			var layer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
			layer.setVisible(this.checked);
		});
		//spatial coverage layer extended or not
		$('#dataset-spatial-coverage-extended').change(function() {
			this_.setSpatialCoverageLayer(this_.records_on_browse, this.checked, $('#dataset-spatial-coverage-visible').is(":checked"));
		});
	}
	
	/**
	 * OpenFairViewer.prototype.initBrowsePagination
	 */
	OpenFairViewer.prototype.initBrowsePagination = function(){
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
        
	/**
	 * OpenFairViewer.prototype.createMetadataEntry
	 * @param value
	 */
	OpenFairViewer.prototype.createMetadataEntry = function(value){
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
		md_entry.projection = new ol.proj.get('EPSG:4326');
		if(md_entry.metadata.referenceSystemInfo) {
			var srs = md_entry.metadata.referenceSystemInfo[0].mdReferenceSystem.referenceSystemIdentifier.rsIdentifier;
			md_entry.projection = new ol.proj.get(srs.codeSpace + ':' + srs.code);
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
	 * OpenFairViewer.prototype.buildSpatialCoverageFeature
	 * @param dataset
	 * @param extended
	 */
	OpenFairViewer.prototype.buildSpatialCoverageFeature = function(dataset, extended){
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
				var polyCoordsGeom = new ol.geom.LineString(polyCoords);
				//reproject if needed
				var srs_data = dataset.projection;
				var srs_map = this.map.getView().getProjection();
				if(srs_data) if(srs_data.getCode() != srs_map.getCode()){
					polyCoordsGeom.transform(srs_data, srs_map);
				}
				geometries.push(polyCoordsGeom);
			}else{
				//case of bounding polygons
				if(extended) if(geo_keys.length == 1 && geo_keys[0]=="polygon"){
					polygons = geo_extent.polygon;
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
							case "Point": ol_geom_handler = ol.geom.Point; break;
							case "MultiPoint": ol_geom_handler = ol.geom.MultiPoint; break;
							case "LineString":  ol_geom_handler = ol.geom.LineString; break;
							case "MultiLineString":  ol_geom_handler = ol.geom.MultiLineString; break;
							case "Polygon":  ol_geom_handler = ol.geom.Polygon; break;
							case "MultiPolygon":  ol_geom_handler = ol.geom.MultiPolygon; break;
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
			feature_geom = new ol.geom.GeometryCollection();
			feature_geom.setGeometriesArray(geometries);
		}
		feature = new ol.Feature({
			geometry: feature_geom,
			style : this_.options.browse.defaultStyle
		});
		feature.setId(dataset.pid);
		
		return feature;
	}
	
	/**
	 * OpenFairViewer.prototype.buildSpatialCoverageDataset
	 * @param datasets
	 */
	OpenFairViewer.prototype.buildSpatialCoverageDataset = function(datasets, extended){
		var this_ = this;
		var features = datasets.map(function(dataset,i){console.log(dataset);return this_.buildSpatialCoverageFeature(dataset, extended)});
		return features;
	}
	
	/**
	 * OpenFairViewer.prototype.setSpatialCoverageLayer
	 * @param datasets
	 */
	OpenFairViewer.prototype.setSpatialCoverageLayer = function(datasets, extended, visible){
		var this_ = this;
		
		var features = this_.buildSpatialCoverageDataset(datasets, extended);
		
		var layerId = 'ofv-csw-spatial-coverages';
		var layer = this.getLayerByProperty(layerId, 'id');
		var source = new ol.source.Vector({ features: features });
		if(!layer){
			var layer = new ol.layer.Vector({
				id: undefined, title: undefined,
				source: source,
				visible: visible
			});
			layer.id = layerId;
			this.layers.overlays[this_.options.map.mainlayergroup].getLayers().push(layer);
			var layerPointer = new ol.interaction.Select({
				condition: ol.events.condition.pointerMove,
				layers: [layer]
			});

			layerPointer.on('select', function(evt){
				if(evt.selected) if(evt.selected.length>0){
					evt.selected.forEach(function(feature){
						feature.setStyle(this_.options.browse.hoverStyle);
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
	 * OpenFairViewer.prototype.getRecords
	 * @param maxrecords
	 * @param page
	 * @param filter
	 */
	OpenFairViewer.prototype.getRecords = function(maxrecords, page, filter){
		var deferred = $.Deferred();
		var this_ = this;
		var last = page * maxrecords;
		var first = last - maxrecords + 1;
		console.log("Get CSW Records for page "+page+" [from index "+first+" to "+last+"] ...");
		this.csw.GetRecords(first, maxrecords, filter, this.config.OGC_CSW_SCHEMA).then(function(result){				 
			var csw_results = result.value.searchResults.any;
			var datasets = new Array();	
			//post-process results
			for(var i=0;i<csw_results.length;i++){
				var csw_result = csw_results[i];    
				var md_entry = this_.createMetadataEntry(csw_result.value);
				datasets.push(md_entry);
			}                       
			  
			deferred.resolve(datasets);
		});
		return deferred.promise();
	 };
		
	/**
	 * OpenFairViewer.prototype.createFilter
	 * @param bbox
	 */
	OpenFairViewer.prototype.createFilter = function(bbox){
		//base filter
		//var filter = new Ows4js.Filter().PropertyName(['dc:type']).isLike('dataset');
		var filter = undefined;
		for(var i=0;i<this.options.browse.filters.length;i++){
			var inputFilter = this.options.browse.filters[i];
			var cswFilter = new Ows4js.Filter().PropertyName([inputFilter.name]).isLike(inputFilter.value);
			if(typeof filter == 'undefined'){
				filter = cswFilter;
			}else{
				filter = filter.and(cswFilter);
			}
		}
		
		//free text filter
		var txt = $("#dataset-search-text").val();
		if(txt != ""){
			txt = '%'+txt+'%';
			var txtFilter = new Ows4js.Filter().PropertyName(['dc:title']).isLike(txt);
			txtFilter = txtFilter.or(  new Ows4js.Filter().PropertyName(['dc:subject']).isLike(txt) );
			if(typeof filter == 'undefined'){
				filter = txtFilter;
			}else{
				filter = filter.and(txtFilter);
			}
		}
		
		//spatial filter
		if(bbox){
			filter = filter.and(new Ows4js.Filter().BBOX(bbox[1], bbox[0], bbox[3], bbox[2], 'urn:x-ogc:def:crs:EPSG:6.11:4326'));
		}
		return filter;
	}
	
	/**
	 * OpenFairViewer.prototype.getDatasetsFromCSWPage
	 * @param maxrecords
	 * @param page
	 */
	OpenFairViewer.prototype.getDatasetsFromCSWPage = function(maxrecords, page){
		var this_ = this;
		$("#dataset-articles").empty();
		$("#dataset-articles").html('<p id="dataset-loader" class="loader"><img alt="loading" src="js/OpenFairViewer/img/loading.gif" /><br /><br />Fetching datasets...</p>');
		$("#dataset-loader").show();
		
		var thebbox = null;
		if($("#dataset-search-bbox-on-search").prop("checked")){
			thebbox = this_.map.getView().calculateExtent(this_.map.getSize());
		}
		
		var thefilter = this_.createFilter(thebbox); 
		
		//display based on templates
		var template = $('#datasetTpl').html();
		
		//get CSW records for page
		this_.getRecords(maxrecords, page, thefilter).then(function(records){
			
			this_.records_on_browse = records;
			
			$("#dataset-loader").hide();
			
			var dataHtml = '<section class="col-xs-12 col-sm-12 col-md-12">';
			console.log(records);
			for(var i=0;i<records.length;i++){
			  var record = records[i];
			  this_.cacheDataset(record);
			  var item_html = Mustache.to_html(template, record);
			  dataHtml += item_html;
			}
			dataHtml += '</section>';
			$("#dataset-articles").html(dataHtml);
			this_.displayGraphicOverviews();
			
			//TESTING
			var extended = $("#dataset-spatial-coverage-extended").is(":checked");
			var visible = $("#dataset-spatial-coverage-visible").is(":checked");
			this_.setSpatialCoverageLayer(records, extended, visible);
			$("article").each(function(i,item){$(item).on('mouseenter', function(evt){
				var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
				var vectorFeature = vectorLayer.getSource().getFeatureById($(item).context.id);
				if(vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")){
					var select = this_.map.getInteractions().getArray().filter(function(item){return item instanceof ol.interaction.Select});
					if(select.length>0) select = select[0];
					vectorFeature.setStyle(this_.options.browse.hoverStyle);
					select.getFeatures().push(vectorFeature);
					select.dispatchEvent('select');
				}
			})});
			$("article").each(function(i,item){$(item).on('mouseleave', function(evt){
				var vectorLayer = this_.getLayerByProperty("ofv-csw-spatial-coverages", "id");
				var vectorFeature = vectorLayer.getSource().getFeatureById($(item).context.id);
				if(vectorFeature && $("#dataset-spatial-coverage-visible").is(":checked")){
					var select = this_.map.getInteractions().getArray().filter(function(item){return item instanceof ol.interaction.Select});
					if(select.length>0) select = select[0];
					vectorFeature.setStyle(null);
					select.getFeatures().remove(vectorFeature);
					select.dispatchEvent('select');					
				}
			})});
		});
	}
		
	/**
	 * OpenFairViewer.prototype.getDatasetsFromCSW
	 * @param maxrecords
	 * @param bbox
	 */
	OpenFairViewer.prototype.getDatasetsFromCSW = function(maxrecords, bbox){
		
		$("#dataset-count").empty();
		$("#dataset-articles").empty();
		$("#dataset-articles").html('<p id="dataset-loader" class="loader"><img alt="loading" src="js/OpenFairViewer/img/loading.gif" /><br /><br />Fetching datasets...</p>');
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
				if(this_.options.browse.maxitems && numberOfRecordsMatched > this_.options.browse.maxitems){
					console.log("Max items option set. Restraining number of records retrieved to "+this_.options.browse.maxitems+" records");
					maxNb = this_.options.browse.maxitems;
				}

				//add datasets counting
				$("#dataset-count").html(maxNb + " datasets");
				//Set paginated browsing operated by OGC CSW protocol
				$("#dataset-pages").bootpag({
					total: Math.ceil(maxNb / maxrecords)
				}).trigger("page", 1);
			});
		}
		return deferred.promise();
	},
        
        
	/**
	 * OpenFairViewer.prototype.displayDatasets
	 * @param maxrecords
	 * @param bbox
	 */
	OpenFairViewer.prototype.displayDatasets = function(maxrecords, bbox){
		var this_ = this;
		if($("#dataset-search-bbox-on-search").prop("checked") && !bbox){
			bbox = this.map.getView().calculateExtent(this.map.getSize());
		}
		this.getDatasetsFromCSW(maxrecords, bbox);
	}
	 
	/**
	 * OpenFairViewer.prototype.displayGraphicOverviews
	 */
	OpenFairViewer.prototype.displayGraphicOverviews = function(){
		var imgs = $("img.graphic_overview");
		$.each(imgs, function () {
			var $this = $(this);
			var im = new Image();
			im.onload = function () {
				var theImage = $this;
				$this.hide();
				theImage[0].src = im.src;
				$this.css("background", "");
				$this.show();
			};
			im.onerror = function(){
				var theImage = $this;
				$this.hide();
				$this.removeAttr("alt");
				$this.css("background", "url('js/OpenFairViewer/img/loading-error.svg')");
				$this[0].src = "js/OpenFairViewer/img/loading-error.svg";
				$this.show();
			}
			$this.css("background", "url('js/OpenFairViewer/img/loading.gif')");
			im.src = $this.attr("src");
		});
	}
  
	/**
	 * OpenFairViewer.prototype.displayDatasetMetadata
	 * Display the metadata associated to a dataset
	 * @param elm
	 *
	 **/
	OpenFairViewer.prototype.displayDatasetMetadata = function(elm){  
		var pid = elm.getAttribute('data-pid');
		console.log("Display metadata dataset with pid = " + pid);
		var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}})[0];
		this.options.browse.datasetInfoHandler(dataset.metadata);
	}
	  
	/**
	 * OpenFairViewer.prototype.displayDatasetQueryForm
	 * Displays a dataset query form
	 * @param elm
	 *
	 **/  
	OpenFairViewer.prototype.displayDatasetQueryForm = function(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Display query form dataset with pid = " + pid);
		var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}});
		if(dataset.length>0) dataset = dataset[0];
		this.handleQueryForm(dataset);
	}
	
	/**
	 * OpenFairViewer.prototype.zoomToExtent
	 * Zooms to dataset extent
	 * @param elm
	 *
	 **/  
	OpenFairViewer.prototype.zoomToExtent = function(elm){
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
			console.log("Dataset projection ('"+srs_data+"') differs from map projection ('"+srs_map+"'). Reprojecting bounding box!");
			console.log("Coordinates (source) = ["+ coords + "]")
			var extentGeom = ol.geom.Polygon.fromExtent(coords);
			extentGeom.transform(srs_data, srs_map);
			coords = extentGeom.getExtent();
			console.log("Coordinates (reprojected) = ["+ coords + "]")
		}
		
		//zoom
		if(coords) this.map.getView().fit(coords,this.map.getSize());
	}
	  
	/**
	 * OpenFairViewer.prototype.cacheDataset
	 * Cache a dataset
	 * @param dataset
	 *
	 **/
	OpenFairViewer.prototype.cacheDataset = function(dataset){
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
	 * OpenFairViewer.prototype.selectDataset
	 * Selects a dataset
	 * @param pid
	 *
	 **/
	OpenFairViewer.prototype.selectDataset = function(pid){
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
	 * OpenFairViewer.prototype.unselectDataset
	 * Unselects a dataset
	 * @param elm
	**/
	OpenFairViewer.prototype.unselectDataset = function(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Unselect dataset with pid = " + pid);
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
		this.openBrowseDialog();

		return out;
	}

	
	/**
	 * OpenFairViewer.prototype.getCSWRecord
	 * @param pid
	 * @returns a promise
	 */
	OpenFairViewer.prototype.getCSWRecord = function(pid){
		console.log("Fetching metadata record from CSW for pid = '"+pid+"'");
		var this_ = this;
		var deferred = $.Deferred();
		var pidFilter =  new Ows4js.Filter().PropertyName(['dc:identifier']).isLike(pid);
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
         
	/**
	 * OpenFairViewer.prototype.parseFeatureCatalogue
	 * @param response
	 * @returns a DSD json object
	 */
	OpenFairViewer.prototype.parseFeatureCatalogue = function(response){

		console.log($(response.childNodes[0].childNodes));
	
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
		console.log(characteristics);
		for(var i=0;i<characteristics.length;i++){
			var characteristic = characteristics[i];
			var featureAttribute = characteristic.childNodes[1];
			//featureAttributeModel
			var featureAttributeModel = {
				name : $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:memberName") return item;})[0].childNodes[1].textContent,
				definition : $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:definition") return item;})[0].childNodes[1].textContent,
				primitiveCode: $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:code") return item;})[0].childNodes[1].textContent,
				primitiveType: $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:valueType") return item;})[0].childNodes[1].childNodes[1].childNodes[1].textContent,
				values: null
			}
			//values
			var listedValues = $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:listedValue") return item;});
			if(listedValues.length > 0){
				featureAttributeModel.values = new Array();
				for(var j=0;j<listedValues.length;j++){
					var listedValue = listedValues[j];
					var props = listedValue.childNodes[1].childNodes;
					var clCode = props[3].childNodes[1].textContent;
					var clLabel = props[1].childNodes[1].textContent;
					var clDefinition = undefined;
					if(props[5]) if(props[5].childNodes.length > 0) clDefinition = props[5].childNodes[1].textContent;
					var clItem = {id: clCode, text: clLabel, alternateText: (clDefinition? clDefinition : null), codelist: featureAttributeModel.primitiveCode};
					featureAttributeModel.values.push(clItem);
				}
			}
			
			dsd.components.push(featureAttributeModel);
		}
		console.log(dsd);
		return dsd;
	}
	

	/**
	 * OpenFairViewer.prototype.handleQueryForm
	 * @param dataset
	 */
	OpenFairViewer.prototype.handleQueryForm = function(dataset){
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
	 * OpenFairViewer.prototype.handleQueryFormButtons
	 * @param columnIdx
	 */
	OpenFairViewer.prototype.handleQueryFormButtons = function(columnIdx){
		var this_ = this;
		//Query and mapbutton
		//------------------------------
		$("#dsd-ui-col-"+columnIdx).append('<br><br>');
		$("#dsd-ui-col-"+columnIdx).append('<button type="button" id="datasetMapper" style="width:90%;" title="Query & Map!" data-loading-text="<span class=\'query-loader\'></span>" class="btn btn-primary" onclick="app.mapDataset(app.dataset_on_query, true)">Query & Map</button>');
		$("#dsd-ui-col-"+columnIdx).append('<br><span class="query-nodata" style="display:none;">Ups! There is no data for this query...</span>');
				
		//download buttons
		//------------------------------
		$("#dsd-ui-col-"+columnIdx).append('<div id="dsd-ui-buttons" style="margin: 0 auto;width: 90%;text-align: center !important;"><p style="margin:0;"></div>');
		if(this.dataset_on_query.entry.wfs){
			hasAggregate = this_.dataset_on_query.entry.wfs.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>0}).length > 0
			if(hasAggregate){
				var button_csv_aggregated = '<button id="dsd-ui-button-csv1" type="button" class="btn data-action-button data-csv-agg" title="Download aggregated data (CSV)" onclick="app.downloadDatasetCSV(true)"></button>';
				$("#dsd-ui-buttons").append(button_csv_aggregated);
			}
			var button_csv_raw = '<button type="button" id="dsd-ui-button-csv2" class="btn data-action-button data-csv-raw" title="Download raw data (CSV)" onclick="app.downloadDatasetCSV(false)"></button>';
			$("#dsd-ui-buttons").append(button_csv_raw);

			var button_tabulardata = '<button type="button" id="dsd-ui-button-table" class="btn data-action-button data-table" title="Open tabular data" onclick="app.displayTabularDataset()"></button>';
			$("#dsd-ui-buttons").append(button_tabulardata);
		}
		var button_png_map = '<button type="button" id="dsd-ui-button-png" class="btn data-action-button data-png-map" title="Download map (PNG)" onclick="app.downloadMapPNG()"></button>';
		$("#dsd-ui-buttons").append(button_png_map);
		
		$("#dsd-ui-col-"+columnIdx).append('<div id="dsd-ui-export-options" style="padding:0px 15px;text-align: left !important;display:none;"></div>');
		var export_options = '<a data-toggle="collapse" href="#dataset-export-options" role="button" aria-expanded="false" aria-controls="dataset-export-options">Export options</a><br>';
		export_options += '<div class="collapse multi-collapse" id="dataset-export-options">';
		export_options += '<fieldset style="border: 1px #ccc solid;border-radius:4px;padding:4px;">';
		//option to prettify column names
		export_options += '<div class="form-check" ><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-colnames" type="checkbox" class="form-check-input">Prettify column names</label></div>';
		//option to enrich with data labels
		export_options += '<div class="form-check" ><label class="form-check-label" style="font-weight:100"><input id ="dataset-export-option-labels" type="checkbox" class="form-check-input">Enrich with data labels</label></div>';
		export_options += '<p style="margin-top:10px;">More export methods?</p>';
		export_options += '<div class="data-export-buttons">';
		export_options += '<a id="dataset-export-option-wfs" href="" target="_blank" title="Get OGC WFS data request"><img src="js/OpenFairViewer/img/buttons/wfs-icon.png" width="50" height="50"/></a>';
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
			$('#dsd-ui-button-png').prop('disabled', false);
		}else{
			$('#dsd-ui-button-csv1').prop('disabled', true);
			$('#dsd-ui-button-csv2').prop('disabled', true);
			$('#dsd-ui-button-table').prop('disabled', true);
			$('#dsd-ui-button-png').prop('disabled', true);
		}
		
	}
	
	/**
	 * OpenFairViewer.prototype.handleQueryMapOptions
	 * @param columnIdx
	 */
	OpenFairViewer.prototype.handleQueryMapOptions = function(columnIdx){		
		var this_ = this;
		//id
		var map_type_id = "map-type-selector";
		//html
		$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_type_id+'" class="dsd-ui-dimension" title="Select the type of statistical map"></select>');
		//jquery widget
		var formatMaptype = function(item) {
			if (!item.id) { return item.text; }
			var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
			return $item;
		};
		var map_type_placeholder = 'Select a map type';
		$("#" + map_type_id).select2({
			theme: 'classic',
			allowClear: false,
			placeholder: map_type_placeholder,
			data: [{id:'graduated', text: 'Graduated symbols map'},{id:'choropleth', text: 'Choropleth map'}],
			templateResult: formatMaptype,
			templateSelection: formatMaptype
		});
		$("#" + map_type_id).val("graduated").trigger("change");

		//6. Map classifications
		if(this_.options.map.styling.dynamic){
			//Classification type
			//-------------------
			//id
			var map_classtype_id = "map-classtype-selector";
			//html
			$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_classtype_id+'" class="dsd-ui-dimension" title="Select the type of data interval classification"></select>');
			//jquery widget
			var formatClasstype = function(item) {
				if (!item.id) { return item.text; }
				var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
				return $item;
			};
			var map_classtype_placeholder = 'Select a classification';
			$("#" + map_classtype_id).select2({
				theme: 'classic',
				allowClear: false,
				placeholder: map_classtype_placeholder,
				data: [{id:'ckmeans', text: 'Ckmeans clustering'},{id:'equal', text: 'Equal intervals'},{id:'quantile', text: 'Quantiles'}],
				templateResult: formatClasstype,
				templateSelection: formatClasstype
			});
			$("#" + map_classtype_id).val("ckmeans").trigger("change");

			//Number of class intervals
			//-------------------------
			//id
			var map_classnb_id = "map-classnb-selector";
			//html
			$("#dsd-ui-col-"+columnIdx).append('<select id = "'+map_classnb_id+'" class="dsd-ui-dimension" title="Select the number of data intervals"></select>');
			//jquery widget
			var formatClassnb = function(item) {
				if (!item.id) { return item.text; }
				var $item = $('<span class="dsd-ui-item-label" >' + item.text + '</span>');
				return $item;
			};
			var map_classnb_placeholder = 'Select the number of intervals';
			$("#" + map_classnb_id).select2({
				theme: 'classic',
				allowClear: false,
				placeholder: map_classnb_placeholder,
				data: [{id: '3', text: '3'},{id: '4', text: '4'}, {id: '5', text: '5'}],
				templateResult: formatClassnb,
				templateSelection: formatClassnb
			});
			$("#" + map_classnb_id).val("5").trigger("change");
		}
	}

	/**
	 * OpenFairViewer.prototype.handleFilter
	 * @param pid
	 */
	OpenFairViewer.prototype.handleFilter = function(dataset){
		
		var deferred = $.Deferred();
		
		var this_ = this;
		var pid = dataset.pid;
		var entry = dataset.entry? dataset.entry : dataset;
		this.dataset_on_query = {pid: pid, entry: entry, strategy: "ogc_filters", dsd: null, query: null};
				
		//build UI
		var bootstrapClass = "col-md-" + 12/this_.options.query.columns;

		$("#dsd-ui").append('<div id="dsd-ui-row" class="row"></div>');
		$("#dsd-ui-row").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');

		//id
		var ogcfilter_component_id = "ui-ogc_filter";
		//html
		$("#dsd-ui-col-1").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Filter</label></p></div>');
		$("#dsd-ui-col-1").append('<input type="text" id = "'+ogcfilter_component_id+'" class="dsd-ui-dimension" title="Filter data with CQL" autofocus="true" ></select>');
		
		//query form buttons
		this.handleQueryFormButtons(1);
		
		deferred.resolve();
		return deferred.promise();
	}

	/**
	 * OpenFairViewer.prototype.handleDSD
	 * @param dataset
	 */
	OpenFairViewer.prototype.handleDSD = function(dataset){

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
				//TODO later get 'type' value from FeatureCatalogue. This type will condition all underlying services (url params for WMS, app, etc)
				var dsd = this_.parseFeatureCatalogue(response);
				if(!dsd){
					console.warn("No feature catalogue available although referenced in metadata. Delegate to simple filter form");
					this_.handleFilter(dataset);
					return;
				}
				this_.dataset_on_query = { pid: pid, entry: entry, strategy: dsd.strategy, dsd: dsd.components, query: null };
				
				//build UI
				var bootstrapClass = "col-md-" + 12/this_.options.query.columns;
				
				//1. Build UI from ATTRIBUTES
				//-------------------------------------------
				var attributeMatcher = function(params, data){
					params.term = params.term || '';
					if ($.trim(params.term) === '') {
					  return data;
					}  
					term = params.term.toUpperCase();
					var altText = data.alternateText? data.alternateText : '';
					if (data.text.toUpperCase().indexOf(term) > -1  |
						data.id.toUpperCase().indexOf(term) > -1    |
						altText.toUpperCase().indexOf(term) > -1    ) {
						return data;
					}
					return null;
				}
				$("#dsd-ui").append('<div id="dsd-ui-row" class="row"></div>');
				$("#dsd-ui").append('<input type="text" autofocus="autofocus" style="display:none" />'); //Avoid autofocus on query inputs
				$("#dsd-ui-row").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');
				$("#dsd-ui-col-1").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.query.labels.attributes+'</label></p></div>');
				for(var i=0;i<this_.dataset_on_query.dsd.length;i++){
					var dsd_component = this_.dataset_on_query.dsd[i];
					if(dsd_component.definition == "attribute"){
						
						//attribute with list values --> DROPDOWNLISTS
						if(dsd_component.primitiveType == "xsd:string"){
						  if(dsd_component.values){
							//id
							var dsd_component_id = "dsd-ui-dimension-attribute-" + dsd_component.primitiveCode;
							
							//html
							$("#dsd-ui-col-1").append('<select id = "'+dsd_component_id+'" multiple="multiple" class="dsd-ui-dimension dsd-ui-dimension-attribute" title="Filter on '+dsd_component.name+'"></select>');
							
							//jquery widget
							var attributeItem = function(item) {
							  if (!item.id) { return item.text; }
							  //TODO vocabulary stuff for countries
							  if(["flag", "flagstate", "country"].filter(function(el){return item.codelist.toLowerCase().match(el)}).length > 0){
								  var $item = $(
									'<img src="js/OpenFairViewer/img/flags/' + item.id.toLowerCase() + '.gif" class="img-flag" />' +
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
								templateResult: attributeItem,
								templateSelection: attributeItem,
								matcher: attributeMatcher
							});	
						  }
						}
						
						//attribute with time --> datepicker / datetimepicker
						if(dsd_component.primitiveType == "xsd:date" || dsd_component.primitiveType == "xsd:datetime"){
							//indicates local tzone but required to display well the original date
							var time_start_local = new Date(Date.parse(entry.time_start.split('Z')[0]));
							var time_start_local_offset = time_start_local.getTimezoneOffset()*60000;
							var time_start = new Date(time_start_local.getTime() + time_start_local_offset);
							var time_end_local = new Date(Date.parse(entry.time_end.split('Z')[0]));
							var time_end_local_offset = time_end_local.getTimezoneOffset()*60000;
							var time_end = new Date(time_end_local.getTime() + time_end_local_offset);
	
							//id
							var dsd_component_id_start = "dsd-ui-dimension-time-start-"+dsd_component.primitiveCode;
							var dsd_component_id_end = "dsd-ui-dimension-time-end-"+dsd_component.primitiveCode;
							//html
							var dsd_component_time_html = '<div class="dsd-ui-dimension-time" style="text-align:left;margin-left:25px;margin-bottom:5px;">';
							dsd_component_time_html += '<label style="width:120px;font-weight:normal;">'+dsd_component.name+ '</label> <input type="text" id="'+dsd_component_id_start+'" class="dsd-ui-dimension-datepicker" >'
							if(dsd.strategy=="ogc_filters") dsd_component_time_html += '<input type="text" id="'+dsd_component_id_end+'" class="dsd-ui-dimension-datepicker" >'
							$("#dsd-ui-col-1").append(dsd_component_time_html);
							
							var startRange = $("#"+dsd_component_id_start);
							var endRange = $("#"+dsd_component_id_end);
							
							//jquery widget
							if(dsd_component.primitiveType == "xsd:date"){
								switch(dsd.strategy){
									case "ogc_filters":
										$.timepicker.dateRange(startRange, endRange,{
											minDate: time_start, maxDate: time_end
										}); break;
									case "ogc_viewparams":
										startRange.datetimepicker({
											minDate: time_start, maxDate: time_end,
											showHour: false, showMinute: false
										}); break;
								}
							}else if(dsd_component.primitiveType == "xsd:datetime"){
								switch(dsd.strategy){
									case "ogc_filters":
										$.timepicker.datetimeRange(startRange, endRange, {
											minDate: time_start, maxDate: time_end,
											dateFormat: 'yy-mm-dd', 
											timeFormat: 'HH:mm:ss',
											controlType: 'select',
											oneLine: true,
											start: {}, end: {}
										});break;
									case "ogc_viewparams":
										startRange.datetimepicker({
											minDate: time_start, maxDate: time_end,
											dateFormat: 'yy-mm-dd', 
											timeFormat: 'HH:mm:ss',
											controlType: 'select',
											oneLine: true
										});break;
								}
							}
							
							$("#dsd-ui-col-1").append('</div>');
						}

					}
				}
				
				//2. Build UI from VARIABLES
				//-------------------------------------------
				var variables = this_.dataset_on_query.dsd.filter(function(item){if(item.definition == "variable") return item});
				if(variables.length > 0){
					
					//VARIABLES handling as drop-down list
					//------------------------------------
					//variable matcher
					var variableMatcher = function(params, data){
						params.term = params.term || '';
						if ($.trim(params.term) === '') {
						  return data;
						}  
						term = params.term.toUpperCase();
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
					
					$("#dsd-ui").append('<div id="dsd-ui-row" class="row"></div>');
					$("#dsd-ui-row").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');
					$("#dsd-ui-col-1").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.query.labels.variables+'</label></p></div>');
					
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
					$("#dsd-ui-col-1").append('<select id = "'+dsd_variables_id+'" class="dsd-ui-dimension dsd-ui-dimension-variable" title="Select a variable"></select>');
					$("#" + dsd_variables_id).select2({
						theme: 'classic',
						allowClear: false,
						data: variable_items,
						templateResult: variableItemResult,
						templateSelection: variableItemSelection,
						matcher: variableMatcher
					});	
					
					//VARIABLES OPTIONS
					//------------------------------------
					$("#dsd-ui-row").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
					$("#dsd-ui-col-2").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>'+ this_.options.query.labels.options+'</label></p></div>');
					this_.handleQueryMapOptions(2);
				}
				
				//query form buttons
				if(variables.length == 0) $("#dsd-ui-row").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
				this_.handleQueryFormButtons(2);

				
				//2. Time start/end slider or datepickers
				//-----------------------------------------
				//TODO
				/*
				
				//for time dimension
				//year extent extracted from metadata, information always available
				var time_start = this_.dataset_on_query.entry.time_start;
				var year_start = parseInt(time_start.substring(0,4));
				var time_end = this_.dataset_on_query.entry.time_end;
				var year_end = parseInt(time_end.substring(0,4));
				
				
				
				this_.timeWidget = this_.options.query.time? this_.options.query.time : 'slider';
				var dsd_time_dimensions = ["time_start", "time_end"];
				var timeDimensions = this_.dataset_on_query.dsd.filter(function(item){if(dsd_time_dimensions.indexOf(item.serviceCode) != -1) return item});
				var timeDimTypeList = this_.dataset_on_query.dsd.filter(function(i){if(i.serviceType=="TimeDimension"){return(i)}}).map(function(i){return(i.primitiveType)});
				this_.timeDimensionType = "";
				var timeDimTypes = new Array();
				for(var i=0;i<timeDimTypeList.length;i++){ 
					var timeDimType = timeDimTypeList[i];
					if(timeDimTypes.indexOf(timeDimType) == -1){
						timeDimTypes.push(timeDimType);
					}
				}
				switch(timeDimTypes[0]){
					case "xs:int":
						this_.timeDimensionType = 'year'; break;
					case "xs:dateTime":
						this_.timeDimensionType = 'datetime'; break;
				}
				
				if(this_.timeDimensionType == 'year'){ this_.timeWidget = "slider" }
				if(timeDimensions.length == 2){
					if(this_.timeWidget == "slider"){
						//id
						var dsd_component_id = "dsd-ui-time";
						var dsd_component_id_range = dsd_component_id + "-range";
						
						//html
						var dsd_component_time_html = '<div class="dsd-ui-dimension dsd-ui-dimension-time">' +
						'<p style="margin:0;"><label for="'+dsd_component_id_range+'">Temporal extent</label>' +
						'<input type="text" id="'+dsd_component_id_range+'" readonly style="margin-left:5px; border:0; color:#f6931f; font-weight:bold;"></p>' +
						'<div id="'+dsd_component_id+'"></div>' +
						'</div>';
						$("#dsd-ui-col-2").append(dsd_component_time_html);
						
						//jquery widget
						$("#"+dsd_component_id).slider({
						  range: true, min: year_start, max: year_end,
						  values: [ year_start, year_end ],
						  slide: function( event, ui ) {
							$("#"+dsd_component_id_range).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
						  }
						});
						$("#"+dsd_component_id_range).val($("#"+dsd_component_id).slider( "values", 0 ) + " - " +  $("#"+dsd_component_id).slider( "values", 1 ));
					
					}else if(this_.timeWidget == "datepicker"){
						$("#dsd-ui-col-2").append('<br><div class="dsd-ui-dimension dsd-ui-dimension-time"><p style="margin:0;"><label>Temporal extent</label></p>');
						for(var i=0;i<dsd_time_dimensions.length;i++){
							var dsd_time_dimension = dsd_time_dimensions[i];
							//id
							var dsd_component_id = "dsd-ui-"+dsd_time_dimension;
							//html
							var prefix = dsd_time_dimension == "time_start"? "Start" : "End";
							var dsd_component_time_html =  prefix+' date: <input type="text" id="'+dsd_component_id+'" class="dsd-ui-dimension-datepicker">'
							$("#dsd-ui-col-2").append(dsd_component_time_html);
							
							//jquery widget
							var defaultDate = dsd_time_dimension == "time_start"? new Date(year_start, 1 - 1, 1) : new Date(year_end, 1 - 1, 1)
							$("#"+dsd_component_id).datepicker({
								changeMonth: true,
								changeYear: true,
								defaultDate: defaultDate,
								yearRange: year_start + ":" + year_end,
								minDate: new Date(year_start, 1 - 1, 1),
								maxDate: new Date(year_end, 1 - 1, 1)
							});
						}
						$("#dsd-ui-col-2").append('</p></div>');
					}
				}else{
					alert("OpenFairViewer doesn't support yet data services with a single time parameter");
					//this is the main one
				}*/
				
				//3. Other time dimensions
				//-------------------------
				/*var extra_time_dimensions = ['year', 'semester', 'quarter', 'month'];
				for(var i=0;i<this_.dataset_on_query.dsd.length;i++){
					var dsd_component = this_.dataset_on_query.dsd[i];
					//id
					var dsd_component_id = "dsd-ui-dimension-" + dsd_component.serviceCode;
					
					if(extra_time_dimensions.indexOf(dsd_component.serviceCode) != -1){
						//html
						$("#dsd-ui-col-2").append('<select id = "'+dsd_component_id+'" multiple="multiple" class="dsd-ui-dimension dsd-ui-dimension-codelist" title="Filter on '+dsd_component.name+'"></select>');
						//jquery widget
						var formatItem = function(item) {
						  if (!item.id) { return item.text; }
						  var $item = $(
							'<span class="dsd-ui-item-label" >' + item.text + '</span>'
						  );
						  return $item;
						};
						var dsd_component_placeholder = 'Add a ' + dsd_component.name;
						var extra_time_data;
						switch(dsd_component.serviceCode){
							case "year":
								extra_time_data = Array.apply(0, Array(year_end-year_start)).map(function(_,b) { return {id: year_start + b, text: year_start + b} });
								break;
							case "semester":
								extra_time_data = [{id: 1, text: "S1"},{id: 2, text: "S2"}];
								break;
							case "quarter":
								extra_time_data = [{id: 1, text: "Q1"},{id: 2, text: "Q2"}, {id: 3, text:"Q3"}, {id: 4, text: "Q4"}];
								break;
							case "month":
								extra_time_data = [{id:1, text: "January"},{id:2, text: "February"}, {id:3, text: "March"}, {id:4, text: "April"}, {id:5, text: "May"}, {id:6, text: "June"}, {id:7, text: "July"}, {id:8, text: "August"}, {id: 9, text: "September"}, {id: 10, text: "October"},{id: 11, text: "November"}, {id: 12, text: "December"}];
								break;
						}
						
						$("#" + dsd_component_id).select2({
							theme: 'classic',
							allowClear: true,
							placeholder: dsd_component_placeholder,
							data: extra_time_data,
							templateResult: formatItem,
							templateSelection: formatItem
						});
					 }
				}*/
				
				//4. Aggregation method
				//------------------------------
				/*
				//id
				var dsd_component_id = "dsd-ui-dimension-aggregation_method";
				//html
				$("#dsd-ui-col-2").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Aggregation method</label></p></div>');
				$("#dsd-ui-col-2").append('<select id = "'+dsd_component_id+'" class="dsd-ui-dimension" title="Select a time aggregation method"></select>');
				//jquery widget
				var formatMethod = function(item) {
				  if (!item.id) { return item.text; }
				  var $item = $(
					'<span class="dsd-ui-item-label" >' + item.text + ' <span class="dsd-ui-item-code">['+item.id+']</span>' + '</span>'
				  );
				  return $item;
				};
				var dsd_component_placeholder = 'Select an aggregation method';
				$("#" + dsd_component_id).select2({
					theme: 'classic',
					allowClear: true,
					placeholder: dsd_component_placeholder,
					data: [{id:'sum', text: 'Sum'},{id:'avg', text: 'Average'}],
					templateResult: formatMethod,
					templateSelection: formatMethod,
					matcher: codelistMatcher
				});*/
				
				

				deferred.resolve();
			}
		});
	
		return deferred.promise();

	}
	
	/**
	 * OpenFairViewer.prototype.stringifyStrategyParams
	 * @param dataset
	 * @param strategyparams
	 */
	OpenFairViewer.prototype.stringifyStrategyParams = function(dataset, strategyparams){
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
								filter = '(' + fieldname + ' IN(' + item_values.join(',') + '))';
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
							filter = fieldname + ':' + item_values[0];
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
	 * OpenFairViewer.prototype.getStrategyParams
	 * @param dataset
	 * @param stringify
	 */
	 OpenFairViewer.prototype.getStrategyParams = function(dataset, stringify){
		var this_ = this;
		var data_query = new Array();
		var tostring = stringify? stringify : false;
		
		switch(dataset.strategy){
		    case "ogc_filters":
				//Get params according to 'filters' strategy
				//2 cases: simple filter vs. featurecatalogue
				if(dataset.dsd){
					$.each($(".dsd-ui-dimension-attribute"), function(i,item){ 
						var values = $("#"+item.id).val();
						if(values) if(values.length > 0){
							var data_component_query = new Object();
							var attribute = item.id.split('dsd-ui-dimension-attribute-')[1];
							var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
							if(attributeDef.primitiveType == "xsd:string") values = values.map(function(item){return "'"+item+"'"});
							data_component_query[attribute] = {type: 'list', content: values};
							data_query.push(data_component_query);
						}
					});
					$.each($(".dsd-ui-dimension-time"), function(i,item){
						var inputs = $(item).find("input");
						var val_start = $(inputs[0]).val();
						var val_end = $(inputs[1]).val();
						if(val_start != "" && val_end != ""){
							var date_start = new Date(Date.parse(val_start+'Z'));
							var date_end = new Date(Date.parse(val_end+'Z'));
							var data_component_query = new Object();
							var attribute = inputs[0].id.split('dsd-ui-dimension-time-start-')[1];
							var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
							data_component_query[attribute] = {type: 'timeperiod', content: [date_start.toISOString().split(".000Z")[0], date_end.toISOString().split(".000Z")[0]]};
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
				$.each($(".dsd-ui-dimension-attribute"), function(item){ 
					var values = $("#"+item.id).val();
					if(values) if(values.length > 0){
						var data_component_query = new Object();
						var attribute = item.id.split('dsd-ui-dimension-attribute-')[1];
						data_component_query[attribute] = {type: 'list', content: values};
						data_query.push(data_component_query);
					}
				});
				$.each($(".dsd-ui-dimension-time"), function(i,item){
					var inputs = $(item).find("input");
					var val_instant = $(inputs[0]).val();
					if(val_instant != ""){
						var date_instant = new Date(Date.parse(val_instant+'Z'));
						var data_component_query = new Object();
						var attribute = inputs[0].id.split('dsd-ui-dimension-time-start-')[1];
						var attributeDef = dataset.dsd.filter(function(component){if(component.primitiveCode==attribute) return component})[0];
						data_component_query[attribute] = {type: 'timeinstant', content: [date_instant.toISOString()]};
						data_query.push(data_component_query);
					}
				});
			
				//grab time dimension (time_start/time_end)
				/*var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
				if(this_.timeWidget == 'slider'){
					var values = $("#dsd-ui-time").slider('values');
					var time_start = values[0]
					if(this_.timeDimensionType == 'datetime') time_start = new Date(new Date(values[0], 1 - 1, 1) - tzoffset).toISOString().split('T')[0];
					var time_end = values[1];
					if(this_.timeDimensionType == 'datetime') time_end = new Date(new Date(values[1], 11, 31) - tzoffset).toISOString().split('T')[0];
					var data_component_query_timestart = new Object();
					data_component_query_timestart['time_start'] = time_start;
					data_query.push(data_component_query_timestart);
					var data_component_query_timeend = new Object();
					data_component_query_timeend['time_end'] = time_end;
					data_query.push(data_component_query_timeend);
				
				}else if(this_.timeWidget == 'datepicker'){
					var time_start = $($(".dsd-ui-dimension-datepicker")[0]).datepicker( "getDate" );
					if(!time_start) time_start = new Date(new Date(dataset.entry.time_start) - tzoffset).toISOString().split('T')[0];
					var time_end = $($(".dsd-ui-dimension-datepicker")[1]).datepicker( "getDate" );
					if(!time_end) time_end = new Date(new Date(dataset.entry.time_end) - tzoffset).toISOString().split('T')[0];
					var data_component_query_timestart = new Object();
					data_component_query_timestart['time_start'] = time_start;
					data_query.push(data_component_query_timestart);
					var data_component_query_timeend = new Object();
					data_component_query_timeend['time_end'] = time_end;
					data_query.push(data_component_query_timeend);
				}
			
				//grab aggregation method
				var aggregation_method = $("#dsd-ui-dimension-aggregation_method").select2('val');
				var data_component_query_method = new Object();
				data_component_query_method['aggregation_method'] = aggregation_method;
				data_query.push(data_component_query_method);*/
				break;

		}

		if(stringify) data_query = this_.stringifyStrategyParams(dataset, data_query);

		return data_query;
	}
	
	/**
	 * OpenFairViewer.prototype.getStrategyVariable
	 */
	OpenFairViewer.prototype.getStrategyVariable = function(){
		return $("#dsd-ui-dimension-variable").val();
	}
         
      
	// Map UI
	//===========================================================================================
		
	/**
	 * OpenFairViewer.prototype.initMap Inits the map
	 * @param id
	 * @param main
	 * @param extent
	 */
	OpenFairViewer.prototype.initMap = function(id, main, extent){
        
		var map;
		var this_ = this;
		this_.layers = new Object();
		
		//baselayers
		baseLayers = [
			new ol.layer.Group({
				'title': "Basemaps",
				layers: this_.options.map.baselayers
			})
		];

		
		//overlay groups
		var overlays = new Array();
		for(var i=0;i< this.options.map.layergroups.length;i++){
			var overlay = new ol.layer.Group({
				'title': this_.options.map.layergroups[i].name,
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
		var map = new ol.Map({
			id: mapId,
			target : mapId,
			layers : this_.layers.baseLayers.concat(this_.layers.overlays),
			view : new ol.View({
				projection: this_.options.map.projection,
				center : ol.extent.getCenter(defaultMapExtent),
				extent: defaultMapExtent,
				zoom : defaultMapZoom
			}),
			controls: [],
			logo: false
		});
		map.addControl( new ol.control.LoadingPanel() );
		map.addControl( new ol.control.OverviewMap({
			className: 'ol-overviewmap ol-custom-overviewmap',
			layers: [ this_.layers.baseLayers[0] ],
			view : new ol.View({
				projection: this_.options.map.projection,
				center : ol.extent.getCenter(defaultMapExtent),
				extent: defaultMapExtent,
				zoom : defaultMapZoom
			}),
			collapseLabel: '\u00BB',
  			label: '\u00AB',
  			collapsed: true
		}) );
		map.addControl( new ol.control.Zoom() );
		map.addControl( new ol.control.ZoomToMaxExtent({
			extent	: extent? extent : defaultMapExtent,
			zoom	: defaultMapZoom
		}));
		map.addControl( new ol.control.Snapshot({dpi: 300}) );
		
		if(main){
			map.addControl( new ol.control.LayerSwitcher({
					displayLegend: true,
					collapsableGroups : true,
					overlayGroups : this.options.map.layergroups
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
			var baseAttribution = new ol.control.Attribution({
				className: 'ol-attribution-map',
				collapsible: false
			});
			map.addControl(baseAttribution);
			
			//manage the display of watermark (logo)
			var attMaps = map.getTargetElement().getElementsByClassName("ol-attribution-map");
			if( attMaps.length > 0) attMaps[0].getElementsByTagName("li")[0].innerHTML = this.options.map.attribution;
			
			//hack to remove the baselayer attribution that for some reason is also added to the ol-attribution-map
			//while explicitely referenced on ol-attribution-baselayer (to investigate if there is a cleaner solution)
			map.on('postrender', function() {
				var attMaps = this.getTargetElement().getElementsByClassName("ol-attribution-map");
				if( attMaps.length > 0){
					var attLis = attMaps[0].getElementsByTagName("li");
					if( attLis.length > 1) attLis[1].remove();
				}
			});
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
        
    /**
	 * OpenFairViewer.prototype.addLayer Adds layer
	 * @param mainOverlayGroup
	 * @param id
	 * @param title
	 * @param wmsUrl
	 * @param wmsVersion
	 * @param layer
	 * @param cql_filter
	 * @param style
	 * @param viewparams
	 * @param envfun
	 * @param envparams
	 * @param count
	 */
	OpenFairViewer.prototype.addLayer = function(mainOverlayGroup, id, title, wmsUrl, wmsVersion, layer,
												hidden, visible, showLegend, opacity, tiled, cql_filter, style, 
												viewparams, envfun, envparams, count){
		var this_ = this;
		var layerParams = {
				'LAYERS' : layer,
				'VERSION': '1.1.0', //TODO support wmsVersion for 1.3.0,
				'FORMAT' : 'image/png'
		}
		var olLayerClass = ol.layer.Image;
		var olSourceClass = ol.source.ImageWMS;
		if(tiled){
			layerParams['TILED'] = true;
			layerParams['TILESORIGIN'] = [-180,-90].join(',');
			olLayerClass = ol.layer.Tile;
			olSourceClass = ol.source.TileWMS;
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
		return layer;
	}

    	/**
	 * OpenFairViewer.prototype.getFeatureInfo
	 * @param layer
	 * @param coords
	 */
	OpenFairViewer.prototype.getFeatureInfo = function(layer, coords){
		var this_ = this;
		var viewResolution = this_.map.getView().getResolution();
		var viewProjection = this_.map.getView().getProjection().getCode();
		var popup = this.map.getOverlayById(layer.id);
		$.ajax({
			url: layer.getSource().getGetFeatureInfoUrl(coords, viewResolution, viewProjection, {'INFO_FORMAT': "application/json"}),
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				console.log(response);
				var gml = new ol.format.GeoJSON();
				var features = gml.readFeatures(response);
				if(features.length > 0){
					var feature = features[0];
					popup.show(coords, this_.options.map.tooltip.handler(layer, feature));
					this_.popup = {id: layer.id, coords: coords};
				}else{
					popup.hide();
					this_.popup = {};

					//in case feature markers are highlighted we remove them
					var markersId = 'ofv-feature-marker';
					var markers = this_.getLayerByProperty(markersId, 'id');
					if(markers){
						var source = new ol.source.Vector({ features: [] });
						markers.setSource(source);
					}
			
				}
			}
		});
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
    	OpenFairViewer.prototype.getNextFeatureInfoInTime = function(pid, layerUrl, serviceVersion, layerName, propertyName, propertyValue){
		var this_ = this;
		var layer = this.getLayerByProperty(pid, "id");
		var viewResolution = this_.map.getView().getResolution();
		var viewProjection = this_.map.getView().getProjection().getCode();
		var popup = this.map.getOverlayById(layer.id);

		this.getDatasetNextFeatureInTime(layerUrl, serviceVersion, layerName, propertyName, propertyValue).then(function(nextresponse){
			
			if(nextresponse.length > 0){
				var nextfeature = nextresponse[0];
				var geom = nextfeature.getGeometry();
				var coords = ol.extent.getCenter(geom.getExtent());
				if(geom instanceof ol.geom.LineString ||
		   	   	   geom instanceof ol.geom.MultiLineString ||
	 	   	   	   geom instanceof ol.geom.MultiPoint){
					coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length/2)];
				}
				if(geom instanceof ol.geom.Point) coords = geom.getCoordinates();			

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
	 * OpenFairViewer.prototype.addLayerTooltip
	 * @param layer
	 */
    	OpenFairViewer.prototype.addLayerTooltip = function(layer){
		var this_ = this;
		//configure popup
		var popup = new ol.Overlay.Popup({id: layer.id});
		this.map.addOverlay(popup);
	
		//display popup on mouse hover
		var featureInfoEvent = this.map.on('singleclick', function(evt) {		
			this_.getFeatureInfo(layer, evt.coordinate);
		});
		featureInfoEvent.id = layer.id;
		this.mapEvents.push(featureInfoEvent);
	}

    	/**
	 * OpenFairViewer.prototype.removeMapEventByProperty Util method to remove a map event by property
	 * @param eventProperty the property value
	 * @param by the property 
	 */
    	OpenFairViewer.prototype.removeMapEventByProperty = function(eventProperty, by){
		console.log("Remove map event with property "+by+" = " + eventProperty);
		var removed = false;
		var target = undefined;
		var events = this.mapEvents;
		for(var i=0;i<events.length;i++){
			var event = events[i];
			if(event[by] === eventProperty){
				this.map.unByKey(event);
				removed = true;
				break;
			}
		}
		this.mapEvents = this.mapEvents.filter(function(value, index, arr){return value.id != eventProperty});
		return removed;
	}
	

    	/**
	 * OpenFairViewer.prototype.removeLayerByProperty Util method to remove a layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
    	OpenFairViewer.prototype.removeLayerByProperty = function(layerProperty, by){
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
					removed = true;
					break;
				}
			}
		}
		return removed;
	}
        
	/**
	 * OpenFairViewer.prototype.getDataProtocolsFromMetadataEntry
	 * @param md_entry
	 * @param protocol
	 * @param layerSuffix
	 * @returns a WFS base URL
	 */
	OpenFairViewer.prototype.getDataProtocolsFromMetadataEntry = function(md_entry, protocol, layerSuffix){
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
				layerUrl = onLines[i].ciOnlineResource.linkage.url;
				if(layerUrl.indexOf("ows?")>0) layerUrl = layerUrl.split("ows?")[0] + "ows?service="+ protocol;
				if(layerUrl.indexOf(protocol.toLowerCase()+"?")>0) layerUrl = layerUrl.split(protocol.toLowerCase()+"?")[0] + "ows?service=" + protocol;
				//layerName
				layerName = onLines[i].ciOnlineResource.name;
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
	};
	

	/**
	 * OpenFairViewer.prototype.getDatasetGeometryComponent
	 * @param dataset
	 */
	OpenFairViewer.prototype.getDatasetGeometryComponent = function(dataset){
		if(!dataset.dsd) return;
		var geom_component = dataset.dsd.filter(function(item){if(item.primitiveType.startsWith("gml")) return item});
		if(geom_component.length==0) return;
		return geom_component[0];
	}
	
	/**
	 * OpenFairViewer.prototype.buildDynamicStylename
	 * @param
	 */
	OpenFairViewer.prototype.buildDynamicStylename = function(dataset, variable, maptype, classnb){
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
	OpenFairViewer.prototype.getDatasetFeatures = function(layerUrl, serviceVersion, layerName, strategy, queryparams, cql_filter, propertyNames){
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
			console.log(error);
			deferred.reject(error);
		}
	    });
	    return deferred.promise();
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
	OpenFairViewer.prototype.getDatasetNextFeatureInTime = function(layerUrl, serviceVersion, layerName, propertyName, propertyValue){
	    var wfsRequest = this.getDatasetWFSLink(layerUrl, serviceVersion, layerName, 'ogc_filters', null, propertyName + ' > ' + propertyValue, null, 'json');
	    wfsRequest += '&sortBy='+propertyName+'&maxFeatures=1';
	    console.log(wfsRequest);
	    var deferred = $.Deferred();
	    $.ajax({
                url: wfsRequest,
                contentType: 'application/json',
                type: 'GET',
                success: function(response){
			var geojson = new ol.format.GeoJSON();
			var features = geojson.readFeatures(response);			
			deferred.resolve(features);
		},
		error: function(error){
			console.log(error);
			deferred.reject(error);
		}
	    });
	    return deferred.promise();
	}
	
	
	/**
	 * OpenFairViewer.prototype.getDatasetValues
	 * @param an array of features
	 * @param propertyName
	 * @returns a array of values
	 */
	OpenFairViewer.prototype.getDatasetValues = function(features, propertyName){
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
	OpenFairViewer.prototype.calculateBreaks = function(values, classType, classNb){
	    var breaks =  new Array();
	    switch(classType){
		//CKmeans
		case "ckmeans":
		    var clusters = ckmeans(values, classNb);
		    breaks = new Array();
		    for(var i=0;i<clusters.length;i++){
			var cluster = clusters[i];
			breaks.push(min(cluster));
			if(i==clusters.length-1) breaks.push(max(cluster));
		    }
		    break;
		//Equal intervals
		case "equal":
		    breaks = equalIntervalBreaks(values, classNb);
		    break;
		//quantiles
		case "quantile":
		    var qpt = 1/classNb;
		    breaks = new Array();
		    breaks.push(min(values));
		    for(var i=1;i<=classNb;i++){
			breaks.push(quantile(values,qpt*i));
		    }
		    breaks;					
	    }
	    return breaks;
	}

	/**
	 * OpenFairViewer.prototype.buildEnvParams
	 * @param variable
	 * @param breaks
	 */
	OpenFairViewer.prototype.buildEnvParams = function(variable, breaks){
	    var envparams = "var:"+variable+";";
	    for(var i=1;i<=breaks.length;i++){
		envparams += "v"+ i +":"+ breaks[i-1] + ";";
	    }
	    return envparams;
	}

	/**
	 * OpenFairViewer.prototype.getDatasetViewTitle
	 * @param dataset
	 * @param strategyparams
	 */
	OpenFairViewer.prototype.getDatasetViewTitle = function(dataset, strategyparams){
		var layerTitle = dataset.entry.title;
		layerTitle += '<button class="btn btn-xs dataset-button dataset-button-remove" data-pid="'+dataset.pid+'" title="Remove from map" '
		layerTitle += 'onclick="app.unselectDataset(this)"> X </button>';

		if(strategyparams) if(strategyparams.length > 0){
			var strategyName;
			switch(dataset.strategy){
				case "ogc_filters": strategyName = 'Filter'; break;
				case "ogc_dimensions": strategyName = 'Dimensions'; break;
				case "ogc_viewparams": strategyName = 'View parameters'; break;
			}
			layerTitle += '</br>';
			layerTitle += '<p style="font-weight:normal !important;font-size:90%;margin-left:20px;overflow-wrap:break-word;"><b>'+strategyName+':</b></br>';
			if(dataset.strategy == "ogc_filters"){
				if(strategyparams[0].CQL_FILTER){
					layerTitle += strategyparams[0].CQL_FILTER;
				}else{
					for(var i=0;i<strategyparams.length;i++){
						var strategyparam = strategyparams[i];
						var key = Object.keys(strategyparam)[0];
						var component = strategyparam[key];
						layerTitle += '&#8226; ' + key + ': '+ (component.type=="list"? component.content.join(',') : component.content.join('/') ) + '</br>';
					}
				}
				
			}else{
				for(var i=0;i<strategyparams.length;i++){
					var strategyparam = strategyparams[i];
					var key = Object.keys(strategyparam)[0];
					var component = strategyparam[key];
					layerTitle += '&#8226; ' + key + ': '+ component.content.join(',') + '</br>';
				}
			}
			layerTitle += '</p>';
		}
		return layerTitle;
	}
	
	/**
	 * OpenFairViewer.prototype.getDatasetDOILink
	 * @param md_entry
	 */
	OpenFairViewer.prototype.getDatasetDOILink = function(md_entry){
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
	 * OpenFairViewer.prototype.resolveDatasetDOI
	 * @param dataset
	 */
	OpenFairViewer.prototype.resolveDatasetDOI = function(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Resove DOI for dataset pid = " + pid);
		var the_dataset = this.datasets.filter(function(item){if(item.pid == pid) return item});
		if(the_dataset.length > 0) the_dataset = the_dataset[0]; window.open("//dx.doi.org/" + the_dataset.doi,'_blank');
	}

	/**
	 * OpenFairViewer.prototype.mapDataset
	 * @param dataset
	 * @param from_query_form
	 */
	OpenFairViewer.prototype.mapDataset = function(dataset, from_query_form){
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
			baseWfsUrl = baseWFS.url;
			wfsVersion = baseWFS.serviceVersion;
		}
		if(dataset.entry.wms.length > 0){
			var baseWMS = dataset.entry.wms.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>-1});
			if(baseWMS.length>0){ baseWMS = baseWMS[0] } else { baseWMS = dataset.entry.wms[0] };
			baseWmsUrl = baseWMS.url;
			layerName = baseWMS.name;
			wmsVersion = baseWMS.serviceVersion;
		}
		
	    var layer = this_.getLayerByProperty(dataset.entry.pid, 'id');
		var strategyparams = from_query_form? this_.getStrategyParams(dataset, false) : dataset.queryparams;
		var strategyparams_str = from_query_form? this_.getStrategyParams(dataset, true) : this_.stringifyStrategyParams(dataset, dataset.queryparams);
		console.log("Strategy params = " + strategyparams_str);
		var strategyvariable = from_query_form? this_.getStrategyVariable(dataset): dataset.variable;
		console.log("Strategy variable = " + strategyvariable);
	    var layerTitle = this_.getDatasetViewTitle(dataset, strategyparams);
		
		//dynamic styling properties
		var mapType =  from_query_form? $("#map-type-selector").select2('val') : dataset.envmaptype;
		var classType = from_query_form? $("#map-classtype-selector").select2('val') : dataset.envfun;
		
		var classNb = from_query_form? $("#map-classnb-selector").select2('val') : (dataset.envparams? dataset.envparams.split(";").filter(function(item){if(item!="") return item}).length-2 : null);
		var layerStyle =  from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;

		if(!layer){
			console.log("Adding new layer");
		    //ADD LAYER
			//////////////////////////////////////////////////////////////////////////////////////////
		    switch(dataset.strategy){
			 case "ogc_filters":
				if(dataset.dsd){
					console.log("Add layer with strategy 'ogc_filters' based on Feature Catalogue");
					if(this_.options.map.styling.dynamic){
						//dynamic styling
						this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
							console.log("Data series features");
							console.log(features);
							console.log("Data series values");
							var values = undefined;
							var breaks = undefined;
							var envparams = undefined;
							if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
							if(values) if(values.length > 0){
								if(values.length < classNb){
									classNb = values.length;
									layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style;
								}
								breaks = this_.calculateBreaks(values, classType, classNb);
								if(breaks.length == 1) breaks = [0, breaks[0]];
								if(breaks.length == 2) breaks[0] = 0;
								envparams = this_.buildEnvParams(strategyvariable, breaks);
							}
							
							this_.selectDataset(pid);
							var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, strategyparams_str, layerStyle, null, classType, envparams, (values? values.length : null));
							layer.strategy = dataset.strategy;
							layer.dsd = true;
							layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
							layer.variable = strategyvariable;
							layer.envfun = classType;
							layer.envmaptype = mapType;
							layer.count = values? values.length : null;
							this_.addLayerTooltip(layer);
							this_.setLegendGraphic(layer, breaks);	
							this_.map.changed();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
								
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', false);
							$('#dsd-ui-button-csv2').prop('disabled', false);
							$('#dsd-ui-button-table').prop('disabled', false);
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
								$('#dsd-ui-button-png').prop('disabled', true);
								$("#dsd-ui-export-options").hide();
							}
							
							//display WFS request download option
							var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
							$('#dataset-export-option-wfs').prop("href", wfs_link);
						});
					}else{
						//static styling
						this_.selectDataset(pid);
						var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, strategyparams[0], null,null);
						layer.strategy = dataset.strategy;
						layer.dsd = true;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						this_.map.changed();
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//display WFS request download option
						var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
						$('#dataset-export-option-wfs').prop("href", wfs_link);
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
					this_.addLayerTooltip(layer);
					$("#datasetMapper").bootstrapBtn('reset');
					$("#datasetMapper").prop('disabled', false);
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
					//display WFS request download option
					var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, null, cql_filter, null);
					$('#dataset-export-option-wfs').prop("href", wfs_link);
				}
				break;
				
			 case "ogc_dimensions":
				//TODO
				break;
				
			 case "ogc_viewparams":
			    if(this_.options.map.styling.dynamic){
					console.log("Add layer with strategy 'ogc_viewparams' (dynamic styling)");
					//dynamic styling
					this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
						console.log("Data series features");
						console.log(features);
						console.log("Data series values");
						var values = undefined;
						var breaks = undefined;
						var envparams = undefined;
						if(strategyvariable) values = this_.getDatasetValues(features, strategyvariable);
						if(values) if(values.length > 0){
							if(values.length < classNb){
								classNb = values.length;
								layerStyle = from_query_form? this_.buildDynamicStylename(dataset, strategyvariable, mapType, classNb) : dataset.style
							}
							var breaks = this_.calculateBreaks(values, classType, classNb);
							if(breaks.length == 1) breaks = [0, breaks[0]];
							if(breaks.length == 2) breaks[0] = 0;
							envparams = this_.buildEnvParams(strategyvariable, breaks);
						}
						this_.selectDataset(pid);
						var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, wmsVersion, layerName, false, true, true, 0.9, false, null, layerStyle, strategyparams_str, classType, envparams, (values? values.length : 0));
						layer.strategy = dataset.strategy;
						layer.dsd = true;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						layer.variable = strategyvariable;
						layer.envfun = classType;
						layer.envmaptype = mapType;
						layer.count = values? values.length: null;
						this_.addLayerTooltip(layer);
						this_.setLegendGraphic(layer, breaks);	
						this_.map.changed();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
							
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//display WFS request download option
						var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
						$('#dataset-export-option-wfs').prop("href", wfs_link);
						
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
					layer.dsd = true;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					this_.map.changed();
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
					//display WFS request download option
					var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
					$('#dataset-export-option-wfs').prop("href", wfs_link);
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
					if(this_.options.map.styling.dynamic){
						console.log("Update layer with strategy 'ogc_filters' based on Feature Catalogue (dynamic styling)");
						//dynamic styling
						this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
							console.log("Data series features");
							console.log(features);
							console.log("Data series values");
							var values = undefined;
							var breaks = undefined;
							var envparams = undefined;
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
								envparams = this_.buildEnvParams(strategyvariable, breaks);
							}
							
							//update viewparams, envparams & legend
							layer.strategy = dataset.strategy;
							layer.dsd = true;
							layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
							layer.setProperties({title: layerTitle});
							if(strategyparams_str != ""){
								layer.getSource().updateParams({'CQL_FILTER' : strategyparams_str});
							}else{
								delete layer.getSource().params_.CQL_FILTER;
							}
							layer.getSource().updateParams({'STYLES' : layerStyle});
							if(envparams) layer.getSource().updateParams({'env' : envparams});
							layer.variable = strategyvariable;
							layer.envfun = classType;
							layer.envmaptype = mapType;
							layer.count = values? values.length : null;
							this_.setLegendGraphic(layer, breaks);
							this_.map.changed();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', false);
							$('#dsd-ui-button-csv2').prop('disabled', false);
							$('#dsd-ui-button-table').prop('disabled', false);
							$('#dsd-ui-button-png').prop('disabled', false);
							$("#dsd-ui-export-options").show();
							
							//display WFS request download option
							var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
							$('#dataset-export-option-wfs').prop("href", wfs_link);
							
							//action on no data
							if(values) if(values.length==0){
								this_.removeLayerByProperty(pid, "id");
								this_.map.changed();
								$("#datasetMapper").bootstrapBtn('reset');
								$("#datasetMapper").prop('disabled', false);
								$(".query-nodata").show();
								//actions o download buttons
								$('#dsd-ui-button-csv1').prop('disabled', true);
								$('#dsd-ui-button-csv2').prop('disabled', true);
								$('#dsd-ui-button-table').prop('disabled', true);
								$('#dsd-ui-button-png').prop('disabled', true);
								$("#dsd-ui-export-options").hide();
							}
						});
					}else{
						console.log("Update layer with strategy 'ogc_filters' based on Feature Catalogue (static styling)");
						//static styling
						layer.setProperties({title: layerTitle});
						layer.getSource().updateParams({'CQL_FILTER' : strategyparams_str});
						layer.strategy = dataset.strategy;
						layer.dsd = true;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						this_.map.changed();
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//display WFS request download option
						var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
						$('#dataset-export-option-wfs').prop("href", wfs_link);
						
					}
				}else{
					console.log("Update layer with strategy 'ogc_filters' with simple CQL filter");
					var cql_filter = null;
					if(strategyparams.length >0) cql_filter = strategyparams[0].CQL_FILTER;
					layer.strategy = dataset.strategy;
					layer.dsd = false;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					layer.setProperties({title: layerTitle});
					layer.getSource().updateParams({'CQL_FILTER': cql_filter});
					this_.map.changed();
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
			case "ogc_dimensions":
			    //TODO
			    break;
			case "ogc_viewparams":
			    if(this_.options.map.styling.dynamic){
					console.log("Update layer with strategy 'ogc_viewparams' (dynamic styling)");
					//dynamic styling
					this_.getDatasetFeatures(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, (strategyvariable? [strategyvariable] : null )).then(function(features){
						console.log("Data series features");
						console.log(features);
						console.log("Data series values");
						var values = undefined;
						var breaks = undefined;
						var envparams = undefined;
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
							envparams = this_.buildEnvParams(strategyvariable, breaks);
						}
						//update viewparams, envparams & legend
						layer.strategy = dataset.strategy;
						layer.dsd = true;
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
						layer.count = values? values.length : null;
						this_.setLegendGraphic(layer, breaks);
						this_.map.changed();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-table').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
						$("#dsd-ui-export-options").show();
						
						//display WFS request download option
						var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
						$('#dataset-export-option-wfs').prop("href", wfs_link);
						
						//action on no data
						if(values) if(values.length == 0){
							this_.removeLayerByProperty(pid, "id");
							this_.map.changed();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							$(".query-nodata").show();
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', true);
							$('#dsd-ui-button-csv2').prop('disabled', true);
							$('#dsd-ui-button-table').prop('disabled', true);
							$('#dsd-ui-button-png').prop('disabled', true);
							$("#dsd-ui-export-options").hide();
						}
					});
			    }else{
					console.log("Update layer with strategy 'ogc_viewparams' (static styling)");
					//static styling
					layer.setProperties({title: layerTitle});
					layer.getSource().updateParams({'VIEWPARAMS' : strategyparams_str});
					layer.strategy = dataset.strategy;
					layer.dsd = true;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					this_.map.changed();
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-table').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
					$("#dsd-ui-export-options").show();
					
					//display WFS request download option
					var wfs_link = this_.getDatasetWFSLink(baseWfsUrl, wfsVersion, layerName, dataset.strategy, strategyparams_str, null, null);
					$('#dataset-export-option-wfs').prop("href", wfs_link);
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
	 * OpenFairViewer.prototype.getDatasetWFSLink
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
	OpenFairViewer.prototype.getDatasetWFSLink = function(layerUrl, serviceVersion, layerName, strategy, strategyparams_str, cql_filter, propertyNames, format){		
		
		layerUrl += "&version=" + (serviceVersion? serviceVersion : "1.0.0");
		layerUrl += "&request=GetFeature";
		layerUrl += "&typeName=" + layerName;
	    if(strategyparams_str){
			if(strategy == "ogc_filters") layerUrl += "&CQL_FILTER=" + encodeURI(strategyparams_str);
			if(strategy == "ogc_viewparams") layerUrl += "&VIEWPARAMS=" + strategyparams_str;
		}
	    if(cql_filter) layerUrl += "&CQL_FILTER=" + encodeURI(cql_filter);
	    if(propertyNames) layerUrl += "&propertyName=" + propertyNames.join(",");
	    if(format) layerUrl += "&outputFormat=" + format;
 	    return layerUrl;	
	}	
	
	/**
	 * OpenFairViewer.prototype.describeFeatureType
	 * @param layerUrl
	 * @param serviceVersion
	 * @param typeName
	 * @return a feature type description
	 */	
	OpenFairViewer.prototype.describeFeatureType = function(layerUrl, serviceVersion, typeName){
		var deferred = $.Deferred();
		layerUrl += "&version=" + (serviceVersion? serviceVersion : "1.0.0");
		layerUrl += "&request=DescribeFeatureType";
		layerUrl += "&typeName=" + typeName;
		$.ajax({
			url: layerUrl,
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				console.log("WFS describe feature type");
				fc = $(response); console.log(fc);
				var featuretype = new Array();
				var elems = fc.children().children()[1].childNodes[1].childNodes[1].childNodes[1].childNodes;
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
	OpenFairViewer.prototype.json2csv = function(objArray) {
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
			val = array[i][index];
			if(typeof val == 'string') val = '"' + val + '"';
					line += val + ',';
				}
			line = line.slice(0, -1);
			str += line + '\r\n';
		}
		return str;
	}

	/**
	 * Download CSV
	 * @param content csv string
	 * @param fileName
	 * @param mimeType
	 */
	OpenFairViewer.prototype.downloadCSV = function(content, fileName, mimeType) {
		if(!mimeType) mimeType <- 'text/csv;charset=utf-8;';
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
	 * OpenFairViewer.prototype.getateTimeString
	 * @param date
	 */
	OpenFairViewer.prototype.getDateTimeString = function(date){
		var str = date.toISOString();
		return (str.split("T")[0] + "" + str.split("T")[1].split(".")[0]).replace(/-/g,"").replace(/:/g,"");
	}
	
	/**
	 * OpenFairViewer.prototype.downloadDatasetCSV
	 * @param aggregated true if aggregated, false otherwise
	 */
	OpenFairViewer.prototype.downloadDatasetCSV = function(aggregated){
		
		//options
		var add_colnames = $("#dataset-export-option-colnames").prop("checked");
		var add_labels = $("#dataset-export-option-labels").prop("checked");
		
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		if(aggregated) wfsResources = wfsResources.filter(function(item){item.name.indexOf(this_.options.map.aggregated_layer_suffix)>0});
		var baseWFS = wfsResources[0];
		var baseLayerUrl = baseWFS.url;
		var layerName = baseWFS.name;
		var serviceVersion = baseWFS.serviceVersion;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		var layerUrl = this.getDatasetWFSLink(baseLayerUrl, serviceVersion, layerName, this.dataset_on_query.strategy, strategyparams_str, cql_filter, null, 'json');
		$.getJSON(layerUrl, function(response){
			var features = new ol.format.GeoJSON().readFeatures(response);
			var featuresToExport = new Array();
			for(var i=0;i<features.length;i++){
				var feature = features[i];
				var props = feature.getProperties();
				var prop_keys = Object.keys(props);
				var newprops = new Object();
				for(var j=0;j<prop_keys.length;j++){
					var key = prop_keys[j];
					if(key == "bbox") continue;
					if(key!="geometry"){
						var fieldAttribute = this_.dataset_on_query.dsd.filter(function(item){if(item.primitiveCode == key) return item});
						var keyname = key;
						var labelname = key + "_label";
						if(add_colnames) if(fieldAttribute.length>0){
							keyname = fieldAttribute[0].name + " [Code]";
							labelname = fieldAttribute[0].name + " [Label]";
						}
						newprops[keyname] = props[key];
						if(add_labels) if(fieldAttribute.length>0){
							if(fieldAttribute[0].values){
								var fieldValue = fieldAttribute[0].values.filter(function(item){if(item.id == props[key]) return item});
								if(fieldValue.length>0) newprops[labelname] = fieldValue[0].text;
							}
						}
					}
				}
				if(prop_keys.indexOf("geometry") != -1){
					newprops["geometry"] = new ol.format.WKT().writeGeometry(props["geometry"]);
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
	OpenFairViewer.prototype.formatTabularDataset = function(features){	
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
				if(key!="geometry"){
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
			if(prop_keys.indexOf("geometry") != -1){
				newprops["geometry"] = new ol.format.WKT().writeGeometry(props["geometry"]);
			}
			featuresToExport.push(newprops);
		}
		return featuresToExport;
	}
	
	/**
	 * OpenFairViewer.prototype.featureTypeToColumns
	 * @param featuretype
	 *
	 */
	OpenFairViewer.prototype.featureTypeToColumns = function(featuretype){
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
	 * OpenFairViewer.prototype.displayTabularDataset
	 *
	 */
	OpenFairViewer.prototype.displayTabularDataset = function(){
				
		var pageLength = 5;
				
		var this_ = this;
		var wfsResources = this.dataset_on_query.entry.wfs;
		var baseWFS = wfsResources[0];
		var baseLayerUrl = baseWFS.url;
		var layerName = baseWFS.name;
		var serviceVersion = baseWFS.serviceVersion;
		var strategyparams =  this.getStrategyParams(this.dataset_on_query, false);
		var cql_filter = null;
		var strategyparams_str = null;
		if(strategyparams){
			strategyparams_str = this.getStrategyParams(this.dataset_on_query, true);
			if(strategyparams.length>0) if(strategyparams[0].CQL_FILTER) cql_filter = strategyparams[0].CQL_FILTER;	
		}
		
		this.describeFeatureType(baseLayerUrl, serviceVersion, layerName).then(function(featuretype){
			
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
				outputFormat: 'json',
				sortBy: sortByPropertyName
			}
			if(this_.dataset_on_query.strategy == "ogc_filters")  wfsParams.cql_filter = encodeURI(strategyparams_str);
			if(this_.dataset_on_query.strategy == "ogc_viewparams") wfsParams.viewparams = strategyparams_str;
			
			this_.openDataDialog();
			$('#data-table').empty();
			
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
					ajaxUrl += "&outputFormat=" + wfsParams.outputFormat;
					$.get(ajaxUrl, function(response) {
						console.log(response);
						var features = new ol.format.GeoJSON().readFeatures(response);
						var data_export = this_.formatTabularDataset(features);
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
						if(data == null || typeof data == "undefined") data = "";
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
							var button_id_zoom = 'zoom_feature-'+row[0];
							var button_id_disp = 'display_feature'+row[0];
							//button to zoom to feature
							data = '<button id="'+button_id_zoom+'" class="btn btn-xs dataset-button-zoom" title="Zoom to feature" ';
								data += 'onclick="app.zoomToFeature(\''+wkt.toUpperCase()+'\')"><span class="glyphicon glyphicon-zoom-in"></span></button>';
							//button to display feature
								data += '<button id="'+button_id_disp+'" class="btn btn-xs dataset-button-add" style="margin-left:10px"  title="Display feature" ';
								data += 'onclick="app.highlightFeature(\''+this_.dataset_on_query.pid+'\',\''+row[0]+'\',\''+wkt.toUpperCase()+'\')"><span class="glyphicon glyphicon-map-marker"></span></button>';
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

	/**
	 * OpenFairViewer.prototype.processWKT
	 *
	 */
	OpenFairViewer.prototype.processWKT = function(wkt){
		var format = new ol.format.WKT();
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
	 * OpenFairViewer.prototype.utcToLocale
	 *
	 */
	OpenFairViewer.prototype.utcToLocale = function(str){	
		var date = new Date(Date.parse(str));
		return date.toISOString().split("T")[0] + 'T' + date.toLocaleTimeString();
	}

	/**

	/**
	 * OpenFairViewer.prototype.zoomToFeature
	 *
	 */
	OpenFairViewer.prototype.zoomToFeature = function(wkt){
		var geom = this.processWKT(wkt);
		var extent = geom.getExtent();
		this.map.getView().fit(extent,this.map.getSize());
	}

	/**
	 * OpenFairViewer.prototype.highlightFeature
	 *
	 */
	OpenFairViewer.prototype.highlightFeature = function(pid, id, wkt){
		var this_ = this;
		var geom = this.processWKT(wkt);
		var feature = new ol.Feature({
			geometry: geom,
			style : this_.options.browse.defaultStyle
		});
		feature.setId(id);

		var layerId = 'ofv-feature-marker';
		var layer = this.getLayerByProperty(layerId, 'id');
		var source = new ol.source.Vector({ features: [feature] });
		if(!layer){
			var layer = new ol.layer.Vector({
			  source: new ol.source.Vector({
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
		var coords = ol.extent.getCenter(geom.getExtent());
		if(geom instanceof ol.geom.LineString ||
		   geom instanceof ol.geom.MultiLineString ||
	 	   geom instanceof ol.geom.MultiPoint){
			coords = geom.getCoordinates()[0][Math.floor(geom.getCoordinates()[0].length/2)];
		}
		if(geom instanceof ol.geom.Point) coords = geom.getCoordinates();
		this_.getFeatureInfo(target_layer, coords);
		
	}

	
	/**
	 * OpenFairViewer.prototype.downloadMapPNG
	 *
	 */
	OpenFairViewer.prototype.downloadMapPNG = function(){
		var this_ = this;
		this.map.once('postcompose', function(event) {
			var canvas = event.context.canvas;
			var fileName = this_.dataset_on_query.pid +"_"+ this_.getDateTimeString(new Date()) + ".png";
			if (navigator.msSaveBlob) {
				navigator.msSaveBlob(canvas.msToBlob(), fileName);
			} else {
				canvas.toBlob(function(blob){
					saveAs(blob, fileName);
				});
			}
		});
        	this.map.renderSync();
	}
	 
	/**
	 * OpenFairViewer.prototype.setLegendGraphic Set legend graphic
	 * @param a ol.layer.Layer object
	 * @param breaks an array of break values
	 */	 
	OpenFairViewer.prototype.setLegendGraphic = function(lyr, breaks) {
		var this_ = this;
		var source = lyr.getSource();
		if( source instanceof ol.source.TileWMS | source instanceof ol.source.ImageWMS ){
			var params = source.getParams();
			var request = '';
			var wmsUrl = (source instanceof ol.source.TileWMS? source.getUrls()[0] : source.getUrl());
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

			//case of dynamic maps
		 	if(breaks && this.options.map.styling.dynamic){
				var canvas = document.createElement('canvas');
				document.body.appendChild(canvas);
				var canvasHeight = breaks? (breaks.length-1) * 20 : 100;
				canvas.height = String(canvasHeight);
				canvas.width = '200';
				var ctx = canvas.getContext('2d');
				var palette = new Image();
				palette.crossOrigin = "anonymous";
				palette.src = request;
				palette.onload = function() {
				    //draw color palette
   				    ctx.drawImage(palette, 0, 0, 32, canvasHeight);
				    //draw break legends
				    ctx.font = "9pt Arial";
				    var breakPt = 14;
				    var breakSpace = 6;
				    var dx = 36;
				    var dy = breakPt;
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
							dy = breakPt*(i+1) + breakSpace*i;
						} 
						lyr.legendGraphic = canvas.toDataURL("image/png");
				    }
				};	
			}else{
				lyr.legendGraphic = request;
			}
		}
	}
       
    
	/**
	 * OpenFairViewer.prototype.getLayerByProperty Util method to get layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
	OpenFairViewer.prototype.getLayerByProperty = function(layerProperty, by){
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
       
	/**
	 * OpenFairViewer.prototype.initDataViewer
	 */
	OpenFairViewer.prototype.initDataViewer = function(){
		var this_ = this;
		this_.map = this_.initMap('map', true, false);
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

	/**
	 * OpenFairViewer.prototype.setEmbedLink
	 */
	OpenFairViewer.prototype.setEmbedLink = function(){
		if ( ! ( document.getElementById ) ) return void(0);
		var url = location.href.replace(/#.*$/,'').replace(/\?.*$/,'');
		
		//dataset on query
		url += '?';
		if(this.dataset_on_query) url += 'dataset=' + this.dataset_on_query.pid;
		
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
	//URL resolvers
	//===========================================================================================

	/**
	 * OpenFairViewer.prototype.resolveDatasetForQuery
	 * @param datasetDef
	 */
	OpenFairViewer.prototype.resolveDatasetForQuery = function(datasetDef){
		var this_ = this;
		console.log("Fetching query interface for pid = '"+datasetDef.pid+"'");
		this_.openQueryDialog();
		this_.handleQueryForm(datasetDef).then(function(){					

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
								return item;
							});
							if(component.type == "list"){
								$("#dsd-ui-dimension-attribute-"+key).val(values).trigger('change');
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
						break;
					
					case "ogc_dimensions":
						console.log("Resolve query for dataset '"+datasetDef.pid+"' using 'ogc_dimensions' strategy");
						console.warn("Dataset query resolving not implemented for strategy 'ogc_dimensions'");
						//TODO
						break;
					case "ogc_viewparams":
						console.log("Resolve query for dataset '"+datasetDef.pid+"' using 'ogc_viewparams' strategy");
						var queryparams = datasetDef.queryparams;
						if(queryparams){
							//var timeparams = new Array();
							for(var i=0;i<queryparams.length;i++){
								var queryparam = queryparams[i];
								var key = Object.keys(queryparam)[0];
								var component = queryparam[key];
								if(component.type == "list"){
									$("#dsd-ui-dimension-attribute-"+key).val(values).trigger('change');
								}else if(component.type=="timeinstant"){
									$("#dsd-ui-dimension-time-start-"+key).val(component.content[0]).trigger('change');
								}
								/*if(!key.match("time")){
									var values = value.split("+");
									$("#dsd-ui-dimension-attribute-"+key).val(values).trigger('change');
								}
								else{
									timeparams.push({key: key, value: value});
								}*/
							}
							//time params
							/*if(timeparams.length==2){
								if(this_.timeWidget == "slider"){
									$("#dsd-ui-time").slider('values', [parseInt(timeparams[0].value.substring(0,4)), parseInt(timeparams[1].value.substring(0,4))]);
									$("#dsd-ui-time-range").val($("#dsd-ui-time").slider( "values", 0 ) + " - " +  $("#dsd-ui-time").slider( "values", 1 ));
								}else if(this_.timeWidget == "datepicker"){
									$("#dsd-ui-time_start").datepicker('setDate', timeparams[0].value);
									$("#dsd-ui-time_end").datepicker('setDate', timeparams[1].value);
								}
							}*/
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
						break;
				}
			}
		});
	}

	/**
	 * OpenFairViewer.prototype.resolveDatasetForMap
	 * @param dataset
	 */
	OpenFairViewer.prototype.resolveDatasetForMap = function(dataset){
		console.log("Resolving map for pid = '"+dataset.pid+"'");
		console.log(dataset);
		this.mapDataset(dataset, false);		
	}

	/**
	 * OpenFairViewer.prototype.resolveViewer
	 * Resolves the map viewer from URL parameters
	 */
	OpenFairViewer.prototype.resolveViewer = function(){
		var this_ = this;
		
		//url params
		var params = this_.getAllUrlParams();
		console.log(params);
		
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
					this_.resolveDatasetForQuery(datasetDef);		
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
				var encoded_view_settings = encoded_view.split(",").map(function(item){var elems = item.split("="); var out = new Object(); out[elems[0]] = elems[1]; return out});
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
								item = item.substr(1, item.length-2);
								if(item.indexOf('IN(') > 0){
									var elems = item.split(" IN(");
									var attribute = elems[0];
									var values = elems[1].split(")")[0].split(',');
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
								out[attribute] = {type: ( (isNaN(Date.parse(values[0])) || values.length > 1)? 'timeinstant': 'list'), content: values}; //TO TEST
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
				var count = encoded_view_obj.count;
				var style = encoded_view_obj.style;	
				var query = encoded_view_obj.q == "true";
				var breaks = undefined;
				if(envparams){
					breaks = envparams.split(";"); breaks.splice(-1,1); breaks.splice(0,1);
					breaks = breaks.map(function(key){return parseFloat(key.split(":")[1])});
				}
				encoded_datasets.push({
					pid: pid, strategy: strategy, queryparams : queryparams, 
					variable: variable, envfun: envfun, envmaptype: envmaptype, envparams: envparams, count : count, breaks: breaks, style: style, 
					query: query
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
					if(encoded_dataset.query) this_.resolveDatasetForQuery(encoded_dataset);
					
					//resolve map
					this_.resolveDatasetForMap(encoded_dataset);

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
     * OpenFairViewer.prototype.initDialog Init dialog
	 */
	OpenFairViewer.prototype.initDialog = function(id, title, classes, position, liIdx, onopen, onclose){
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
			width: ((id=='queryDialog')? ((this_.options.query.columns * 400)+'px') : undefined),
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
	 * OpenFairViewer.prototype.openDialog Open dialog
	 */
	OpenFairViewer.prototype.openDialog = function(id){
		if(!$("#" + id).dialog("isOpen")){
			$("#" + id).dialog("open");
		}
	}
   
	/**
	 * OpenFairViewer.prototype.closeDialog Close dialog
	 */
	OpenFairViewer.prototype.closeDialog = function(id){
		if($("#" + id).dialog("isOpen")){
			$("#" + id).dialog("close");
		}
	}
	
    /**
     * OpenFairViewer.prototype.openAboutDialog Open 'About' dialog
     */
	OpenFairViewer.prototype.openAboutDialog = function(){
		this.closeBrowseDialog();
		this.closeQueryDialog();
		this.openDialog("aboutDialog");
	}
	
	/**
	 * OpenFairViewer.prototype.closeAboutDialog Close 'About' dialog
	 */
	OpenFairViewer.prototype.closeAboutDialog = function(){
		this.closeDialog("aboutDialog");
	}
   
    /**
	 * OpenFairViewer.prototype.openBrowseDialog Open 'Data' dialog
	 */
	OpenFairViewer.prototype.openBrowseDialog = function(){
		this.closeAboutDialog();
		this.closeQueryDialog();
		this.openDialog("browseDialog");
	}
   
    /**
	* OpenFairViewer.prototype.closeBrowseDialog Close 'Data' dialog
	*/
	OpenFairViewer.prototype.closeBrowseDialog = function(){
		this.closeDialog("browseDialog");
	}
	
	/**
	* OpenFairViewer.prototype.openQueryDialog Open 'Query' dialog
	*/
	OpenFairViewer.prototype.openQueryDialog = function(){
		this.closeAboutDialog();
		this.closeBrowseDialog();
		this.openDialog("queryDialog");
	}
   
   	/**
	* OpenFairViewer.prototype.closeQueryDialog Close 'Query' dialog
	*/
	OpenFairViewer.prototype.closeQueryDialog = function(){
		this.closeDialog("queryDialog");
	}
	
	/**
	* OpenFairViewer.prototype.openInfoDialog Open 'Info' dialog
	*/
	OpenFairViewer.prototype.openInfoDialog = function(){
		this.openDialog("infoDialog");
	}
   
   	/**
	* OpenFairViewer.prototype.closeInfoDialog Close 'Info' dialog
	*/
	OpenFairViewer.prototype.closeInfoDialog = function(){
		this.closeDialog("infoDialog");
	}

	/**
	* OpenFairViewer.prototype.openDataDialog Open 'Data' dialog
	*/
	OpenFairViewer.prototype.openDataDialog = function(){
		this.openDialog("dataDialog");
	}
   
   	/**
	* OpenFairViewer.prototype.closeDataDialog Close 'Data' dialog
	*/
	OpenFairViewer.prototype.closeDataDialog = function(){
		this.closeDialog("dataDialog");
	}

	
  	/**
	*
	*/
	OpenFairViewer.prototype._copyright = function(){
		$("body").append("<footer><a href='https://doi.org/10.5281/zenodo.2249305'>&copy; OpenFairViewer <small>(version "+this.versioning.VERSION+")</small</a></footer>")
	}

}));

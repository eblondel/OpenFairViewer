/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer (20191021)
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

	/**
	 * Function to instantiate an OpenFairViewer
	 */
	OpenFairViewer = function(config, opt_options){
		var this_ = this;
		
		//version
		this.versioning = {VERSION: "1.0.9000", DATE: new Date(2019,10,21)}
		
		if(!config.OGC_CSW_BASEURL){
			alert("OpenFairViewer cannot be instantiated. Missing CSW endpoint")
		}
		this.config = config;
		this.config.OGC_CSW_SCHEMA = "http://www.isotc211.org/2005/gmd";
		this.config.OGC_CSW_MAXRECORDS = 5;
		
		var options = opt_options || {};
		this.options = {};
		
		//CATALOG options
		this.options.catalog = {};
		this.options.catalog.maxitems = null;
		this.options.catalog.filters = [];
		if(options.catalog){
			if(options.catalog.maxitems) this.options.catalog.maxitems = options.catalog.maxitems;
			if(options.catalog.filters) this.options.catalog.filters = options.catalog.filters;
		}
		
		//UI options
		this.options.ui = {};
		//UI browse options
		this.options.ui.browse = {};
		this.options.ui.browse.filterByContentInfo = false;
		this.options.ui.browse.filterByWMS = false;
		this.options.ui.browse.datasetInfoHandler = function(metadata){
			var datasetInfoUrl = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&id=" + metadata.fileIdentifier;
			window.open(datasetInfoUrl, '_blank');
		}
		if(options.ui) if (options.ui.browse) {
			if(options.ui.browse.datasetInfoHandler) this.options.ui.browse.datasetInfoHandler = options.ui.browse.datasetInfoHandler;
			if(options.ui.browse.filterByContentInfo) this.options.ui.browse.filterByContentInfo = options.ui.browse.filterByContentInfo;
			if(options.ui.browse.filterByWMS) this.options.ui.browse.filterByWMS = options.ui.browse.filterByWMS;
		}
		
		//UI query options
		this.options.ui.query = {};
		this.options.ui.query.columns = 1;
		this.options.ui.query.time = 'datePicker';
		if(options.ui){
			if(options.ui.query.columns){
				if([1,2].indexOf(options.ui.query.columns) != -1) this.options.ui.query.columns = options.ui.query.columns;
			}
			if(options.ui.query.time) this.options.ui.query.time = options.ui.query.time;
		}
		
		//MAP options
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
			}),
			new ol.layer.Tile({
				title : "UN Clear Map (Topo)",
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
			var props = feature.getProperties();
			var html = "<ul style='padding:0px 2px;list-style-type:none;'>"
			var propNames = Object.keys(props);
			for(var i=0;i<propNames.length;i++){
				var propName = propNames[i];
				var prop = props[propName];
				if(typeof prop != "undefined" && !(prop instanceof ol.geom.Geometry)){
					html += "<li><b>" + propName + ":</b> " + prop + "</li>";
				}
			}
			html += "</ul>";
			console.log(html);
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
		this.initDataCatalogue();
			
		this.initDataViewer();
	
		//get Datasets from CSW
		this.displayDatasets();
		$("#dataset-form").submit(function() {
			this_.displayDatasets();
			return false;
		});
				
		//init widgets
		this.initDialog("aboutDialog", "Welcome!",{"ui-dialog": "about-dialog", "ui-dialog-title": "dialog-title"}, null, 0, null);
		this.initDialog("browseDialog", "Browse", {"ui-dialog": "browse-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 1, 'search', function(){ });
		this.initDialog("queryDialog", "Query", {"ui-dialog": "query-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 2, 'filter', function(){ });
		this.initDialog("infoDialog", "Dataset information", {"ui-dialog": "info-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 3, 'info-sign', function(){});
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
					if(["characterString", "integer", "real", "decimal", "_boolean"].indexOf(p) != -1){
					  obj = this.lightenMetadata(obj[p]);
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
	 * OpenFairViewer.prototype.initDataCatalogue
	 */
	OpenFairViewer.prototype.initDataCatalogue = function(){
		var cswConfig = [
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
		this.csw = new Ows4js.Csw(this.config.OGC_CSW_BASEURL, cswConfig);
		return this.csw;
	}
        
	/**
	 * OpenFairViewer.prototype.createMetadataEntry
	 * @param value
	 */
	OpenFairViewer.prototype.createMetadataEntry = function(value){
		var this_ = this;
		var md_entry = new Object();
		md_entry.metadata = this_.lightenMetadata(value);

		//delete csw_result.value;
		md_entry.pid = md_entry.metadata.fileIdentifier;
		md_entry.pidinfo = md_entry.pid;
		//title
		md_entry.title = md_entry.metadata.identificationInfo[0].abstractMDIdentification.citation.ciCitation.title;
		md_entry.title_tooltip = md_entry.title;
		//graphic overviews
		var graphicOverviews = md_entry.metadata.identificationInfo[0].abstractMDIdentification.graphicOverview
		if(graphicOverviews) if(graphicOverviews.length > 0) md_entry.graphic_overview = graphicOverviews[0].mdBrowseGraphic.fileName;
		md_entry._abstract = md_entry.metadata.identificationInfo[0].abstractMDIdentification._abstract;
		//extents
		var extents = md_entry.metadata.identificationInfo[0].abstractMDIdentification.extent; 
		if(extents) if(extents[0].exExtent.temporalElement){                          
			var temporalExtent = extents[0].exExtent.temporalElement[0].exTemporalExtent.extent.abstractTimePrimitive;
			if(temporalExtent.beginPosition) md_entry.time_start = temporalExtent.beginPosition.value[0];
			if(temporalExtent.endPosition) md_entry.time_end = temporalExtent.endPosition.value[0];
			if(temporalExtent.timePosition) md_entry.time_position = temporalExtent.timePosition.value; //TODO to see how to deal with that
		}
		//content information
		if(md_entry.metadata.contentInfo) if(md_entry.metadata.contentInfo[0].abstractMDContentInformation.featureCatalogueCitation){
			md_entry.dsd = md_entry.metadata.contentInfo[0].abstractMDContentInformation.featureCatalogueCitation[0].ciCitation.citedResponsibleParty[0].ciResponsibleParty.contactInfo.ciContact.onlineResource.ciOnlineResource.linkage.url;
			md_entry.dsd = md_entry.dsd.replace("catalog.search#/metadata/","xml.metadata.get?uuid=");
			md_entry.dsd = this_.rewriteURL(md_entry.dsd);
		}
		//distribution information
		md_entry.wms = this.getDataProtocolsFromMetadataEntry(md_entry, "WMS");
		md_entry.wfs = this.getDataProtocolsFromMetadataEntry(md_entry, "WFS");
		md_entry.queryable = md_entry.wms.length > 0;
		return md_entry;
	}
	
	/**
	 * OpenFairViewer.prototype.getRecords
	 * @param pageItem
	 */
	OpenFairViewer.prototype.getRecords = function(page, filter){
		var deferred = $.Deferred();
		var this_ = this;
		var last = page * this.config.OGC_CSW_MAXRECORDS;
		var first = last - this.config.OGC_CSW_MAXRECORDS + 1;
		console.log("Get CSW Records for page "+page+" [from index "+first+" to "+last+"] ...");
		this.csw.GetRecords(first, this.config.OGC_CSW_MAXRECORDS, filter, this.config.OGC_CSW_SCHEMA).then(function(result){				 
			var csw_results = result.value.searchResults.any;
			var datasets = new Array();	
			//post-process results
			for(var i=0;i<csw_results.length;i++){
				var csw_result = csw_results[i];    
				var md_entry = this_.createMetadataEntry(csw_result.value);
				var add = this_.options.ui.browse.filterByWMS? md_entry.queryable : true;
				add = add && (this_.options.ui.browse.filterByContentInfo? md_entry.metadata.contentInfo : true);
				if(add) datasets.push(md_entry);
			}                       
			  
			deferred.resolve(datasets);
		});
		return deferred.promise();
	 };
		

	/**
	 * OpenFairViewer.prototype.getDatasetsFromCSW
	 * @param bbox
	 */
	OpenFairViewer.prototype.getDatasetsFromCSW = function(bbox){
		
		$("#dataset-count").empty();
		
		//business logic
		var this_ = this;
		var deferred = $.Deferred();
		if(!this.csw) deferred.reject("CSW endpoint is not instantiated!");
		if(this.csw){
			
			//base filter
			var filter;
			for(var i=0;i<this.options.catalog.filters.length;i++){
				var inputFilter = this.options.catalog.filters[i];
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
			
			//get 1st record to get numberOfRecordsMatched
			this.csw.GetRecords(1,1, filter, this.config.OGC_CSW_SCHEMA).then(function(response){
				var numberOfRecordsMatched = response.value.searchResults.numberOfRecordsMatched;
				console.log("CSW GetRecords matched "+numberOfRecordsMatched+" records");
				var maxNb = numberOfRecordsMatched;
				if(this_.options.catalog.maxitems && numberOfRecordsMatched > this_.options.catalog.maxitems){
					console.log("Max items option set. Restraining number of records retrieved to "+this_.options.catalog.maxitems+" records");
					maxNb = this_.options.catalog.maxitems;
				}

				//add datasets counting
				$("#dataset-count").html(maxNb + " datasets");
				//Set paginated browsing operated by OGC CSW protocol
				$("#dataset-pages").bootpag({
					page: 1,
					total: Math.ceil(maxNb / this_.config.OGC_CSW_MAXRECORDS),
					maxVisible: 5,
					leaps: true,
					firstLastUse: true,
					first: '←',
					last: '→',
				}).on("page", function(event, num){
					
					$("#dataset-loader").show();
					
					//display based on templates
					var template = $('#datasetTpl').html();
					var dataContainer = $("#dataset-articles");
					if(dataContainer.find("section").length >0) $(dataContainer.find("section")[0]).remove();
					
					//get CSW records for page
					this_.getRecords(num, filter).then(function(records){
						
						if(dataContainer.find("section").length >0) $(dataContainer.find("section")[0]).remove();
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
						dataContainer.append(dataHtml);
						
					});
				
				}).trigger("page", 1);
			});
		}
		return deferred.promise();
	},
        
        
	/**
	 * OpenFairViewer.prototype.displayDatasets
	 *
	 */
	OpenFairViewer.prototype.displayDatasets = function(bbox){
		var this_ = this;
		if($("#dataset-search-bbox-on-search").prop("checked") && !bbox){
			bbox = this.map.getView().calculateExtent(this.map.getSize());
		}
		this.getDatasetsFromCSW(bbox);
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
				$this.show();
			};
			im.onerror = function(){
				var theImage = $this;
				$this.hide();
				$this.css("background", "url('js/OpenFairViewer/img/loading-error.svg')");
				$this.show();
			}
			$this.css("background", "url('js/OpenFairViewer/img/loading.gif')");
			im.src = $this.data("mainsrc");
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
		this.options.ui.browse.datasetInfoHandler(dataset.metadata);
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

		//artisanal parsing of feature catalog XML
		//TODO keep investigating ogc-schemas extension for gfc.xsd with jsonix!!!!
		var dsd = new Array();
		//get feature types
		var featureTypes = $(response.childNodes[0].childNodes).filter(function(idx,item){if(item.nodeName == "gfc:featureType") return item;});
	
		var ft = featureTypes[1];
		//get carrier of characteristics
		var characteristics = $(ft.childNodes[1].childNodes).filter(function(idx,item){ if(item.nodeName == "gfc:carrierOfCharacteristics") return item;});
		for(var i=0;i<characteristics.length;i++){
			var characteristic = characteristics[i];
			var featureAttribute = characteristic.childNodes[1];
			var featureAttributePrim = $(featureTypes[0].childNodes[1].childNodes).filter(function(idx,item){ if(item.nodeName == "gfc:carrierOfCharacteristics") return item;})[i].childNodes[1];
			//featureAttributeModel
			var featureAttributeModel = {
				name : $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:memberName") return item;})[0].childNodes[1].textContent,
				definition : $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:definition") return item;})[0].childNodes[1].textContent,
				primitiveCode: $(featureAttributePrim.childNodes).filter(function(i,item){if(item.nodeName == "gfc:code") return item;})[0].childNodes[1].textContent,
				primitiveType: $(featureAttributePrim.childNodes).filter(function(i,item){if(item.nodeName == "gfc:valueType") return item;})[0].childNodes[1].childNodes[1].childNodes[1].textContent,
				serviceCode: $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:code") return item;})[0].childNodes[1].textContent,
				serviceType: $(featureAttribute.childNodes).filter(function(i,item){if(item.nodeName == "gfc:valueType") return item;})[0].childNodes[1].childNodes[1].childNodes[1].textContent,
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
					if(props[5]) clDefinition = props[5].childNodes[1].textContent;
					var clItem = {id: clCode, text: clLabel, alternateText: (clDefinition? clDefinition : null), codelist: featureAttributeModel.primitiveCode};
					featureAttributeModel.values.push(clItem);
				}
			}
			
			dsd.push(featureAttributeModel);
		}
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
		var button_csv_aggregated = '<button id="dsd-ui-button-csv1" type="button" class="btn data-action-button data-csv-agg" title="Download aggregated data (CSV)" onclick="app.downloadDatasetCSV(true)"></button>';
		$("#dsd-ui-buttons").append(button_csv_aggregated);
		var button_csv_raw = '<button type="button" id="dsd-ui-button-csv2" class="btn data-action-button data-csv-raw" title="Download raw data (CSV)" onclick="app.downloadDatasetCSV(false)"></button>';
		$("#dsd-ui-buttons").append(button_csv_raw);
		var button_png_map = '<button type="button" id="dsd-ui-button-png" class="btn data-action-button data-png-map" title="Download map (PNG)" onclick="app.downloadMapPNG()"></button>';
		$("#dsd-ui-buttons").append(button_png_map);
				
		var layerName = this_.dataset_on_query.pid;
		var layer = this_.getLayerByProperty(this_.dataset_on_query.pid, 'id');
		if(layer){
			$('#dsd-ui-button-csv1').prop('disabled', false);
			$('#dsd-ui-button-csv2').prop('disabled', false);
			$('#dsd-ui-button-png').prop('disabled', false);
		}else{
			$('#dsd-ui-button-csv1').prop('disabled', true);
			$('#dsd-ui-button-csv2').prop('disabled', true);
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
				data: [{id: '4', text: '4'}, {id: '5', text: '5'}],
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
		var bootstrapClass = "col-md-" + 12/this_.options.ui.query.columns;

		$("#dsd-ui").append('<div id="dsd-ui-row" class="row"></div>');
		$("#dsd-ui-row").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');

		//id
		var ogcfilter_component_id = "ui-ogc_filter";
		//html
		$("#dsd-ui-col-1").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Filter</label></p></div>');
		$("#dsd-ui-col-1").append('<input type="text" id = "'+ogcfilter_component_id+'" class="dsd-ui-dimension" title="Filter data with CQL"></select>');
		
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
				this_.dataset_on_query = { pid: pid, entry: entry, strategy: "ogc_viewparams", dsd: this_.parseFeatureCatalogue(response), query: null };
				
				//build UI
				var bootstrapClass = "col-md-" + 12/this_.options.ui.query.columns;
				
				//1. Build codelist (multi-selection) UIs
				//-------------------------------------------
				
				var codelistMatcher = function(params, data){
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
				$("#dsd-ui-row").append('<div id="dsd-ui-col-1" class="'+bootstrapClass+'"></div>');
				$("#dsd-ui-col-1").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Fishery dimensions</label></p></div>');
				for(var i=0;i<this_.dataset_on_query.dsd.length;i++){
					var dsd_component = this_.dataset_on_query.dsd[i];
					if(dsd_component.serviceType == "Dimension"){
						if(dsd_component.values){
							//id
							var dsd_component_id = "dsd-ui-dimension-" + dsd_component.serviceCode;
							
							//html
							$("#dsd-ui-col-1").append('<select id = "'+dsd_component_id+'" multiple="multiple" class="dsd-ui-dimension dsd-ui-dimension-codelist" title="Filter on '+dsd_component.name+'"></select>');
							
							//jquery widget
							var formatItem = function(item) {
							  if (!item.id) { return item.text; }
							  if(["flag", "flagstate", "country"].indexOf(item.codelist.toLowerCase()) > -1){
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
								templateResult: formatItem,
								templateSelection: formatItem,
								matcher: codelistMatcher
							});
							
						}
					}
				}
				
				//for time dimension
				//year extent extracted from metadata, information always available
				var year_start = parseInt(this_.dataset_on_query.entry.time_start.substring(0,4));
				var year_end = parseInt(this_.dataset_on_query.entry.time_end.substring(0,4));
				
				$("#dsd-ui-row").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
				
				//2. Time start/end slider or datepickers
				//-----------------------------------------
				this_.timeWidget = this_.options.ui.time? this_.options.ui.time : 'slider';
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
				}
				
				//3. Other time dimensions
				//-------------------------
				var extra_time_dimensions = ['year', 'semester', 'quarter', 'month'];
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
				}
				
				//4. Aggregation method
				//------------------------------
				
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
				});

				//MAP OPTIONS
				$("#dsd-ui-col-2").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Map options</label></p></div>');
				
				//5. Map type
				this_.handleQueryMapOptions(2);
				
				//query form buttons
				this_.handleQueryFormButtons(2);

				deferred.resolve();
			}
		});
	
		return deferred.promise();

	}
	
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
				var filter = $("#ui-ogc_filter").val();
				if(filter) data_query.push({CQL_FILTER : filter});
				break;

		    case "ogc_dimensions":
				//Get params according to 'dimensions' strategy
				//TODO strategy params
				break;
		
		    case "ogc_viewparams":
				//Get params according to 'viewparams' strategy
				//grab codelist values (including extra time codelists)
				$.each($(".dsd-ui-dimension-codelist"), function(i,item){ 
					var values = $("#"+item.id).val();
					if(values) if(values.length > 0){
						var data_component_query = new Object();
						data_component_query[item.id.split('dsd-ui-dimension-')[1]] = values.join('+');
						data_query.push(data_component_query);
					}
				})
			
				//grab time dimension (time_start/time_end)
				var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
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
				data_query.push(data_component_query_method);
				break;

		}

		//Stringify
		if(tostring){		
			data_query = data_query.map(function(item){return Object.keys(item) + ':' + item[Object.keys(item)]}).join(';');		
		}

		return data_query;
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
			if($("#dataset-search-bbox-on-search").prop("checked") && $("#dataset-search-bbox-on-mapmove").prop("checked")){
				var bbox = evt.map.getView().calculateExtent(evt.map.getSize());
				this_.displayDatasets(bbox); 
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
	 * @param layer
	 * @param cql_filter
	 * @param style
	 * @param viewparams
	 * @param envfun
	 * @param envparams
	 * @param count
	 */
	OpenFairViewer.prototype.addLayer = function(mainOverlayGroup, id, title, wmsUrl, layer, hidden, visible, showLegend, opacity, tiled,
											cql_filter, style, viewparams, envfun, envparams, count){
		var this_ = this;
		var layerParams = {
				'LAYERS' : layer,
				'VERSION': '1.1.1',
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
			url: layer.getSource().getGetFeatureInfoUrl(coords, viewResolution, viewProjection, {'INFO_FORMAT': "application/vnd.ogc.gml"}),
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				console.log(response);
				var gml = new ol.format.GML();
				var features = gml.readFeatures(response);
				if(features.length > 0){
					var feature = features[0];
					popup.show(coords, this_.options.map.tooltip.handler(layer, feature));
					this_.popup = {id: layer.id, coords: coords};
				}else{
					popup.hide();
					this_.popup = {};				
				}
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
			if(!item.ciOnlineResource.linkage.url) return;
			var protocolFilter = item.ciOnlineResource.linkage.url.indexOf(protocol)!=-1 | item.ciOnlineResource.linkage.url.indexOf(protocol.toLowerCase())!=-1;
			var layerFilter = layerSuffix? item.ciOnlineResource.name.endsWith(layerSuffix) : true;
			var filter = protocolFilter && layerFilter;
			if(filter) return item;
		   }
		);
		//if(onLines.length == 0) console.warn("No Dataset URL from metadata entry");
		if(onLines.length > 0){
			for(var i=0;i<onLines.length;i++){
				layerUrl = onLines[i].ciOnlineResource.linkage.url;
				layerName = onLines[i].ciOnlineResource.name;
				if(layerSuffix) layerName = layerName + layerSuffix;
				out.push({url : layerUrl, name: layerName});
			}
		}
		return out;
	};
	

	/**
	 * OpenFairViewer.prototype.getDatasetFeatures
	 * @param layerUrl
	 * @param layerName
	 * @param viewparams
	 * @param cql_filter
	 * @param propertyNames
	 * @returns a Jquery promise
	 */
	OpenFairViewer.prototype.getDatasetFeatures = function(layerUrl, layerName, viewparams, cql_filter, propertyNames){
	    var wfsRequest = this.getDatasetWFSLink(layerUrl, layerName, viewparams, cql_filter, propertyNames, "json");
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
	 */
	OpenFairViewer.prototype.buildEnvParams = function(breaks){
	    var envparams = "";
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
				layerTitle += strategyparams[0].CQL_FILTER;
			}else{
				for(var i=0;i<strategyparams.length;i++){
					var strategyparam = strategyparams[i];
					var key = Object.keys(strategyparam)[0];
					layerTitle += '&#8226; ' + key + ': '+ strategyparam[key] + '</br>';
				}
			}
			layerTitle += '</p>';
		}
		return layerTitle;
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
		if(dataset.entry.wfs.length > 0){
			var baseWFS = dataset.entry.wfs.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>-1});
			if(baseWFS.length>0){ baseWFS = baseWFS[0] } else { baseWFS = dataset.entry.wfs[0] };
			baseWfsUrl = baseWFS.url;
		}
		if(dataset.entry.wms.length > 0){
			var baseWMS = dataset.entry.wms.filter(function(item){return item.name.indexOf(this_.options.map.aggregated_layer_suffix)>-1});
			if(baseWMS.length>0){ baseWMS = baseWMS[0] } else { baseWMS = dataset.entry.wms[0] };
			baseWmsUrl = baseWMS.url;
			layerName = baseWMS.name;
		}
		
	    var layer = this_.getLayerByProperty(dataset.entry.pid, 'id');
		var strategyparams = from_query_form? this_.getStrategyParams(dataset, false) : dataset.viewparams;
		var strategyparams_str = strategyparams? strategyparams.map(function(item){return Object.keys(item) + ':' + item[Object.keys(item)]}).join(';') : null;
	    var layerTitle = this_.getDatasetViewTitle(dataset, strategyparams);
		
		//dynamic styling properties
		var mapType =  from_query_form? $("#map-type-selector").select2('val') : dataset.envmaptype;
		var classType = from_query_form? $("#map-classtype-selector").select2('val') : dataset.envfun;
		
		var classNb = from_query_form? $("#map-classnb-selector").select2('val') : (dataset.envparams? dataset.envparams.split(";").filter(function(item){if(item!="") return item}).length-1 : null);
		var layerStyle =  "dyn_poly_" + mapType + "_class_" + classNb;

		if(!layer){
			console.log("Adding new layer");
		    //ADD LAYER
		    switch(dataset.strategy){
			 case "ogc_filters":
				var cql_filter = null;
				if(strategyparams) if(strategyparams.length >0) cql_filter = strategyparams[0].CQL_FILTER;
				console.log(cql_filter);
				this_.selectDataset(pid);
				var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, layerName, false, true, true, 0.9, false, cql_filter, null, null, null, null, null);
				layer.strategy = dataset.strategy;
				layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
				this_.addLayerTooltip(layer);
				$("#datasetMapper").bootstrapBtn('reset');
				$("#datasetMapper").prop('disabled', false);
				//actions o download buttons
				$('#dsd-ui-button-csv1').prop('disabled', false);
				$('#dsd-ui-button-csv2').prop('disabled', false);
				$('#dsd-ui-button-png').prop('disabled', false);
				break;
				
			 case "ogc_dimensions":
				//TODO
				break;
				
			 case "ogc_viewparams":
			    if(this_.options.map.styling.dynamic){
					//dynamic styling
					this_.getDatasetFeatures(baseWfsUrl, layerName, strategyparams_str, null, ["value"]).then(function(features){
						console.log("Data series features");
						console.log(features);
						console.log("Data series values");
						var values = this_.getDatasetValues(features, "value");
						console.log(values);
						if(values.length > 0){
							if(values.length < classNb){
								classNb = values.length;
								layerStyle = "dyn_poly_"+mapType+"_class_" + classNb;
							}
							var breaks = this_.calculateBreaks(values, classType, classNb);
							if(breaks.length == 1) breaks = [0, breaks[0]];
							if(breaks.length == 2) breaks[0] = 0;
							console.log(breaks);
							var envparams = this_.buildEnvParams(breaks);
							this_.selectDataset(pid);
							var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, layerName, false, true, true, 0.9, false, null, layerStyle, strategyparams_str, classType, envparams, values.length);
							layer.strategy = dataset.strategy;
							layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
							layer.envfun = classType;
							layer.envmaptype = mapType;
							layer.count = values.length;
							this_.addLayerTooltip(layer);
							this_.setLegendGraphic(layer, breaks);	
							this_.map.changed();
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
								
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', false);
							$('#dsd-ui-button-csv2').prop('disabled', false);
							$('#dsd-ui-button-png').prop('disabled', false);
						}else{
							console.log("Actions on no data");
							$("#datasetMapper").bootstrapBtn('reset');
							$("#datasetMapper").prop('disabled', false);
							$(".query-nodata").show();
							//actions o download buttons
							$('#dsd-ui-button-csv1').prop('disabled', true);
							$('#dsd-ui-button-csv2').prop('disabled', true);
							$('#dsd-ui-button-png').prop('disabled', true);
						}
					});
			    }else{
					//static styling
					this_.selectDataset(pid);
					var layer = this_.addLayer(this_.options.map.mainlayergroup, pid, layerTitle, baseWmsUrl, layerName, false, true, true, 0.9, false, null, null,strategyparams_str);
					layer.strategy = dataset.strategy;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					this_.map.changed();
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
			    }
			    break;
			}    
		}else{ 
			console.log("Updating existing layer");
		    //UPDATE LAYER
		    switch(dataset.strategy){
			case "ogc_filters":
			    //update 
				var cql_filter = null;
				if(strategyparams.length >0) cql_filter = strategyparams[0].CQL_FILTER;
				layer.strategy = dataset.strategy;
				layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
				layer.setProperties({title: layerTitle});
				layer.getSource().updateParams({'CQL_FILTER': cql_filter});
				this_.map.changed();
				$("#datasetMapper").bootstrapBtn('reset');
				$("#datasetMapper").prop('disabled', false);
				//actions o download buttons
				$('#dsd-ui-button-csv1').prop('disabled', false);
				$('#dsd-ui-button-csv2').prop('disabled', false);
				$('#dsd-ui-button-png').prop('disabled', false);
			    break;
			case "ogc_dimensions":
			    //TODO
			    break;
			case "ogc_viewparams":
			    if(this_.options.map.styling.dynamic){
				//dynamic styling
				this_.getDatasetFeatures(baseWfsUrl, layerName, strategyparams_str, null, ["value"]).then(function(features){
					console.log("Data series features");
					console.log(features);
					console.log("Data series values");
					var values = this_.getDatasetValues(features, "value");
					console.log(values);
					if(values.length > 0){
						if(values.length < classNb){
							classNb = values.length;
							layerStyle = "dyn_poly_" + mapType + "_class_" + classNb;
						}
						//update breaks
						var breaks = this_.calculateBreaks(values, classType, classNb);
						if(breaks.length == 1) breaks = [0, breaks[0]];
						if(breaks.length == 2) breaks[0] = 0;
						console.log(breaks);
						var envparams = this_.buildEnvParams(breaks);

						//update viewparams, envparams & legend
						layer.strategy = dataset.strategy;
						layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
						layer.setProperties({title: layerTitle});
						layer.getSource().updateParams({'VIEWPARAMS' : strategyparams_str});
						layer.getSource().updateParams({'STYLES' : layerStyle});
						layer.getSource().updateParams({'env' : envparams});
						layer.envfun = classType;
						layer.envmaptype = mapType;
						layer.count = values.length;
						this_.setLegendGraphic(layer, breaks);
						this_.map.changed();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
					}else{
						this_.removeLayerByProperty(pid, "id");
						this_.map.changed();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						$(".query-nodata").show();
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', true);
						$('#dsd-ui-button-csv2').prop('disabled', true);
						$('#dsd-ui-button-png').prop('disabled', true);
					}
				});
			    }else{
					//static styling
					layer.setProperties({title: layerTitle});
					layer.getSource().updateParams({'VIEWPARAMS' : strategyparams_str});
					layer.strategy = dataset.strategy;
					layer.baseDataUrl = baseWfsUrl? baseWfsUrl.replace(this_.options.map.aggregated_layer_suffix, "") : null;
					this_.map.changed();
					//actions o download buttons
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					$('#dsd-ui-button-png').prop('disabled', false);
			    }
			    break;
			}
		}
	}

	/**
	 * OpenFairViewer.prototype.getDatasetWFSLink
	 * @param layerUrl
	 * @param layerName
	 * @param strategyparams_str
	 * @param cql_filter a cql filter to filter out the dataset
	 * @param propertyNames
   	 * @param format optional format to be specified, by default it will provide a CSV
	 * @return the WFS layer URL
	 */
	OpenFairViewer.prototype.getDatasetWFSLink = function(layerUrl, layerName, strategyparams_str, cql_filter, propertyNames, format){		
		if(layerUrl.indexOf("ows?service=WFS")>-1) layerUrl = layerUrl.split("ows?service=WFS")[0] + "ows?service=WFS";
		if(layerUrl.indexOf("wfs?")>-1) layerUrl = layerUrl.split("wfs?")[0] + "ows?service=WFS";
		layerUrl += "&version=1.0.0";
		layerUrl += "&request=GetFeature";
		layerUrl += "&typeName=" + layerName;
	    if(strategyparams_str) layerUrl += "&VIEWPARAMS=" + strategyparams_str;
	    if(cql_filter) layerUrl += "&CQL_FILTER=" + encodeURI(cql_filter);
	    if(propertyNames) layerUrl += "&propertyName=" + propertyNames.join(",");
	    if(format) layerUrl += "&outputFormat=" + format;
 	    return layerUrl;	
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
		var this_ = this;
		var layerName = this.dataset_on_query.pid;
		var baseWFS = this_.getDataProtocolsFromMetadataEntry(this_.dataset_on_query.entry, "WFS", layerName)[0];
		var baseLayerUrl = baseWFS.url;
		var layerUrl = this.getDatasetWFSLink(baseLayerUrl, layerName, this.getStrategyParams(this.dataset_on_query, true), null, null, 'json');
		$.getJSON(layerUrl, function(response){
			var features = new ol.format.GeoJSON().readFeatures(response);
			var featuresToExport = new Array();
			for(var i=0;i<features.length;i++){
				var feature = features[i];
				var props = feature.getProperties();
				geomwkt = props.geometry? new ol.format.WKT().writeGeometry(props.geometry) : "";
				delete props.geometry;
				delete props.bbox;
				props.geometry = geomwkt;
				featuresToExport.push(props);
			}
			var csv = this_.json2csv(featuresToExport);
			var fileName = this_.dataset_on_query.pid;
			if(aggregated) fileName += this_.options.map.aggregated_layer_suffix;
			fileName += "_"+ this_.getDateTimeString(new Date()) + ".csv";
			this_.downloadCSV(csv, fileName); 
		});
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
		 	if(source.getParams().VIEWPARAMS && this.options.map.styling.dynamic){
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
						if(breaks.length<5) breakSpace = 12;
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
			var condition  = by? (layer.get(by) === layerProperty) : (layer.getSource().getParams()["LAYERS"] === layerProperty);
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
				this_.addLayer(
					layerDef.group, layerDef.id, layerDef.title, layerDef.wmsUrl, layerDef.layer, layerDef.hidden,
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
		if(this.dataset_on_query) url += '?dataset=' + this.dataset_on_query.pid;
		
		//views
		var encoded_views = new Array();
		var viewlayers = this.layers.overlays[this.options.map.mainlayergroup].getLayers().getArray();
		for(var i=0;i<viewlayers.length;i++){
			var encoded_view = "";
			var viewlayer = viewlayers[i];
			var params = viewlayer.getSource().getParams();
			var pid = viewlayer.id;
			var strategy = viewlayer.strategy;
			encoded_view += 'pid=' + pid + ',';
			encoded_view += 'strategy=' + strategy + ',';
			
			switch(strategy){
				case "ogc_filters":
					break;
				case "ogc_dimensions":
					//TODO
					break;
				case "ogc_viewparams":
					encoded_view += 'par=' + params['VIEWPARAMS'] + ',';
					//map options
					encoded_view += 'fun=' + viewlayer.envfun + ',';
					encoded_view += 'maptype=' + viewlayer.envmaptype + ',';
					encoded_view += 'env=' + params['env'] + ',';
					encoded_view += 'count=' + viewlayer.count + ',';
					encoded_view += 'sld=' + params['STYLES'] + ',';
					break;
			}	
			
			encoded_view += 'q=' + ((this.dataset_on_query.pid == pid)? true : false);
			encoded_views.push(encoded_view);
		}
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
				//view params
				var viewparams = datasetDef.viewparams;
				if(viewparams){
					var timeparams = new Array();
					for(var i=0;i<viewparams.length;i++){
						var viewparam = viewparams[i];
						var key = Object.keys(viewparam)[0];
						var value = viewparam[key];
						if(!key.match("time")){
							var values = value.split("+");
							$("#dsd-ui-dimension-"+key).val(values).trigger('change');
						}else{
							timeparams.push({key: key, value: value});
						}
					}
					//time params
					if(timeparams.length==2){
						if(this_.timeWidget == "slider"){
							$("#dsd-ui-time").slider('values', [parseInt(timeparams[0].value.substring(0,4)), parseInt(timeparams[1].value.substring(0,4))]);
							$("#dsd-ui-time-range").val($("#dsd-ui-time").slider( "values", 0 ) + " - " +  $("#dsd-ui-time").slider( "values", 1 ));
						}else if(this_.timeWidget == "datepicker"){
							$("#dsd-ui-time_start").datepicker('setDate', timeparams[0].value);
							$("#dsd-ui-time_end").datepicker('setDate', timeparams[1].value);
						}
					}
				}
				
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
		
		//dynamic parameters
		//embedded link feature 'dataset' decoding
		if(params.dataset && !params.views){
			var datasetDef = {pid: params.dataset};
			this_.getCSWRecord(datasetDef.pid).then(function(md_entry){
				if(this_.selection.map(function(i){return i.pid}).indexOf(pid) == -1){
					console.log("we should add the dataset to the selection here");
					datasetDef.entry = md_entry;
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
					encoded_view_obj[setting_key] = setting[setting_key];
				}
				var pid = encoded_view_obj.pid;
				var strategy = encoded_view_obj.strategy;
				var viewparams = encoded_view_obj.par;
				if(viewparams) viewparams = viewparams.split(";").map(function(item){var elems = item.split(":"); var out = new Object(); out[elems[0]] = elems[1]; return out});
				var envfun = encoded_view_obj.fun;
				var envmaptype = encoded_view_obj.maptype;
				var envparams = encoded_view_obj.env;
				var count = encoded_view_obj.count;
				var style = encoded_view_obj.style;	
				var query = encoded_view_obj.q == "true";
				var breaks = undefined;
				if(envparams){
					breaks = envparams.split(";"); breaks.splice(-1,1);
					breaks = breaks.map(function(key){return parseFloat(key.split(":")[1])});
				}
				encoded_datasets.push({
					pid: pid, strategy: strategy, viewparams: viewparams, 
					envfun: envfun, envmaptype: envmaptype, envparams: envparams, count : count, breaks: breaks, style: style, 
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
					encoded_dataset.title = this_.getDatasetViewTitle(encoded_dataset, encoded_dataset.viewparams);
					encoded_dataset.dsd = encoded_dataset.entry.dsd;
					console.log(encoded_dataset);
					this_.selection.push(encoded_dataset);	
					
					//resolve map
					this_.resolveDatasetForMap(encoded_dataset);
					
					//if it was the last dataset queried by user we fill the query interface with param values
					if(encoded_dataset.query) this_.resolveDatasetForQuery(encoded_dataset);
					

					//popup coords
					if(params.popup_id) if(params.popup_id == encoded_dataset.pid) {
						if(params.popup_coords){
							var layer = this_.getLayerByProperty(encoded_dataset.pid, "id");
							var coords = params.popup_coords.split(",");
							this_.getFeatureInfo(layer, coords);
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
	OpenFairViewer.prototype.initDialog = function(id, title, classes, position, liIdx, iconName, onopen, onclose){
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
			width: ((id=='queryDialog')? ((this_.options.ui.query.columns * 400)+'px') : undefined),
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
				if(iconName){
					$.each($(".ui-dialog-title").find("span"), function(idx,item){$(item).remove()});
					$(".ui-dialog-title").append("<span class='glyphicon glyphicon-"+iconName+"' style='float:left;'></span>");
				}
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
	*
	*/
	OpenFairViewer.prototype._copyright = function(){
		$("body").append("<footer><a href='https://doi.org/10.5281/zenodo.2249305'>&copy; OpenFairViewer <small>(version "+this.versioning.VERSION+")</small</a></footer>")
	}

}));

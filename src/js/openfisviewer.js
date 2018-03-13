/**
 * openfisviewer - Data query & visualization of geo-referenced data series
 * Copyright (c) 2017 Emmanuel Blondel
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

	/**
	 * Function to instantiate an openfis-view
	 */
	OpenFisViewer = function(config, opt_options){
		
		if(!config.OGC_CSW_BASEURL){
			alert("FisViewer instance cannot be instantiated. Missing CSW endpoint")
		}
		if(!config.OGC_CSW_SCHEMA){
			alert("FisViewer instance cannot be instantiated. Missing CSW metadata schema")	
		}
		this.config = config;
		
		var options = opt_options || {};
		this.options = {};
		
		//CATALOG options
		this.options.catalog = {};
		this.options.catalog.maxitems = 50;
		this.options.catalog.filters = [];
		if(options.catalog){
			if(options.catalog.maxitems) this.options.catalog.maxitems = options.catalog.maxitems;
			if(options.catalog.filters) this.options.catalog.filters = options.catalog.filters;
		}
		
		//UI options
		this.options.ui = {};
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
		//projection
		this.options.map.projection = options.map.projection? options.map.projetion : 'EPSG:4326';
		//zoom
		this.options.map.zoom = options.map.zoom? options.map.zoom : 2.5;
		//extent
		this.options.map.extent = [-180, -90, 180, 90];
		if(options.map.extent){
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
		if(options.map.layergroups){
			this.options.map.layergroups = options.map.layergroups;
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
	}
	
	//Init
	//==========================================================================================
    /**
	 * OpenFisViewer.prototype.init
	 */
	OpenFisViewer.prototype.init = function(){
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
	
		this.updateSelection();
		this.updateDatasetSelector(true);
                
        //init widgets
        this.initDialog("aboutDialog", "Welcome!",{"ui-dialog": "about-dialog", "ui-dialog-title": "dialog-title"}, null, 0, null);
        this.initDialog("dataDialog", "Browse data catalogue", {"ui-dialog": "data-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 1, 'search', function(){ this_.updateSelection(); });
        this.initDialog("queryDialog", "Query a dataset", {"ui-dialog": "query-dialog", "ui-dialog-title": "dialog-title"}, { my: "left top", at: "left center", of: window }, 2, 'filter', function(){this_.updateDatasetSelector(); });
        this.openAboutDialog();
		
		//resolve viewer from URL
		this.resolveViewer();
	}
        
	//Utils
	//===========================================================================================
	
	/**
	 * OpenFisViewer.prototype.rewriteURL
	 * @param
	 */
	OpenFisViewer.prototype.rewriteURL = function(url){
		if(window.location.origin.startsWith("https")){
			url = url.replace(/^http:\/\//i, 'https://');
		}
		return url;
	}
        
	/**
	 * OpenFisViewer.prototype.ligthenMetadata
	 * Ligthens a metadata parsed with ogc-schemas library
	 * @param inObj
	 */
	OpenFisViewer.prototype.lightenMetadata = function(inObj) {
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
	 * OpenFisViewer.prototype.getAllUrlParams util function to get URL param valus
	 * Here the primary use is to be able to grab a security token that would be
	 * passed from within a i-Marine VRE portlet
	 * @param url
	 * @returns an object with all parameter values
	 */
	OpenFisViewer.prototype.getAllUrlParams = function(url) {
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
	 * OpenFisViewer.prototype.initDataCatalogue
	 */
	OpenFisViewer.prototype.initDataCatalogue = function(){
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
	 * OpenFisViewer.prototype.createMetadataEntry
	 * @param value
	 */
	OpenFisViewer.prototype.createMetadataEntry = function(value){
		var this_ = this;
		var md_entry = new Object();
		md_entry.metadata = this_.lightenMetadata(value);

		//delete csw_result.value;
		md_entry.pid = md_entry.metadata.fileIdentifier;
		md_entry.title = md_entry.metadata.identificationInfo[0].abstractMDIdentification.citation.ciCitation.title;
		md_entry.title_tooltip = md_entry.title;
		md_entry.graphic_overview = md_entry.metadata.identificationInfo[0].abstractMDIdentification.graphicOverview[0].mdBrowseGraphic.fileName;
		md_entry._abstract = md_entry.metadata.identificationInfo[0].abstractMDIdentification._abstract;
		var extents = md_entry.metadata.identificationInfo[0].abstractMDIdentification.extent; 
		if(extents[0].exExtent.temporalElement){                          
			var temporalExtent = extents[0].exExtent.temporalElement[0].exTemporalExtent.extent.abstractTimePrimitive;
			md_entry.time_start = temporalExtent.beginPosition.value[0];
			md_entry.time_end = temporalExtent.endPosition.value[0];
		}
		
		if(md_entry.metadata.contentInfo){
			md_entry.dsd = md_entry.metadata.contentInfo[0].abstractMDContentInformation.featureCatalogueCitation[0].ciCitation.citedResponsibleParty[0].ciResponsibleParty.contactInfo.ciContact.onlineResource.ciOnlineResource.linkage.url;
			md_entry.dsd = md_entry.dsd.replace("catalog.search#/metadata/","xml.metadata.get?uuid=");
			md_entry.dsd = this_.rewriteURL(md_entry.dsd);
		}
		return md_entry;
	}
		
	/**
	 * OpenFisViewer.prototype.getDatasetsFromCSW
	 * @param maxNb maximum number of records
	 * @param bbox
	 */
	OpenFisViewer.prototype.getDatasetsFromCSW = function(maxNb, bbox){
		
		var this_ = this;
		var deferred = $.Deferred();
		if(!this.csw) deferred.reject("CSW endpoint is not instantiated!");
		if(this.csw){
			
			//nb of records
			if(!maxNb) maxNb = this_.options.catalog.maxitems;
			
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
				console.log(bbox);
				filter = filter.and(new Ows4js.Filter().BBOX(bbox[1], bbox[0], bbox[3], bbox[2], 'urn:x-ogc:def:crs:EPSG:6.11:4326'));
			}
			
			this.csw.GetRecords(1, maxNb, filter, this.config.OGC_CSW_SCHEMA).then(function(result){

				var datasets = new Array();
				if(result.value.searchResults.numberOfRecordsMatched > 0){                 
					var csw_results = result.value.searchResults.any;
					
					//post-process results
					for(var i=0;i<csw_results.length;i++){
						var csw_result = csw_results[i];    
						var md_entry = this_.createMetadataEntry(csw_result.value);
						if(md_entry.metadata.contentInfo){
							datasets.push(md_entry);
						}
					}                       
				}
				  
				deferred.resolve(datasets);
			});
		}
		return deferred.promise();
	},
        
        
	/**
	 * OpenFisViewer.prototype.displayDatasets
	 *
	 */
	OpenFisViewer.prototype.displayDatasets = function(bbox){
		var this_ = this;
		$($("#dataset-list").find("section")[0]).empty();
		$("#dataset-loader").show();
		$("#dataset-count").empty();
	 
		this.datasets = new Array();
		if($("#dataset-search-bbox").prop("checked") && !bbox){
			bbox = this.map.getView().calculateExtent(this.map.getSize());
		}
		this.getDatasetsFromCSW(false, bbox).then(function(results){
			console.log(results);
			var options = {
				valueNames: [
					'title',
					{ name: 'title_tooltip', attr: 'title' },
					'_abstract',
					{ name: 'graphic_overview', attr: 'data-mainSrc' },
					{ name: 'pid', attr: 'data-pid'}
					
				],
				item: 'dataset-item',
				pagination: true,
				page: 5
			};
			$("#dataset-loader").hide();
			this_.datasets = results;
			var datasetList = new List('dataset-list', options, results);
			$("#dataset-count").html(this_.datasets.length + " datasets");
			this_.displayGraphicOverviews();
			datasetList.on("updated", function(evt){
				this_.displayGraphicOverviews();
				this_.updateSelection();
			});
			this_.updateSelection();
		});
	}
	 
	/**
	 * OpenFisViewer.prototype.displayGraphicOverviews
	 */
	OpenFisViewer.prototype.displayGraphicOverviews = function(){
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
				$this.css("background", "url('img/loading-error.svg')");
				$this.show();
			}
			$this.css("background", "url('img/loading.gif')");
			im.src = $this.data("mainsrc");
		});
	}
    
         
	/**
	 * OpenFisViewer.prototype.selectDataset
	 * Selects a dataset
	 * @param elm
	 *
	 **/
	OpenFisViewer.prototype.selectDataset = function(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Select dataset with pid = " + pid);
		var out =false;
		if(this.selection.map(function(i){return i.pid}).indexOf(pid) == -1){
			var dataset = this.datasets.filter(function(data){if(data.pid == pid){return data}})[0];
			this.selection.push(dataset);
			this.updateSelection();
			this.updateDatasetSelector();
			out = true;   
		}
		return out;
	}
         
	/**
	 * OpenFisViewer.prototype.unselectDataset
	 * Unselects a dataset
	 * @param elm
	**/
	OpenFisViewer.prototype.unselectDataset = function(elm){
		var pid = elm.getAttribute('data-pid');
		console.log("Unselect dataset with pid = " + pid);
		var out = false;
		var len1 = this.selection.length;
		this.selection = this.selection.filter(function(i,data){if(data.pid != pid){return data}});
		var len2 =  this.selection.length;
		out = len2<len1;
		
		this.updateSelection();

		//clear dsd interface in case selected dataset
		if(this.selected_dsd) if(this.selected_dsd.pid == pid){
			$("#dsd-ui").empty();
			this.selected_dsd = null;
			$("#datasetSelector").val('').trigger('change');
		}
		
		this.updateDatasetSelector();
		this.removeLayerByProperty(pid, "id");
		this.map.changed();

		return out;
	}
         
	/**
	 * OpenFisViewer.prototype.updateSelection
	 * Actions performed when updating the dataset selection
	 */
	OpenFisViewer.prototype.updateSelection = function(){
		var this_ = this;
		
		//update Data list UI
		$.each($("#dataDialog").find(".search-result"), function(idx, item){
			$item = $(item);
			var buttons = $item.find("button");
			var adder = $(buttons[0]);
			var remover = $(buttons[1]);
			var pid = adder.attr("data-pid");
			if(this_.selection.map(function(item){return item.pid}).indexOf(pid) != -1){
				adder.prop("disabled", true);
				remover.css("display", "block");
			}else{
				adder.prop("disabled", false);
				remover.css("display", "none");
			}
		})
            
		//update Data selection UI
		$($("#dataset-selection").find("section")[0]).empty();
		if(this_.selection.length > 0){
			var options = {
				valueNames: [
					'title',
					{ name: 'title_tooltip', attr: 'title' },
					'_abstract',
					{ name: 'pid', attr: 'data-pid'}
					
				],
				item: 'dataset-item-selection'
			};
			var datasetSelection = new List('dataset-selection', options, this_.selection);
			this_.displayGraphicOverviews();
			//datasetSelection.on("updated", function(evt){});
		}else{
			$($("#dataset-selection").find("section")[0]).html('<p style="font-style:italic;font-size:12px;text-align:center;">No dataset selected</p>');
		}
	}
         
	/**
	 * OpenFisViewer.prototype.updateDatasetSelector
	 */
	OpenFisViewer.prototype.updateDatasetSelector = function(init){
		var this_ = this;
		var formatDatasetSelection = function(dataset) {
		  if (!dataset.id) { return dataset.text; }
		  var $dataset = $(
			'<span class="dataset-subtitle" >' + dataset.id + '</span>'
		  );
		  return $dataset;
		};
		var formatDatasetResult = function(dataset) {
		  if (!dataset.id) { return dataset.text; }
		  var $dataset = $(
			'<span class="dataset-subtitle" >' + dataset.id + '</span>'+
			'<br><span class="dataset-title"> ' + dataset.text + '</span>'
		  );
		  return $dataset;
		};
		
		$("#datasetSelector").empty().append("<option></option>");
		$("#datasetSelector").select2({
			theme: "classic",
			placeholder: "Select a dataset",
			data: this_.selection.map(function(item){ return { id: item.pid, text: item.title}}),
			templateResult: formatDatasetResult,
			templateSelection: formatDatasetSelection
		});
		if(this_.selected_dsd) $("#datasetSelector").val(this_.selected_dsd.pid).trigger('change');
		if(init){
			$("#datasetSelector").on("select2:select", function (e) {
				this_.getDSD(e.params.data.id);
				$("#datasetMapper").show();
			});
			$("#datasetSelector").on("select2:unselect", function (e) {
				this_.selected_dsd = null;
				$("#datasetMapper").hide();
			});   
		}
	}
	
	/**
	 * OpenFisViewer.prototype.getCSWRecord
	 * @param pid
	 * @returns a promise
	 */
	OpenFisViewer.prototype.getCSWRecord = function(pid){
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
	 * OpenFisViewer.prototype.parseDSD
	 * @param response
	 * @returns a DSD json object
	 */
	OpenFisViewer.prototype.parseDSD = function(response){

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
	 * OpenFisViewer.prototype.getDSD
	 * @param pid
	 */
	OpenFisViewer.prototype.getDSD = function(pid){

	    var deferred = $.Deferred();	
          
		$("#dsd-ui").empty();
		$("#dsd-loader").show();
	  
		var this_ = this;
		var target = this.selection.filter(function(data){if(data.pid == pid){return data}});
		if(target.length>0) target = target[0];
		$.ajax({
			url: target.dsd,
			contentType: 'application/xml',
			type: 'GET',
			success: function(response){
				$("#dsd-loader").hide();
				
				//parse DSD
				this_.selected_dsd = {
					pid: pid,
					dataset: target,
					dsd: this_.parseDSD(response),
					query: null
				};
				
				$("#datasetSelector").val(this_.selected_dsd.pid).trigger('change');
				
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
				for(var i=0;i<this_.selected_dsd.dsd.length;i++){
					var dsd_component = this_.selected_dsd.dsd[i];
					if(dsd_component.serviceType == "Dimension"){
						if(dsd_component.values){
							//id
							var dsd_component_id = "dsd-ui-dimension-" + dsd_component.serviceCode;
							
							//html
							$("#dsd-ui-col-1").append('<select id = "'+dsd_component_id+'" multiple="multiple" class="dsd-ui-dimension dsd-ui-dimension-codelist"></select>');
							
							//jquery widget
							var formatItem = function(item) {
							  if (!item.id) { return item.text; }
							  if(item.codelist == "flag"){
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
								templateResult: formatItem,
								templateSelection: formatItem,
								matcher: codelistMatcher
							});
							
						}
					}
				}
				
				//for time dimension
				//year extent extracted from metadata, information always available
				var year_start = parseInt(this_.selected_dsd.dataset.time_start.substring(0,4));
				var year_end = parseInt(this_.selected_dsd.dataset.time_end.substring(0,4));
				
				$("#dsd-ui-row").append('<div id="dsd-ui-col-2" class="'+bootstrapClass+'"></div>');
				
				//2. Time start/end slider or datepickers
				//-----------------------------------------
				this_.timeWidget = this_.options.ui.time? this_.options.ui.time : 'slider';
				var dsd_time_dimensions = ["time_start", "time_end"];
				var timeDimensions = this_.selected_dsd.dsd.filter(function(item){if(dsd_time_dimensions.indexOf(item.serviceCode) != -1) return item});
				var timeDimTypeList = this_.selected_dsd.dsd.filter(function(i){if(i.serviceType=="TimeDimension"){return(i)}}).map(function(i){return(i.primitiveType)});
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
					alert("openfisviewer doesn't support yet data services with a single time parameter")
				}
				
				//3. Other time dimensions
				//-------------------------
				var extra_time_dimensions = ['year', 'semester', 'quarter', 'month'];
				for(var i=0;i<this_.selected_dsd.dsd.length;i++){
					var dsd_component = this_.selected_dsd.dsd[i];
					//id
					var dsd_component_id = "dsd-ui-dimension-" + dsd_component.serviceCode;
					
					if(extra_time_dimensions.indexOf(dsd_component.serviceCode) != -1){
						//html
						$("#dsd-ui-col-2").append('<select id = "'+dsd_component_id+'" multiple="multiple" class="dsd-ui-dimension dsd-ui-dimension-codelist"></select>');
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
				$("#dsd-ui-col-2").append('<select id = "'+dsd_component_id+'" class="dsd-ui-dimension"></select>');
				
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

				//5. Map classifications
				if(this_.options.map.styling.dynamic){
					//Classification type
					//-------------------
					//id
					var map_classtype_id = "map-classtype-selector";
					//html
					$("#dsd-ui-col-2").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Map options</label></p></div>');
					$("#dsd-ui-col-2").append('<select id = "'+map_classtype_id+'" class="dsd-ui-dimension"></select>');
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
					$("#dsd-ui-col-2").append('<select id = "'+map_classnb_id+'" class="dsd-ui-dimension"></select>');
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
				
				//Query and mapbutton
				//------------------------------
				$("#dsd-ui-col-2").append('<br><br>');
				$("#dsd-ui-col-2").append('<button type="button" id="datasetMapper" style="width:90%;" title="Query & Map!" data-loading-text="<span class=\'query-loader\'></span>" class="btn btn-primary" onclick="app.mapDataset()">Query & Map</button>');
				$("#dsd-ui-col-2").append('<br><span class="query-nodata" style="display:none;">Ups! There is no data for this query...</span>');
				
				//download buttons
				//------------------------------
				$("#dsd-ui-col-2").append('<br><br>');
				$("#dsd-ui-col-2").append('<div style="margin: 0 auto;margin-top: 10px;width: 90%;text-align: left !important;"><p style="margin:0;"><label>Download?</label></p></div>');
				$("#dsd-ui-col-2").append('<div id="dsd-ui-buttons" style="margin: 0 auto;width: 90%;text-align: center !important;"><p style="margin:0;"></div>');
				var button_csv_aggregated = '<button id="dsd-ui-button-csv1" type="button" class="btn data-action-button data-csv-agg" title="Download aggregated data (CSV)" onclick="app.downloadDatasetCSV(true)"></button>';
				$("#dsd-ui-buttons").append(button_csv_aggregated);
				var button_csv_raw = '<button type="button" id="dsd-ui-button-csv2" class="btn data-action-button data-csv-raw" title="Download raw data (CSV)" onclick="app.downloadDatasetCSV(false)"></button>';
				$("#dsd-ui-buttons").append(button_csv_raw);
				var button_png_map = '<button type="button" id="dsd-ui-button-png" class="btn data-action-button data-png-map" title="Download map (PNG)" onclick="app.downloadMapPNG()"></button>';
				$("#dsd-ui-buttons").append(button_png_map);
				
				var layerName = this_.selected_dsd.pid + "_aggregated";
				var layer = this_.getLayerByProperty(this_.selected_dsd.pid, 'id');
				if(layer){
					$('#dsd-ui-button-csv1').prop('disabled', false);
					$('#dsd-ui-button-csv2').prop('disabled', false);
					//$('#dsd-ui-button-png').prop('disabled', false);
				}else{
					$('#dsd-ui-button-csv1').prop('disabled', true);
					$('#dsd-ui-button-csv2').prop('disabled', true);
					$('#dsd-ui-button-png').prop('disabled', true);
				}
				
				deferred.resolve();
			}
		});
	
		return deferred.promise();

	}
	
	/**
	 * OpenFisViewer.prototype.getViewParams
	 */
	 OpenFisViewer.prototype.getViewParams = function(){
		var this_ = this;
		var data_query = "";
		
		//grab codelist values (including extra time codelists)
		$.each($(".dsd-ui-dimension-codelist"), function(i,item){
			var values = $("#"+item.id).val();
			if(values) if(values.length > 0){
				var data_component_query = item.id.split('dsd-ui-dimension-')[1] + ':' + values.join('+');
				data_query += data_component_query + ";";
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
			var data_component_query = 'time_start:' + time_start + ';' + 'time_end:' + time_end;
			data_query += data_component_query + ';';
			
		}else if(this_.timeWidget == 'datepicker'){
			var time_start = $($(".dsd-ui-dimension-datepicker")[0]).datepicker( "getDate" );
			if(!time_start) time_start = new Date(new Date(this.selected_dsd.dataset.time_start) - tzoffset).toISOString().split('T')[0];
			var time_end = $($(".dsd-ui-dimension-datepicker")[1]).datepicker( "getDate" );
			if(!time_end) time_end = new Date(new Date(this.selected_dsd.dataset.time_end) - tzoffset).toISOString().split('T')[0];
			var data_component_query = 'time_start:' + time_start + ';' + 'time_end:' + time_end;
			data_query += data_component_query +';';
		}
		
		//grab aggregation method
		var aggregation_method = $("#dsd-ui-dimension-aggregation_method").select2('val');
		data_query += "aggregation_method:" + aggregation_method;

		return data_query;
	}
         
      
	// Map UI
	//===========================================================================================
		
	/**
	 * OpenFisViewer.prototype.initMap Inits the map
	 * @param id
	 * @param main
	 * @param extent
	 */
	OpenFisViewer.prototype.initMap = function(id, main, extent){
        
		var map;
		var this_ = this;
		this_.layers = new Object();
		
		//baselayers
		var esri1Template = 'https://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}';
		var esri2Template = 'https://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer/tile/{z}/{y}/{x}';
		baseLayers = [
			new ol.layer.Group({
				'title': "Basemaps",
				layers: [
					new ol.layer.Tile({
						title : "ESRI - Countries",
						type: 'base',
						source : new ol.source.XYZ({							
							attributions: [
								new ol.Attribution({
									html: 'Tiles © <a href="http://services.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer">ArcGIS</a>'
								})
							],
							projection: ol.proj.get(this_.options.map.projection),
							tileSize: 512,
											tileUrlFunction: function(tileCoord) {
										return esri2Template.replace('{z}', (tileCoord[0] - 1).toString())
													.replace('{x}', tileCoord[1].toString())
													.replace('{y}', (-tileCoord[2] - 1).toString());
									},
							crossOrigin: 'anonymous',
							wrapX: true
										})
					}),
					new ol.layer.Tile({
						title : "ESRI World Imagery",
						type: 'base',
						source : new ol.source.XYZ({
							attributions: [
								new ol.Attribution({
									html: 'Tiles © <a href="http://services.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer">ArcGIS</a>'
								})
							],
							projection: ol.proj.get(this_.options.map.projection),
							tileSize: 512,
							tileUrlFunction: function(tileCoord) {
										return esri1Template.replace('{z}', (tileCoord[0] - 1).toString())
													.replace('{x}', tileCoord[1].toString())
													.replace('{y}', (-tileCoord[2] - 1).toString());
									},
							crossOrigin: 'anonymous',
							wrapX: true
						})
					}),
					new ol.layer.Tile({
						title : "Oceans imagery",
						type: 'base',
						source : new ol.source.TileWMS({
							url : "https://tunaatlas.d4science.org/geoserver/wms",
							params : {
									'LAYERS' : 'tunaatlas:bathymetry,tunaatlas:continent',
									'VERSION': '1.1.1',
									'FORMAT' : 'image/png',
									'TILED'	 : true,
									'TILESORIGIN' : [-180,-90].join(',')
							},
							wrapX: true,
							serverType : 'geoserver',
							crossOrigin: 'anonymous'
						})
					})

				]
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
        
	    //map
            var mapId = id? id : 'map';
	    $("#"+mapId).empty();
		var map = new ol.Map({
			id: mapId,
			target : mapId,
			layers : this_.layers.baseLayers.concat(this_.layers.overlays),
			view : new ol.View({
				projection: this.options.map.projection,
				center : ol.extent.getCenter(defaultMapExtent),
				extent: defaultMapExtent,
				zoom : defaultMapZoom
			}),
			controls: [],
			logo: false
		});
		map.addControl( new ol.control.LoadingPanel() );
		map.addControl( new ol.control.Zoom() );
		map.addControl( new ol.control.ZoomToMaxExtent({
			extent	: extent? extent : defaultMapExtent,
			zoom	: defaultMapZoom
		}));
		
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
		
		//events
		//------
		//spatial search
		map.on('moveend', function(evt){
			if($("#dataset-search-bbox").prop("checked")){
				var bbox = evt.map.getView().calculateExtent(evt.map.getSize());
				this_.displayDatasets(bbox); 
			}
		});
		
		return map;
	}
        
    /**
	 * OpenFisViewer.prototype.addLayer Adds layer
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
	 */
	OpenFisViewer.prototype.addLayer = function(mainOverlayGroup, id, title, wmsUrl, layer, visible, showLegend, opacity, tiled,
											cql_filter, style, viewparams, envfun, envparams){
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
	    if(envparams){ layerParams['env'] = envparams; }
	    if(style) layerParams['STYLES'] = style;
	    var layer = new olLayerClass({
		id : id,
		title : title,
		source : new olSourceClass({
			url : wmsUrl,
			params : layerParams,
			wrapX: true,
			serverType : 'geoserver'
		}),
		opacity : opacity,
                visible: visible
	    });
            
	    this.setLegendGraphic(layer);
            layer.id = id;
	    layer.envfun = envfun;
	    layer.showLegendGraphic = showLegend;
			
 	    if(mainOverlayGroup > this.layers.overlays.length-1){
		alert("Overlay group with index " + mainOverlayGroup + " doesn't exist");
	    }
	    layer.overlayGroup = this.options.map.layergroups[mainOverlayGroup];
            this.layers.overlays[mainOverlayGroup].getLayers().push(layer);

            return layer;
	}
        
    /**
	 * OpenFisViewer.prototype.removeLayerByProperty Util method to remove a layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
    OpenFisViewer.prototype.removeLayerByProperty = function(layerProperty, by){
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
					removed = true;
					break;
				}
			}
		}
		return removed;
	}
        
	/**
	 * OpenFisViewer.prototype.getDatasetMaxValue
	 * @deprecated OpenFisViewer.getDatasetValues is used
	 * @param viewparams
	 * @returns a JQuery promise
	 */
	OpenFisViewer.prototype.getDatasetMaxValue = function(viewparams){
	    var maxValueRequest = this.getDatasetWFSLink(true, viewparams, "GML2") + "&sortBy=value+D&maxFeatures=1";
	    var deferred = $.Deferred();
	    $.ajax({
                url: maxValueRequest,
                contentType: 'application/xml',
                type: 'GET',
                success: function(response){
			var maxValue = NaN;
			var children = response.childNodes[0].childNodes;
			if(children.length > 1) maxValue = parseFloat(children[1].childNodes[0].childNodes[1].textContent);
			deferred.resolve(maxValue);
		},
		error: function(error){
			console.log(error);
			deferred.reject(error);
		}
	    });
	    return deferred.promise();
	}

	/**
	 * OpenFisViewer.prototype.getDatasetValues
	 * @returns a Jquery promise
	 */
	OpenFisViewer.prototype.getDatasetValues = function(viewparams){
	    var wfsRequest = this.getDatasetWFSLink(true, viewparams, "json") + "&propertyName=value";
	    var deferred = $.Deferred();
	    $.ajax({
                url: wfsRequest,
                contentType: 'application/json',
                type: 'GET',
                success: function(response){
			var features = response.features;
			var values = new Array();
			if(features.length > 0){
				values = features.map(function(f){return f.properties.value});
			}			
			deferred.resolve(values);
		},
		error: function(error){
			console.log(error);
			deferred.reject(error);
		}
	    });
	    return deferred.promise();

	}

	/**
     * OpenFisViewer.prototype.calculateBreaks
	 * @param values an array of numeric values
	 * @param classType the type of classification to apply
	 * @param classNb the number N of class breaks
	 * @returns an array of N+1 class breaks
     */
	OpenFisViewer.prototype.calculateBreaks = function(values, classType, classNb){
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
	    breaks = breaks.map(function(i){return Math.round(i * 100) / 100});
		breaks[breaks.length-1] = max(values);
	    return breaks;
	}

	/**
	 * OpenFisViewer.prototype.buildEnvParams
	 */
	OpenFisViewer.prototype.buildEnvParams = function(breaks){
	    var envparams = "";
	    for(var i=1;i<=breaks.length;i++){
		envparams += "v"+ i +":"+ breaks[i-1] + ";";
	    }
	    return envparams;
	}

	/**
	 * OpenFisViewer.prototype.mapDataset
	 */
	OpenFisViewer.prototype.mapDataset = function(){
		var this_ = this;

		$("#datasetMapper").prop('disabled', true);
		$("#datasetMapper").bootstrapBtn('loading');
		$(".query-nodata").hide();

	    //layer properties
		var layerName = this_.selected_dsd.pid + "_aggregated";
		var layer = this_.getLayerByProperty(this_.selected_dsd.pid, 'id');
	    var viewparams = this_.getViewParams();
		
	    //dynamic styling properties
	    var classType = $("#map-classtype-selector").select2('val');
	    var classNb = $("#map-classnb-selector").select2('val');
	    var layerStyle =  "dyn_poly_choropleth_class_" + classNb;

		if(!layer){
			//ADD LAYER
			var layerUrl = this_.selected_dsd.dataset.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine.filter(function(item){if(item.ciOnlineResource.linkage.url.indexOf('wms')!=-1) return item})[0].ciOnlineResource.linkage.url;
			if(this_.options.map.styling.dynamic){
				//dynamic styling
				this_.getDatasetValues(viewparams).then(function(values){
					if(values.length > 0){
						if(values.length < classNb){
							classNb = values.length;
							layerStyle = "dyn_poly_choropleth_class_" + classNb;
						}
						var breaks = this_.calculateBreaks(values, classType, classNb);
						if(breaks.length == 2) breaks[0] = 0;
						var envparams = this_.buildEnvParams(breaks);
						var layer = this_.addLayer(1, this_.selected_dsd.pid, this_.selected_dsd.dataset.title,layerUrl, layerName, true, true, 0.9, true, null, layerStyle, viewparams, classType, envparams);
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
				var layer = this_.addLayer(1, this_.selected_dsd.pid, this_.selected_dsd.dataset.title,layerUrl, layerName, true, true, 0.9, true, null, null, viewparams);
				this_.map.changed();
				//actions o download buttons
				$('#dsd-ui-button-csv1').prop('disabled', false);
				$('#dsd-ui-button-csv2').prop('disabled', false);
				$('#dsd-ui-button-png').prop('disabled', false);
			}	     
		}else{
			//UPDATE LAYER
			if(this_.options.map.styling.dynamic){
				//dynamic styling
				this_.getDatasetValues(viewparams).then(function(values){
					if(values.length > 0){
						if(values.length < classNb){
							classNb = values.length;
							layerStyle = "dyn_poly_choropleth_class_" + classNb;
						}
						//update breaks
						var breaks = this_.calculateBreaks(values, classType, classNb);
						if(breaks.length == 2) breaks[0] = 0;
						var envparams = this_.buildEnvParams(breaks);

						//update viewparams, envparams & legend
						layer.getSource().updateParams({'VIEWPARAMS' : viewparams});
						layer.getSource().updateParams({'STYLES' : layerStyle});
						layer.getSource().updateParams({'env' : envparams});
						layer.envfun = classType;
						this_.setLegendGraphic(layer, breaks);
						this_.map.changed();
						$("#datasetMapper").bootstrapBtn('reset');
						$("#datasetMapper").prop('disabled', false);
						//actions o download buttons
						$('#dsd-ui-button-csv1').prop('disabled', false);
						$('#dsd-ui-button-csv2').prop('disabled', false);
						$('#dsd-ui-button-png').prop('disabled', false);
					}else{
						this_.removeLayerByProperty(this_.selected_dsd.pid, "id");
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
				layer.getSource().updateParams({'VIEWPARAMS' : viewparams});
				this_.map.changed();
				//actions o download buttons
				$('#dsd-ui-button-csv1').prop('disabled', false);
				$('#dsd-ui-button-csv2').prop('disabled', false);
				$('#dsd-ui-button-png').prop('disabled', false);
			}
		}
	}

	/**
	 * OpenFisViewer.prototype.getDatasetWFSLink
	 * @param aggregated true if aggregated, false otherwise
	 * @param viewparams query viewparams
   	 * @param format optional format to be specified, by default it will provide a CSV
	 * @return the WFS layer URL
	 */
	OpenFisViewer.prototype.getDatasetWFSLink = function(aggregated, viewparams, format){
		var layerName = this.selected_dsd.pid;
		if(aggregated) layerName += "_aggregated";
		var layerUrl = this.selected_dsd.dataset.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine.filter(
		   function(item){
			var filter = item.ciOnlineResource.linkage.url.indexOf('WFS')!=-1
						 && item.ciOnlineResource.linkage.url.indexOf(layerName) !=-1;
			if(filter) return item;
		   }
		)[0].ciOnlineResource.linkage.url;
		//if(!aggregated) layerUrl += "&propertyName=" + ;
	    if(viewparams) layerUrl += "&VIEWPARAMS=" + viewparams;
	    if(format) layerUrl = layerUrl.replace("CSV", format);
 	    return layerUrl;	
	}	

	
		/**
		 * Simple json2csv util
		 * @param objArray
		 * @returns a string representive the CSV
		 */
		OpenFisViewer.prototype.json2csv = function(objArray) {
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
		OpenFisViewer.prototype.downloadCSV = function(content, fileName, mimeType) {
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
	 * OpenFisViewer.prototype.getateTimeString
	 * @param date
	 */
	OpenFisViewer.prototype.getDateTimeString = function(date){
		var str = date.toISOString();
		return (str.split("T")[0] + "" + str.split("T")[1].split(".")[0]).replace(/-/g,"").replace(/:/g,"");
	}
	
	/**
	 * OpenFisViewer.prototype.downloadDatasetCSV
	 * @param aggregated true if aggregated, false otherwise
	 */
	OpenFisViewer.prototype.downloadDatasetCSV = function(aggregated){
		var this_ = this;
		var layerUrl = this.getDatasetWFSLink(aggregated, this.getViewParams(), 'json');
		$.getJSON(layerUrl, function(response){
			var features = new ol.format.GeoJSON().readFeatures(response);
			var featuresToExport = new Array();
			for(var i=0;i<features.length;i++){
				var feature = features[i];
				var props = feature.getProperties();
				geomwkt = new ol.format.WKT().writeGeometry(props.geometry);
				delete props.geometry;
				delete props.bbox;
				props.geometry = geomwkt;
				featuresToExport.push(props);
			}
			console.log(features);
			var csv = this_.json2csv(featuresToExport);
			var fileName = this_.selected_dsd.pid;
			if(aggregated) fileName += "_aggregated";
			fileName += "_"+ this_.getDateTimeString(new Date()) + ".csv";
			this_.downloadCSV(csv, fileName); 
		});
	}
	
	/**
	 * OpenFisViewer.prototype.downloadMapPNG
	 *
	 */
	OpenFisViewer.prototype.downloadMapPNG = function(){
		var this_ = this;
		this.map.once('postcompose', function(event) {
			var canvas = event.context.canvas;
			var fileName = this_.selected_dsd.pid +"_"+ this_.getDateTimeString(new Date()) + ".png";
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
	 * OpenFisViewer.prototype.setLegendGraphic Set legend graphic
	 * @param a ol.layer.Layer object
	 * @param breaks an array of break values
	 */	 
	OpenFisViewer.prototype.setLegendGraphic = function(lyr, breaks) {
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
		 	if(source.getParams().VIEWPARAMS != "undefined" & this.options.map.styling.dynamic){
				var canvas = document.createElement('canvas');
				document.body.appendChild(canvas);
				var canvasHeight = breaks? (breaks.length-1) * 20 : 100;
				canvas.height = String(canvasHeight);
				canvas.width = '200';
				var ctx = canvas.getContext('2d');
				var palette = new Image();
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
						if(breaks.length==5) breakSpace = 12;
						var break_signs = this_.options.map.styling.breaks;
						for(var i=1;i<breaks.length;i++){
							var breakLegend = break_signs[0]+" " + (Math.round(breaks[i-1] * 100) / 100) + " "+break_signs[1]+" " + (Math.round(breaks[i] * 100) / 100);
							//if(i==breaks.length-1){ breakLegend += " " + breaks_signs[2] }else{ breakLegend += " [" };
							breakLegend += " " + break_signs[2]
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
	 * OpenFisViewer.prototype.getLayerByProperty Util method to get layer by property
	 * @param layerProperty the property value
	 * @param by the property 
	 */
	OpenFisViewer.prototype.getLayerByProperty = function(layerProperty, by){
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
	 * OpenFisViewer.prototype.initDataViewer
	 */
	OpenFisViewer.prototype.initDataViewer = function(){
		var this_ = this;
		this_.map = this_.initMap('map', true, false);
		$($("li[data-where='#pageMap']")).on("click", function(e){
			$($("#map").find("canvas")).show();
		});
		
		//layers of interest
		if(this.config.OGC_WMS_LAYERS){
			for(var i=0;i<this.config.OGC_WMS_LAYERS.length;i++){
				var layerDef = this.config.OGC_WMS_LAYERS[i];				
				this_.addLayer(
					layerDef.group, layerDef.id, layerDef.title, layerDef.wmsUrl, layerDef.layer,
					layerDef.visible, layerDef.showLegend, layerDef.opacity, layerDef.tiled, layerDef.cql_filter, layerDef.style
				);
			}
		}
	}

	/**
	 * OpenFisViewer.prototype.setEmbedLink
	 */
	OpenFisViewer.prototype.setEmbedLink = function(){
		if ( ! ( document.getElementById ) ) return void(0);
		var url = location.href.replace(/#.*$/,'').replace(/\?.*$/,'');
		
		//dataset
		if(this.selected_dsd) url += '?dataset=' + this.selected_dsd.pid;
		
		//views
		var encoded_views = new Array();
		var viewlayers = this.layers.overlays[1].getLayers().getArray();
		for(var i=0;i<viewlayers.length;i++){
			var encoded_view = "";
			var viewlayer = viewlayers[i];
			var params = viewlayer.getSource().getParams();
			var pid = viewlayer.id;
			encoded_view += 'pid=' + pid + ',';
			encoded_view += 'par=' + params['VIEWPARAMS'] + ',';
			encoded_view += 'fun=' + viewlayer.envfun + ',';
			encoded_view += 'env=' + params['env'] + ',';
			encoded_view += 'sld=' + params['STYLES'] + ',';
			encoded_view += 'q=' + ((this.selected_dsd.pid == pid)? true : false);
			encoded_views.push(encoded_view);
		}
		if(viewlayers.length > 0) url += '&views=' + encodeURIComponent(JSON.stringify(encoded_views));
	
		document.getElementById('openfisviewer-link').value = url;
	}
        
	//===========================================================================================
	//URL resolvers
	//===========================================================================================

	/**
	 * OpenFisViewer.prototype.resolveDatasetForQuery
	 * @param datasetDef
	 */
	OpenFisViewer.prototype.resolveDatasetForQuery = function(datasetDef){
		var this_ = this;
		console.log("Fetching query interface for pid = '"+datasetDef.pid+"'");
		this_.openQueryDialog();
		this_.getDSD(datasetDef.pid).then(function(){					
			this_.updateDatasetSelector();
			if(datasetDef.query){
				//view params
				var viewparams = datasetDef.viewparams.split(";");
				var timeparams = new Array();
				for(var i=0;i<viewparams.length;i++){
					var viewparam = viewparams[i];
					var kvp = viewparam.split(":");
					var key = kvp[0];
					if(!key.match("time")){
						var values = kvp[1].split("+");
						$("#dsd-ui-dimension-"+key).val(values).trigger('change');
					}else{
				 		timeparams.push({key: kvp[0], value: kvp[1]});
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

				//map options
				var envfun = datasetDef.envfun;
				$("#map-classtype-selector").val(envfun).trigger('change');
				var envparams = datasetDef.envparams;
				$("#map-classnb-selector").val(datasetDef.breaks.length-1).trigger('change');
			} 		
		});
	}

	/**
	 * OpenFisViewer.prototype.resolveDatasetForMap
	 * @param datasetDef
	 */
	OpenFisViewer.prototype.resolveDatasetForMap = function(datasetDef){
		console.log("Resolving map for pid = '"+datasetDef.pid+"'");
		var this_ = this;
		var layerName = datasetDef.pid + "_aggregated";
		var layerUrl = datasetDef.entry.metadata.distributionInfo.mdDistribution.transferOptions[0].mdDigitalTransferOptions.onLine
			.filter(function(item){if(item.ciOnlineResource.linkage.url.indexOf('wms')!=-1) return item})[0].ciOnlineResource.linkage.url;
		var layer = this.addLayer(1, datasetDef.pid, datasetDef.entry.title, layerUrl, layerName, true, true, 0.9, true, null,
					  datasetDef.style, datasetDef.viewparams, datasetDef.envfun, datasetDef.envparams);
		this_.setLegendGraphic(layer, datasetDef.breaks);		
	}

	/**
	 * OpenFisViewer.prototype.resolveViewer
	 * Resolves the map viewer from URL parameters
	 */
	OpenFisViewer.prototype.resolveViewer = function(){
		var this_ = this;
		
		//url params
		var params = this_.getAllUrlParams();
		
		//dynamic parameters
		//embedded link feature 'dataset' decoding
		if(params.dataset && !params.views){
			var datasetDef = {pid: params.dataset};
			this_.getCSWRecord(datasetDef.pid).then(function(md_entry){
				if(this_.selection.map(function(i){return i.pid}).indexOf(pid) == -1
			   	   && md_entry.metadata.contentInfo){
					datasetDef.entry = md_entry;
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
				var encoded_view_settings = encoded_view.split(",");
				var pid = encoded_view_settings[0].split("pid=")[1];
				var viewparams = encoded_view_settings[1].split("par=")[1];
				var envfun = encoded_view_settings[2].split("fun=")[1];
				var envparams = encoded_view_settings[3].split("env=")[1];
				var style = encoded_view_settings[4].split("sld=")[1];
				var query = encoded_view_settings[5].split("q=")[1] == "true";
				var breaks = envparams.split(";"); breaks.splice(-1,1);
				breaks = breaks.map(function(key){return parseFloat(key.split(":")[1])});
				encoded_datasets.push({pid: pid, viewparams: viewparams, envfun: envfun, envparams: envparams, breaks: breaks, style: style, query: query});
			}

			var metadata_promises = new Array();
			for(var i=0;i<encoded_datasets.length;i++){
				metadata_promises.push( this_.getCSWRecord(encoded_datasets[i].pid) );
			}
			console.log("Sending "+metadata_promises.length+" metadata record request(s)...");
			metadata_promises.forEach(function(promise, i){
				$.when(promise).then(function(md_entry) {
					var encoded_dataset = encoded_datasets[i];
					encoded_dataset.entry = md_entry;				
					console.log(encoded_dataset);
					this_.selection.push(encoded_dataset.entry);	

					//if it was the last dataset queried by user we fill the query interface with param values
					if(encoded_dataset.query) this_.resolveDatasetForQuery(encoded_dataset);
					
					//resolve map
					this_.resolveDatasetForMap(encoded_dataset);
					this_.map.changed();
				});
			});
		}
	}
	
	//===========================================================================================
	//Widgets UIs
	//===========================================================================================
    
	/**
     * OpenFisViewer.prototype.initDialog Init dialog
	 */
	OpenFisViewer.prototype.initDialog = function(id, title, classes, position, liIdx, iconName, onopen, onclose){
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
	 * OpenFisViewer.prototype.openDialog Open dialog
	 */
	OpenFisViewer.prototype.openDialog = function(id){
		if(!$("#" + id).dialog("isOpen")){
			$("#" + id).dialog("open");
		}
	}
   
	/**
	 * OpenFisViewer.prototype.closeDialog Close dialog
	 */
	OpenFisViewer.prototype.closeDialog = function(id){
		if($("#" + id).dialog("isOpen")){
			$("#" + id).dialog("close");
		}
	}
	
    /**
     * OpenFisViewer.prototype.openAboutDialog Open 'About' dialog
     */
	OpenFisViewer.prototype.openAboutDialog = function(){
		this.closeDataDialog();
		this.closeQueryDialog();
		this.openDialog("aboutDialog");
	}
	
	/**
	 * OpenFisViewer.prototype.closeAboutDialog Close 'About' dialog
	 */
	OpenFisViewer.prototype.closeAboutDialog = function(){
		this.closeDialog("aboutDialog");
	}
   
    /**
	 * OpenFisViewer.prototype.openDataDialog Open 'Data' dialog
	 */
	OpenFisViewer.prototype.openDataDialog = function(){
		this.closeAboutDialog();
		this.closeQueryDialog();
		this.openDialog("dataDialog");
	}
   
    /**
	* OpenFisViewer.prototype.closeDataDialog Close 'Data' dialog
	*/
	OpenFisViewer.prototype.closeDataDialog = function(){
		this.closeDialog("dataDialog");
	}
	
	/**
	* OpenFisViewer.prototype.openQueryDialog Open 'Query' dialog
	*/
	OpenFisViewer.prototype.openQueryDialog = function(){
		this.closeAboutDialog();
		this.closeDataDialog();
		this.openDialog("queryDialog");
	}
   
   /**
	* OpenFisViewer.prototype.closeQueryDialog Close 'Query' dialog
	*/
	OpenFisViewer.prototype.closeQueryDialog = function(){
		this.closeDialog("queryDialog");
	}

}));

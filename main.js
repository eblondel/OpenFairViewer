import $ from 'jquery';
window.$ = $;

//for filters
import 'openfairviewer/src/import-jsonix';
import 'openfairviewer/src/import-ogc-schemas';
import FilterFactory from 'openfairviewer/src/vendor/ows/FilterFactory';

//openfairviewer
import OpenFairViewer from 'openfairviewer/src/OpenFairViewer.js';
import OpenFairShiny from 'openfairviewer/src/OpenFairShiny.js'; //for shiny handlers
import colorbrewer from 'colorbrewer/index.js';

window.OFV = null;
window.ff = null;
$(document).ready(function(){
	
	//OGC filter factory
	ff = new FilterFactory({
		version : "1.1.0",
		schemas : [CSW_2_0_2]
	});
	
	new OpenFairViewer({
		id: 'OFV',
		profile : '<p>Welcome to <b>OpenFairViewer</b></p>',
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	},{	
		find : {
			filter: ff.IsLike('dc:subject', '%subjec%'),
			filterByWMS: false,
			datasetInfoHandler : function(metadata){
				//info handler to inherit geonetwork default html metadata view
				var datasetInfoUrl = "https://localhost:8080/geonetwork/srv/eng/catalog.search#/metadata/" + metadata.fileIdentifier;
				$('#datasetInfo').empty().html('<iframe src="'+datasetInfoUrl+'" style="overflow: hidden; height: 100%; width: 100%; position: absolute;"> frameborder="0" marginheight="0"></iframe>');
				OFV.openInfoDialog();
			}
		},
		access: {
			time: 'slider',
			dashboard: {
				enabled: true,
				handlers: [
					{
						targets: ['mypid'],
						name: 'My dashboard',
						handler: function(layer){
							return;
						}
					}
				]
			}
		},
		map : {
			proj4defs : [
				{epsgcode: 'EPSG:32706', proj4string: '+proj=utm +zone=6 +south +datum=WGS84 +units=m +no_defs'}
			],
			zoom: 3,
			styling : { dynamic : true },
			baselayergroup : {name: "Base maps", fold: 'open'},
			layergroups : [{name: "Base overlays", fold: 'open'},{name: "My OFV maps", fold: 'open'}],
			mainlayergroup: 1,
			overlays: [
				{
					group: 0, id: "eez", title: "Exclusive Economic Zones",
					wmsUrl: "http://geo.vliz.be/geoserver/MarineRegions/wms", layer: "MarineRegions:eez_boundaries",
					visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: undefined
				}

			],
			tooltip: {
				enabled: true,
				handler: function(layer, feature){
					return this.DEFAULT_HANDLER(layer, feature);
				}
			}

		}
		
	}).init(true);
	console.log(OFV);
	
});

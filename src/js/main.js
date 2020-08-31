/**
 * SDI Lab data viewer 
 *
 * @author Emmanuel Blondel GIS & web-information systems Expert
 *		   Contact: https://eblondel.github.io / emmanuel.blondel1@gmail.com 
 */

var app = app || {};
var appVersion = "1.0-beta"
 
$(document).ready(function(){
	app = new OpenFairViewer({
		OGC_CSW_BASEURL: "https://geonetwork-sdi-lab.d4science.org/geonetwork/srv/eng/csw"
	},{
		find : {
			filters: [],
			filterByWMS: true,
			datasetInfoHandler : function(metadata){
				var datasetInfoUrl = "https://geonetwork-sdi-lab.d4science.org/geonetwork/srv/eng/catalog.search#/metadata/" + metadata.fileIdentifier;
				$('#datasetInfo').empty().html('<iframe src="'+datasetInfoUrl+'" style="overflow: hidden; height: 100%; width: 100%; position: absolute;"> frameborder="0" marginheight="0"></iframe>');
				app.openInfoDialog();
			}
		},
		access: {
			time: 'slider',
			dashboard: {
				enabled: true,
				handler: function(layer){
					if(layer.id.startsWith('fao_capture')) {	
						return OpenFairViewerUtils.shiny.dashboardHandler("https://abennici.shinyapps.io/Shiny_sdilab_dashboard", layer, false);
					}else{
						console.log("Default dashboard handler with OpenFairViewer");
						return;
					}
				}
			}
		},
		map : {
			proj4defs : [
				{epsgcode: 'EPSG:32706', proj4string: '+proj=utm +zone=6 +south +datum=WGS84 +units=m +no_defs'}
			],
			extent: [-180, -90, 180, 90],
			zoom: 3,
			styling : { dynamic : true },
			layergroups : [{name: "Base overlays"},{name: "My SDI Lab maps"}],
			mainlayergroup: 1,
			overlays: [
				{
					group: 0, id: "fsa", title: "FAO major areas & breakdown",
					wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS_CWP",
					visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: undefined
				},
				{
					group: 0, id: "eez", title: "Exclusive Economic Zones",
					wmsUrl: "http://geo.vliz.be/geoserver/MarineRegions/wms", layer: "MarineRegions:eez_boundaries",
					visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: undefined
				}

			],
			tooltip: {
				enabled: true,
				handler: function(layer, feature){
					if(!layer.id.startsWith('geoflow-ais') || layer.id.startsWith('fad')) {//test on tuna atlas
						console.log("Default popup handler with OpenFairViewer");
						return this.DEFAULT_HANDLER(layer, feature);
					}else{
						return OpenFairViewerUtils.shiny.popupHandler("https://abennici.shinyapps.io/ShinysdilabPopup", layer, feature, false);
					}
				}
			}
		}
	});
	app.init(true);
});

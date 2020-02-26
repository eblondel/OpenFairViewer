/**
 * SDI Lab data viewer 
 *
 * @author Emmanuel Blondel GIS & Marine web-information systems Expert
 *		   Contact: https://eblondel.github.io / emmanuel.blondel1@gmail.com 
 */

var app = app || {};
var appVersion = "1.0-beta"
 
$(document).ready(function(){
	app = new OpenFairViewer({
		OGC_CSW_BASEURL: "http://localhost:8080/geonetwork/srv/eng/csw"
	},{
		browse : {
			filters: [],
			filterByWMS: true,
			datasetInfoHandler : function(metadata){
				//var datasetInfoUrl = "https://geonetwork.d4science.org/geonetwork/srv/en/main.home?uuid=" + metadata.fileIdentifier;
				var datasetInfoUrl = "https://geonetwork-sdi-lab.d4science.org/geonetwork/srv/eng/catalog.search#/metadata/" + metadata.fileIdentifier;
				$('#datasetInfo').empty().html('<iframe src="'+datasetInfoUrl+'" style="overflow: hidden; height: 100%; width: 100%; position: absolute;"> frameborder="0" marginheight="0"></iframe>');
				app.openInfoDialog();
			}
		},
		query: {
			time: 'slider'
		},
		map : {
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
				}
			]
		}
	});
	app.init();
});

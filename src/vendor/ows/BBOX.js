import Filter from './Filter.js';

class BBOX extends Filter {
	constructor(version, llat, llon, ulat, ulon, srsName) {
		super(version);
		this.object['ogc:Filter'].spatialOps = {
			'ogc:BBOX' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".BBOXType",
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
				}
			}
		};
	}
}

export default BBOX;
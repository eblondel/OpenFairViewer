 
class Filter {
	
	constructor(version, schemas){
		
		this.version = version;
		this.object = new Object();
		this.object['ogc:Filter'] = {
			TYPE_NAME : "Filter_"+this.version.replaceAll('.','_')+".FilterType"
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
				for(var i=0;i<schemas.length;i++) contextSchemas.push(schemas[i]);
				break;
			case "2.0":
				contextSchemas.push(Filter_2_0);
				for(var i=0;i<schemas.length;i++) contextSchemas.push(schemas[i]);
				break;
		}
		
		this.jsonixContext = new Jsonix.Context(
			contextSchemas,
			{
				namespacePrefixes: {
					'http://www.opengis.net/cat/csw/2.0.2': 'csw',
					"http://www.opengis.net/ogc": 'ogc',
					"http://www.opengis.net/gml": "gml"
				},
				mappingStyle : 'simplified'
			}
		)
			
	}
	
	get(){
		return this.object;
	}
	
	getJsonixContext(){
		return this.jsonixContext;
	}

	getXML(){
		var doc;
		var marshaller= this.getJsonixContext().createMarshaller();
		doc = marshaller.marshalDocument(this);
		return doc;
	}	
	
	getBasicFilterFromXML(xml){
		var unmarshaller = this.getJsonixContext().createUnmarshaller();
		return unmarshaller.unmarshalDocument(xml);
	}
	
	static getOperator(filter){
		var operator;
		if (typeof filter.object['ogc:Filter'].comparisonOps !== 'undefined') {
			// Only has one previous filter and it is a comparison operator.
			operator = filter.object['ogc:Filter'].comparisonOps;
		} else if (typeof filter.object['ogc:Filter'].spatialOps !== 'undefined'){
			// Only has one previous filter and it is a spatial operator.
			operator = filter.object['ogc:Filter'].spatialOps;
		} else if (typeof filter.object['ogc:Filter'].logicOps !== 'undefined') {
			operator = filter.object['ogc:Filter'].logicOps;
		} else {
			console.error(filter);
			throw 'Not Implemented yet, another operators';
		}
		return operator;
	}
				
}

export default Filter;
 
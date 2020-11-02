
class CSWQuery {

	constructor(version, elementSetName, constraint){
		this['csw:Query'] = {
			TYPE_NAME: "CSW_"+version.replaceAll('.','_')+".QueryType",
			elementSetName : {
				TYPE_NAME: "CSW_"+version.replaceAll('.','_')+".ElementSetNameType",
				value: elementSetName
			},
			typeNames : [
				{
					key: "{http://www.opengis.net/cat/csw/"+version+"}Record",
					localPart: "Record",
					namespaceURI: "http://www.opengis.net/cat/csw/"+version,
					prefix: "csw",
					string: "{http://www.opengis.net/cat/csw/"+version+"}csw:Record"
				}
			]
		};
		if (constraint){
			this['csw:Query'].constraint = constraint;
			console.log(this);
		}
	}

}

export default CSWQuery;


class CSWGetRecordById {
	
	constructor(owsVersion, version, ids, outputSchema){
		this['csw:GetRecordById'] = {
			TYPE_NAME: "CSW_"+version.replaceAll('.', '_')+".GetRecordByIdType",
			elementSetName: {
				ObjectTYPE_NAME: "CSW_"+version.replaceAll('.', '_')+".ElementSetNameType",
				value: "full"
			},
			id: ids,
			service :  "CSW",
			version : version
		};
		
		if (outputSchema){
			this['csw:GetRecordById'].outputSchema = outputSchema;
		}
	}
	
}

export default CSWGetRecordById;
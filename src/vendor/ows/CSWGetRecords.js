
class CSWGetRecords {

	constructor(owsVersion, version, startPosition, maxRecords, query, outputSchema){
		this['csw:GetRecords'] = {
			TYPE_NAME: "CSW_"+version.replaceAll('.', '_')+".GetRecordsType",
			abstractQuery: query,
			startPosition: startPosition,
			maxRecords: maxRecords,
			resultType: "results",
			service: "CSW",
			version: version
		}
		
		if (outputSchema){
			this['csw:GetRecords'].outputSchema = outputSchema;
		}
	}
	
}

export default CSWGetRecords;
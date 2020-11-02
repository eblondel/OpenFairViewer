
class CSWCapabilities {

	constructor(owsVersion, version){
		this["csw:GetCapabilities"] = {
			"TYPE_NAME":"CSW_" + version.replaceAll('.', '_') + ".GetCapabilitiesType",
			"service":"CSW",
			"acceptVersions": {
				"TYPE_NAME":"OWS_" + owsVersion.replaceAll('.', '_') + ".AcceptVersionsType",
				"version":[version]
			},
			"acceptFormats": {
				"TYPE_NAME": "OWS_" + owsVersion.replaceAll('.', '_') + ".AcceptFormatsType",
				"outputFormat":["application/xml"]
			}
		}
	}

}

export default CSWCapabilities;
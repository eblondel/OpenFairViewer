
class WFSCapabilities {

	constructor(owsVersion, version){
		this["csw:GetCapabilities"] = {
			"TYPE_NAME":"WFS_" + version.replaceAll('.', '_') + ".GetCapabilitiesType",
			"service":"WFS",
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

export default WFSCapabilities;
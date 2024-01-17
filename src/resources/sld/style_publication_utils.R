library(geosapi)
GS = GSManager$new(url = "{{GEOSERVER_URL}}", user = "{{GEOSERVER_USER}}", pwd = "{{GEOSERVER_PASSWORD}}", logger = "INFO")
files = list.files(pattern = ".xml")
stylenames = GS$getStyleNames()
for(file in files){
	stylename = unlist(strsplit(file, "\\."))[1]
	if(stylename %in% stylenames){
		GS$updateStyle(file = file, name = stylename)
	}else{
		GS$createStyle(file = file, name = stylename)
	}
}
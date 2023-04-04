library(geosapi)
GS = GSManager$new(url = "{{GEOSERVER_URL}}", user = "{{GEOSERVER_USER}}", pwd = "{{GEOSERVER_PASSWORD}}", logger = "INFO")
files = list.files()
for(file in files){GS$createStyle(file = file, name = unlist(strsplit(file, "\\."))[1])}
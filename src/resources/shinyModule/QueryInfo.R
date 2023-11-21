###This Shiny module proposes to interrogate data from WMS WFS services with url query parameters. 
###This module can be integrated into a shiny application intended to offer a dashboard or a popup under OpenFairViewer.


####Extraction of the metadata associated to data to retrieve the complete labels, type of variable and units of measures
getColumnDefinitions = function(fc) {
  do.call("rbind",lapply(fc$featureType[[1]]$carrierOfCharacteristics,function(x){data.frame(MemberCode=ifelse(!is.null(x$code),x$code,""),
                                                                                             MemberName=ifelse(!is.null(x$memberName$value),x$memberName$value,""),
                                                                                             MemberType=ifelse(!is.null(x$valueType$aName$attrs[['xlink:href']]),x$valueType$aName$attrs[['xlink:href']],""),
                                                                                             PrimitiveType=ifelse(!is.null(x$valueType$aName$value),sub(".*:", "", x$valueType$aName$value),""),
                                                                                             MinOccurs=ifelse(!is.null(x$cardinality$range$lower),x$cardinality$range$lower,""),
                                                                                             MaxOccurs=ifelse(!is.null(x$cardinality$range$upper$value),x$cardinality$range$upper$value,""),
                                                                                             Definition=ifelse(!is.null(x$definition),x$definition,""),
                                                                                             MeasureUnitSymbol=ifelse(!is.null(x$valueMeasurementUnit$identifier$value),x$valueMeasurementUnit$identifier$value,""),
                                                                                             MeasureUnitName=ifelse(!is.null(x$valueMeasurementUnit$name$value),x$valueMeasurementUnit$name$value,""))}))
}   
# Function for module UI
QueryInfoUI <- function(id) {
  ns <- NS(id)
  
  tabPanel("QueryInfo", verbatimTextOutput(ns("queryText")),
           prettySwitch(inputId = "switch2", label = "App's benchmark:",status = "primary"),
           conditionalPanel(
            condition = "input.switch2",
             verbatimTextOutput(ns("time"))),
           prettySwitch(inputId = "switch3", label = "Numbers of values:",status="primary"),
           conditionalPanel(
            condition = "input.switch3",
             verbatimTextOutput(ns("value")))
            )

}

# Function for module server logic
QueryInfo <- function(input, output, session) {
  data <- reactiveValues(
    data=NULL,dsd=NULL,query=NULL,time=NULL
  )
  
  observe({
    start_time <- Sys.time()
    
    query <- parseQueryString(session$clientData$url_search)
    
####Extraction of url parameters
    
    pid <- if(!is.null(query$pid)){as.character(query$pid)}else{NULL}
    
    layer <-if(!is.null(query$layer)){as.character(query$layer)}else{NULL}
    
    wfs_server <-if(!is.null(query$wfs_server)){as.character(query$wfs_server)}else{NULL}
    
    wfs_version <-if(!is.null(query$wfs_version)){as.character(query$wfs_version)}else{NULL}

    wfs_format <- if(!is.null(query$wfs_format)){as.character(query$wfs_format)}else{"CSV"}
    
    feature_geom <-if(!is.null(query$feature_geom)){as.logical(query$feature_geom)}else{TRUE}
    
    wms_server <-if(!is.null(query$wms_server)){as.character(query$wms_server)}else{NULL}
    
    wms_version <-if(!is.null(query$wms_version)){as.character(query$wms_version)}else{NULL}
    
    csw_server <-if(!is.null(query$csw_server)){as.character(query$csw_server)}else{NULL}
    
    csw_version <-if(!is.null(query$csw_version)){as.character(query$csw_version)}else{NULL}
    
    strategy <-if(!is.null(query$strategy)){as.character(query$strategy)}else{NULL}
    
    par <-if(!is.null(query$par)){as.character(query$par)}else{NULL}
	
    x <-if(!is.null(query$x)){as.numeric(query$x)}else{NULL}
    
    y <-if(!is.null(query$y)){as.numeric(query$y)}else{NULL}
	
	  width <-if(!is.null(query$width)){as.numeric(query$width)}else{NULL}
	
	  height <- if(!is.null(query$height)){as.numeric(query$height)}else{NULL}
	
	  bbox <- if(!is.null(query$bbox)){query$bbox}else{NULL}

    srs <-if(!is.null(query$srs)){query$srs}else{"'EPSG:4326'"}

    dsd<-if (!is.null(query$dsd)){jsonlite::fromJSON(query$dsd)}else{NULL}

    #Type of shiny apps 
    shiny_type <- ifelse(!is.null(wms_server),"popup","dashboard")
    
#### Get columns definition
   
    if(!is.null(dsd)){
        names(dsd)<-c("MemberName","Definition","MemberCode","PrimitiveType","MemberType","MinOccurs","MaxOccurs","MeasureUnitSymbol","MeasureUnitName")
        dsd[is.na(dsd)]<-""
    }
    
    if(is.null(dsd)&(!is.null(csw_server))&(!is.null(csw_version))){
      print("QUERYINFO : No dsd parameter provided in url...dsd will be compute with CSW service")
        CSW <- CSWClient$new(
        url = csw_server,
        serviceVersion = csw_version,
        logger = "INFO"
        )
      
      fc <- CSW$getRecordById(paste0(pid,"_dsd"), outputSchema = "http://www.isotc211.org/2005/gfc")
      dsd<-getColumnDefinitions(fc)
      }
#####

#### Get data
    
    if(!is.null(layer)&(!is.null(wfs_server)|!is.null(wms_server))&!is.null(strategy)){
      
      #Connect to OGC WFS to get DATA
      WFS <- WFSClient$new(
        url = wfs_server,
        serviceVersion = wfs_version,
        logger = "INFO"
      )
      #Get feature type for dataset
      ft <- WFS$capabilities$findFeatureTypeByName(layer, exact = FALSE)
      
      #Get columns names for propertyName argument
      desc <- ft$getDescription(TRUE) 
      
      if(!feature_geom){
      print("QUERYINFO : FEATURE WITHOUT GEOMETRY SELECTED")
      ColumnName<-desc[!desc$geometry,"name"]
      }else{
      print("QUERYINFO : FEATURE WITH GEOMETRY SELECTED")
      ColumnName<-desc[,"name"]  
      }
      ColumnName = ColumnName[ColumnName != "fid"]
      print(ColumnName)
      propertyName<-paste(ColumnName, collapse = ',')
      print(propertyName)
      
      ###Get data feature for popup apps with WMS service
      
      if(shiny_type=="popup"){
        print("QUERYINFO : MODE POPUP SELECTED")
        
        WMS <- WMSClient$new(
          url = wms_server, 
          serviceVersion = wms_version, 
          logger = "DEBUG"
        )

        Layer <- WMS$capabilities$findLayerByName(layer)

        if(!is.null(par)){
          Data <- switch(strategy,
                            "ogc_filters"=Layer$getFeatureInfo(srs = srs,x = x, y = y, width = width, height = height, feature_count = 1000000, info_format = "application/json", bbox = bbox,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)),propertyName = propertyName)),
                            "ogc_viewparams"=Layer$getFeatureInfo(srs = srs, x = x, y = y, width = width, height = height, feature_count = 1000000, info_format = "application/json", bbox = bbox, viewparams = gsub(";", "%3B", URLencode(par)),propertyName = propertyName)
          )
        }
        
        if(is.null(par)){
          Data <- Layer$getFeatureInfo(srs = srs, x = x, y = y, width = width, height = height, feature_count = 1000000, info_format = "application/json", bbox = bbox,propertyName = propertyName)
        }
      }
      
      ###Get data feature for dashboard apps with WFS service
      
      if(shiny_type=="dashboard"){
        print("QUERYINFO : MODE DASHBOARD SELECTED")
        
        if(is.null(par)){
          Data <- ft$getFeatures(propertyName=propertyName)
        }

        if(!is.null(par)){
          Data <- switch(strategy,
                            "ogc_filters"=ft$getFeatures(outputFormat = wfs_format, propertyName=propertyName,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)))),
                            "ogc_viewparams"=ft$getFeatures(outputFormat = wfs_format, propertyName=propertyName,viewparams = gsub(";", "%3B", URLencode(par)))
          )
        }

      }
      
    #Final columns selection for data et columns informations
    #Data<-subset(Data,select=ColumnName)
    if(!is.null(dsd)){
      dsd<-subset(dsd,MemberCode%in%ColumnName)
    }
    data$data<-Data
    data$dsd<-dsd
    data$query<-query
     
    }
    
    end_time <- Sys.time()
    data$time <-end_time - start_time
    print(data$time)
    print(data$data)
    print(data)
  })
  
    # Parameters selection viewer
    output$queryText <- renderText({
      paste(sep = "",
            "pid: ", data$query$pid, "\n",
            "layer: ", data$query$layer, "\n",
            "wfs_server: ",data$query$wfs_server, "\n",
            "wfs_version: ", data$query$wfs_version, "\n",
            "wms_server: ",data$query$wms_server, "\n",
            "wms_version: ", data$query$wms_version, "\n",
            "feature_geom: ", data$query$feature_geom, "\n",
            "csw_server: ",data$query$csw_server, "\n",
            "csw_version: ", data$query$csw_version, "\n",
            "strategy: ", data$query$strategy, "\n",
            "par: ", data$query$par, "\n",
			      "x: ", data$query$x, "\n",
            "y: ", data$query$y, "\n",
			      "width: ", data$query$width, "\n",
			      "height: ", data$query$height, "\n",
			      "bbox: ", data$query$bbox, "\n",
            "srs: ",data$query$srs, "\n",
            "dsd: ",data$query$dsd, "\n"
      )
    })
  
  #Number of value selected
  output$value <- renderText({paste(sep = "","number of values : ",nrow(data$data))})
      
  #Speed to compute data
  output$time <- renderText({paste(sep = "","running time : ",round(data$time,2)," sec")})
      
  return(data)
}
####END

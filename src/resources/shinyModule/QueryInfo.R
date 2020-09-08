###This Shiny module proposes to retrieve data from WMS WFS services via url parameters. 
###The 'data' object in output containing the data, the associated metadata as well as the retrieved parameters. 
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
    
    #Extraction of url parameter
    
    pid <- if (!is.null(query$pid)){
      as.character(query$pid)
    }else{
      NULL
    }
    
    layer <-if (!is.null(query$layer)){
      as.character(query$layer)
    }else{
      NULL
    }
    
    wfs_server <-if (!is.null(query$wfs_server)){
      as.character(query$wfs_server)
    }else{
      NULL
    }
    
    wfs_version <-if (!is.null(query$wfs_version)){
      as.character(query$wfs_version)
    }else{
      NULL
    }
    
    wfs_geom <-if (!is.null(query$wfs_geom)){
      query$wfs_geom
    }else{
      TRUE
    }
    
    wms_server <-if (!is.null(query$wms_server)){
      as.character(query$wms_server)
    }else{
      NULL
    }
    wms_version <-if (!is.null(query$wms_version)){
      as.character(query$wms_version)
    }else{
      NULL
    }
    
    csw_server <-if (!is.null(query$csw_server)){
      as.character(query$csw_server)
    }else{
      NULL
    }
    
    csw_version <-if (!is.null(query$csw_version)){
      as.character(query$csw_version)
    }else{
      "2.0.2"
    }
    
    strategy <-if (!is.null(query$strategy)){
      as.character(query$strategy)
    }else{
      NULL
    }
    
    par <-if (!is.null(query$par)){
      as.character(query$par)
    }else{
      NULL
    }
    
    geom <-if (!is.null(query$geom)){
      as.character(query$geom)
    }else{
      NULL
    }
    
    x <-if (!is.null(query$x)){
      query$x
    }else{
      NULL
    }
    
    y <-if (!is.null(query$y)){
      query$y
    }else{
      NULL
    }
    
    srs <-if (!is.null(query$srs)){
      paste0("'",query$srs,"'")
    }else{
      "'EPSG:4326'"
    }
    
    dsd<-if (!is.null(query$dsd)){
      jsonlite::fromJSON(query$dsd)
    }else{
      NULL
    }
    
    # Columns definition 
   
       if(!is.null(dsd)){
        names(dsd)<-c("MemberName","Definition","MemberCode","PrimitiveType","MemberType","MinOccurs","MaxOccurs","MeasureUnitSymbol","MeasureUnitName")
        dsd[is.na(dsd)]<-""
        }
    
      if(is.null(dsd)){ 
      # #Connect to OGC CSW Catalogue to get METADATA
        CSW <- CSWClient$new(
        url = csw_server,
        serviceVersion = csw_version,
        logger = "INFO"
      )
      
      fc <- CSW$getRecordById(paste0(pid,"_dsd"), outputSchema = "http://www.isotc211.org/2005/gfc")
      dsd<-getColumnDefinitions(fc)}
    
    if(!is.null(layer)&(!is.null(wfs_server)|!is.null(wms_server))&!is.null(strategy)){
      
      
      #Connect to OGC WFS to get DATA
      WFS <- WFSClient$new(
        url = wfs_server,
        serviceVersion = wfs_version,
        logger = "INFO"
      )
      #Get feature type for dataset
      ft <- WFS$capabilities$findFeatureTypeByName(layer)
      #Get data features for dataset
      desc <- ft$getDescription(TRUE) 
      nonGeomColumn<-desc[desc$type!="geometry","name"]
      propertyName<-paste(nonGeomColumn, collapse = ',')
      coord<-NULL
      
      if(!is.null(wms_server)){
        
        WMS <- WMSClient$new(
          url = wms_server, 
          serviceVersion = wms_version, 
          logger = "INFO"
          )
        
        Layer <- WMS$capabilities$findLayerByName(layer)
        
        srs <- NULL
        crs <- NULL
        
        if(startsWith(wms_version, "1.1")){
          srs <- srs
        }else if(wms_version == "1.3.0"){
          crs <- srs
        }
        bbox <- paste0(x-0.1,",",y-0.1,",",x+0.1,",",y+0.1)
        
        if(!is.null(par)){
          Data <- switch(strategy,
                            "ogc_filters"=Layer$getFeatureInfo(srs = srs, crs = crs,x = 50, y = 50, width = 101, height = 101, feature_count = 1000000, info_format = "application/json", bbox = bbox,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)),propertyName = propertyName,)),
                            "ogc_viewparams"=Layer$getFeatureInfo(srs = srs, crs = crs,x = 50, y = 50, width = 101, height = 101, feature_count = 1000000, info_format = "application/json", bbox = bbox, viewparams = URLencode(par),propertyName = propertyName)
          )
        }
        
        if(is.null(par)){

          Layer$getFeatureInfo(srs = srs, crs = crs,x = 50, y = 50, width = 101, height = 101, feature_count = 1000000, info_format = "application/json", bbox = bbox,propertyName = propertyName)

        }
      }
      
      if(wfs_geom && is.null(wms_server)){
      if(!is.null(geom)&&!is.null(x)&&!is.null(y)){
      coord<-paste0("BBOX(",geom,",",x,",",y,",",x,",",y,",",srs,")")}
     
       if(is.null(par)&&is.null(coord)){
       Data <- ft$getFeatures() 
      } 
      if(is.null(par)&&!is.null(coord)) {
        Data <- ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
      }
      if(!is.null(par)&&is.null(coord)){
        Data <- switch(strategy,
                          "ogc_filters"=ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)))),
                          "ogc_viewparams"=ft$getFeatures(viewparams = URLencode(par))
        )
      }
      if(!is.null(par)&&!is.null(coord)){
        Data <- switch(strategy,
                          "ogc_filters"=ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(paste0(par," AND ",coord))))),
                          "ogc_viewparams"=ft$getFeatures(viewparams = URLencode(par),cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
        )
      }
      }else{
        if(!is.null(geom)&&!is.null(x)&&!is.null(y)){
          coord<-paste0("BBOX(",geom,",",x,",",y,",",x,",",y,",",srs,")")}
        if(is.null(par)&&is.null(coord)){
          Data <- ft$getFeatures(propertyName=propertyName)
        }
        if(is.null(par)&&!is.null(coord)){
          Data <- ft$getFeatures(propertyName=propertyName,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
        }
        if(!is.null(par)&&is.null(coord)){
          Data <- switch(strategy,
                            "ogc_filters"=ft$getFeatures(propertyName=propertyName,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)))),
                            "ogc_viewparams"=ft$getFeatures(propertyName=propertyName,viewparams = URLencode(par))
          )
        }
        if(!is.null(par)&&!is.null(coord)){
          Data <- switch(strategy,
                            "ogc_filters"=ft$getFeatures(propertyName=propertyName,cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(paste0(par," AND ",coord))))),
                            "ogc_viewparams"=ft$getFeatures(propertyName=propertyName,viewparams = URLencode(par),cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
          )
        }
        Data<-subset(Data,select=nonGeomColumn)
        dsd<-subset(dsd,MemberCode%in%nonGeomColumn)
      }

     data$data<-Data
     data$dsd<-dsd
     print(dsd)
     data$query<-query
    }
    end_time <- Sys.time()
    data$time<-end_time - start_time
  })
    # Show greetings
    output$queryText <- renderText({
      paste(sep = "",
            "pid: ", data$query$pid, "\n",
            "layer: ", data$query$layer, "\n",
            "wfs_server: ",data$query$wfs_server, "\n",
            "wfs_version: ", data$query$wfs_version, "\n",
            "wms_server: ",data$query$wms_server, "\n",
            "wms_version: ", data$query$wms_version, "\n",
            "wfs_geom: ", data$query$wfs_geom, "\n",
            "csw_server: ",data$query$csw_server, "\n",
            "csw_version: ", data$query$csw_version, "\n",
            "strategy: ", data$query$strategy, "\n",
            "par: ", data$query$par, "\n",
            "geom: ", data$query$geom, "\n",
            "x: ", data$query$x, "\n",
            "y: ", data$query$y, "\n",
            "srs: ",data$query$srs, "\n",
            "dsd: ",data$query$dsd, "\n"
      )
    })
      output$value <- renderText({paste(sep = "","number of values : ",nrow(data$data))})
      
      output$time <- renderText({paste(sep = "","running time : ",round(data$time,2)," sec")})
      
  
    return(data)
    }
####
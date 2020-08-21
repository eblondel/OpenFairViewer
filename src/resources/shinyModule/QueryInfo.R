###This Shiny module proposes to retrieve data from WMS WFS services via url parameters. 
###The 'data' object in output containing the data, the associated metadata as well as the retrieved parameters. 
###This module can be integrated into a shiny application intended to offer a dashboard or a popup under OpenFairViewer.

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
    data.sf=NULL,meta=NULL,query=NULL,time=NULL
  )
  
  observe({
    start_time <- Sys.time()
    
    query <- parseQueryString(session$clientData$url_search)
    #Validation of url parameter
    
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
    
    meta<-if (!is.null(query$dsd)){
      jsonlite::fromJSON(query$dsd)
    }else{
      NULL
    }
    
    
    if(!is.null(meta)){
      names(meta)<-c("MemberName","Definition","MemberCode","PrimitiveType","MemberType","MinOccurs","MaxOccurs","MeasureUnitSymbol","MeasureUnitName")
      meta[is.na(meta)]<-""
    }
    cat(nrow(meta))
    if(is.null(meta)){ 
      # #Connect to OGC CSW Catalogue to get METADATA
      CSW <- CSWClient$new(
        url = csw_server,
        serviceVersion = csw_version,
        logger = "INFO"
      )
      
      fc <- CSW$getRecordById(paste0(pid,"_dsd"), outputSchema = "http://www.isotc211.org/2005/gfc")
      meta<-getColumnDefinitions(fc)}
    if(!is.null(layer)&!is.null(wfs_server)&!is.null(wfs_version)&!is.null(strategy)){
      
      
      #Connect to OGC WFS to get DATA
      WFS <- WFSClient$new(
        url = wfs_server,
        serviceVersion = wfs_version,
        logger = "INFO"
      )
      #Get feature type for dataset
      ft <- WFS$capabilities$findFeatureTypeByName(layer)
      #Get data features for dataset
      
      coord<-NULL
      if(!is.null(geom)&&!is.null(x)&&!is.null(y)){
      coord<-paste0("BBOX(",geom,",",x,",",y,",",x,",",y,",",srs,")")}
      if(is.null(par)&&is.null(coord))data.sf <- ft$getFeatures()
      if(is.null(par)&&!is.null(coord))data.sf <- ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
      if(!is.null(par)&&is.null(coord)){
        data.sf <- switch(strategy,
                          "ogc_filters"=ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(par)))),
                          "ogc_viewparams"=ft$getFeatures(viewparams = URLencode(par))
        )
      }
      if(!is.null(par)&&!is.null(coord)){
        data.sf <- switch(strategy,
                          "ogc_filters"=ft$getFeatures(cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(paste0(par," AND ",coord))))),
                          "ogc_viewparams"=ft$getFeatures(viewparams = URLencode(par),cql_filter = gsub(" ", "%20", gsub("''", "%27%27", URLencode(coord))))
        )
      }
      #return(list(data.sf = reactive(data.sf) , 
      #            meta   = reactive(meta)))
     data$data.sf<-data.sf
     data$meta<-meta
     print(meta)
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
      output$value <- renderText({paste(sep = "","number of values : ",nrow(data$data.sf))})
      
      output$time <- renderText({paste(sep = "","running time : ",round(data$time,2)," sec")})
      
  
    return(data)
    }
####
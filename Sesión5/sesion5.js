console.log ("Ya estamos otra vez aqui")

d3.json("http://output.jsbin.com/lixujex/1.js").then (function(datos){
    console.log ("Ya he cargado correctamente los datos")                                                  
    var height=700
    var width=800
    
    var margin ={
        top: 60,
        botton: 35,
        left: 35,
        right: 50        
    }
    
    var escalaX = d3.scaleLinear()
        .domain ([0,10])
        .range (["40","500"])
    
    var escalaY = d3.scaleLinear()
        .domain (d3.extent(datos, d=> d.votantes))
        .range (["675","25"])
    
    var escalaColor = d3.scaleLinear()
        .domain ([0,10])
        .range (["blue","red"])
    
    var escalatamanio = d3.scaleLinear()
        .domain (d3.extent(datos, d=> d.votantes))  
        .range ([8,20])
        
    var elementoSVG = d3.select("body")
    .append ("svg")
    .attr ("width", width)
    .attr("height", height)
    
    elementoSVG
    .selectAll ("circle")
    .data(datos)
    .enter()
    .append("circle")
    
    //.attr ("r", 15)
    .attr ("r", d =>escalatamanio(d.votantes))
    //.attr ("cx", d=>d.mediaAutoubicacion)
    .attr ("cx", d=>escalaX(d.mediaAutoubicacion))
    //.attr("cy", d=>d.votantes)
    .attr ("cy", d=>escalaY(d.votantes))
    // COLOR DE LOS CIRCULOS
    //.attr("fill", "red")
      .attr("fill", d => escalaColor(d.mediaAutoubicacion))                                                
    //// EJES
    // VISUALIZAMOS EJE Y
    var ejeY = d3.axisLeft (escalaY)
    
    // PINTAR eje y
    elementoSVG
        .append("g")
        .attr ("transform", "translate (" + margin.left + ",0)")
        .call (ejeY)
    
    /// VISUALIZAMOS EJE X
    var ejeX = d3.axisBottom (escalaX)
    // PONER TICKS
        .ticks (5)
        .tickFormat (d3.format(".3s"))
    
    // PINTAR eje X
    elementoSVG
        .append("g")
        .attr ("transform", "translate (0," + (height - margin.botton/2) + ")")
        .call (ejeX)
    
    //// EJES                                              
                                                      
})
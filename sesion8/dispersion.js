
d3.json("https://raw.githubusercontent.com/MyoRasp/Dataset/main/Data/Herramientas_Data/datadispersion.js").then(function(datos){
    console.log("Ya hemos cargado datos.")
    
    var height = 800
    var width = 800
    
    
    
    var margin = {
        top : 5,
        botton : 100,
        left : 35,
        right :40
        
    }
    
    var escalaX = d3.scaleLinear()
    .domain(d3.extent(datos, d=> d.x))
    .range(["100", "0"])
    
    var escalaY = d3.scaleLinear()
    .domain(d3.extent(datos, d=> d.y))
    .range(["0", "100"]) //invierto el rango los que tiene 0 van a bajo y los q tienen mucho van arriba
    
    var escalaColor = d3.scaleLinear()
    .domain(d3.extent(datos,d=>d.intensidad))
    .range(["white", "red"])
    
    
    var elementoSVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    
    elementoSVG
        .selectAll("circle")
        .data(datos)
        .enter()
        .append("circle")
    
    .attr("r", 5)
    //.attr("cx", d=>d.x)
    .attr("cx", d=>escalaX(d.x))
    //.attr("cy", d=>d.y)
    .attr("cy", d=>escalaY(d.y))
    //.attr("fill", "blue")
    .attr("fill", d=> escalaColor(d.intensidad))
    .on ("mouseover", d => {
               pintarTooltip()
        })
    .on ("mouseout", borrarTooltip)
    
     //Pintat los ejes de los graficos, siempre se usa el mismo codigo para eso
    
    //EJE Visualizacion EJE Y
    var ejeY = d3.axisLeft(escalaY) // hacia donde miro, no neceariamente es el eje de la izquierda solo este es un caso en particular
    
    //Pintar eje y
    elementoSVG
        .append("g")
        .attr("transform", "translate("+ margin.left + ",0)")
        .call(ejeY)
    
    //Visualizamos Eje x
    var ejeX = d3.axisBottom(escalaX)
    // Poner Ticks
    .ticks(5)
    .tickFormat(d3.format(".3s"))
    
    //Pintar eje x
    elementoSVG
    .append("g")
    .attr("transform", "translate("+ margin.right +", " + (margin.botton)+")")
    .call(ejeX)
    // EJES
    
    var tooltip = d3.select ("body")
        .append("div")
        .attr("class","tooltip")
    
    function pintarTooltip(){
        tooltip
            //.text (d.partido)
            .text("Click Recibido")
            .style ("top", d3.event.pageY + "px")  // TçE DA LA POSICION DONDE SE HA PRODUCIDO EL EVENTO
            //.style ("left", d3.event.pageX + "px")
            // PARA QUE LA APRICION DEL TOOLTIP NO SEA BRUSCA
           //.transition()
            .style("opacity",1)
        
    }
    
    
    //BORRAR TOOLTIP
     function borrarTooltip(){
         tooltip    
           // .transition()
            .style("opacity",0)         
     }

          
})
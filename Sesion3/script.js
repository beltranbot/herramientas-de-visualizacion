console.log("Hola Que tal")

d3.json("http://output.jsbin.com/lixujex/1.js").then(function (datos) {

    console.log("Ya hemos cargado los datos");
    //window.datosglobal = datos
    // NO DEJAR

    var elementoUl = d3.select("body").append("ul");

    // Introducir todas las etiquetas li necesarias

    const escalaTamanio = d3.scaleLinear()
        // .domain([0, 3000]) // defining the domain myself
        .domain(d3.extent(datos, d => d.votantes)) // let d3 set the domain
        .range(["50px", "80px"]);
    const escalaColor = d3.scaleLinear()
        .domain([0, 10]) // valores posibles
        .range(["red", "blue"]); // entre que valores lo quiero representar

    elementoUl
        .selectAll("li") // seleccion de tantas li como haga falta
        .data(datos) // JOIN
        .enter()
        .append("li")
        //.text("hola")
        .text(function (d) { return d.partido })
        // .style("font-size", d => d.votantes)
        .style("font-size", d => escalaTamanio(d.votantes))
        // .style("font-size", 50)
        .style("color", d => escalaColor(d.mediaAutoubicacion));

})
console.log("ya estamos adentro");

let url = "http://output.jsbin.com/lixujex/1.json";
d3.json(url).then(datos => {
  console.log("ya tenemos los datos");

  let height = 700;
  let width = 800;

  let margin = {
    top: 60,
    bottom: 35,
    left: 35,
    right: 50
  };

  const escalaX = d3.scaleLinear()
    .domain([0,10])
    .range(["40", "500"]);
  const escalaY = d3.scaleLinear()
    .domain(d3.extent(datos, d => d.votantes))
    .range(["675", "25"]);
  const escalaColor = d3.scaleLinear()
    .domain([0, 10])
    .range(["blue", "red"]);
  const escalaTamanio = d3.scaleLinear()
    .domain(d3.extent(datos, d => d.votantes))
    .range(["8", "20"]);

  let elementoSVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  elementoSVG
    .selectAll("circle")
    .data(datos)
    .enter()
    .append("circle")
    // .attr("r", 15)
    .attr("r", d => escalaTamanio(d.votantes))
    // .attr("cx", d => d.mediaAutoubicacion)
    .attr("cx", d => escalaX(d.mediaAutoubicacion))
    // .attr("cy", d => d.votantes)
    .attr("cy", d => escalaY(d.votantes))
    .attr("fill", d => escalaColor(d.mediaAutoubicacion))

    // ejes
    // visualizacion eje y
    let ejeY = d3.axisLeft(escalaY)
    // pintar ejeY
    elementoSVG
      .append("g")
      .attr("transform", "translate(" + margin.left + ",0 )")
      .call(ejeY);
    // visualizamos eje X
    let ejeX = d3.axisBottom(escalaX)
      .ticks(5)
      .tickFormat(d3.format(".3s"));
      // pintar eje x
    elementoSVG
      .append("g")
      .attr("transform", "translate(0, " + (height - margin.bottom / 2) + ")")
      .call(ejeX);

    // documentacion de ejes: https://github.com/d3/d3-axis
});

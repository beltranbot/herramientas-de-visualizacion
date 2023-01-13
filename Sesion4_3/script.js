console.log("ya estamos adentro");

let url = "http://output.jsbin.com/lixujex/1.json";
d3.json(url).then(datos => {
  console.log("ya tenemos los datos");

  let height = 500;
  let width = 500;

  let elementoSVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(datos)
    .enter()
    .append("circle")
    .attr("r", 15)
    .attr("cx", d => d.mediaAutoubicacion)
    .attr("cy", d => d.votantes)
});

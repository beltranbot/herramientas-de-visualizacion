d3.json("http://output.jsbin.com/lixujex/1.js").then(data => {
  let height = 700;
  let width = 800;

  let escalaX = d3.scaleLinear()
    .domain([0, 10])
    .range(["40", "500"]);
  let escalaY = d3.scaleLinear()
    .domain(d3.extent(data, d => d.votantes))
    .range([675, 25]);
  let escalaColor = d3.scaleLinear()
    .domain([0, 10])
    .range(["blue", "red"]);
  let escalaTamanio = d3.scaleLinear()
    .domain(d3.extent(data, d => d.votantes))
    .range([8, 20]);
  let margin = {
    top: 60,
    bottom: 35,
    left: 35,
    right: 50
  };

  let elementoSVG = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  elementoSVG.selectAll("circle")
    .data(data)
    .enter() // join with data
    .append("circle")
    // .attr("r", 10)
    .attr("r", d => escalaTamanio(d.votantes))
    // .attr("cx", d => d.mediaAutoubicacion)
    // .attr("cy", d => d.votantes)
    .attr("cx", d => escalaX(d.mediaAutoubicacion))
    .attr("cy", d => escalaY(d.votantes))
    .attr("fill", d => escalaColor(d.mediaAutoubicacion));

  let ejeY = d3.axisLeft(escalaY)
  // display y axis eje y
  elementoSVG.append("g")
    .attr("transform", "translate (" + margin.left + ",0)")
    .call(ejeY);
  var ejeX = d3.axisBottom(escalaX)
    // display ticks
    .ticks(5)
    .tickFormat(d3.format(".3s"));

  // display x axis
  elementoSVG
    .append("g")
    .attr("transform", "translate (0," + (height - margin.bottom / 2) + ")")
    .call(ejeX);

  // axis documentation: https://github.com/d3/d3-axis
});

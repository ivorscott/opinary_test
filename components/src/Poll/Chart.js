import * as d3 from "d3";

export const drawChart = (data) => {
  const h = 100;
  const w = 200;
  const margin = { top: 0, right: 0, bottom: 10, left: 5 };
  const height = h - margin.top - margin.bottom;
  const width = w - margin.left - margin.right;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, height - 60]);

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.option))
    .padding(0.4);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickSize(0));

  const bar = svg.selectAll("rect").data(data);

  bar
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.option))
    .attr("y", () => height)
    .attr("width", 30)
    .attr("height", 0)
    .attr("fill", "#c2ec5a")
    .transition()
    .duration(300)
    .attr("height", (d) => yScale(d.value))
    .attr("y", (d) => height - yScale(d.value));

  const g = svg.append("g");

  const text = g.selectAll(".text").data(data);

  text
    .enter()
    .append("text")
    .attr("class", "text")
    .attr("x", (d) => xScale(d.option))
    .attr("y", (d) => 100 - yScale(d.value) - 15)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .text((d) => d.value);
};

export const mapChartData = (results, choices) =>
  Object.keys(results).map((option) => ({
    option,
    text: choices[option],
    value: results[option],
  }));

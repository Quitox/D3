//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const lista = document.querySelector("section#datos > ol");

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

//let dataset;

const graficar = (dataset) => {

//const w = window.innerWidth * .80
//const h = window.innerHeight * .80

// Specify the chart’s dimensions.
const width = 928/1.5;
const height = 500/1.5;
const marginTop = 20;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 50;
const cantidad = dataset.length
const zonaGraf = width-marginLeft-marginRight;
const barWidth = (zonaGraf)/cantidad

//console.log("barWidth = " + barWidth );

// Procesamiento de datos
const fechas = dataset.map(x => {
    const fecha = new Date(x[0])
    const dia = 1;
    return new Date(fecha.setDate(fecha.getDate() + dia));
});
const montos = dataset.map(x => x[1]);
//console.log(fechas)
//console.log(montos)

// Create scale
const x_min = d3.min(fechas);
const x_max = d3.max(fechas);

const y_min = 0; //d3.min(montos);
const y_max = d3.max(montos);

const xScale = d3.scaleUtc()
    .domain([x_max, x_min])
    .range([marginLeft, width-marginLeft]);

const yScale = d3.scaleLinear()
    .domain([y_max, y_min])
    .range([marginBottom, (height - marginBottom)]);

console.log("------------Domain------------")
console.log("X min : "+ xScale(x_min))
console.log("X max : "+ xScale(x_max))
console.log("Y min : "+ yScale(y_min))
console.log("Y max : "+ yScale(y_max))

// Add a SVG element
const svg = d3.select("#grafico")
.append("svg")
.attr("id", "grafico-svg")
.attr("width", width)
.attr("height", height)
.style("background", `linear-gradient(0deg, white ${marginBottom-5}px , green ${marginBottom-10}px, white)`);


// Add the x-axis.
const xAxis = d3.axisBottom(xScale);

svg.append("g")
.attr("transform", `translate(0,${height - marginBottom})`)
.call(xAxis);

// Add the y-axis.
const yAxis = d3.axisLeft(yScale);

svg.append("g")
.attr("transform", `translate(${marginLeft}, 0)`)
.style("fill", `white`)
.call(yAxis);

console.log(montos)

console.log(montos.map(x=>yScale(x)))

// Data - Bar element
svg.selectAll("rect")
    .data(montos)
    .enter()
    .append("rect")
    .attr("data-date", (d,i)=> fechas[i])
    .attr("data-monto", (d,i)=> montos[i])
    .attr("x", (d,i) => marginLeft + i*barWidth)
    .attr("y", (d,i) => 0)//height - marginBottom - yScale(d))
    .attr("width", barWidth)
    .attr("height", (d) => yScale(d) )
    .attr("fill", "navy")
}

function inicio(url){

    fetch(url)
        .then(datos => datos.json())
        .then(jsonData => {
            
            const datos = jsonData.data;
            
            graficar(datos);
            
            datos.forEach(x => {
                
                lista.innerHTML += `<li>Fecha: ${x[0]} | Monto: ${x[1]}</li>`;
                
            });
            
        }).catch((err) => console.log(err))

}

inicio(url);
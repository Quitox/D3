
const dataset = [
    [1,10],
    [2,20],
    [3,30],
    [4,40],
    [5,50]
];

console.log(dataset)

const width = 800;
const height = width/2;
const marginLR = 40;
const marginUB = 40;// 20/2;
const widthBars =(width-marginLR*2)/dataset.length ;

const svg = d3.select("section#grafico")
    .append("svg")
    .attr("id", "grafico-svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "red");

const xData = dataset.map(x=>x[0])
const yData = dataset.map(x=>x[1])

const xMinVal = d3.min(xData) //1
const xMaxVal = d3.max(xData) //5
const yMinVal = d3.min(yData) //10
const yMaxVal = d3.max(yData) //50

const xScale = d3.scaleLinear()
    .domain([0, xMaxVal])
    .range([marginLR, (width-marginLR*2)]);

const yScale = d3.scaleLinear()
    .domain([yMaxVal, 0 ])
    .range([marginUB, (height-marginUB)]);
    

// Add the Axis.
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("transform", `translate(0,${height - marginUB})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${marginLR},${marginUB/10000})`)
    .call(yAxis);



svg.selectAll("rect")
    .data(dataset)    
    .enter()
    .append("rect")
    .attr("class", "svg-bars")
    .attr("x",(d,i)=>width - marginLR - i*widthBars)
    .attr("y",(d,i)=>height - d[i]) 
    .attr("width", widthBars)
    .attr("height", d=> d[1])
    .style("border", "1px solid green")
    .style("background", "white")


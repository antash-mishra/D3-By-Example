//import 'd3.v7.js';


dataset =  [ 5,10,15,20,25 ];

// Text based D3 Element
d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text((d) => { return "Lets fuck off in " + d; })
    .style("color",(d) => {
        if (d>15) {
            return "Red"
        }
        else
            return "Black"
    })


//SVG related variables
var w = 500; // width of SVG canvas
var h = 300; //Height of SVG canvas
var barPadding = 1; // Padding for bar chart
var scatterplotPadding = 30; // Padding for Scatter Plot

//Creating SVG DOM
var svg = d3.select('body').append('svg').attr("width", w).attr("height", h);

//Creating circles with D3 SVG
var circles = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle');

circles.attr('cx', function(d, i)  {
    return (i * 50) + 25;
})
.attr('cy', h/2)
.attr('r', (d) => {
    return d;
})
.attr("fill", "yellow")
.attr("stroke", "orange")
.attr("stroke-width", (d) => {
    return d/2;
});


// Bar chart using D3
var barChartSVG = d3.select('body').append('svg').attr("width", w).attr("height", h);
dataset2 = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

barChartSVG.selectAll('rect')
    .data(dataset2)
    .enter()
    .append("rect")
    .attr('x', (d,i) => {
        return i*(w/dataset2.length);
    })
    .attr('y',(d) => {
        return h-(d*4);
    })
    .attr('width', w/dataset2.length - barPadding)
    .attr('height', (d) => {
        return d*4;
    })
    .attr("fill", (d)=> {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })

barChartSVG.selectAll("text")
    .data(dataset2)
    .enter()
    .append("text")
    .text((d) => {
        return d;
    })
    .attr("x", (d,i)=> {
        return i*(w/dataset2.length)+ (w/dataset2.length - barPadding) / 2;
    })
    .attr("y", (d) => {
        return h-(d*4)+14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");


var dataset3 = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
];

// SVG for scatter Plot
var scatterPlotSVG = d3.select('body').append('svg').attr('width', w).attr("height", h+100)


var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset3, (d) => {
        return d[0];
    })])
    .range([scatterplotPadding, w - scatterplotPadding * 2]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset3, (d) => {
        return d[1];
    })])
    .range([h - scatterplotPadding,scatterplotPadding]);

var rScale = d3.scaleSqrt()
    .domain([0, d3.max(dataset3, (d) => {
        return d[1];
    })])
    .range([0,10]);

var xAxis = d3.axisBottom().scale(xScale).ticks(5);

var yAxis = d3.axisLeft().scale(yScale).ticks(5);


// scatterPlotSVG
//     .append("text")
//     .text("This is ScatterPlot")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "20px");


// Scatter Plot
scatterPlotSVG.selectAll("circle")
    .data(dataset3)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
        return xScale(d[0]);
    })
    .attr("cy", (d)=> {
        return yScale(d[1]);
    })
    .attr("r",  (d) => {
        return rScale(d[1]);
    });

// Adding label to scatterPlot
scatterPlotSVG.selectAll("text")
    .data(dataset3)
    .enter()
    .append("text")
    .text((d) => {
        return d[0] + "," + d[1];
    })
    .attr("x", (d) => {
        return xScale(d[0]);
    })
    .attr("y", (d)=> {
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

// Adding X-Axis
scatterPlotSVG.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " +  (h - scatterplotPadding) + ")")
    .call(xAxis);

// Adding Y-Axis
scatterPlotSVG.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + scatterplotPadding + ", 0)")
    .call(yAxis);

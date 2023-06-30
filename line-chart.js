const margin = {top: 10, right: 30, bottom: 30, left:50},
    width = 460 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#area_chart").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom)
            .append("g")
            .attr("transform", 
            `translate(${margin.left}, ${margin.top})`);


var dataset = d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv", 
    d => {
        return {
            date: d3.timeParse("%Y-%m-%d")(d.date),
            value: d.value
        }
    }).then(
        (dataset) => {
            console.log(d3.extent(dataset, d => d.date))
            xScale = d3.scaleTime()
                .domain(d3.extent(dataset, d => d.date))
                .range([0, width]);

            yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => +d.value)])
                .range([height, 0]);

            xAxis = d3.axisBottom(xScale);
            yAxis = d3.axisLeft(yScale);

            svg.append("text")
                .datum(dataset)
                .text((data) => {
                    return data.date + "," + data.value;
                })
                .attr("x", (d) => {
                    return xScale(d.date);
                })
                .attr("y", (d)=> {
                    return yScale(d.value);
                })

            var toolTip = d3.select("#area_chart")
                            .append("div")
                            .style("opacity", 0)
                            .attr("class", "tooltip")
                            .style("background-color", "white")
                            .style("border", "solid")
                            .style("border-width", "1px")
                            .style("border-radius", "3px")
                            .style("padding", "10px")
                            .style("position", "absolute")
            
            const showTooltip= (event, d) => {
                toolTip.transition()
                    .duration(100)
                    .style("opacity", 1)
                toolTip.html(`x: hello <br> y: ${d.value}`)
                    .style("left",(event.x) + 50 + "px")
                    .style("top", (event.y) + "px")
            }

            var moveTooltip = (event, d) => {
                toolTip.style("left", (event.x)+50 + "px")
                        .style("top", (event.y) + "px")
            }

            var hideTooltip = (event, d) => {
                toolTip.transition()
                    .duration(100)
                    .style("opacity", 0)
            }
            
            
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            svg.append("g")
                .call(yAxis);
            

            svg.append("path")
                .datum(dataset)
                .attr("fill", "#cce5df")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1.5)
                .attr("d", d3.area()
                .x(dataset => xScale(dataset.date))
                .y0(yScale(0))
                .y1(dataset => yScale(dataset.value)))
                .on("mouseover", showTooltip)
                .on("mousemove", moveTooltip)
                .on("mouseleave", hideTooltip)

        
        }
    );

    



            d3.csv('out5.csv', d => {
                return {
                    date: d3.timeParse("%Y-%m-%d")(d.season),
                    batsman: d.batsman,
                    cum_runs: +d.CUM_RUNS,
                }
            }).then(data => {
                //console.log(data)
                k = 10
                n = 12
                const margin = {top: 16, right: 6, bottom: 6, left: 0},
                            width = 460 - margin.right - margin.left,
                            barSize = 48,
                            height = margin.top + barSize * n + margin.bottom;
                groupedData = d3.group(data, d => d.batsman)
                batsman = new Set(data.map(d => d.batsman))
                console.log(batsman.size)
                datevalues  = Array.from(d3.rollup(data, ([d]) => +d.cum_runs, d => +d.date, d => d.batsman))
                .map(([date, data]) => [new Date(date), data])
                .sort(([a], [b]) => d3.ascending(a, b))
                
                //console.log(datevalues);  
                //console.log(rank(batsman,name => datevalues[0][1].get(name)))
                
                const keyframes = [];
                let ka, a, kb, b;
                for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
                    for (let i = 0; i < k; ++i) {
                        const t = i / k;
                        keyframes.push([
                            new Date(ka * (1 - t) + kb * t),
                            rank(batsman,name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                        ]);
                    }
                }
                
                keyframes.push([new Date(kb), rank(batsman, name => b.get(name) || 0)]);
                console.log(keyframes.flatMap(([, data]) => data))

                nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)
                prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
                next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
                console.log(prev)

                xScale = d3.scaleLinear([0, 1], [margin.left, width - margin.right])
                            .domain([0, keyframe[1][0].value])

                yScale = d3.scaleBand()
                        .domain(d3.range(n + 1))
                        .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
                        .padding(0.1)

                const svg = d3.select("#bar_chart").append("svg")
                .attr("viewBox", [0,0,width, height])

                
            });

function rank(batsman, value) {
    const datas = Array.from(batsman, name => ({name, value: value(name)}));
    //console.log(datas)
    datas.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < datas.length; ++i) datas[i].rank = Math.min(n, i);
    return datas;
}
                        
            // console.log(dataset)
            //         n = 12
            //         data = d3.group(dataset, d => d.batsman).filter(d => d.name === "G Gambhir");
            //         batsman = new Set(dataset.map(d => d.batsman)) 
            //         console.log(data);
            //         xScale = d3.scaleBand()
            //             .domain(dataset.map(d => d.batsman))
            //             .range([0, width])
            //             .padding(0.1);
        
            //         yScale = d3.scaleLinear()
            //             .domain([0, d3.max(dataset, d => +d.CUM_RUNS)])
            //             .range([height, 0]);
        
            //         xAxis = d3.axisBottom(xScale);
            //         yAxis = d3.axisLeft(yScale);
        
                   
            //         svg.append("g")
            //             .attr("transform", `translate(0, ${height})`)
            //             .call(xAxis);
        
            //         svg.append("g")
            //             .call(yAxis);

            //         let currentState = 0;
            //         const categories = [...new Set(dataset.map(d => d.batsman))];
                    

        
            //         svg.append("rect")
            //             .datum(dataset[currentState])
            //             .attr("fill", "#cce5df")
            //             .attr("stroke", "#69b3a2")
            //             .attr("stroke-width", 1.5)
            //             .attr("x", d => xScale(d.year))
            //             .attr("y", d => yScale(d.CUM_RUNS))
            //             .attr("width",  xScale.bandwidth() / categories.length)
            //             .attr("height",  d => height - yScale(d.value))
        
        


// Prepare your data in the required format
// const data = [
//     { year: 2010, category: "category1", value: 10 },
//     { year: 2010, category: "category2", value: 20 },
//     { year: 2010, category: "category3", value: 15 },
//     { year: 2011, category: "category1", value: 12 },
//     { year: 2011, category: "category2", value: 18 },
//     { year: 2011, category: "category3", value: 20 },
//     { year: 2012, category: "category1", value: 8 },
//     { year: 2012, category: "category2", value: 25 },
//     { year: 2012, category: "category3", value: 18 }
//   ];
  
//   // Set up the SVG container
//   const svgWidth = 800;
//   const svgHeight = 400;
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = svgWidth - margin.left - margin.right;
//   const height = svgHeight - margin.top - margin.bottom;
  
//   const svg = d3.select("body")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);
  
//   const g = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
//   // Set up scales
//   const xScale = d3.scaleBand()
//     .domain(data.map(d => d.year))
//     .range([0, width])
//     .padding(0.1);
  
//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.value)])
//     .range([height, 0]);
  
//   // Create x-axis
//   g.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(xScale));
  
//   // Create y-axis
//   g.append("g")
//     .call(d3.axisLeft(yScale));
  
//   // Define the initial state of the bar chart
//   let currentState = 0;
//   const categories = [...new Set(data.map(d => d.category))];
  
//   // Create the initial bar chart
//   g.selectAll("rect")
//     .data(data.filter(d => d.year === data[currentState].year))
//     .enter()
//     .append("rect")
//     .attr("x", d => xScale(d.year) + xScale.bandwidth() / categories.length * categories.indexOf(d.category))
//     .attr("y", d => yScale(d.value))
//     .attr("width", xScale.bandwidth() / categories.length)
//     .attr("height", d => height - yScale(d.value))
//     .attr("fill", d => {
//       if (d.category === "category1") return "steelblue";
//       if (d.category === "category2") return "orange";
//       if (d.category === "category3") return "green";
//     });
  
//   // Define the update function to transition between states
//   function update() {
//     g.selectAll("rect")
//       .data(data.filter(d => d.year === data[currentState].year))
//       .transition()
//       .duration(1000)
//       .attr("y", d => yScale(d.value))
//       .attr("height", d => height - yScale(d.value));
//   }

//   setInterval(() => {
//     currentState = (currentState + 1) % data.length;
//     update();
//   }, 2000);
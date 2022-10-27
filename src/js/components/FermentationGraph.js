import React from "react";
import * as d3 from 'd3';

const FermentationGraph = (props) => {
    
    const width = 400;
    const height = 400;
    const padding = 75;

    React.useEffect (() => {
        
        //console.log("inside graph");
        //console.log(props.fermentationItem);
        if(props.fermentationItem)
            createPlot();
    }, [props.fermentationItem]);

    const createPlot = () => {

        let eventProperties = ["ph", "dissolvedOxygen", "temperature"];
        
        //graph data for each line to represent event properties
        let graphData = eventProperties.map( (eventProperty) => {
             
            return {
                name: eventProperty,
                values: props.fermentationItem[eventProperty].map((d, i) => {
                    return {
                        eventNo: i + 1,
                        value: d
                    };
                })
            };
        });
        //console.log("graph data");
        console.log(graphData);

        //color scale - one color for each event property
        let propertyColors = d3.scaleOrdinal()
            .domain(eventProperties)
            .range(d3.schemeSet1);

        // add tooltip to the area
        let tooltip = d3.select("#scatter-plot").append("div")
        .attr("id", "tooltip").style("opacity", 0);
       
        let svgArea = d3.select("#scatter-plot").append("svg")
            .attr("height", height + padding)
            .attr("width", width + padding + 50);
            
        //label x-axis
        svgArea.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -160)
            .attr('y', 10)
            .style('font-size', 15)
            .text('Value');
        
        //label y-axis
        svgArea.append("text")
            .attr('class', 'x-axis-label')
            .attr("x", width-(padding/5))
            .attr('y', (height + padding))
            .style('text-anchor', 'end')
            .style('font-size', 15)
            .text("Event");
        
        //finding maximum number of events occured. because some events didn't occur at each timestamp 
        let xMax = graphData.reduce((max, current) =>{
            if(max > current.values.length)
                return max;
            else return current.values.length;
        }, 0);
        //console.log("xmax " + xMax);

        // add x-axis
        let xScale = d3.scaleLinear()
            .domain([0, xMax])
            .range([0, width]);
        let xAxis = d3.axisBottom(xScale);
        
        svgArea.append("g")
            .attr('transform', 'translate(' + padding / 2 + "," + (height + padding / 2) + ')')
            .attr("id", "x-axis")
            .call(xAxis);

        //finding maximum value of the events occured.
        const maxValue = (array) => {
            return array.reduce((a, b) => {
                if(a > b) 
                    return a;
                else return b;
            });
            
        };
        let maxPh = maxValue(props.fermentationItem.ph);
        let maxOxygen = maxValue(props.fermentationItem.dissolvedOxygen);
        let maxTemp = maxValue(props.fermentationItem.temperature);
        
        let yMax = maxValue([maxPh, maxOxygen, maxTemp]);
        //console.log("ymax " + yMax);
        
        // add x-axis
        let yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([height, 0]);
        let yAxis = d3.axisLeft(yScale);
        
        svgArea.append("g")
            .attr("transform", "translate(" + padding / 2 + ", " + ( padding / 2) + ")")
            .attr("id", "y-axis")
            .call(yAxis);

        //add lines
        let line = d3.line()
            .x((d) =>  xScale(d.eventNo)+ padding / 2)
            .y((d) => yScale(d.value)+ padding / 2);

        svgArea.selectAll(".line")
            .data(graphData)
            .enter()
            .append("path")
            .attr("d", (d) => line(d.values))
            .attr("stroke", (d) => propertyColors(d.name))
            .style("stroke-width", 4)
            .style("fill", "none");
        
        // add points
        svgArea.selectAll(".dot")
            .data(graphData)
            .enter()
            .append('g')
            .style("fill", (d) => propertyColors(d.name))
            .selectAll("myPoints")
            .data((d) => d.values)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.eventNo) + padding / 2)
            .attr("cy", (d) => yScale(d.value) + padding / 2)
            .attr("r", 5)
            .attr("stroke", "white")
            .on("mouseover", (event, d) => { //add tooltip
                tooltip.style("opacity", 0.8);
                tooltip.attr('value', d.value);
                tooltip.html(d.value)
                .style('left', event.pageX + 'px')
                .style('top', event.pageY - 28 + 'px');
            }).on("mouseout", () =>{
                return tooltip.style("opacity", 0);
            });
        //add legend at the end of the lines
        svgArea.selectAll(".label")
            .data(graphData)
            .enter()
            .append("g")
            .append("text")
            .datum((d) => {return {name: d.name, value: d.values[d.values.length - 1]}})    
            .attr("transform", (d) => "translate(" + xScale(d.value.eventNo) + "," + yScale(d.value.value) + ")")
            .attr("x", 44)
            .attr("y", 42)
            .text((d) => d.name)
            .style("fill", (d) => propertyColors(d.name))
            .style("font-size", 12)
    


    }

    return (
        <div>
            <div id='container'>
                <div id='title'>Fermentation Parameters</div>
                <div id='scatter-plot'></div>
            </div>
        </div>
        
    );

}

export default FermentationGraph;
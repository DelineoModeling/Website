import { useD3 } from './useD3';
import React from 'react';
import * as d3 from 'd3';

function LineChart(props, labels, titles, colors) {
    var data = props.data[0]
    const height = props.height;
    const width = props.width;

    const ref = useD3(
        (svg) => {
            const margin = { top: 30, right: 250, bottom: 30, left: 80 };
            var casedata = data.data;
            const textColor = "#222629"
            svg.append("text").attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", 20).style('fill', textColor).style("text-anchor", "middle").style("font-family", "Montserrat").text(titles[0]);

            const x = d3
                .scaleBand()
                .domain(casedata.map((d) => d.date.month + "/" + d.date.day + "/" + d.date.year))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const max = d3.max(casedata, (d) => labels.length > 1 ? d.breakdown[labels[0]] : d[labels[0]])

            const y = d3
                .scaleLinear()
                .domain([0, 1.1 * max])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .style("color", textColor)
                    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)")
                    .call((g) =>
                        g
                            .append("text")
                            .attr("class", "x label")
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "middle")
                            .attr("x", width / 3)
                            .attr("y", margin.bottom + 20)
                            .style("fill", textColor)
                            .style("font-family", "Montserrat")
                            .style("font-size", '1rem')
                            .text(titles[2])
                    );

            const yAxis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", textColor)
                    .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
                    .call((g) =>
                        g
                            .append("text")
                            .attr("x", -height / 2)
                            .attr("y", -50)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "middle")
                            .attr("transform", "rotate(-90)")
                            .style("font-family", "Montserrat")
                            .style("font-size", '1rem')
                            .text(titles[1])
                    );

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(yAxis);

            labels.map((l, i) => {
                svg
                    .append("path")
                    .datum(casedata)
                    .attr("fill", "none")
                    .attr("stroke", colors[i])
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x(function (d) {
                            return x(d.date.month + "/" + d.date.day + "/" + d.date.year)
                        })
                        .y(function (d) {
                            if (labels.length > 1)
                                return y(d.breakdown[l])
                            return y(d[l])
                        })
                    );
            })
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 400,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}

export default LineChart;
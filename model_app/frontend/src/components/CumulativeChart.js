import { useD3 } from './useD3';
import React from 'react';
import * as d3 from 'd3';

function CumulativeChart(props) {
    var data = props.data[0]

    const ref = useD3(
        (svg) => {
            const height = 400;
            const width = 1200;
            const margin = { top: 30, right: 250, bottom: 30, left: 80 };
            var casedata = data.data;
            svg.append("text").attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", 20).style('fill', 'white').style("text-anchor", "middle").style("font-family", "Montserrat").text("Total infection count over time");

            const x = d3
                .scaleBand()
                .domain(casedata.map((d) => d.date.day))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const min = d3.min(casedata, (d) => d.totalcases);
            const max = d3.max(casedata, (d) => d.totalcases)

            const y = d3
                .scaleLinear()
                .domain([0.9 * min, 1.1 * max])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
                    .call((g) =>
                        g
                        .append("text")
                        .attr("class", "x label")
                        .attr("text-anchor", "end")
                        .attr("x", width)
                        .attr("y", height - 6)
                        .style("font-family", "Montserrat")
                        .text("Date")
                    );

            const yAxis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "#66FCF1")
                    .call(d3.axisLeft(y).ticks(null, "s"))
                    .call((g) => g.select(".domain").remove())
                    .call((g) =>
                        g
                            .append("text")
                            .attr("x", -height / 2)
                            .attr("y", -30)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "start")
                            .attr("transform", "rotate(-90)")
                            .style("font-family", "Montserrat")
                            .style("font-size", '1rem')
                            .text("Total Cases")
                    );

            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(yAxis);

            svg
                .append("path")
                .datum(casedata)
                .attr("fill", "none")
                .attr("stroke", "#66FCF1")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) {
                        return x(d.date.day)
                    })
                    .y(function (d) {
                        return y(d.totalcases)
                    })
                );
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
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

export default CumulativeChart;
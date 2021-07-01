import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as d3 from 'd3';
import LineChart from "./SimuLineChart";

const styles = (theme) => ({
    poisWrapper: {
        width: '600px',
        height: '200px',
        margin: '30px 250px 30px 80px'
    },
});

let colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

var getData = () => {
    var data = {};

    axios
        .get(`./simulations/`, {
            params: {
                year: '2020'
            }
        })
        .then((res) => {
            data = res.data;
            console.log("data retrieved");
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log("Request canceled:", err.message);
            } else {
                console.log(err);
            }
        });
    // return data;
    return [
        {year: 1980, efficiency: 24.3, sales: 8949000},
        {year: 1985, efficiency: 27.6, sales: 10979000},
        {year: 1990, efficiency: 28, sales: 9303000},
        {year: 1991, efficiency: 28.4, sales: 8185000},
        {year: 1992, efficiency: 27.9, sales: 8213000},
        {year: 1993, efficiency: 28.4, sales: 8518000},
        {year: 1994, efficiency: 28.3, sales: 8991000},
        {year: 1995, efficiency: 28.6, sales: 8620000},
        {year: 1996, efficiency: 28.5, sales: 8479000},
        {year: 1997, efficiency: 28.7, sales: 8217000},
        {year: 1998, efficiency: 28.8, sales: 8085000},
        {year: 1999, efficiency: 28.3, sales: 8638000},
        {year: 2000, efficiency: 28.5, sales: 8778000},
        {year: 2001, efficiency: 28.8, sales: 8352000},
        {year: 2002, efficiency: 29, sales: 8042000},
        {year: 2003, efficiency: 29.5, sales: 7556000},
        {year: 2004, efficiency: 29.5, sales: 7483000},
        {year: 2005, efficiency: 30.3, sales: 7660000},
        {year: 2006, efficiency: 30.1, sales: 7762000},
        {year: 2007, efficiency: 31.2, sales: 7562000},
        {year: 2008, efficiency: 31.5, sales: 6769000},
        {year: 2009, efficiency: 32.9, sales: 5402000},
        {year: 2010, efficiency: 33.9, sales: 5636000},
        {year: 2011, efficiency: 33.1, sales: 6093000},
        {year: 2012, efficiency: 35.3, sales: 7245000},
        {year: 2013, efficiency: 36.4, sales: 7586000},
        {year: 2014, efficiency: 36.5, sales: 7708000},
        {year: 2015, efficiency: 37.2, sales: 7517000},
        {year: 2016, efficiency: 37.7, sales: 6873000},
        {year: 2017, efficiency: 39.4, sales: 6081000},
      ]
}

class Graphs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: getData()
        }

        this.handleClick = this.handleClick.bind(this)
        this.updateStyleAndAttrs = this.updateChart.bind(this)
    }

    handleClick() {
        this.setState({
            data: getData()
        })
    }

    updateChart() {
        let maxRadius = 40
        let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
        let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
        let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])

        let u = d3.select(this.svgEl)
            .selectAll('circle')
            .data(this.state.data)

        u.enter()
            .append('circle')
            .merge(u)
            .transition()
            .duration(1000)
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', d => rScale(d.r))
            .style('fill', d => colours[d.colour])

        u.exit().remove()
    }

    componentDidMount() {
        this.updateChart()
    }

    componentDidUpdate() {
        this.updateChart()
    }

    


    render() {
        const { data, loading } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.poisWrapper}>
                <svg
                    width={this.props.width}
                    height={this.props.height}
                    ref={el => this.svgEl = el} >
                </svg>
                <div><button onClick={this.handleClick}>Update</button></div>
                <LineChart data={data}/>
            </div>

        )
    }

};

export default withStyles(styles)(Graphs);
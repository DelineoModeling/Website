import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import CumulativeChart from "./CumulativeChart";
import DailyChart from "./DailyChart"
import { curveLinear } from 'd3-shape';

const styles = (theme) => ({
});
var getData = () => {
    var data = [];

    // axios
    //     .get("https://covidmod.isi.jhu.edu", {
    //         params: {
    //             year: '2020'
    //         }
    //     })
    //     .then((res) => {
    //         data = res.data;
    //         console.log("data retrieved");
    //     })
    //     .catch((err) => {
    //         if (axios.isCancel(err)) {
    //             console.log("Request canceled:", err.message);
    //         } else {
    //             console.log(err);
    //         }
    //     });
    // return data;
    data = [   //copied dummy data for now
        {
            case_distribution: {
                school: '',
                restaurant: '',
                gym: '',
                bar: ''
            },

            initial_cases: 0,

            data: [
                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '02'
                    },
                    'newcases': '24'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '03'
                    },
                    'newcases': '21'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '04'
                    },
                    'newcases': '19'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '05'
                    },
                    'newcases': '9'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '06'
                    },
                    'newcases': '14'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '07'
                    },
                    'newcases': '24'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '08'
                    },
                    'newcases': '14'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '09'
                    },
                    'newcases': '68'
                },

                {
                    'date': {
                        'year': '2020',
                        'month': '04',
                        'day': '10'
                    },
                    'newcases': '28'
                }
            ]
        }

    ]
    
    getTotalCases(data[0])
    
    return data;
}

function getTotalCases(data) {
    var totalCount = data.initial_cases
    return data['data'].map((entry, i) => {
        totalCount += parseInt(entry['newcases'])
        entry['totalcases'] = totalCount
        entry['newcases'] = parseInt(entry['newcases'])
        return 0;
    })
}

class Graphs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: getData()
        }
    }

    render() {
        const { data} = this.state;
        const { classes } = this.props;
        return (
            <div>
                <CumulativeChart data={data} />
                <DailyChart data={data} />
            </div>
        )
    }

};

export default withStyles(styles)(Graphs);
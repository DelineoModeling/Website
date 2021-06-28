import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";


const styles = (theme) => ({
});

class Graphs extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false
        };
    }

    handleOnClick = () => {
        axios
            .get('url-to-be-edited', {
                params: {
                    year: '2020'
                }
            })
            .then((res) => {
                this._isMounted &&
                    this.setState({ loading: false, data: [...res.data] });
                console.log("data retrieved");
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                } else {
                    console.log(err);
                }
            });
    }

    parseData = () => {

    }

    render() {
        const { data, jobId, loading } = this.state;
        const { classes } = this.props;

        return (
            <div>

            </div>
        )
    }

};

export default withStyles(styles)(Graphs);
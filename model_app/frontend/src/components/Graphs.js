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
            loading: false,
            jobId: null,
        };
        this._isMounted = false;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.source = axios.CancelToken.source();
    }


    handleOnClick = () => {

        // if user had an existing job request, delete that
        if (this.state.jobId) {
            axios
                .delete(`./simulations/${this.state.jobId}`, {
                    cancelToken: this.source.token,
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("Request canceled:", err.message);
                    } else {
                        console.log(err);
                    }
                });
        }

        axios
            .get(`./simulations/`, {
                cancelToken: this.source.token,
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

    componentWillUnmount() {
        this._isMounted = false;
        this.source.cancel("Operation canceled by the user.");

        // remove existing job request, if it existed
        if (this.state.jobId) {
            axios
                .delete(`./simulations/${this.state.jobId}`)
                .catch((err) => console.log(err));
        }
    }

    render() {
        const { data, jobId, loading } = this.state;
        const { classes } = this.props;

        return (
            
        )
    }

};

export default withStyles(styles)(Graphs);
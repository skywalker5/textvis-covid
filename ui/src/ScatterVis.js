import React from 'react';
import { withTheme } from '@material-ui/core/styles'; // we use theme to pass color to svg elements
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import api from './api'
import {scaleLinear} from "d3-scale";
import { max } from 'd3-array'
import { select } from 'd3-selection'
import ClusterChart from './ClusterChart'
import GraphChart from './GraphChart'
import Button from '@material-ui/core/Button';

class ScatterVis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mode:-1, data_points:null};
        
        this.buttonClicked1 = this.buttonClicked1.bind(this);
        this.buttonClicked2 = this.buttonClicked2.bind(this);
    }

    buttonClicked1(){
        axios.get(`${api}/scatter`)
        .then(response => {
            this.setState({ data_points: response.data, mode:1});
        })
    }
    buttonClicked2(){
        axios.get(`${api}/edge`)
        .then(response => {
            this.setState({ data_points: response.data, mode:2});
        })
    }

    render(){
        
        return (
            <Paper style={{height: '800px'}}>
                <Button onClick={this.buttonClicked1} variant="contained" color='default'>Cluster View</Button>
                <Button onClick={this.buttonClicked2} variant="contained" color='secondary'>Citation Graph</Button>
                <Grid item>
                    {this.state.mode == 1?
                    <ClusterChart data={this.state.data_points} size={this.props.size}>

                    </ClusterChart> : (this.state.mode == 2?
                    <GraphChart data={this.state.data_points} size={this.props.size} size2={this.props.size2}>

                    </GraphChart> : ''
                    )}
                </Grid>
            </Paper>
        )
    }
}


export default withTheme(ScatterVis);
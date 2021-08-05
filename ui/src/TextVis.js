import React from 'react';
import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import axios from 'axios';
import api from './api';
import './stylesheet/main.css';
import {FaSearch} from "react-icons/fa"

class TextVis extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query_data: [] };
    }
    render(){
      // axios.post(`${api}/text`, query)
      // .then(response => {
      //     console.log(response.data[0]);
      // })
      const tableCellStyle = { maxWidth: "120px"};
        return (
            <Paper>
            <div style={{backgroundColor: "#E8E8E8", borderRadius: 3, borderWidth: 1}}>
              <Grid container id="title">
                <Grid item>
                <Typography variant="h6" id="tableTitle" style={{minWidth: "200px"}}>
                Articles Search
                </Typography>
                </Grid>
                <Grid item>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{backgroundColor: "white"}} onInput={ e=>this.handleQuery(e)}/>
                <Button type="submit" variant="outlined" style={{height: '40px', backgroundColor: "white"}}><FaSearch /></Button>
                </form>
                </Grid>
              </Grid></div>

            <Divider/>
            <List style={{height: '330px', overflow: 'auto'}}>
            <Table stickyHeader size="small" aria-label="textvis">
              <TableBody>
                <TableRow>
                    <TableCell style={tableCellStyle}> Title </TableCell>
                    <TableCell style={tableCellStyle}> Abstract </TableCell>
                    <TableCell style={tableCellStyle}> Authors </TableCell>
                </TableRow>
                {this.state.query_data.map(key => 
                    <TableRow key={key.id}>
                        <TableCell style={tableCellStyle}>{key.Title}</TableCell>
                        <TableCell style={tableCellStyle}>{key.Abstract}</TableCell>
                        <TableCell style={tableCellStyle}>{key.Abstract}</TableCell>
                    </TableRow>)}
              </TableBody>
            </Table>
            </List>
          </Paper>        )
    }
    handleSubmit(event) {
      event.preventDefault()
      axios.get(`${api}/text/${this.queryText}`)
      .then(response => {
        this.setState({ query_data: response.data });
        // this.state.query_data = response.data;
        console.log(this.state.query_data[0])
      })
    
    }
    handleQuery(event) {
      this.queryText = event.target.value;
    }
}

export default TextVis;
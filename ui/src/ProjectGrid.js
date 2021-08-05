import React from 'react';
// import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

// material UI
import Grid from '@material-ui/core/Grid';

// sub components
import ScatterVis from './ScatterVis'
import TextVis from './TextVis'
import QaVis from './QaVis'
import axios from "axios";
import api from "./api";

const drawerWidth = 200;

export const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        alignItems: "flex-end"
    },
    text: {
        margin: "0px",
        minHeight: '15vh',
        fontSize: 20,
        display: "initial",
        lineHeight: 2.0
    },
    cardActions: {
        margin: theme.spacing(1, 1, 1),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    grid: {
        padding: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),
    },
    arrowIcon: {
        marginRight: theme.spacing(0),
    },
    content: {
        flexGrow: 1,
        height:'90vh',
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
        fontSize: "large",
    },
    input: {
        marginLeft: theme.spacing(0),
        flex: 1,
        variant: "h6",
    },
    link: {
        badge: {
            transform: 'scale(1) translate(0%, -50%)',
        }
    },
    snackbar: {
        top: "100px"
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    box: {
        width: "fit-content",
        display: "inline",
    },
}));

const ProjectGrid =  (props) => {

    const classes = useStyles();
    let data1;
    axios.get(`${api}/scatter`)
      .then(response => {
        data1 = response.data
      })
    return (
        <div>
            <Grid container direction={'row'} style={{"paddingBottom":"100px"}}>

                <Grid container item lg={6} direction={'column'} justify={'flex-start'} alignItems={'stretch'} wrap="nowrap">      
                    <Grid item><ScatterVis 
                        text={props.text}
                        size={[900, 700]}
                        size2={[1100, 900]}
                        classes={classes} 
                    /></Grid>
                </Grid>

                <Grid container item lg={6} direction={'column'} justify={'flex-start'} alignItems={'stretch'} wrap="nowrap">
                    <Grid item ><TextVis classes={classes} /></Grid>
                    <Grid item ><QaVis classes={classes} /></Grid>
                </Grid>

            </Grid>
        </div>
    );
};


export default ProjectGrid;
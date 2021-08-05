import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProjectGrid from './ProjectGrid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavigationBar from './NavigationBar';

const styles = {
    grow: {
        flexGrow: 1,
    }
};

class Main extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Router>
                <div>
                    <CssBaseline/>
                      <NavigationBar handleDrawerOpen={this.handleDrawerOpen} />
                        <Switch>
                          <Route path="/">
                            <ProjectGrid/>
                          </Route>
                        </Switch>
                </div>
            </Router>
        );
    }
}

export default withStyles(styles)(Main);
import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Grid,
  TabScrollButton,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import CreateClassroom from "./CreateClassroom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  renderHomePage() {
    return (
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} align="center">
          <Typography component="h2" variant="h2">
            Notes
          </Typography>
        </Grid>

        <Grid item xs={6} align="center">
          <ButtonGroup size="large">
            <Button to="/create-classroom" component={Link}>
              Create Class
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6} align="center">
          <ButtonGroup size="large">
            <Button to="/join-classroom" component={Link}>
              Join Class
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.renderHomePage}></Route>
          <Route path="/create-classroom" component={CreateClassroom}></Route>
        </Switch>
      </Router>
    );
  }
}

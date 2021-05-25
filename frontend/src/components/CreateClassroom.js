import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  ButtonGroup,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";

export default class CreateClassroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classroom: "",
      subject: "",
      description: "",
    };

    this.handleCreateClassroomButtonPressed =
      this.handleCreateClassroomButtonPressed.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  handleCreateClassroomButtonPressed(e) {
    e.preventDefault();
    if(this.state.classroom !== "" && this.state.subject !== ""){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classroomName: this.state.classroom,
          subject: this.state.subject,
          description: this.state.description,
        }),
      };
      fetch("/classroom/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.props.history.push("/classroom/" + data.id);
        });
    }else{
      console.log("error")
    }

  }

  updateValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} align="center">
          <Card>
            <CardContent>
              <Typography content="h4" variant="h4">
                Create Classroom
              </Typography>
              <Box p={1}></Box>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Classroom"
                      name="classroom"
                      required
                      value={this.state.classroom}
                      onChange={this.updateValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Subject"
                      name="subject"
                      value={this.state.subject}
                      required
                      onChange={this.updateValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Description"
                      name="description"
                      value={this.state.description}
                      multiline
                      onChange={this.updateValue}
                    />
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={this.handleCreateClassroomButtonPressed}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

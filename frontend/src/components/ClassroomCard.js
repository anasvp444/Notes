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
  IconButton,
  Box,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default class ClassroomCard extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleDeleteClass = this.handleDeleteClass.bind(this);
  }
  handleCardClick() {
    this.props.history.push("/classroom/" + this.props.id);
  }
  handleDeleteClass() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.id,
      }),
    };
    fetch("/classroom/delete-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.deleteCallback();
      });
  }
  render() {
    const cardStyle = {
      minWidth: "200px",
      maxWidth: "200px",
    };
    return (
      <Grid item xs>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Card style={cardStyle} id={this.props.id}>
              <CardContent onClick={this.handleCardClick}>
                <Typography content="h5" variant="h5">
                  {this.props.classroom}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {this.props.subject}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={this.handleDeleteClass}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

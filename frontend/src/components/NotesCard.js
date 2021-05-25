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
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleDeleteNote(){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.props.id,
        }),
      };
      fetch("/classroom/delete-note", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.props.deleteCallback();
        });
    
  }
  

  render() {
    const cardStyle = {
      minWidth: "200px",
      maxWidth: "300px",
      padding:"5px"
    };
    return (
      <Grid item xs>
        <Card style={cardStyle} id={this.props.id}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Typography content="h5" variant="h5">
                  {this.props.title}
                </Typography>
              </Grid>
              <Grid item xs={2}>
              <IconButton size="small" onClick={this.handleDeleteNote} >
                <Delete />
              </IconButton>
              </Grid>
            </Grid>

            <Typography variant="subtitle1" gutterBottom>
              {this.props.text}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

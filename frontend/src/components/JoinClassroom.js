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

import ClassroomCard from './ClassroomCard'

export default class JoinClassroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classrooms: {},
    };
    this.updateClassrooms = this.updateClassrooms.bind(this)
  }
  async componentDidMount() {
    this.updateClassrooms()
  }

  updateClassrooms(){
    fetch("classroom/room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ classrooms: data });
      });
  }

  renderClassroomCards() {
    const classroomCardsList = [];
    for (let i = 0; i < this.state.classrooms.length; i++) {
      let classroom = this.state.classrooms[i].classroomName;
      let subject = this.state.classrooms[i].subject;
      let id = this.state.classrooms[i].id;
      classroomCardsList.push(
        <ClassroomCard history= {this.props.history} classroom={classroom} subject={subject} id={id} key={id} deleteCallback={this.updateClassrooms}/>
      );
    }

    return classroomCardsList;
  }


  render() {
    return (
      <div style={{ flexGrow: 1, padding: "50px"}}>
        <Grid container alignItems="center" spacing={5}>
          {this.renderClassroomCards()}
        </Grid>
      </div>
    );
  }
}

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

import NotesCard from "./NotesCard";
import { PhoneLockedRounded } from "@material-ui/icons";

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      classroom: {},
      id: this.props.match.params.id,
      createNoteTitle: "",
      createNoteText: "",
    };
    this.updateValue = this.updateValue.bind(this);
    this.handleCreateNotePressed = this.handleCreateNotePressed.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }
  async componentDidMount() {
    this.updateNotes();
  }

  updateNotes() {
    fetch("/classroom/notes?classroom_id=" + this.props.match.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: JSON.parse(data.notes) });
        this.setState({ classroom: JSON.parse(data.classroom)[0].fields });
      });
  }

  updateValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreateNotePressed(e) {
    e.preventDefault();
    if (this.state.createNoteTitle !== "" && this.state.createNoteText !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classroom_id: this.state.id,
          title: this.state.createNoteTitle,
          text: this.state.createNoteText,
        }),
      };
      fetch("/classroom/create-note", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.updateNotes();
          this.setState({
            createNoteTitle: "",
            createNoteText: ""
          })
        });
    } else {
      console.log("error");
    }
  }

  renderCreateNotes() {
    const createNoteCardStyle = {
      minWidth: "250px",
      maxWidth: "250px",
    };
    return (
      <Grid item xs>
        <Card style={createNoteCardStyle}>
          <CardContent>
            <Typography variant="subtitle1">Create Notes</Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Title"
                    name="createNoteTitle"
                    value={this.state.createNoteTitle}
                    required
                    onChange={this.updateValue}
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <TextField
                    variant="outlined"
                    label="Text"
                    name="createNoteText"
                    value={this.state.createNoteText}
                    multiline
                    required
                    onChange={this.updateValue}
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleCreateNotePressed}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  renderNotes() {
    const NotesList = [];
    if (this.state.notes.length > 0) {
      for (let i = 0; i < this.state.notes.length; i++) {
        let title = this.state.notes[i].fields.title;
        let text = this.state.notes[i].fields.text;
        let pk = this.state.notes[i].pk;
        NotesList.push(
          <NotesCard
            title={title}
            text={text}
            key={pk}
            id={pk}
            deleteCallback={this.updateNotes}
          />
        );
      }
      return NotesList;
    } else {
      return null;
    }
  }

  renderDetails() {
    return (
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          {this.state.classroom.classroomName}
        </Typography>
        <Typography variant="h5" component="h5">
          {this.state.classroom.subject }
        </Typography>  
      </Grid>
    );
  }

  render() {
    return (
      <div style={{ flexGrow: 1, padding: "50px" }}>
        <Grid container alignItems="center" spacing={5}>
          {this.renderDetails()}
          {this.renderCreateNotes()}
          {this.renderNotes()}
        </Grid>
      </div>
    );
  }
}

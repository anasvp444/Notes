import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  ButtonGroup,
  Typography,
} from "@material-ui/core";

export default class CreateClassroom extends Component {
  constructor(props) {
    super(props);
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
              <FormControl>
                <InputLabel htmlFor="my-input">Classroom</InputLabel>
                <Input id="my-input" />
              </FormControl>
            </CardContent>
            <CardActions>
              <Grid item xs={12} align="center">
                <ButtonGroup>
                  <Button color="primary">Create</Button>
                </ButtonGroup>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

import React, { Component } from "react";
import LoginForm from "../LoginForm";
import { Header, Divider } from "semantic-ui-react";

class LandingView extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginForm />
        <Header as="h5" textAlign="center">
          Note: make sure geotagging is enabled before you take your photo.
        </Header>
      </React.Fragment>
    );
  }
}

export default LandingView;

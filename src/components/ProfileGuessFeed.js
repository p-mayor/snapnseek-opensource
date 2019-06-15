import React, { Component } from "react";
import ProfileGuessItem from "./ProfileGuessItem";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { getHunts, getUsers } from "../actions";

class ProfileGuessFeed extends Component {
  render() {
    return (
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Card.Header as="h2" textAlign="center">
            All Your Guesses
          </Card.Header>
          {this.props.guesses
            .sort((a, b) => {
              return b.id - a.id;
            })
            .map(hunt => (
              <ProfileGuessItem
                key={hunt.id}
                hunt={hunt}
                displayName={this.props.loggedInUser.displayName}
              />
            ))}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.users.loggedInUser,
  guesses: state.users.loggedInUser.guesses,
  userList: state.users.userList,
  isHuntLoading: state.hunts.getHuntLoading
});

const mapDispatchToProps = dispatch => {
  return {
    getGuesses: (limit, offset) => {
      dispatch(getHunts(limit, offset));
    },
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileGuessFeed);

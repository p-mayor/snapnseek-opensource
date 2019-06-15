import React, { Component } from "react";
import HuntGuessItem from "./HuntGuessItem";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { getUsers, getGuesses } from "../actions";

class HuntGuessFeed extends Component {
  componentDidMount() {
    this.props.getGuesses();
  }

  render() {
    return (
      <Card style={{ margin: "auto" }}>
        <Card.Content>
          <Card.Header as="h2" textAlign="center">
            Guesses
          </Card.Header>
          {this.props.guesses
            .filter(guess => guess.targetId === Number(this.props.huntId))
            .map(guess => (
              <HuntGuessItem
                key={guess.id}
                id={guess.id}
                hunt={guess}
                displayName={this.props.loggedInUser.displayName}
                lat={this.props.lat}
                long={this.props.long}
              />
            ))}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.users.loggedInUser,
  guesses: state.guesses.guesses,
  userList: state.users.userList,
  isHuntLoading: state.hunts.getHuntLoading
});

const mapDispatchToProps = dispatch => {
  return {
    getGuesses: () => {
      dispatch(getGuesses());
    },
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HuntGuessFeed);

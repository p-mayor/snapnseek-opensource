import React, { Component } from "react";
import HomeHuntItem from "./HomeHuntItem";
import { getHunts, getUsers } from "../actions";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

class HomeHuntFeed extends Component {
  state = {};
  componentDidMount() {
    this.props.getHunts();
    this.props.getUsers();
  }
  matchIdtoUsername = userId => {
    let user = this.props.userList.find(user => user.id === userId);
    if (user) return user.displayName;
    return "Deleted";
  };

  render() {
    return (
      <Card style={{ width: "90%", margin: "auto" }}>
        <Card.Content>
          <Card.Header as="h2" textAlign="center">
            All Hunts
          </Card.Header>
          {this.props.hunts.hunts.map(hunt => (
            <HomeHuntItem
              key={hunt.id}
              hunt={hunt}
              displayName={this.matchIdtoUsername(hunt.userId)}
            />
          ))}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  hunts: state.hunts,
  userList: state.users.userList,
  isHuntLoading: state.hunts.getHuntsLoading
});

const mapDispatchToProps = dispatch => {
  return {
    getHunts: () => {
      dispatch(getHunts());
    },
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHuntFeed);

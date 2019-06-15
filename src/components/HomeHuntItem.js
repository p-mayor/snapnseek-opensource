import React, { Component } from "react";
import { Feed, Card, Image, Button, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SimpleUserImage from "./SimpleUserImage";
import moment from "moment";

export class HomeHuntItem extends Component {
  render() {
    let neighborhood;
    switch (this.props.hunt.neighborhood) {
      case "A":
        neighborhood = "NW Indy";
        break;
      case "B":
        neighborhood = "NE Indy";
        break;
      case "C":
        neighborhood = "SW Indy";
        break;
      case "D":
        neighborhood = "SE Indy";
        break;
      default:
        neighborhood = "NW Indy";
    }

    return (
      <Feed className="feedstyle">
        <Feed.Content style={{ paddingBottom: "10px" }}>
          <Feed.Summary style={{ paddingBottom: "5px" }} />
          <Card style={{ margin: "auto", width: "90%" }}>
            <SimpleUserImage
              userId={this.props.hunt.userId}
              size="mini"
              style={{ paddingTop: "20px" }}
            />
            <Feed.User style={{ color: "black" }} className="break-word">
              {this.props.displayName} posted{" "}
              {moment(this.props.hunt.createdAt).fromNow()}
            </Feed.User>
            <Card.Header className="break-word" />
            <Card.Content>
              <Image
                src={this.props.hunt.pictureURL}
                style={{ maxHeight: "600px" }}
              />
            </Card.Content>
            <Card.Content>
              <Card.Header>{this.props.hunt.title}</Card.Header>
              <Feed.Extra className="break-word">
                {this.props.hunt.text}
                <Divider />
                Neighborhood: {neighborhood}
              </Feed.Extra>
            </Card.Content>
            <Card.Content extra style={{ margin: "auto" }}>
              <Link to={`targets/${this.props.hunt.id}`}>
                {/* <Button animated compact positive> */}
                <Button className="theme" animated compact>
                  <Button.Content visible>Check it Out</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Link>
            </Card.Content>
          </Card>
        </Feed.Content>
      </Feed>
    );
  }
}

export default connect(
  ({ auth }) => ({
    isLoading: auth.loginLoading,
    err: auth.loginError,
    token: auth.login.token,
    userId: auth.login.id
  }),
  null
)(HomeHuntItem);

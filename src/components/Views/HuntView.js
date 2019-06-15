import React, { Component } from "react";
import { Image, Card, Grid, Header } from "semantic-ui-react";
import StickyHeader from "../StickyHeader";
import A from "../../img/mapquads/A.png";
import B from "../../img/mapquads/B.png";
import C from "../../img/mapquads/C.png";
import D from "../../img/mapquads/D.png";
import EXIF from "exif-js";
import { getHuntById } from "../../actions";
import { connect } from "react-redux";
import GuessForm from "../GuessForm";
import HuntGuessFeed from "../HuntGuessFeed";

export class HuntView extends Component {
  state = { quads: { A, B, C, D } };
  getExif() {
    // let imageEl = document.getElementById("image");
    let newImageEl = document.createElement("img");
    newImageEl.src = this.props.currentHunt.pictureURL;

    let componentThis = this;
    if (newImageEl) {
      return EXIF.getData(newImageEl, function() {
        let latitude = EXIF.getTag(this, "GPSLatitude");
        let longitude = EXIF.getTag(this, "GPSLongitude");
        if (latitude && longitude) {
          let latDeg = latitude[0];
          let latMin = latitude[1];
          let latSec = latitude[2];
          let latitudeFormat = latDeg + (latMin + latSec / 60) / 60;
          let longDeg = longitude[0];
          let longMin = longitude[1];
          let longSec = longitude[2];
          let longitudeFormat = longDeg + (longMin + longSec / 60) / 60;
          longitudeFormat = longitudeFormat * -1;
          componentThis.setState({
            lat: latitudeFormat,
            long: longitudeFormat
          });
        }
      });
    }
  }

  componentDidMount() {
    this.props.getHuntById(this.props.match.params.id);
    let imageEl = document.getElementById("image");
    if (imageEl) {
      imageEl.onload = this.getExif.bind(this);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.currentHunt.pictureURL !== prevProps.currentHunt.pictureURL
    ) {
      let imageEl = document.getElementById("image");
      imageEl.onload = this.getExif.bind(this);
    }
  }

  matchIdtoUsername = userId => {
    let user = this.props.userList.find(user => user.id === userId);
    if (user) return user.displayName;
    return "Deleted";
  };

  render() {
    return (
      <React.Fragment>
        <StickyHeader />
        <Grid>
          <Grid.Row>
            <Grid.Column style={{ marginTop: "140px" }}>
              <Card
                style={{
                  margin: "auto",
                  width: "90%",
                  maxWidth: "1000px"
                }}
              >
                <Card.Content style={{ margin: "auto", textAlign: "center" }}>
                  <Card.Header textAlign="center">
                    {this.props.currentHunt.title}
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    posted by:{" "}
                    {this.matchIdtoUsername(this.props.currentHunt.userId)}
                  </Card.Meta>
                  {this.props.currentHunt.pictureURL && (
                    <img
                      id="image"
                      src={this.props.currentHunt.pictureURL}
                      alt=""
                      style={{
                        maxHeight: "800px",
                        width: "80%",
                        margin: "auto",
                        textAlign: "center"
                      }}
                    />
                  )}
                </Card.Content>
                <Card.Content>
                  <Card.Content>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column textAlign="center">
                          {this.props.currentHunt.text}
                        </Grid.Column>
                        <Grid.Column>
                          <Header textAlign="center">Neighborhood</Header>
                          <Image
                            src={
                              this.state.quads[
                                this.props.currentHunt.neighborhood
                              ]
                            }
                            style={{
                              maxHeight: "800px",
                              display: "block",
                              margin: "auto"
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card.Content>
                <Card.Content extra style={{ margin: "auto" }}>
                  <GuessForm huntId={Number(this.props.match.params.id)} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <HuntGuessFeed
          lat={this.state.lat}
          long={this.state.long}
          huntId={this.props.match.params.id}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hunts: state.hunts,
  userList: state.users.userList,
  isHuntLoading: state.hunts.getHuntsLoading,
  currentHunt: state.hunts.currentHunt
});

export default connect(
  mapStateToProps,
  { getHuntById }
)(HuntView);

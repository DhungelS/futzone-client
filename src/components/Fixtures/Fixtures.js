import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Matches from './Matches/Matches';
import Teams from './Teams/Teams';
import Highlights from './Highlights/Highlights'
import * as actions from '../../actions';
import './Fixtures.css';

export class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeagues: true,
      showTeams: false,
      showMatches: false,
      selectedLeague: '',
      open: false,
      moment: '',
      rating: 1
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
    this.props.fetchReviewData();
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getLeagues();
  }

  handleLeagueSelect(link, id) {
    this.setState(
      {
        showTeams: true,
        selectedLeague: id
      },
      () => {
        this.props.getTeams(link, id);
      }
    );
  }

  handleTeamSelect(link) {
    this.setState(
      {
        showMatches: true
      },
      () => {
        this.props.getMatches(link);
      }
    );
  }

  reviewPostHandler = (event, match) => {
    event.preventDefault();
    this.props.postReviewData({
      match,
      moment: this.state.moment,
      rating: this.state.rating
    });
  };

  handleMomentInput(event) {
    this.setState({
      moment: event.target.value
    });
  }

  handleRatingInput(event) {
    this.setState({
      rating: event.target.value
    });
  }

  render() {

    const reviews = this.props.reviews.map((review, index) => {
      return (
        <li className="review-item" key={index}>
         {review.match} {review.rating} {review.moment} 
        </li>
      );
    });

    return (
      <div className="fixtures">
        <h1>Leagues</h1>

        <div className="list">
          <ul className="leagues-list">
            {this.props.leagues.map((league, index) => (
              <li
                key={league.id}
                onClick={() =>
                  this.handleLeagueSelect(league._links.teams.href, league.id)
                }
                className="league"
              >
                <a>{league.caption}</a>
              </li>
            ))}
          </ul>

          <ul className="match-list">
            {this.props.matches.map((match, index) => (
              <div>
                <Matches
                  key={index}
                  match={match}
                  onOpenModal={this.onOpenModal}
                />
                <Modal
                  classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                  }}
                  open={this.state.open}
                  onClose={this.onCloseModal}
                  little
                >
                  <div>
                    <h1>Previous Reviews</h1>
                    <ul className="review-list">
                    {reviews}</ul>
                    <form
                      className="review-form"
                      onSubmit={(e) => this.reviewPostHandler(e, ` ${match.homeTeamName} VS. ${match.awayTeamName}`)}
                    >
                      <textarea
                        value={this.state.moment}
                        onChange={e => this.handleMomentInput(e)}
                      />
                      <select
                        value={this.state.rating}
                        onChange={e => this.handleRatingInput(e)}
                        name="rating"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <input type="submit" />
                    </form>
                    <Highlights matchSelected={` ${match.homeTeamName} VS. ${match.awayTeamName}`}/>
                  </div>
                </Modal>
              </div>
            ))}
          </ul>

          <ul className="teams-list">
            {this.state.showTeams &&
              this.props.teams[this.state.selectedLeague] &&
              this.props.teams[this.state.selectedLeague].map((team, index) => (
                <Teams
                  key={index}
                  team={team}
                  handleTeamSelect={link => this.handleTeamSelect(link)}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leagues: state.soccerData.leagueData,
  teams: state.soccerData.teamData,
  matches: state.soccerData.matchData,
  reviews: state.review.reviewData
});

export default connect(mapStateToProps, actions)(Fixtures);

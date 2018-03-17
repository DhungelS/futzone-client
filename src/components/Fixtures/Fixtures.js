import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Matches from './Matches/Matches';
import Teams from './Teams/Teams';
import Search from './Search'
import Highlights from './Highlights/Highlights';
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
      openFirstModal: false,
      openSecondModal: false,
      moment: '',
      rating: 1,
      term: '',
      searchs: []
    };
    
  }



  onOpenFirstModal = () => {
    this.setState({ openFirstModal: true });
    this.props.fetchReviewData();
  };

  onCloseFirstModal = () => {
    this.setState({ openFirstModal: false });
  };

  onOpenSecondModal = (highlightVids) => {
    this.setState({ openSecondModal: true });
    this.props.getHighlightVids(highlightVids)
  };

  onCloseSecondModal = () => {
    this.setState({ openSecondModal: false });
  };

  componentDidMount() {
    this.props.getLeagues()
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


  _searchAndFilter = (searchTerm, itemtoFilter) => {
    
    const searchs = itemtoFilter.filter(item => item.includes(searchTerm));
    console.log(searchs)
    this.setState({
      term: searchTerm,
      searchs
    });
  };



  render() {
    const reviews = this.props.reviews.map((review, index) => {
      return (
        <li className="review-item" key={review._id}>
          {review.match} {review.rating} {review.moment}
          <button onClick={() => this.props.deleteReviewItem(review._id)}>del</button>
        </li>
      );
    });

    const captionArr = this.props.leagues.map(((league, index) => league.caption)
  )
    return (
      <div className="fixtures">
        <h1>Leagues</h1>
        <Search searchAndFilter= {((e) => this._searchAndFilter(e.target.value,captionArr))} value={this.state.term} />
        <div className="list">
          <ul className="leagues-list">
            {this.state.searchs.map((league, index) => (
              
              <li
                key={league.id}
                onClick={() =>
                  this.handleLeagueSelect(league._links.teams.href, league.id)
                }
                className="league"
              >
                <a>{league}</a>
              </li>
              
            ))}
          </ul>

          <ul className="match-list">
            {this.props.matches.map((match, index) => (
              <div>
                <Matches
                  key={index}
                  match={match}
                  onOpenFirstModal={this.onOpenFirstModal}
                  onOpenSecondModal={() => this.onOpenSecondModal(` ${match.homeTeamName} vs ${
                    match.awayTeamName}
                  `)}
                />

                <Modal
                  classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                  }}
                  open={this.state.openFirstModal}
                  onClose={this.onCloseFirstModal}
                  little
                >
                  <div>
                    <h1>Previous Reviews</h1>
                    <ul className="review-list">{reviews}</ul>
                    <form
                      className="review-form"
                      onSubmit={e =>
                        this.reviewPostHandler(
                          e,
                          ` ${match.homeTeamName} VS. ${match.awayTeamName}`
                        )
                      }
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
                  </div>
                </Modal>

                <Modal
                  classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                  }}
                  open={this.state.openSecondModal}
                  onClose={this.onCloseSecondModal}
                  little
                >
                  <Highlights
                      matchSelected={` ${match.homeTeamName} vs ${
                        match.awayTeamName
                      }`}
                  This is the second modal
                  />
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

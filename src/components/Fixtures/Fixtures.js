import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Matches from './Matches/Matches';
import Teams from './Teams/Teams';
import Search from './Search/Search';
import Highlights from './Highlights/Highlights';
import * as actions from '../../actions';
import './Fixtures.css';

export class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeams: false,
      selectedLeague: '',
      openReviewModal: false,
      openSecondModal: false,
      moment: '',
      rating: 1,
      term: '',
      searchs: []
    };
  }

  onOpenReviewModal = () => {
    this.setState({ openReviewModal: true });
    this.props.fetchReviewData();
  };

  onCloseReviewModal = () => {
    this.setState({ openReviewModal: false });
  };

  onOpenSecondModal = highlightVids => {
    this.setState({ openSecondModal: true });
    this.props.getHighlightVids(highlightVids);
  };

  onCloseSecondModal = () => {
    this.setState({ openSecondModal: false });
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
    this.props.getMatches(link);
  }

  reviewPostHandler = (event, match) => {
    event.preventDefault();
    this.props.postReviewData({
      match,
      moment: this.state.moment,
      rating: this.state.rating
    });
  };

  reviewDeleteHandler(id) {
    this.props.deleteReviewItem(id);
    this.props.fetchReviewData();
  }

  _searchFilterAndMapLeagueItems = (searchTerm, itemtoFilter) => {
    const searchs = itemtoFilter
      .map((league, index) => (
        <li
          key={league.id}
          onClick={() =>
            this.handleLeagueSelect(league._links.teams.href, league.id)
          }
          className="league"
        >
          <a className="league-caption">{league.caption}</a>
        </li>
      ))
      .filter(league =>
        league.props.children.props.children.toUpperCase().includes(searchTerm.toUpperCase())
      );

    this.setState({
      term: searchTerm,
      searchs
    });
  };

  render() {
    const reviews = this.props.reviews.map((review, index) => {
      return (
        <li className="review-item" key={review._id}>
          <h4>{review.match}</h4> <p>{review.rating}</p> {review.moment}
          <div onClick={() => this.reviewDeleteHandler(review._id)}>
            <i className="fa fa-trash-o fa-fw" />
          </div>
        </li>
      );
    });

    return (
      <div className="fixtures">
        <Search
          searchAndFilter={e =>
            this._searchFilterAndMapLeagueItems(
              e.target.value,
              this.props.leagues
            )
          }
          value={this.state.term}
        />
        <div className="list">
          <ul className="leagues-list">{this.state.searchs}</ul>

          <ul className="match-list">
            {this.props.matches.map((match, index) => (
              <div key={index}>
                <Matches
                  key={index}
                  match={match}
                  onOpenReviewModal={this.onOpenReviewModal}
                  onOpenSecondModal={() =>
                    this.onOpenSecondModal(` ${match.homeTeamName} vs ${
                      match.awayTeamName
                    }
                  `)
                  }
                />

                <Modal
                  classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                  }}
                  open={this.state.openReviewModal}
                  onClose={this.onCloseReviewModal}
                  little
                >
                  <div>
                    <h1>Previous Reviews</h1>
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
                        onChange={e =>
                          this.setState({ moment: e.target.value })
                        }
                      />
                      <select
                        value={this.state.rating}
                        onChange={e =>
                          this.setState({
                            rating: e.target.value
                          })
                        }
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
                    <ul className="review-list">{reviews}</ul>
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
                    This
                    is
                    the
                    second
                    modal
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

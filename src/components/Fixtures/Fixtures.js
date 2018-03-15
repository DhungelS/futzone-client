import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Matches from './Matches/Matches'
import Teams from './Teams/Teams'
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
    this.setState({
      showTeams: true,
      selectedLeague: id
    }, () => {

      this.props.getTeams(link, id);
    });
  }

  handleTeamSelect(link){
    this.setState({
      showMatches: true
    }, () => {
      this.props.getMatches(link)
    })
  }

  render() {

    return (
      (
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
                 <Matches key={index} match={match} onOpenModal={this.onOpenModal}/>
                 <Modal classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }} open={this.state.open} onClose={this.onCloseModal} little>
                 <h2>Simple centered modal</h2>
                 <h2>Simple centered modal</h2>
                 <h2>Simple centered modal</h2>
                 <h2>Simple centered modal</h2>

               </Modal>
               </div>
                ))}
              </ul>


              
              <ul className="teams-list">
              {this.state.showTeams && this.props.teams[this.state.selectedLeague] &&
                this.props.teams[this.state.selectedLeague].map((team, index) => (
                  <Teams key={index} team={team} handleTeamSelect={(link) => this.handleTeamSelect(link)}/>
                ))}
            </ul>

          </div>
        </div>
      )
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

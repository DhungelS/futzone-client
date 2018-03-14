import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './Fixtures.css';

export class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeagues: true,
      showTeams: false,
      showMatches: false,
      selectedLeague: ''
    };
  }

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

  render() {
    return (
      (
        <div className="fixtures">
          <h1>Leagues</h1>

          <div className="list">
            <div className="leagues-list">
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
            </div>
            <div className="teams-list">
              {this.state.showTeams && this.props.teams[this.state.selectedLeague] &&
                this.props.teams[this.state.selectedLeague].map((team, index) => (
                  <li key={index} className="team">
                    {team.name}
                  </li>
                ))}
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  leagues: state.soccerData.leagueData,
  teams: state.soccerData.teamData,
});

export default connect(mapStateToProps, actions)(Fixtures);

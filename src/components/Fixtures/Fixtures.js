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
      showMatches: false
    };
  }

  componentDidMount() {
    this.props.getSoccerData('https://api.football-data.org/v1/competitions');
  }

  handleLeagueSelect(link) {
    this.props.getSoccerData(link);
    this.setState({
      showTeams: true
    });
  }

  render() {
    const leagues = this.props.leagues.map((league, index) => {
      return (
        <li
          key={index}
          onClick={() => this.handleLeagueSelect(league._links.teams.href)}
          className="leagues"
        >
          <a>{league.caption}</a>
        </li>
      );
    });

    const teams = this.props.teams.map((team, index) => {
      return (
        <li key={index} className="teams">
          {team.name}
        </li>
      );
    });

    return (
      console.log(this.props.teams),
      (
        <div className="fixtures">
          <h1>Leagues</h1>
          <table>
            {/* {leagues}
            {this.state.showTeams ? teams : null} */}
            <tr>
              <th>League Name</th>
              <th>Team Names</th>
            </tr>
            <tr>
              {this.props.leagues.map((league, index) => (
                <tr key={index}>
                <td onClick={() => this.handleLeagueSelect(league._links.teams.href)}>{league.caption}</td>
                {this.state.showTeams && (
                <td>{this.props.teams[index].name}</td>
                )}
          
                </tr>
              ))}
            </tr>
          </table>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  leagues: state.soccerData.leagueData,
  teams: state.soccerData.teamData
});

export default connect(mapStateToProps, actions)(Fixtures);

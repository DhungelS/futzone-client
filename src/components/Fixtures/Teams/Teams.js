import React from 'react';

export default function Teams(props) {
  console.log(props)
  return (
    <li className="team" onClick={() => props.handleTeamSelect(props.team._links.fixtures.href)}>
      {props.team.name}
    </li>
  );
}

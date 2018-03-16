import React from 'react';

export default function Matches (props) {
  return (
       <li className="match">{props.match.homeTeamName} VS. {props.match.awayTeamName} <p>on {props.match.date}</p><button onClick={() => props.onOpenFirstModal()}>Open Reviews Modal</button><button onClick={() => props.onOpenSecondModal()}>Open Vids Modal</button></li>
  )
}
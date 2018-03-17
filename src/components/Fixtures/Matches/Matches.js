import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';


import * as actions from '../../../actions';


export function Matches (props) {



  return (
       <li className="match">{props.match.homeTeamName} VS. {props.match.awayTeamName} <p>on <Moment>{props.match.date}</Moment></p><button onClick={() => props.onOpenFirstModal()}>Open Reviews Modal</button><button onClick={() => {props.onOpenSecondModal()}}>Open Vids Modal</button></li>
  )
}

const mapStateToProps = (state, ownProps) => ({
match: ownProps.match,
onOpenFirstModal: ownProps.onOpenFirstModal,
onOpenSecondModal: ownProps.onOpenSecondModal
});

// const mapStateToProps = (state, ownProps) => {
//   console.log(ownProps) 
// }

export default connect(mapStateToProps, actions)(Matches);
import React from 'react';
export default function Search(props){
  return(
    <div className="search-form">
        <form>
          <input className="search" onChange={props.searchAndFilter} placeholder="Search league, teams, and matches..." value={props.term} type="text" />
        </form>
      </div>
  );
}
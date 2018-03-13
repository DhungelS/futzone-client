import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'

import Header from './Header/Nav';
import Banner from './Landing/Landing';
import Reviews from './Reviews/Reviews';
const Review = () => <h2>Review</h2>;


class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
    }

  render() {
  

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Banner} />
            <Route exact path="/reviews" component={Reviews} />
            <Route path="/reviews/new" component={Review} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions) (App);

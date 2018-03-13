import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './Reviews.css'

export class Reviews extends Component {
  componentDidMount() {
    this.props.fetchReviewData();
  }

  render() {
    const reviews = this.props.reviews.map((review, index) => {
     return (
     <li className="review-item" key={index}>{review.rating} {review.moment}</li>
    );
    });



    return (
      console.log(this.props.reviews),
      (
        <div className="reviews">
          <h1>Previous Reviews</h1>
          <ul className="review-list">
            {reviews}
          </ul>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.review.reviewData
});

export default connect(mapStateToProps, actions)(Reviews);

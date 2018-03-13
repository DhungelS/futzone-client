import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './Reviews.css';

export class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: '',
      rating: 1
    };
  }

  componentDidMount() {
    this.props.fetchReviewData();
  }

  reviewPostHandler(event) {
    event.preventDefault();
    this.props.postReviewData({
      moment: this.state.moment,
      rating: this.state.rating
    });
   
  }

  handleMomentInput(event) {
    this.setState({
      moment: event.target.value
    });
  }

  handleRatingInput(event) {
    this.setState({
      rating: event.target.value
    });
  }

  render() {
    const reviews = this.props.reviews.map((review, index) => {
      return (
        <li className="review-item" key={index}>
          {review.rating} {review.moment}
        </li>
      );
    });

    return (
      <div className="reviews">
        <h1>Previous Reviews</h1>
        <ul className="review-list">{reviews}</ul>
        <form className="review-form" onSubmit={e => this.reviewPostHandler(e)}>
          <textarea
            value={this.state.moment}
            onChange={e => this.handleMomentInput(e)}
          />
          <select
            value={this.state.rating}
            onChange={e => this.handleRatingInput(e)}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.review.reviewData
});

export default connect(mapStateToProps, actions)(Reviews);

import React from 'react';
import './Landing.css';

export default function Banner() {
  return (
    <div class="landing">
      <div className="banner">
        <h1 className="heading-text">Fut</h1>
        <h1 className="heading-text">Zone</h1>
        <h1 className="heading-text info-text">Your source for highlights on the latest matches.</h1>
      </div>
  
      <div className="info">
      <p>This is your single source for highlights on the latest matches</p>
      </div>
    </div>
  );
}

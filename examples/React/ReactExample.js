import React from 'react';
import p5 from 'p5';
import snakeSketch from 'p5-snake';
import './ReactExample.css';

class SnakeBlock extends React.Component {
  componentDidMount() {
    this.sketch = new p5(snakeSketch('Snake', 'https://snake.dagut.ru:8080'),'Snake'); //your server should be be put instead of mine
  }

  componentWillUnmount(){
    this.sketch.close(); //dont forget to close socket if you have router or if you unomunt component in any case, but closing tab
  }

  render() {
    return (
      <div id="#Snake">
        Your stuff can be here. It will be placed on top of canvas
      </div>
    );
  }
}
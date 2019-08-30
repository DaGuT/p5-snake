import React from 'react';
import p5 from 'p5';
import snakeSketch from 'p5-snake';
import './ReactExample.css';

class SnakeBlock extends React.Component {
  componentDidMount() {
    new p5(snakeSketch(snakeId, 'https://snake.dagut.ru:8080'), 'Snake'); //your server should be be put instead of mine
  }

  render() {
    return (
      <div id="#Snake">
        Your stuff can be here. It will be placed on top of canvas
      </div>
    );
  }
}
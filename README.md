# p5-snake
npm package with cool socket.io snake so you may have fun with you friends online.

```
npm install p5-snake
```


#react example
css
```
#Snake {
    height: 100vh;
    color: white;
    background: black/*linear-gradient(rgb(255, 0, 193), rgb(73, 0, 255), rgb(0, 184, 255))*/;
    position: relative;
    /* fix for canvas background */
  }

#Snake canvas {
    z-index:1;
    position:absolute;
    left: 0;
    right:0;
    top:0;
    bottom:0;
}
````

react component

```
import React from 'react';
import p5 from 'p5';
import snakeSketch from 'p5-snake';
import './snakeBlock.css';

class SnakeBlock extends React.Component {
  componentDidMount(){
    new p5(snakeSketch(snakeId, 'https://snake.dagut.ru:8080'), 'Snake');
  }

  return (
    <div id="#Snake">
      Your stuff can be here :)
    </div>
  );
}
```


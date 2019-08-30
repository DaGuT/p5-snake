# p5-snake
npm package with cool socket.io snake so you may have fun with you friends online.

```
npm install p5-snake
```

Examples can be found at https://github.com/DaGuT/p5-snake/tree/master/examples

There is only react example, but you can import built file into your html file and use it with p5 normally, without babel

Just call 
```
new p5(snakeSketch('BlockID', 'https://snake.dagut.ru:8080')); //change block id with your DIV ID or whatever element you haev
```

and p5 canvas will appear inside of it.
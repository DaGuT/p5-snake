# p5-snake
npm package with cool socket.io snake so you may have fun with you friends online.

```
npm install p5-snake
```

or use built file (description below)

____
# Demo
Demo can be found at https://demos.dagut.ru/mysite/ at the top of the page
______
# Examples

Examples can be found at https://github.com/DaGuT/p5-snake/tree/master/examples

There are both: react example and pure browser example with built file

____

# Pure HTML Usage

To set it running in html use built version from html examples

Import it and p5.js

Then call 
```
new p5(snakeSketch('BlockID', 'https://snake.dagut.ru:8080'),'BlockID'); //change block id with your DIV ID or whatever element you have
```
and p5 canvas will appear inside of #BlockID.

Or simply rewrite example that I have

___

# About server
Server files can be found under build/server directory, but feel free to use my server while it's running.

To run server you need to have install "express" and "socket.io"

Simply run command "node snake.js" in that folder and server will be started. If you have ssl sertificates, you can check options varialbe inside of server file.


___
# Rebuilding
If you want to rebuild module after you made some changes you have two options:

1) For browser go to webpack.config.js and comment line
```
libraryTarget: 'commonjs2'
```
Then run
```
npm run build
```
and use file from build folder

2) run 
```
npm run build
```
replace file from build with the one you have in /node_modules or just copy/paste and import

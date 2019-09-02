export default class Food {

  /**
   * constructor - description
   *
   * @param  {type} x     x coord of food
   * @param  {type} y     y coord of food
   * @param  {type} color color that food has and will give to the snake segment
   */
  constructor(x, y, radius, color, p) {
    this.p=p;

    this.pos = p.createVector(x, y); //position vector
    this.col = color;
    this.r = radius;

    this.eaten = false;

  }

  draw() {
    this.p.noStroke();
    this.p.fill(this.p.color(this.col));
    this.p.ellipse(this.pos.x, this.pos.y, this.r);
    this.p.fill(255, 255, 255);
  }

}

//array of possible colors for offlien usage
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

function getRandColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

export {colors,getRandColor};
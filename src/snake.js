import Segment from './segment';
import Food, {colors, getRandColor} from './food';

/**
 * this is snake itself that connects segments and make them redraw propely
 * @class
 */
class Snake {

  /**
   * constructor - description
   *
   * @param  {int} segCount     amount of segments that Snake should consist of
   * @param  {float} segLen       segment length
   * @param  {float} minThickness the most thinnest part of snake will have this thickness
   * @param  {float} maxThickness the most fattest part of snake will have this thickness.
   */
  constructor(segCount, segLen, minThickness, maxThickness, maxLength, p) {

    this.p = p;

    this.segments = [];

    this.segLen = segLen;
    this.segCount = segCount;
    this.minThickness = minThickness;
    this.maxThickness = maxThickness;
    this.maxLength = maxLength;

    //head is mouse for PC and acceleration sensor for touch
    let head = (typeof window.orientation !== 'undefined')
      ? 'touch'
      : 'mouse';

    //mouse/ball following head
    this
      .segments
      .push(new Segment({
        //initial position
        x: p.width / 2,
        y: p.height / 2,
        //thickness of that part
        sw: maxThickness,
        //segment length
        len: segLen,
        //what this segment should follow
        next: head
      }, p));

    //all other segments following each other
    for (let i = 1; i < segCount; ++i) {
      this.grow();
    }
  }

  grow(col) {
    var p = this.p;
    let i = this.segments.length;

    if (i >= this.maxLength) 
      return; //we dont grow if we have reached maximum len
    let lastIndex = this.segments.length-1; //it's last index of this.segments array
    this
      .segments
      .push(new Segment({
        x: this.segments[lastIndex].x,
        y: this.segments[lastIndex].y,
        //exactly reversed order, It looks way cooler than normal snake stuff
        sw: p.map(i, 0, this.maxLength, this.minThickness, this.maxThickness),
        len: this.segLen,
        col: col,
        next: this.segments[i - 1]
      }, p));
  }

  /**
   * draw - first it updates  segment position  from head to tail and then draws it. And does it with each element
   *
   */
  draw() {
    // we usually dont pass anything, so it's fine. We only pass argument when we
    // draw other's snakes
    this
      .segments
      .forEach((segment) => {
        segment.update();
        segment.draw();
      });
  }

  die() {
    //if we die, we drop our snake back to having only this.segCount segments
    this.segments=this.segments.slice(0,this.segCount);
  }

  //for offline we use this function to check if we have ate the food
  eat(food) {
    if (food.eaten) 
      return; //there is a 50ms delay, so you can eat food multiple times. To prevent that we check if we have not ate it to continue
    let p = this.p;

    //if we have hit the food, we consume it and grow
    if ((Math.pow((food.pos.x - this.segments[0].b.x), 2) + Math.pow((food.pos.y - this.segments[0].b.y), 2)) < (Math.pow(Math.max(food.r, this.segments[0].sw), 2))) { //basic euclidian distance
      this.grow(food.col);
      food.eaten = true;
      if (this.socket && this.socket.connected) { //if we're online
        console.log('ha');
        this
          .socket
          .emit('food eaten');
        return;
      } else { //if we're offline then we spawn new food
        let _food = new Food(p.random(0, p.width), p.random(0, p.height), 20, getRandColor(), p);
        [food.pos.x, food.pos.y, food.r, food.col] = [_food.pos.x, _food.pos.y, _food.r, _food.col];
        food.eaten = false;
      }
    }
  }

  // we check if we have intersection of head with specified segment however if we
  // pass 'self' we check whole self (local) snake instead of just 1 segment
  checkIfDied(segment) {
    //renaming head for easier access
    let head = this.segments[0];
    if (segment === 'self') {
      //we chech if we have interception with any fof the segments
      return this
        .segments
        .some((segment,i) => {

          // we check if distance between points is less then diamieters of lines. it will
          // not work if we have too big segment length I might work on better formula,
          // but it will not be that efficient
          let dist = this.p.createVector(head.a.x-segment.a.x,head.a.y-segment.a.y).mag();
          if (i>4) {
            return dist < head.sw + segment.sw;
          }

          // if (i>5) { //MAKE THIS VALUE BIGGER IF YOU HAVE TO THICK AND SHORT LINES 
          //   //we check if rectangles intersect
          //   let RectA = {};
          //   let RectB = {};
          //   //first we find sides
          //   if (head.a.x<head.b.x) {
          //     RectA.left = head.a.x-head.sw;
          //     RectA.right = head.b.x+head.sw;
          //   } else {
          //     RectA.left = head.b.x-head.sw;
          //     RectA.right = head.a.x+head.sw;
          //   }
          //   if (head.a.y<head.b.y) {
          //     RectA.top = head.a.y-head.sw;
          //     RectA.bottom = head.b.y+head.sw;
          //   } else {
          //     RectA.top = head.b.y-head.sw;
          //     RectA.bottom = head.a.y+head.sw;              
          //   }

          //   if (segment.a.x<segment.b.x) {
          //     RectB.left = segment.a.x-segment.sw;
          //     RectB.right = segment.b.x+segment.sw;
          //   } else {
          //     RectB.left = segment.b.x-segment.sw;
          //     RectB.right = segment.a.x+segment.sw;
          //   }
          //   if (segment.a.y<segment.b.y) {
          //     RectB.top = segment.a.y-segment.sw;
          //     RectB.bottom = segment.b.y+segment.sw;
          //   } else {
          //     RectB.top = segment.b.y-segment.sw;
          //     RectB.bottom = segment.a.y+segment.sw;              
          //   }
            
          //   if (RectA.left < RectB.right && RectA.right > RectB.left && RectA.top < RectB.bottom && RectA.bottom > RectB.top) {
          //     return true;
          //   }
          // }
          
          //otherwise we return false
          return false;
        });
    } else {
      return this.p.createVector(head.a.x-segment.a.x,head.a.y-segment.a.y).mag() < head.sw + segment.sw;
    }
  }

  // we generate JSON data made of our segments with data necessary for drawing
  // with Segment.draw.bind(segmentData)
  generateJSON() {
    let segJSON = [];
    this
      .segments
      .forEach((segment) => {
        segJSON.push({
          a: {
            x: segment.a.x,
            y: segment.a.y
          },
          b: {
            x: segment.b.x,
            y: segment.b.y
          },
          sw: segment.sw,
          col: segment.col
        });
      });
    return segJSON;
  }
}

export default Snake;

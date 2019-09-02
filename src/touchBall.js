class TouchBall {

  constructor(x_,y_,controller,p5_) {
    this.x=x_;
    this.y=y_;
    this.controller = controller || 'mouse';
    this.maxSpeed = 10;
    //to bind it to specific canvas
    this.p5=p5_;
  }

  //move touchball if canvas is controlled by mouse
  moveMouse() {
    //renaming
    let p5 = this.p5;
    //mouse position
    let mousePos = p5.createVector(p5.mouseX,p5.mouseY);
    //current ball position
    let curPos = p5.createVector(this.x,this.y);

    //vector of where snake head should move
    let desired = mousePos.sub(curPos);

    //limiting speed
    desired = desired.limit(this.maxSpeed);

    //applying movement
    this.x+=desired.x;
    this.y+=desired.y;    
  }

  //move touchball on phones with G-sensor
  movePhone() {
    //move direction
    let rotation = this.p5.createVector(this.p5.rotationY,this.p5.rotationX);
    //limiting it's speed
    rotation = rotation.limit(this.maxSpeed);

    //applying that movement
    this.x+=rotation.x;
    this.y+=rotation.y;
  }

  //position update of touchball
  update() {
      let p5=this.p5;

      if (this.controller==='mouse') this.moveMouse();
      if (this.controller==='touch') this.movePhone();
      

      if (this.x>=p5.width) this.x=p5.width;
      if (this.x<=0) this.x=0;
      if (this.y>=p5.height) this.y=p5.height;
      if (this.y<=0) this.y=0;
  }

}

export default TouchBall;

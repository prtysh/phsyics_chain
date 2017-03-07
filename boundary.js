function Boundary(x, y, w, h, a){
  var options = {
    isStatic : true,
    friction : 0.8,
    angle : a,
    restitution : 0.4
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  //this.body.angle = PI/4;
  World.add(engine.world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(0,0,this.w,this.h);
    pop();
  }
}

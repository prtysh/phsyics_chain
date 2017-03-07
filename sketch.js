
//module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

var engine;
var world;
var ground;
var particles = [];
var boundaries = [];
var mConstraint;

function setup() {
  var canvas = createCanvas(600,400);
  engine = Engine.create();
  world = Engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true
  }

  var prev = null;
  for (var x = width/2; x < width + width/5; x +=30) {

    var fixed = false;
    if(!prev) {fixed = true}
    var p = new Particle(x,height/4,15,fixed, color(random(255), random(255), random(255)));
    //var p2 = new Particle(width/2,height/3,20,color(random(255), random(255), random(255)));

    particles.push(p);
    //particles.push(p2);
    if(prev) {
      var constraintParams = {
        bodyA : p.body,
        bodyB : prev.body,
        length : 20,
        stiffness : 0.5
        }
        var constraint = Constraint.create(constraintParams);
        World.add(engine.world, constraint);
      }
    prev = p;
    }

  boundaries.push(new Boundary(0, height, width*2, 20, 0));
  var canvasMouse = Mouse.create(canvas.elt);
  console.log(canvasMouse);
  canvasMouse.pixelRatio = pixelDensity();
  var mConstraintParams = {
    mouse : canvasMouse
    }
  mConstraint = MouseConstraint.create(engine, mConstraintParams);
  console.log(mConstraint);
  World.add(engine.world, mConstraint);
}
/*
function mouseDragged(){
  particles.push(new Particle(mouseX,mouseY,random(10,30)));
}
*/
function draw() {
  background(51);
  text("click and drag a ball",250,50,325,125);
  Engine.update(engine);
  //console.log(ground);
  fill(155);
  //rect(0,300,400,300);
  for (var i=0; i < particles.length;i++){
    particles[i].show();
    if(particles[i].isOffScreen()){
      particles[i].removeFromWorld();
      particles.splice(i,1);
    }

  }
  for (var j=0; j < boundaries.length;j++){
    boundaries[j].show();
  }
  if(mConstraint.body){
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;
    fill(255,0,0,100);
    ellipse(pos.x,pos.y,10,10);
    stroke(0,255,0,100);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y ,m.x,m.y);
    stroke(0);
    strokeWeight(1);
  }
  //ground.show();
  //rect(boxA.position.x,boxA.position.y,80,250);
}

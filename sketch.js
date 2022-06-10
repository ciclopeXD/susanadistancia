const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var colitaDeAlgodon;
var barrita;
var boton
var comiendo,cortar,fondo,cojinpeddorreta,triste;
//createEdgeSprites();
var blink, eat, sad;

let engine;
let world;
var mute,miut;
var ground;
var bandera=0
var fruit,rope;
var fruit_con;
var varrita;
var bg_img;
var food;
var rabbit;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink= loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  comiendo=loadSound("eating_sound.mp3");
  fondo=loadSound("sound1.mp3");
  cortar=loadSound("rope_cut.mp3");
varrita=loadImage("barrita.jpg");
  cojinpeddorreta=loadSound("air.wav");
  triste=loadSound("sad.wav");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  /*fondo.play();
  fondo.setVolume(0.1);*/
  world = engine.world;
  boton=createImg("cut_button.png");
  boton.position(225,20);
  boton.size(40,40);
  barrita=createSprite(100,140,20,20);
  barrita.addImage(varrita);
  mute=createImg("mute.png");
  mute.position(40,127)
  mute.size(30,30)

  mute.visible=true;
//mute.mouseClicked(volumen);
mute.mouseClicked(volumen1);
  barrita.scale=0.3
  blink.frameDelay=15;
  sad.frameDelay=30;
eat.frameDelay=15;
colitaDeAlgodon = createSprite(300,605,10,10);

colitaDeAlgodon.scale=0.2;
colitaDeAlgodon.addAnimation("blink",blink);
colitaDeAlgodon.addAnimation("sad",sad);
colitaDeAlgodon.addAnimation("eat",eat);
colitaDeAlgodon.changeAnimation("blink");
boton.mouseClicked(drop);
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
if(fruit !=null){
image(food,fruit.position.x,fruit.position.y,70,70);
}
  
  rope.show();
  Engine.update(engine);
  ground.show();
//colitaDeAlgodon.velocityX=2;
if(colitaDeAlgodon.x>500){
  colitaDeAlgodon.velocityX=-2;
}
if(colitaDeAlgodon.x<=0){
  colitaDeAlgodon.velocityX=2;
}
  if(collide(fruit,colitaDeAlgodon)==true){ 
    colitaDeAlgodon.changeAnimation('eat');
    comiendo.play(); 
  }
  if(collide(fruit,ground.body)==true){ 
    colitaDeAlgodon.changeAnimation('sad');
  triste.play(); 
  }
  drawSprites();
}
function collide(cuerpo1,cuerpo2){
  if(cuerpo1 !=null){
var distancia=dist(cuerpo1.position.x,cuerpo1.position.y,cuerpo2.position.x,cuerpo2.position.y);
if(distancia<=80){
World.remove(engine.world,fruit);
fruit=null;
return true;
}else{return false;}
  }
}
function drop(){
rope.break();
cortar.play();
fruit_con.botonDoofenshmirtz();
fruit_con=null
}
function puntaje(){
  if(mute.mouseClicked){
  bandera=+1;
  }
}
function volumen1(){
  fondo.play();
  if(bandera===1){
fondo.setVolume(0.1);
mute.position(50,127);
}}
function volumen2(){
  fondo.setVolume(1);
mute.position(80,127);
}
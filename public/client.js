
console.log('JS');

//click in the square to start generating random dots

'use strict';
var can = document.getElementById('canvas');
var span = document.getElementById('span');
var ctx = can.getContext('2d');
var gameOn = false;
var littleGuyArray = [];
var mousePos;
var hovering = false;
var dotTimer;
var playerCircle = {
    xVal: 400,
    yVal: 300,
    size: 15,
    color: '#325182',
    prevX: 400,
    prevY: 300
  } //playerCircle
var cellsEaten = 0;
//--------------------------------------------------event listeners
//changes the properties of keysPressed object
can.onmouseover = (function() {
  // console.log('its working');
  hovering = true;
  // console.log('hovering:',hovering);
setCoordinates();
});//mousemove function
can.onmousemove = (function(event) {
  mousePos = {
      x: event.pageX - this.offsetLeft,
      y: event.pageY - this.offsetTop
    } //mouse
});//mousemove function
can.onmouseleave = (function() {
  hovering = false;

    // console.log('hovering:',hovering);
  setCoordinates();
});//mousemove function
 var interval;
document.addEventListener('click', function() {
  span.innerHTML = 'Dots Eaten: ' + cellsEaten;

  gameOn = !gameOn;
  // console.log(gameOn);
  if (gameOn) {
    // console.log('in the if');
    interval = setInterval(function() {
      generateRandoCircles();
    }, 300 * (littleGuyArray.length+1));
  } else if(!gameOn){
    // console.log('in the else');
      
        clearInterval(interval);
  } //else
}); //document on click
span.innerHTML = 'Click to Begin';

//--------------------------------------------------------event listeners

function setCoordinates() {
 var rate = 7;
  var i = 0;
 if(hovering == true){
  dotTimer = setInterval(function(){
  	var difX = Math.abs(mousePos.x-playerCircle.xVal);
  	var difY = Math.abs(mousePos.y-playerCircle.yVal)
 if(difX>2 && difY>2){
   
    var percentageX = Number((mousePos.x-playerCircle.xVal)/(difX+difY));
    var percentageY = Number((mousePos.y-playerCircle.yVal)/(difX+difY))
      // console.log(
        // 'rateX: '+rate*percentageX+
        // '               rateY: '+rate*percentageY
        // '              total percentage: '+Number(Math.abs(percentageX)+Math.abs(percentageY))
        // 'mousepos.x '+mousePos.x+
        // ' mousePos.y '+mousePos.y+
        // ' playerCircle.xVal '+playerCircle.xVal+
        // ' playerCircle.yVal '+playerCircle.yVal+
        // 'difference x'+Number(mousePos.x-playerCircle.xVal)+
        // 'difference y'+Number(mousePos.y-playerCircle.yVal)+
        // 'percentage x: '+Number((mousePos.x-playerCircle.xVal)/(Math.abs(mousePos.x-playerCircle.xVal)+Math.abs(mousePos.y-playerCircle.yVal)))+
         // ' percentage y: '+Number((mousePos.y-playerCircle.yVal)/(Math.abs(mousePos.x-playerCircle.xVal)+Math.abs(mousePos.y-playerCircle.yVal)))
      // );
     playerCircle.prevY=playerCircle.yVal;
     playerCircle.prevX=playerCircle.xVal;
     playerCircle.yVal+= rate*percentageY;   
     playerCircle.xVal+= rate*percentageX;
      
      
 
  renderCircle(playerCircle);
  scoreKeeper();
 }//nested if hovering
    // i++;
    // console.log(i);
    
 }, 30);//setinterval
 }else if(hovering == false){
    clearInterval(dotTimer);
   // console.log('dotTimer',dotTimer)
   
  }
  
 


  


} //setCoordinates

function renderCircle(circleIn) {
  if (circleIn == playerCircle) {
    //turn previous location white
    ctx.beginPath();
    ctx.arc(circleIn.prevX, circleIn.prevY, circleIn.size + 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
  } //if
  //renders circle 
  ctx.beginPath();
  ctx.arc(circleIn.xVal, circleIn.yVal, circleIn.size, 0, Math.PI * 2);
  ctx.fillStyle = circleIn.color;
  ctx.strokeStyle = circleIn.color;
  ctx.fill();
  ctx.stroke();
} //renderCircle
function scoreKeeper() {
  // console.log(littleGuyArray);
  // console.log(Math.abs(playerCircle.xVal-littleGuyArray[0].xVal));
  for (var i = 0; i < littleGuyArray.length; i++) {
    // console.log('in for loog');
    if (
      Math.abs(playerCircle.xVal - littleGuyArray[i].xVal) <= playerCircle.size &&
      Math.abs(playerCircle.yVal - littleGuyArray[i].yVal) <= playerCircle.size
    ) {
      littleGuyArray[i].xVal = 99999;
      littleGuyArray.splice(littleGuyArray[i], 1);
      // console.log('score keeper, yo',littleGuyArray);
      cellsEaten++;
      span.innerHTML = 'Dots Eaten:' + cellsEaten;
      playerCircle.size += 1;
    } //if
  } //for loop
} //scoreKeeper
function generateRandoCircles() {
  var colorArray = ['green', 'blue', 'red', 'pink', 'orange', '#ff5050', '#99ff33', '#800000', 'purple', 'yellow'];
  var littleGuy = {
      xVal: Math.floor(Math.random() * 1000),
      yVal: Math.floor(Math.random() * 1000),
      size: 5,
      color: colorArray[Math.floor(Math.random() * 10)]
    } //littleGuy
  if (littleGuy.xVal <= 800 && littleGuy.yVal <= 600) {
    littleGuyArray.push(littleGuy);
    renderCircle(littleGuy);
    // console.log(littleGuyArray);
  } //if

} //generateRando

renderCircle(playerCircle);

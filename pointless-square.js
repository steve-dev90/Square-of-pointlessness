//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime
var squareSpeed = 9000
var speedIncrement = 250

document.addEventListener('DOMContentLoaded', start)

function start () {
    var box = document.getElementById('animate')
    
    buttonEventListensers('outer-circle', increaseSquareSpeed)

    requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, box) 
    })

}

function buttonEventListensers(buttonClass,processFunction) {
    var buttons = document.getElementsByClassName(buttonClass)
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click',processFunction)
    }  
  }

function increaseSquareSpeed() {  
  squareSpeed = Math.max(750,squareSpeed-speedIncrement)    
}


function moveit(timestamp, el) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var dist = document.getElementById('canvas').offsetWidth
    moveBox(el, runtime, dist)

    if (runtime < squareSpeed){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, el)
        }) 
    } 
    // else {
    // //     el.style.left = '0px' 
    //     starttime = timestamp || new Date().getTime() 
    //     requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
    //         moveit(timestamp, el, dist)
    //     })
    // } 
}
 
function moveBox(el, runtime, dist) {
    var progress = runtime / squareSpeed
    progress = Math.min(progress, 1)
    el.style.left = (dist * progress).toFixed(2) + 'px' 
}
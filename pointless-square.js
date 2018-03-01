//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime
var squareDuration = 9000
var speedIncrement = 250

document.addEventListener('DOMContentLoaded', start)

function start () {
    var box = document.getElementById('animate')
    
    buttonEventListensers('outer-circle', increaseSquareSpeed)

    requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, box, 500, 2000) 
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


function moveit(timestamp, element, distance, duration) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    moveElement(runtime, element, distance, duration)
    animateElement(timestamp, runtime, element, distance, duration)
}

function moveElement(runtime, element, distance, duration) {
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    element.style.left = (distance * progress).toFixed(2) + 'px' 
}

function animateElement(timestamp, runtime, element, distance, duration) {
    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, element, distance, duration)
        }) 
    } 
    // else {

    // }
}

// function transit(timestamp, element, distance, duration, moveElement) {
//     //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
//     var timestamp = timestamp || new Date().getTime()
//     var runtime = timestamp - starttime
//     moveElement(runtime, element, distance, duration)
//     animateElement(timestamp, runtime, element, distance, duration)
// })





    // else {
    // //     el.style.left = '0px' 
    //     starttime = timestamp || new Date().getTime() 
    //     requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
    //         moveit(timestamp, el, dist)
    //     })
    // } 

 

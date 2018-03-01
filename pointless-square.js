//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime
var squareDuration = 9000
var speedIncrement = 250

var Box = function() {
    var duration = 3000
    var size = 50

    this.getDuration = function () {
        return duration
    }

    this.getSize = function () {
        return size
    }
    
}


document.addEventListener('DOMContentLoaded', start)

function start () {
    var boxElement = document.getElementById('animate')

    var boxProps = new Box()
    
    buttonEventListensers('outer-circle', increaseSquareSpeed)

    requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, boxElement, 500, boxProps) 
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


function moveit(timestamp, element, distance, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime

    console.log(elProp.getDuration())

    var progress = runtime / elProp.getDuration()
    progress = Math.min(progress, 1)
    element.style.left = (distance * progress).toFixed(2) + 'px' 
    console.log(element.style.left)

    if (runtime < elProp.getDuration()){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, element, distance, elProp)
        }) 
    } else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transout(timestamp, element, 50, distance) 
        })    
    }
}

function transout(timestamp, element, size, startpos) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var delta, x, y
    var duration = 700 //CHANGE
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    delta = parseFloat( (size * progress).toFixed(2) )
    y = size - delta
    x = startpos + delta
    element.style.width = y + 'px'
    element.style.left = x +'px'
    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            transout(timestamp, element, size, startpos)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            element.style.left = 0
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transin(timestamp, element, size) 
        })    
    }  
}

function transin(timestamp, element, size) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
   
    var duration = 700 //CHANGE
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    var delta = parseFloat( (size * progress).toFixed(2) )
    element.style.width = delta + 'px'

    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            transin(timestamp, element, size)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            moveit(timestamp, element, 500, 5000) 
        })
    }
    
    
}



    // else {
    // //     el.style.left = '0px' 
    //     starttime = timestamp || new Date().getTime() 
    //     requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
    //         moveit(timestamp, el, dist)
    //     })
    // } 



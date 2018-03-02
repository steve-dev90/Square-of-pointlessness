//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime

var Box = function() {
    var duration = 3000
    var size = 50

    this.getDuration = function () {
        return duration
    }

    this.getSize = function () {
        return size
    }
    
    this.setDuration = function (newDuration) {
        duration = newDuration
    }

}

document.addEventListener('DOMContentLoaded', start)

function start () {
    var boxElement = document.getElementById('animate')

    boxProps = new Box()
    
    buttonEventListensers('speed', function(event) {increaseSpeed(event,boxProps)})

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

function increaseSpeed(event,elProp) {
  var button = event.target.innerText   
  var increment = 250
  var boxDuration = boxProps.getDuration() 
  if (button == '+') {
    boxDuration = Math.max(750,boxDuration-increment)
  } else {
    boxDuration = Math.min(4000,boxDuration+increment)  
  } 
   
  elProp.setDuration(boxDuration) 
  console.log('Click : ' + boxDuration)  
}


function moveit(timestamp, element, distance, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var duration = elProp.getDuration()
    //console.log('moveit duration: ' + duration)

    var progress = runtime / duration
    progress = Math.min(progress, 1)
    element.style.left = (distance * progress).toFixed(2) + 'px' 
    //console.log(element.style.left)

    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, element, distance, elProp)
        }) 
    } else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transout(timestamp, element, distance, elProp) 
        })    
    }
}

function transout(timestamp, element, startpos, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var delta, x, y
    var size = elProp.getSize()
    var duration = elProp.getDuration()*(size/startpos)
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    delta = parseFloat( (size * progress).toFixed(2) )
    y = size - delta
    x = startpos + delta
    element.style.width = y + 'px'
    element.style.left = x +'px'
    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            transout(timestamp, element, startpos, elProp)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            element.style.left = 0
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transin(timestamp, element, elProp) 
        })    
    }  
}

function transin(timestamp, element, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var size = elProp.getSize()
    var duration = elProp.getDuration()*(size/500) //CHANGE
   
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    var delta = parseFloat( (size * progress).toFixed(2) )
    element.style.width = delta + 'px'

    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            transin(timestamp, element, elProp)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            moveit(timestamp, element, 500, elProp) 
        })
    }
    
    
}



//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime

var Box = function() {
    var duration = 3000
    var size = 50
    var element = document.getElementById('animate')
    var radius = 0

    this.getDuration = function () {
        return duration
    }

    this.getSize = function () {
        return size
    }

    this.getElement = function () {
        return element
    } 
    
    this.getRadius = function () {
        return radius
    }     
    
    this.setDuration = function (newDuration) {
        duration = newDuration
    }

    this.setSize = function (newSize) {
        size = newSize
    }

    this.setRadius = function (newRadius) {
        radius = newRadius
    }    

}

document.addEventListener('DOMContentLoaded', start)

function start () {
    var boxElement = document.getElementById('animate')

    var boxProps = new Box()
    
    buttonEventListensers('speed', function(event) {changeSpeed(event, boxProps)})
    buttonEventListensers('size', function(event) {changeSize(event, boxProps)})
    buttonEventListensers('point', function(event) {changePoint(event, boxProps)})

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

function changeSpeed(event, elProp) {
  var button = event.target.innerText   
  var increment = 250
  var boxDuration = elProp.getDuration() //Changed from boxProps
  if (button == '+') {
    boxDuration = Math.max(750,boxDuration-increment)
  } else {
    boxDuration = Math.min(6000,boxDuration+increment)  
  } 
  
  elProp.setDuration(boxDuration) 
  console.log('Click : ' + boxDuration)  
}

function changeSize(event, elProp) {
  var button = event.target.innerText   
  var increment = 2
  var boxSize = elProp.getSize()
  if (button == '+') {
    boxSize = Math.min(70, boxSize + increment)
  } else {
    boxSize = Math.max(20,boxSize - increment)  
  }    
  elProp.setSize(boxSize) 
  elProp.getElement().style.width = boxSize + 'px'
  elProp.getElement().style.height = boxSize + 'px'
  console.log('Click : ')  
}

function changePoint(event, elProp) {
  var button = event.target.innerText   
  var increment = 2
  var boxRadius = elProp.getRadius()
  if (button == '+') {
    boxRadius = Math.min(elProp.getSize(), boxRadius + increment)
  } else {
    boxRadius = Math.max(0,boxRadius - increment)  
  }    
  elProp.setRadius(boxRadius) 
  elProp.getElement().style.borderRadius = boxRadius + 'px'
  console.log('Click : ')  
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



//Request animation blue print from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

var starttime
var col = ['red','blue','violet','green','cyan','orange','yellow','azure','crimson']

var Box = function() {
    var duration = 3000
    var size = 50
    var element = document.getElementById('animate')
    var distFromTop = 200
    var noOfColours = 0

    this.getDuration = function () { return duration }
    this.getSize = function () { return size }
    this.getElement = function () { return element }  
    this.getDistFromTop = function () { return distFromTop}
    this.getNoOfColours = function () { return noOfColours}

    
    this.setDuration = function (newDuration) { duration = newDuration }
    this.setSize = function (newSize) { size = newSize }
    this.setDistFromTop = function (newDistFromTop) { distFromTop = newDistFromTop } 
    this.setNoOfColours = function (newNoOfColours) { noOfColours = newNoOfColours}

}

var Canvas = function() {
    this.getWidth = function () { return document.getElementsByClassName('row')[1].offsetWidth}
    this.getHeight = function () { return document.getElementsByClassName('row')[1].offsetHeight}
}

document.addEventListener('DOMContentLoaded', start)

function start () {
    var boxElement = document.getElementById('animate')

    var boxProps = new Box()
    var canvasProps = new Canvas()
    
    buttonEventListensers('speed', function(event) {changeSpeed(event, boxProps)})
    buttonEventListensers('size', function(event) {changeSize(event, boxProps)})
    buttonEventListensers('height', function(event) {changePosition(event, boxProps, canvasProps)})
    buttonEventListensers('colour', function() {changeColourNum(event, boxProps)})


    requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, boxElement, canvasProps, boxProps) 
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
  //console.log('Click : ' + boxDuration)  
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
  //console.log('Click : ')  
}

function changePosition(event, elProp, backProp) {
  var button = event.target.innerText   
  var increment = backProp.getHeight()/20
  var boxDistFromTop = elProp.getDistFromTop()
  if (button == '+') {
    boxDistFromTop = Math.min(backProp.getHeight() - elProp.getSize(), boxDistFromTop + increment)
  } else {
    boxDistFromTop = Math.max(0,boxDistFromTop - increment)  
  }    
  elProp.setDistFromTop(boxDistFromTop) 
  elProp.getElement().style.top = boxDistFromTop + 'px'
  //console.log('Click : ')  
}

function changeColourNum(event, elProp) {

    var button = event.target.innerText 
    var numColours = elProp.getNoOfColours() 

    console.log('Click : ' ) 

    button == '+' ? Math.min(col.length, numColours ++) : 
                    Math.max(0, numColours --) 
    elProp.setNoOfColours(numColours)

    //changeColour(numColours, elProp)
  }

function changeColour(numColours, elProp) {
    elProp.getElement().style.backgroundColor = col[Math.floor(Math.random()*numColours)]
}

function moveit(timestamp, element, canProp, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var duration = elProp.getDuration()
    var distance = canProp.getWidth() - elProp.getSize()
    //console.log('moveit duration: ' + duration)

    var progress = runtime / duration
    progress = Math.min(progress, 1)
    element.style.left = (distance * progress).toFixed(2) + 'px'
    changeColour(elProp.getNoOfColours(),elProp) 
    console.log(canProp.getWidth())

    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            moveit(timestamp, element, canProp, elProp)
        }) 
    } else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transout(timestamp, element, canProp, elProp) 
        })    
    }
}

function transout(timestamp, element, canProp, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var delta, x, y
    var size = elProp.getSize()
    var startpos = canProp.getWidth() - elProp.getSize()
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
            transout(timestamp, element, canProp, elProp)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            element.style.left = 0
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            transin(timestamp, element, canProp, elProp) 
        })    
    }  
}

function transin(timestamp, element, canProp, elProp) {
    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
    var timestamp = timestamp || new Date().getTime()
    var runtime = timestamp - starttime
    var size = elProp.getSize()
    var canvasWidth = canProp.getWidth()
    var duration = elProp.getDuration()*(size/canvasWidth) //CHANGE
   
    var progress = runtime / duration
    progress = Math.min(progress, 1)
    var delta = parseFloat( (size * progress).toFixed(2) )
    element.style.width = delta + 'px'

    if (runtime < duration){ // if duration not met yet
        requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
            transin(timestamp, element, canProp, elProp)
        }) 
    }  else {
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
            moveit(timestamp, element, canProp, elProp) 
        })
    }
    
    
}



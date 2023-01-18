const grid = document.querySelector('.grid')
const width = 25
let direction = 'down'
let over = false
let grow = false
let counter = 0
let xPos = 0
let yPos = 0
let isPaused = true
let len = 1
document.getElementById('score').innerText = len

// Creates empty grid
for (let i = 0; i < (width*width); i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

// Creates array containing every "div" element (or block) in the grid
squares = Array.from(document.querySelectorAll(".grid div"))

// Array that contains the indices of snake parts
let snake = [0];

// Initial draw of the game grid
function draw() {
    for (let i = 0; i < snake.length; i++) {
        squares[snake[i]].classList.add('snake')
    }
}

draw();

// Switches the direction if a key is pressed
function switchDirection(e) {        
    squares[snake[0]].classList.remove('snake')
    switch(e.key) {
        case 'ArrowLeft' :
            if (snake[0] - 1 != snake[1]) {
                direction = 'left'
            }
            break
        
        case 'ArrowRight' :
            if (snake[0] + 1 != snake[1]) {
                direction ='right'
            }
            break

        case 'ArrowDown' :
            if (snake[0] + width != snake[1]) {
                direction = 'down'
            }
            break

        case 'ArrowUp' :
            if (snake[0] - width != snake[1]) {
                direction = 'up'
            }
            break
        
        case ' ' :
            isPaused = !isPaused
            console.log(isPaused)
            break
    }
    squares[snake[0]].classList.add('snake')
}

// Constant moving function for snake body
function moveSnake() {
    if (!grow) {
        squares[snake[snake.length - 1]].classList.remove('snake')
    }
    else {
        snake.push(0)
    }
    pastVal = snake[0]
    let currVal
    switch(direction) {
        case 'left' :
            snake[0]-=1
            xPos--
            break
        
        case 'right' :
            snake[0] += 1
            xPos++
            break
        
        case 'up' :
            snake[0] -= width
            yPos--
            break

        case 'down' :
            snake[0] += width
            yPos++
            break
    }

    for (let i = 1; i < snake.length; i++) {
        currVal = snake[i]
        snake[i] = pastVal
        pastVal = currVal
    }
    
    if (checkEndGame()) {
        return
    }

    squares[snake[0]].classList.add('snake')

    if (squares[snake[0]].classList.contains('food')) {
        squares[snake[0]].classList.remove('food')
        spawnFood()
        grow = true
    }
}

// Spawns food at random index
function spawnFood() {
    place = Math.floor(Math.random()*squares.length)
    if (!squares[place].classList.contains('snake')) {
        squares[place].classList.add('food')
    }
    else {
        spawnFood()
    }
}

// Checks if head is touching body or is outside of the limits
function checkEndGame() {
    if (yPos < 0 || yPos >= width || xPos < 0 || xPos >= width) {
        clearInterval(interval)
        return true
    }

    else if (squares[snake[0]].classList.contains('snake')) {
        clearInterval(interval)
        return true
    }

    return false
}
document.addEventListener('keydown', switchDirection)
spawnFood()
// Actual code that is run
interval = setInterval(function() {
    if (!isPaused) {
        if (counter == 2) {
            grow = false
            counter = 0
            
        }
        else if (grow) {
            counter++
            len++
        }
        moveSnake()
        document.getElementById('score').innerText = len
    }
}
, 100)


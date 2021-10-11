
// const playerInputName = window.prompt('What is your name?')

const score = document.querySelector('.score')
const playerName = document.querySelector('.player-name')
const health = document.querySelector('.health')
const grid = document.querySelector('.grid')

health.innerHTML = 3

// playerName.innerText = playerInputName 

const width = 10
const cellCount = width * width
const cells = []
const removedVirus = []
const explosionClass = 'explosion'
let laserClass = 'laser'
let bombClass = 'bomb'

const startingSynrgiePosition = 94
let currentSynergiePosition = 94
let synergineClass = 'synergie'

const virusClass = 'virus'

const virusArray = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37]

function addVirus() {
  for (let i = 0; i < virusArray.length; i++) {
    if (!removedVirus.includes(i)) {
      cells[virusArray[i]].classList.add(virusClass)
    }
  }
}

function removeVirus() {
  for (let i = 0; i < virusArray.length; i++) {
    cells[virusArray[i]].classList.remove(virusClass)
  }
}

function createGrid(startingSynrgiePosition) {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    grid.appendChild(cell)
    cells.push(cell)
  }
  addVirus()
  addSynergine(startingSynrgiePosition)
}

function addSynergine(position) {
  cells[position].classList.add(synergineClass)
}

function removeSynergine(position) {
  cells[position].classList.remove(synergineClass)
}

function handleKeyUp(event) {
  console.log('position before key', currentSynergiePosition)
  const key = event.keyCode
  removeSynergine(currentSynergiePosition)

  if (key === 39 && currentSynergiePosition % width !== width - 1) {
    console.log('RIGHT')
    currentSynergiePosition++
  } else if (key === 37 && currentSynergiePosition % width !== 0) {
    console.log('LEFT')
    currentSynergiePosition--
  }
  addSynergine(currentSynergiePosition)
}

function moveVirus() {

  removeVirus()


  for (let i = 0; i < virusArray.length; i++) {
    virusArray[i] += 1
  }
  addVirus()



  if (cells[currentSynergiePosition].classList.contains('virus', 'synergie')) {
    health.innerText = '☠️'
    window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}! Your score is ${score.innerText}!`)
    clearInterval(moving)
  }

  if (removedVirus.length === virusArray.length) {
    window.alert(`Yesss, you win Dr. ${playerName.innerText}! Your score is ${score.innerText}!`)
    clearInterval(moving)
  }
}

function shoot(event) {

  let laserPosition
  let currentLaserPosition = currentSynergiePosition


  function laserMove() {
    cells[currentLaserPosition].classList.remove(laserClass)
    currentLaserPosition -= width
    cells[currentLaserPosition].classList.add(laserClass)

    if (cells[currentLaserPosition].classList.contains(virusClass)) {
      cells[currentLaserPosition].classList.remove(laserClass)
      cells[currentLaserPosition].classList.remove(virusClass)
      cells[currentLaserPosition].classList.add(explosionClass)

      setTimeout(() => cells[currentLaserPosition].classList.remove(explosionClass), 300)
      clearInterval(laserPosition)

      const removeVirus = virusArray.indexOf(currentLaserPosition)
      removedVirus.push(removeVirus)
      score.innerText = parseInt(score.innerText) + 10
    }

  }
  if (event.keyCode === 32) {
    laserPosition = setInterval(laserMove, 100)
  }
}


function bomb(event) {

  let bombPosition
  let currentBombmPosition = virusArray[parseInt(Math.random() * virusArray.length)]


  function bombMove() {

    cells[currentBombmPosition].classList.remove(bombClass)
    currentBombmPosition += width
    cells[currentBombmPosition].classList.add(bombClass)

    if (cells[currentBombmPosition].classList.contains(synergineClass)) {
      cells[currentBombmPosition].classList.remove(bombClass)
      cells[currentBombmPosition].classList.remove(synergineClass)
      cells[currentBombmPosition].classList.add(explosionClass)
      setTimeout(() => cells[currentSynergiePosition].classList.remove(explosionClass), 100)
      clearInterval(bombPosition)

      health.innerText = parseInt(health.innerText) - 1

      if (parseInt(health.innerText) <= 0) {
        window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}! Your score is ${score.innerText}!`)
        clearInterval(moving)   
        synergineClass = ''
        laserClass = ''
        bombClass = ''

      }
    }
  }
  if (event.keyCode === 32) {
    bombPosition = setInterval(bombMove, 100)
  }
}


let movingInterval = 500

const moving = setInterval(moveVirus, movingInterval)
document.addEventListener('keyup', handleKeyUp)

createGrid(startingSynrgiePosition)


document.addEventListener('keydown', shoot)
document.addEventListener('keydown', bomb)



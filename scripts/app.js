

const playerInputName = window.prompt('What is your name?')

const score = document.querySelector('.score')
const playerName = document.querySelector('.player-name')
const health = document.querySelector('.health')
const grid = document.querySelector('.grid')



health.innerHTML = 3

playerName.innerText = playerInputName

const width = 10
const cellCount = width * width
const cells = []
const removedVirus = []
const explosionClass = 'explosion'
const laserClass = 'laser'


const startingSynrgiePosition = 94
let currentSynergiePosition = 94
const synergineClass = 'synergie'

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
  virusArray[0] % width === 0
  virusArray[virusArray.length - 1] % width === width - 1

  removeVirus()
  for (let i = 0; i < virusArray.length; i++) {
    virusArray[i] += 1
  }

  addVirus()

  if (cells[currentSynergiePosition].classList.contains('virus', 'synergie')) {
    score.innerText = 'Game Over'
    health.innerText = '☠️'
    window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}!`)
    clearInterval(moving)
  }

  if (removedVirus.length === virusArray.length) {
    score.innerText = 'You Win!'
    window.alert(`Yesss, you win Dr. ${playerName.innerText}!`)
    clearInterval(moving)
  }
}

const moving = setInterval(moveVirus, 500)
document.addEventListener('keyup', handleKeyUp)

createGrid(startingSynrgiePosition)

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
document.addEventListener('keydown', shoot)



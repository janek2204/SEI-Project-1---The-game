
const playerInputName = window.prompt('What is your name?')
const audio = document.querySelector('audio')


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
const removedVirusSecondArray = []

const explosionClass = 'explosion'
let laserClass = 'laser'
let bombClass = 'bomb'

const startingSynrgiePosition = 94
let currentSynergiePosition = 94
let synergineClass = 'synergie'

const virusClass = 'virus'
const virus2Class = 'virus2'

const virusArray = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37]
const virusArraySecondWave = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37]

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

//creating grid and squares 
function createGrid(startingSynrgiePosition) {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // cell.innerText = i
    grid.appendChild(cell)
    cells.push(cell)
  }
  addVirus()
  addSynergine(startingSynrgiePosition)
}

//adding synergie class to the grid on the position choosen above
function addSynergine(position) {
  cells[position].classList.add(synergineClass)
}
// remowing synergie class
function removeSynergine(position) {
  cells[position].classList.remove(synergineClass)
}
// moving synrgie on the grid
function handleKeyUp(event) {
  // console.log('position before key', currentSynergiePosition)
  const key = event.keyCode
  removeSynergine(currentSynergiePosition)

  if (key === 39 && currentSynergiePosition % width !== width - 1) {
    // console.log('RIGHT')
    currentSynergiePosition++
  } else if (key === 37 && currentSynergiePosition % width !== 0) {
    // console.log('LEFT')
    currentSynergiePosition--
  }
  addSynergine(currentSynergiePosition)
}
// moving and behaciour of first wave and drawing virus on the grid
function moveVirus() {

  removeVirus()

  let direction = - 1

  if (virusArray[0] % width === 0) {
    for (let i = 0; i < virusArray.length; i++) {
      virusArray[i] += 13
      direction = 1
    }
  }

  // if (virusArray[0] % width === 9) {      
  //   for (let i = 0; i < virusArray.length; i++) {
  //     virusArray[i] -= 7
  //     direction = -1
  //   }
  // }

  for (let i = 0; i < virusArray.length; i++) {
    virusArray[i] += direction
  }

  addVirus()

  if (cells[currentSynergiePosition].classList.contains('virus', 'synergie')) {
    health.innerText = '☠️'
    window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}! Your score is ${score.innerText}!`)
    clearInterval(movingIntervalVirusSecondWave)
    synergineClass = ''
    laserClass = ''
    bombClass = ''
    clearInterval(randomBombs)
    clearInterval(movingIntervalVirusSecondWave)
  }

  if (score.innerText >= 240) {
    clearInterval(movingIntervalVirus)
    moveSecondWave()
    movingIntervalVirusSecondWave = setInterval(moveSecondWave, 500)
  }
}

let movingIntervalVirusSecondWave
// shootig functions and laser movement
function shoot(event) {

  let movingLaserInterval
  let currentLaserPosition = currentSynergiePosition


  function laserMove() {
    cells[currentLaserPosition].classList.remove(laserClass)
    currentLaserPosition -= width
    cells[currentLaserPosition].classList.add(laserClass)

    function playAudio() {
      audio.src = './assets/sounds/Fireball-Magic-Attack-A-www.fesliyanstudios.com.mp3'
      audio.play()
    }

    if (cells[currentLaserPosition].classList.contains(virusClass)) {
      cells[currentLaserPosition].classList.remove(laserClass)
      cells[currentLaserPosition].classList.remove(virusClass)
      cells[currentLaserPosition].classList.add(explosionClass)

      setTimeout(() => cells[currentLaserPosition].classList.remove(explosionClass), 300)
      clearInterval(movingLaserInterval)

      const removeVirus = virusArray.indexOf(currentLaserPosition)
      playAudio()
      removedVirus.push(removeVirus)

      score.innerText = parseInt(score.innerText) + 10
    }

    if (cells[currentLaserPosition].classList.contains(virus2Class)) {
      cells[currentLaserPosition].classList.remove(laserClass)
      cells[currentLaserPosition].classList.remove(virus2Class)
      cells[currentLaserPosition].classList.add(explosionClass)

      setTimeout(() => cells[currentLaserPosition].classList.remove(explosionClass), 300)
      clearInterval(movingLaserInterval)

      const secondRemoveVirus = virusArraySecondWave.lastIndexOf(currentLaserPosition)

      removedVirusSecondArray.push(secondRemoveVirus)

      score.innerText = parseInt(score.innerText) + 15

      playAudio()
    }
    // almost ready for laser and bomb colision

    // if (cells[currentLaserPosition].classList.contains('bomb', 'laser')) {
    //   cells[currentLaserPosition].classList.remove(bombClass)
    //   cells[currentLaserPosition].classList.remove(laserClass)
    //   cells[currentLaserPosition].classList.add(explosionClass)
    //   setTimeout(() => cells[currentLaserPosition].classList.remove(explosionClass), 100)
    //   clearInterval(movingLaserInterval)

    //   score.innerText = parseInt(score.innerText) + 10
    // }
  }
  function playLaserAudio() {
    audio.src = './assets/sounds/Woosh-B11-www.fesliyanstudios.com.mp3'
    audio.play()
  }
  if (event.keyCode === 32) {
    movingLaserInterval = setInterval(laserMove, 100)
    playLaserAudio()
  }
}

//bombs behaviour and drawing on the grid
function bomb() {

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


      health.innerText = parseInt(health.innerText) - 1

      if (parseInt(health.innerText) <= 0) {
        window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}! Your score is ${score.innerText}!`)
        clearInterval(movingIntervalVirus)
        synergineClass = ''
        laserClass = ''
        bombClass = ''
        clearInterval(randomBombs)
      }
    }
  }

  setInterval(bombMove, 500)
}

// second wave movement on the grid and drawing virus on the grid

function addVirus2() {
  for (let i = 0; i < virusArraySecondWave.length; i++) {
    if (!removedVirusSecondArray.includes(i)) {
      cells[virusArraySecondWave[i]].classList.add(virus2Class)
    }
  }
}

function removeVirus2() {
  for (let i = 0; i < virusArraySecondWave.length; i++) {
    cells[virusArraySecondWave[i]].classList.remove(virus2Class)
  }
}

function moveSecondWave() {
  removeVirus2()

  let direction = -1

  if (virusArraySecondWave[0] % width === 0) {
    for (let i = 0; i < virusArraySecondWave.length; i++) {
      virusArraySecondWave[i] += 13
      direction = 1
    }
  }

  for (let i = 0; i < virusArraySecondWave.length; i++) {
    virusArraySecondWave[i] += direction
  }

  addVirus2()


  if (cells[currentSynergiePosition].classList.contains('virus2', 'synergie')) {
    health.innerText = '☠️'
    window.alert(`Sorry, You loose Dr. ${playerName.innerHTML}! Your score is ${score.innerText}!`)
    clearInterval(movingIntervalVirusSecondWave)
    synergineClass = ''
    laserClass = ''
    bombClass = ''
    clearInterval(randomBombs)
    clearInterval(movingIntervalVirusSecondWave)
  }

  if (removedVirusSecondArray.length === virusArraySecondWave.length) {
    window.alert(`Yesss, you win Dr. ${playerName.innerText}! Your score is ${score.innerText}!`)
    clearInterval(movingIntervalVirusSecondWave)
    clearInterval(randomBombs)
  }
}


const randomBombs = setInterval(bomb, 1200)

const movingIntervalVirus = setInterval(moveVirus, 800)

document.addEventListener('keyup', handleKeyUp)

createGrid(startingSynrgiePosition)

document.addEventListener('keydown', shoot)

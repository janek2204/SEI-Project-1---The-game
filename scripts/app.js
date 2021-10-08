function init() {

  const grid = document.querySelector('.grid')
  
  const width = 10
  const cellCount = width * width
  const cells = []

  const startingCatPosition = 0
  let currentCatPosition = 0
  const catClass = 'cat'

  function createGrid(startingCatPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addCat(startingCatPosition)
  }

  function addCat(position) {
    cells[position].classList.add(catClass)
  }

  function removeCat(position) {
    cells[position].classList.remove(catClass)
  }


  function handleKeyUp(event) {
    console.log('position before key', currentCatPosition)
    const key = event.keyCode
    removeCat(currentCatPosition)

    if (key === 39 && currentCatPosition % width !== width - 1) {
      console.log('RIGHT')
      currentCatPosition++
    } else if (key === 37 && currentCatPosition % width !== 0) {
      console.log('LEFT')
      currentCatPosition--
    } else if (key === 38 && currentCatPosition >= width) {
      console.log('UP')
      currentCatPosition -= width
    } else if (key === 40 && currentCatPosition + width <= width * width - 1) {
      console.log('DOWN')
      currentCatPosition += width
    } else {
      console.log('INVALID KEY')
    }

    addCat(currentCatPosition)
  }
  document.addEventListener('keyup', handleKeyUp)

  createGrid(startingCatPosition)

}

window.addEventListener('DOMContentLoaded', init)
import store from '../lib/store.js'
import {map} from 'lodash/fp'
import {COLOR_SET} from '../action/color.js'
const colorPallet = document.getElementById('color-pallet')
const colorPreview = document.getElementById('color-preview')

export const createBlotches = map(color => {
  let e = document.createElement('li')
  e.style.background = color
  return e
})

export const addChilrenEvents = map(blotch => {
  blotch.addEventListener('click', (e) => {
    let color = e.target.style.background
    store.dispatch(COLOR_SET(color))
  })
})

export const render = () => {
  const {pallet} = store.getState()
  colorPallet.textcontent = ''
  colorPallet.append(...createBlotches(pallet))
  addChilrenEvents(colorPallet.children)
}

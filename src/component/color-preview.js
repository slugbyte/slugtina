'use strict'

import store from '../lib/store.js'
const colorPreview = document.getElementById('color-preview')

store.subscribe(() => {
  let {color} = store.getState()
  colorPreview.style.background = color
})

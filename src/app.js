'use strict';

import store from './lib/store.js'
import * as pallet from './component/pallet.js'
import * as board from './component/board.js'
import * as previewBoard from './component/preview-board.js'
import './component/color-preview.js'
import './component/history.js'
import './component/tool-box.js'
import './lib/keyboard.js'

window.onload = function(){
  pallet.render()
  board.resize()
  previewBoard.resize()
  store.dispatch({type: 'NOOP'})
}

window.onresize = function(){
  board.resize()
}

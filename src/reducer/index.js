import {combineReducers} from 'redux'
import setter from './setter.js'
import counter from './counter.js'
import toggler from './toggler.js'
import stacker from './stacker.js'
import history from './history.js'
import tool from './tool.js'
import strokeSize from './stroke-size.js'

export default combineReducers({
  tool,
  history,
  color: setter({name: 'COLOR', initial: '#fff'}),
  background: setter({name: 'BACKGROUND', initial: '#000'}),
  drawing: toggler({name: 'DRAWING', initial: false}),
  brushSize: strokeSize({name: 'BRUSH', initial: 3}),
  eraserSize: strokeSize({name: 'ERASER', initial: 65}),
  pallet: setter({name: 'PALLET', initial: [
    '#fff',
    '#222',
    '#00abff',
    '#7aff7a',
    'yellow',
    '#f0c000',
    '#ff7a7a',
  ]}),
})

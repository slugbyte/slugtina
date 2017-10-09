import store from './store.js'
import * as board from '../component/board.js'

const toolSet = (tool) => {
  store.dispatch({
    type: 'TOOL_SET',
    payload: tool,
  })
}

const colorSet = (color) => {
  store.dispatch({
    type: 'COLOR_SET',
    payload: color,
  })
}

const toolSizeChange = (tool) => (amount) => {
  store.dispatch({
    type: `${tool}_SIZE_INC`,
    payload: amount,
  })
}

document.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'x':
      board.clear()
      break;
    case 'u': case '<':
      board.undo()
      break;
    case 'r':  case '>':
      board.redo()
      break;
    case 'e':
      toolSet('eraser')
      break;
    case 'b':
      toolSet('brush')
      break;
    case '=':
      toolSizeChange('BRUSH')(10)
      break;
    case '-':
      toolSizeChange('BRUSH')(-10)
      break;
    case '+':
      toolSizeChange('BRUSH')(1)
      break;
    case '_':
      toolSizeChange('BRUSH')(-1)
      break;
    case ']':
      toolSizeChange('ERASER')(10)
      break;
    case '[':
      toolSizeChange('ERASER')(-10)
      break;
    case '}':
      toolSizeChange('ERASER')(1)
      break;
    case '{':
      toolSizeChange('ERASER')(-1)
      break;
    case '1': case '2': case '3': case '4': case '5': case '6': case '7':
      colorSet(store.getState().pallet[parseInt(e.key) - 1]);
      break;
  }
})

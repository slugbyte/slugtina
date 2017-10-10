import store from '../lib/store.js'

const brushSizeInput = document.getElementById('brush-size')
const eraserSizeInput = document.getElementById('eraser-size')

let buttons = {
  brush: document.getElementById('brush-select'),
  roller: document.getElementById('roller-select'),
  select: document.getElementById('select-select'),
  eraser: document.getElementById('eraser-select'),
}

const setToolHandler = (tool) => () => {
  store.dispatch({
    type: 'TOOL_SET',
    payload: tool,
  })
}

const setToolSizeHandler = (tool) => (e) => {
  store.dispatch({
    type: `${tool}_SIZE_SET`,
    payload: Number(e.target.value),
  })
}

buttons.brush.addEventListener('click', setToolHandler('brush'))
buttons.roller.addEventListener('click', setToolHandler('roller'))
buttons.select.addEventListener('click', setToolHandler('select'))
buttons.eraser.addEventListener('click', setToolHandler('eraser'))

brushSizeInput.addEventListener('change', setToolSizeHandler('BRUSH'))
eraserSizeInput.addEventListener('change', setToolSizeHandler('ERASER'))

store.subscribe(() => {
  let {brushSize, eraserSize, tool} = store.getState()
  brushSizeInput.value = brushSize
  eraserSizeInput.value = eraserSize 

  Object.keys(buttons).forEach(key => {
    console.log('key', key, tool)
    if(key === tool)
      buttons[key].className = 'selected'
    else 
      buttons[key].className = ''
  })
  
})

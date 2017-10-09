import store from '../lib/store.js'

const brushSelectButton = document.getElementById('brush-select')
const eraserSelectButton = document.getElementById('eraser-select')
const brushSizeInput = document.getElementById('brush-size')
const eraserSizeInput = document.getElementById('eraser-size')

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

brushSelectButton.addEventListener('click', setToolHandler('brush'))
eraserSelectButton.addEventListener('click', setToolHandler('eraser'))
brushSizeInput.addEventListener('change', setToolSizeHandler('BRUSH'))
eraserSizeInput.addEventListener('change', setToolSizeHandler('ERASER'))

store.subscribe(() => {
  let {brushSize, eraserSize, tool} = store.getState()
  brushSizeInput.value = brushSize
  eraserSizeInput.value = eraserSize 

  if(tool === 'brush'){
    brushSelectButton.className = 'selected'
    eraserSelectButton.className = ''
  } else {
    brushSelectButton.className = ''
    eraserSelectButton.className = 'selected'
  }
  
})

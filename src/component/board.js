import store from '../lib/store.js'

let {getState, dispatch} = store
let historyIndex = 0
let strokeBuffer = null

const board = document.getElementById('slugboard')
const ctx = board.getContext('2d')

export const strokeRender = ({data, start=0}) => {
  ctx.shadowBlur = 0.5
  ctx.lineJoin  = ctx.lineCap = 'round'
  for(var i=start; i<data.length;i++){
    let stroke = data[i]
    switch(stroke.type){
      case 'down':
        ctx.lineWidth = stroke.size;
        ctx.shadowColor= stroke.color
        ctx.strokeStyle = stroke.color
        ctx.moveTo(stroke.x, stroke.y)
        ctx.beginPath()
        break
      case 'move':
        ctx.lineTo(stroke.x , stroke.y)
        ctx.moveTo(stroke.x, stroke.y)
        break
      case 'up':
        ctx.closePath()
        ctx.stroke()
        break
      default:
        ctx.lineTo(stroke.x, stroke.y)
    }
  }
}

export const draw = () => {
  let {history} = getState()
  let next = historyIndex || 0
  for(;next < history.main.length; next++){
    const command = history.main[next]
    switch(command.action){
      case 'brush':
        strokeRender(command)
        break;
    }
  }
}

export const refresh = () => {
  historyIndex = 0
  ctx.clearRect(0, 0, board.width, board.height);
  draw()
}

export const clear = () => {
  dispatch({ type: 'HISTORY_CLEAR' })
  refresh()
}

export const resize = () => {
  board.width = window.innerWidth;
  board.height = window.innerHeight * 0.9;
  refresh()
}


export const undo = () => {
  store.dispatch({type: 'HISTORY_UNDO'})
  refresh()
}

export const redo = () => {
  store.dispatch({type: 'HISTORY_REDO'})
  refresh()
}

export const strokeCreate = ({x, y, type}) => {
  let {color, tool, brushSize, eraserSize, strokes} = getState()

  let isErasor = tool === 'eraser'
  color = isErasor ? '#000' : color
  let size = isErasor ? eraserSize : brushSize

  return {x, y, type, tool, color, size}
}

// events 
board.addEventListener('mousedown', (e) => {
  strokeBuffer = {action: 'brush', data: []}
  let data = strokeCreate({x: e.clientX, y: e.clientY, type: 'down'})
  strokeBuffer.data.push(data)
  ctx.lineWidth = data.size;
  ctx.shadowColor = data.color
  ctx.strokeStyle = data.color
  ctx.moveTo(e.clientX, e.clientY)
  ctx.beginPath()
})

board.addEventListener('mousemove', (e) => {
  if(!strokeBuffer) return
  strokeBuffer.data.push(strokeCreate({x: e.clientX, y: e.clientY, type: 'move'}))
  ctx.lineTo(e.clientX, e.clientY)
  ctx.moveTo(e.clientX, e.clientY)
  ctx.stroke()
})

board.addEventListener('mouseup', (e) => {
  if(!strokeBuffer) return
  strokeBuffer.data.push(strokeCreate({x: e.clientX, y: e.clientY, type: 'up'}))
  dispatch({
    type: 'HISTORY_PUSH',
    payload: strokeBuffer,
  })
  strokeBuffer = null
  draw()
})


import store from '../lib/store.js'

const previewBoard = document.getElementById('preview-board')
const ctx = previewBoard.getContext('2d')

let start = null
let end = null

export const refresh = () => {
  ctx.clearRect(0, 0, previewBoard.width, previewBoard.height);
}

export const reset = () => {
  start = null
  end = null
  refresh()
}

export const resize = () => {
  previewBoard.width = window.innerWidth;
  previewBoard.height = window.innerHeight * 0.9;
  refresh()
}

store.subscribe(() => {
  let {tool} = store.getState()
  if( tool !== 'select') {
    previewBoard.className = 'hide'
    reset()
    return 
  } 
  
  previewBoard.className = ''
})

previewBoard.addEventListener('mousedown', (e) => {
  if(!start){
    start = {x: e.clientX, y: e.clientY}
    return
  }

  if(start && !end){
    end = {x: e.clientX, y: e.clientY}
    return 
  }
  console.log('cool', start, end)
})

previewBoard.addEventListener('mouseup', () => {
  //end = {x: e.clientX, y: e.clientY}
})

previewBoard.addEventListener('mousemove', (e) => {
  refresh()
  if(!start) return
  if(start && end)  {
    
    ctx.fillStyle = 'rgba(255, 0, 255, 0.5)'
    ctx.strokeStyle = 'black'
    ctx.setLineDash([4 ]);
    ctx.lineDashOffset = 2;
    ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y) 
    ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y) 
    return 
  }
  ctx.fillStyle = 'rgba(255, 0, 255, 0.5)'
  ctx.strokeStyle = 'black'
  ctx.setLineDash([4 ]);
  ctx.lineDashOffset = 2;
  ctx.fillRect(start.x, start.y, e.clientX - start.x, e.clientY - start.y) 
  ctx.strokeRect(start.x, start.y, e.clientX - start.x, e.clientY - start.y) 
})


document.addEventListener('keydown', (e) => {
  if(e.key === 's')
    reset()
})

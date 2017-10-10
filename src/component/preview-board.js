import store from '../lib/store.js'

import * as board from './board.js'
const previewBoard = document.getElementById('preview-board')
const ctx = previewBoard.getContext('2d')

let start = null
let end = null
let imagePreview = null

export const refresh = () => { 
  ctx.clearRect(0, 0, previewBoard.width, previewBoard.height);
}

export const reset = () => {
  start = null
  end = null
  imagePreview = null
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
})

previewBoard.addEventListener('mouseup', (e) => {
  //end = {x: e.clientX, y: e.clientY}
  if(!imagePreview) return 
  let x = e.clientX - Math.floor(imagePreview.width / 2)
  let y = e.clientY - Math.floor(imagePreview.height / 2)
  board.paste({image: imagePreview, x, y})
  console.log('__PASTE__')
})

previewBoard.addEventListener('mousemove', (e) => {
  refresh()
  if(!start) return
  if(imagePreview) {
      let x = e.clientX - Math.floor(imagePreview.width / 2)
      let y = e.clientY - Math.floor(imagePreview.height / 2)
      ctx.putImageData(imagePreview, x, y)
    return 
  }
  if(start && end)  {
    
    ctx.fillStyle = 'rgba(255, 0, 255, 0.5)'
    ctx.strokeStyle = 'black'
    ctx.setLineDash([4 ]);
    ctx.lineDashOffset = 2;
    let rect = {x: start.x, y: start.y, width: end.x - start.x, height: end.y - start.y}
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height) 
    ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y) 
    console.log('rect', rect)
    board.cut(rect, (err, image) => {
      imagePreview = image

    })
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

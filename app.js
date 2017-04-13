'use strict';

var d = document;

var state = {
  views: {},
  paint: false,
  lineWidth: 3,
  color: '#000',
  backgroundColor: '#fff',
  pallet: [
    '#fff',
    '#000',
    '#7aff7a',
    '#f0c000',
    '#ff7a7a',
    '#7a7aff',
    '#77aaff',
  ],
  strokes: [],
  strokeHistory: [],
};


function lineWidthSet(width){
  if (width < 1){
    width = 1
  }

  state.lineWidth = width;
  if(state.views.brushSize){
    state.views.brushSize.style.background = '#000';
    state.views.brushSize.style.width = (width + 4) + 'px'
    state.views.brushSize.style.height = (width + 4) + 'px'
  }
}

function strokeUndo(){
  var lastIndex = state.strokeHistory.pop();
  if(state.strokes.length == 1 ){
    state.strokes = []
    state.strokeHistory = []
  } else {
    state.strokes.splice(lastIndex - 1 , state.strokes.length);
  }

  state.lastRender = 0;
  state.ctx.fillStyle = state.backgroundColor;
  state.ctx.fillRect(0, 0, state.sb.width, state.sb.height);
  render();
}

function strokeAdd( x, y, type, color){
  state.strokes.push({
    x: x,
    y: y,
    type: type,
    color: color,
    lineWidth: state.lineWidth,
  });
}

function render(){
  if (state.ctx) {
    var ctx = state.ctx;
    ctx.lineJoin = ctx.lineCap = 'round';

    var stroke;
    var next = state.lastRender || 0;

    for (var i=next; i< state.strokes.length; i++){
      stroke = state.strokes[i];
      ctx.shadowBlur = 0.75;

      switch(stroke.type){
        case 'down':
          ctx.shadowColor= stroke.color;
        ctx.lineWidth = stroke.lineWidth;
        ctx.strokeStyle = stroke.color;
        ctx.beginPath()
        ctx.moveTo(stroke.x, stroke.y);
        break;
        case 'move':
          ctx.lineTo(stroke.x , stroke.y );
        ctx.moveTo(stroke.x, stroke.y);
        break;
        default:
          ctx.lineTo(stroke.x, stroke.y);
      }
      ctx.closePath();
      ctx.stroke();
      state.lastRender = i;
    }
  };
}

function colorSet(color){
  if(state.views.currentColor){
    var currentColor = state.views.currentColor;
    currentColor.style.background = color;
    state.color = color;
    console.log('color is now', color);
  }
}

function palletReplace(){
  var palletUl = state.views.colorPallet;
  var blotch;

  if (palletUl) {
    palletUl.textContent = '';

    state.pallet.forEach(color => {
      console.log('color', color);
      blotch = d.createElement('li');
      blotch.style.background = color;
      palletUl.appendChild(blotch);
      blotch.addEventListener('click', function(e){
        colorSet(color);
      })
    })

    console.log('palletUl', palletUl);
  }
}

function sbSetupMouseDown(){
  if (state.sb && state.ctx){
    var sb = state.sb;
    var ctx = state.ctx;
    sb.addEventListener('mousedown', function(e){
      state.paint = true;

      strokeAdd(e.clientX, e.clientY, 'down',  state.color);
      state.strokeHistory.push(state.strokes.length);
      render();

    });
  }
}

function sbSetupMouseUp(){
  if (state.sb){
    var sb = state.sb;
    sb.addEventListener('mouseup', function(e){
      state.paint = false;
      state.ctx.closePath();
      state.ctx.stroke();
      strokeAdd(e.clientX, e.clientY, 'up',  state.color);
      render();
    });
  }
}

function sbSetupMouseMove(){
  if (state.sb){
    var sb = state.sb;
    var ctx = state.ctx;
    sb.addEventListener('mousemove', function(e){
      //console.log(e);
      if(state.paint){
        //ctx.fillRect(e.clientX, e.clientY, 10, 10);
        strokeAdd(e.clientX, e.clientY, 'move',  state.color);
        render();
      }
    });
  }
}

function sbSetupClearHandle(){
  var clear = state.views.clearBoard;
  clear.addEventListener('click', function(e){
    console.log('clear screen');
    sbClear();
  });
}

function keyboardShortcuts(){
  if(state.sb){
    document.body.addEventListener('keydown', function(e){
      console.log('e', e);
      switch(e.key){
        case 'c':
          sbClear()
        break;
        case 'u':
          strokeUndo()
        break;
        case 'e':
          colorSet(state.backgroundColor);
        break;
        case 'i':
          state.backgroundColor = state.backgroundColor === '#fff' ? '#000' : '#fff';
        sbClear();
        break;
        case '+':
          lineWidthSet(state.lineWidth + 15);
        break;
        case '=':
          lineWidthSet(state.lineWidth + 2);
        break;
        case '_':
          lineWidthSet(state.lineWidth - 15)
        break;
        case '-':
          lineWidthSet(state.lineWidth - 2);
        break;
        case '1': case '2': case '3': case '4': case '5': case '6': case '7':
          colorSet(state.pallet[parseInt(e.key) - 1]);
        break;
        default:
      }
    });
  }
}

function sbResize(){
  if (state.sb){
    state.sb.width = window.innerWidth;
    state.sb.height = window.innerHeight;
  }
}

function sbClear(){
  if(state.sb && state.ctx){
    console.log('lulwat clear');
    state.strokes = [];
    state.strokeHistory = [];
    state.lastRender = 0;
    state.ctx.fillStyle = state.backgroundColor;
    state.ctx.fillRect(0, 0, state.sb.width, state.sb.height);
    render();
  }
}


function sbInit(){
  state.sb = d.getElementById('slugboard');
  state.ctx = state.sb.getContext('2d');
  console.log('state.ctx', state.ctx);
  sbResize();
  sbSetupMouseDown();
  sbSetupMouseMove();
  sbSetupMouseUp();
  sbSetupClearHandle();
  keyboardShortcuts();
  colorSet('#000');
}

function viewsGet(){
  state.views.currentColor = d.getElementById('current-color');
  state.views.colorPallet = d.getElementById('color-pallet');
  state.views.clearBoard = document.getElementById('clear-board');
  state.views.brushSize = document.getElementById('brush-size');
}

window.onload = function(){
  viewsGet();
  sbInit();
  lineWidthSet(3);
  palletReplace();
  let c = state.ctx
  c.beginPath()
  c.closePath();
  c.stroke();
}

window.onresize = function(){
  sbResize();
  sbClear();
}


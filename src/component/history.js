import * as board from '../component/board.js'

const historyClear = document.getElementById('history-clear');
const historyUndo = document.getElementById('history-undo');
const historyRedo = document.getElementById('history-redo');

historyClear.addEventListener('click', board.clear)
historyUndo.addEventListener('click', board.undo)
historyRedo.addEventListener('click', board.redo)

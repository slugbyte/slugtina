let initial= {
  main: [],
  redo: [],
}

export default (state=initial, {type, payload}) => {
  switch(type){
    case 'HISTORY_PUSH':
      return {...state, 
        main: [...state.main, payload],
        redo: [],
      }
    case 'HISTORY_UNDO':
      return {...state, 
        main: state.main.slice(0, -1),
        redo: [...state.redo, state.main[state.main.length - 1]],
      }
    case 'HISTORY_REDO':
      return {...state,
        main: [...state.main, state.redo[state.redo.length - 1]],
        redo: state.redo.slice(0, -1),
      }
    case 'HISTORY_CLEAR':
      return initial
    default:
      return state
  }

}

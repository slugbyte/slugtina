export default ({name, initial=[]}) => (state=initial, {type, payload=1}) => {
  switch(type){
    case `${name}_PUSH`:
      return [...state, payload]
    case `${name}_POP`:
      return state.slice(0, payload * -1)
    default:
      return state
  }
}

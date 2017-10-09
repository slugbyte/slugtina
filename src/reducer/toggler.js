'use strict'

export default ({name, initial=false}) => (state=initial, {type, payload}) => {
  switch(type){
    case `${name}_ON`:
      return true
    case `${name}_OFF`:
      return false
    case `${name}_TOGGLE`:
      return !state
    default:
      return state
  }
}

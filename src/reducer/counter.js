'use strict'

const {isNumber} = require('lodash/fp')

export default ({name, initial=0}) => (state=initial, {type, payload}) => {
  switch(type){
    case `${name}_INC`:
      return isNumber(payload) ? state + payload : state + 1
    case `${name}_DEC`:
      return isNumber(payload) ? state - payload : state - 1
    case `${name}_SET`:
      return isNumber(payload) ? payload : state
    default:
      return state
  }
}

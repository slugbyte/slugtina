let calm = (num) => {
  num = Math.min(100, num)
  return Math.max(1, num)
}

export default ({name, initial}) => (state=initial, {type, payload}) => {
  switch(type){
    case `${name}_SIZE_SET`:
      return calm(Number(payload))
    case `${name}_SIZE_INC`:
      return calm(state + Number(payload))
    default:
      return state
  }
}

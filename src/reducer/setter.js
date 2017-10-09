export default ({name, initial=null}) => (state=initial, {type, payload}) => {
  switch(type){
    case `${name}_SET`:
      return payload
    default: 
      return state
  }
}

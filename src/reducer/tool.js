export default (state='brush', {type, payload}) => {
  switch(type){
    case 'TOOL_SET':
      return payload
    case 'COLOR_SET':
      return state !== 'eraser' ? state : 'brush'
    default: 
      return state
  }
}

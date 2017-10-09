'use strict'

export const thunk = (store) => (next) => (action) => {
  return typeof action === 'function' ? action(store) : next(action)
}

export const logger = (store) => (next) => (action) => {
  try {
    console.log('__ACTION__', action) 
    let result = next(action)
    console.log('__STATE__', store.getState())
    return result
  } catch (err) {
    console.log('__ERROR__', err)
    return err
  }
}

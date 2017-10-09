'use strict'

import {createStore, applyMiddleware} from 'redux'
import {logger, thunk} from './redux-middleware.js'
import reducer from '../reducer'

export const create = () => createStore(reducer, applyMiddleware(thunk, logger))
export default create()

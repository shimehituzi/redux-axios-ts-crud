import { createStore, combineReducers, applyMiddleware } from 'redux'
import { RootState, rootReducers } from './'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers<RootState>(rootReducers),
  applyMiddleware(thunk)
)

export default store

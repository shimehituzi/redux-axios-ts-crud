import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { initialState } from './state'
import actions from './actions'


const reducer = reducerWithInitialState(initialState)
  .case(actions.getSamples.done, (state, payload) => {
    return { ...state, data: payload.result }
  })

export default reducer

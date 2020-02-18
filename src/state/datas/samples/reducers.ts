import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { initialState } from './state'
import actions from './actions'


const reducer = reducerWithInitialState(initialState)
  .case(actions.getSamples.done, (_state, payload) => {
    return payload.result
  })

export default reducer

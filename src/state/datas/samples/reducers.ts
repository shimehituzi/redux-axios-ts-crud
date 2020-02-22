import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { initialState } from './state'
import actions from './actions'


const reducer = reducerWithInitialState(initialState)
  .case(actions.getSamples.done, (state, payload) => {
    return { ...state, data: payload.result }
  })
  .case(actions.setForm, (state, payload) => {
    return { ...state, form: payload }
  })
  .case(actions.createSample.done, (state, payload) => {
    return {
      ...state,
      data: [ ...state.data, payload.result ],
      form: initialState.form
    }
  })
  .case(actions.destroySample.done, (state, payload) => {
    return { ...state, data: payload.result }
  })
  .case(actions.setUpdateForm, (state, payload) => {
    return { ...state, updateForm: payload }
  })

export default reducer

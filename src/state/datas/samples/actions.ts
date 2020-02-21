import { actionCreatorFactory } from 'typescript-fsa'
import State from './state'

const actionCreator = actionCreatorFactory()

const actions = {
  getSamples: actionCreator.async<{}, State['data']>('GET_SAMPLES'),
  setForm: actionCreator<State['form']>('SET_FORM')
}

export default actions

import { actionCreatorFactory } from 'typescript-fsa'
import State from './state'

const actionCreator = actionCreatorFactory()

const actions = {
  getSamples: actionCreator.async<{}, State['data']>('GET_SAMPLES')
}

export default actions

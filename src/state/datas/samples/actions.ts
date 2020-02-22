import { actionCreatorFactory } from 'typescript-fsa'
import State from './state'

const actionCreator = actionCreatorFactory()

const actions = {
  getSamples: actionCreator.async<{}, State['data']>('GET_SAMPLES'),
  setForm: actionCreator<State['form']>('SET_FORM'),
  createSample: actionCreator.async<{}, State['data'][0]>('CREATE_SAMPLES'),
  destroySample: actionCreator.async<{}, State['data']>('DESTROY_SAMPLE'),
  setUpdateForm: actionCreator<State['updateForm']>('SET_UPDATE_FORM'),
}

export default actions

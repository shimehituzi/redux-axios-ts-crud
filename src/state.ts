import { createStore, combineReducers } from 'redux'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'


// --------------------------------
// State
// --------------------------------


type Sample = {
  title: string
  description: string
}

type Samples = (Array<Sample>)

type State = {
  formInput: Sample
  samples: Samples
}

const initialState: State = {
  formInput: {
    title: '',
    description: ''
  },
  samples: []
}


// --------------------------------
// Actions
// --------------------------------


const actionCreater = actionCreatorFactory()

export const formInputActions = {
  setFormInput: actionCreater<State['formInput']>('SET_FORM_INPUT'),
}
export const samplesActions = {
  submitFormInput: actionCreater<State['formInput']>('SUBMIT_FORM_INPUT')
}


// --------------------------------
// Reducers
// --------------------------------


const formInputReducer = reducerWithInitialState(initialState.formInput)
  .case(formInputActions.setFormInput, (_, formInput) => {
    return formInput
  })
const samplesReducer = reducerWithInitialState(initialState.samples)
  .case(samplesActions.submitFormInput, (state, formInput) => {
    return [ ...state, formInput ]
  })


// --------------------------------
// Store
// --------------------------------


export type AppState = State

const store = createStore(
  combineReducers<AppState>({
    formInput: formInputReducer,
    samples: samplesReducer
  })
)

export default store

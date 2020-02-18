import { samplesState, samplesReducer } from './samples'

export type RootState = {
  samples: samplesState
}

export const rootReducers = {
  samples: samplesReducer
}

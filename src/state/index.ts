import { SamplesState, samplesReducer } from './samples'

export type RootState = {
  samples: SamplesState
}

export const rootReducers = {
  samples: samplesReducer
}

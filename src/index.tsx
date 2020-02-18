import React, { useCallback, Dispatch, useEffect } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Provider, useSelector, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'

type Sample = {
  id: number
  title: string
  description: string
}

type Samples = (Array<Sample>)

type State = {
  samples: Samples
}

const initialState: State = {
  samples: []
}

const actionCreator = actionCreatorFactory()

const samplesActions = {
  getSamples: actionCreator.async<{}, State['samples']>('GET_SAMPLES')
}

const getSamples = () => {
  return (dispatch: Dispatch<Action<{}>>, _getState: () => State) => {
    dispatch(samplesActions.getSamples.started({params: {}}))
    axios.get('http://localhost:3001/samples')
      .then((res) => {
        dispatch(samplesActions.getSamples.done({result: res.data as Samples, params: {}}))
      })
      .catch((reason) => {
        dispatch(samplesActions.getSamples.failed({error: reason, params: {}}))
        console.log(reason)
      })
  }
}

const samplesReducer = reducerWithInitialState(initialState.samples)
  .case(samplesActions.getSamples.done, (_state, payload) => {
    return payload.result
  })

type AppState = State

const store = createStore(
  combineReducers<AppState>({
    samples: samplesReducer
  }),
  applyMiddleware(thunk)
)

const App: React.FC = () => {
  const samples = useSelector<AppState, AppState['samples']>( appState => appState.samples )

  const dispatch = useDispatch()
  const handleGetSamples = useCallback(
    () => dispatch(getSamples()), [dispatch]
  )

  useEffect(() => {
    handleGetSamples()
  }, [handleGetSamples])

  return (
    <React.Fragment>
      <div>
        {
          samples.map((sample) => {
            return (
              <div key={sample.id}>
                <div>{sample.title}</div>
                <div>{sample.description}</div>
              </div>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
)

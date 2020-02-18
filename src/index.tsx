import React, { useCallback, Dispatch, useEffect } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Provider, useSelector, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIQeQwre7E4cUBkb--1G_jdxf1XWIpKoU",
  authDomain: "shimehituzi-practice-d2c7c.firebaseapp.com",
  databaseURL: "https://shimehituzi-practice-d2c7c.firebaseio.com",
  projectId: "shimehituzi-practice-d2c7c",
  storageBucket: "shimehituzi-practice-d2c7c.appspot.com",
  messagingSenderId: "116370812428",
  appId: "1:116370812428:web:d582bf886b678ebafe8829"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

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
    db.collection('samples').get()
      .then((res) => {
        const docs = res.docs.map(doc => doc.data() as Sample)
        dispatch(samplesActions.getSamples.done({result: docs, params: {}}))
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

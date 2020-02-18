import React, { useCallback, Dispatch, useEffect } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Provider, useSelector, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'

type Movie = {
  id: number
  name: string
  derector: string
  rating: number
}

type Movies = (Array<Movie>)

type State = {
  movies: Movies
}

const initialState: State = {
  movies: []
}

const actionCreator = actionCreatorFactory()

const moviesActions = {
  getMovies: actionCreator.async<{}, State['movies']>('GET_MOVIES')
}

const getMovies = () => {
  return (dispatch: Dispatch<Action<{}>>, _getState: () => State) => {
    dispatch(moviesActions.getMovies.started({params: {}}))
    axios.get('http://localhost:3001/movies')
      .then((res) => {
        dispatch(moviesActions.getMovies.done({result: res.data as Movies, params: {}}))
      })
      .catch((reason) => {
        dispatch(moviesActions.getMovies.failed({error: reason, params: {}}))
        console.log(reason)
      })
  }
}

const moviesReducer = reducerWithInitialState(initialState.movies)
  .case(moviesActions.getMovies.done, (_state, payload) => {
    return payload.result
  })

type AppState = State

const store = createStore(
  combineReducers<AppState>({
    movies: moviesReducer
  }),
  applyMiddleware(thunk)
)

const App: React.FC = () => {
  const movies = useSelector<AppState, AppState['movies']>( appState => appState.movies )

  const dispatch = useDispatch()
  const handleGetMovies = useCallback(
    () => dispatch(getMovies()), [dispatch]
  )

  useEffect(() => {
    handleGetMovies()
  }, [handleGetMovies])

  return (
    <React.Fragment>
      <div>{
        movies.map((movie) => {
          return <div key={movie.id}>{movie.name}</div>
        })
      }</div>
    </React.Fragment>
  )
}

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
)

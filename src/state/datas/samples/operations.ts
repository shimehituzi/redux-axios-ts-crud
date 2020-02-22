import { Dispatch } from 'redux'
import State from './state'
import actions from './actions'
import axios from 'axios'

const getSamples = () => {
  return (dispatch: Dispatch, _getState: () => State) => {
    axios.get('http://localhost:3001/samples')
      .then((res) => {
        dispatch(actions.getSamples.done({result: res.data as State['data'], params: {}}))
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

const createSample = (form: State['form']) => {
  return (dispatch: Dispatch, _getState: () => State) => {
    axios.post('http://localhost:3001/samples', { ...form })
      .then((res) => {
        dispatch(actions.createSample.done({ result: res.data as State['data'][0] ,params: {}}))
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

const destroySample = (data: State['data'], id: State['data'][0]['id']) => {
  return (dispatch: Dispatch, _getState: () => State) => {
    axios.delete('http://localhost:3001/samples/' + id)
      .then(() => {
        const newData = data.filter(elem => elem.id !== id)
        dispatch(actions.destroySample.done({ result: newData, params: {} }))
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

export default {
  getSamples,
  createSample,
  destroySample
}

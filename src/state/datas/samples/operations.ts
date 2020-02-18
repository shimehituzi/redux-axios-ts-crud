import { Dispatch } from 'react'
import { Action } from 'redux'
import State from './state'
import actions from './actions'
// import db from '../../../firebase'
import axios from 'axios'

const getSamples = () => {
  return (dispatch: Dispatch<Action<{}>>, _getState: () => State) => {
    dispatch(actions.getSamples.started({params: {}}))
    // db.collection('samples').get()
    axios.get('http://localhost:3001/samples')
      .then((res) => {
        // const docs = res.docs.map(doc => doc.data()) as State
        // dispatch(actions.getSamples.done({result: docs, params: {}}))
        dispatch(actions.getSamples.done({result: res.data as State, params: {}}))
      })
      .catch((reason) => {
        dispatch(actions.getSamples.failed({error: reason, params: {}}))
        console.log(reason)
      })
  }
}

export default {
  getSamples
}

import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from './state'
import { samplesOperations, samplesActions } from '../state/datas/samples'

const App: React.FC = () => {
  const samples = useSelector<State, State['samples']['data']>( state => state.samples.data )
  const form = useSelector<State, State['samples']['form']>( state => state.samples.form )

  const dispatch = useDispatch()
  const handleGetSamples = useCallback(
    () => dispatch(samplesOperations.getSamples()), [dispatch]
  )
  const handeleSetForm = useCallback(
    (value: State['samples']['form']) => {
      dispatch(samplesActions.setForm(value))
    }, [dispatch]
  )

  useEffect(() => {
    handleGetSamples()
  }, [handleGetSamples])

  const onSetFormFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    handeleSetForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  return (
    <React.Fragment>
      <div>
        <input onChange={onSetFormFunc} value={form.title} id="title"/>
        <input onChange={onSetFormFunc} value={form.description} id="description"/>
      </div>
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

export default App

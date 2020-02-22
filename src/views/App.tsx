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
  const handlecreateSample = useCallback(
    (form: State['samples']['form']) => {
      dispatch(samplesOperations.createSample(form))
    }, [dispatch]
  )
  const handeleDestroySample = useCallback(
    (data: State['samples']['data'], id: State['samples']['data'][0]['id']) => {
      dispatch(samplesOperations.destroySample(data, id))
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

  const onCreateSampleFunc = () => {
    handlecreateSample(form)
  }

  const onDestroySampleFunc = ( id: State['samples']['data'][0]['id'] ) => () => {
    handeleDestroySample(samples, id)
  }

  return (
    <React.Fragment>
      <div>
        <input onChange={onSetFormFunc} value={form.title} id="title"/>
        <input onChange={onSetFormFunc} value={form.description} id="description"/>
        <button onClick={onCreateSampleFunc}>Create</button>
      </div>
      <div>
        {
          samples.map((sample) => {
            return (
              <div key={sample.id}>
                <div><button onClick={onDestroySampleFunc(sample.id)}>X</button></div>
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

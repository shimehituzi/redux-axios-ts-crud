import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from './state'
import { samplesOperations, samplesActions } from '../state/datas/samples'

const App: React.FC = () => {
  const samples = useSelector<State, State['samples']['data']>( state => state.samples.data )
  const form = useSelector<State, State['samples']['form']>( state => state.samples.form )
  const updateForm = useSelector<State, State['samples']['updateForm']>( state => state.samples.updateForm )

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
  const handleSetUpdateForm = useCallback(
    (value: State['samples']['updateForm']) => {
      dispatch(samplesActions.setUpdateForm(value))
    }, [dispatch]
  )
  const handleUpdateSample = useCallback(
    (data: State['samples']['data'], updateForm: State['samples']['updateForm']) => {
      dispatch(samplesOperations.updateSample(data, updateForm))
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

  const onDestroySampleFunc = (id: State['samples']['data'][0]['id']) => () => {
    handeleDestroySample(samples, id)
  }
  
  const onSetUpdateFormFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetUpdateForm({
      ...updateForm,
      [e.target.id]: e.target.value
    })
  }

  const onEditFunc = (id: State['samples']['data'][0]['id']) => () => {
    handleSetUpdateForm({
      ...updateForm,
      id: id
    })
  }

  const onUpdateSampleFunc = () => {
    handleUpdateSample(samples, updateForm)
  }

  return (
    <React.Fragment>
      <div>
        <input onChange={onSetFormFunc} value={form.title} id="title"/>
        <input onChange={onSetFormFunc} value={form.description} id="description"/>
        <button onClick={onCreateSampleFunc}>Create</button>
      </div>
      { updateForm.id !== -1 &&
      <div>
        <button onClick={onEditFunc(-1)}>cloese</button>
        <input onChange={onSetUpdateFormFunc} value={updateForm.title} id="title"/>
        <input onChange={onSetUpdateFormFunc} value={updateForm.description} id="description"/>
        <button onClick={onUpdateSampleFunc}>{ `Update contents of id: ${updateForm.id}` }</button>
      </div>
      }
      <div>
        {
          samples.map((sample) => {
            return (
              <div key={sample.id}>
                <hr/>
                <div>{sample.id}</div>
                <div>{sample.title}</div>
                <div>{sample.description}</div>
                <div>
                  <button onClick={onEditFunc(sample.id)}>Edit</button>
                  <button onClick={onDestroySampleFunc(sample.id)}>Destroy</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}

export default App

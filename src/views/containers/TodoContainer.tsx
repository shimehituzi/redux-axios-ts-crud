import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../state'
import { samplesOperations, samplesActions } from '../../state/samples'
import { Todo } from '../components/Todo'

type Type = {
  data: State['samples']['data']
  form: State['samples']['form']
  updateForm: State['samples']['updateForm']
  id: State['samples']['data'][0]['id']
}

const TodoContainer: React.FC = () => {
  const data = useSelector<State, Type['data']>( state => state.samples.data )
  const form = useSelector<State, Type['form']>( state => state.samples.form )
  const updateForm = useSelector<State, Type['updateForm']>( state => state.samples.updateForm )

  const dispatch = useDispatch()
  const handleGetSamples = useCallback(
    () => dispatch(samplesOperations.getSamples()), [dispatch]
  )
  const handeleSetForm = useCallback(
    (form: Type['form']) => {
      dispatch(samplesActions.setForm(form))
    }, [dispatch]
  )
  const handleCreateSample = useCallback(
    (form: Type['form']) => {
      dispatch(samplesOperations.createSample(form))
    }, [dispatch]
  )
  const handeleDestroySample = useCallback(
    (data: Type['data'], id: Type['id']) => {
      dispatch(samplesOperations.destroySample(data, id))
    }, [dispatch]
  )
  const handleSetUpdateForm = useCallback(
    (updateForm: Type['updateForm']) => {
      dispatch(samplesActions.setUpdateForm(updateForm))
    }, [dispatch]
  )
  const handleUpdateSample = useCallback(
    (data: Type['data'], updateForm: Type['updateForm']) => {
      dispatch(samplesOperations.updateSample(data, updateForm))
    }, [dispatch]
  )

  useEffect(() => {
    handleGetSamples()
  }, [handleGetSamples])

  const props = { 
    data, form, updateForm,
    handeleSetForm, handleCreateSample,
    handeleDestroySample, handleSetUpdateForm,
    handleUpdateSample
  }

  return (
    <Todo { ...props }/>
  )
}

export default TodoContainer

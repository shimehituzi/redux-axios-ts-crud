import React from 'react'
import { State } from '../state'

type Type = {
  data: State['samples']['data']
  form: State['samples']['form']
  updateForm: State['samples']['updateForm']
  id: State['samples']['data'][0]['id']
}

type OwnProps = {
  data: Type['data']
  form: Type['form']
  updateForm: Type['updateForm']
}

type Handler = {
  handeleSetForm: (
    (form: Type['form']) => void
  )
  handleCreateSample: (
    (form: Type['form']) => void
  )
  handeleDestroySample: (
    (data: Type['data'], id: Type['id']) => void
  )
  handleSetUpdateForm: (
    (updateForm: Type['updateForm']) => void
  )
  handleUpdateSample: (
    (data: Type['data'], updateForm: Type['updateForm']) => void
  )
}

type Props = OwnProps & Handler

export const Todo: React.FC<Props> = props => {
  const onSetFormFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handeleSetForm({
      ...props.form,
      [e.target.id]: e.target.value
    })
  }

  const onCreateSampleFunc = () => {
    props.handleCreateSample(props.form)
  }

  const onDestroySampleFunc = (id: State['samples']['data'][0]['id']) => () => {
    props.handeleDestroySample(props.data, id)
  }
  
  const onSetUpdateFormFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleSetUpdateForm({
      ...props.updateForm,
      [e.target.id]: e.target.value
    })
  }

  const onEditFunc = (id: State['samples']['data'][0]['id']) => () => {
    props.handleSetUpdateForm({
      ...props.updateForm,
      id: id
    })
  }

  const onUpdateSampleFunc = () => {
    props.handleUpdateSample(props.data, props.updateForm)
  }

  return (
    <React.Fragment>
      <div>
        <input onChange={onSetFormFunc} value={props.form.title} id="title"/>
        <input onChange={onSetFormFunc} value={props.form.description} id="description"/>
        <button onClick={onCreateSampleFunc}>Create</button>
      </div>
      { props.updateForm.id !== -1 &&
      <div>
        <button onClick={onEditFunc(-1)}>cloese</button>
        <input onChange={onSetUpdateFormFunc} value={props.updateForm.title} id="title"/>
        <input onChange={onSetUpdateFormFunc} value={props.updateForm.description} id="description"/>
        <button onClick={onUpdateSampleFunc}>{ `Update contents of id: ${props.updateForm.id}` }</button>
      </div>
      }
      <div>
        {
          props.data.map((sample) => {
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

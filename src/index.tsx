import React, { Fragment, useState } from 'react'
import { render } from 'react-dom'

type Sample = {
  title: string
  description: string
}

type Samples = Array<Sample>

const initialFormInput: Sample = {
  title: '',
  description: ''
}

const App: React.FC = () => {
  const [state, setState] = useState<Samples>([]) 
  const [formInput, setFormInput] = useState<Sample>(initialFormInput)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = () => {
    setState([
      ...state,
      formInput
    ])
    setFormInput(initialFormInput)
  }

  const mappingFunc = ():JSX.Element[] => (
    state.map((elem, index) => {
      return (
        <Fragment key={index}>
          <div>title: {elem.title}</div>
          <div>description: {elem.description}</div>
          <hr/>
        </Fragment>
      )
    })
  )
  

  return (
    <Fragment>
      <input id="title" value={formInput.title} onChange={handleChange}/>
      <input id="description"value={formInput.description} onChange={handleChange}/>
      <button onClick={handleSubmit}>Create</button>
      <hr/> { mappingFunc() }
    </Fragment>
  )
}

render(<App/>, document.getElementById('root'))

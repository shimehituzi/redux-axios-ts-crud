import React, { Fragment, useState } from 'react'
import { render } from 'react-dom'
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

const App: React.FC = () => {
  type Sample = {
    title: string
    description: string
  }

  type Samples = (Array<Sample>)

  const initialFormInput: Sample = {
    title: '',
    description: ''
  }

  const [state, setState] = useState<Samples>([]) 
  const [formInput, setFormInput] = useState<Sample>(initialFormInput)

  const getState = () => {
    db.collection('samples')
      .get().then((response) => {
        const docs = response.docs.map(doc => doc.data() as Sample)
        setState(docs)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    db.collection('samples').doc().set(formInput)
    getState()
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
      <button onClick={getState}>Get State</button>
      <input id="title" value={formInput.title} onChange={handleChange}/>
      <input id="description"value={formInput.description} onChange={handleChange}/>
      <button onClick={handleSubmit}>Create</button>
      <hr/> { mappingFunc() }
    </Fragment>
  )
}

render(<App/>, document.getElementById('root'))

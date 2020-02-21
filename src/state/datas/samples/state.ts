type Sample = {
  id: number
  title: string
  description: string
}

type State = {
  data: (Array<Sample>)
  form: Sample
}

export const initialState: State = {
  data: [],
  form: {
    id: 0,
    title: '',
    description: ''
  }
}

export default State

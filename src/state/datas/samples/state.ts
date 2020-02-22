type Sample = {
  id: number
  title: string
  description: string
}

type State = {
  data: (Array<Sample>)
  form: (Omit<Sample, "id">)
  updateForm: Sample
}

export const initialState: State = {
  data: [],
  form: {
    title: '',
    description: ''
  },
  updateForm: {
    id: -1,
    title: '',
    description: ''
  }
}

export default State

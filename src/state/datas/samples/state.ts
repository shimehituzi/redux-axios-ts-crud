type Sample = {
  id: number
  title: string
  description: string
}

type State = {
  data: (Array<Sample>)
  form: (Omit<Sample, "id">)
  updateForm: (Omit<Sample, "id">)
}

export const initialState: State = {
  data: [],
  form: {
    title: '',
    description: ''
  },
  updateForm: {
    title: '',
    description: ''
  }
}

export default State

type Sample = {
  id: number
  title: string
  description: string
}

type State = {
  data: (Array<Sample>)
}

export const initialState: State = {
  data: []
}

export default State

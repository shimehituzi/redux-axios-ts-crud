import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from './state'
import { samplesOperations } from '../state/datas/samples'

const App: React.FC = () => {
  const samples = useSelector<State, State['samples']>( appState => appState.samples )

  const dispatch = useDispatch()
  const handleGetSamples = useCallback(
    () => dispatch(samplesOperations.getSamples()), [dispatch]
  )

  useEffect(() => {
    handleGetSamples()
    console.log("hi")
  }, [handleGetSamples])

  return (
    <React.Fragment>
      <div>
        {
          samples.map((sample) => {
            return (
              <div key={sample.id}>
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

// import MovingBackground from './components/ui/MovingBackground'
import { MovingBackground } from './components/ui/MovingBackground'
import Timer from './pages/timer'


const App:React.FC = () => {
  return (
    <div className='App'>
      <MovingBackground/>
      <Timer/>
    </div>
  )
}

export default App
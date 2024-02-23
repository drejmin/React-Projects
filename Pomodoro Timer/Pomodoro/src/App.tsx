// import MovingBackground from './components/ui/MovingBackground'
import Timer from './pages/timer'
import {Routes, Route} from 'react-router-dom';


const App = () => {
  return (
    <main className='App'>
        <Routes >
            <Route path='/' element={<Timer/>}/>
        </Routes>
    </main>
  )
}

export default App
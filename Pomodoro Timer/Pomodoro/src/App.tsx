// import MovingBackground from './components/ui/MovingBackground'
import Timer from './pages/timer'
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <main className='App'>
        <Routes >
            <Route index path='/timer' element={<Timer/>}/>
        </Routes>
    </main>
  )
}

export default App
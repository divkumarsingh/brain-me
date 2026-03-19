
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <>
    <Button startIcon={<PlusIcon/>} variant="primary" text="share" size='md' />
    <Button variant="secondary" text="Add content" size='sm' /> 
    <Button variant="primary" text="Add content" size='lg' /> 

    </>
  )
}

export default App

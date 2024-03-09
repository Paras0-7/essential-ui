
import { useState } from 'react'
import './App.css'
import { ESDatepicker } from './components/ESDatePicker/ESDatepicker'

function App() {

  const [selectedDate, setSelectedDate] = useState<string>('')

 
  return (
    <>
      <h1>Essential UI</h1>
      <ESDatepicker selectedDate= {selectedDate} setSelectedDate={(value: string) => setSelectedDate(value)}/>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Archive from './pages/Archive/Archive'
import Detail from './pages/Detail/Detail'
import AddApartment from './pages/AddApartment/AddApartment'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Archive />} />
        <Route path="/apartment/:id" element={<Detail />} />
        <Route path="/add" element={<AddApartment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
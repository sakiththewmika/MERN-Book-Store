import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<CreateBooks/>} />
      <Route path="/book/details/:id" element={<ShowBook/>} />
      <Route path="/book/edit/:id" element={<EditBook/>} />
      <Route path="/book/delete/:id" element={<DeleteBook/>} />
    </Routes>
  )
}

export default App
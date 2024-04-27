import { Routes, Route } from 'react-router-dom'

import Products from './pages/Products'
import ProductsAdd from './pages/ProductsAdd'
import ProductsEdit from './pages/ProductsEdit'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Products /> } />
      <Route path="/products/create" element={ <ProductsAdd /> } />
      <Route path="/products/:productId" element={ <ProductsEdit /> } />
    </Routes>
  )
}
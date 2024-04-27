import { useQuery } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'

import AppButton from '../components/App/AppButton'
import AppLoading from '../components/App/AppLoading'

import ProductsTable from '../components/Products/ProductsTable'

import { getProducts } from '../services/products'

export default function ProductsPage() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await getProducts()).data,
  })

  const onCreateProduct = () => {
    navigate('products/create')
  }

  const onUpdateProduct = (productId) => {
    navigate(`products/${productId}`)
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Products
          </h3>
        </div>

        <div className="mt-3 md:mt-0">
          <AppButton
            className="w-fit"
            variant="primary"
            onClick={() => onCreateProduct()}
          >
            Add product
          </AppButton>
        </div>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {
          isLoading
            ? <AppLoading />
            : (
              <ProductsTable
                data={data}
                onUpdateItem={onUpdateProduct}
              />
            )
        }
      </div>
    </div>
  )
}
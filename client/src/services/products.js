import instance from './instance'

export const getProducts = () => instance.get('/api/products')

export const getProductById = (id) => instance.get(`/api/products/${id}`)

export const updateProductById = (id, product) => instance.put(`/api/products/${id}`, product)

export const createProduct = (product) => instance.post('/api/products', product)

export const isProductNameUnique = async (params) => {
    let isUnique = false

    try {
        if (params.id) {
            await instance.post(`/api/validate/${params.id}`, params)
        } else {
            await instance.post('/api/validate', params)
        }

        isUnique = true
    } catch (error) {}

    return isUnique
}
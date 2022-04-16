import axiosClient from "../axiosClient"

const ProductService = {
    getProducts: () => {
        return axiosClient.get('/products')
    },

    addProduct: (data) => {
        return axiosClient.post('/products', data);
    }, 

    deleteProduct: (id) => {
        return axiosClient.delete(`/products/${id}`)
    }
}

export default ProductService;
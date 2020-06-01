import { Product } from  '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
let products: Product[] = [
    {
        id : '1',
        name: '产品1',
        description: '我是产品1',
        price: 19.99,
    },
    {
        id : '2',
        name: '产品2',
        description: '我是产品2',
        price: 29.99,
    },
    {
        id : '3',
        name: '产品3',
        description: '我是产品3',
        price: 39.99,
    }
]

// @desc    获取所有产品
// @route   GET /api/v1/products
const getProducts = ({response}: {response: any}) => {
    response.body = {
        success: true,
        msg: '成功获取所有产品',
        data: products
    }
}

// @desc    获取单个产品
// @route   GET /api/v1/products/:id
const getProduct = (
    { params, response }: { params : { id: string }; response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product){
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: '没有这个产品'
        }
    }
}

// @desc    添加单个产品
// @route   POST /api/v1/products
const addProduct = async({ request, response }: { request: any, response: any}) => {
    const body = await request.body()
    if(!request.hasBody){
        response.status = 400
        response.body = {
            success: false,
            msg: '没有数据'
        }
    }else {
        const product: Product = body.value
        product.id = v4.generate()
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc    更新单个产品
// @route   PUT /api/v1/products/:id
const updateProduct = async(
    { params, request, response }: { 
        params: { id: string }, 
        request: any, 
        response: any}
    ) => {
    
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product){
        const body = await request.body()
        const updateData: {name ?: string; description ?: string; price ?: number} = body.value
        products = products.map(p => p.id === params.id ? {...p,...updateData} : p)
        // console.log(products)
        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: '没有这个产品'
        }
    }
}

// @desc    删除单个产品
// @route   DELETE /api/v1/products:id
const deleteProduct = ({ params, response }: { params: { id: string }, response: any}) => {

    products = products.filter(p => p.id !== params.id)
    response.status = 200
    response.body = {
        success: true,
        msg: '删除成功',
        data: products
    }
     
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
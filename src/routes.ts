import path from 'node:path'

import { Router } from "express";
import multer from 'multer'

//useCases
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from "./app/useCases/categories/createCategory";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProducts";
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrders } from './app/useCases/orders/createOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  })
})

//List category
router.get('/categories', listCategories)

//Create category
router.post('/categories', createCategory)

//List Product
router.get('/products', listProducts)

//Create Product
router.post('/products', upload.single('image'), createProduct)

//Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory)

//List Orders
router.get('/orders', listOrders)

//Create order
router.post('/orders', createOrders)

//Change order status
router.patch('/orders/:orderId', changeOrderStatus)

//Delete/cancel order
router.delete('/orders/:orderId', cancelOrder)

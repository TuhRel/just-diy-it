import mongoose from "mongoose"
import Counter from "@/lib/models/counter.model"


const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
})

productSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  
  const counter = await Counter.findOneAndUpdate(
    { model: 'Product', field: 'productId' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )

  this.productId = counter.count
  next()
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
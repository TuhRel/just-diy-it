import mongoose from "mongoose"
import Counter from "@/lib/models/counter.model"


const planSchema = new mongoose.Schema({
  planId: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  }
})

planSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  
  const counter = await Counter.findOneAndUpdate(
    { model: 'Plan', field: 'planId' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )

  this.planId = counter.count
  next()
})

const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema)

export default Plan
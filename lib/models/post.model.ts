import mongoose from "mongoose";
import Counter from "./counter.model";


const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  ytVideo: {
    type: String,
  },
  description: {
    type: String,
  },
})

postSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  
  const counter = await Counter.findOneAndUpdate(
    { model: 'Post', field: 'postId' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )

  this.postId = counter.count
  next()
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post;
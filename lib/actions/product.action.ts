import Counter from "../models/counter.model";
import Product from "../models/product.model";
import { connectDb } from "../mongoose";


interface Params {
  productId: number;
  description: string;
  image: string;
  price: number;
  title: string;
}

export async function updateProduct({
  productId,
  description,
  image,
  price,
  title,
}: Params): Promise<void> {
  await connectDb("just-diy-it")

  try {
    if (!productId) {
      const counter = await Counter.findOneAndUpdate(
        { model: "Product", field: "productId" },
        { $inc: { count: 1 } },
        { new: true, upsert: true },
      )

      productId = counter.count
    }

    await Product.findOneAndUpdate(
      { productId },
      {
        description,
        image,
        price,
        title,
      },
      { upsert: true }
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating product ${error.message}`)
    } else {
      console.error("An unkown error occurred.")
    }
  }
}

export async function getProducts(toFind: string) {
  await connectDb("just-diy-it")

  try {
    const products = await Product.find({ title: new RegExp(toFind, "i") })
    return products || []
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get products ${error.message}`)
    } else {
      console.error("An unknown error occurred.")
    }
  }
}

export async function getProductById(id: string) {
  await connectDb("just-diy-it")

  try {
    const product = await Product.findById(id)
    return product
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get product by ID: ${error.message}`)
    } else {
      console.error("An unknown error occured")
    }
  }
}
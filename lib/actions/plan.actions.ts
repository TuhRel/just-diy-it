import Counter from "../models/counter.model";
import Plan from "../models/plan.model";
import { connectDb } from "../mongoose";


interface Params {
  planId: number;
  description: string;
  image: string;
  title: string;
  price: number;
}

export async function updatePlan({
  planId,
  description,
  image,
  title,
  price,
}: Params): Promise<void> {
  await connectDb("just-diy-it")

  try {
    if (!planId) {
      const counter = await Counter.findOneAndUpdate(
        { model: "Plan", field: "planId" },
        { $inc: { count: 1 } },
        { new: true, upsert: true },
      )

      planId = counter.count
    }
    await Plan.findOneAndUpdate(
      { planId },
      {
        description,
        image,
        title,
        price,
      },
      { upsert: true },
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating plan ${error.message}`)
    } else {
      console.error("An unknown error occurred.")
    }
  }
}

export async function getPlans(toFind: string) {
  await connectDb("just-diy-it")

  try {
    const plans = await Plan.find({ title: new RegExp(toFind, "i") })
    return plans || []
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get plans ${error.message}`)
    } else {
      console.error("An unknown error occurred.")
    }
  }
}

export async function getPlanById(id: string) {
  await connectDb("just-diy-it")

  try {
    const plan = await Plan.findById(id)
    return plan
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get product by ID: ${error.message}`)
    } else {
      console.error("An unknown error occured")
    }
  }
}
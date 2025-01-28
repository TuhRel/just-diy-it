import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import Plan from '@/lib/models/plan.model';


export async function DELETE(
  req: Request,
  context: Promise<{ params: {id: string} }>
) {
  const { id } = (await context).params
  // console.log(context)
  // const { id } = params

  await connectDb("just-diy-it");

  try {
    const deletedProduct = await Plan.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

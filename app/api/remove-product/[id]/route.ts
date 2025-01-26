import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDb("just-diy-it");

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

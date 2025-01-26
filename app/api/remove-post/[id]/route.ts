import { NextResponse } from 'next/server';
import Post from '@/lib/models/post.model';
import { connectDb } from '@/lib/mongoose';

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDb("just-diy-it");

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

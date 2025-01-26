// import { NextResponse } from 'next/server';
// import Plan from '@/lib/models/plan.model';
// import { connectDb } from '@/lib/mongoose';

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const { id } = await params;

//   await connectDb("just-diy-it");

//   try {
//     const deletedPlan = await Plan.findByIdAndDelete(id);
//     if (!deletedPlan) {
//       return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error deleting plan:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
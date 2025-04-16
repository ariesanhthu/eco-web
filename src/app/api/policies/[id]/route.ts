// app/api/policies/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Policy } from '@/lib/models/Policy';
import mongoose from 'mongoose';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Single Policy
export async function GET(
  request: Request,
  context: any
  ): Promise<Response>
  {
  try {
    await connectDB();

    const { id } = await context.params as {id : string};

    if (!id || Array.isArray(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid policy ID' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid policy ID format' },
        { status: 400 }
      );
    }

    const policy = await Policy.findById(id);
    
    if (!policy) {
      return NextResponse.json(
        { success: false, message: 'Policy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: policy });
    
  } catch (error) {
    console.error('Error getting policy:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch policy' 
      },
      { status: 500 }
    );
  }
}

// DELETE Policy
export async function DELETE(
  request: Request,
  context: any
  ): Promise<Response> {
    try {

    await connectDB();

    const { id } = await context.params as {id : string};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid policy ID' },
        { status: 400 }
      );
    }

    const deletedPolicy = await Policy.findByIdAndDelete(id);
    
    if (!deletedPolicy) {
      return NextResponse.json(
        { success: false, message: 'Policy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Policy deleted successfully' }
    );
    
  } catch (error) {
    console.error('Error deleting policy:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete policy' 
      },
      { status: 500 }
    );
  }
}

// UPDATE Policy
export async function PUT(
  request: Request,
  context: any
  ): Promise<Response> {
  try {
    await connectDB();
    const { id } = await context.params as {id : string};
    
    const body = await request.json();
    const { name, description, image } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid policy ID' },
        { status: 400 }
      );
    }

    if (!name || !description || !image) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All fields are required: name, description, image' 
        },
        { status: 400 }
      );
    }

    const updatedPolicy = await Policy.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true }
    );
    
    if (!updatedPolicy) {
      return NextResponse.json(
        { success: false, message: 'Policy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPolicy,
      message: 'Policy updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating policy:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to update policy' 
      },
      { status: 500 }
    );
  }
}
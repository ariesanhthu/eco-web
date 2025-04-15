// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Product } from '@/lib/models/Product';
import mongoose from 'mongoose';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Single Product
export async function GET(
  request: Request,
  context: any
  ): Promise<Response>
  {
  try {
    await connectDB();
    // const { id } = params;
    const { id } = await context.params as {id : string};

    if (!id || Array.isArray(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
    
  } catch (error) {
    console.error('Error getting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch product' 
      },
      { status: 500 }
    );
  }
}

// DELETE Product
export async function DELETE(
  request: Request,
  context: any
  ): Promise<Response> {
    try {
      await connectDB();
      // { params }: { params: { id: string } }
    const { id } = await context.params as {id : string};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' }
    );
    
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete product' 
      },
      { status: 500 }
    );
  }
}

// UPDATE Product
export async function PUT(
  request: Request,
  // { params }: { params: { id: string } }
  context: any
  ): Promise<Response> {
  try {
    await connectDB();
    // const { id } = params;
    const { id } = await context.params as {id : string};
    
    const body = await request.json();
    const { name, description, image, price } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID' },
        { status: 400 }
      );
    }

    if (!name || !description || !image || !price) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All fields are required: name, description, image, price' 
        },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, image, price },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to update product' 
      },
      { status: 500 }
    );
  }
}
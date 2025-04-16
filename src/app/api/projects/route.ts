// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Product } from '@/lib/models/Product';
import { IProduct } from '@/utils/interface';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Handler
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 50;
    const skip = (page - 1) * limit;

    const filter = {};
    const total = await Product.countDocuments(filter);
    
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: products,
    });
    
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch products'
    }, { status: 500 });
  }
}

// POST Handler
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { name, description, image, price } = body;
    
    if (!name || !description || !image || !price) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required: name, description, image, price'
      }, { status: 400 });
    }

    const newProduct = new Product({
      name,
      description,
      image,
      price
    });

    const savedProduct = await newProduct.save();
    
    return NextResponse.json({
      success: true,
      data: savedProduct,
      message: 'Product added successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add product'
    }, { status: 500 });
  }
}
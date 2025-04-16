// src/app/api/policies/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Policy } from '@/lib/models/Policy';
import { IPolicy } from '@/utils/interface';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Handler
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const policies = await Policy.find();

    return NextResponse.json({
      success: true,
      data: policies,
    });
    
  } catch (error) {
    console.error('Error getting policies:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch policies'
    }, { status: 500 });
  }
}

// POST Handler
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { title, description } = body;
    
    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required: title, description'
      }, { status: 400 });
    }

    const newPolicy = new Policy({
      title,
      description,
    });

    const savedPolicy = await newPolicy.save();
    
    return NextResponse.json({
      success: true,
      data: savedPolicy,
      message: 'Policy added successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.log('Error adding policy:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add policy'
    }, { status: 500 });
  }
}
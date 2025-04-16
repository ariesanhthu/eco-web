// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Project } from '@/lib/models/Project';
import { IProject } from '@/utils/interface';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Handler
export async function GET(request: Request) {
  try {
    await connectDB();
    
    // const { searchParams } = new URL(request.url);
    // const page = Number(searchParams.get('page')) || 1;
    // const limit = Number(searchParams.get('limit')) || 50;
    // const skip = (page - 1) * limit;
    const projects = await Project.find();

    return NextResponse.json({
      success: true,
      data: projects,
    });
    
  } catch (error) {
    console.error('Error getting projects:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch projects'
    }, { status: 500 });
  }
}

// POST Handler
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { name, description, image } = body;
    
    if (!name || !description || !image) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required: name, description, image, price'
      }, { status: 400 });
    }

    const newProject = new Project({
      name,
      description,
      image,
    });

    const savedProject = await newProject.save();
    
    return NextResponse.json({
      success: true,
      data: savedProject,
      message: 'Project added successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.log('Error adding project:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add project'
    }, { status: 500 });
  }
}
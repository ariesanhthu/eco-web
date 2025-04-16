// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import { Project } from '@/lib/models/Project';
import mongoose from 'mongoose';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

// GET Single Project
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
        { success: false, message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID format' },
        { status: 400 }
      );
    }

    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
    
  } catch (error) {
    console.error('Error getting project:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch project' 
      },
      { status: 500 }
    );
  }
}

// DELETE Project
export async function DELETE(
  request: Request,
  context: any
  ): Promise<Response> {
    try {

    await connectDB();

    const { id } = await context.params as {id : string};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' }
    );
    
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete project' 
      },
      { status: 500 }
    );
  }
}

// UPDATE Project
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
        { success: false, message: 'Invalid project ID' },
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

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to update project' 
      },
      { status: 500 }
    );
  }
}
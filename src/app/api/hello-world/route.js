// For testing api - route handlers!

import { NextResponse } from 'next/server';

export async function GET(){
    return NextResponse.json({
        success: true,
        message: "Hello, world!"
    })
}
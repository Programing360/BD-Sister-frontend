import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    platform: "BDSisters.org",
    timestamp: new Date().toISOString(),
  });
}

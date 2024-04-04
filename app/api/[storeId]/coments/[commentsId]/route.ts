import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const comments = await prismadb.comment.findMany({
      where: {
        productId: params.productId,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.log("[COMMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();

    const { content } = body;

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const comment = await prismadb.comment.create({
      data: {
        productId: params.productId,
        content,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 403 }
      );
    }

    const userId = session.user.id;
    const { postId } = await req.json();

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: Number(postId),
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: 'Already liked this post' },
        { status: 400 }
      );
    }

    const like = await prisma.like.create({
      data: {
        userId,
        postId: Number(postId),
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 403 }
      );
    }

    const userId = session.user.id;
    const { postId } = await req.json();

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: Number(postId),
        },
      },
    });

    if (!like) {
      return NextResponse.json(
        { message: 'Like not found' },
        { status: 404 }
      );
    }

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId: Number(postId),
        },
      },
    });

    return NextResponse.json(
      { message: 'Like removed' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

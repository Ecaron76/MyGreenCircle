import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 403 }
      );
    }

    const userId = session.user.id;
    const postId = Number(req.url.split('/').pop());

    const post = await prisma.post.findUnique({
      where: { postId },
      include: {
        likes: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    const userHasLiked = post.likes.some(like => like.userId === userId);

    return NextResponse.json(
      {
        ...post,
        likesCount: post.likes.length,
        userHasLiked,
      },
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

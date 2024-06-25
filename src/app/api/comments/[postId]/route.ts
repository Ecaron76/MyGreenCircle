import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";


export const POST = async (req: Request, { params }: { params: { postId: string } }) => {
    try {
      const session = await getAuthSession();
      const { postId } = params;
      const { content } = await req.json();
  
      if (!session || !session.user) {
        return NextResponse.json({ message: 'Not Authenticated' }, { status: 403 });
      }
  
      const post = await prisma.post.findUnique({ where: { postId: Number(postId) } });
  
      if (!post) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
  
      if (post.groupId) {
        const userIsGroupMember = await prisma.join.findFirst({
          where: {
            userId: session.user.id,
            groupId: post.groupId,
          },
        });
  
        if (!userIsGroupMember) {
          return NextResponse.json({ message: 'User is not a member of the group of the post' }, { status: 403 });
        }
      }
  
      const comment = await prisma.comment.create({
        data: {
          content,
          userId: session.user.id,
          postId: Number(postId),
        },
        include: {user: true}
      });
  
      return NextResponse.json({ comment }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
  };


  export const GET = async (req: Request, { params }: { params: { postId: string } }) => {
    try {
      const session = await getAuthSession();
      const { postId } = params;
  
      if (!session || !session.user) {
        return NextResponse.json({ message: 'Not Authenticated' }, { status: 403 });
      }
  
      const post = await prisma.post.findUnique({ where: { postId: Number(postId) } });
  
      if (!post) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
  
      if (post.groupId) {
        const userIsGroupMember = await prisma.join.findFirst({
          where: {
            userId: session.user.id,
            groupId: post.groupId,
          },
        });
  
        if (!userIsGroupMember) {
          return NextResponse.json({ message: 'User is not a member of the group of the post' }, { status: 403 });
        }
      }
  
      const comments = await prisma.comment.findMany({
        where: { postId: Number(postId) },
        include: {
          user: {
            select: { username: true },
          },
        },
      });
  
      return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
  };
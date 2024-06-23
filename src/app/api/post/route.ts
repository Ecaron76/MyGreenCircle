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

    // Fetch admin posts with author details
    const adminPosts = await prisma.post.findMany({
      where: {
        groupId: null,
        isVisible: true
      },
      include: {
        likes: true,
        comments: true,
        user: {
          select: {
            username: true
          }
        }
      }
    });

    // Fetch user groups
    const userGroups = await prisma.join.findMany({
      where: {
        userId: session.user.id,
        isAccepted: true
      },
      select: {
        groupId: true
      }
    });

    // Fetch posts for each group
    let groupPosts: any[] = [];
    for (const group of userGroups) {
      const posts = await prisma.post.findMany({
        where: {
          groupId: group.groupId,
          isVisible: true
        },
        include: {
          likes: true,
          comments: true,
          user: {
            select: {
              username: true
            }
          },
          group: {
            select: {
              groupName: true
            }
          }
        }
      });
      groupPosts = [...groupPosts, ...posts];
    }

    const allPosts = [...adminPosts, ...groupPosts].map(post => ({
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
    }));

    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

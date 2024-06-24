import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: { groupId: string } }) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 403 }
      );
    }

    const { groupId } = params;
    const userId = session.user.id;

    if (!groupId) {
      return NextResponse.json(
        { message: 'Group ID is required' },
        { status: 400 }
      );
    }

    const group = await prisma.group.findUnique({
      where: { groupId: Number(groupId) },
      include: {
        users: {
          where: { userId },
          select: { role: true },
        },
      },
    });

    if (!group) {
      return NextResponse.json(
        { message: 'Group not found' },
        { status: 404 }
      );
    }

    const isAdmin = group.users.some(user => user.role === 'admin');

    return NextResponse.json({ group, isAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

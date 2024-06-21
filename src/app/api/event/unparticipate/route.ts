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
    const { eventId } = await req.json();

    const participation = await prisma.participate.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (!participation) {
      return NextResponse.json(
        { message: 'Participation not found' },
        { status: 404 }
      );
    }

    await prisma.participate.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    return NextResponse.json(
      { message: 'Participation cancelled successfully' },
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

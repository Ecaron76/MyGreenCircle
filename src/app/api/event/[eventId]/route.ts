import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (req: Request, { params }: { params: { eventId: string } }) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 403 }
      );
    }

    const eventId = parseInt(params.eventId);

    const event = await prisma.event.findUnique({
      where: { eventId },
      select: { createdById: true },
    });

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.createdById !== session.user.id) {
      return NextResponse.json(
        { message: 'You are not authorized to delete this event' },
        { status: 403 }
      );
    }

    await prisma.event.delete({
      where: { eventId },
    });

    return NextResponse.json(
      { message: 'Event deleted successfully' },
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

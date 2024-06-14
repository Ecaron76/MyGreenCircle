import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userGroups: {
          include: {
            group: {
              include: {
                events: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const groupEvents = user.userGroups.flatMap(join => join.group.events);

    const globalEvents = await prisma.event.findMany({
      where: {
        isGlobal: true,
      },
    });

    const allEvents = [...groupEvents, ...globalEvents];
    const uniqueEvents = Array.from(new Set(allEvents.map(event => event.eventId))).map(id => allEvents.find(event => event.eventId === id));

    return NextResponse.json(uniqueEvents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

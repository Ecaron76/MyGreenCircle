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
    const { groupId, title, description, location, startDate, endDate, status, limitSubscriptionDate, address, ville, CP, latitude, longitude } = await req.json();

    const userGroup = await prisma.join.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId: Number(groupId),
        },
      },
      select: {
        role: true,
      },
    });

    console.log(`User Group: ${JSON.stringify(userGroup)}`);

    if (!userGroup || userGroup.role !== 'admin') {
      return NextResponse.json(
        { message: 'You are not authorized to create events for this group' },
        { status: 403 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        limitSubscriptionDate: limitSubscriptionDate ? new Date(limitSubscriptionDate) : null,
        address,
        ville,
        CP,
        latitude,
        longitude,
        groupId: Number(groupId),
        createdById: userId,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};

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
                events: {
                  include: {
                    createdBy: true,
                    participants: true,
                  },
                },
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
      include: {
        createdBy: true,
        participants: true,
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

import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { groupName, groupDescription, groupLocation, groupImage } = body;

    const group = await prisma.group.create({
      data: {
        groupName,
        groupDescription,
        groupLocation,
        groupImage
      },
    });

    const join = await prisma.join.create({
      data: {
        userId: session.user.id,
        groupId: group.groupId,
        role: "admin",
        isAccepted: true,
        joiningDate: new Date(),
      },
    });

    console.log(group);
    console.log(join);
    return NextResponse.json({ group, join }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 403 }
      );
    }

    const groups = await prisma.group.findMany();

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { groupId } = body;

    await prisma.group.delete({
      where: { groupId: groupId },
    });

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

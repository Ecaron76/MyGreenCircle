import { getAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"



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

    if (!groupId) {
        return NextResponse.json(
          { message: 'Group ID is required' },
          { status: 400 }
        );
      }

      const group = await prisma.group.findUnique({
        where: { groupId: Number(groupId) },
      });
    
    return NextResponse.json( group,{ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};
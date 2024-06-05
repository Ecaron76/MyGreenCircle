import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthSession } from "@/lib/auth"
import { NextResponse } from 'next/server';

export const GET = async (req: Request)  => {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
        return NextResponse.json(
          { message: 'Not Authenticated' },
          { status: 403 }
        );
      }

      const userId = session.user.id
    
    const userGroups = await prisma.group.findMany({
      where: {
        users: {
          some: {
            userId
          }
        }
      }
    });

    return NextResponse.json(userGroups, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};
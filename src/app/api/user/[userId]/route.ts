import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
    try {
      const session = await getAuthSession();
        
      if (!session || !session.user) {
        return NextResponse.json(
          { message: 'Not Authenticated' },
          { status: 403 }
        );
    }
      if (!session.user.admin) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 403 }
        );
    }
    
      const { userId } = params;
  
      if (!userId) {
          return NextResponse.json(
            { message: 'User ID is required' },
            { status: 400 }
          );
        }
  
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
      
      return NextResponse.json( user,{ status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 }
      );
    }
  };
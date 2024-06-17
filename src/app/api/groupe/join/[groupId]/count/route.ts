import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request,  { params }: {params: {groupId: number} }) => {
    const { groupId } = params
    try {
        const session = await getAuthSession();
  
        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }
        const membersCount = await prisma.join.count({
            where: {
                groupId: Number(groupId)
            }
        });
  
        return NextResponse.json({ membersCount }, { status: 200 });
  
    } catch (error) {
        return NextResponse.json({error:'Something went wrong'}, {status: 500})
        
    }
  };
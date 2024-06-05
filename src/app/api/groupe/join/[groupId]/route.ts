import { getAuthSession } from "@/lib/auth"
import { NextResponse } from 'next/server';


export const POST = async (req: Request,  { params }: {params: {groupId: number} }) => {
    const { groupId } = params
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }
        
        const join = await prisma.join.create({
            data: {
                userId: session.user.id,
                groupId: Number(groupId),
                role: 'user',
                isAccepted: true,
                joiningDate: new Date(),
            },
        });


        console.log(join);
        return NextResponse.json({ join }, { status: 200 });

    } catch (error) {
        return NextResponse.json({error:'Something went wrong'}, {status: 500})
        
    }
};
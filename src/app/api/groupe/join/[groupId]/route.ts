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

export const DELETE = async (req: Request,  { params }: {params: {groupId: number} }) => {
    const { groupId } = params
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }
        
        const userInGroup = await prisma.join.findUnique({
            where: {
              userId_groupId: {
                userId: session.user.id,
                groupId: Number(groupId),
              },
            },
          });
          if (userInGroup?.role==="admin") {
            return NextResponse.json({ message: 'The member is the admin of the group and cant leave the group. ' }, { status: 403 });
          }

          if (!userInGroup) {
            return NextResponse.json(
              { message: 'User is not a member of this group' },
              { status: 400 }
            );
          }

          await prisma.join.delete({
            where: {
              userId_groupId: {
                userId: session.user.id,
                groupId: Number(groupId),
              },
            },
          });


        return NextResponse.json({ message: 'Left the group successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({error:'Something went wrong'}, {status: 500})
        
    }
};


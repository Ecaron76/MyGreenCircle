import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";


export const GET = async (req: Request, { params }: { params: { groupId: number } }) => {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        const { groupId } = params;


        const userAdminGroup = await prisma.join.findFirst({
            where: {
                userId: session.user.id,
                groupId: Number(groupId),
                isAccepted: true,
                role: 'admin'
            }
        });


        if (userAdminGroup) {
            const posts = await prisma.post.findMany({
                where: {
                    groupId: Number(groupId),
                },
                include: {
                    user: {
                      select: {
                        username: true
                      }
                    },
                  }
            });
            return NextResponse.json(posts, { status: 200 });

        } else {
            return NextResponse.json({ message: 'The user is not authorized' }, { status: 403 });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
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


        const MemberAdminGroup = await prisma.join.findFirst({
            where: {
                userId: session.user.id,
                groupId: Number(groupId),
                isAccepted: true,
                role: 'admin'
            }
        });


        if (MemberAdminGroup) {
            const posts = await prisma.post.findMany({
                where: {
                    groupId: Number(groupId),
                    isVisible: false
                }
            });
            return NextResponse.json(posts, { status: 200 });

        } else {
            return NextResponse.json({ message: 'The user is not a member of the group or is not admin of the group' }, { status: 403 });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
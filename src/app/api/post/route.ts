import { getAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"



export const GET = async (req: Request) => {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        const adminPosts = await prisma.post.findMany({
            where: {
                groupId: null
            }
        });

        const userGroups = await prisma.join.findMany({
            where: {
                userId: session.user.id,
                isAccepted: true
            },
            select: {
                groupId: true
            }
        });

        let groupPosts: any[] = [];        
        for (const group of userGroups) {
            const posts = await prisma.post.findMany({
                where: {
                    groupId: group.groupId,
                    isVisible: true
                }
            });
            groupPosts = [...groupPosts, ...posts];
        }

        const allPosts = [...adminPosts, ...groupPosts];

        return NextResponse.json(allPosts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};


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


        const userMemberGroup = await prisma.join.findFirst({
            where: {
                userId: session.user.id,
                groupId: Number(groupId),
                isAccepted: true
            }
        });


        if (userMemberGroup) {
            const posts = await prisma.post.findMany({
                where: {
                    groupId: Number(groupId),
                    userId: session.user.id
                },
                include: {
                    user: {
                      select: {
                        username: true
                      }
                    },
                    likes: true,
                    comments:true
                  },

            });
            const allMyPosts = [...posts].map(post => ({
                ...post,
                likesCount: post.likes.length,
                commentsCount: post.comments.length,
              }));
            return NextResponse.json(allMyPosts, { status: 200 });

        } else {
            return NextResponse.json({ message: 'The user is not a member of the group' }, { status: 403 });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
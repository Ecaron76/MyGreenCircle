import { getAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { title, content, picture, groupId } = body;

        if (groupId) {

            const userIsGroupMember = await prisma.join.findFirst({
                where: {
                    userId: session.user.id,
                    groupId: groupId,
                },
            });

            if (!userIsGroupMember) {
                return NextResponse.json(
                    { message: 'User is not a member of the specified group' },
                    { status: 403 }
                );
            }

            const userIsGroupAdmin = await prisma.join.findFirst({
                where: {
                    userId: session.user.id,
                    groupId: groupId,
                    role: 'admin',
                },
            });
            if (userIsGroupAdmin) {
                const post = await prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        picture: picture,
                        isVisible: true,
                        userId: session.user.id,
                        groupId: groupId,
                    },
                });
                return NextResponse.json({ post }, { status: 200 });
            } else{
                const post = await prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        picture: picture,
                        isVisible: false,
                        userId: session.user.id,
                        groupId: groupId,
                    },
                });
                return NextResponse.json({ post }, { status: 200 });
            }
        } else {
            if (session.user.admin) {
                const post = await prisma.post.create({
                    data: {
                        title,
                        content,
                        picture,
                        isVisible: true,  
                        userId: session.user.id,
                    },
                });
                return NextResponse.json({ post }, { status: 200 });
            } else {
                return NextResponse.json(
                    { message: 'User is not authorized to create a post' },
                    { status: 403 }
                );
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};


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
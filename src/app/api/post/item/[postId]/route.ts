import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: { postId: number } }) => {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        const { postId } = params;

        const post = await prisma.post.findUnique({
            where: { postId: Number(postId) },
            include: { group: true }
        });

        if (!post) {
            return NextResponse.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        const isAuthor: boolean = post.userId === session.user.id;
        const isAppAdmin: boolean = session.user.admin;

        let isGroupAdmin = false;

        if (post.groupId) {
            const groupAdmin = await prisma.join.findFirst({
                where: {
                    userId: session.user.id,
                    groupId: post.groupId,
                    role: 'admin',
                },
            });
            isGroupAdmin = !!groupAdmin;
        }

        if (isAuthor || isAppAdmin || isGroupAdmin) {
            await prisma.post.delete({
                where: { postId: Number(postId) },
            });
            return NextResponse.json(
                { message: 'Post deleted successfully' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: 'User is not authorized to delete this post' },
                { status: 403 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};


export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        const { postId } = params;
        const body = await req.json();
        const { title, content, picture } = body;

        const post = await prisma.post.findUnique({
            where: { postId: Number(postId) },
            include: { group: true }
        });

        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        if (post.userId !== session.user.id) {
            return NextResponse.json({ message: 'User is not authorized to modify this post' }, { status: 403 });
        }

        let isVisible = post.isVisible;

        if (post.groupId) {
            isVisible = false;
        }

        const updatedPost = await prisma.post.update({
            where: { postId: Number(postId) },
            data: {
                title,
                content,
                picture,
                isVisible
            }
        });

        return NextResponse.json({ updatedPost }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
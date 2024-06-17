import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
    try {
        const session = await getAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Not Authenticated' },
                { status: 403 }
            );
        }

        if (!session.user.admin) {
            return NextResponse.json({ message: 'The user is not admin of the app' }, { status: 403 });
        }    

        const posts = await prisma.post.findMany({
            where: {
                isVisible: false
            }
        });
            
        return NextResponse.json(posts, { status: 200 });

        


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: Request) => {
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: "No file provided!" }, { status: 400 });
        }

        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json({ message: "Invalid file type!" }, { status: 400 });
        }

        const allowedExtensions = [".jpeg", ".png", ".jpg"];
        const extension = path.extname(file.name).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return NextResponse.json({ message: "Invalid file extension!" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = new Date().getTime();
        const filename = `${timestamp}_${file.name}`;
        const imageUrl = `/assets/images/post-group/${filename}`;
        const imagePath = path.join(process.cwd(), "public", imageUrl);

        await writeFile(imagePath, buffer);

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
};

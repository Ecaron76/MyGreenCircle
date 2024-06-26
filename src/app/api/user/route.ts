import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 403 }
      );
    }
    if (!session.user.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, CP, ville, address } = body;

    // Email exists ?

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Cette adresse mail est déjà utilisé" },
        { status: 409 }
      );
    }

    // Username exists ?
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Ce nom d'utilisateur est déjà utilisé" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        admin: false,
        address,
        ville,
        CP,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "L'utilisateur a été créé avec succès !" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

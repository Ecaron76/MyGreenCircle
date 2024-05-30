import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, username, password, CP, ville, address } = body;

        // Email exists ?

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Cette adresse mail est déjà utilisé"}, {status: 409})
        } 

        // Username exists ?
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Ce nom d'utilisateur est déjà utilisé"}, {status: 409})
        } 
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                address,   
                ville,    
                CP,  

            }
        })

        return NextResponse.json({user: newUser, message: "L'utilisateur a été créé avec succès !"},{status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!"}, {status: 500})
    }
    
}
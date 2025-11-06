import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, zipCode, bairro, city, state } =
      await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        zipCode,
        bairro,
        city,
        state,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(req, context) {
  const { id } = context.params;

  try {
    const deleteUser = await prisma.courses.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log(deleteUser);
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();

  return NextResponse.json({ msg: "Delete course success" });
}

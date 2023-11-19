import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function GET(req, context) {
  const { id } = context.params;

  const course_part = await prisma.course_part.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  await prisma.$disconnect();

  return NextResponse.json(course_part);
}

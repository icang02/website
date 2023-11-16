import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(req, context) {
  const { id } = context.params;

  const courses = await prisma.courses.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      course_part: {
        orderBy: {
          order: "asc",
        },
        select: {
          order: true,
          title: true,
          content: true
        },
      },
    },
  });
  // console.log(courses)
  await prisma.$disconnect()

  return NextResponse.json(courses);
}

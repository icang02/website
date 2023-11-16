import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET() {
  const courses = await prisma.courses.findMany({
    include: {
      course_part: {
        select: {
          courses_id: true,
        },
      },
    },
  });
  await prisma.$disconnect();

  return NextResponse.json(courses);
}

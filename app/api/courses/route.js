import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

  return NextResponse.json(courses);
}

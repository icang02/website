import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
  const { slug } = context.params;

  const courses = await prisma.courses.findFirst({
    where: {
      slug: slug,
    },
    include: {
      course_part: {
        orderBy: {
          order: "asc",
        },
        select: {
          order: true,
          title: true,
          // content: true,
        },
      },
    },
  });
  await prisma.$disconnect()

  return NextResponse.json(courses);
}

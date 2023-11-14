import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
  const { slug, part } = context.params;

  const courses = await prisma.courses.findFirst({
    where: {
      slug: slug,
    },
    include: {
      course_part: true,
    },
  });

  return NextResponse.json(courses);
}

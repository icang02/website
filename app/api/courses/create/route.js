import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function POST(request) {
  const reqBody = await request.json();
  const { title, description, image } = reqBody;

  const course = await prisma.courses.create({
    data: {
      title: title,
      slug: slugify(title, { lower: true }),
      description: description,
      image: image,
    },
  });
  // const course_part = await prisma.course_part.create({
  //   data: {
  //     order: order,
  //     courses_id: course.id,
  //     title: title2,
  //     content: content,
  //   },
  // });
  await prisma.$disconnect();
  

  return NextResponse.json({ course });
}

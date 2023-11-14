import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();
  const { title, description, image, content } = reqBody;

  const course = await prisma.courses.create({
    data: {
      title: title,
      slug: slugify(title),
      description: description,
      image: image,
    },
  });
  const course_part = await prisma.course_part.create({
    data: {
      order: 1,
      courses_id: course.id,
      title: "Pendahuluan",
      content: content,
    },
  });

  return NextResponse.json(course, course_part);
}

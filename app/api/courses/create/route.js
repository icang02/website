import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();
  const { title, description, title2, order, content } = reqBody;

  const course = await prisma.courses.create({
    data: {
      title: title,
      slug: slugify(title, { lower: true }),
      description: description,
      image:
        "https://mdevelopers.com/storage/0_what-is-framework_82ae357f.webp",
    },
  });
  const course_part = await prisma.course_part.create({
    data: {
      order: order,
      courses_id: course.id,
      title: title2,
      content: content,
    },
  });

  return NextResponse.json({ course, course_part });
}

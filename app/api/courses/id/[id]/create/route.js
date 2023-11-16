import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function POST(request) {
  const reqBody = await request.json();
  const { courses_id, order, title, content } = reqBody;

  const course_part = await prisma.course_part.create({
    data: {
      courses_id: parseInt(courses_id),
      order: order,
      title: title,
      content: content,
    },
  });
  await prisma.$disconnect();
  

  return NextResponse.json({ 'course_part': 'sds' });
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function POST(request) {
  const reqBody = await request.json();
  const { courses_id, order, title, content } = reqBody;

  // add class style in content
  const x1 = content.replaceAll('<h4>', '<h4 class="text-xl font-bold mb-4">');
  const x2 = x1.replaceAll('<p>', '<p class="mb-3 text-sm">');
  const x3 = x2.replaceAll('<ul>', '<ul class="mb-3 list-disc ml-6 text-sm">');
  const x4 = x3.replaceAll('<ol>', '<ol class="mb-3 list-decimal ml-6 text-sm">');
  const x5 = x4.replaceAll('<li>', '<li class="pl-1">');

  console.log(x5);

  const course_part = await prisma.course_part.create({
    data: {
      courses_id: parseInt(courses_id),
      order: order,
      title: title,
      content: x5,
    },
  });
  await prisma.$disconnect();
  

  return NextResponse.json({ 'course_part': 'sds' });
}

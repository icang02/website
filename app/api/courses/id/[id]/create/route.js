import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function POST(request) {
  const reqBody = await request.json();
  const { courses_id, order, title, content } = reqBody;

  const x1 = content
    .replaceAll("<h1>", '<h1 class="h1">')
    .replaceAll("<h2>", '<h2 class="h2">')
    .replaceAll("<h3>", '<h3 class="h3">')
    .replaceAll("<h4>", '<h4 class="h4">')
    .replaceAll("<p>", '<p class="p">')
    .replaceAll("<ul>", '<ul class="ul">')
    .replaceAll("<ol>", '<ol class="ol">')
    .replaceAll("<li>", '<li class="li">')
    .replaceAll("<img>", '<img class="img">');

  const course_part = await prisma.course_part.create({
    data: {
      courses_id: parseInt(courses_id),
      order: order,
      title: title,
      content: x1,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json(course_part);
}

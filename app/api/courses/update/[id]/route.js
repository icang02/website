import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function PUT(req, context) {
  const { id } = context.params;
  const reqBody = await req.json();
  const { title, description } = reqBody;

  const course = await prisma.courses.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      slug: slugify(title, { lower: true }),
      description: description,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json(course);
}

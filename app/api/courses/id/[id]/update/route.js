import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function PUT(req, context) {
  const reqBody = await req.json();
  const { partId, title, order, content } = reqBody;

  const coursePart = await prisma.course_part.update({
    where: {
      id: parseInt(partId),
    },
    data: {
      title: title,
      order: order,
      content: content,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ coursePart: "sd" });
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';
export async function GET(req, context) {
  const { slug, part } = context.params;
  // console.log({ slug, part });

  const coursePart = await prisma.course_part.findFirst({
    where: {
      courses_id: parseInt(slug),
      AND: {
        order: parseInt(part),
      },
    },
  });
  await prisma.$disconnect();

  return NextResponse.json(coursePart);
}

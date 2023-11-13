import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req, context) {
  const { slug } = context.params
  const data = await prisma.courses.findFirst({ where: {
    slug: slug
  }})

  return NextResponse.json(data);
}

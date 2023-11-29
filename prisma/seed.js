const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.createMany({
    data: [
      {
        name: "Ilmi Faizan",
        email: "ilmifaizan1112@gmail.com",
        address: "Kelurahan Talia",
        password:
          "$2b$10$FHs3xn8yAYq9iP92bUMcwOP9X4EeSwrf5r7NSa35ZSvuf4rRRlro2",
      },
      {
        name: "Imam Saputra",
        email: "imam@gmail.com",
        address: "Kolaka, Ponre Waru",
        password:
          "$2b$10$FHs3xn8yAYq9iP92bUMcwOP9X4EeSwrf5r7NSa35ZSvuf4rRRlro2",
      },
    ],
  });
  console.log("Seeding users table...");

  const courses = await prisma.courses.createMany({
    data: [
      {
        title:
          "Aplikasi CRUD (Create, Read, Update, Delete) Sederhana Menggunakan Laravel 10",
        slug: slugify(
          "Aplikasi CRUD (Create, Read, Update, Delete) Sederhana Menggunakan Laravel 10"
        ),
        description:
          "Pada materi ini kita akan belajar bagaimana cara membuat sistem melakukan CRUD di laravel. suatu web / aplikasi pasti pasti menerapkan teknik CRUD ini oleh karena wajib mengetahui langkah-langkah cara membuatnya khususnya programer.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx2mL7pxWerwBEiaGh7kOFfB2p4BHN_UtepA&usqp=CAU",
      },
      {
        title: "Membuat Landing Page / Portfolio (Tailwind CSS)",
        slug: slugify("Membuat Landing Page / Portfolio (Tailwind CSS)"),
        description:
          "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
        image:
          "https://tailwindcss.com/_next/static/media/tailwindui-small@75.8bb955b2.jpg",
      },
    ],
  });
  console.log("Seeding courses table...");

  const course_part = await prisma.course_part.createMany({
    data: [
      {
        courses_id: 1,
        order: 1,
        title: "Persiapan Project dan Instalasi Laravel",
        content: "Persiapan Project dan Instalasi Laravel.",
      },
      {
        courses_id: 1,
        order: 2,
        title: "Lorem ipsum dolorem si lorem",
        content: "Lorem ipsum dolorem si lorem.",
      },
      {
        courses_id: 2,
        order: 1,
        title: "Instalasi Tailwind",
        content: "Instalasi tailwind..",
      },
      {
        courses_id: 2,
        order: 2,
        title: "Lorem ipsum dolorem si lorem",
        content: "Lorem ipsum dolorem si lorem.",
      },
    ],
  });
  console.log("Seeding course_part table...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding all data succes");
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

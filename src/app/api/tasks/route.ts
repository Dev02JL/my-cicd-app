import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return Response.json(tasks);
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  if (!name) return Response.json({ error: "Name required" }, { status: 400 });

  const newTask = await prisma.task.create({
    data: { name, description: description || "" },
  });

  return Response.json(newTask, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.task.delete({ where: { id: Number(id) } });

  return Response.json({ message: "Task deleted" });
}
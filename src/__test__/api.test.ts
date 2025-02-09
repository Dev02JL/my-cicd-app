import request from "supertest";
import { createServer, Server } from "http";
import { parse } from "url";
import { PrismaClient } from "@prisma/client";
import next from "next";

const prisma = new PrismaClient();
const app = next({ dev: false }); // Mode production pour éviter les erreurs liées à Next.js
const handle = app.getRequestHandler();

let server: Server;

beforeAll(async () => {
  await prisma.$connect();
  await app.prepare();

  server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(3001);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Attendre le démarrage du serveur
  await prisma.task.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
  if (server) {
    server.close();
  }
});

describe("API Task Routes", () => {
  test("GET /api/tasks - Récupérer toutes les tâches", async () => {
    const response = await request("http://localhost:3001").get("/api/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/tasks - Ajouter une tâche", async () => {
    const newTask = { name: "Faire les courses", description: "Acheter du lait" };
    const response = await request("http://localhost:3001").post("/api/tasks").send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newTask.name);
    expect(response.body.description).toBe(newTask.description);
  });

  test("DELETE /api/tasks - Supprimer une tâche", async () => {
    const task = await prisma.task.create({
      data: { name: "À supprimer", description: "Test de suppression" },
    });

    const response = await request("http://localhost:3001").delete("/api/tasks").send({ id: task.id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted");

    const deletedTask = await prisma.task.findUnique({ where: { id: task.id } });
    expect(deletedTask).toBeNull();
  });
});
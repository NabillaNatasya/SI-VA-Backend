import { app } from "./app.ts";
import { prisma } from "./client.ts";

const port = Number(process.env.PORT ?? 3007);

const server = app.listen(port, () => {
  console.log(`REST API Mahasiswa berjalan di http://localhost:${port}`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
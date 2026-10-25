/**
 * Pertemuan 6 — latihan resource Pengguna dengan Prisma
 * Tujuan: menerapkan operasi create, update, dan delete pada model pengguna.
 * Jalankan: npx prisma migrate dev --name pengguna lalu node --experimental-strip-types latihan.ts
 */

import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (response: Response, statusCode: number, message: string, data: unknown) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  details?: unknown
) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined ? { details } : {}),
  });
};

app.get("/pengguna", async (_request: Request, response: Response) => {
  const data = await prisma.pengguna.findMany({ orderBy: { nim: "asc" } });
  return sendSuccess(response, 200, "Data pengguna berhasil diambil", { total: data.length, data });
});


app.get("/pengguna/:nim", async (request: Request, response: Response) => {
  const pengguna = await prisma.pengguna.findUnique({
    where: { nim: String(request.params.nim) }
  });
  if (!pengguna) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }
  return sendSuccess(response, 200, "Detail pengguna berhasil diambil", pengguna);
});


app.post("/pengguna", async (request: Request, response: Response) => {
  const { nim, nama, email, role } = request.body;

  const errors: string[] = [];

  if (typeof nim !== "string" || !nim.trim()) {
    errors.push("Field nim wajib diisi");
  }

  if (typeof nama !== "string" || !nama.trim()) {
    errors.push("Field nama wajib diisi");
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Field email wajib diisi dengan format email yang valid");
  }

  if (typeof role !== "string" || !role.trim()) {
    errors.push("Field role wajib diisi");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data pengguna tidak valid", errors);
  }

  const existing = await prisma.pengguna.findUnique({
    where: { nim: nim.trim() },
  });

  if (existing) {
    return sendError(response, 400, "NIM sudah terdaftar");
  }

  const pengguna = await prisma.pengguna.create({
    data: {
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim(),
      role: role.trim(),
    },
  });

  return sendSuccess(response, 201, "Pengguna berhasil ditambahkan", pengguna);
});


app.patch("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = request.params.nim;
  const { nama, email, role } = request.body;

  const data: { nama?: string; email?: string; role?: string } = {};
  const errors: string[] = [];

  if (nama !== undefined) {
    if (typeof nama !== "string" || !nama.trim()) {
      errors.push("Field nama harus berupa teks dan tidak boleh kosong");
    } else {
      data.nama = nama.trim();
    }
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Field email harus menggunakan format email yang valid");
    } else {
      data.email = email.trim();
    }
  }

  if (role !== undefined) {
    if (typeof role !== "string" || !role.trim()) {
      errors.push("Field role harus berupa teks dan tidak boleh kosong");
    } else {
      data.role = role.trim();
    }
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data pengguna tidak valid", errors);
  }

  if (Object.keys(data).length === 0) {
    return sendError(response, 400, "Minimal satu field harus diubah");
  }

  const existing = await prisma.pengguna.findUnique({
    where: { nim: String(request.params.nim) }
  });

  if (!existing) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  const pengguna = await prisma.pengguna.update({
  where: { nim: String(request.params.nim) },
  data,
});

  return sendSuccess(response, 200, "Data pengguna berhasil diperbarui", pengguna);
});


app.delete("/pengguna/:nim", async (request: Request, response: Response) => {
  const nim = String(request.params.nim);

  const existing = await prisma.pengguna.findUnique({
    where: { nim },
  });

  if (!existing) {
    return sendError(response, 404, "Pengguna tidak ditemukan");
  }

  await prisma.pengguna.delete({
    where: { nim },
  });

  return response.status(204).send();
});

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log("Latihan Database API berjalan di http://localhost:3009");
});

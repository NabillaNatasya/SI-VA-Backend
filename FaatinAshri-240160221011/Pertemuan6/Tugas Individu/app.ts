import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown
) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
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
    ...(details && { details }),
  });
};

// GET /mahasiswa — mengambil seluruh data dan mendukung filter
app.get("/mahasiswa", async (request: Request, response: Response) => {
  try {
    const { prodi, angkatan } = request.query;

    const data = await prisma.mahasiswa.findMany({
      where: {
        ...(typeof prodi === "string" && { prodi }),
        ...(typeof angkatan === "string" &&
          angkatan.trim() !== "" &&
          { angkatan: Number(angkatan) }),
      },
      orderBy: { nim: "asc" },
    });

    return sendSuccess(response, 200, "Data mahasiswa berhasil diambil", {
      total: data.length,
      data,
    });
  } catch (error) {
    return sendError(response, 500, "Gagal mengambil data mahasiswa");
  }
});

// GET /mahasiswa/:nim — mengambil detail mahasiswa
app.get("/mahasiswa/:nim", async (request: Request, response: Response) => {
  try {
    const data = await prisma.mahasiswa.findUnique({
      where: { nim: request.params.nim },
    });

    if (!data) {
      return sendError(response, 404, "Mahasiswa tidak ditemukan");
    }

    return sendSuccess(response, 200, "Detail mahasiswa berhasil diambil", data);
  } catch (error) {
    return sendError(response, 500, "Gagal mengambil detail mahasiswa");
  }
});

// POST /mahasiswa — menambahkan mahasiswa
app.post("/mahasiswa", async (request: Request, response: Response) => {
  try {
    const { nim, nama, prodi, angkatan } = request.body;
    const details: string[] = [];

    if (typeof nim !== "string" || !nim.trim()) {
      details.push("Field nim wajib diisi");
    }

    if (typeof nama !== "string" || !nama.trim()) {
      details.push("Field nama wajib diisi");
    }

    if (typeof prodi !== "string" || !prodi.trim()) {
      details.push("Field prodi wajib diisi");
    }

    if (
      angkatan === undefined ||
      angkatan === null ||
      angkatan === "" ||
      !Number.isInteger(Number(angkatan))
    ) {
      details.push("Field angkatan wajib berupa bilangan bulat");
    }

    if (details.length > 0) {
      return sendError(response, 400, "Data mahasiswa tidak valid", details);
    }

    const existing = await prisma.mahasiswa.findUnique({
      where: { nim: nim.trim() },
    });

    if (existing) {
      return sendError(response, 409, "NIM sudah terdaftar");
    }

    const data = await prisma.mahasiswa.create({
      data: {
        nim: nim.trim(),
        nama: nama.trim(),
        prodi: prodi.trim(),
        angkatan: Number(angkatan),
      },
    });

    return sendSuccess(response, 201, "Mahasiswa berhasil ditambahkan", data);
  } catch (error) {
    return sendError(response, 500, "Gagal menambahkan mahasiswa");
  }
});

// PUT /mahasiswa/:nim — mengganti seluruh data mahasiswa
app.put("/mahasiswa/:nim", async (request: Request, response: Response) => {
  try {
    const nim = request.params.nim;
    const { nama, prodi, angkatan } = request.body;
    const details: string[] = [];

    if (typeof nama !== "string" || !nama.trim()) {
      details.push("Field nama wajib diisi");
    }

    if (typeof prodi !== "string" || !prodi.trim()) {
      details.push("Field prodi wajib diisi");
    }

    if (
      angkatan === undefined ||
      angkatan === null ||
      angkatan === "" ||
      !Number.isInteger(Number(angkatan))
    ) {
      details.push("Field angkatan wajib berupa bilangan bulat");
    }

    if (details.length > 0) {
      return sendError(response, 400, "Data mahasiswa tidak valid", details);
    }

    const existing = await prisma.mahasiswa.findUnique({ where: { nim } });

    if (!existing) {
      return sendError(response, 404, "Mahasiswa tidak ditemukan");
    }

    const data = await prisma.mahasiswa.update({
      where: { nim },
      data: {
        nama: nama.trim(),
        prodi: prodi.trim(),
        angkatan: Number(angkatan),
      },
    });

    return sendSuccess(response, 200, "Data mahasiswa berhasil diganti", data);
  } catch (error) {
    return sendError(response, 500, "Gagal mengganti data mahasiswa");
  }
});

// PATCH /mahasiswa/:nim — memperbarui sebagian data mahasiswa
app.patch("/mahasiswa/:nim", async (request: Request, response: Response) => {
  try {
    const nim = request.params.nim;
    const { nama, prodi, angkatan } = request.body;
    const dataUpdate: {
      nama?: string;
      prodi?: string;
      angkatan?: number;
    } = {};
    const details: string[] = [];

    if (nama !== undefined) {
      if (typeof nama !== "string" || !nama.trim()) {
        details.push("Field nama tidak boleh kosong");
      } else {
        dataUpdate.nama = nama.trim();
      }
    }

    if (prodi !== undefined) {
      if (typeof prodi !== "string" || !prodi.trim()) {
        details.push("Field prodi tidak boleh kosong");
      } else {
        dataUpdate.prodi = prodi.trim();
      }
    }

    if (angkatan !== undefined) {
      if (
        angkatan === null ||
        angkatan === "" ||
        !Number.isInteger(Number(angkatan))
      ) {
        details.push("Field angkatan harus berupa bilangan bulat");
      } else {
        dataUpdate.angkatan = Number(angkatan);
      }
    }

    if (details.length > 0) {
      return sendError(response, 400, "Data mahasiswa tidak valid", details);
    }

    if (Object.keys(dataUpdate).length === 0) {
      return sendError(response, 400, "Tidak ada data yang diperbarui");
    }

    const existing = await prisma.mahasiswa.findUnique({ where: { nim } });

    if (!existing) {
      return sendError(response, 404, "Mahasiswa tidak ditemukan");
    }

    const data = await prisma.mahasiswa.update({
      where: { nim },
      data: dataUpdate,
    });

    return sendSuccess(
      response,
      200,
      "Data mahasiswa berhasil diperbarui",
      data
    );
  } catch (error) {
    return sendError(response, 500, "Gagal memperbarui data mahasiswa");
  }
});

// DELETE /mahasiswa/:nim — menghapus mahasiswa
app.delete("/mahasiswa/:nim", async (request: Request, response: Response) => {
  try {
    const nim = request.params.nim;

    const existing = await prisma.mahasiswa.findUnique({ where: { nim } });

    if (!existing) {
      return sendError(response, 404, "Mahasiswa tidak ditemukan");
    }

    await prisma.mahasiswa.delete({ where: { nim } });

    return response.status(204).end();
  } catch (error) {
    return sendError(response, 500, "Gagal menghapus mahasiswa");
  }
});

export { app };
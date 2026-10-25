import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

let mahasiswa = [
  {
    nim: "240160221011",
    nama: "Faatin Ashri",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
  {
    nim: "240160221012",
    nama: "Tafdiel Haqqi",
    prodi: "Sistem Informasi",
    angkatan: 2023,
  },
];

const sendSuccess = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

const sendError = (res, statusCode, message, details) =>
  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
  });

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

app.get("/", (req, res) => {
  return sendSuccess(res, 200, "REST API Mahasiswa", {
    endpoints: [
      "GET /mahasiswa",
      "GET /mahasiswa/:nim",
      "POST /mahasiswa",
      "PUT /mahasiswa/:nim",
      "PATCH /mahasiswa/:nim",
      "DELETE /mahasiswa/:nim",
    ],
  });
});

app.get("/health", (req, res) => {
  return sendSuccess(res, 200, "API berjalan", { status: "up" });
});

// GET koleksi + filter prodi dan angkatan
app.get("/mahasiswa", (req, res) => {
  const { prodi, angkatan } = req.query;

  if (
    angkatan !== undefined &&
    (!/^\d{4}$/.test(String(angkatan)) ||
      !Number.isInteger(Number(angkatan)))
  ) {
    return sendError(res, 400, "Parameter angkatan harus berupa tahun 4 digit");
  }

  const data = mahasiswa.filter((item) => {
    const cocokProdi =
      prodi === undefined ||
      item.prodi.toLowerCase() === String(prodi).trim().toLowerCase();

    const cocokAngkatan =
      angkatan === undefined || item.angkatan === Number(angkatan);

    return cocokProdi && cocokAngkatan;
  });

  return sendSuccess(res, 200, "Data mahasiswa berhasil diambil", {
    total: data.length,
    data,
  });
});

// GET detail berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(({ nim }) => nim === req.params.nim);

  if (!item) {
    return sendError(res, 404, "Mahasiswa tidak ditemukan");
  }

  return sendSuccess(res, 200, "Detail mahasiswa berhasil diambil", item);
});

const validateMahasiswa = (payload, partial = false) => {
  const errors = [];
  const fields = ["nim", "nama", "prodi", "angkatan"];

  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return ["Body harus berupa object JSON"];
  }

  if (!partial) {
    for (const field of fields) {
      if (payload[field] === undefined) {
        errors.push(`Field ${field} wajib diisi`);
      }
    }
  }

  for (const field of ["nim", "nama", "prodi"]) {
    if (
      payload[field] !== undefined &&
      (typeof payload[field] !== "string" ||
        payload[field].trim() === "")
    ) {
      errors.push(`${field} harus berupa teks dan tidak boleh kosong`);
    }
  }

  if (
    payload.angkatan !== undefined &&
    (!Number.isInteger(payload.angkatan) ||
      payload.angkatan < 1900 ||
      payload.angkatan > 2100)
  ) {
    errors.push("angkatan harus berupa tahun yang valid");
  }

  return errors;
};

// POST membuat mahasiswa
app.post("/mahasiswa", (req, res) => {
  const errors = validateMahasiswa(req.body);

  if (errors.length) {
    return sendError(res, 400, "Data mahasiswa tidak valid", errors);
  }

  if (mahasiswa.some((item) => item.nim === req.body.nim)) {
    return sendError(res, 400, "NIM sudah terdaftar");
  }

  const baru = {
    nim: req.body.nim.trim(),
    nama: req.body.nama.trim(),
    prodi: req.body.prodi.trim(),
    angkatan: req.body.angkatan,
  };

  mahasiswa.push(baru);

  return sendSuccess(res, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// PUT mengganti seluruh data mahasiswa
app.put("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(
    (item) => item.nim === req.params.nim
  );

  if (index === -1) {
    return sendError(res, 404, "Mahasiswa tidak ditemukan");
  }

  const errors = validateMahasiswa(req.body);

  if (errors.length) {
    return sendError(res, 400, "Data mahasiswa tidak valid", errors);
  }

  if (
    req.body.nim !== req.params.nim &&
    mahasiswa.some((item) => item.nim === req.body.nim)
  ) {
    return sendError(res, 400, "NIM sudah terdaftar");
  }

  mahasiswa[index] = {
    nim: req.body.nim.trim(),
    nama: req.body.nama.trim(),
    prodi: req.body.prodi.trim(),
    angkatan: req.body.angkatan,
  };

  return sendSuccess(
    res,
    200,
    "Data mahasiswa berhasil diganti",
    mahasiswa[index]
  );
});

// PATCH mengubah sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(({ nim }) => nim === req.params.nim);

  if (!item) {
    return sendError(res, 404, "Mahasiswa tidak ditemukan");
  }

  const errors = validateMahasiswa(req.body, true);

  if (errors.length) {
    return sendError(res, 400, "Data perubahan tidak valid", errors);
  }

  const allowedFields = ["nama", "prodi", "angkatan"];
  const submittedFields = Object.keys(req.body);

  if (
    submittedFields.length === 0 ||
    submittedFields.some((field) => !allowedFields.includes(field))
  ) {
    return sendError(
      res,
      400,
      "PATCH hanya menerima nama, prodi, atau angkatan"
    );
  }

  Object.assign(item, req.body);

  if (item.nama) item.nama = item.nama.trim();
  if (item.prodi) item.prodi = item.prodi.trim();

  return sendSuccess(
    res,
    200,
    "Data mahasiswa berhasil diperbarui",
    item
  );
});

// DELETE menghapus mahasiswa tanpa body response
app.delete("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(
    (item) => item.nim === req.params.nim
  );

  if (index === -1) {
    return sendError(res, 404, "Mahasiswa tidak ditemukan");
  }

  mahasiswa.splice(index, 1);
  return res.status(204).send();
});

// Endpoint yang tidak tersedia
app.use((req, res) => {
  return sendError(res, 404, "Endpoint tidak ditemukan");
});

// Penanganan kesalahan JSON atau kesalahan server
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendError(res, 400, "Format JSON tidak valid");
  }

  console.error("Kesalahan aplikasi:", err.message);
  return sendError(res, 500, "Terjadi kesalahan pada server");
});

export default app;
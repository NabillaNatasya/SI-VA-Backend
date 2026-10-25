/**
 * Pertemuan 4 — Express.js Dasar: konfigurasi aplikasi
 * Tujuan: membuat Express app yang dapat diuji tanpa membuka port.
 * Jalankan: node app.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
const mahasiswa = [
    { nim: "240160221011", nama: "Faatin Ashri Widiatin" },
    { nim: "240160221012", nama: "Tafdiel Haqqi" },
];

app.use(express.json());

app.use((request, response, next) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
    next();
});

app.get("/", (request, response) => {
    response.json({
        success: true,
        message: "API Pertemuan 4 dengan Express.js",
        endpoints: ["GET /", "GET /health", "GET /mahasiswa", "POST /mahasiswa"],
    });
});

app.get("/health", (request, response) => {
    response.status(200).json({ success: true, status: "up" });
});

//
app.get("/mahasiswa", (request, response) => {
    const { nama } = request.query;

    const data = nama === undefined
        ? mahasiswa
        : mahasiswa.filter(
            (item) => item.nama.toLowerCase().includes(nama.toLowerCase())
        );

    response.status(200).json({
        success: true,
        total: data.length,
        data,
    });
});

//
app.get("/mahasiswa/:nim", (request, response) => {
    const mahasiswaDetail = mahasiswa.find(
        (item) => item.nim === request.params.nim
    );

    if (!mahasiswaDetail) {
        return response.status(404).json({
            success: false,
            message: "Mahasiswa tidak ditemukan",
        });
    }

    return response.status(200).json({
        success: true,
        data: mahasiswaDetail,
    });
});

app.post("/mahasiswa", (request, response) => {
    const { nim, nama } = request.body;

    if (!nim || !nama) {
        return response.status(400).json({
            success: false,
            message: "Field nim dan nama wajib diisi",
        });
    }

    const baru = { nim, nama };
    mahasiswa.push(baru);
    return response.status(201).json({ success: true, data: baru });
});

app.use((request, response) => {
    response.status(404).json({
        success: false,
        message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
    });
});

app.use((error, request, response, next) => {
    console.error("Kesalahan aplikasi:", error.message);
    response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export default app;

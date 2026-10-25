# Pertemuan 6 — Latihan API Pengguna dengan Express dan Prisma
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011

### 1. Deskripsi

Latihan ini bertujuan menerapkan operasi CRUD (*Create, Read, Update, Delete*) pada resource Pengguna menggunakan Express.js, Prisma ORM, dan database SQLite.

Endpoint yang dibuat meliputi:
- GET `/pengguna`
- GET `/pengguna/:nim`
- POST `/pengguna`
- PATCH `/pengguna/:nim`
- DELETE `/pengguna/:nim`

### 2. Instalasi Dependencies

Buka terminal VS Code dan masuk ke folder `Latihan`.

```bash
cd "Pertemuan6/Latihan"
```

Instal dependencies:

```bash
npm install
```

**Hasil yang diharapkan:** dependencies berhasil diinstal dan folder `node_modules` tersedia.

### 3. Migrasi Database

Jalankan perintah:

```bash
npx prisma migrate dev --name init
```

**Hasil pengujian:**

```text
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma/schema.prisma.
Datasource "db": SQLite database "dev.db" at "file:./prisma/dev.db"

SQLite database dev.db created at file:./prisma/dev.db

Applying migration `20261018074428_init`

Your database is now in sync with your schema.
```

Catatan: nama dan waktu migrasi bisa berbeda apabila perintah dijalankan kembali atau di lingkungan lain.

### 4. Generate Prisma Client

Jalankan:

```bash
npx prisma generate
```

**Hasil pengujian:**

```text
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.10.0) to ./prisma/generated
```

Hasil ini menandakan Prisma Client berhasil dibuat sesuai schema.

### 5. Menjalankan Server

Jalankan:

```bash
node --experimental-strip-types latihan.ts
```

**Hasil yang muncul:**

```text
Latihan Database API berjalan di http://localhost:3009
```

Biarkan terminal server tetap berjalan. Buka terminal kedua untuk menguji endpoint menggunakan `curl`.

### 6. Pengujian Endpoint API

#### A. GET `/pengguna` — Mengambil daftar pengguna

Perintah:

```bash
curl http://localhost:3009/pengguna
```

Hasil pengujian awal:

```json
{
  "success": true,
  "message": "Data pengguna berhasil diambil",
  "data": {
    "total": 0,
    "data": []
  }
}
```

**Keterangan:** endpoint berhasil dijalankan. Nilai `total: 0` menunjukkan belum ada data pengguna di database.

#### B. POST `/pengguna` — Menambahkan pengguna

Perintah:

```bash
curl -X POST http://localhost:3009/pengguna \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221011","nama":"Faatin Ashri","email":"faatinasri@gmail.com","role":"mahasiswa"}'
```

Hasil pengujian:

```json
{
  "success": true,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 1,
    "nim": "240160221011",
    "nama": "Faatin Ashri",
    "email": "faatinasri@gmail.com",
    "role": "mahasiswa"
  }
}
```

**Keterangan:** pengguna berhasil ditambahkan dengan status HTTP `201 Created`.

#### C. GET `/pengguna/:nim` — Mengambil detail pengguna

Perintah:

```bash
curl http://localhost:3009/pengguna/240160221011
```

Hasil pengujian:

```json
{
  "success": true,
  "message": "Detail pengguna berhasil diambil",
  "data": {
    "id": 1,
    "nim": "240160221011",
    "nama": "Faatin Ashri",
    "email": "faatinasri@gmail.com",
    "role": "mahasiswa"
  }
}
```

**Keterangan:** detail pengguna berhasil ditemukan berdasarkan NIM.

#### D. PATCH `/pengguna/:nim` — Memperbarui data pengguna

Perintah:

```bash
curl -X PATCH http://localhost:3009/pengguna/240160221011 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Faatin Ashri Updated"}'
```

Hasil pengujian:

```json
{
  "success": true,
  "message": "Data pengguna berhasil diperbarui",
  "data": {
    "id": 1,
    "nim": "240160221011",
    "nama": "Faatin Ashri Updated",
    "email": "faatinasri@gmail.com",
    "role": "mahasiswa"
  }
}
```

**Keterangan:** nama berhasil diperbarui tanpa mengubah NIM, email, atau role.

#### E. DELETE `/pengguna/:nim` — Menghapus pengguna

Perintah:

```bash
curl -i -X DELETE http://localhost:3009/pengguna/240160221011
```

Hasil pengujian:

```text
HTTP/1.1 204 No Content
```
Keterangan: pengguna berhasil dihapus. Status 204 No Content berarti operasi berhasil dan server tidak mengirimkan body respons.

### 9. Ringkasan Hasil Pengujian

| No. | Method | Endpoint | Hasil |
|---|---|---|---|
| 1 | GET | `/pengguna` | Berhasil |
| 2 | POST | `/pengguna` | Berhasil |
| 3 | GET | `/pengguna/:nim` | Berhasil |
| 4 | PATCH | `/pengguna/:nim` | Berhasil |
| 5 | DELETE | `/pengguna/:nim` | Berhasil |

Seluruh endpoint telah diuji menggunakan `curl`. Semua operasi memberikan respons sesuai fungsi masing-masing.

### 10. Kesimpulan

Latihan Individu Pertemuan 6 berhasil menerapkan operasi CRUD pada resource Pengguna menggunakan Express.js, Prisma ORM, dan SQLite. Pengujian menunjukkan endpoint dapat mengambil daftar dan detail pengguna, menambahkan pengguna baru, memperbarui data pengguna, serta menghapus pengguna berdasarkan NIM.
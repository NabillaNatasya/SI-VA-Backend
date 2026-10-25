# Tugas 4 — Integrasi Database dan ORM untuk REST API
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011

### 1. Teknologi
- Node.js
- Express.js
- Prisma ORM
- SQLite
- TypeScript

### 2. Instalasi

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example` dengan konfigurasi:

```dotenv
DATABASE_URL="file:./prisma/dev.db"
PORT=3007
```

### 3. Migrasi Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Menjalankan API

```bash
npm run dev
```

Server berjalan di `http://localhost:3007`.

### 5. Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/mahasiswa` | Mengambil semua mahasiswa |
| GET | `/mahasiswa/:nim` | Mengambil detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa |
| PUT | `/mahasiswa/:nim` | Mengganti seluruh data mahasiswa |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa |

Endpoint GET `/mahasiswa` mendukung filter `prodi` dan `angkatan`.

## 6. Pengujian REST API

Pengujian dilakukan menggunakan `curl` melalui terminal dengan server berjalan di `http://localhost:3007`.

### Menjalankan Server

```bash
npm run dev
```

**Output:**

```text
> tugas-individu@1.0.0 dev
> node --watch --experimental-strip-types server.ts

REST API Mahasiswa berjalan di http://localhost:3007
```

**Keterangan:** Server berhasil dijalankan pada port `3007`.

GET — Mengambil Seluruh Data Mahasiswa

```bash
curl -i http://localhost:3007/mahasiswa
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diambil","data":{"total":0,"data":[]}}
```

**Keterangan:** API berhasil mengambil data mahasiswa. Pada pengujian ini, jumlah data adalah `0` karena data belum dimasukkan.

### POST — Menambahkan Data Mahasiswa

```bash
curl -i -X POST http://localhost:3007/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "240160221011",
    "nama": "Faatin Ashri widiatin",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }'
```

**Output:**

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"id":1,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}}
```

### GET — Memastikan Data Berhasil Tersimpan

```bash
curl -i http://localhost:3007/mahasiswa
```

**Output :**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diambil","data":{"total":1,"data":[{"id":1,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}]}}
```

### GET — Mengambil Detail Mahasiswa Berdasarkan NIM

```bash
curl -i http://localhost:3007/mahasiswa/240160221011
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"id":1,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}}
```

### POST — Menguji Validasi Data Tidak Lengkap

```bash
curl -i -X POST http://localhost:3007/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "240160221012",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }'
```

**Output:**

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{"success":false,"message":"Data mahasiswa tidak valid","details":["Field nama wajib diisi"]}
```

### PATCH — Memperbarui Sebagian Data Mahasiswa

```bash
curl -i -X PATCH http://localhost:3007/mahasiswa/240160221011 \
  -H "Content-Type: application/json" \
  -d '{
    "prodi": "Informatika"
  }'
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diperbarui","data":{"id":1,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Informatika","angkatan":2024}}
```

### DELETE — Menghapus Data Mahasiswa

```bash
curl -i -X DELETE http://localhost:3007/mahasiswa/240160221011
```

**Output:**

```http
HTTP/1.1 204 No Content
Date: Sun, 25 Oct 2026 04:15:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### GET — Memastikan Data Telah Dihapus

```bash
curl -i http://localhost:3007/mahasiswa
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diambil","data":{"total":0,"data":[]}}
```

### GET — Menguji NIM yang Tidak Terdaftar

```bash
curl -i http://localhost:3007/mahasiswa/999999999999
```

**Output:**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{"success":false,"message":"Mahasiswa tidak ditemukan"}
```

### POST — Menambahkan Data untuk Pengujian Filter

```bash
curl -i -X POST http://localhost:3007/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "240160221011",
    "nama": "Faatin Ashri widiatin",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }'
```

**Output:**

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"id":2,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}}
```

### GET — Filter Berdasarkan Program Studi

```bash
curl -i "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diambil","data":{"total":1,"data":[{"id":2,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}]}}
```

### GET — Filter Berdasarkan Angkatan

```bash
curl -i "http://localhost:3007/mahasiswa?angkatan=2024"
```

**Output:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"Data mahasiswa berhasil diambil","data":{"total":1,"data":[{"id":2,"nim":"240160221011","nama":"Faatin Ashri widiatin","prodi":"Sistem Informasi","angkatan":2024}]}}
```

### 7. Hasil Pengujian Aktual

| Pengujian | Status | Hasil |
|---|---|---|
| GET semua mahasiswa | 200 OK | Berhasil |
| POST mahasiswa | 201 Created | Berhasil |
| GET detail mahasiswa | 200 OK | Berhasil |
| POST tanpa nama | 400 Bad Request | Validasi berhasil |
| PATCH mahasiswa | 200 OK | Berhasil |
| DELETE mahasiswa | 204 No Content | Berhasil |
| GET setelah DELETE | 200 OK | Total data 0 |
| GET NIM tidak terdaftar | 404 Not Found | Berhasil |
| Filter `prodi` | 200 OK | Total data 1 |
| Filter `angkatan` | 200 OK | Total data 1 |

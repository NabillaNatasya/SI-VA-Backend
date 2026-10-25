# Pertemuan 4 — Latihan Routing dan Middleware Express.js
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011
## Deskripsi

Latihan ini mengembangkan aplikasi Express.js dengan menerapkan:
- Middleware logger
- Route parameter
- Query parameter
- POST request
- Validasi request body
- Handler 404

## Menjalankan Aplikasi

```bash
npm install
node latihan.js
````

Server berjalan pada:

```text
http://localhost:3005
```

## Pengujian Endpoint

### 1. GET /buku

```bash
curl http://localhost:3005/buku
```

Hasil:

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "tersedia": true
    },
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "tersedia": false
    }
  ]
}
```

### 2. GET /buku?tersedia=true

```bash
curl "http://localhost:3005/buku?tersedia=true"
```

Hasil:

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "tersedia": true
    }
  ]
}
```

### 3. GET /buku?tersedia=false

```bash
curl "http://localhost:3005/buku?tersedia=false"
```

Hasil:

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "tersedia": false
    }
  ]
}
```

### 4. GET /buku/:id

```bash
curl http://localhost:3005/buku/1
```

Hasil:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Belajar Node.js",
    "tersedia": true
  }
}
```

### 5. GET /buku/:id — Data Tidak Ditemukan

```bash
curl http://localhost:3005/buku/99
```

Hasil:

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

### 6. POST /buku

```bash
curl -X POST http://localhost:3005/buku \
-H "Content-Type: application/json" \
-d '{"judul":"Pemrograman JavaScript","penulis":"Faatin"}'
```

Hasil:

```json
{
  "success": true,
  "data": {
    "id": 3,
    "judul": "Pemrograman JavaScript",
    "penulis": "Faatin",
    "tersedia": true
  }
}
```

### 7. POST /buku — Field Wajib Tidak Lengkap

```bash
curl -X POST http://localhost:3005/buku \
-H "Content-Type: application/json" \
-d '{"judul":"Buku Tanpa Penulis"}'
```

Hasil:

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

### 8. Endpoint Tidak Tersedia

```bash
curl http://localhost:3005/abc
```

Hasil:

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

## Kesimpulan

Seluruh endpoint yang diminta pada latihan telah diuji menggunakan `curl` dan berjalan sesuai dengan ketentuan.

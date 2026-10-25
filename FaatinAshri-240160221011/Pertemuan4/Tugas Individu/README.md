# Tugas 2 — REST Endpoint dengan Express.js
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011

## Struktur Project

```text
Tugas Individu/
├── app.js
├── server.js
├── package.json
└── README.md
````

## Cara Menjalankan

Berada di folder `Tugas Individu`, kemudian menjalankan:

```bash
npm install
npm start
```

Server berjalan pada:

```text
http://localhost:3004
```

## Endpoint

| Method | Endpoint                 | Keterangan                                   |
| ------ | ------------------------ | -------------------------------------------- |
| GET    | `/`                      | Menampilkan informasi API                    |
| GET    | `/health`                | Mengecek status server                       |
| GET    | `/mahasiswa`             | Menampilkan seluruh data mahasiswa           |
| GET    | `/mahasiswa?nama=Faatin` | Filter mahasiswa berdasarkan nama            |
| GET    | `/mahasiswa/:nim`        | Menampilkan detail mahasiswa berdasarkan NIM |
| POST   | `/mahasiswa`             | Menambahkan data mahasiswa                   |

## Contoh Request

### 1. GET `/`

```bash
curl http://localhost:3004/
```

Hasil:

```json
{
  "success": true,
  "message": "API Pertemuan 4 dengan Express.js",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /mahasiswa",
    "POST /mahasiswa"
  ]
}
```

### 2. GET `/health`

```bash
curl http://localhost:3004/health
```

Hasil:

```json
{
  "success": true,
  "status": "up"
}
```

### 3. GET `/mahasiswa`

```bash
curl http://localhost:3004/mahasiswa
```

Hasil:

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "nim": "240160221011",
      "nama": "Faatin Ashri Widiatin"
    },
    {
      "nim": "240160221012",
      "nama": "Tafdiel Haqqi"
    }
  ]
}
```

### 4. GET `/mahasiswa?nama=Faatin`

```bash
curl "http://localhost:3004/mahasiswa?nama=Faatin"
```

Hasil:

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "nim": "240160221011",
      "nama": "Faatin Ashri Widiatin"
    }
  ]
}
```

### 5. GET `/mahasiswa/:nim`

```bash
curl http://localhost:3004/mahasiswa/240160221011
```

Hasil:

```json
{
  "success": true,
  "data": {
    "nim": "240160221011",
    "nama": "Faatin Ashri Widiatin"
  }
}
```

### 6. GET `/mahasiswa/:nim` — data tidak ditemukan

```bash
curl http://localhost:3004/mahasiswa/999999999999
```

Hasil:

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

### 7. POST `/mahasiswa`

```bash
curl -X POST http://localhost:3004/mahasiswa \
-H "Content-Type: application/json" \
-d '{"nim":"240160221013","nama":"Fajar Nugraha"}'
```

Hasil:

```json
{
  "success": true,
  "data": {
    "nim": "240160221013",
    "nama": "Fajar Nugraha"
  }
}
```

### 8. POST `/mahasiswa` — validasi data

```bash
curl -X POST http://localhost:3004/mahasiswa \
-H "Content-Type: application/json" \
-d '{"nim":"240160221014"}'
```

Hasil:

```json
{
  "success": false,
  "message": "Field nim dan nama wajib diisi"
}
```

### 9. Endpoint tidak ditemukan

```bash
curl http://localhost:3004/abc
```

Hasil:

```json
{
  "success": false,
  "message": "Endpoint GET /abc tidak ditemukan"
}
```

## Middleware

Aplikasi menggunakan beberapa middleware:

1. `express.json()` untuk membaca request body JSON.
2. Logger middleware untuk mencatat waktu, method, dan URL setiap request.
3. Handler 404 untuk endpoint yang tidak ditemukan.
4. Error middleware untuk menangani kesalahan aplikasi.

## Hasil Pengujian

Seluruh endpoint utama telah berhasil diuji menggunakan `curl`.

* GET `/` → berhasil
* GET `/health` → berhasil
* GET `/mahasiswa` → berhasil
* GET `/mahasiswa?nama=Faatin` → berhasil
* GET `/mahasiswa/240160221011` → berhasil
* GET `/mahasiswa/999999999999` → 404 sesuai ketentuan
* POST `/mahasiswa` → berhasil
* POST `/mahasiswa` tanpa field lengkap → 400 sesuai ketentuan
* GET `/abc` → 404 sesuai ketentuan

## Kesimpulan

Tugas 2 menerapkan REST endpoint menggunakan Express.js dengan pemisahan `app.js` dan `server.js`, middleware JSON dan logger, route parameter, query parameter, response JSON, status code, handler 404, serta error middleware.

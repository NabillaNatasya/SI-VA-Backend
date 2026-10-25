# AKTIVITAS KELOMPOK — PERTEMUAN 4

## Anggota Kelompok 6

1. Dadika Yudiana — 240160221006
2. Faatin Ashri Widiatin — 240160221011
3. Marsya Nurdrianti — 240160221022

## 1. Pemetaan Alur dari `node:http` ke Express

Pada Pertemuan 3, aplikasi menggunakan modul `node:http` untuk membuat HTTP server, memeriksa URL dan method request, serta mengirim response kepada client.

Pada Pertemuan 4, aplikasi menggunakan Express.js agar routing dan middleware dapat ditulis dengan lebih terstruktur.

| Pertemuan 3 (`node:http`) | Pertemuan 4 (Express) |
|---|---|
| Membuat server dengan `createServer()` | Membuat aplikasi dengan `express()` dan `app.listen()` |
| Memeriksa URL dan method secara manual | Menggunakan `app.get()` dan `app.post()` |
| Membaca body request secara manual | Menggunakan `express.json()` |
| Mengirim response secara manual | Menggunakan `res.status()` dan `res.json()` |
| Memeriksa route yang tidak ditemukan | Menggunakan middleware 404 |
| Menangani error | Menggunakan error-handling middleware |

Endpoint Express yang diuji pada tugas ini adalah:

- `GET /` — menampilkan informasi API dan daftar endpoint.
- `GET /health` — memeriksa status server.
- `GET /mahasiswa` — mengambil data anggota Kelompok 6.
- `POST /mahasiswa` — menambahkan data mahasiswa.

Data awal aplikasi berisi tiga anggota Kelompok 6, yaitu Dadika Yudiana, Faatin Ashri Widiatin, dan Marsya Nurdrianti.

## 2. Susunan Middleware Express

Urutan middleware pada aplikasi adalah:

1. **Logger** — mencatat method dan URL setiap request.
2. **JSON parser** — membaca request body berformat JSON menggunakan `express.json()`.
3. **Route** — memproses endpoint yang tersedia.
4. **404 handler** — menangani request ke endpoint yang tidak ditemukan.
5. **Error handler** — menangani error yang diteruskan ke middleware error.

Logger ditempatkan di awal agar request tercatat, termasuk request ke endpoint yang tidak tersedia. JSON parser ditempatkan sebelum route agar body JSON dapat dibaca oleh handler. Middleware 404 diletakkan setelah seluruh route, sedangkan error handler diletakkan paling akhir.

## 3. Hasil Pengujian Request

Pengujian dilakukan menggunakan `curl` setelah server Express dijalankan pada port `3004`.

### GET `/mahasiswa`

```bash
curl -i http://localhost:3004/mahasiswa
```

**Status :** `200 OK`

**Response :**

```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "nim": "240160221006",
      "nama": "Dadika Yudiana"
    },
    {
      "nim": "240160221011",
      "nama": "Faatin Ashri Widiatin"
    },
    {
      "nim": "240160221022",
      "nama": "Marsya Nurdrianti"
    }
  ]
}
```

### GET `/health`

```bash
curl -i http://localhost:3004/health
```

**Status :** `200 OK`

**Response :**

```json
{
  "success": true,
  "status": "up"
}
```

###  GET `/`

```bash
curl -i http://localhost:3004/
```

**Status :** `200 OK`

**Response :**

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

### POST `/mahasiswa` dengan Body Tidak Lengkap

```bash
curl -i -X POST http://localhost:3004/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nama":"Mahasiswa Uji"}'
```

**Status :** `400 Bad Request`

**Response :**

```json
{
  "success": false,
  "message": "Field nim dan nama wajib diisi"
}
```

### GET Endpoint Tidak Tersedia

```bash
curl -i http://localhost:3004/endpoint-tidak-ada
```

**Status :** `404 Not Found`

**Response :**

```json
{
  "success": false,
  "message": "Endpoint GET /endpoint-tidak-ada tidak ditemukan"
}
```

### POST `/mahasiswa` dengan Body Valid

```bash
curl -i -X POST http://localhost:3004/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221099","nama":"Mahasiswa Uji"}'
```

**Status :** `201 Created`

**Response :**

```json
{
  "success": true,
  "data": {
    "nim": "240160221099",
    "nama": "Mahasiswa Uji"
  }
}
```

## 4. Kesimpulan

Aktivitas kelompok Pertemuan 4 berhasil menguji aplikasi Express.js dengan data tiga anggota Kelompok 6. Endpoint `GET /`, `GET /health`, dan `GET /mahasiswa` menghasilkan status `200 OK`. Request `POST /mahasiswa` dengan body tidak lengkap menghasilkan `400 Bad Request`, request ke endpoint yang tidak tersedia menghasilkan `404 Not Found`, dan request POST dengan body valid menghasilkan `201 Created`.

Logger berhasil mencatat enam request yang diuji. Susunan middleware menunjukkan pentingnya penempatan logger sebelum route, JSON parser sebelum route yang membutuhkan body, middleware 404 setelah seluruh route, serta error handler pada bagian akhir aplikasi.
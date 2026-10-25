# Tugas 3 — Perancangan dan Implementasi RESTful API
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011

## 1. Deskripsi
Project ini merupakan RESTful API untuk mengelola data mahasiswa. API menyediakan operasi untuk mengambil, menambahkan, mengganti, memperbarui sebagian, dan menghapus data mahasiswa.

API juga mendukung filter berdasarkan program studi (`prodi`) dan tahun angkatan (`angkatan`), validasi input, penanganan error, serta response JSON yang konsisten.

Data mahasiswa disimpan sementara di dalam array, sehingga data yang ditambahkan atau diubah tidak disimpan secara permanen.

## 2. Struktur Project

```text
Tugas Individu/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

Keterangan:

* `app.js`: konfigurasi Express.js, data mahasiswa, endpoint, validasi, dan penanganan error.
* `server.js`: menjalankan server Express.js.
* `package.json`: informasi project, script, dan dependensi.
* `README.md`: dokumentasi penggunaan dan hasil pengujian.
* `node_modules/`: dependensi yang digunakan oleh project.

## 3. Cara Menjalankan Project

### Langkah 1 — Masuk ke folder project

Buka Terminal dan ketik:

```bash
cd "/Users/mac/Documents/FaatinAshri-240160221011/Pertemuan5/Tugas Individu"
```

Untuk memastikan folder sudah benar, ketik:

```bash
pwd
```

Hasil yang diharapkan:

```text
/Users/mac/Documents/FaatinAshri-240160221011/Pertemuan5/Tugas Individu
```

### Langkah 2 — Menjalankan server

Ketik:

```bash
npm start
```

Hasil yang diharapkan:

```text
REST API berjalan di http://localhost:3006
```

Biarkan Terminal ini tetap terbuka selama pengujian berlangsung.

### Langkah 3 — Membuka Terminal kedua

Buka tab Terminal baru menggunakan `Command + T`. Jalankan perintah pengujian pada tab kedua agar server tetap berjalan.

Alamat dasar API:

```text
http://localhost:3006
```

## 4. Kontrak Endpoint API

| No. | Method | Endpoint          | Fungsi                                          | Status sukses  |
| --- | ------ | ----------------- | ----------------------------------------------- | -------------- |
| 1   | GET    | `/mahasiswa`      | Mengambil seluruh mahasiswa atau memfilter data | 200 OK         |
| 2   | GET    | `/mahasiswa/:nim` | Mengambil detail mahasiswa berdasarkan NIM      | 200 OK         |
| 3   | POST   | `/mahasiswa`      | Menambahkan mahasiswa baru                      | 201 Created    |
| 4   | PUT    | `/mahasiswa/:nim` | Mengganti seluruh data mahasiswa                | 200 OK         |
| 5   | PATCH  | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa             | 200 OK         |
| 6   | DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa                             | 204 No Content |

### Query parameter

| Parameter  | Fungsi                            | Contoh                      |
| ---------- | --------------------------------- | --------------------------- |
| `prodi`    | Filter berdasarkan program studi  | `?prodi=Sistem%20Informasi` |
| `angkatan` | Filter berdasarkan tahun angkatan | `?angkatan=2024`            |

Kedua filter dapat digunakan secara bersamaan.

## 5. Hasil Pengujian API

### Pengujian 1 — Mengambil seluruh data mahasiswa

**Tujuan:** Menampilkan seluruh data mahasiswa yang tersedia.

Perintah:

```bash
curl -i http://localhost:3006/mahasiswa
```

Hasil aktual:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": {
    "total": 2,
    "data": [
      {
        "nim": "240160221011",
        "nama": "Faatin Ashri",
        "prodi": "Sistem Informasi",
        "angkatan": 2024
      },
      {
        "nim": "240160221012",
        "nama": "Tafdiel Haqqi",
        "prodi": "Sistem Informasi",
        "angkatan": 2023
      }
    ]
  }
}
```

**Kesimpulan:** Pengujian berhasil. API mengembalikan dua data mahasiswa dengan status `200 OK`.

### Pengujian 2 — Filter berdasarkan prodi dan angkatan

**Tujuan:** Mengambil mahasiswa program studi Sistem Informasi yang masuk pada tahun 2024.

Perintah:

```bash
curl -i "http://localhost:3006/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"
```

Hasil aktual:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": {
    "total": 1,
    "data": [
      {
        "nim": "240160221011",
        "nama": "Faatin Ashri",
        "prodi": "Sistem Informasi",
        "angkatan": 2024
      }
    ]
  }
}
```

**Kesimpulan:** Pengujian berhasil. API menerapkan kedua filter dan hanya menampilkan satu mahasiswa.

### Pengujian 3 — Mengambil detail mahasiswa berdasarkan NIM

**Tujuan:** Mengambil detail mahasiswa dengan NIM `240160221011`.

Perintah:

```bash
curl -i http://localhost:3006/mahasiswa/240160221011
```

Hasil aktual:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "240160221011",
    "nama": "Faatin Ashri",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

**Kesimpulan:** Pengujian berhasil. Route parameter `:nim` digunakan untuk mencari mahasiswa tertentu.

### Pengujian 4 — NIM tidak ditemukan

**Tujuan:** Memastikan API mengembalikan error jika NIM tidak tersedia.

Perintah:

```bash
curl -i http://localhost:3006/mahasiswa/999999999999
```

Hasil aktual:

```text
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

**Kesimpulan:** Pengujian berhasil. API mengembalikan status `404 Not Found` karena mahasiswa tidak ditemukan.

### Pengujian 5 — Menambahkan mahasiswa dengan data tidak lengkap

**Tujuan:** Memastikan validasi menolak input yang tidak lengkap.

Perintah:

```bash
curl -i -X POST http://localhost:3006/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221013","nama":"Citra"}'
```

Hasil aktual:

```text
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": false,
  "message": "Data mahasiswa tidak valid",
  "details": [
    "Field prodi wajib diisi",
    "Field angkatan wajib diisi"
  ]
}
```

**Kesimpulan:** Pengujian berhasil. API menolak input karena `prodi` dan `angkatan` wajib diisi.

### Pengujian 6 — Menambahkan mahasiswa baru

**Tujuan:** Menambahkan mahasiswa dengan data lengkap.

Perintah:

```bash
curl -i -X POST http://localhost:3006/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221013","nama":"Fajar","prodi":"Informatika","angkatan":2024}'
```

Hasil aktual:

```text
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221013",
    "nama": "Fajar",
    "prodi": "Informatika",
    "angkatan": 2024
  }
}
```

**Kesimpulan:** Pengujian berhasil. Mahasiswa baru ditambahkan dengan status `201 Created`.

### Pengujian 7 — Mengganti seluruh data menggunakan PUT

**Tujuan:** Mengganti data mahasiswa yang sudah dibuat.

Perintah:

```bash
curl -i -X PUT http://localhost:3006/mahasiswa/240160221013 \
  -H "Content-Type: application/json" \
  -d '{"nim":"240160221013","nama":"Fajar Pratama","prodi":"Sistem Informasi","angkatan":2024}'
```

Hasil aktual:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diganti",
  "data": {
    "nim": "240160221013",
    "nama": "Fajar Pratama",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

**Kesimpulan:** Pengujian berhasil. Seluruh data mahasiswa diganti menggunakan method `PUT`.

### Pengujian 8 — Memperbarui sebagian data menggunakan PATCH

**Tujuan:** Mengubah nama mahasiswa tanpa mengirim ulang seluruh field.

Perintah:

```bash
curl -i -X PATCH http://localhost:3006/mahasiswa/240160221013 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Fajar P. Pratama"}'
```

Hasil aktual:

```text
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

Response JSON:

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": {
    "nim": "240160221013",
    "nama": "Fajar P. Pratama",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

**Kesimpulan:** Pengujian berhasil. Hanya nama yang berubah, sedangkan prodi dan angkatan tetap sama.

### Pengujian 9 — Menghapus mahasiswa

**Tujuan:** Menghapus mahasiswa berdasarkan NIM.

Perintah:

```bash
curl -i -X DELETE http://localhost:3006/mahasiswa/240160221013
```

Hasil aktual:

```text
HTTP/1.1 204 No Content
```

Tidak ada body JSON setelah header response.

**Kesimpulan:** Pengujian berhasil. Mahasiswa dihapus dan API mengembalikan status `204 No Content` tanpa body, sesuai ketentuan RESTful API.

## 6. Struktur Response

### Response sukses

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": {}
}
```

### Response error

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

Untuk kesalahan validasi, response dapat menyertakan `details` berupa daftar kesalahan input.

Response `204 No Content` merupakan pengecualian karena tidak memiliki body.

## 7. Status Code yang Digunakan

| Status code               | Makna                                  | Penggunaan              |
| ------------------------- | -------------------------------------- | ----------------------- |
| 200 OK                    | Request berhasil                       | GET, PUT, PATCH         |
| 201 Created               | Resource berhasil dibuat               | POST                    |
| 204 No Content            | Resource berhasil dihapus tanpa body   | DELETE                  |
| 400 Bad Request           | Input tidak valid                      | Validasi request        |
| 404 Not Found             | Resource atau endpoint tidak ditemukan | Pencarian data          |
| 500 Internal Server Error | Kesalahan internal server              | Penanganan error server |

## 8. Kesimpulan

RESTful API mahasiswa telah menyediakan enam endpoint utama dengan method HTTP yang sesuai, route parameter berdasarkan NIM, dua query parameter untuk filter, validasi input, penanganan error, dan response JSON yang konsisten.

Pengujian yang telah dilakukan menunjukkan bahwa endpoint menghasilkan status code sesuai kebutuhan, termasuk `200`, `201`, `400`, `404`, dan `204`. Khusus operasi penghapusan, API mengembalikan `204 No Content` tanpa body response.

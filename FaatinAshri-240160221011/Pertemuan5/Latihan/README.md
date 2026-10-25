# Pertemuan 5 — Latihan RESRESTful API Mahasiswa
**Nama:** Faatin Ashri Widiatin

**NPM:** 240160221011

## Hasil Pengujian API

### 1. Mengambil seluruh data mahasiswa

* **Method:** GET
* **URL:** `/mahasiswa`
* **Status Code:** `200 OK`
* **Response JSON:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
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
```

### 2. Filter mahasiswa berdasarkan prodi

* **Method:** GET
* **URL:** `/mahasiswa?prodi=Sistem%20Informasi`
* **Status Code:** `200 OK`
* **Response JSON:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
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
```

### 3. Mengambil detail mahasiswa berdasarkan NIM

* **Method:** GET
* **URL:** `/mahasiswa/240160221011`
* **Status Code:** `200 OK`
* **Response JSON:**

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

### 4. Mengambil mahasiswa dengan NIM yang tidak ditemukan

* **Method:** GET
* **URL:** `/mahasiswa/999999999999`
* **Status Code:** `404 Not Found`
* **Response JSON:**

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

### 5. Menambahkan mahasiswa baru

* **Method:** POST
* **URL:** `/mahasiswa`
* **Status Code:** `201 Created`
* **Request JSON:**

```json
{
  "nim": "240160221013",
  "nama": "Fajar",
  "prodi": "Informatika",
  "angkatan": 2024
}
```

* **Response JSON:**

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

### 6. Menambahkan mahasiswa dengan data tidak lengkap

* **Method:** POST
* **URL:** `/mahasiswa`
* **Status Code:** `400 Bad Request`
* **Request JSON:**

```json
{
  "nim": "240160221014",
  "nama": "Citra"
}
```

* **Response JSON:**

```json
{
  "success": false,
  "message": "NIM, nama, prodi, dan angkatan wajib diisi dengan benar"
}
```

### 7. Mengubah sebagian data mahasiswa

* **Method:** PATCH
* **URL:** `/mahasiswa/240160221013`
* **Status Code:** `200 OK`
* **Request JSON:**

```json
{
  "nama": "Fajar Pratama"
}
```

* **Response JSON:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": {
    "nim": "240160221013",
    "nama": "Fajar Pratama",
    "prodi": "Informatika",
    "angkatan": 2024
  }
}
```

### 8. Menghapus mahasiswa

* **Method:** DELETE
* **URL:** `/mahasiswa/240160221013`
* **Status Code:** `204 No Content`
* **Response:** Tidak ada body JSON karena status `204` tidak mengembalikan isi response.

## Kesimpulan

Pengujian RESTful API mahasiswa dilakukan menggunakan perintah `curl`. Endpoint GET, POST, PATCH, dan DELETE telah diuji. Status code yang berhasil diuji meliputi `200`, `201`, `400`, `404`, dan `204`. Middleware logger mencatat method dan URL setiap request yang masuk.

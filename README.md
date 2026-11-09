# T-SENSE by OCEANOVA — Dashboard Update (Tanjung Buyut)

Dashboard prototipe untuk pengujian pemantauan muka air, perbandingan data pasut BIG, katalog Ina-CORS, indikator ambang, dan screening awal area rendah dari titik/grid DEM.

## Lokasi awal

Peta dimulai pada area Stasiun Pandu Tanjung Buyut dengan koordinat pendekatan `-2.3210, 104.9157`. Koordinat tersebut berasal dari lokasi penelitian pasut yang dipublikasikan di Muara Sungai Musi; bukan koordinat pemasangan alat T-SENSE. Ubah ke koordinat hasil survei lapangan sebelum pengujian sebenarnya.

## Menjalankan

1. Ekstrak ZIP.
2. Buka folder `tsense-oceanova-update` di VS Code.
3. Isi `assets/firebase-config.js` dengan konfigurasi Firebase web app Anda.
4. Jalankan `index.html` menggunakan VS Code Live Server (atau `python -m http.server 5500`). Jangan membuka file dengan `file://`.
5. Untuk uji tampilan, pilih **Masuk mode demo**. Data sensor dan koordinat dalam demo disimulasikan.

## Model perhitungan

### Elevasi sensor

`H_air = H_ref_sensor - d_sensor`

`H_ref_sensor` adalah elevasi titik referensi pemasangan sensor terhadap datum vertikal yang dipilih. `d_sensor` adalah jarak vertikal A01NYUB ke permukaan air. Persamaan hanya menghasilkan elevasi yang dapat dibandingkan jika H_ref dan data pembanding memakai datum vertikal yang sama. Tinggi ellipsoid NEO-M8N tidak boleh langsung dianggap sebagai MSL/HAT.

### Indikator bahaya

Pengguna harus memasukkan tiga ambang lokal (Waspada, Siaga, Bahaya) dengan urutan `Waspada < Siaga < Bahaya`. Dashboard membandingkan H_air dengan ambang tersebut. Tidak ada ambang numerik bawaan karena ambang harus ditentukan dari benchmark, riwayat rob, elevasi aset/tanggul, dan validasi setempat. Jika kalibrasi atau ambang belum lengkap, status tetap **Belum dinilai**.

### Pembanding BIG

- Tautan Model Pasut BIG tersedia di bagian Referensi Pasut.
- Impor CSV dapat menggabungkan data dari stasiun mana pun. Kolom wajib: `datetime,height_m`; disarankan: `datum,station`.
- Perbandingan residual dilakukan hanya jika datum sama dan selisih waktu maksimum 30 menit.
- Pastikan timezone, datum, satuan, lokasi, dan tipe data (prediksi atau observasi) benar. Jangan mencampur prediksi dengan observasi tanpa label.
- Dashboard tidak melakukan scraping atau mengklaim API BIG otomatis. Hasil portal BIG harus diunduh/dimasukkan sesuai layanan dan ketentuan BIG.

Template: `template-big-pasut.csv`.

## Ina-CORS

Bagian Ina-CORS menerima katalog stasiun dalam CSV: `station_code,station_name,latitude,longitude,availability,rinex_date`. Semua stasiun yang ada di CSV dapat ditampilkan sebagai titik dan tabel. Ini adalah metadata stasiun, bukan muka air.

RINEX adalah data observasi GNSS. Dashboard statis ini belum memproses file RINEX, menghitung solusi geodetik, atau menurunkan tinggi air dari GNSS-IR. Untuk mengikat elevasi sensor ke datum geodetik dibutuhkan survei/leveling dan pengolahan geodesi yang sesuai.

Template: `template-inacors-stations.csv`.

## Screening grid DEM

Impor CSV berisi titik/grid sampel DEM dengan kolom `latitude,longitude,elevation_m`, lalu isi elevasi skenario muka air dan resolusi sel. Dashboard mewarnai sel DEM dengan elevasi <= skenario dan menghitung selisih elevasi sebagai **screening area rendah potensial**.

PENTING: hasil ini bukan peta genangan terkonfirmasi. Belum memodelkan konektivitas ke laut, tanggul, drainase, aliran, pasang-surut sungai, gelombang, hujan, penurunan tanah, atau dinamika hidrodinamika. DEM harus memiliki datum vertikal yang sama dengan skenario. Untuk peta genangan rinci dan dapat dipertanggungjawabkan, proses DEM di QGIS/ArcGIS dengan conditioning hidrologi/konektivitas, validasi lapangan, kemudian impor polygon GeoJSON.

Template: `template-dem-grid.csv`.

## Status implementasi dan batasan

- Firebase Auth: email/password dan Google (jika konfigurasi/auth domains diaktifkan).
- Sensor A01NYUB dan NEO-M8N: masih simulasi; belum terhubung ke ESP32/Firebase realtime.
- Data tersimpan di memori sesi browser; refresh dapat menghapus input dan rekaman.
- Data BIG: impor manual CSV / input manual, bukan API realtime.
- Ina-CORS: katalog stasiun saja; tidak memproses RINEX.
- Peta DEM: screening elevasi sederhana, bukan hidrodinamika atau peta evakuasi.
- Indikator rob: hanya aktif setelah kalibrasi dan ambang lokal yang valid.

## Sumber resmi dan referensi

- BIG SRGI Model Pasut: https://srgi.big.go.id/map/pasu
- BIG SRGI Jaring Kontrol Geodesi: https://srgi.big.go.id/page/jaring-kontrol-geodesi
- BIG SRGI Unduh RINEX: https://srgi.big.go.id/page/unduh-data-rinex
- BIG DEMNAS: https://www.big.go.id/content/product/demnas
- Informasi Ina-CORS: https://srgi.big.go.id/home-v2

## Privasi dan keamanan

Jangan unggah kredensial Wi-Fi atau token rahasia ke repositori publik. Firebase API key web bukan password, tetapi atur Authorized Domains, Firebase Security Rules, dan pembatasan API sesuai kebutuhan.

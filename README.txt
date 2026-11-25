RAUNG! SPACE — WEBSITE + ADMIN (GitHub + Pages CMS)

A. UNGGAH KE GITHUB
1. Buat akun di https://github.com
2. Buat repository baru, misalnya "raung-space". Pilih Public (GitHub Pages di akun gratis memerlukan repository publik).
   Artinya semua file bisa dilihat orang lain. Jangan unggah password atau data pribadi.
3. Ekstrak ZIP. Di repository, pilih "uploading an existing file" / Add file > Upload files.
4. Seret SEMUA ISI folder hasil ekstrak (bukan ZIP-nya), termasuk folder content dan images. Klik Commit changes.
5. Pastikan file .pages.yml ikut terunggah (di komputer bisa tersembunyi). Jika tidak ada:
   Add file > Create new file, beri nama .pages.yml, salin isinya dari file asli, lalu Commit.

B. ONLINE-KAN (GitHub Pages)
1. Di repository: Settings > Pages.
2. Source: Deploy from a branch. Branch: main, folder: / (root). Save.
3. Tunggu beberapa menit. Alamat website muncul di halaman tersebut.

C. SAMBUNGKAN ADMIN
1. Buka https://app.pagescms.org, masuk dengan GitHub.
2. Ikuti permintaan pemasangan aplikasi, beri akses hanya ke repository website ini.
3. Buka repository. Menu isi: Kontak dan tiap halaman.
4. Untuk admin lain, undang lewat email di bagian Collaborators.

D. TES
Ubah satu teks atau harga, Save, tunggu beberapa menit, lalu refresh website.

CATATAN
- Admin bisa mengedit teks, foto, menu, harga, acara, galeri, dan kontak. Warna, susunan, menu navigasi, footer, dan sebagian judul bagian tetap diatur di kode.
- Klik dua kali index.html hanya menampilkan isi awal. Perubahan dari folder content tampil setelah website online.
- Foto dan sebagian konten masih contoh. Unggah foto asli lewat panel admin.

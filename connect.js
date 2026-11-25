// Menampilkan isi dari folder content/ (diedit lewat Pages CMS).
// Jika file data tidak bisa dibaca (misalnya dibuka dengan klik dua kali), teks asli di HTML tetap tampil.
(async function () {
  const muat = async n => {
    try { const r = await fetch("content/" + n + ".json", { cache: "no-store" }); return r.ok ? await r.json() : null; }
    catch (e) { return null; }
  };
  const page = document.body.dataset.page;
  const [kontak, d] = await Promise.all([muat("kontak"), muat(page)]);
  const el = (tag, kelas, teks) => { const x = document.createElement(tag); if (kelas) x.className = kelas; if (teks) x.textContent = teks; return x; };
  const gambar = src => { const i = el("img"); i.src = src || ""; i.alt = ""; return i; };
  const bg = (src, gradien) => (gradien ? gradien + "," : "") + 'url("' + encodeURI(decodeURI(src)) + '")';
  const aman = link => /^(https:\/\/|[\w-]+\.html$)/.test(link || "") ? link : "";

  if (d) {
    document.querySelectorAll("[data-cms]").forEach(x => { const v = d[x.dataset.cms]; if (v != null) x.textContent = v; });

    const h1 = document.querySelector("[data-title]");
    if (h1) {
      const baris = [];
      const tambah = (teks, miring, sambung) => String(teks || "").split("\n").filter(Boolean).forEach((t, i) => {
        if (baris.length) baris.push(sambung && i === 0 ? document.createTextNode(" ") : el("br"));
        baris.push(miring ? el("i", "", t) : document.createTextNode(t));
      });
      tambah(d.judulAwal); tambah(d.judulMiring, true, d.miringBarisBaru === false); tambah(d.judulAkhir);
      h1.replaceChildren(...baris);
    }
    const hero = document.querySelector("[data-hero]");
    if (hero && d.fotoUtama) {
      const g = hero.classList.contains("hero") ? "linear-gradient(90deg,#171714ed 0%,#17171499 52%,#17171422)" : "linear-gradient(90deg,#171714e8,#17171455)";
      hero.style.backgroundImage = bg(d.fotoUtama, g);
    }
    document.querySelectorAll("[data-bg]").forEach(x => { if (d[x.dataset.bg]) x.style.backgroundImage = bg(d[x.dataset.bg]); });

    const box = document.querySelector("[data-list]");
    if (box && Array.isArray(d.items)) {
      const buat = {
        menu: (m, i) => {
          const r = el("div", "menu-row"), isi = el("div");
          isi.append(el("h3", "", m.nama), el("p", "", m.deskripsi));
          if (m.harga) isi.append(el("p", "", m.harga));
          r.append(el("b", "", String(i + 1).padStart(2, "0")), isi); return r;
        },
        events: a => {
          const r = el("article", "event"), t = el("a", "btn", "Tanya Acara ↗");
          t.href = "contact.html"; t.dataset.wa = "Halo RAUNG! SPACE, saya mau tanya tentang " + (a.judul || "acara") + ".";
          r.append(el("div", "eyebrow", a.kategori), el("h3", "", a.judul), el("p", "", a.deskripsi), t); return r;
        },
        tiles: k => {
          const r = el("a", "tile"), isi = el("div");
          if (aman(k.link)) r.href = k.link;
          isi.append(el("small", "", k.label), el("h3", "", k.judul)); r.append(gambar(k.foto), isi); return r;
        },
        gallery: f => gambar(f.foto)
      }[box.dataset.list];
      box.replaceChildren(...d.items.map(buat));
    }
  }

  const K = kontak || {};
  const wa = String(K.whatsapp || "").replace(/\D/g, "");
  const waLink = pesan => "https://wa.me/" + wa + "?text=" + encodeURIComponent(pesan || K.pesanWA || "");
  const keluar = (a, url) => { a.href = url; a.target = "_blank"; a.rel = "noopener"; };
  if (wa) document.querySelectorAll(".floatwa, [data-wa]").forEach(a => keluar(a, waLink(a.dataset.wa)));
  const isi = (id, teks) => { const x = document.getElementById(id); if (x && teks) x.textContent = teks; };
  isi("info-wa", wa && "+" + wa); isi("info-alamat", K.alamat); isi("info-jam", K.jamBuka);
  const tombol = document.getElementById("btn-wa");
  if (tombol) {
    if (wa) keluar(tombol, waLink());
    else tombol.addEventListener("click", e => { e.preventDefault(); alert("Nomor WhatsApp RAUNG! SPACE belum ditambahkan."); });
  }
  const peta = document.getElementById("link-maps");
  if (peta && /^https:\/\//.test(K.maps || "")) { keluar(peta, K.maps); peta.hidden = false; document.getElementById("info-maps").hidden = true; }
  const catatan = document.getElementById("info-catatan");
  if (catatan && wa && K.alamat && K.jamBuka) catatan.hidden = true;
})();

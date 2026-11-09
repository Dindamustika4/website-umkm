"use strict";

console.log("P11 JavaScript aktif");

const produkUmkm = [
  { nama: "Paket Pelajar", kategori: "Paket Pelajar", harga: 26000, stok: 15, unggulan: false, keterangan: "Isi: Kopi Gula Aren + Roti Bakar Cokelat Keju" },
  { nama: "Kopi Gula Aren", kategori: "Minuman", harga: 16000, stok: 20, unggulan: true, keterangan: "1 gelas kopi dengan manis gula aren" },
  { nama: "Roti Bakar Cokelat Keju", kategori: "Menu Satuan", harga: 10000, stok: 12, unggulan: true, keterangan: "1 porsi roti bakar cokelat keju" },
  { nama: "Mi Bangladesh", kategori: "Paket Nongkrong", harga: 13000, stok: 8, unggulan: true, keterangan: "Isi: mi, telur, dan kerupuk, porsi untuk berdua" },
  { nama: "Pizza Pepperoni", kategori: "Menu Satuan", harga: 7000, stok: 5, unggulan: false, keterangan: "1 potong pizza pepperoni" },
];

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  } else if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  } else {
    return { label: "Tersedia", className: "" };
  }
}

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const note = document.createElement("p");
  note.textContent = produk.keterangan;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  card.append(title, category, note, price, stock);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

renderProduk();
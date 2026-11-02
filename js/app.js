"use strict";

console.log("P10 JavaScript aktif");

const produkUmkm = [
  { nama: "Paket Pelajar", kategori: "Paket Pelajar", harga: 26000, stok: 15, unggulan: false },
  { nama: "Kopi Gula Aren", kategori: "Menu Satuan", harga: 16000, stok: 20, unggulan: true },
  { nama: "Roti Bakar Cokelat Keju", kategori: "Menu Satuan", harga: 10000, stok: 12, unggulan: true },
  { nama: "Mi Bangladesh", kategori: "Paket Nongkrong", harga: 13000, stok: 8, unggulan: true },
  { nama: "Pizza Pepperoni", kategori: "Menu Satuan", harga: 7000, stok: 5, unggulan: false },
];

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

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok, "harga:", formatRupiah(produk.harga));
  });
  console.table(produkUmkm);

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";
}

document.addEventListener("DOMContentLoaded", renderProduk);
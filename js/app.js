"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Paket Pelajar", kategori: "Paket Pelajar", harga: 26000, stok: 15, unggulan: false },
  { nama: "Kopi Gula Aren", kategori: "Menu Satuan", harga: 16000, stok: 20, unggulan: true },
  { nama: "Roti Bakar Cokelat Keju", kategori: "Menu Satuan", harga: 10000, stok: 12, unggulan: true },
  { nama: "Mi Bangladesh", kategori: "Paket Nongkrong", harga: 13000, stok: 8, unggulan: true },
  { nama: "Pizza Pepperoni", kategori: "Menu Satuan", harga: 7000, stok: 5, unggulan: false },
];

function labelKategori(kategori) {
  switch (kategori) {
    case "Paket Pelajar":
      return "Paket hemat untuk pelajar";
    case "Paket Nongkrong":
      return "Porsi berbagi untuk dua orang";
    case "Menu Satuan":
      return "Pesan satuan sesuai selera";
    default:
      return "Produk UMKM";
  }
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

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

console.log(labelKategori(produkUmkm[0].kategori));
console.log(labelKategori(produkUmkm[3].kategori));
console.log(labelKategori(produkUmkm[1].kategori));

produkUmkm.forEach(function (produk) {
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
  console.log(produk.nama, "|", labelKategori(produk.kategori), "|", formatRupiah.format(produk.harga), "|", labelAksi);
});

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const labelUnggulan = produk.unggulan ? "<p>Produk unggulan</p>" : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

            markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        ${labelUnggulan}
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);

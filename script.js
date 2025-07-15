// ======= DATA AWAL =======
const greenBeans = [
  "Aceh Bies Mulie Wet Hulled", "Brazil Washed", "Ethiopia Danche Natural",
  "Ethiopia Harsu Haro Natural", "Ethiopia Harau Haro Washed", "Gunung Tilu Washed",
  "Kenya Kangocho Washed", "Kertasari Natural Natural Oxide", "Patuha Red Honey",
  "Puntang Honey", "Puntang Extended Natural", "Saninten Tenjolaya Anaerobic Natural",
  "Saninten Tenjolaya Mossto Natural", "Wanoja Kamojang Extended Natural"
];

const produkLineup = {
  FILTER: [
    "Aceh Bies Mulie Wet Hulled", "Ethiopia Danche Natural", "Ethiopia Harsu Haro Natural",
    "Ethiopia Harau Haro Washed", "Gunung Tilu Washed", "Kenya Kangocho Washed",
    "Kertasari Natural Natural Oxide", "Patuha Red Honey", "Puntang Honey",
    "Puntang Extended Natural", "Saninten Tenjolaya Anaerobic Natural",
    "Saninten Tenjolaya Mossto Natural", "Wanoja Kamojang Extended Natural", "Starburst"
  ],
  ESPRESSO: [
    "Espresso Blend Starburst", "Espresso Blend Orange Cookie", "Espresso Blend The Usual Suspect"
  ]
};

const blendRecipe = {
  "Starburst": {
    "Puntang Extended Natural": 0.35,
    "Puntang Honey": 0.65
  },
  "Espresso Blend Starburst": {
    "Puntang Extended Natural": 0.35,
    "Puntang Honey": 0.65
  },
  "Espresso Blend The Usual Suspect": {
    "Brazil Washed": 0.6,
    "Gunung Tilu Washed": 0.4
  }
};

let stokGreen = {};
let stokRoasted = {};
let stokDisplay = {};
let roastLogs = [];
let salesLogs = [];

// Inisialisasi
[...new Set([...greenBeans, ...Object.keys(blendRecipe)])].forEach(nama => {
  if (greenBeans.includes(nama)) stokGreen[nama] = 20000;
  stokRoasted[nama] = 20000;
  stokDisplay[nama] = 5;
});

// ========== RENDER ============
function renderTabel(id, dataObj, satuan = "") {
  const tbody = document.querySelector(`#${id} tbody`);
  tbody.innerHTML = "";
  for (const [nama, jumlah] of Object.entries(dataObj)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${nama}</td><td>${jumlah} ${satuan}</td>`;
    tbody.appendChild(tr);
  }
}

function renderLog() {
  const tbody = document.querySelector("#tabel-log tbody");
  tbody.innerHTML = "";
  roastLogs.forEach(log => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${log.tanggal}</td><td>${log.nama}</td><td>${log.input}</td><td>${log.output}</td>`;
    tbody.appendChild(tr);
  });
}

function renderPenjualan() {
  const tbody = document.querySelector("#tabel-penjualan tbody");
  tbody.innerHTML = "";
  salesLogs.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.tanggal}</td><td>${s.nama}</td><td>${s.alamat}</td><td>${s.produk}</td><td>${s.jumlah}</td><td>Rp ${s.harga.toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

function renderGrafikTerlaris() {
  const ul = document.querySelector("#grafik-terlaris");
  ul.innerHTML = "";
  const counter = {};
  salesLogs.forEach(s => {
    counter[s.produk] = (counter[s.produk] || 0) + s.jumlah;
  });
  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([nama, total]) => {
    const li = document.createElement("li");
    li.textContent = `${nama}: ${total} pcs`;
    ul.appendChild(li);
  });
}

// ========== FORM ROASTING ============
const formRoasting = document.querySelector("#form-roasting");
const selectGreen = document.querySelector("#greenBean");
greenBeans.forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  selectGreen.appendChild(opt);
});

formRoasting.addEventListener("submit", e => {
  e.preventDefault();
  const nama = selectGreen.value;
  const input = parseInt(document.querySelector("#jumlahRoast").value);
  if (stokGreen[nama] < input) return alert("Stok green bean tidak cukup");
  const output = Math.floor(input * 0.8);
  stokGreen[nama] -= input;
  stokRoasted[nama] += output;
  roastLogs.push({ tanggal: new Date().toLocaleDateString(), nama, input, output });
  renderSemua();
  formRoasting.reset();
});

// ========== FORM DISPLAY ============
const formDisplay = document.querySelector("#form-display");
const selectProduk = document.querySelector("#produkDisplay");
[...produkLineup.FILTER, ...produkLineup.ESPRESSO].forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  selectProduk.appendChild(opt);
});

formDisplay.addEventListener("submit", e => {
  e.preventDefault();
  const nama = selectProduk.value;
  const pcs = parseInt(document.querySelector("#jumlahDisplay").value);
  const gramPerPcs = nama.includes("Espresso") ? 1000 : 200;
  const totalGram = pcs * gramPerPcs;

  if (blendRecipe[nama]) {
    for (const [comp, persen] of Object.entries(blendRecipe[nama])) {
      const butuh = Math.ceil(totalGram * persen);
      if (stokRoasted[comp] < butuh) return alert(`Stok ${comp} tidak cukup`);
    }
    for (const [comp, persen] of Object.entries(blendRecipe[nama])) {
      const butuh = Math.ceil(totalGram * persen);
      stokRoasted[comp] -= butuh;
    }
  } else {
    if (stokRoasted[nama] < totalGram) return alert("Stok roasted tidak cukup");
    stokRoasted[nama] -= totalGram;
  }
  stokDisplay[nama] = (stokDisplay[nama] || 0) + pcs;
  renderSemua();
  formDisplay.reset();
});

// ========== FORM PENJUALAN ============
const formPenjualan = document.querySelector("#form-penjualan");
const selectJual = document.querySelector("#produkJual");
[...produkLineup.FILTER, ...produkLineup.ESPRESSO].forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  selectJual.appendChild(opt);
});

formPenjualan.addEventListener("submit", e => {
  e.preventDefault();
  const nama = selectJual.value;
  const pcs = parseInt(document.querySelector("#jumlahJual").value);
  const pembeli = document.querySelector("#namaPembeli").value;
  const alamat = document.querySelector("#alamatPembeli").value;
  const harga = parseInt(document.querySelector("#hargaJual").value);

  if ((stokDisplay[nama] || 0) < pcs) return alert("Stok display tidak cukup");

  stokDisplay[nama] -= pcs;
  salesLogs.push({
    tanggal: new Date().toLocaleDateString(),
    nama: pembeli,
    alamat: alamat,
    produk: nama,
    jumlah: pcs,
    harga: harga
  });

  renderSemua();
  formPenjualan.reset();
});

function renderSemua() {
  renderTabel("tabel-green", stokGreen, "gram");
  renderTabel("tabel-stok", stokRoasted, "gram");
  renderTabel("tabel-display", stokDisplay, "pcs");
  renderLog();
  renderPenjualan();
  renderGrafikTerlaris();
}

renderSemua();
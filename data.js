const greenBeans = [
  "Aceh Bies Mulie Wet Hulled",
  "Brazil Washed",
  "Ethiopia Danche Natural",
  "Ethiopia Harsu Haro Natural",
  "Ethiopia Harau Haro Washed",
  "Gunung Tilu Washed",
  "Kenya Kangocho Washed",
  "Kertasari Natural Natural Oxide",
  "Patuha Red Honey",
  "Puntang Honey",
  "Puntang Extended Natural",
  "Saninten Tenjolaya Anaerobic Natural",
  "Saninten Tenjolaya Mossto Natural",
  "Wanoja Kamojang Extended Natural"
];

const roastedBeans = [...greenBeans]; // nama sama dengan green bean

// Lineup penjualan
const lineup = {
  // Single Origins - Filter
  "Aceh Bies Mulie Wet Hulled": { size: 200, blend: null },
  "Ethiopia Danche Natural": { size: 200, blend: null },
  "Ethiopia Harsu Haro Natural": { size: 200, blend: null },
  "Ethiopia Harau Haro Washed": { size: 200, blend: null },
  "Gunung Tilu Washed": { size: 200, blend: null },
  "Kenya Kangocho Washed": { size: 200, blend: null },
  "Kertasari Natural Natural Oxide": { size: 200, blend: null },
  "Patuha Red Honey": { size: 200, blend: null },
  "Puntang Honey": { size: 200, blend: null },
  "Puntang Extended Natural": { size: 200, blend: null },
  "Saninten Tenjolaya Anaerobic Natural": { size: 200, blend: null },
  "Saninten Tenjolaya Mossto Natural": { size: 200, blend: null },
  "Wanoja Kamojang Extended Natural": { size: 200, blend: null },

  // Filter Blend
  "Starburst": {
    size: 200,
    blend: {
      "Puntang Extended Natural": 0.35,
      "Puntang Honey": 0.65
    }
  },

  // Espresso Blend
  "Espresso Blend Starburst": {
    size: 1000,
    blend: {
      "Puntang Extended Natural": 0.35,
      "Puntang Honey": 0.65
    }
  },
  "Espresso Blend Orange Cookie": {
    size: 1000,
    blend: {
      "Ethiopia Danche Natural": 0.5,
      "Patuha Red Honey": 0.5
    }
  },
  "Espresso Blend The Usual Suspect": {
    size: 1000,
    blend: {
      "Brazil Washed": 0.6,
      "Gunung Tilu Washed": 0.4
    }
  }
};
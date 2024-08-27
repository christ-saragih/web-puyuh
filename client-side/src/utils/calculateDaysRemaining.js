// src/utils/dateUtils.js

export const calculateDaysRemaining = (tanggalPembukaan, tanggalBerakhir) => {
  const pembukaanDate = new Date(tanggalPembukaan);
  const berakhirDate = new Date(tanggalBerakhir);

  // Menghitung selisih waktu dalam milidetik
  const timeDiff = berakhirDate - pembukaanDate;

  // Mengonversi milidetik ke hari
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return days;
};

export const isValidIndonesianPhoneNumber = (phoneNumber) => {
  // Regex untuk nomor telepon Indonesia
  // Menerima format: +628xxxxxxxxxx, 08xxxxxxxxxx, atau 628xxxxxxxxxx
  // Minimal 10 digit, maksimal 14 digit (termasuk kode negara)
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{8,11}$/;
  return phoneRegex.test(phoneNumber);
};

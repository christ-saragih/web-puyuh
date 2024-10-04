import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";

const VerticalTabProfil = ({ getInvestors, investors }) => {
    const [activeTab, setActiveTab] = useState("Biodata");
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(["organisasi", "individu"]);
    const genderDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const [namaLengkap, setNamaLengkap] = useState("");
    const [jk, setJk] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState(null);
    const [noHp, setNoHp] = useState("");
    const [kategoriInvestor, setKategoriInvestor] = useState("");
    // alamat
    const [alamat, setAlamat] = useState("");
    const [provinsi, setProvinsi] = useState("");
    const [kota, setKota] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [kelurahan, setKelurahan] = useState("");
    const [kodePos, setKodePos] = useState("");
    // identitas
    const [formDataIdentitas, setFormDataIdentitas] = useState({
        no_ktp: "",
        foto_ktp: null,
        no_npwp: "",
        foto_npwp: null,
        selfie_ktp: null,
    });
    const [previews, setPreviews] = useState({
        foto_ktp: null,
        foto_npwp: null,
        selfie_ktp: null,
    });
    const [noKtp, setNoKtp] = useState("");
    const [fotoKtp, setFotoKtp] = useState(null);
    const [fotoNpwp, setFotoNpwp] = useState(null);
    const [selfieKtp, setSelfieKtp] = useState(null);
    const [noNpwp, setNoNpwp] = useState("");
    const [fotoKtpPreview, setFotoKtpPreview] = useState(null);
    const [fotoNpwpPreview, setFotoNpwpPreview] = useState(null);
    const [selfieKtpPreview, setSelfieKtpPreview] = useState(null);
    // pendukung
    const [formDataPendukung, setFormDataPendukung] = useState({
        latar_pendidikan: "",
        sumber_penghasilan: "",
        jumlah_penghasilan: "",
        bidang_usaha: "",
        tujuan_investasi: "",
        no_sid: "",
        tanggal_pembuatan_sid: "",
    });
    const [latarPendidikan, setLatarPendidikan] = useState("");
    const [sumberPenghasilan, setSumberPenghasilan] = useState("");
    const [jumlahPenghasilan, setJumlahPenghasilan] = useState("");
    const [bidangUsaha, setBidangUsaha] = useState("");
    const [tujuanInvestasi, setTujuanInvestasi] = useState("");
    const [noSid, setNoSid] = useState("");
    const [tanggalPembuatanSid, setTanggalPembuatanSid] = useState("");
    const navigate = useNavigate();
    // 
    const [errors, setErrors] = useState({});
    const [errorsAlamat, setErrorsAlamat] = useState({});
    const [errorsIdentitas, setErrorsIdentitas] = useState({});
    const [errorsDataPendukung, setErrorsDataPendukung] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        console.log("Selected category:", selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        console.log("Categories:", categories);
    }, [categories]);

    useEffect(() => {
        console.log("formDataIdentitas updated:", formDataIdentitas);
    }, [formDataIdentitas]);

    useEffect(() => {
        if (investors && investors.investorBiodata && investors.kategori_investor) {
            const { nama_lengkap, jk, tempat_lahir, tanggal_lahir, no_hp } = investors.investorBiodata;

            // Update state based on available data
            if (nama_lengkap) setNamaLengkap(nama_lengkap);
            if (jk) setJk(jk);
            if (tempat_lahir) setTempatLahir(tempat_lahir);
            if (tanggal_lahir) setTanggalLahir(tanggal_lahir);
            if (no_hp) setNoHp(no_hp);

            const {kategori_investor} = investors.kategori_investor;

            if (kategori_investor) setSelectedCategory(kategori_investor);
        }
    }, [investors]);

    // useEffect(() => {
    //     if (investors?.kategori_investor) {
    //         const {kategori_investor} = investors.kategori_investor;

    //         if (kategori_investor) setCategories(kategori_investor);
    // }
    // }, [investors]);

    useEffect(() => {
        if (investors?.investorAlamat) {
            const { alamat, provinsi, kota, kecamatan, kelurahan, kode_pos } = investors.investorAlamat;

            // Update state based on available data
            if (alamat) setAlamat(alamat);
            if (provinsi) setProvinsi(provinsi);
            if (kota) setKota(kota);
            if (kecamatan) setKecamatan(kecamatan);
            if (kelurahan) setKelurahan(kelurahan);
            if (kode_pos) setKodePos(kode_pos);
        }
    }, [investors]);

    useEffect(() => {
        if (investors?.investorIdentitas) {
            console.log("Investor data received:", investors.investorIdentitas);
            const { no_ktp, foto_ktp, no_npwp, foto_npwp, selfie_ktp } = investors.investorIdentitas;
            setFormDataIdentitas(prevState => ({
                ...prevState,
                no_ktp: no_ktp || "",
                no_npwp: no_npwp || "",
            }));

            // Set preview images if available
            setPreviews({
                foto_ktp: foto_ktp ? `http://localhost:3000/api/identitas-investor/image/${foto_ktp}` : null,
                foto_npwp: foto_npwp ? `http://localhost:3000/api/identitas-investor/image/${foto_npwp}` : null,
                selfie_ktp: selfie_ktp ? `http://localhost:3000/api/identitas-investor/image/${selfie_ktp}` : null,
            });
        }
    }, [investors]);

    useEffect(() => {
        if (investors?.investorDataPendukung) {
            const { latar_pendidikan, sumber_penghasilan, jumlah_penghasilan, bidang_usaha, tujuan_investasi, no_sid, tanggal_pembuatan_sid } = investors.investorDataPendukung;

            // Update state based on available data
            if (latar_pendidikan) setLatarPendidikan(latar_pendidikan);
            if (sumber_penghasilan) setSumberPenghasilan(sumber_penghasilan);
            if (jumlah_penghasilan) setJumlahPenghasilan(jumlah_penghasilan);
            if (bidang_usaha) setBidangUsaha(bidang_usaha);
            if (tujuan_investasi) setTujuanInvestasi(tujuan_investasi);
            if (no_sid) setNoSid(no_sid);
            if (tanggal_pembuatan_sid) setTanggalPembuatanSid(tanggal_pembuatan_sid);
        }
    }, [investors]);
    

    const handleGenderDropdownToggle = () => {
        setIsGenderDropdownOpen(!isGenderDropdownOpen);
        if (isGenderDropdownOpen) {
            document.addEventListener("click", handleGenderDropdownClose);
        } else {
            document.removeEventListener("click", handleGenderDropdownClose);
        }
    };

    const handleJkSelect = (jk) => {
        setJk(jk);
        setIsGenderDropdownOpen(false);
    };

    const handleGenderDropdownClose = (event) => {
        if (!genderDropdownRef.current.contains(event.target)) {
            setIsGenderDropdownOpen(false);
            document.removeEventListener("click", handleGenderDropdownClose);
        }
    };

    const handleCategoryDropdownToggle = () => {
        setIsCategoryDropdownOpen((prevState) => !prevState);
    };

    const handleCategorySelect = (category) => {
        console.log(`Category selected: ${category}`);
        setSelectedCategory(category);
        setKategoriInvestor(category);
        setIsCategoryDropdownOpen(false);
    };

    useEffect(() => {
        if (investors && investors.kategori_investor) {
            setCategories(["organisasi", "individu"]); // Misalnya, jika ini adalah pilihan yang mungkin
            console.log("Categories set:", ["organisasi", "individu"]);

            // Set kategori yang dipilih berdasarkan data
            if (
                ["organisasi", "individu"].includes(investors.kategori_investor)
            ) {
                setSelectedCategory(investors.kategori_investor);
                console.log(
                    "Selected category set:",
                    investors.kategori_investor
                );
            } else {
                console.error(
                    "Invalid kategori_investor:",
                    investors.kategori_investor
                );
                // Anda bisa set default category jika diperlukan
                setSelectedCategory("Pilih Kategori");
            }
        }
    }, [investors]);

    const handleNamaLengkapChange = (e) => {
        setNamaLengkap(e.target.value);
    };

    const handleTempatLahirChange = (e) => {
        setTempatLahir(e.target.value);
    };

    const handleNoHpChange = (e) => {
        setNoHp(e.target.value);
    };

    const handleChangeIdentitas = (e) => {
        const { name, value, files } = e.target;
        
        if (files && files[0]) {
            const file = files[0];
            setFormDataIdentitas(prev => ({ ...prev, [name]: file }));
            
            const reader = new FileReader();
            reader.onload = () => {
                setPreviews(prev => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(file);
    
            // Validasi file
            const fileErrors = validateFile(name, file);
            setErrorsIdentitas(prev => ({ ...prev, [name]: fileErrors[name] || null }));
        } else {
            setFormDataIdentitas(prev => ({ ...prev, [name]: value }));
    
            // Validasi input teks
            let error = null;
            if (!value.trim()) {
                error = `${name.replace('_', ' ').toUpperCase()} harus diisi`;
            }
            setErrorsIdentitas(prev => ({ ...prev, [name]: error }));
        }
    
        // Jalankan validasi keseluruhan setelah state diperbarui
        setTimeout(() => {
            validateIdentitas();
        }, 0);
    };

    const handleChangePendukung = (e) => {
        const { name, value } = e.target;
        setFormDataPendukung({ ...formDataPendukung, [name]: value });
    };

    const validateBiodata = () => {
        let newErrors = {};
        if (!namaLengkap.trim()) newErrors.namaLengkap = "Nama Lengkap harus diisi";
        if (!jk) newErrors.jk = "Jenis Kelamin harus dipilih";
        if (!tempatLahir.trim()) newErrors.tempatLahir = "Tempat Lahir harus diisi";
        if (!tanggalLahir) newErrors.tanggalLahir = "Tanggal Lahir harus diisi";
        if (!noHp.trim()) newErrors.noHp = "Nomor Handphone harus diisi";
        if (selectedCategory === "Pilih Kategori") newErrors.kategoriInvestor = "Kategori Investor harus dipilih";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAlamat = () => {
        let newErrors = {};
        if (!alamat.trim()) newErrors.alamat = "Alamat harus diisi";
        if (!provinsi.trim()) newErrors.provinsi = "Provinsi harus diisi";
        if (!kota.trim()) newErrors.kota = "Kota/Kabupaten harus diisi";
        if (!kecamatan.trim()) newErrors.kecamatan = "Kecamatan harus diisi";
        if (!kelurahan.trim()) newErrors.kelurahan = "Kelurahan harus diisi";
        if (!kodePos.trim()) newErrors.kodePos = "Kode Pos harus diisi";
        
        setErrorsAlamat(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateFile = (fieldName, file) => {
        if (!file) return { [fieldName]: `${fieldName.replace('_', ' ').toUpperCase()} harus diunggah` };
    
        const errors = {};
        
        // Validasi ukuran file (contoh: maksimum 5MB)
        if (file.size > 5 * 1024 * 1024) {
            errors[fieldName] = "Ukuran file tidak boleh lebih dari 5MB";
        }
        
        // Validasi tipe file
        const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            errors[fieldName] = "Tipe file tidak didukung. Gunakan SVG, PNG, JPG, atau GIF";
        }
    
        return errors;
    };

    const validateIdentitas = () => {
        let newErrors = {};
    
        // Validasi input teks
        if (!formDataIdentitas.no_ktp?.trim()) newErrors.no_ktp = "Nomor KTP harus diisi";
        if (!formDataIdentitas.no_npwp?.trim()) newErrors.no_npwp = "Nomor NPWP harus diisi";
    
        // Validasi file
        ['foto_ktp', 'foto_npwp', 'selfie_ktp'].forEach(fieldName => {
            if (!formDataIdentitas[fieldName] && !previews[fieldName]) {
                newErrors[fieldName] = `${fieldName.replace('_', ' ').toUpperCase()} harus diunggah`;
            } else if (formDataIdentitas[fieldName]) {
                const fileErrors = validateFile(fieldName, formDataIdentitas[fieldName]);
                if (Object.keys(fileErrors).length > 0) {
                    newErrors = { ...newErrors, ...fileErrors };
                }
            }
        });
    
        setErrorsIdentitas(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDataPendukung = () => {
        let newErrors = {};
        if (!latarPendidikan.trim()) newErrors.latarPendidikan = "Latar pendidikan harus diisi";
        if (!sumberPenghasilan.trim()) newErrors.sumberPenghasilan = "Sumber penghasilan harus diisi";
        if (!jumlahPenghasilan.trim()) newErrors.jumlahPenghasilan = "Jumlah penghasilan harus diisi";
        if (!bidangUsaha.trim()) newErrors.bidangUsaha = "Bidang usaha harus diisi";
        if (!tujuanInvestasi.trim()) newErrors.tujuanInvestasi = "Tujuan investasi harus diisi";
        if (!noSid.trim()) newErrors.noSid = "Nomor SID harus diisi";
        if (!tanggalPembuatanSid.trim()) newErrors.tanggalPembuatanSid = "Tanggal pembuatan SID harus diisi";
        
        setErrorsDataPendukung(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showNotification = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
    };
    

    const handleSubmitBiodata = async (e) => {
        e.preventDefault();
        if (validateBiodata()) {
            try {
                const dataBiodataToSend = {
                    nama_lengkap: namaLengkap,
                    jk: jk,
                    tempat_lahir: tempatLahir,
                    tanggal_lahir: tanggalLahir,
                    no_hp: noHp,
                    // kategori_investor: kategoriInvestor,
                    kategori_investor: selectedCategory,
                };
                console.log(dataBiodataToSend);

                const response = await apiInvestor.post(
                    `/biodata-investor`,
                    dataBiodataToSend
                );
                console.log(response.data);
                showNotification("Data berhasil disimpan!");
            } catch (error) {
                console.error("Error submitting data:", error);
                console.error("Error response:", error.response);
                showNotification("Gagal menyimpan data. Silakan coba lagi.");
            }
        } else {
            console.log("Form validation failed");
            showNotification("Gagal menyimpan data. Periksa kembali isian Anda.");
        }
    };

    const handleSubmitAlamat = async (e) => {
        e.preventDefault();
        if (validateAlamat()) {
            try {
                const dataAlamatToSend = {
                    alamat: alamat,
                    provinsi: provinsi,
                    kota: kota,
                    kecamatan: kecamatan,
                    kelurahan: kelurahan,
                    kode_pos: kodePos,
                };
                console.log(dataAlamatToSend);
    
                const response = await apiInvestor.post(
                    `/alamat-investor`,
                    dataAlamatToSend
                );
                console.log(response.data);
                showNotification("Data alamat berhasil disimpan!");
            } catch (error) {
                console.error("Error submitting data:", error);
                console.error("Error response:", error.response);
                showNotification("Gagal menyimpan data alamat. Silakan coba lagi.");
            }
        } else {
            console.log("Form validation failed");
            showNotification("Gagal menyimpan data alamat. Periksa kembali isian Anda.");
        }
    };

    const handleSubmitIdentitas = async (e) => {
        e.preventDefault();
        if (validateIdentitas()) {
            try {
                const formData = new FormData();
                for (const key in formDataIdentitas) {
                    if (formDataIdentitas[key] instanceof File) {
                        formData.append(key, formDataIdentitas[key]);
                    } else if (formDataIdentitas[key] !== null) {
                        formData.append(key, formDataIdentitas[key]);
                    }
                }

                const response = await apiInvestor.post('/identitas-investor', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                console.log("Response:", response.data);
                showNotification("Data identitas berhasil disimpan!");
                
                if (typeof getInvestors === 'function') {
                    getInvestors();
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                showNotification("Gagal menyimpan data identitas. Periksa kembali isian Anda.");
            }
        } else {
            showNotification("Gagal menyimpan data identitas. Periksa kembali isian Anda.");
        }
    };

    const handleSubmitPendukung = async (e) => {
        e.preventDefault();
        if (validateDataPendukung()) {
        try{
            const dataPendukungToSend = {
                latar_pendidikan: latarPendidikan,
                sumber_penghasilan: sumberPenghasilan,
                jumlah_penghasilan: jumlahPenghasilan,
                bidang_usaha: bidangUsaha,
                tujuan_investasi: tujuanInvestasi,
                no_sid: noSid,
                tanggal_pembuatan_sid: tanggalPembuatanSid,
            };
            console.log(dataPendukungToSend);

            const response = await apiInvestor.post(
                `/data-pendukung-investor`,
                dataPendukungToSend
            );
            console.log(response.data);
            showNotification("Data pendukung berhasil disimpan!");
        }catch (error) {
            console.error("Error submitting data:", error);
            console.error("Error response:", error.response);
        }
        } else {
            showNotification("Gagal menyimpan data pendukung. Periksa kembali isian Anda.");
        }
    };

    const renderImagePreview = (fieldName, label) => (
        <div className="mb-5">
            <label
                htmlFor={`${fieldName}-input`}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor={`${fieldName}-input`}
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {previews[fieldName] ? (
                            <img
                                src={previews[fieldName]}
                                alt="Pratinjau"
                                className="max-h-40 mb-2"
                            />
                        ) : (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Klik untuk mengunggah</span> atau seret dan jatuhkan
                                </p>
                                <p className="text-xs text-gray-500">
                                    SVG, PNG, JPG atau GIF (MAKS. 800x400px)
                                </p>
                            </>
                        )}
                    </div>
                    <input
                        id={`${fieldName}-input`}
                        name={fieldName}
                        onChange={handleChangeIdentitas}
                        type="file"
                        className="hidden"
                    />
                </label>
            </div>
            {errorsIdentitas[fieldName] && <p className="text-red-500 text-xs mt-1">{errorsIdentitas[fieldName]}</p>}
        </div>
    );
    

    const renderTabContent = () => {
        switch (activeTab) {
            case "Biodata":
                return (
                    <div>
                         {showPopup && (
                            <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 transition-opacity duration-300">
                                {popupMessage}
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Biodata
                        </h3>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder={"Nama Lengkap"}
                                value={namaLengkap}
                                onChange={handleNamaLengkapChange}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errors.namaLengkap ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.namaLengkap && <p className="text-red-500 text-xs mt-1">{errors.namaLengkap}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="gender-dropdown"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Jenis Kelamin
                            </label>
                            <button
                                id="gender-dropdown"
                                onClick={handleGenderDropdownToggle}
                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${
                                    isGenderDropdownOpen ? "border-black" : ""
                                } ${errors.jk ? 'border-red-500' : ''}`}
                                type="button"
                            >
                                <span className="flex-1">{jk}</span>
                                <svg
                                    className="w-2.5 h-2.5 ml-auto"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {errors.jk && <p className="text-red-500 text-xs mt-1">{errors.jk}</p>}
                            {isGenderDropdownOpen && (
                                <div
                                    ref={genderDropdownRef}
                                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleJkSelect("pria")
                                                }
                                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${
                                                    isGenderDropdownOpen
                                                        ? "border-black"
                                                        : ""
                                                }`}
                                                type="button"
                                            >
                                                Pria
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleJkSelect("wanita")
                                                }
                                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${
                                                    isGenderDropdownOpen
                                                        ? "border-black"
                                                        : ""
                                                }`}
                                                type="button"
                                            >
                                                Wanita
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Tempat Lahir
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder={
                                    "Tempar Lahir"
                                }
                                value={tempatLahir}
                                onChange={handleTempatLahirChange}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errors.tempatLahir ? 'border-red-500' : ''
                                }`}
                            />
                             {errors.tempatLahir && <p className="text-red-500 text-xs mt-1">{errors.tempatLahir}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="tanggal-lahir-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                placeholder={
                                    investors?.investorBiodata?.tanggal_lahir
                                }
                                value={tanggalLahir}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errors.tanggalLahir ? 'border-red-500' : ''
                                }`}
                                onChange={(e) =>
                                    setTanggalLahir(e.target.value)
                                }
                            />
                            {errors.tanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tanggalLahir}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nomor Handphone
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder={investors?.investorBiodata?.no_hp}
                                value={noHp}
                                onChange={handleNoHpChange}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errors.noHp ? 'border-red-500' : ''
                                }`}
                            />
                             {errors.noHp && <p className="text-red-500 text-xs mt-1">{errors.noHp}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="category-dropdown"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kategori Investor
                            </label>
                            <button
                                id="category-dropdown"
                                onClick={handleCategoryDropdownToggle}
                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${
                                    isCategoryDropdownOpen ? "border-black" : ""
                                } ${errors.kategoriInvestor ? 'border-red-500' : ''}`}
                                type="button"
                            >
                                <span className="flex-1">
                                    {selectedCategory}
                                </span>
                                <svg
                                    className="w-2.5 h-2.5 ml-auto"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {errors.kategoriInvestor && <p className="text-red-500 text-xs mt-1">{errors.kategoriInvestor}</p>}
                            {isCategoryDropdownOpen && (
                                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <button
                                                    onClick={() =>
                                                        handleCategorySelect(
                                                            category
                                                        )
                                                    }
                                                    className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmitBiodata}
                                className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                );

            case "Alamat":
                return (
                    <div>
                        {showPopup && (
                            <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 transition-opacity duration-300">
                                {popupMessage}
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Alamat
                        </h3>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Alamat Sesuai KTP
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Alamat"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.alamat ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.alamat && <p className="text-red-500 text-xs mt-1">{errorsAlamat.alamat}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Provinsi
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Provinsi"
                                value={provinsi}
                                onChange={(e) => setProvinsi(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.provinsi ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.provinsi && <p className="text-red-500 text-xs mt-1">{errorsAlamat.provinsi}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kota/Kabupaten
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Kota/Kabupaten"
                                value={kota}
                                onChange={(e) => setKota(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.kota ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.kota && <p className="text-red-500 text-xs mt-1">{errorsAlamat.kota}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kecamatan
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Kecamatan"
                                value={kecamatan}
                                onChange={(e) => setKecamatan(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.kecamatan ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.kecamatan && <p className="text-red-500 text-xs mt-1">{errorsAlamat.kecamatan}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kelurahan
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Kelurahan"
                                value={kelurahan}
                                onChange={(e) => setKelurahan(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.kelurahan ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.kelurahan && <p className="text-red-500 text-xs mt-1">{errorsAlamat.kelurahan}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Kode Pos
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                placeholder="Kode Pos"
                                value={kodePos}
                                onChange={(e) => setKodePos(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsAlamat.kodePos ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsAlamat.kodePos && <p className="text-red-500 text-xs mt-1">{errorsAlamat.kodePos}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmitAlamat}
                                className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                );
            case "Identitas":
                return (
                    <div>
                        {showPopup && (
                            <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 transition-opacity duration-300">
                                {popupMessage}
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Identitas
                        </h3>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nomor KTP
                            </label>
                            <input
                                type="text"
                                id="nomor-ktp-input"
                                name="no_ktp"
                                placeholder="Nomor KTP"
                                value={formDataIdentitas.no_ktp}
                                onChange={handleChangeIdentitas}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsIdentitas.noKtp ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsIdentitas.noKtp && <p className="text-red-500 text-xs mt-1">{errorsIdentitas.noKtp}</p>}
                        </div>
                        {renderImagePreview("foto_ktp", "Foto KTP")}
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nomor NPWP
                            </label>
                            <input
                                type="text"
                                id="nomor-npwp-input"
                                name="no_npwp"
                                placeholder="Nomor NPWP"
                                value={formDataIdentitas.no_npwp}
                                onChange={handleChangeIdentitas}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsIdentitas.noNpwp ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsIdentitas.noNpwp && <p className="text-red-500 text-xs mt-1">{errorsIdentitas.noNpwp}</p>}
                        </div>
                        {renderImagePreview("foto_npwp", "Foto NPWP")}
                        {renderImagePreview("selfie_ktp", "Foto Selfie dengan KTP")}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmitIdentitas}
                                className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                );
            case "Pendukung":
                return (
                    <div>
                        {showPopup && (
                            <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 transition-opacity duration-300">
                                {popupMessage}
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Pendukung
                        </h3>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Latar Belakang Pendidikan
                            </label>
                            <input
                                type="text"
                                id="latar-pendidikan-input"
                                name="latar_pendidikan"
                                placeholder="Latar Pendidikan"
                                value={latarPendidikan}
                                onChange={(e) => setLatarPendidikan(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.latarPendidikan ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.latarPendidikan && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.latarPendidikan}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Sumber Penghasilan
                            </label>
                            <input
                                type="text"
                                id="sumber-penghasilan-input"
                                name="sumber_penghasilan"
                                placeholder="Sumber Penghasilan"
                                value={sumberPenghasilan}
                                onChange={(e) => setSumberPenghasilan(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.sumberPenghasilan ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.sumberPenghasilan && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.sumberPenghasilan}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Jumlah Penghasilan
                            </label>
                            <input
                                type="text"
                                id="jumlah-penghasilan-input"
                                name="jumlah_penghasilan"
                                placeholder= "Jumlah Penghasilan"
                                value={jumlahPenghasilan}
                                onChange={(e) => setJumlahPenghasilan(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.jumlahPenghasilan ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.jumlahPenghasilan && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.jumlahPenghasilan}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Bidang Usaha
                            </label>
                            <input
                                type="text"
                                id="bidang-usaha-input"
                                name="bidang_usaha"
                                placeholder= "Bidang Usaha"
                                value={bidangUsaha}
                                onChange={(e) => setBidangUsaha(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.bidangUsaha ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.bidangUsaha && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.bidangUsaha}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Tujuan Investasi
                            </label>
                            <input
                                type="text"
                                id="tujuan-investasi-input"
                                name="tujuan_investasi"
                                placeholder= "Tujuan Investasi"
                                value={tujuanInvestasi}
                                onChange={(e) => setTujuanInvestasi(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.tujuanInvestasi ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.tujuanInvestasi && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.tujuanInvestasi}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Nomor SID
                            </label>
                            <input
                                type="text"
                                id="no-sid-input"
                                name="no_sid"
                                placeholder= "Nomor SID"
                                value={noSid}
                                onChange={(e) => setNoSid(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.noSid ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.noSid && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.noSid}</p>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Tanggal Pembuatan SID
                            </label>
                            <input
                                type="date"
                                id="tanggal-pembuatan-sid-input"
                                name="tanggal_pembuatan_sid"
                                value= {tanggalPembuatanSid}
                                onChange={(e) => setTanggalPembuatanSid(e.target.value)}
                                className={`bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 ${
                                    errorsDataPendukung.tanggalPembuatanSid ? 'border-red-500' : ''
                                }`}
                            />
                            {errorsDataPendukung.tanggalPembuatanSid && <p className="text-red-500 text-xs mt-1">{errorsDataPendukung.tanggalPembuatanSid}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmitPendukung}
                                className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="md:flex m-7">
            <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <button
                        onClick={() => setActiveTab("Biodata")}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "Biodata"
                                ? "text-white bg-[#572618]"
                                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                        aria-current={
                            activeTab === "Biodata" ? "page" : undefined
                        }
                    >
                        Biodata
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab("Alamat")}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "Alamat"
                                ? "text-white bg-[#572618]"
                                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                        aria-current={
                            activeTab === "Alamat" ? "page" : undefined
                        }
                    >
                        Alamat
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab("Identitas")}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "Identitas"
                                ? "text-white bg-[#572618]"
                                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                        aria-current={
                            activeTab === "Identitas" ? "page" : undefined
                        }
                    >
                        Identitas
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab("Pendukung")}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === "Pendukung"
                                ? "text-white bg-[#572618]"
                                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                        aria-current={
                            activeTab === "Pendukung" ? "page" : undefined
                        }
                    >
                        Pendukung
                    </button>
                </li>
            </ul>
            <div className="p-8 bg-white text-gray-900 rounded-lg w-full">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default VerticalTabProfil;

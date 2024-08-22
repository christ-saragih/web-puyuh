import React, { useState, useEffect, useRef } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const VerticalTabProfil = ({investors, investorbiodata}) => {
    const [activeTab, setActiveTab] = useState('Biodata');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    // const [selectedGender, setSelectedGender] = useState('Pilih Kelamin');
    const [selectedCategory, setSelectedCategory] = useState('Pilih Kategori');
    const [categories, setCategories] = useState(['organisasi', 'individu']);
    const genderDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const [namaLengkap, setNamaLengkap] = useState('');
    const [jk, setJk] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState(null);
    const [noHp, setNoHp] = useState('');
    const [kategoriInvestor, setKategoriInvestor] = useState('');
    // alamat
    const [alamat, setAlamat] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kodePos, setKodePos] = useState('');
    // identitas
    const [formDataIdentitas, setFormDataIdentitas] = useState({
        no_ktp: "",
        foto_ktp: null,
        no_npwp: "",
        foto_npwp: null,
        selfie_ktp: null,
      });
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
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Selected category:', selectedCategory);
    }, [selectedCategory]);
    
    useEffect(() => {
        console.log('Categories:', categories);
    }, [categories]);

    useEffect(() => {
        if (token) {
          handleSubmitBiodata();
        }
      }, [token]);

      useEffect(() => {
        refreshToken();
      }, []);

    const refreshToken = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/investor/refresh-token', {}, { withCredentials: true });
          setToken(response.data.accessToken);
          const decoded = jwtDecode(response.data.accessToken);
          setEmail(decoded.email);
          setExpire(decoded.exp);
          console.log("Token refreshed:", response.data.accessToken);
        } catch (error) {
          if (error.response) {
            navigate("/masuk");
          }
        }
      }

    const handleGenderDropdownToggle = () => {
        setIsGenderDropdownOpen(!isGenderDropdownOpen);
        if (isGenderDropdownOpen) {
          document.addEventListener('click', handleGenderDropdownClose);
        } else {
          document.removeEventListener('click', handleGenderDropdownClose);
        }
      };

      const handleJkSelect = (jk) => {
        setJk(jk);
        setIsGenderDropdownOpen(false);
      };

    const handleGenderDropdownClose = (event) => {
    if (!genderDropdownRef.current.contains(event.target)) {
        setIsGenderDropdownOpen(false);
        document.removeEventListener('click', handleGenderDropdownClose);
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
            setCategories(['organisasi', 'individu']); // Misalnya, jika ini adalah pilihan yang mungkin
            console.log('Categories set:', ['organisasi', 'individu']);

            // Set kategori yang dipilih berdasarkan data
            if (['organisasi', 'individu'].includes(investors.kategori_investor)) {
                setSelectedCategory(investors.kategori_investor);
                console.log('Selected category set:', investors.kategori_investor);
            } else {
                console.error('Invalid kategori_investor:', investors.kategori_investor);
                // Anda bisa set default category jika diperlukan
                setSelectedCategory('Pilih Kategori');
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
    

      const axiosJWT = axios.create();

      useEffect(() => {
        const storedDataBiodata = localStorage.getItem('formDataBiodata');
        if (storedDataBiodata) {
          const data = JSON.parse(storedDataBiodata);
          setNamaLengkap(data.nama_lengkap);
          setJk(data.jk);
          setTempatLahir(data.tempat_lahir);
          setTanggalLahir(data.tanggal_lahir);
          setNoHp(data.no_hp);
        }
      }, []);

      useEffect(() => {
        const storedDataAlamat = localStorage.getItem('formDataAlamat');
        if (storedDataAlamat) {
          const data = JSON.parse(storedDataAlamat);
          setAlamat(data.alamat);
          setProvinsi(data.provinsi);
          setKota(data.kota);
          setKecamatan(data.kecamatan);
          setKelurahan(data.kelurahan);
          setKodePos(data.kode_pos);
        }
      }, []);

      useEffect(() => {
        const savedFormDataIdentitas = localStorage.getItem('formDataIdentitas');
        if (savedFormDataIdentitas) {
          setFormDataIdentitas(JSON.parse(savedFormDataIdentitas));
        }
      }, []);

      useEffect(() => {
        const savedFormDataPendukung = localStorage.getItem('formDataPendukung');
        if (savedFormDataPendukung) {
          setFormDataPendukung(JSON.parse(savedFormDataPendukung));
        }
      }, []);

      const handleChangeIdentitas = (e) => {
        const { name, value, files } = e.target;
      
        if (files && files[0]) {
          setFormDataIdentitas({ ...formDataIdentitas, [name]: files[0] });
      
          const reader = new FileReader();
          reader.onload = () => {
            if (name === 'foto_ktp') {
              setFotoKtpPreview(reader.result);
            } else if (name === 'foto_npwp') {
              setFotoNpwpPreview(reader.result);
            } else if (name === 'selfie_ktp') {
              setSelfieKtpPreview(reader.result);
            }
          };
          reader.readAsDataURL(files[0]);
        } else {
          setFormDataIdentitas({ ...formDataIdentitas, [name]: value });
        }
      };

      const handleChangePendukung = (e) => {
        const { name, value } = e.target;
        setFormDataPendukung({ ...formDataPendukung, [name]: value });
      };
      

      const handleSubmitBiodata = async (e) => {
        e.preventDefault();
        try {
          const dataBiodataToSend = {
            nama_lengkap: namaLengkap,
            jk: jk,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            no_hp: noHp,
            kategori_investor: kategoriInvestor,
          };
          console.log(dataBiodataToSend);
      
          const response = await axiosJWT.post(`http://localhost:3000/api/biodata-investor`, dataBiodataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
      
          // Store form data in local storage
          localStorage.setItem('formDataBiodata', JSON.stringify(dataBiodataToSend));
      
          // Handle success response
        } catch (error) {
          console.error("Error submitting data:", error);
          console.error("Error response:", error.response);
        }
      };

      const handleSubmitAlamat = async (e) => {
        e.preventDefault();
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
      
          const response = await axiosJWT.post(`http://localhost:3000/api/alamat-investor`, dataAlamatToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
      
          // Store form data in local storage
          localStorage.setItem('formDataAlamat', JSON.stringify(dataAlamatToSend));
      
          // Handle success response
        } catch (error) {
          console.error("Error submitting data:", error);
          console.error("Error response:", error.response);
        }
      };

      const handleSubmitIdentitas = async (e) => {
        e.preventDefault();
       
        console.log(formDataIdentitas);
        
        const form = new FormData();
        form.append("no_ktp", formDataIdentitas.no_ktp);
        form.append("foto_ktp", formDataIdentitas.foto_ktp);
        form.append("no_npwp", formDataIdentitas.no_npwp);
        form.append("foto_npwp", formDataIdentitas.foto_npwp);
        form.append("selfie_ktp", formDataIdentitas.selfie_ktp);
      
        // console.log(form);
        

        try {
          const { data } = await axiosJWT.post(
            "http://localhost:3000/api/identitas-investor",
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Identitas Investor data:", data);
      
          // Simpan data form di local storage
        localStorage.setItem('formDataIdentitas', JSON.stringify({
        no_ktp: formDataIdentitas.no_ktp,
        no_npwp: formDataIdentitas.no_npwp,
        foto_ktp: formDataIdentitas.foto_ktp,
        foto_npwp: formDataIdentitas.foto_npwp,
        selfie_ktp: formDataIdentitas.selfie_ktp
      }));
      
          // Handle success response
        } catch (err) {
          console.error("Error submitting data:", err.response ? err.response.data : err.message);
        }
      };

      const handleSubmitPendukung = async (e) => {
        e.preventDefault();

        console.log(formDataPendukung);
        
      
        const form = new FormData();
        form.append("latar_pendidikan", formDataPendukung.latar_pendidikan);
        form.append("sumber_penghasilan", formDataPendukung.sumber_penghasilan);
        form.append("jumlah_penghasilan", formDataPendukung.jumlah_penghasilan);
        form.append("bidang_usaha", formDataPendukung.bidang_usaha);
        form.append("tujuan_investasi", formDataPendukung.tujuan_investasi);
        form.append("no_sid", formDataPendukung.no_sid);
        form.append("tanggal_pembuatan_sid", formDataPendukung.tanggal_pembuatan_sid);
      
        // console.log(form);
        

        try {
            const response = await axiosJWT.post(
              "http://localhost:3000/api/data-pendukung-investor",
              form,
            //   {
            //     latar_pendidikan: formDataPendukung.latar_pendidikan,
            //     sumber_penghasilan: formDataPendukung.sumber_penghasilan,
            //     jumlah_penghasilan: formDataPendukung.jumlah_penghasilan,
            //     bidang_usaha: formDataPendukung.bidang_usaha,
            //     tujuan_investasi: formDataPendukung.tujuan_investasi,
            //     no_sid: formDataPendukung.no_sid,
            //     tanggal_pembuatan_sid: formDataPendukung.tanggal_pembuatan_sid
            //   },
              {
                headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

              // Simpan data form di local storage
            localStorage.setItem('formDataPendukung', JSON.stringify({
                latar_pendidikan: formDataPendukung.latar_pendidikan,
                sumber_penghasilan: formDataPendukung.sumber_penghasilan,
                jumlah_penghasilan: formDataPendukung.jumlah_penghasilan,
                bidang_usaha: formDataPendukung.bidang_usaha,
                tujuan_investasi: formDataPendukung.tujuan_investasi,
                no_sid: formDataPendukung.no_sid,
                tanggal_pembuatan_sid: formDataPendukung.tanggal_pembuatan_sid

          }));
        
            console.log("Response:", response.data);
          } catch (err) {
            console.error("Error submitting data:", err.response ? err.response.data : err.message);
          }
      };



    const renderTabContent = () => {
        switch (activeTab) {
            case 'Biodata':
                    return (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Biodata</h3>
                            <div className="mb-5">
                                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                                <input type="text" id="base-input" value={namaLengkap} onChange={handleNamaLengkapChange} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="gender-dropdown" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                <button
                                id="gender-dropdown"
                                onClick={handleGenderDropdownToggle}
                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${isGenderDropdownOpen ? 'border-black' : ''}`}
                                type="button"
                                >
                                <span className="flex-1">{jk}</span>
                                <svg className="w-2.5 h-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                                </button>
                                {isGenderDropdownOpen && (
                                <div ref={genderDropdownRef} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <button
                                            onClick={() => handleJkSelect('pria')}
                                            className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${isGenderDropdownOpen ? 'border-black' : ''}`}
                                            type="button"
                                        >
                                            Pria
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            onClick={() => handleJkSelect('wanita')}
                                            className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${isGenderDropdownOpen ? 'border-black' : ''}`}
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
                                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                                <input
                                    type="text"
                                    id="base-input"
                                    value={tempatLahir}
                                    onChange={handleTempatLahirChange}
                                    className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="tanggal-lahir-input" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input type="date" id="tanggal_lahir" name="tanggal_lahir" value={tanggalLahir} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" onChange={(e) => setTanggalLahir(e.target.value)} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor Handphone</label>
                                <input
                                    type="text"
                                    id="base-input"
                                    value={noHp}
                                    onChange={handleNoHpChange}
                                    className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="category-dropdown" className="block mb-2 text-sm font-medium text-gray-900">Kategori Investor</label>
                                <button
                                    id="category-dropdown"
                                    onClick={handleCategoryDropdownToggle}
                                    className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${isCategoryDropdownOpen ? 'border-black' : ''}`}
                                    type="button"
                                >
                                    <span className="flex-1">{selectedCategory}</span>
                                    <svg className="w-2.5 h-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {isCategoryDropdownOpen && (
                                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            {categories.map((category, index) => (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => handleCategorySelect(category)}
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
                                <button type="button" onClick={handleSubmitBiodata} className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                            </div>
                        </div>
                    );
                    
            case 'Alamat':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Alamat</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Alamat Sesuai KTP</label>
                            <input type="text" id="base-input" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Provinsi</label>
                            <input type="text" id="base-input" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kota/Kabupaten</label>
                            <input type="text" id="base-input" value={kota} onChange={(e) => setKota(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kecamatan</label>
                            <input type="text" id="base-input" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kelurahan</label>
                            <input type="text" id="base-input" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kode Pos</label>
                            <input type="text" id="base-input" value={kodePos} onChange={(e) => setKodePos(e.target.value)} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="flex justify-end">
                            <button type="button" onClick={handleSubmitAlamat} className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                        </div>
                    </div>
                );
            case 'Identitas':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Identitas</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor KTP</label>
                            <input type="text" id="nomor-ktp-input" name="no_ktp" value={formDataIdentitas.no_ktp} onChange={handleChangeIdentitas}className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="foto-ktp-input" className="block mb-2 text-sm font-medium text-gray-900">
                                Foto KTP
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="foto-ktp-input" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                                    {fotoKtpPreview ? (
                                        <img
                                        src={fotoKtpPreview}
                                        alt="Pratinjau"
                                        className="max-h-40 mb-2"
                                        />
                                    ) : (
                                        <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                            Klik untuk mengunggah
                                            </span>{" "}
                                            atau seret dan jatuhkan
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG atau GIF (MAKS. 800x400px)
                                        </p>
                                        </>
                                    )}
                                    </div>
                                    <input id="foto-ktp-input" name="foto_ktp"  type="file" onChange={handleChangeIdentitas} className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor NPWP</label>
                            <input type="text" id="nomor-npwp-input" name="no_npwp" value={formDataIdentitas.no_npwp} onChange={handleChangeIdentitas} className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="foto-npwp-input" className="block mb-2 text-sm font-medium text-gray-900">Foto NPWP</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="foto-npwp-input" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                                    {fotoNpwpPreview ? (
                                        <img
                                        src={fotoNpwpPreview}
                                        alt="Pratinjau"
                                        className="max-h-40 mb-2"
                                        />
                                    ) : (
                                        <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                            Klik untuk mengunggah
                                            </span>{" "}
                                            atau seret dan jatuhkan
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG atau GIF (MAKS. 800x400px)
                                        </p>
                                        </>
                                    )}
                                    </div>
                                    <input id="foto-npwp-input" name="foto_npwp"  onChange={handleChangeIdentitas} type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="mb-5">
                            <label htmlFor="selfie-ktp-input" className="block mb-2 text-sm font-medium text-gray-900">Foto Selfie dengan KTP</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="selfie-ktp-input" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                                    {selfieKtpPreview ? (
                                        <img
                                        src={selfieKtpPreview}
                                        alt="Pratinjau"
                                        className="max-h-40 mb-2"
                                        />
                                    ) : (
                                        <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                            Klik untuk mengunggah
                                            </span>{" "}
                                            atau seret dan jatuhkan
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG atau GIF (MAKS. 800x400px)
                                        </p>
                                        </>
                                    )}
                                    </div>
                                    <input id="selfie-ktp-input" name="selfie_ktp" onChange={handleChangeIdentitas} type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="flex justify-end">
                            <button type="button" onClick={handleSubmitIdentitas} className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                        </div>
                    </div>
                );
            case 'Pendukung':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pendukung</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Latar Belakang Pendidikan</label>
                            <input 
                                type="text" 
                                id="latar-pendidikan-input" 
                                name="latar_pendidikan" 
                                value={formDataPendukung.latar_pendidikan} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                            <input 
                                type="text" 
                                id="sumber-penghasilan-input" 
                                name="sumber_penghasilan" 
                                value={formDataPendukung.sumber_penghasilan} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Penghasilan</label>
                            <input 
                                type="text" 
                                id="jumlah-penghasilan-input" 
                                name="jumlah_penghasilan" 
                                value={formDataPendukung.jumlah_penghasilan} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Bidang Usaha</label>
                            <input 
                                type="text" 
                                id="bidang-usaha-input" 
                                name="bidang_usaha" 
                                value={formDataPendukung.bidang_usaha} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tujuan Investasi</label>
                            <input 
                                type="text" 
                                id="tujuan-investasi-input" 
                                name="tujuan_investasi" 
                                value={formDataPendukung.tujuan_investasi} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor SID</label>
                            <input 
                                type="text" 
                                id="no-sid-input" 
                                name="no_sid" 
                                value={formDataPendukung.no_sid} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Pembuatan SID</label>
                            <input 
                                type="date" 
                                id="tanggal-pembuatan-sid-input" 
                                name="tanggal_pembuatan_sid" 
                                value={formDataPendukung.tanggal_pembuatan_sid || ''} 
                                onChange={handleChangePendukung} 
                                className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" 
                            />
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
                        onClick={() => setActiveTab('Biodata')}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === 'Biodata' ? 'text-white bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                        aria-current={activeTab === 'Biodata' ? 'page' : undefined}
                    >
                        Biodata
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab('Alamat')}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === 'Alamat' ? 'text-white bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                        aria-current={activeTab === 'Alamat' ? 'page' : undefined}
                    >
                        Alamat
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab('Identitas')}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === 'Identitas' ? 'text-white bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                        aria-current={activeTab === 'Identitas' ? 'page' : undefined}
                    >
                        Identitas
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab('Pendukung')}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === 'Pendukung' ? 'text-white bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                        aria-current={activeTab === 'Pendukung' ? 'page' : undefined}
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

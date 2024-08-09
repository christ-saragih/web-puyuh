import React, { useState, useEffect, useRef } from "react";
import { Datepicker } from "flowbite-react";

const VerticalTabProfil = () => {
    const [activeTab, setActiveTab] = useState('Biodata');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState('Pilih Kelamin');
    const [selectedCategory, setSelectedCategory] = useState('Pilih Kategori');
    const genderDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) &&
                (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target))
            ) {
                setIsGenderDropdownOpen(false);
                setIsCategoryDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleGenderDropdownToggle = () => {
        setIsGenderDropdownOpen(!isGenderDropdownOpen);
        if (isCategoryDropdownOpen) {
            setIsCategoryDropdownOpen(false); // Close category dropdown if it's open
        }
    };

    const handleCategoryDropdownToggle = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
        if (isGenderDropdownOpen) {
            setIsGenderDropdownOpen(false); // Close gender dropdown if it's open
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
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="gender-dropdown" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                            <button
                                id="gender-dropdown"
                                onClick={handleGenderDropdownToggle}
                                className={`bg-[#F5F5F7] text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center w-full ${isGenderDropdownOpen ? 'border-black' : ''}`}
                                type="button"
                            >
                                <span className="flex-1">{selectedGender}</span>
                                <svg className="w-2.5 h-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isGenderDropdownOpen && (
                                <div ref={genderDropdownRef} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setSelectedGender('Laki-laki');
                                                    setIsGenderDropdownOpen(false);
                                                }}
                                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Laki-laki
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setSelectedGender('Perempuan');
                                                    setIsGenderDropdownOpen(false);
                                                }}
                                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Perempuan
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="birthdate-input" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                            <Datepicker language="id" labelTodayButton="Hari ini" labelClearButton="Hapus" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor Handphone</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900" />
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
                                <div ref={categoryDropdownRef} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory('Perorangan');
                                                    setIsCategoryDropdownOpen(false);
                                                }}
                                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Perorangan
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory('Badan');
                                                    setIsCategoryDropdownOpen(false);
                                                }}
                                                className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Badan
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                        </div>
                    </div>
                );
            case 'Alamat':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Alamat</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Alamat Sesuai KTP</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Provinsi</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kota/Kabupaten</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kecamatan</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kelurahan</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Kode Pos</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                        </div>
                    </div>
                );
            case 'Identitas':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Identitas</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor KTP</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Foto KTP</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor NPWP</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Foto NPWP</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Foto Selfie dengan KTP</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
                        </div>
                    </div>
                );
            case 'Pendukung':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pendukung</h3>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Latar Belakang Pendidikan</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Penghasilan</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Bidang Usaha</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tujuan Investasi</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Nomor SID</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Pembuatan SID</label>
                            <input type="text" id="base-input" className="bg-[#F5F5F7] text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 " />
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="text-white bg-[#572618] hover:bg-orange-950 focus:ring-4 focus:ring-orange-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Simpan</button>
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

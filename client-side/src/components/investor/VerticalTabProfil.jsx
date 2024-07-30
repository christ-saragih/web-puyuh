import React, { useState } from "react";

const VerticalTabProfil = () => {
    // State untuk melacak tab yang aktif
    const [activeTab, setActiveTab] = useState('Biodata');

    // Konten yang sesuai dengan tab yang aktif
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Biodata':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Biodata</h3>
                        <p className="mb-2">This is some placeholder content for the Biodata tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                        <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                    </div>
                );
            case 'Alamat':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Alamat</h3>
                        <p>This is some placeholder content for the Alamat tab's associated content.</p>
                    </div>
                );
            case 'Identitas':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Identitas</h3>
                        <p>This is some placeholder content for the Identitas tab's associated content.</p>
                    </div>
                );
            case 'Pendukung':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pendukung</h3>
                        <p>This is some placeholder content for the Pendukung tab's associated content.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="md:flex m-7">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <button
                        onClick={() => setActiveTab('Biodata')}
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg w-full ${
                            activeTab === 'Biodata' ? 'text-white bg-blue-700 dark:bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
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
                            activeTab === 'Alamat' ? 'text-white bg-blue-700 dark:bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
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
                            activeTab === 'Identitas' ? 'text-white bg-blue-700 dark:bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
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
                            activeTab === 'Pendukung' ? 'text-white bg-blue-700 dark:bg-[#572618]' : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                        aria-current={activeTab === 'Pendukung' ? 'page' : undefined}
                    >
                        Pendukung
                    </button>
                </li>
            </ul>
            <div className="p-6 bg-white text-gray-900 rounded-lg w-full">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default VerticalTabProfil;

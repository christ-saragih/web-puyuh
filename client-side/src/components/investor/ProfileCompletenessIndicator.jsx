import React from 'react';
import { FaUserCheck } from 'react-icons/fa';

const ProfileCompletenessCard = ({ completeness }) => {
  const getColor = () => {
    if (completeness < 50) return 'red';
    if (completeness < 100) return 'yellow';
    return 'green';
  };

  return (
    <div className="bg-[#fff] shadow-md rounded-lg p-1 w-[60%] h-full items-start justify-start mb-2 mr-10">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-semibold text-gray-700">Kelengkapan Profil</h3>
      </div>
      <div className="flex items-center mb-4">
        <FaUserCheck className={`w-5 h-5 mr-4 text-${getColor()}-500`} />
        <div>
          <p className="text-sm font-bold text-gray-800">{completeness}%</p>
            <div className="w-[400%] bg-gray-200 rounded-full h-1 mt-0">
                <div
                    className={`bg-${getColor()}-500 h-1.5 rounded-full`}
                    style={{ width: `${completeness}%` }}
                    ></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletenessCard;
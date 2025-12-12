import React from 'react';
import ProfileDest from './ProfileDest';
import FiturDest from './FiturDest';

const Destinasi = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* ProfileCard */}
            <div>
                <ProfileDest />
            </div>

            {/* FiturSection di bawah ProfileCard */}
            <div>
               <FiturDest /> 
            </div>
        </div>
    );
};

export default Destinasi;
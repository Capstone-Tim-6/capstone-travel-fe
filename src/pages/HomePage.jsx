import React from 'react';
import ProfileCard from './ProfileCard';
import FiturSection from './Fitursection';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* ProfileCard */}
            <div>
                <ProfileCard />
            </div>

            {/* FiturSection di bawah ProfileCard */}
            <div>
               <FiturSection /> 
            </div>
        </div>
    );
};

export default HomePage;
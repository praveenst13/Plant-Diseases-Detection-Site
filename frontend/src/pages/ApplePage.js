import React from 'react';
import UploadForm from '../components/UploadForm';

const ApplePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Apple Disease Detection</h2>
      <UploadForm plant="apple" />
    </div>
  );
};

export default ApplePage;


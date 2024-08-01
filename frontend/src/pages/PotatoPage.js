import React from 'react';
import UploadForm from '../components/UploadForm';

const PotatoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Potato Disease Detection</h2>
      <UploadForm plant="potato" />
    </div>
  );
};

export default PotatoPage;


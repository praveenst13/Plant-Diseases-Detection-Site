import React from 'react';
import { useParams } from 'react-router-dom';

const PlantDetailPage = () => {
  const { plantName } = useParams();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="w-full h-20 bg-white shadow flex items-center justify-between px-5">
        <h1 className="text-black text-2xl font-medium">Plant Detail: {plantName}</h1>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <section className="w-full py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Details for {plantName}</h2>
            {/* Add more details or components here */}
            <p className="text-lg">Here you can show details and analysis for {plantName}.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full h-16 bg-gray-700 flex items-center justify-center text-white">
        <p>✏️ Designing...</p>
      </footer>
    </div>
  );
};

export default PlantDetailPage;


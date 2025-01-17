import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="w-full h-20 bg-white shadow flex items-center justify-between px-5">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-black/10 rounded-full">
          
          </div>


          
          <h1 className="text-black text-2xl font-medium ml-3">Plant Diseases Detection</h1>
        </div>
        <div className="flex items-center">
          <input type="text" placeholder="Search in site" className="h-9 px-3 rounded-md border border-black/10 text-sm text-black/50" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Welcome Section */}
        <section className="w-full bg-black/60 py-12 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-2">Welcome to Plant Diseases Detection</h2>
            <p className="text-base">Detect diseases in apple, grapes, rice, and potato plants</p>
          </div>
        </section>

        {/* Plant Images Section */}
        <section className="w-full py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">Plant Images</h3>
            <div className="flex justify-around">
              <a href="/plant/apple" className="flex flex-col items-center text-blue-500 underline">
                <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-2">
                  <span className="text-5xl">🍎</span>
                </div>
                <span className="text-xl">Apple</span>
              </a>
              <a href="/plant/grapes" className="flex flex-col items-center text-blue-500 underline">
                <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-2">
                  <span className="text-5xl">🍇</span>
                </div>
                <span className="text-xl">Grapes</span>
              </a>
              <a href="/plant/rice" className="flex flex-col items-center text-blue-500 underline">
                <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-2">
                  <span className="text-5xl">🌾</span>
                </div>
                <span className="text-xl">Rice</span>
              </a>
              <a href="/plant/potato" className="flex flex-col items-center text-blue-500 underline">
                <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-2">
                  <span className="text-5xl">🥔</span>
                </div>
                <span className="text-xl">Potato</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full h-16 bg-gray-700 flex items-center justify-center text-white">
        <p>Plant Diseases Detection provides quick, accurate plant disease detection through image uploads, offers clear predictions with actionable recommendations, and educates users on plant care and disease management, enhancing crop health and productivity.website needs futher development....</p>
      </footer>
    </div>
  );
};

export default HomePage;


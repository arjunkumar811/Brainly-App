import React from "react";

const FeatureInputs: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-4 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Enhance Your AI Experience</h2>

      <div className="space-y-3">
        {/* Input 1 */}
        <input
          type="text"
          placeholder="🔗 Add any URL, Twitter links, YouTube videos"
          className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:shadow-md"
        />

        {/* Input 2 */}
        <input
          type="text"
          placeholder="💬 Chat with your knowledge base"
          className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all duration-300 hover:shadow-md"
        />

        {/* Input 3 */}
        <input
          type="text"
          placeholder="⚡ Get AI-powered insights"
          className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300 hover:shadow-md"
        />
      </div>
    </div>
  );
};

export default FeatureInputs;

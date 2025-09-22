import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 w-full md:w-2/3 lg:w-1/2 mx-auto bg-gray-900 p-4 rounded-2xl shadow-lg"
    >
      <div className="relative flex-grow">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search as per Requirement"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 
                   shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        Search
      </button>
    </motion.form>
  );
}

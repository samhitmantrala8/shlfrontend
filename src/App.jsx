import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("https://shlbackend-w7k8.onrender.com/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SHL Assessment Recommendation</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter job description or query..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Job Level</th>
              <th className="py-2 px-4 border">Languages</th>
              <th className="py-2 px-4 border">Duration</th>
              <th className="py-2 px-4 border">Adaptive IRT</th>
              <th className="py-2 px-4 border">Remote Testing</th>
              <th className="py-2 px-4 border">Link</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((res, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{res.title}</td>
                  <td className="py-2 px-4 border">{res.description}</td>
                  <td className="py-2 px-4 border">{res.job_level}</td>
                  <td className="py-2 px-4 border">{res.language}</td>
                  <td className="py-2 px-4 border">{res.duration}</td>
                  <td className="py-2 px-4 border">{res.adaptive_irt}</td>
                  <td className="py-2 px-4 border">{res.remote_testing}</td>
                  <td className="py-2 px-4 border">
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-2 px-4 text-center">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

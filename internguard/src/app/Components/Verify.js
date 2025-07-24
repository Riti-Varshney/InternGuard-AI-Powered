"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useDataContext } from "../Context/data";
// --------------------------------------nc------
const Verify = () => {
  const { fetchData } = useDataContext();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getDomainFromUrl = (inputUrl) => {
    try {
      const { hostname } = new URL(inputUrl);
      return hostname;
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const domain = getDomainFromUrl(url);
    if (!domain) {
      alert("Please enter a valid URL.");
      setLoading(false);
      return;
    }

    try {
      // Call fetchData with description and domain, returns combined data
      const data = await fetchData(description, domain);
      // Encode data as JSON string for URL param
      const encodedData = encodeURIComponent(JSON.stringify(data));
      // Navigate to results page with data as query param
      router.push(`/results?data=${encodedData}`);
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    }
    setUrl("");
    setCompany("");
    setDescription("");
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Internship Verification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="url" placeholder="https://example.com/internship" value={url} onChange={(e) => setUrl(e.target.value)} disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="text" placeholder="Enter company name" value={company} onChange={(e) => setCompany(e.target.value)} disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <textarea placeholder="Paste the internship description..." value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 transition duration-300 disabled:opacity-50">
            <Shield className="h-6 w-6" />
            {loading ? " Verifying..." : "Verify Internship"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Verify;

"use client";
import { createContext, useState, useContext } from "react";

const DataContext = createContext();
// -----------------------------------nc--
export const DataProvider = ({ children }) => {
  const [geminiData, setGeminiData] = useState({});
  const [whoisData, setWhoisData] = useState({});

  const fetchData = async (desc, domain) => {
// Fetches Gemini data
    const geminiRes = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc }),
    });

    const geminiResult = await geminiRes.json();
    setGeminiData(geminiResult);

    // Fetches WHOIS data
    const whoisRes = await fetch("/api/whois", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain }),
    });

    const whoisResult = await whoisRes.json();
    setWhoisData(whoisResult);

    // Returnesd combined data
    return {
      geminiData: geminiResult,
      whoisData: whoisResult,
    };
  };

  return (
    <DataContext.Provider value={{ geminiData, whoisData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

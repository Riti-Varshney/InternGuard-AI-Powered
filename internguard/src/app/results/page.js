"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Shield,ArrowLeft,Globe,Calendar,User,Server,AlertTriangle,CheckCircle,XCircle,Info,} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Results = () => {
  const router = useRouter();
  const [geminiData, setGeminiData] = useState(null);
  const [whoisData, setWhoisData] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const rawData = searchParams.get("data");

    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        setGeminiData(parsed.geminiData);
        setWhoisData(parsed.whoisData);
      } catch (err) {
        console.error("Invalid data format", err);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!geminiData || !whoisData) return null;


  const data = {
// geminiData--->scam_score, label, analysis, red_flags, and domainName
    scam_score: geminiData.scam_score ?? 0,
    label: geminiData.label ?? "Unknown",
    analysis: geminiData.analysis ?? "No analysis available.",
    red_flags: geminiData.red_flags ?? [],
    domainName: whoisData.domainName ?? geminiData.domainName ?? "Unknown domain",
// whoisData--->domainName, registrarName, createdDate, expiresDate, registrant, nameServers
    registrarName: whoisData.registrarName ?? "Unknown",
    createdDate: whoisData.createdDate ?? "Unknown",
    expiresDate: whoisData.expiresDate ?? "Unknown",
    registrant: whoisData.registrant ?? "Unknown",
    nameServers: whoisData.nameServers ?? [],
  };

  const safetyScore = 100 - data.scam_score;

  const pieData = [
    { name: "Safe", value: safetyScore, color: "hsl(160, 100%, 40%)" },
    {
      name: "Risk",
      value: data.scam_score,
      color: data.scam_score <= 30 ? "hsl(40, 100%, 50%)" : "hsl(0, 100%, 60%)",
    },
  ];

  const getScoreColor = (score) => {
    if (score <= 30) return "text-green-600";
    if (score <= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score <= 30) return "bg-green-50 border-green-200";
    if (score <= 70) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getLabelColor = (label) => {
    switch (label.toLowerCase()) {
      case "real":
        return "bg-green-100 text-green-700";
      case "suspicious":
        return "bg-yellow-100 text-yellow-700";
      case "fake":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getLabelIcon = (label) => {
    switch (label.toLowerCase()) {
      case "real":
        return <CheckCircle className="h-4 w-4" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4" />;
      case "fake":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/20">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push("/")}className="text-sm flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-blue-600">InterSecure</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Verification Results</h1>
            <span
              className={`text-sm font-medium px-3 py-1 rounded inline-flex items-center gap-2 ${getLabelColor(
                data.label
              )}`} >
              {getLabelIcon(data.label)}
              {data.label}
            </span>
          </div>
          <p className="text-gray-600">
            Analysis completed for: <span className="font-medium">{data.domainName}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Domain Info in such way -> CrExReRe&SERVERS */}
            <div className="border rounded-lg bg-white shadow p-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Domain Information
                </h2>
                <p className="text-sm text-gray-500">Technical details about the website domain</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoField label="Domain Name" value={data.domainName} mono />
                <InfoField label="Registrar" value={data.registrarName} />
                <InfoField label="Created Date" value={data.createdDate} icon={<Calendar />} />
                <InfoField label="Expires Date" value={data.expiresDate} icon={<Calendar />} />
                <InfoField label="Registrant" value={data.registrant} icon={<User />} />
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Name Servers
                  </label>
                  <div className="space-y-1 mt-1">
                    {data.nameServers.length > 0 ? (
                      data.nameServers.map((ns, i) => (
                        <p key={i} className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {ns}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No name servers available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Analysis */}
            <div className="border rounded-lg bg-white shadow p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Analysis
                </h2>
                <p className="text-sm text-gray-500">Detailed analysis of potential risks and red flags</p>
              </div>

              {data.red_flags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-yellow-600">
                    <AlertTriangle className="h-4 w-4" />
                    Red Flags Detected
                  </h4>
                  <div className="space-y-2">
                    {data.red_flags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg" >
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-t" />
              <div>
                <h4 className="font-medium mb-3">Detailed Analysis</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{data.analysis}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Risk Score */}
            <div className={`rounded-lg shadow p-6 border-2 ${getScoreBg(data.scam_score)}`}>
              <h3 className="text-xl font-semibold text-center mb-2">Risk Score</h3>
              <p className="text-sm text-center text-gray-500 mb-4">Based on our analysis algorithm</p>
              <div className={`text-6xl font-bold text-center mb-2 ${getScoreColor(data.scam_score)}`}>
                {data.scam_score}
              </div>
              <p className="text-sm text-gray-500 text-center mb-4">out of 100</p>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Low Risk (0-30)</span>
                  <span className="text-green-600">●</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium Risk (31-70)</span>
                  <span className="text-yellow-600">●</span>
                </div>
                <div className="flex justify-between">
                  <span>High Risk (71-100)</span>
                  <span className="text-red-600">●</span>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="rounded-lg shadow p-6 border bg-white">
              <h3 className="text-xl font-semibold text-center mb-1">Safety Overview</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Risk vs Safety Distribution</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value" >

                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <div className={`text-2xl font-bold mb-2 ${getScoreColor(data.scam_score)}`}>
                  {safetyScore}% Safe
                </div>
                <p className="text-sm text-gray-500">
                  This internship has a {safetyScore}% safety rating
                </p>
              </div>
            </div>

            <div className={`rounded-lg shadow p-6 border-2 ${getScoreBg(data.scam_score)}`}>
              <h3 className="text-xl font-semibold text-center mb-4">Final Verdict</h3>
              <div className={`text-4xl text-center mb-2 ${getScoreColor(data.scam_score)}`}>
                {getLabelIcon(data.label)}
              </div>
              <div className={`text-2xl font-bold text-center mb-2 ${getScoreColor(data.scam_score)}`}>
                {data.label.toUpperCase()}
              </div>
              <p className="text-sm text-gray-500 text-center">
                {data.label.toLowerCase() === "real" &&
                  "This appears to be a legitimate internship opportunity."}
                {data.label.toLowerCase() === "suspicious" &&
                  "Exercise caution. Verify company details before proceeding."}
                {data.label.toLowerCase() === "fake" &&
                  "Strong indicators suggest this may be a scam. Avoid this opportunity."}
              </p>
            </div>

            <button onClick={() => router.push("/")}className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
              Analyze Another Internship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, mono, icon }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <p className={`text-sm ${mono ? "font-mono bg-gray-100 p-2 rounded" : ""}`}>{value}</p>
  </div>
);

export default Results;


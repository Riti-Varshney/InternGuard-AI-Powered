import { Brain, Search, Globe, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced Gemini AI analyzes job descriptions, company profiles, and requirements to detect suspicious patterns and inconsistencies.",
    color: "bg-blue-500"
  },
  {
    icon: Globe,
    title: "Domain Verification",
    description: "Real-time Whois API integration checks domain registration, age, and authenticity to verify company legitimacy.",
    color: "bg-gray-500"
  },
  {
    icon: Search,
    title: "Comprehensive Research",
    description: "Google Search API integration provides detailed company background checks and cross-references multiple sources.",
    color: "bg-yellow-500"
  },
  {
    icon: AlertTriangle,
    title: "Fraud Detection",
    description: "Sophisticated algorithms identify common scam patterns, unrealistic promises, and red flags in internship postings.",
    color: "bg-red-500"
  },
  {
    icon: CheckCircle,
    title: "Trust Score System",
    description: "Get a clear trust score from 0-100 based on multiple verification factors and risk assessment algorithms.",
    color: "bg-green-500"
  },
  {
    icon: TrendingUp,
    title: "Real-time Reports",
    description: "Instant verification reports with detailed analysis, recommendations, and actionable insights for informed decisions.",
    color: "bg-purple-500"
  }
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#272725] mb-6">
            Powerful Features for Your Protection
          </h2>
          <p className="text-xl text-[#70706d] max-w-3xl mx-auto">
            Our comprehensive suite of verification tools ensures you never fall victim to 
            fraudulent internships or waste time on low-value opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 hover:shadow-md transition-all duration-300 bg-gray-200/10 group rounded-xl"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#363633] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#525251] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
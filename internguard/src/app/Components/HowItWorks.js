import { Search, Brain, Shield, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Submit Internship Details",
    description: "Paste the internship URL or company details you want to verify",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our Gemini AI analyzes the company profile, job description, and requirements",
    step: "02"
  },
  {
    icon: Shield,
    title: "Domain & Company Check",
    description: "We verify domain authenticity using Whois API and search for company information",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Get Verification Report",
    description: "Receive a comprehensive report with trust score and recommendations",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-blue-100/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#272725] mb-6">
            How InternSecure Works
          </h2>
          <p className="text-xl text-[#70706d] max-w-3xl mx-auto">
            Our advanced verification process combines AI analysis, domain checking, 
            and comprehensive research to protect you from fraudulent internships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="p-8 text-center hover:shadow-md transition-all bg-white rounded-lg shadow-lg hover:scale-105"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-400 rounded-full mx-auto flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl text-[#363633]  font-semibold  mb-4">
                {step.title}
              </h3>
              <p className="text-[#525251] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
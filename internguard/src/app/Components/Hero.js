// import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";
const Hero = () => {
    return (
        <section className="relative min-h-screen bg-gradient-hero overflow-hidden text-white">
            {/* Background Image with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat "
                style={{ backgroundImage: "url('/bg.png')" }}
            />
            <div className="absolute inset-0 bg-primary/10" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
                <div className="lg:w-1/2 space-y-8 animate-fade-in">
                    <div className="flex items-center space-x-2 mb-4">
                        <Shield className="h-8 w-8 " />
                        <span className="text-xl font-bold ">InternSecure</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                        Detect Fake &{" "}
                        <span className="text-green-500 px-2 py-1 rounded">Unverified</span>{" "}
                        Internships
                    </h1>

                    <p className="text-xl  leading-relaxed max-w-2xl">
                        Use advanced AI analysis and data verification to identify scam or low-value internships.
                        Save your time and avoid fraudulent experiences with our comprehensive verification system.
                    </p>

                    <div className="flex gap-4">
                        <button size="xl" className="group flex justify-center items-center rounded-lg text-lg font-bold p-4 bg-gradient-to-l from-blue-400 to-blue-500 text-white hover:from-blue-200 hover:to-blue-300 hover:text-black  transition-transform hover:scale-102">
                            Start Verification
                            <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button size="xl" className="rounded-lg text-lg font-bold p-4 bg-gradient-to-l from-blue-400 to-blue-500 text-white hover:from-blue-200 hover:to-blue-300 hover:text-black  transition-transform hover:scale-102">
                            Learn More
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pt-8">
                        <div className="flex items-center space-x-1 px-4 py-2">
                            <CheckCircle className="h-7 w-7 text-green-500 rounded-full p-1 bg-white" />
                            <span className=" font-medium">AI-Powered Analysis</span>
                        </div>
                        <div className="flex items-center space-x-1  px-4 py-2 ">
                            <CheckCircle className="h-7 w-7 text-green-500 rounded-full p-1 bg-white" />
                            <span className=" font-medium">Domain Verification</span>
                        </div>
                        <div className="flex items-center space-x-1 px-4 py-2">
                            <CheckCircle className="h-7 w-7 text-green-500 rounded-full p-1 bg-white" />
                            <span className=" font-medium">Real-time Results</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 mt-12 lg:mt-0 animate-slide-in-right ">
                    <div className="relative  ">
                        <div className=" backdrop-blur-sm rounded-2xl p-8 shadow-hero bg-white text-black">
                            <h3 className="text-2xl font-semibold mb-6 text-foreground">Quick Verification</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-4 bg-gray-200/60  rounded-lg">
                                    <CheckCircle className="h-7 w-7 text-green-500 " />
                                    <span className="text-lg font-medium">Domain authenticity verified</span>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-gray-200/60  rounded-lg">
                                    <CheckCircle className="h-7 w-7 text-green-500 " />
                                    <span className="text-lg font-medium">Company profile analyzed</span>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-red-100/90  rounded-lg">
                                    <AlertTriangle className="h-7 w-7 text-red-500 " />       
                                    <span className="text-lg font-medium">Suspicious patterns detected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
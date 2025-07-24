import React from 'react'
import { Shield, Github, Linkedin } from "lucide-react";
function Footer() {
    return (
        <div className='bg-gray-800 text-white py-8 px-4 flex flex-col items-center justify-center space-y-4'>
            <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold">InternSecure</span>
            </div>
            <p className="text-secondary-foreground/80 max-w-4xl">
                Protecting students and job seekers from fraudulent internships
                through advanced AI analysis and verification.
            </p>

            <div className="border-t w-3/4 mx-40 border-blue-900 mt-6 pt-8 text-center"></div>

            <p className="text-gray-200 text-sm">
            © 2024 InternSecure. All rights reserved. Built with security in mind.<br></br>
            made by  <b>"<i>Mansi Sharma, Riti Varshney and Vidhi Gupta</i>"</b>
          </p>

        </div>
    )
}

export default Footer

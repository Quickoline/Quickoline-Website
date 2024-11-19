import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadAppPage() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Download Quickoline App
        </h1>

        {/* App Image */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/images/appimages/appImage.png"
            alt="Quickoline App Mockup"
            width={500}
            height={500}
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
        <div>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 m-5">
          Welcome to the Download Quickoline App Page! Here you can easily
          download the Quickoline app and avail your desired service.
        </p>
        </div>
       
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
         <Link href="https://drive.google.com/file/d/1RK1FiWU7W3onF_THuTcB-S_pBLdkoc6H/view">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Download className="mr-2" /> Download App
          </Button>
          </Link>
          <Link href="/our-services">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
            >
              Explore Our Services <ArrowRight className="ml-2" />
            </Button>
          </Link>
       
        </div>
        <div>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 m-5">
            Thank you for choosing Quickoline! If you require any assistance,
            feel free to reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  );
}

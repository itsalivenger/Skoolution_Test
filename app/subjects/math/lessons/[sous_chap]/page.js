'use client';
import Breadcrumb from "@/app/components/client/BreadCrumb";
import Header from "@/app/components/client/Header";
import Sous_Chap from "@/app/components/client/Sous_Chap";

function Sous_Chap_Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Header />
      <Breadcrumb />
      <Sous_Chap />
    </div>
  );
}

export default Sous_Chap_Page;

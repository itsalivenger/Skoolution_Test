"use client";

import React, { Suspense } from "react";
import Header from "@/app/components/client/Header";
import TestSelector from "@/app/components/client/TestsContainer";

function Tests_page() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sélection des Tests</h1>
        {/* Ghi khli suspense hna */}
        {/* saddi9 aw la tosaddi9: ila 7yedtiha maymknch lik thosti f vercel */}
        {/* hitach the breadcrumb component fih useParams chiahjaa mhm weird shit */}
        <Suspense fallback={<div>Loading...</div>}>
          <TestSelector />
        </Suspense>
      </main>
    </div>
  );
}

export default Tests_page;

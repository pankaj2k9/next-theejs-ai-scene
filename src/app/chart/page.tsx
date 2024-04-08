import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "A Next.js & Three.js AI-Powered Visualization Experience",
  description: "This innovative app combines the robust, server-rendered application framework of Next.js with the dynamic 3D rendering capabilities of Three.js to deliver a unique AI-powered scene generation platform.",
};


const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;

import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "A Next.js & Three.js AI-Powered Visualization Experience",
  description: "This innovative app combines the robust, server-rendered application framework of Next.js with the dynamic 3D rendering capabilities of Three.js to deliver a unique AI-powered scene generation platform.",
};


const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default CalendarPage;

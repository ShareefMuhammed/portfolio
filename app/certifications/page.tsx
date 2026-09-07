import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Certifications | Muhammed Shareef",
  description:
    "Verified degrees, technical certifications, and course credentials of Muhammed Shareef.",
};

export interface CertificateItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export const certificatesData: CertificateItem[] = [
  {
    id: "01",
    title: "B.Tech Degree - Provisional Certificate",
    image: "/images/certifications/01-btech-degree.jpg",
    alt: "B.Tech Degree Provisional Certificate in Computer Science and Engineering from APJ Abdul Kalam Technological University for Muhammed Shareef P",
  },
  {
    id: "02",
    title: "Python 101 for Data Science",
    image: "/images/certifications/02-python-101.jpg",
    alt: "Python 101 for Data Science certificate issued by Cognitive Class powered by IBM Developer Skills Network for Muhammed Shareef P",
  },
  {
    id: "03",
    title: "MongoDB Skill - Relational to Document Model",
    image: "/images/certifications/03-mongodb-document-model.jpg",
    alt: "Proof of Completion for MongoDB Skill: From Relational Model (SQL) to MongoDB Document Model for Muhammed Shareef P",
  },
  {
    id: "04",
    title: "1 Million Prompters - Certificate of Completion",
    image: "/images/certifications/04-one-million-prompters.jpg",
    alt: "Certificate of Completion from 1 Million Prompters initiative by Dubai Future Foundation and Dubai Centre for Artificial Intelligence for Muhammed Shareef P",
  },
  {
    id: "05",
    title: "AI Fluency: Framework & Foundations",
    image: "/images/certifications/05-ai-fluency.jpg",
    alt: "Certificate of Completion for AI Fluency: Framework & Foundations from Anthropic for Muhammed Shareef P",
  },
  {
    id: "06",
    title: "IEEE Student Paper Contest 2026 - Certificate of Participation",
    image: "/images/certifications/06-ieee-paper-contest.jpg",
    alt: "Certificate of Participation for presenting DrugGPT paper in IEEE Student Paper Contest 2026 at CCET Alappuzha for Muhammed Shareef P",
  },
  {
    id: "07",
    title: "AI Bootcamp - Build Your First Predictive Model with Python",
    image: "/images/certifications/07-ai-bootcamp-predictive-model.jpg",
    alt: "Certificate of Completion from Upcode Software Labs for AI Bootcamp: Build Your First Predictive Model with Python for Muhammed Shareef P",
  },
  {
    id: "08",
    title: "WOW Summit 2025 - Certificate of Participation",
    image: "/images/certifications/08-wow-summit-2025.jpg",
    alt: "Certificate of Participation for WOW Summit 2025 student-led tech summit held at Jain University Kochi for Muhammed Shareef P",
  },
  {
    id: "09",
    title: "ScaleUp Conclave 2025 - Data Analytics Using Python",
    image: "/images/certifications/09-scaleup-data-analytics.jpg",
    alt: "Certificate of Participation from ScaleUp Conclave 2025 for Master Class in Data Analytics Using Python for Muhammed Shareef P",
  },
  {
    id: "10",
    title: "Power BI for Beginners - Certificate of Completion",
    image: "/images/certifications/10-power-bi-beginners.jpg",
    alt: "Certificate of Completion from Simplilearn SkillUp for Power BI for Beginners for Muhammed Shareef P",
  },
  {
    id: "11",
    title: "Advanced Google Analytics - Certificate of Completion",
    image: "/images/certifications/11-advanced-google-analytics.jpg",
    alt: "Certificate of Completion from Google Analytics Academy for Advanced Google Analytics for Muhammed Shareef P",
  },
  {
    id: "12",
    title: "Career Essentials in Generative AI - Microsoft & LinkedIn",
    image: "/images/certifications/12-career-essentials-generative-ai.jpg",
    alt: "Learning Path Certificate of Completion from Microsoft and LinkedIn for Career Essentials in Generative AI for Muhammed Shareef P",
  },
  {
    id: "13",
    title: "App Development in React Native - IEEE Workshop",
    image: "/images/certifications/13-app-dev-react-native-ieee.jpg",
    alt: "Certificate of Participation for App Development in React Native workshop by Talrop at XTRINIA 5.0, IEEE Student Branch MEA Engineering College for Muhammed Shareef P",
  },
  {
    id: "14",
    title: "What Is Generative AI? - LinkedIn Learning",
    image: "/images/certifications/14-what-is-generative-ai.jpg",
    alt: "Course Certificate of Completion from LinkedIn Learning for What Is Generative AI? for Muhammed Shareef P",
  },
  {
    id: "15",
    title: "Python - Certificate of Achievement",
    image: "/images/certifications/15-python-achievement.jpg",
    alt: "Certificate of Achievement for successfully completing Python course from Mind Luster for Muhammed Shareef P",
  },
];

export default function CertificationsPage() {
  return (
    <div className="relative space-y-12 py-6 sm:py-8 md:space-y-16 md:py-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-pixel text-ink text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          CERTIFICATIONS
        </h1>
        <p className="text-ink font-mono text-base sm:text-lg leading-relaxed">
          A collection of verified degrees, course credentials, and technical certifications in AI, Machine Learning, Data Science, and Computer Science.
        </p>
      </div>

      {/* Certifications Grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {certificatesData.map((cert, index) => (
          <Card
            key={cert.id}
            hasTape
            className="group flex flex-col justify-between p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--color-blue)]"
          >
            <div>
              {/* Certificate Image Container - Fully visible & uncropped with object-fit: contain */}
              <div className="relative h-56 sm:h-64 md:h-72 w-full mb-4 border-2 border-ink overflow-hidden bg-cream/40 flex items-center justify-center group-hover:border-blue transition-colors">
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  fill
                  className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 5}
                />
              </div>

              {/* Certificate Title: bold, same typography as Talks card titles */}
              <h2
                className="font-pixel text-ink text-xs sm:text-[13px] md:text-sm font-bold leading-relaxed"
                title={cert.title}
              >
                {cert.title}
              </h2>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

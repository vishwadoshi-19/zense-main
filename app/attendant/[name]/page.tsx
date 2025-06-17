/* eslint-disable @next/next/no-img-element */
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  UserCheck,
  School,
  HeartPulse,
  ClipboardList,
  CheckCircle,
  Utensils,
  Droplet,
  Shield,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export const dynamic = "force-dynamic";

interface AttendantPageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const listingsSnapshot = await getDocs(collection(db, "attendants"));
  const names = listingsSnapshot.docs.map((doc) => ({
    name: doc.id,
  }));

  return names;
}

const fetchDocument = async (name: string) => {
  const docRef = doc(db, "users", name);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log("No such document!");
  }
};

export default async function AttendantPage({ params }: AttendantPageProps) {
  const { name } = await params;
  const attendant = await fetchDocument(name);

  const services = {
    mobility: [
      "Walking assistance",
      "Turn position in bed",
      "Motion exercises",
      "Light massages",
    ],
    personalCare: ["Oral hygiene", "Skin care", "Assist in getting dressed"],
    hygiene: ["Help in toileting", "Changing diapers", "Changing catheter"],
    nutrition: ["Assist in feeding", "Help in fluid intake"],
    support: ["Companionship", "Polite conversations"],
    additionalHelp: [
      "Give medicine",
      "Accompany for Doctor's visit",
      "Book a cab",
      "Assist during diagnostic tests",
      "Physiotherapy",
      "Giving injection",
      "Change medical dressing",
      "Change drip",
    ],
  };

  const reviews = [
    {
      name: "Bhajan Sharma",
      rating: 5,
      text: "Absolutely wonderful caregiver! He has been so compassionate and attentive to my father's needs, making a huge difference in his daily comfort and happiness. I'm grateful for the peace of mind knowing my dad is in such caring hands.",
    },
    {
      name: "Mohan Yadav",
      rating: 5,
      text: "Kuldeep ek bohot acche caregiver hai, hamesha muskurate rehte hai aur pyar se kaam karte hai. 😊 Mere har kaam mein madad karte hai, chai se lekar dawa tak sab yaad rakhte hai. He is very patient and understands my needs without me even saying.",
    },
  ];

  if (!attendant) {
    return <div>Attendant not found</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <br />
      <br />
      <br />
      <div className="max-w-4xl mx-auto p-4 md:p-6 pt-24">
        {/* Profile Header */}
        <Card className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-xl shadow-sm border border-teal-100">
          <img
            src={attendant.profilePhoto || "/default-profile.png"}
            alt={attendant.fullName || attendant.organizationName}
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-md"
          />
          <div className="space-y-3 w-full">
            <h2 className="text-3xl font-bold text-teal-800">
              {attendant.fullName || attendant.organizationName}
            </h2>
            <p className="text-lg text-gray-600">
              {attendant.jobRole || attendant.serviceType}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start gap-3">
                <UserCheck
                  size={20}
                  className="text-teal-600 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="text-gray-700">
                    {attendant.experienceYears || attendant.yearsInBusiness}+
                    years
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <School
                  size={20}
                  className="text-teal-600 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="text-gray-700">GNM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartPulse
                  size={20}
                  className="text-teal-600 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-gray-500">Native State</p>
                  <p className="text-gray-700">{attendant.district}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Services I Offer */}
        <Card className="bg-white rounded-xl shadow-sm border border-teal-100 mt-6">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 text-teal-800">
              <ClipboardList size={24} className="text-teal-600" />
              Services I offer
            </h3>

            {/* Horizontal Service Boxes */}
            <div className="flex flex-wrap gap-4">
              {/* Mobility */}
              <div className="flex-1 min-w-[250px] p-4 border border-teal-100 rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-700 flex items-center gap-2 mb-3">
                  <HeartPulse size={18} /> Mobility
                </h4>
                <ul className="space-y-2">
                  {services.mobility.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-teal-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personal care */}
              <div className="flex-1 min-w-[250px] p-4 border border-teal-100 rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-700 flex items-center gap-2 mb-3">
                  <UserCheck size={18} /> Personal care
                </h4>
                <ul className="space-y-2">
                  {services.personalCare.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-teal-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hygiene */}
              <div className="flex-1 min-w-[250px] p-4 border border-teal-100 rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-700 flex items-center gap-2 mb-3">
                  <Droplet size={18} /> Hygiene
                </h4>
                <ul className="space-y-2">
                  {services.hygiene.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-teal-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutrition */}
              <div className="flex-1 min-w-[250px] p-4 border border-teal-100 rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-700 flex items-center gap-2 mb-3">
                  <Utensils size={18} /> Nutrition
                </h4>
                <ul className="space-y-2">
                  {services.nutrition.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-teal-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="flex-1 min-w-[250px] p-4 border border-teal-100 rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-700 flex items-center gap-2 mb-3">
                  <UserCheck size={18} /> Support
                </h4>
                <ul className="space-y-2">
                  {services.support.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-teal-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* I can also help you with */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-teal-800 mb-3">
                I can also help you with
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {services.additionalHelp.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-teal-50 rounded"
                  >
                    <CheckCircle
                      size={16}
                      className="text-teal-500 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Here's what other customers say about me */}
        <Card className="bg-white rounded-xl shadow-sm border border-teal-100 mt-6">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-teal-800">
              Here&apos;s what other customers say about me
            </h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border-l-4 border-teal-600 bg-teal-50 space-y-2"
                >
                  <p className="font-medium text-teal-800">{review.name}</p>
                  <p className="text-gray-700 italic">
                    &quot;{review.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Button */}
        <div className="text-center pt-6">
          <a
            href={`https://wa.me/+919220249040?text=${encodeURIComponent(
              `https://zense.in/attendant/${name}\n\nI would like to book ${attendant.fullName}'s services via Zense.\nCan I get details?`
            )}`}
            className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors duration-200 inline-block text-center"
          >
            Contact {attendant.fullName?.split(" ")[0] || "Caregiver"}
          </a>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </main>
  );
}

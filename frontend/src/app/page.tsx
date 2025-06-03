'use client';
import Lottie from "lottie-react";
import animationData from "../../public/animation/phone.json";
import Image from "next/image";
import Link from "next/link";
export default function Homepage(){
    return(
   <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <Lottie animationData={animationData} className="w-64 h-64 mb-4" />
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Campus Connect</h1>
      <p className="mb-4">Plateforme de communication pour le campus universitaire.</p>

      <Link href="/login">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </Link>
    </div>
    );
}
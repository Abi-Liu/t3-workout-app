import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Welcome to your own personal fitness tracker
          </h1>
          <p className="py-6">
            Create your own diet plans and workout routines to achieve your
            dream body.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

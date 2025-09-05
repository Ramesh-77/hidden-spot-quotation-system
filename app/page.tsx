"use client";

import Footer from "./(pages)/Footer/Footer";
import Header from "./(pages)/Header/Header";
import Quote from "./(pages)/Quote/page";

export default function Home() {
  const title = `Plan Smarter with Hidden Spot - Get Instant Catering & Event Quotes`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* Main content grows to push footer down */}
      <main className="flex-grow">
        <div className="my-4 flex flex-col gap-5">
          <p className="text-center font-semibold text-xl">{title}</p>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 shadow-md p-5 my-3">
            <Quote />
          </div>
        </div>
      </main>
      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

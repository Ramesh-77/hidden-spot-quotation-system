"use client";
import Quote from "./(pages)/Quote/page";

export default function Home() {
  // const about_hidden_spot = `At Hidden Spot, we believe planning events should be exciting, not
  //           stressful. Whether you’re organizing a wedding, corporate gathering,
  //           or private party, our quotation system helps you plan with
  //           confidence. With accurate pricing, customizable menus, and instant
  //           PDF quotes, we bring transparency and convenience right to your
  //           fingertips.`;
  const title = `Plan Smarter with Hidden Spot - Get Instant Catering & Event Quotes`
  return (
    <>
      <div>
        <div className="my-4 flex flex-col gap-5">
          {/* <p className="text-lg px-5">{about_hidden_spot}</p> */}
          <p className="text-center font-semibold text-xl">
            {title}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 shadow-md p-5 my-3">
            <Quote />
          </div>
        </div>
      </div>
    </>
  );
}

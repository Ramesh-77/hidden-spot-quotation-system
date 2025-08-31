"use client";
import Button from "./components/ui/Button";

export default function Home() {
  const handleClick = () => {
    console.log("object");
  };
  return (
    <>
      <Button text="Submit" size="medium" variant="primary" onClick={handleClick} />
    </>
  );
}

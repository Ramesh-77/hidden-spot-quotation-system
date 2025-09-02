// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black py-5 text-gray-300">
      {/* Divider */}
      <div>
        <p className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} HiddenSpot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

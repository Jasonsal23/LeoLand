import RSVPForm from "./_components/RSVPForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Image src="/maininvitation.png" alt="cover" width={1200} height={600} />
      <RSVPForm />

      {/* Clickable logo without <a> */}
      <Link href="/login">
        <Image src="/mainlogo.jpg" alt="Logo" width={1200} height={600} />
      </Link>
    </main>
  );
}

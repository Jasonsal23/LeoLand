import RSVPForm from "./_components/RSVPForm";
import Logo from "./_components/logo.jpg";
import Invitation from "./_components/invitation.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Image src={Invitation} alt="cover" className="w-full" />
      
      <RSVPForm />
      <Image src={Logo} alt="cover" className="w-full" />
    </main>
  );
}

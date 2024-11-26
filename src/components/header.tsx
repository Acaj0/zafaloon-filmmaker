import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="container mx-auto py-6">
      <Link href="/" className="block w-fit mx-auto">
        <Image
          src="/logo.png"
          alt="Zafaloon Filmmaker"
          width={300}
          height={60}
          className="h-auto"
        />
      </Link>
    </header>
  );
}

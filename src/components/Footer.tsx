import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <div className="flex items-center justify-center mx-auto px-4 max-w-4xl ">
        <div className="flex items-center justify-between gap-20">
          <div>
            <Link href="/" className="block w-fit mx-auto">
              <Image
                src="/logo.png"
                alt="Zafaloon Filmmaker"
                width={300}
                height={60}
                className="h-auto"
              />
            </Link>
          </div>
          <div className="flex items-start justify-start flex-col">
            <li className="hover:underline">
              <a href="/">Home</a>
            </li>
            <li className="hover:underline">
              <a href="/login">Login</a>
            </li>
            <li className="hover:underline">
              <a href="/dashboard">Dashboard</a>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <div className="flex items-center justify-center mx-auto px-4 max-w-4xl ">
        <div className="flex items-center justify-between mb-10 gap-10">
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
            <a className="hover:underline" href="/">
              Home
            </a>

            <a className="hover:underline" href="/dashboard">
              Painel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

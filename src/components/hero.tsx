import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Instagram, PhoneIcon as WhatsApp } from 'lucide-react'

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src="/zadfa.png"
            alt="Profile photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xl leading-relaxed">
              Meu nome é Guilherme Zafalon estou desde 2017 produzindo filmes. 
              Agora, em 2024, estou no mercado audiovisual, produzindo conteúdos 
              para diferentes empresas e pessoas.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://instagram.com/zafaloon" target="_blank">
              <Button variant="outline" size="icon">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://wa.me/+5500000000000" target="_blank">
              <Button variant="outline" size="icon">
                <WhatsApp className="w-5 h-5" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </Link>
          </div>
          <Button variant="default" className="w-full md:w-auto">
            Sobre mim
          </Button>
        </div>
      </div>
    </section>
  )
}


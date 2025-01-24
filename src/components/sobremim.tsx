import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Timeline, TimelineItem } from "./ui/timeline";

export default function Sobremim() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <Image
            src="/zadfa.png"
            alt="Guilherme Zafalon"
            width={270}
            height={150}
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold mb-4">
            Bem-vindo ao meu portfólio
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sou um filmmaker profissional com paixão por contar histórias
            através de imagens.
          </p>
        </section>

        {/* About Me Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Sobre Mim</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Comecei a produzir vídeos de forma amadora em 2017 e, desde
                então, venho aprimorando minhas habilidades. Atualmente,
                trabalho profissionalmente há um ano, oferecendo serviços de
                produção de conteúdo para agências e projetos individuais. Minha
                jornada começou durante um trabalho escolar, onde descobri minha
                paixão pela 7ª arte. Desde então, tenho trabalhado com diversas
                empresas de diferentes segmentos, sempre buscando agregar valor
                às marcas pessoais de meus clientes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Minha Jornada</h2>
          <Timeline>
            <TimelineItem
              year="2017"
              title="Conclusão do Ensino Médio"
              description="Colégio Salesiano Santo Antônio"
            />
            <TimelineItem
              year="2018"
              title="Ingresso na Universidade"
              description="Publicidade e Propaganda na UNIC"
            />
            <TimelineItem
              year="2020"
              title="Projeto Paralelo"
              description="Criação de um bar itinerante e desenvolvimento da identidade visual"
            />
            <TimelineItem
              year="2022"
              title="Retorno à Universidade"
              description="Retomada do curso de Publicidade e Propaganda"
            />
            <TimelineItem
              year="2022"
              title="Início como Filmmaker Profissional"
              description="Oferta de serviços de produção de vídeo"
            />
            <TimelineItem
              year="2023"
              title="Conclusão da Faculdade de Publicidade e Propaganda"
              description="Com direito a Prêmio Centro América de Criação Publicitária "
            />
          </Timeline>
          <Image
            src="/foto1912.jpg"
            alt="Guilherme Zafalon"
            width={400}
            height={150}
            className="rounded-full mx-auto mb-2 mt-10"
          />
        </section>
      </main>
    </div>
  );
}

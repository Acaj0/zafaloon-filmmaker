import { Footer } from "@/components/Footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { InstagramFeed } from "@/components/instagram-feed"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <InstagramFeed/>
      <Footer/>
    </main>
  )
}


'use client'

import { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface InstagramPostProps {
  url: string
}

function InstagramPost({ url }: InstagramPostProps) {
  useEffect(() => {
    // Load Instagram embed script if not present
    if (!window.instgrm) {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else {
      // If script is already loaded, process this embed
      window.instgrm.Embeds.process()
    }
  }, [url])

  return (
    <Card>
      <CardContent className="p-0">
        <blockquote
          className="instagram-media w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        />
      </CardContent>
    </Card>
  )
}

export function InstagramFeed() {
  const posts = [
    'https://www.instagram.com/reel/C02dkIrRdu4/?utm_source=ig_web_copy_link',
    'https://www.instagram.com/reel/C1IoQJFu1z2/?utm_source=ig_web_copy_link',
    'https://www.instagram.com/reel/C0Htv_BJeMU/?utm_source=ig_web_copy_link',
    'https://www.instagram.com/reel/CzTeZR5LTum/?utm_source=ig_web_copy_link',
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        VEJA UM POUCO DO MEU TRABALHO
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {posts.map((url, index) => (
          <InstagramPost key={index} url={url} />
        ))}
      </div>
    </section>
  )
}


export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row mx-auto px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js and Cloudflare. The ultimate AI Companion experience.
        </p>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Character. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

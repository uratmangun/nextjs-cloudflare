import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl"></div>
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
          Next.js on Cloudflare Pages
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Lightning-fast edge deployment with Next.js 14, TypeScript, and Cloudflare Workers runtime
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/features"
            className="btn-primary px-8 py-3 text-lg"
          >
            Get Started
          </Link>
          <Link
            href="/api-test"
            className="btn-outline px-8 py-3 text-lg"
          >
            Test API Routes
          </Link>
        </div>
        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Deployed globally on Cloudflare's edge network • Sub-50ms response times
          </p>
        </div>
      </div>
    </section>
  );
}
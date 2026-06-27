export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.05] py-8 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/20">
          SM.DEV
        </span>
        <span className="font-mono text-[11px] tracking-[0.15em] text-white/15">
          © {year} Shankar Mattavelli — All rights reserved
        </span>
      </div>
    </footer>
  )
}

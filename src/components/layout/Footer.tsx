export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-6 md:px-10 py-5"
      style={{
        backgroundColor: '#0f0d28',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        <div
          style={{
            width: 22,
            height: 22,
            backgroundColor: 'rgba(255,255,255,0.18)',
            WebkitMaskImage: 'url(/logo.png)',
            maskImage: 'url(/logo.png)',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            flexShrink: 0,
          }}
        />
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/15">
          © {year} Shankar Mattavelli — All rights reserved
        </span>
      </div>
    </footer>
  )
}

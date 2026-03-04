import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 mt-auto">
      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#655E78]">&copy; {new Date().getFullYear()} The Lunar Playground</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#655E78]">
            <Link href="/shop" className="hover:text-[#2D2640] transition-colors">Readings</Link>
            <Link href="/blog" className="hover:text-[#2D2640] transition-colors">Blog</Link>
            <Link href="/reviews" className="hover:text-[#2D2640] transition-colors">Reviews</Link>
            <Link href="/faq" className="hover:text-[#2D2640] transition-colors">FAQ</Link>
            <a href="mailto:thelunarplayground@gmail.com" className="hover:text-[#2D2640] transition-colors">Contact</a>
            <Link href="/privacy" className="hover:text-[#2D2640] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#2D2640] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

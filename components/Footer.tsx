import Link from 'next/link';
import { MessageSquare, Mail, MapPin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-card/40 mt-auto">
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <MessageSquare size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground tracking-tight">CommentCraft</span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
            Pixel-perfect comment screenshot generator for TikTok, Instagram, YouTube and X.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Twitter size={14} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Instagram size={14} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Youtube size={14} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Facebook size={14} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-3">Product</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><Link href="/bulk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bulk Generator</Link></li>
            <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-3">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={13} className="text-primary flex-shrink-0" />
              hello@commentcraft.com
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={13} className="text-primary flex-shrink-0" />
              Stockholm, Sweden
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CommentCraft. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

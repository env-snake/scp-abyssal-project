import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-primary/20 transition-all duration-300 ${
      scrolled ? 'bg-[#051510]/95' : 'bg-[#051510]/90'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
          <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#about" className={`nav-link hover:text-primary transition-colors tracking-wide flex items-center gap-2 ${activeSection === 'about' ? 'active' : ''}`}>
            <Icon name="Info" size={16} />
            О проекте
          </a>
          <a href="#features" className={`nav-link hover:text-primary transition-colors tracking-wide flex items-center gap-2 ${activeSection === 'features' ? 'active' : ''}`}>
            <Icon name="Sparkles" size={16} />
            Особенности
          </a>
          <a href="#play" className={`nav-link hover:text-primary transition-colors tracking-wide flex items-center gap-2 ${activeSection === 'play' ? 'active' : ''}`}>
            <Icon name="Gamepad2" size={16} />
            Играть
          </a>
          <a href="#team" className={`nav-link hover:text-primary transition-colors tracking-wide flex items-center gap-2 ${activeSection === 'team' ? 'active' : ''}`}>
            <Icon name="Users" size={16} />
            Команда
          </a>
          <a href="#info" className={`nav-link hover:text-primary transition-colors tracking-wide flex items-center gap-2 ${activeSection === 'info' ? 'active' : ''}`}>
            <Icon name="Link" size={16} />
            Ссылки
          </a>
        </nav>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = '/donate'}
            className="group relative px-8 py-3 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full border-2 border-primary text-white font-bold text-sm tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(29,185,84,0.5)] overflow-hidden"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Icon name="Wallet" size={18} />
              Пополнить баланс
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
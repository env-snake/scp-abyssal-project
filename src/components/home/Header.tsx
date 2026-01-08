import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
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
          <Button 
            className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300 px-6"
            onClick={() => window.location.href = '/donate'}
          >
            Донат
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
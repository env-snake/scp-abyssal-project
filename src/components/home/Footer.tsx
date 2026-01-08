import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-8 relative z-10 bg-[#051510]/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-8 h-8" />
            <span className="text-sm tracking-wider opacity-80">© 2025 ABYSSAL. Все права защищены</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-4 opacity-70">
              <a href="/terms" className="hover:text-primary transition-colors">Оферта</a>
              <span>|</span>
              <a href="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="opacity-60">Способы оплаты:</span>
              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-4 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Mir_logo.svg" alt="МИР" className="h-3 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/SBP_logo.svg" alt="СБП" className="h-4 opacity-70" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://discord.gg/jXuuBA9GXr" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300">
              <Icon name="MessageCircle" size={20} />
            </a>
            <a href="https://www.youtube.com/@newmzmeyleveldesign" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300">
              <Icon name="Youtube" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Icon from '@/components/ui/icon';

interface FooterProps {
  bgColor?: string;
}

const Footer = ({ bgColor = 'rgba(5, 21, 16, 0.9)' }: FooterProps) => {
  return (
    <footer 
      className="border-t border-primary/20 py-8 relative z-10 backdrop-blur-sm transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-8 h-8" />
            <span className="text-sm tracking-wider opacity-80">© 2026 ABYSSAL. Все права защищены</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <a href="mailto:contact@abyssalscp.ru" className="flex items-center gap-2 opacity-70 hover:text-primary hover:opacity-100 transition-all">
              <Icon name="Mail" size={16} />
              <span className="text-sm">contact@abyssalscp.ru</span>
            </a>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-4 opacity-70">
                <a href="/terms" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Icon name="FileText" size={14} />
                  <span>Оферта</span>
                </a>
                <span>|</span>
                <a href="/privacy" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Icon name="Shield" size={14} />
                  <span>Политика конфиденциальности</span>
                </a>
                <span>|</span>
                <a href="/refund" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Icon name="RefreshCw" size={14} />
                  <span>Политика возврата</span>
                </a>
                <span>|</span>
                <a href="/services" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Icon name="Package" size={14} />
                  <span>Услуги</span>
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="opacity-60">Способы оплаты:</span>
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-4 opacity-70" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-70" />
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded opacity-70" style={{ fontFamily: 'Montserrat, sans-serif' }}>МИР</span>
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded opacity-70" style={{ fontFamily: 'Montserrat, sans-serif' }}>СБП</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="https://discord.gg/jXuuBA9GXr" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300">
              <Icon name="MessageCircle" size={20} />
            </a>
            <a href="https://www.youtube.com/@env_snake" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300">
              <Icon name="Youtube" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
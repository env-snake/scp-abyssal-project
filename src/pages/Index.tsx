import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['about', 'features', 'team', 'info'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: 'Waves',
      title: 'Глубоководная локация',
      description: 'Уникальная подводная зона на дне океана с пугающей и глубоководной атмосферой',
    },
    {
      icon: 'Settings',
      title: 'Уникальные системы',
      description: 'Затопление комплекса, система миссий, система рейдов',
    },
    {
      icon: 'Zap',
      title: 'Динамические события',
      description: 'Прорыв SCP объектов, аварийные ситуации на станции, исследовательские миссии на дне океана',
    },
    {
      icon: 'Mic',
      title: 'Собственная озвучка',
      description: 'Профессиональная озвучка персонажей и событий создаёт полное погружение в атмосферу станции',
    },
    {
      icon: 'Lock',
      title: 'Аномалии',
      description: 'Уникальные подводные объекты и существа, требующие особых протоколов содержания',
    },
    {
      icon: 'Users',
      title: 'Ролевая игра',
      description: 'Развитая система ролей: исследователи, охрана, научный персонал, D-класс и другие роли',
    },
  ];

  const team = [
    { name: 'Baltica', role: 'Владелец сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Atu', role: 'Владелец сообщества', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'CEO', role: 'Ведущий разработчик систем', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Snake', role: 'Ведущий разработчик карты', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'Golup', role: '3D artist', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
    { name: 'NoName', role: 'Разработчик Discord бота', image: 'https://cdn.poehali.dev/files/31199a1a-f99f-4780-b831-6ff4e1991487.png' },
  ];





  const bubbles = [...Array(30)].map((_, i) => ({
    left: Math.random() * 100,
    size: Math.random() * 15 + 8,
    duration: Math.random() * 15 + 25,
    delay: Math.random() * 40,
  }));

  const depthProgress = Math.min(scrollY / 2500, 1);
  const bgOpacity = 0.05 + depthProgress * 0.15;

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#051510]">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" style={{ opacity: bgOpacity }}></div>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `-${bubble.delay}s`,
            }}
          />
        ))}
      </div>
      
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-0"
        style={{ opacity: depthProgress * 0.4 }}
      ></div>


      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#about" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'about' ? 'active' : ''}`}>
              О проекте
            </a>
            <a href="#features" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'features' ? 'active' : ''}`}>
              Особенности
            </a>
            <a href="#team" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'team' ? 'active' : ''}`}>
              Команда
            </a>
          </nav>
          <div className="flex gap-4">
            <Button className="corner-bracket bg-primary text-black hover:bg-primary/80 px-6">
              Подключиться
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          className="min-h-screen flex items-center justify-center relative pt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#051510]/50 via-transparent to-transparent"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-12 animate-fade-in flex items-center justify-center gap-8" style={{ animationDelay: '0.2s' }}>
              <img 
                src="https://cdn.poehali.dev/files/fe990dfb-c590-4ee5-b575-5f5888df05bb.png" 
                alt="Abyssal SCP RP" 
                className="w-full max-w-2xl h-auto opacity-90 select-none pointer-events-none"
                draggable="false"
              />
            </div>
            <p className="text-lg md:text-2xl mb-12 tracking-wide opacity-90 animate-fade-in max-w-4xl mx-auto font-bold" style={{ animationDelay: '0.4s', fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-primary">Abyssal</span> — это уникальный <span className="text-primary">SCP RP</span> проект разработанный на базе игры <span className="text-primary">Garry's Mod</span>,<br />
              который предлагает своим игрокам погрузиться в мир <span className="text-primary">океанской бездны</span>
            </p>
            <a href="#about" className="flex justify-center items-center gap-2 animate-bounce cursor-pointer" style={{ animationDelay: '1s' }}>
              <Icon name="ChevronDown" size={20} />
              <span className="text-sm tracking-widest">Прокрутить</span>
            </a>
          </div>
        </section>

        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-4xl font-bold tracking-wide">О ПРОЕКТЕ</h3>
                </div>

                <div className="space-y-6">
                  <div className="info-bar border-l-2 border-primary pl-4 py-4 animate-fade-in cursor-pointer" style={{ animationDelay: '0.2s' }}>
                    <div className="text-sm tracking-wider mb-2 text-primary">01</div>
                    <h4 className="text-xl font-bold mb-2">Abyssal SCP RP</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Abyssal — это уникальный SCP RP проект разработанный на базе игры Garry's Mod, 
                      который предлагает своим игрокам погрузиться в мир океанской бездны.
                    </p>
                  </div>

                  <div className="info-bar border-l-2 border-white/20 pl-4 py-4 animate-fade-in cursor-pointer" style={{ animationDelay: '0.4s' }}>
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">02</div>
                    <h4 className="text-xl font-bold mb-2">Ролевой проект</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Станьте частью команды станции 119, расположенной на глубине 3800 метров. 
                      Исследуйте аномальные объекты, поддерживайте протоколы безопасности, 
                      взаимодействуйте с другими игроками под огромным давлением океанской бездны.
                    </p>
                  </div>

                  <div className="info-bar border-l-2 border-white/20 pl-4 py-4 animate-fade-in cursor-pointer" style={{ animationDelay: '0.6s' }}>
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">03</div>
                    <h4 className="text-xl font-bold mb-2">Выживание</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Каждое решение может стоить жизни экипажу. Прорывы SCP объектов, 
                      технические аварии, угрозы из глубин — готовы ли вы погрузиться в бездну?
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="corner-bracket aspect-square bg-gradient-to-br from-primary/20 to-transparent grid-bg p-8 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/files/24a714af-6942-423f-9d65-d1abc526b450.png"
                    alt="Abyssal Station"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 animate-fade-in">
              <h3 className="text-5xl font-bold tracking-wide mb-6">ОСОБЕННОСТИ</h3>
              <p className="text-sm leading-relaxed opacity-80 max-w-2xl">
                Наш сервер предлагает уникальный контент для своих игроков, включающий:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-[#0a1f18]/50 border-white/10 hover:border-primary transition-all grid-bg animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="w-10 h-10 border border-primary flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="text-primary" size={20} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 tracking-wide">{feature.title}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>



        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center animate-fade-in">
              <h3 className="text-5xl font-bold tracking-wide mb-4">НАША КОМАНДА</h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-sm opacity-70 max-w-3xl mx-auto">
                Познакомьтесь с энтузиастами, которые постоянно работают над созданием и поддержкой уникального игрового опыта
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="border border-white/10 hover:border-primary transition-all p-6 grid-bg bg-[#0a1f18]/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden flex-shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold tracking-wide">{member.name}</h4>
                      <p className="text-xs tracking-wider opacity-60">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="info" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center animate-fade-in">
              <h3 className="text-5xl font-bold tracking-wide mb-4">ИНФОРМАЦИЯ</h3>
              <div className="w-16 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <a 
                href="https://discord.gg/z9P7mMHbQv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white/10 hover:border-primary transition-all block"
              >
                <div className="w-full p-6 flex items-center justify-between">
                  <span className="text-xl tracking-wide">Discord Server</span>
                  <Icon name="ExternalLink" size={24} />
                </div>
              </a>

              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Правила сервера</span>
                  <Icon name="FileText" size={24} />
                </button>
              </div>

              <div className="border border-white/10 p-6">
                <h4 className="text-xl tracking-wide mb-4">Полезные ссылки</h4>
                <div className="space-y-3">
                  <a 
                    href="https://steamcommunity.com/sharedfiles/filedetails/?id=3361006309" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    <Icon name="Download" size={20} />
                    <span>Steam Workshop коллекция</span>
                    <Icon name="ExternalLink" size={16} className="ml-auto" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@newmzmeyleveldesign" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    <Icon name="Youtube" size={20} />
                    <span>YouTube канал</span>
                    <Icon name="ExternalLink" size={16} className="ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a href="https://discord.gg/z9P7mMHbQv" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="Discord">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="https://www.youtube.com/@newmzmeyleveldesign" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="YouTube">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3361006309" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="Steam Collection">
                <Icon name="Download" size={20} />
              </a>
            </div>
            <p className="text-sm opacity-50 tracking-wide">
              Abyssal Project 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
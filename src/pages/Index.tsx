import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredTab, setHoveredTab] = useState<number>(1);
  const [autoScrollTab, setAutoScrollTab] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScrollTab((prev) => (prev >= 3 ? 1 : prev + 1));
      setHoveredTab((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['info', 'team', 'play', 'collage', 'features', 'about'];
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const bubbles: HTMLDivElement[] = [];
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 40 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      document.body.appendChild(bubble);
      bubbles.push(bubble);

      setTimeout(() => {
        bubble.remove();
        const index = bubbles.indexOf(bubble);
        if (index > -1) bubbles.splice(index, 1);
      }, (Math.random() * 10 + 15) * 1000);
    };

    const interval = setInterval(createBubble, 2000);
    for (let i = 0; i < 8; i++) {
      setTimeout(createBubble, i * 500);
    }

    return () => {
      clearInterval(interval);
      bubbles.forEach(b => b.remove());
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
      description: 'Уникальная озвучка событий создаёт полное погружение в атмосферу игры',
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

  const [hoveredPlayStep, setHoveredPlayStep] = useState<number>(1);

  const team = [
    { name: 'Baltica', role: 'Владелец сообщества', image: 'https://i.imgur.com/riJ3JPA.png' },
    { name: 'Atu', role: 'Владелец сообщества', image: 'https://i.imgur.com/FkFWiLi.png' },
    { name: 'CEO', role: 'Ведущий разработчик систем', image: 'https://i.imgur.com/lhNoGIM.png' },
    { name: 'Snake', role: 'Ведущий разработчик карты', image: 'https://i.imgur.com/R5GqTmZ.png' },
  ];

  const getAboutImage = () => {
    if (hoveredTab === 1) return 'https://i.imgur.com/7UJtih9.png';
    if (hoveredTab === 2) return 'https://i.imgur.com/naKCHlU.png';
    if (hoveredTab === 3) return 'https://i.imgur.com/zcrXkEs.png';
    return 'https://i.imgur.com/7UJtih9.png';
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#051510]">
      <div 
        className="fixed pointer-events-none z-0 rounded-full blur-3xl transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, transparent 70%)',
        }}
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
            <a href="#play" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'play' ? 'active' : ''}`}>
              Играть
            </a>
            <a href="#team" className={`nav-link hover:text-primary transition-colors tracking-wide ${activeSection === 'team' ? 'active' : ''}`}>
              Команда
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

      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center relative pt-20">
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
                  <div 
                    className={`info-bar-grid border-l-2 pl-4 py-4 animate-fade-in cursor-pointer relative overflow-hidden ${
                      hoveredTab === 1 ? 'border-primary' : 'border-white/20 hover:border-primary'
                    }`}
                    style={{ animationDelay: '0.2s' }}
                    onMouseEnter={() => setHoveredTab(1)}
                  >
                    <div className={`text-sm tracking-wider mb-2 transition-colors duration-300 ${
                      hoveredTab === 1 ? 'text-primary' : 'text-muted-foreground'
                    }`}>01</div>
                    <h4 className="text-xl font-bold mb-2">Abyssal SCP RP</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Abyssal — это уникальный SCP RP проект разработанный на базе игры Garry's Mod, который предлагает своим игрокам погрузиться в мир океанской бездны.
                    </p>
                  </div>

                  <div 
                    className={`info-bar-grid border-l-2 pl-4 py-4 animate-fade-in cursor-pointer relative overflow-hidden ${
                      hoveredTab === 2 ? 'border-primary' : 'border-white/20 hover:border-primary'
                    }`}
                    style={{ animationDelay: '0.4s' }}
                    onMouseEnter={() => setHoveredTab(2)}
                  >
                    <div className={`text-sm tracking-wider mb-2 transition-colors duration-300 ${
                      hoveredTab === 2 ? 'text-primary' : 'text-muted-foreground'
                    }`}>02</div>
                    <h4 className="text-xl font-bold mb-2">Ролевой проект</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Станьте частью команды станции 119, расположенной на глубине 3800 метров. Исследуйте аномальные объекты, поддерживайте протоколы безопасности, взаимодействуйте с другими игроками под огромным давлением океанской бездны.
                    </p>
                  </div>

                  <div 
                    className={`info-bar-grid border-l-2 pl-4 py-4 animate-fade-in cursor-pointer relative overflow-hidden ${
                      hoveredTab === 3 ? 'border-primary' : 'border-white/20 hover:border-primary'
                    }`}
                    style={{ animationDelay: '0.6s' }}
                    onMouseEnter={() => setHoveredTab(3)}
                  >
                    <div className={`text-sm tracking-wider mb-2 transition-colors duration-300 ${
                      hoveredTab === 3 ? 'text-primary' : 'text-muted-foreground'
                    }`}>03</div>
                    <h4 className="text-xl font-bold mb-2">Выживание</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Каждое решение может стоить жизни экипажу. Прорывы SCP объектов, технические аварии, угрозы из глубин — готовы ли вы погрузиться в бездну?
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in relative" style={{ animationDelay: '0.8s' }}>
                <img
                  key={hoveredTab}
                  src={getAboutImage()}
                  alt="Станция 119"
                  className="w-full h-auto rounded-lg shadow-2xl transition-opacity duration-500 ease-in-out"
                  style={{ animation: 'fadeInImage 0.5s ease-in-out' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 animate-fade-in">
              <h3 className="text-4xl font-bold tracking-wide mb-4">ОСОБЕННОСТИ</h3>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Наш сервер предлагает уникальный контент для своих игроков, включающий:
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="info-bar-grid p-6 bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary transition-all duration-500 hover:bg-card/70 animate-fade-in cursor-pointer relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg transition-all duration-500 shrink-0">
                      <Icon name={feature.icon} size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                      <p className="text-sm leading-relaxed opacity-80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="collage" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="animate-fade-in">
              <img
                src="https://cdn.poehali.dev/files/d9980373-83f5-4739-b193-93f003012c87.png"
                alt="Коллаж проекта"
                className="w-full h-auto rounded-lg shadow-2xl transition-all duration-700"
              />
            </div>
          </div>
        </section>

        <section id="play" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 animate-fade-in">
              <h3 className="text-4xl font-bold tracking-wide mb-4">ИГРАТЬ</h3>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Три простых шага для входа на сервер
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div 
                className={`info-bar-grid border-l-2 pl-6 py-6 animate-fade-in transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  hoveredPlayStep === 1 ? 'border-primary' : 'border-white/20 hover:border-primary'
                }`}
                style={{ animationDelay: '0.2s' }}
                onMouseEnter={() => setHoveredPlayStep(1)}
                onClick={() => window.open('https://store.steampowered.com/app/4000/Garrys_Mod/', '_blank')}
              >
                <div className={`text-sm tracking-wider mb-3 font-bold transition-colors duration-300 ${
                  hoveredPlayStep === 1 ? 'text-primary' : 'text-muted-foreground'
                }`}>ШАГ 1</div>
                <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  Установить Garry's Mod
                  <Icon name="ExternalLink" size={20} className="text-primary" />
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  Установите Garry's Mod через Steam. Если игры нет в вашей библиотеке, потребуется её приобрести.
                </p>
              </div>

              <div 
                className={`info-bar-grid border-l-2 pl-6 py-6 animate-fade-in transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  hoveredPlayStep === 2 ? 'border-primary' : 'border-white/20 hover:border-primary'
                }`}
                style={{ animationDelay: '0.4s' }}
                onMouseEnter={() => setHoveredPlayStep(2)}
                onClick={() => window.open('https://steamcommunity.com/sharedfiles/filedetails/?id=YOUR_COLLECTION_ID', '_blank')}
              >
                <div className={`text-sm tracking-wider mb-3 font-bold transition-colors duration-300 ${
                  hoveredPlayStep === 2 ? 'text-primary' : 'text-muted-foreground'
                }`}>ШАГ 2</div>
                <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  Установить контент сервера
                  <Icon name="ExternalLink" size={20} className="text-primary" />
                </h4>
                <p className="text-base leading-relaxed opacity-80">
                  Перейдите в нашу Steam Workshop Collection и подпишитесь на необходимые файлы
                </p>
              </div>

              <div 
                className={`info-bar-grid border-l-2 pl-6 py-6 animate-fade-in transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  hoveredPlayStep === 3 ? 'border-primary' : 'border-white/20 hover:border-primary'
                }`}
                style={{ animationDelay: '0.6s' }}
                onMouseEnter={() => setHoveredPlayStep(3)}
              >
                <div className={`text-sm tracking-wider mb-3 font-bold transition-colors duration-300 ${
                  hoveredPlayStep === 3 ? 'text-primary' : 'text-muted-foreground'
                }`}>ШАГ 3</div>
                <h4 className="text-2xl font-bold mb-3">Зайдите на сервер</h4>
                <p className="text-base leading-relaxed opacity-80">
                  Дождитесь их загрузки, после чего запустите игру и подключитесь к серверу.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 animate-fade-in">
              <h3 className="text-4xl font-bold tracking-wide mb-4">НАША КОМАНДА</h3>
              <p className="text-lg opacity-80">
                Познакомьтесь с энтузиастами, которые постоянно работают над созданием и поддержкой уникального игрового опыта
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto justify-items-center">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="info-bar-grid p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:bg-card/70 animate-fade-in text-center relative overflow-hidden rounded-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-primary/50 transition-all duration-500 object-cover"
                  />
                  <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                  <p className="text-sm opacity-80">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="info" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 animate-fade-in">
              <h3 className="text-4xl font-bold tracking-wide mb-4">ПРИСОЕДИНЯЙТЕСЬ</h3>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Станьте частью сообщества Abyssal
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer">
                <Icon name="Gamepad2" size={48} className="text-primary mx-auto mb-4 transition-all duration-500" />
                <h4 className="text-2xl font-bold mb-4">Подключиться</h4>
                <p className="text-sm opacity-80 mb-6">
                  Зайдите на сервер и начните играть
                </p>
                <Button 
                  className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300"
                >
                  Играть сейчас
                </Button>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer" style={{ animationDelay: '0.1s' }}>
                <Icon name="FileText" size={48} className="text-primary mx-auto mb-4 transition-all duration-500" />
                <h4 className="text-2xl font-bold mb-4">Правила сервера</h4>
                <p className="text-sm opacity-80 mb-6">
                  Ознакомьтесь с правилами перед игрой
                </p>
                <Button 
                  className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300"
                  onClick={() => window.open('https://docs.google.com/document/d/1-kfYPFuVXjW8GpphXEhmNSu0ej3fMNtHBn-2HeK0oP0/edit', '_blank')}
                >
                  Читать правила
                </Button>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4 transition-all duration-500" />
                <h4 className="text-2xl font-bold mb-4">Discord сообщество</h4>
                <p className="text-sm opacity-80 mb-6">
                  Общайтесь с игроками и следите за новостями
                </p>
                <Button 
                  className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300"
                  onClick={() => window.open('https://discord.gg/jXuuBA9GXr', '_blank')}
                >
                  Присоединиться
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/20 py-8 relative z-10 bg-[#051510]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-8 h-8" />
              <span className="text-sm tracking-wider opacity-80">© 2025 ABYSSAL. Все права защищены</span>
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
    </div>
  );
};

export default Index;
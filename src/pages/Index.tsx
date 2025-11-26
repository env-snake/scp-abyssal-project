import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'Waves',
      title: 'Глубоководная локация',
      description: 'Уникальная подводная база на дне океана с реалистичной физикой и атмосферой',
    },
    {
      icon: 'Lock',
      title: 'SCP Foundation',
      description: 'Интеграция с вселенной SCP - аномалии, протоколы содержания, секретные документы',
    },
    {
      icon: 'Users',
      title: 'Ролевая игра',
      description: 'Развитая система ролей: исследователи, охрана, научный персонал, D-класс',
    },
    {
      icon: 'Zap',
      title: 'Динамические события',
      description: 'Прорывы контейнмента, аварийные ситуации, исследовательские миссии',
    },
    {
      icon: 'Radio',
      title: 'Коммуникации',
      description: 'Система внутренней связи, терминалы доступа, голосовой чат',
    },
    {
      icon: 'Shield',
      title: 'Система безопасности',
      description: 'Уровни допуска, биометрия, протоколы чрезвычайных ситуаций',
    },
  ];

  const team = [
    {
      name: 'Директор проекта',
      role: 'Главный разработчик',
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/ec82fe16-4195-444f-a285-6edec670b4a5.jpg',
    },
    {
      name: 'Технический директор',
      role: 'Программирование',
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/ec82fe16-4195-444f-a285-6edec670b4a5.jpg',
    },
    {
      name: 'Креативный директор',
      role: 'Дизайн и сюжет',
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/ec82fe16-4195-444f-a285-6edec670b4a5.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-[#00D9FF] relative overflow-hidden">
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D9FF] to-transparent animate-scan"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF88] rounded-full opacity-50 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/80 backdrop-blur-md border-b border-[#00D9FF]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Waves" className="text-[#00D9FF]" size={32} />
            <h1 className="text-2xl font-bold glow-text">ABYSSAL</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-[#00FF88] transition-colors">
              О проекте
            </a>
            <a href="#features" className="hover:text-[#00FF88] transition-colors">
              Особенности
            </a>
            <a href="#team" className="hover:text-[#00FF88] transition-colors">
              Команда
            </a>
          </nav>
          <Button className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00FF88] glow-border">
            Присоединиться
          </Button>
        </div>
      </header>

      <main>
        <section
          className="min-h-screen flex items-center justify-center relative pt-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/7e36d9e7-8f2a-4daa-b539-1f9c1824eef2.jpg')`,
              filter: 'blur(2px)',
            }}
          />

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block mb-6 px-4 py-2 border border-[#00D9FF] rounded-full text-sm animate-pulse-glow">
              CLASSIFIED: LEVEL 4 CLEARANCE REQUIRED
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-6 glow-text animate-fade-in-up">
              ABYSSAL
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-[#00FF88] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Глубоководный исследовательский комплекс SCP Foundation
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Погрузитесь в мир аномалий на глубине 8000 метров. Выживание, исследования, секреты океанской бездны.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00FF88] glow-border">
                <Icon name="Play" className="mr-2" size={20} />
                Начать игру
              </Button>
              <Button size="lg" variant="outline" className="border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10">
                <Icon name="FileText" className="mr-2" size={20} />
                Документация
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" className="text-[#00D9FF]" size={32} />
          </div>
        </section>

        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h3 className="text-4xl font-bold mb-6 glow-text">О проекте Abyssal</h3>
                <p className="text-lg mb-4 opacity-90">
                  <span className="text-[#00FF88]">Abyssal</span> — это уникальный RP-проект, объединяющий вселенную SCP Foundation
                  с атмосферой глубоководных исследований в духе игры SOMA.
                </p>
                <p className="text-lg mb-4 opacity-90">
                  Станьте частью секретной подводной базы, расположенной в самых глубоких точках океана.
                  Исследуйте аномальные объекты, поддерживайте протоколы безопасности, взаимодействуйте с командой.
                </p>
                <p className="text-lg opacity-90">
                  Здесь давление не только снаружи — каждое решение может стоить жизни экипажу.
                  Готовы ли вы погрузиться в бездну?
                </p>

                <div className="mt-8 flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#00D9FF] glow-text">8000м</div>
                    <div className="text-sm opacity-70">Глубина базы</div>
                  </div>
                  <div className="w-px bg-[#00D9FF]/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#00D9FF] glow-text">24/7</div>
                    <div className="text-sm opacity-70">Онлайн сервер</div>
                  </div>
                  <div className="w-px bg-[#00D9FF]/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#00D9FF] glow-text">50+</div>
                    <div className="text-sm opacity-70">SCP объектов</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative rounded-lg overflow-hidden glow-border">
                  <img
                    src="https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/188f68f1-f862-4240-9be1-ec09395de4ba.jpg"
                    alt="Abyssal Station"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative bg-[#001F3F]/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 glow-text">Особенности проекта</h3>
              <p className="text-lg opacity-80">Что делает Abyssal уникальным</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-[#0A1628]/80 border-[#00D9FF]/30 hover:border-[#00D9FF] transition-all hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center mb-4 glow-border">
                    <Icon name={feature.icon} className="text-[#00D9FF]" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-[#00D9FF]">{feature.title}</h4>
                  <p className="opacity-80">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 glow-text">Команда разработчиков</h3>
              <p className="text-lg opacity-80">Создатели проекта Abyssal</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative inline-block mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover glow-border"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
                  </div>
                  <h4 className="text-xl font-bold mb-1 text-[#00D9FF]">{member.name}</h4>
                  <p className="text-[#00FF88]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative bg-[#001F3F]/50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6 glow-text">Готовы погрузиться?</h3>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Присоединяйтесь к исследовательской команде Abyssal и станьте частью уникального подводного сообщества
            </p>
            <Button size="lg" className="bg-[#00D9FF] text-[#0A1628] hover:bg-[#00FF88] glow-border">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать клиент
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[#00D9FF]/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Waves" className="text-[#00D9FF]" size={24} />
              <span className="font-bold">ABYSSAL</span>
            </div>
            <p className="text-sm opacity-70">
              © 2024 Abyssal Project. SCP Foundation Universe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00FF88] transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="hover:text-[#00FF88] transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="hover:text-[#00FF88] transition-colors">
                <Icon name="Github" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

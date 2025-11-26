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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden grid-bg">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-primary flex items-center justify-center">
              <Icon name="Waves" className="text-primary" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-primary transition-colors tracking-wide">
              About
            </a>
            <a href="#features" className="hover:text-primary transition-colors tracking-wide">
              Information
            </a>
            <a href="#team" className="hover:text-primary transition-colors tracking-wide">
              Team
            </a>
          </nav>
          <div className="flex gap-4">
            <Button className="corner-bracket bg-transparent border border-primary text-primary hover:bg-primary hover:text-black px-6">
              JOIN SERVER
            </Button>
            <Button className="corner-bracket bg-primary text-black hover:bg-primary/80 px-6">
              PLAY NOW
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section
          className="min-h-screen flex items-center justify-center relative pt-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/7e36d9e7-8f2a-4daa-b539-1f9c1824eef2.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8">
              <div className="text-6xl md:text-9xl font-black mb-4 tracking-wider">
                <div className="text-outline opacity-30 mb-2">SCP: ROLEPLAY</div>
                <div className="text-white">SCP: ROLEPLAY</div>
              </div>
            </div>
            <p className="text-lg md:text-xl mb-12 tracking-widest opacity-80">
              Secure. Contain. Protect
            </p>
            <div className="flex justify-center items-center gap-2 animate-bounce">
              <Icon name="ChevronDown" size={20} />
              <span className="text-sm tracking-widest">Scroll</span>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <div className="text-sm tracking-widest opacity-50 mb-2">ABOUT</div>
                  <div className="text-outline opacity-20 text-4xl font-bold mb-2">ABOUT</div>
                  <h3 className="text-4xl font-bold tracking-wide">ABOUT</h3>
                </div>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="text-sm tracking-wider mb-2 text-primary">01</div>
                    <h4 className="text-xl font-bold mb-2">Background</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      In this world, terrifying or unusual creatures and objects called SCPs roam the earth.
                      To protect humanity from them, the SCP Foundation was created. The Foundation conducts
                      experiments to learn more about the SCPs. The mission of the Foundation is to secure,
                      contain and protect the SCPs.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/20 pl-4">
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">02</div>
                    <h4 className="text-xl font-bold mb-2">Abyssal Project</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Глубоководный исследовательский комплекс на глубине 8000 метров. Уникальная
                      подводная база для содержания морских аномалий. Здесь давление не только снаружи —
                      каждое решение может стоить жизни экипажу.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/20 pl-4">
                    <div className="text-sm tracking-wider mb-2 text-muted-foreground">03</div>
                    <h4 className="text-xl font-bold mb-2">Gameplay</h4>
                    <p className="text-sm leading-relaxed opacity-80">
                      Станьте частью команды станции Abyssal. Исследуйте аномальные объекты,
                      поддерживайте протоколы безопасности, взаимодействуйте с другими игроками.
                      Готовы ли вы погрузиться в бездну?
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="corner-bracket">
                  <img
                    src="https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/188f68f1-f862-4240-9be1-ec09395de4ba.jpg"
                    alt="Abyssal Station"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <div className="text-sm tracking-widest opacity-50 mb-2">DISCOVER THE</div>
              <div className="text-outline opacity-20 text-5xl font-bold mb-2">POSSIBILITIES</div>
              <h3 className="text-5xl font-bold tracking-wide mb-6">POSSIBILITIES</h3>
              <p className="text-sm leading-relaxed opacity-80 max-w-2xl">
                The possibilities in this game are endless! You could go from building your own custom builds
                using F3X in a private server, to playing one of our different gamemodes, such as 3008!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.slice(0, 2).map((feature, index) => (
                <div key={index} className="corner-bracket p-8 bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-wide">{feature.title}</h4>
                      <p className="text-sm opacity-80 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {features.slice(2).map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-black border-white/10 hover:border-primary transition-all"
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

        <section className="py-32 relative bg-white/5">
          <div className="container mx-auto px-4">
            <div className="corner-bracket max-w-5xl mx-auto">
              <img
                src="https://cdn.poehali.dev/files/1b6095dd-cffa-4891-9795-15a73e9bff11.png"
                alt="Update Banner"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section id="team" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <div className="text-sm tracking-widest opacity-50 mb-2">INFORMATION</div>
              <div className="text-outline opacity-20 text-5xl font-bold mb-2">INFORMATION</div>
              <h3 className="text-5xl font-bold tracking-wide">INFORMATION</h3>
            </div>

            <div className="space-y-4 max-w-4xl">
              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Discord Server</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>

              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Команда разработчиков</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>

              <div className="border border-white/10 hover:border-primary transition-all">
                <button className="w-full p-6 flex items-center justify-between text-left">
                  <span className="text-xl tracking-wide">Content Creators</span>
                  <Icon name="Plus" size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Globe" size={20} />
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

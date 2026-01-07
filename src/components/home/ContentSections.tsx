import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContentSectionsProps {
  hoveredTab: number;
  setHoveredTab: (tab: number) => void;
  setIsHoveringTabs: (isHovering: boolean) => void;
}

const ContentSections = ({ hoveredTab, setHoveredTab, setIsHoveringTabs }: ContentSectionsProps) => {
  const [hoveredPlayStep, setHoveredPlayStep] = useState<number>(1);

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
    <>
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="animate-fade-in">
                <h3 className="text-4xl font-bold tracking-wide">О ПРОЕКТЕ</h3>
              </div>

              <div className="space-y-6" onMouseEnter={() => setIsHoveringTabs(true)} onMouseLeave={() => setIsHoveringTabs(false)}>
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

            <div className="animate-fade-in relative flex justify-center" style={{ animationDelay: '0.8s' }}>
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <img
                  key={hoveredTab}
                  src={getAboutImage()}
                  alt="Станция 119"
                  className="relative w-full h-auto rounded-full border-4 border-primary/50 shadow-2xl shadow-primary/30 transition-opacity duration-500 ease-in-out object-cover aspect-square"
                  style={{ animation: 'fadeInImage 0.5s ease-in-out' }}
                />
              </div>
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
              onClick={() => window.open('https://steamcommunity.com/sharedfiles/filedetails/?id=3361006309', '_blank')}
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
              onClick={() => window.location.href = 'steam://connect/212.22.85.156:25565'}
            >
              <div className={`text-sm tracking-wider mb-3 font-bold transition-colors duration-300 ${
                hoveredPlayStep === 3 ? 'text-primary' : 'text-muted-foreground'
              }`}>ШАГ 3</div>
              <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
                Зайдите на сервер
                <Icon name="Gamepad2" size={20} className="text-primary" />
              </h4>
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
            <Card className="info-bar-grid p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer relative overflow-hidden">
              <Icon name="Gamepad2" size={48} className="text-primary mx-auto mb-4 transition-all duration-500" />
              <h4 className="text-2xl font-bold mb-4">Подключиться</h4>
              <p className="text-sm opacity-80 mb-6">
                Зайдите на сервер и начните играть
              </p>
              <Button 
                className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300"
                onClick={() => window.location.href = 'steam://connect/212.22.85.156:25565'}
              >
                Играть сейчас
              </Button>
            </Card>

            <Card className="info-bar-grid p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
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

            <Card className="info-bar-grid p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 hover:bg-card/70 hover:scale-105 animate-fade-in text-center cursor-pointer relative overflow-hidden flex flex-col items-center" style={{ animationDelay: '0.2s' }}>
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
    </>
  );
};

export default ContentSections;
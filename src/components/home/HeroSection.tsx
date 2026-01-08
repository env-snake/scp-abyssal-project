import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  const [serverStatus, setServerStatus] = useState<{
    online: boolean;
    players: number;
    max_players: number;
  } | null>(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/9bf23c83-7d79-48cb-8ab4-50f3eea4d556');
        const data = await response.json();
        setServerStatus(data);
      } catch (error) {
        setServerStatus({ online: false, players: 0, max_players: 0 });
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
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
        <div className="flex flex-col items-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => window.location.href = 'steam://connect/212.22.85.156:25565'}
            className="group relative px-10 py-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full border-2 border-primary text-white font-bold text-lg tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(29,185,84,0.6)] overflow-hidden"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Icon name="Gamepad2" size={24} />
              Играть
            </span>
          </button>
          {serverStatus && (
            <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-primary/30">
              <div className={`w-2 h-2 rounded-full ${
                serverStatus.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium">
                {serverStatus.online 
                  ? `Игроки онлайн: ${serverStatus.players}/${serverStatus.max_players}`
                  : 'Сервер оффлайн'
                }
              </span>
            </div>
          )}
        </div>
        <a href="#about" className="flex justify-center items-center gap-2 animate-bounce cursor-pointer" style={{ animationDelay: '1s' }}>
          <Icon name="ChevronDown" size={20} />
          <span className="text-sm tracking-widest">Прокрутить</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
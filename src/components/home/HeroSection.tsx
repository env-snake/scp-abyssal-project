import Icon from '@/components/ui/icon';

const HeroSection = () => {
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
        <a href="#about" className="flex justify-center items-center gap-2 animate-bounce cursor-pointer" style={{ animationDelay: '1s' }}>
          <Icon name="ChevronDown" size={20} />
          <span className="text-sm tracking-widest">Прокрутить</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

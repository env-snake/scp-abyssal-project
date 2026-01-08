import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import ContentSections from '@/components/home/ContentSections';
import Footer from '@/components/home/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredTab, setHoveredTab] = useState<number>(1);
  const [autoScrollTab, setAutoScrollTab] = useState<number>(1);
  const [isHoveringTabs, setIsHoveringTabs] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveringTabs) {
        setAutoScrollTab((prev) => (prev >= 3 ? 1 : prev + 1));
        setHoveredTab((prev) => (prev >= 3 ? 1 : prev + 1));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHoveringTabs]);

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
      
      const scrollY = window.scrollY;
      const maxScroll = 800;
      const opacity = Math.min(scrollY / maxScroll, 0.7);
      setScrollOpacity(opacity);
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
      const duration = Math.random() * 10 + 15;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = '0s';
      document.body.appendChild(bubble);
      bubbles.push(bubble);

      setTimeout(() => {
        bubble.remove();
        const index = bubbles.indexOf(bubble);
        if (index > -1) bubbles.splice(index, 1);
      }, duration * 1000);
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

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#051510]">
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[5] transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      ></div>
      
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

      <Header activeSection={activeSection} />

      <main className="relative z-10">
        <HeroSection />
        <ContentSections 
          hoveredTab={hoveredTab} 
          setHoveredTab={setHoveredTab}
          setIsHoveringTabs={setIsHoveringTabs}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
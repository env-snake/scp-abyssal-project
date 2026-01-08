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
  const [footerBgColor, setFooterBgColor] = useState('rgba(5, 21, 16, 0.9)');

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
      
      const collageSection = document.getElementById('collage');
      if (collageSection) {
        const collageTop = collageSection.offsetTop;
        const scrollY = window.scrollY;
        
        if (scrollY >= collageTop) {
          const scrollFromCollage = scrollY - collageTop;
          const maxScroll = 1200;
          const opacity = Math.min(scrollFromCollage / maxScroll, 1);
          setScrollOpacity(opacity);
          
          const r = Math.round(5 - opacity * 5);
          const g = Math.round(21 - opacity * 21);
          const b = Math.round(16 - opacity * 16);
          setFooterBgColor(`rgba(${r}, ${g}, ${b}, 0.9)`);
        } else {
          setScrollOpacity(0);
          setFooterBgColor('rgba(5, 21, 16, 0.9)');
        }
      }
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
      
      const updateBubbleColor = () => {
        const rect = bubble.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = 1 - (rect.top / windowHeight);
        const colorProgress = Math.max(0, Math.min(1, progress));
        
        const greenR = 29, greenG = 185, greenB = 84;
        const grayR = 60, grayG = 60, grayB = 60;
        
        const r = Math.round(greenR + (grayR - greenR) * colorProgress);
        const g = Math.round(greenG + (grayG - greenG) * colorProgress);
        const b = Math.round(greenB + (grayB - greenB) * colorProgress);
        
        bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(${r}, ${g}, ${b}, 0.3), rgba(${r}, ${g}, ${b}, 0.05))`;
        bubble.style.boxShadow = `0 0 15px rgba(${r}, ${g}, ${b}, 0.2)`;
      };
      
      const animationFrame = () => {
        updateBubbleColor();
        if (document.body.contains(bubble)) {
          requestAnimationFrame(animationFrame);
        }
      };
      
      document.body.appendChild(bubble);
      bubbles.push(bubble);
      requestAnimationFrame(animationFrame);

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
    <div 
      className="min-h-screen text-white relative overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: `rgb(${Math.round(5 - scrollOpacity * 5)}, ${Math.round(21 - scrollOpacity * 21)}, ${Math.round(16 - scrollOpacity * 16)})`
      }}
    >
      
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

      <Footer bgColor={footerBgColor} />
    </div>
  );
};

export default Index;
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const [steamId, setSteamId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('donate');
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSteamId = urlParams.get('steam_id');
    const urlAmount = urlParams.get('amount');
    
    if (urlSteamId) setSteamId(urlSteamId);
    if (urlAmount) setAmount(urlAmount);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleDonate = async () => {
    if (!steamId.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите Steam ID',
        variant: 'destructive',
      });
      return;
    }

    const customAmount = parseInt(amount);
    if (!customAmount || customAmount < 100) {
      toast({
        title: 'Ошибка',
        description: 'Минимальная сумма пополнения 100 ₽',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const checkResponse = await fetch(`https://functions.poehali.dev/3fb40399-0846-47af-91ab-68e6977dd3f5?steam_id=${encodeURIComponent(steamId)}`);
      const checkData = await checkResponse.json();
      
      if (!checkData.found) {
        toast({
          title: 'Ошибка',
          description: 'Игрок с данным Steam ID не найден на сервере. Сначала зайдите на сервер!',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const response = await fetch('https://functions.poehali.dev/21cfb45c-71d6-4ee4-867a-c632a2ca813b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steam_id: steamId,
          amount: customAmount,
          success_url: window.location.origin + '/donate?success=true',
          fail_url: window.location.origin + '/donate?failed=true'
        }),
      });

      const data = await response.json();
      
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error(data.error || 'Не удалось создать платёж');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось создать платёж. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, transparent 70%)',
        }}
      ></div>

      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-primary/20 transition-all duration-300 ${
        mousePos.y > 50 ? 'bg-[#051510]/95' : 'bg-[#051510]/90'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </a>
          <button
            onClick={() => window.history.back()}
            className="info-bar-grid relative px-6 py-3 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary rounded-xl text-primary font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(29,185,84,0.3)] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Вернуться
            </span>
          </button>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">
              ПОПОЛНЕНИЕ <span className="text-primary animate-gradient-text bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto]">БАЛАНСА</span>
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Поддержите развитие проекта и получите донат-валюту для улучшения игрового опыта
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="text-sm font-bold">Курс: 1₽ = 1 донат-валюта</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative animate-fade-in order-2 lg:order-1 flex justify-center">
                <div className="relative w-full max-w-xl">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                  <img 
                    src="https://cdn.poehali.dev/files/bgsite.png" 
                    alt="Abyssal Hero" 
                    className="relative w-full h-auto rounded-full border-4 border-primary/50 shadow-2xl shadow-primary/30 animate-float object-cover aspect-square"
                  />
                </div>
              </div>

              <Card className="info-bar-grid p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 relative overflow-hidden rounded-3xl order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                <div className="relative space-y-6">
                  <div>
                    <label className="block text-lg font-bold mb-3 tracking-wide flex items-center gap-2">
                      <Icon name="User" size={20} className="text-primary" />
                      ВАШ STEAM ID
                    </label>
                    <Input
                      type="text"
                      placeholder="STEAM_0:1:12345678"
                      value={steamId}
                      onChange={(e) => setSteamId(e.target.value)}
                      className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300 rounded-xl"
                    />
                    <p className="text-xs opacity-60 mt-2 flex items-center gap-2">
                      <Icon name="Info" size={14} />
                      Найти свой Steam ID:{' '}
                      <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                        steamid.io
                      </a>
                    </p>
                  </div>

                  <div>
                    <label className="block text-lg font-bold mb-3 tracking-wide flex items-center gap-2">
                      <Icon name="Wallet" size={20} className="text-primary" />
                      ВВЕДИТЕ СУММУ
                    </label>
                    <Input
                      type="number"
                      placeholder="Минимум 100 ₽"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300 rounded-xl"
                      min="100"
                    />
                    
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {quickAmounts.map((sum) => (
                        <button
                          key={sum}
                          onClick={() => setAmount(sum.toString())}
                          className="px-3 py-2 bg-background/70 border-2 border-primary/30 rounded-xl text-sm font-bold hover:border-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                          <span className="relative">{sum}₽</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleDonate}
                    disabled={loading}
                    className="w-full group relative px-10 py-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full border-2 border-primary text-white font-bold text-lg tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(29,185,84,0.6)] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Icon name={loading ? "Loader2" : "CreditCard"} size={20} className={loading ? "animate-spin" : ""} />
                      {loading ? 'ОБРАБОТКА...' : 'ПЕРЕЙТИ К ОПЛАТЕ'}
                    </span>
                  </button>
                  
                  <p className="text-xs text-center opacity-60 mt-4">
                    После нажатия кнопки вы будете перенаправлены на страницу оплаты Robokassa
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="info-bar-grid p-8 bg-card/30 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Shield" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Безопасно</h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Оплата через надёжные кассы
                  </p>
                </div>
              </div>
            </Card>

            <Card className="info-bar-grid p-8 bg-card/30 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Zap" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Мгновенно</h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Зачисление до двух минут
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-6 text-sm opacity-60">
              <a href="/terms" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Оферта
              </a>
              <a href="/privacy" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="Shield" size={16} />
                Политика конфиденциальности
              </a>
              <a href="/refund" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="RefreshCcw" size={16} />
                Политика возврата
              </a>
              <a href="/services" className="hover:text-primary hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <Icon name="Package" size={16} />
                Услуги
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-primary/20 py-8 relative z-10 bg-[#051510]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-8 h-8" />
              <span className="text-sm tracking-wider opacity-80">© 2025 ABYSSAL. Все права защищены</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-4 opacity-70">
                <a href="/terms" className="hover:text-primary transition-colors">Оферта</a>
                <span>|</span>
                <a href="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          animation: gradient-shift 3s ease infinite;
        }
        .bubble {
          position: fixed;
          bottom: -100px;
          background: radial-gradient(circle at 30% 30%, rgba(29, 185, 84, 0.3), rgba(29, 185, 84, 0.05));
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: rise linear infinite;
          opacity: 0.6;
          box-shadow: 0 0 20px rgba(29, 185, 84, 0.3);
        }
        @keyframes rise {
          0% {
            bottom: -100px;
            opacity: 0;
            transform: translateX(0) scale(1);
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            bottom: 100vh;
            opacity: 0;
            transform: translateX(50px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
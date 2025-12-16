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
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const donatePackages = [
    { 
      amount: 100, 
      label: '100 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/70968dcb-9ca0-4931-bcd5-2fde67269c99.jpg',
      size: 'small'
    },
    { 
      amount: 250, 
      label: '250 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/70968dcb-9ca0-4931-bcd5-2fde67269c99.jpg',
      size: 'small'
    },
    { 
      amount: 500, 
      label: '500 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/073655ff-3f9e-471c-9f1a-f81596ed0c5b.jpg',
      size: 'medium'
    },
    { 
      amount: 1000, 
      label: '1000 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/073655ff-3f9e-471c-9f1a-f81596ed0c5b.jpg',
      size: 'medium'
    },
    { 
      amount: 2500, 
      label: '2500 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/f803fdae-3f6d-438c-b996-77ee8b3ffede.jpg',
      size: 'large'
    },
    { 
      amount: 5000, 
      label: '5000 ₽', 
      image: 'https://cdn.poehali.dev/projects/43373741-381d-4f2d-884e-64c504f73daa/files/f803fdae-3f6d-438c-b996-77ee8b3ffede.jpg',
      size: 'large'
    },
  ];

  const handleDonate = async (selectedAmount: number) => {
    if (!steamId.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите Steam ID',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/82e4a93c-2575-4ee2-8cc3-dbdc6931e07f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steam_id: steamId,
          amount: selectedAmount,
        }),
      });

      const data = await response.json();
      
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('Не удалось создать платёж');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать платёж. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomDonate = () => {
    const customAmount = parseInt(amount);
    if (customAmount < 100) {
      toast({
        title: 'Ошибка',
        description: 'Минимальная сумма пополнения 100 ₽',
        variant: 'destructive',
      });
      return;
    }
    handleDonate(customAmount);
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
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, transparent 70%)',
        }}
      ></div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </a>
          <Button 
            onClick={() => window.history.back()}
            className="bg-primary/10 text-primary border-2 border-primary hover:bg-primary hover:text-black transition-all duration-300 px-6 flex items-center gap-2 group"
          >
            <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Вернуться
          </Button>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">
              ПОПОЛНЕНИЕ <span className="text-primary">БАЛАНСА</span>
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Поддержите развитие проекта и получите донат-валюту для улучшения игрового опыта
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="text-sm font-bold">Курс: 1₽ = 1 донат-валюта</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-500 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <div className="relative">
                <label className="block text-lg font-bold mb-4 tracking-wide flex items-center gap-2">
                  <Icon name="User" size={20} className="text-primary" />
                  ВАШ STEAM ID
                </label>
                <Input
                  type="text"
                  placeholder="STEAM_0:1:12345678"
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                  className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300"
                />
                <p className="text-xs opacity-60 mt-3 flex items-center gap-2">
                  <Icon name="Info" size={14} />
                  Найти свой Steam ID:{' '}
                  <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                    steamid.io
                  </a>
                </p>
              </div>
            </Card>
          </div>

          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-wide mb-2">ВЫБЕРИТЕ СУНДУК</h2>
              <p className="text-sm opacity-70">Чем больше сундук, тем больше донат-валюты</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {donatePackages.map((pkg, index) => (
                <Card
                  key={pkg.amount}
                  className="relative p-8 backdrop-blur-sm border-2 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in group bg-card/30 border-primary/20 hover:border-primary hover:bg-card/50 rounded-2xl"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  onClick={() => handleDonate(pkg.amount)}
                >
                  <div className="text-center relative">
                    <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl group-hover:bg-primary/10 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="mb-6 relative">
                        <img 
                          src={pkg.image} 
                          alt={`Сундук ${pkg.amount}₽`}
                          className="w-32 h-32 mx-auto object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">{pkg.amount}</div>
                      <div className="text-xl font-bold mb-3">₽</div>
                      <div className="h-px bg-primary/30 my-4 mx-auto w-16"></div>
                      <div className="text-base opacity-90 mb-1">Получите</div>
                      <div className="text-2xl font-bold text-primary">{pkg.amount}</div>
                      <div className="text-sm opacity-70 mt-1">донат-валюты</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary transition-all duration-500 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 tracking-wide text-center">СВОЯ СУММА</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Введите сумму (мин. 100 ₽)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-background/70 border-2 border-primary/30 focus:border-primary text-white text-lg h-14 transition-all duration-300 rounded-xl"
                    min="100"
                  />
                </div>
                <Button
                  onClick={handleCustomDonate}
                  disabled={loading}
                  className="bg-primary text-black hover:bg-primary/90 font-bold px-12 h-14 text-lg transition-all duration-300 hover:scale-105 rounded-xl"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      Загрузка...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Icon name="CreditCard" size={20} />
                      Пополнить
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Card className="p-8 bg-card/30 border-2 border-primary/20 text-center hover:border-primary transition-all duration-500 hover:scale-105 group rounded-2xl">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <Icon name="Shield" size={48} className="text-primary relative" />
              </div>
              <h3 className="text-xl font-bold mb-2">Безопасно</h3>
              <p className="text-sm opacity-80">Оплата через Т-Банк с защитой данных</p>
            </Card>
            <Card className="p-8 bg-card/30 border-2 border-primary/20 text-center hover:border-primary transition-all duration-500 hover:scale-105 group rounded-2xl">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <Icon name="Zap" size={48} className="text-primary relative" />
              </div>
              <h3 className="text-xl font-bold mb-2">Мгновенно</h3>
              <p className="text-sm opacity-80">Зачисление в течение 1-5 минут</p>
            </Card>
            <Card className="p-8 bg-card/30 border-2 border-primary/20 text-center hover:border-primary transition-all duration-500 hover:scale-105 group rounded-2xl">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <Icon name="HeadphonesIcon" size={48} className="text-primary relative" />
              </div>
              <h3 className="text-xl font-bold mb-2">Поддержка</h3>
              <p className="text-sm opacity-80">Помощь 24/7 в Discord</p>
            </Card>
          </div>

          <div className="text-center text-sm opacity-60 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="mb-2">
              Совершая платёж, вы соглашаетесь с{' '}
              <a href="/terms" className="text-primary hover:underline">
                договором оферты
              </a>{' '}
              и{' '}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
            <p className="text-xs">ИП Киселев Николай Александрович | ИНН 784105099308 | ОГРНИП 324784700201111</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
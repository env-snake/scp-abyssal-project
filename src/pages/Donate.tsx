import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Donate = () => {
  const [steamId, setSteamId] = useState('');
  const [amount, setAmount] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

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
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#051510]/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/4468007d-3ca2-4d75-af22-bd7b04f04385.png" alt="Abyssal" className="w-10 h-10" />
            <h1 className="text-xl font-bold tracking-wider">ABYSSAL</h1>
          </div>
          <nav className="flex gap-8 text-sm">
            <a href="/" className="nav-link hover:text-primary transition-colors tracking-wide">
              Главная
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">ДОНАТ</h1>
            <p className="text-lg opacity-80">Пополните баланс для покупки привилегий на сервере</p>
          </div>

          <Card className="p-8 bg-[#0a1f1a]/80 border-primary/30 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  <Icon name="User" className="inline mr-2" size={16} />
                  Steam ID
                </label>
                <Input
                  type="text"
                  placeholder="76561198000000000"
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                  className="bg-[#051510] border-primary/30 focus:border-primary text-white placeholder:text-white/40"
                />
                <p className="text-xs opacity-60 mt-2">Введите ваш Steam ID64</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  <Icon name="Coins" className="inline mr-2" size={16} />
                  Сумма пополнения
                </label>
                <Input
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#051510] border-primary/30 focus:border-primary text-white placeholder:text-white/40"
                  min="100"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickAmounts.map((amt) => (
                    <Button
                      key={amt}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(amt.toString())}
                      className="border-primary/30 hover:bg-primary hover:text-black transition-all"
                    >
                      {amt} ₽
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-6 text-lg transition-all"
                disabled
              >
                <Icon name="CreditCard" className="mr-2" size={20} />
                Оплата временно недоступна
              </Button>

              <div className="text-center text-sm opacity-60 pt-4">
                <p>Минимальная сумма: 100 ₽</p>
                <p className="mt-2">При возникновении проблем обращайтесь в Discord</p>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center text-sm opacity-60 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>Принимая оферту, вы соглашаетесь с <a href="/terms" className="text-primary hover:underline">правилами сервиса</a></p>
            <p className="mt-2">Самозанятый: Шахмуратов Арсен Артурович</p>
            <p>ИНН: 774313076432</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const [steamId, setSteamId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const donatePackages = [
    { amount: 100, bonus: 0, label: '100 ₽' },
    { amount: 250, bonus: 10, label: '250 ₽' },
    { amount: 500, bonus: 50, label: '500 ₽' },
    { amount: 1000, bonus: 150, label: '1000 ₽' },
    { amount: 2500, bonus: 500, label: '2500 ₽' },
    { amount: 5000, bonus: 1250, label: '5000 ₽' },
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
            <a href="/donate" className="nav-link text-primary tracking-wide">
              Донат
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">ПОПОЛНЕНИЕ БАЛАНСА</h1>
            <p className="text-lg opacity-80">
              Пополните донат-валюту для покупки привилегий и улучшений на сервере
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-primary/20 mb-12">
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3 tracking-wide">
                <Icon name="User" size={16} className="inline mr-2" />
                STEAM ID
              </label>
              <Input
                type="text"
                placeholder="STEAM_0:1:12345678"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary text-white"
              />
              <p className="text-xs opacity-60 mt-2">
                Найти свой Steam ID можно на{' '}
                <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  steamid.io
                </a>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6 tracking-wide">ГОТОВЫЕ ПАКЕТЫ</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {donatePackages.map((pkg) => (
                  <Card
                    key={pkg.amount}
                    className="p-6 bg-background/30 border-primary/20 hover:border-primary transition-all cursor-pointer hover:scale-105"
                    onClick={() => handleDonate(pkg.amount)}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{pkg.label}</div>
                      <div className="text-sm opacity-80">
                        + {pkg.amount + pkg.bonus} донат-валюты
                      </div>
                      {pkg.bonus > 0 && (
                        <div className="text-xs text-primary mt-2">
                          Бонус: +{pkg.bonus}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="border-t border-primary/20 pt-8">
              <h3 className="text-xl font-bold mb-4 tracking-wide">СВОЯ СУММА</h3>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Введите сумму (мин. 100 ₽)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary text-white"
                  min="100"
                />
                <Button
                  onClick={handleCustomDonate}
                  disabled={loading}
                  className="bg-primary text-black hover:bg-primary/90 font-bold px-8"
                >
                  {loading ? 'Загрузка...' : 'Пополнить'}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/30 border border-primary/20 text-center">
              <Icon name="Shield" size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Безопасно</h3>
              <p className="text-sm opacity-80">Оплата через Т-Банк</p>
            </Card>
            <Card className="p-6 bg-card/30 border border-primary/20 text-center">
              <Icon name="Zap" size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Мгновенно</h3>
              <p className="text-sm opacity-80">Зачисление за 1-5 минут</p>
            </Card>
            <Card className="p-6 bg-card/30 border border-primary/20 text-center">
              <Icon name="Gift" size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Бонусы</h3>
              <p className="text-sm opacity-80">Дополнительная валюта</p>
            </Card>
          </div>

          <div className="mt-12 text-center text-sm opacity-60">
            <p>
              Совершая платёж, вы соглашаетесь с{' '}
              <a href="/terms" className="text-primary hover:underline">
                договором оферты
              </a>{' '}
              и{' '}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
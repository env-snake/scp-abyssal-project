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
    toast({
      title: 'Информация',
      description: 'Оплата временно недоступна',
    });
    setLoading(false);
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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">ДОНАТ</h1>
            <p className="text-lg opacity-80">Пополните баланс для покупки привилегий на сервере</p>
          </div>

          <div className="flex gap-2 mb-8 border-b border-primary/20 flex-wrap">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'donate'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon name="CreditCard" className="inline mr-2" size={16} />
              Пополнение
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'info'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon name="Info" className="inline mr-2" size={16} />
              Информация
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'rules'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon name="FileText" className="inline mr-2" size={16} />
              Правила
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'faq'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon name="HelpCircle" className="inline mr-2" size={16} />
              FAQ
            </button>
          </div>

          {activeTab === 'donate' && (
            <Card className="p-8 bg-[#0a1f1a]/80 border-primary/30 backdrop-blur-sm animate-fade-in">
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
                  onClick={handleDonate}
                  disabled={loading}
                >
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  {loading ? 'Обработка...' : 'Оплата временно недоступна'}
                </Button>

                <div className="text-center text-sm opacity-60 pt-4">
                  <p>Минимальная сумма: 100 ₽</p>
                  <p className="mt-2">При возникновении проблем обращайтесь в Discord</p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'info' && (
            <Card className="p-8 bg-[#0a1f1a]/80 border-primary/30 backdrop-blur-sm animate-fade-in">
              <div className="space-y-6 text-white/90">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Icon name="Info" className="mr-2" size={20} />
                    Общая информация
                  </h3>
                  <p className="leading-relaxed">
                    Донат на сервере Abyssal позволяет вам получить игровую валюту, которую можно использовать для покупки привилегий, уникальных предметов и улучшений для вашего персонажа.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Icon name="Package" className="mr-2" size={20} />
                    Что можно купить
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>VIP привилегии с дополнительными возможностями</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>Уникальное снаряжение и оружие</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>Косметические предметы и раскраски</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>Ускорители прогресса</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Icon name="Shield" className="mr-2" size={20} />
                    Безопасность платежей
                  </h3>
                  <p className="leading-relaxed">
                    Все платежи проходят через защищенные платежные системы. Мы не храним данные ваших банковских карт. Ваша информация надежно защищена.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'rules' && (
            <Card className="p-8 bg-[#0a1f1a]/80 border-primary/30 backdrop-blur-sm animate-fade-in">
              <div className="space-y-6 text-white/90">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Icon name="AlertTriangle" className="mr-2" size={20} />
                    Важные правила
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="X" className="mr-2 mt-1 text-red-400 flex-shrink-0" size={16} />
                      <span>Возврат средств возможен только в случае технической ошибки на нашей стороне</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="X" className="mr-2 mt-1 text-red-400 flex-shrink-0" size={16} />
                      <span>Игровая валюта и предметы не подлежат обмену на реальные деньги</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="X" className="mr-2 mt-1 text-red-400 flex-shrink-0" size={16} />
                      <span>При нарушении правил сервера аккаунт может быть заблокирован без возврата средств</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="X" className="mr-2 mt-1 text-red-400 flex-shrink-0" size={16} />
                      <span>Передача аккаунта третьим лицам запрещена</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Icon name="CheckCircle" className="mr-2" size={20} />
                    Правила использования
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>Игровая валюта зачисляется автоматически после успешной оплаты</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>Срок зачисления: от нескольких секунд до 15 минут</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="mr-2 mt-1 text-primary flex-shrink-0" size={16} />
                      <span>При возникновении проблем обращайтесь в поддержку с номером транзакции</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'faq' && (
            <Card className="p-8 bg-[#0a1f1a]/80 border-primary/30 backdrop-blur-sm animate-fade-in">
              <div className="space-y-6 text-white/90">
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Как узнать свой Steam ID?</h4>
                  <p className="leading-relaxed opacity-80">
                    Зайдите на сайт <a href="https://steamid.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">steamid.io</a>, введите ссылку на свой профиль Steam и скопируйте значение steamID64.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Как быстро зачисляются средства?</h4>
                  <p className="leading-relaxed opacity-80">
                    Обычно средства зачисляются мгновенно после успешной оплаты. В редких случаях это может занять до 15 минут.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Можно ли вернуть деньги?</h4>
                  <p className="leading-relaxed opacity-80">
                    Возврат средств возможен только при технической ошибке на нашей стороне (например, средства списаны, но не зачислены). Обратитесь в поддержку с подтверждением платежа.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Какие способы оплаты доступны?</h4>
                  <p className="leading-relaxed opacity-80">
                    Мы принимаем банковские карты (Visa, Mastercard, МИР), электронные кошельки и другие популярные способы оплаты через защищенные платежные системы.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Что делать, если деньги списались, но не пришли?</h4>
                  <p className="leading-relaxed opacity-80">
                    Напишите в поддержку Discord с указанием вашего Steam ID и скриншотом/чеком об оплате. Мы решим проблему в течение 24 часов.
                  </p>
                </div>
              </div>
            </Card>
          )}

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

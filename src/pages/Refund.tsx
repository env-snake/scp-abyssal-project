import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Refund = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#051510]">
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-primary/20 transition-all duration-300 ${
        scrolled ? 'bg-[#051510]/95' : 'bg-[#051510]/90'
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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">
              ПОЛИТИКА <span className="text-primary">ВОЗВРАТА</span>
            </h1>
            <p className="text-lg opacity-70">Условия возврата средств и порядок обращений</p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Ban" size={24} className="text-primary" />
                1. Общие положения
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                При успешном пополнении счёта игрового аккаунта на любую сумму оплата не подлежит возврату. Приобретая донат-валюту, вы соглашаетесь с тем, что предоставляете добровольное пожертвование на развитие проекта Abyssal.
              </p>
              <p className="text-sm opacity-80 leading-relaxed mt-4">
                <strong>Оператор:</strong><br />
                Самозанятый Шахмуратов Арсен Артурович<br />
                ИНН: 774313076432
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ShoppingBag" size={24} className="text-primary" />
                2. Услуги внутриигрового магазина
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">2.1.</strong> В случае невозможности оказания услуги, купленной во внутриигровом магазине, оплата подлежит возврату на внутриигровой счёт игрового аккаунта.</p>
                <p><strong className="text-primary">2.2.</strong> При успешном пополнении счёта игрового аккаунта и дальнейшем успешном оказании услуги из внутриигрового магазина возврат средств не предусматривается.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="History" size={24} className="text-primary" />
                3. История пополнений
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Историю пополнения средств вы можете узнать на игровом сервере в соответствующей панели управления вашим аккаунтом.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="List" size={24} className="text-primary" />
                4. Список услуг
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Информацию о списке доступных к покупке услуг и их стоимости вы можете найти во внутриигровом магазине на сервере. Список услуг, оказываемых за счёт средств игрового счёта пользователя, а также их цены указаны во внутриигровом магазине.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="AlertCircle" size={24} className="text-primary" />
                5. Обращения по возврату
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p>Если у вас возникла ситуация, требующая рассмотрения возврата средств, обратитесь в службу поддержки проекта:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Через игровой сервер в разделе поддержки</li>
                  <li>В официальных социальных сетях проекта Abyssal</li>
                </ul>
                <p className="mt-4">Каждое обращение рассматривается индивидуально в соответствии с условиями данной политики.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Clock" size={24} className="text-primary" />
                6. Срок действия политики
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Настоящая Политика возврата действует бессрочно до замены её новой версией. Администрация проекта оставляет за собой право вносить изменения в данную политику с публикацией актуальной версии на официальном сайте.
              </p>
            </section>

            <div className="pt-6 border-t border-primary/20 text-center">
              <p className="text-sm opacity-60">Дата последнего изменения соглашения: 16 декабря 2025 года</p>
              <p className="text-sm opacity-60 mt-2">Политика действует бессрочно до замены её новой версией</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Refund;
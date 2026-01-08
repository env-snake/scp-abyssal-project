import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Services = () => {
  return (
    <div className="min-h-screen text-white bg-[#051510]">
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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">
              ПРЕДОСТАВЛЯЕМЫЕ <span className="text-primary">УСЛУГИ</span>
            </h1>
            <p className="text-lg opacity-70">Описание услуг и возможностей игрового проекта</p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" size={24} className="text-primary" />
                1. Общие положения
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Проект Abyssal предоставляет пользователям услуги игрового сервера с дополнительными возможностями, доступными через систему донат-валюты. Все услуги оказываются в рамках игрового процесса и направлены на улучшение игрового опыта.
              </p>
              <p className="text-sm opacity-80 leading-relaxed mt-4">
                <strong>Оператор:</strong><br />
                ИП Киселев Николай Александрович<br />
                ОГРНИП: 324784700201111<br />
                ИНН: 784105099308
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Coins" size={24} className="text-primary" />
                2. Система донат-валюты
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">2.1. Пополнение счёта</strong></p>
                <p>Пользователи могут пополнить внутриигровой счёт донат-валютой через систему приёма платежей на официальном сайте проекта. Курс обмена: 1 рубль = 1 единица донат-валюты.</p>
                
                <p className="mt-4"><strong className="text-primary">2.2. Использование валюты</strong></p>
                <p>Донат-валюта может быть использована для приобретения услуг и товаров во внутриигровом магазине. Валюта привязана к игровому аккаунту пользователя и не подлежит передаче другим игрокам.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                3. Услуги внутриигрового магазина
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">3.1. Категории услуг</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Косметические предметы</strong> — скины, модели персонажей, эффекты, не влияющие на игровой баланс</li>
                  <li><strong>Игровые улучшения</strong> — временные или постоянные бонусы к характеристикам персонажа</li>
                  <li><strong>Доступ к контенту</strong> — эксклюзивные локации, режимы игры, дополнительные возможности</li>
                  <li><strong>VIP-статусы</strong> — привилегии на сервере, специальные возможности для VIP-игроков</li>
                </ul>

                <p className="mt-4"><strong className="text-primary">3.2. Актуальный прайс-лист</strong></p>
                <p>Полный список доступных услуг, их описание и стоимость в донат-валюте указаны во внутриигровом магазине на сервере. Администрация оставляет за собой право изменять список услуг и цены на них.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Server" size={24} className="text-primary" />
                4. Доступ к игровому серверу
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">4.1. Базовый доступ</strong></p>
                <p>Доступ к игровому серверу предоставляется бесплатно всем пользователям, имеющим лицензионную копию игры на платформе Steam.</p>

                <p className="mt-4"><strong className="text-primary">4.2. Техническое обслуживание</strong></p>
                <p>Проект обеспечивает стабильную работу серверов, регулярные обновления контента и техническую поддержку пользователей. В случае технических работ пользователи уведомляются заранее.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Headphones" size={24} className="text-primary" />
                5. Техническая поддержка
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p>Служба поддержки проекта оказывает помощь пользователям по следующим вопросам:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Проблемы с пополнением счёта и получением донат-валюты</li>
                  <li>Технические неполадки на сервере</li>
                  <li>Вопросы по использованию внутриигрового магазина</li>
                  <li>Консультации по правилам проекта</li>
                  <li>Рассмотрение жалоб и обращений</li>
                </ul>
                <p className="mt-4">Обращения принимаются через игровой сервер и официальные каналы связи проекта.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ShieldAlert" size={24} className="text-primary" />
                6. Ограничения и ответственность
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">6.1.</strong> Проект не несёт ответственности за действия пользователей, нарушающих правила сервера.</p>
                <p><strong className="text-primary">6.2.</strong> Администрация имеет право заблокировать доступ к услугам при выявлении нарушений правил проекта.</p>
                <p><strong className="text-primary">6.3.</strong> Донат-валюта и приобретённые услуги являются виртуальными объектами и не имеют реальной денежной стоимости за пределами игрового мира.</p>
                <p><strong className="text-primary">6.4.</strong> Услуги предоставляются «как есть», без каких-либо гарантий, за исключением явно указанных в описании.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="RefreshCw" size={24} className="text-primary" />
                7. Изменение условий
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Администрация проекта Abyssal оставляет за собой право вносить изменения в список предоставляемых услуг, их стоимость и условия оказания. Пользователи уведомляются об изменениях через игровой сервер и официальный сайт проекта.
              </p>
            </section>

            <div className="pt-6 border-t border-primary/20 text-center">
              <p className="text-sm opacity-60">Дата последнего обновления: 16 декабря 2025 года</p>
              <p className="text-sm opacity-60 mt-2">Документ действует бессрочно до замены его новой версией</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Services;
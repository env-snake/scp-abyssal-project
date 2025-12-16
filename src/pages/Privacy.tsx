import { Button } from '@/components/ui/button';

const Privacy = () => {
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
            <a href="/donate" className="nav-link hover:text-primary transition-colors tracking-wide">
              Донат
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 tracking-wide">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
            <p className="text-sm opacity-60">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-white/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей игрового сервера Abyssal SCP RP.
              </p>
              <p className="mt-4">
                <strong>Оператор персональных данных:</strong><br />
                ИП Киселев Николай Александрович<br />
                ОГРНИП: 324784700201111<br />
                ИНН: 784105099308
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Какие данные мы собираем</h2>
              <p>
                2.1. При пополнении баланса мы собираем следующую информацию:<br />
                - Steam ID пользователя<br />
                - Сумма и дата транзакции<br />
                - IP-адрес для предотвращения мошенничества
              </p>
              <p className="mt-4">
                2.2. При использовании игрового сервера:<br />
                - Игровую статистику и прогресс<br />
                - Логи действий для обеспечения безопасности
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Цели обработки данных</h2>
              <p>
                Мы используем персональные данные для:<br />
                - Обработки платежей и зачисления виртуальной валюты<br />
                - Предоставления доступа к игровому серверу<br />
                - Технической поддержки пользователей<br />
                - Предотвращения мошенничества и нарушений правил<br />
                - Улучшения качества услуг
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Защита персональных данных</h2>
              <p>
                4.1. Мы применяем технические и организационные меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
              <p>
                4.2. Доступ к персональным данным имеют только уполномоченные сотрудники.
              </p>
              <p>
                4.3. Платёжные данные обрабатываются через защищённые системы платёжных провайдеров (Т-Банк).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Передача данных третьим лицам</h2>
              <p>
                5.1. Мы не передаём персональные данные третьим лицам, за исключением случаев:<br />
                - Требования законодательства РФ<br />
                - Обработки платежей через платёжные системы<br />
                - С письменного согласия пользователя
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Срок хранения данных</h2>
              <p>
                6.1. Данные о транзакциях хранятся в течение 3 лет в соответствии с требованиями налогового законодательства.
              </p>
              <p>
                6.2. Игровая статистика хранится до момента удаления аккаунта пользователем.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Права пользователей</h2>
              <p>
                Вы имеете право:<br />
                - Получать информацию о хранящихся данных<br />
                - Требовать исправления неточных данных<br />
                - Требовать удаления данных (кроме данных о транзакциях)<br />
                - Отозвать согласие на обработку данных
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Использование cookies</h2>
              <p>
                Мы используем cookies для:<br />
                - Обеспечения работоспособности сайта<br />
                - Аналитики использования сервиса<br />
                - Улучшения пользовательского опыта
              </p>
              <p className="mt-4">
                Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность сайта.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Изменения в политике</h2>
              <p>
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">10. Контактная информация</h2>
              <p>
                По вопросам обработки персональных данных обращайтесь:<br />
                Discord: <a href="https://discord.gg/jXuuBA9GXr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  discord.gg/jXuuBA9GXr
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => window.history.back()}
              className="bg-primary text-black hover:bg-primary/90 font-bold px-8"
            >
              Вернуться назад
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;

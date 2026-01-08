import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Privacy = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#051510]">
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
              ПОЛИТИКА <span className="text-primary">КОНФИДЕНЦИАЛЬНОСТИ</span>
            </h1>
            <p className="text-lg opacity-70">Обработка и защита персональных данных пользователей</p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" size={24} className="text-primary" />
                1. Общие положения
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях игрового проекта Abyssal (далее — «Проект»). Используя сервисы Проекта, вы соглашаетесь с условиями данной Политики.
              </p>
              <p className="text-sm opacity-80 leading-relaxed mt-4">
                <strong>Оператор персональных данных:</strong><br />
                ИП Киселев Николай Александрович<br />
                ОГРНИП: 324784700201111<br />
                ИНН: 784105099308
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Database" size={24} className="text-primary" />
                2. Какие данные мы собираем
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">2.1. Steam ID</strong> — для идентификации пользователя в игре и привязки донат-валюты к игровому аккаунту.</p>
                <p><strong className="text-primary">2.2. Платёжная информация</strong> — данные о транзакциях (сумма, дата, время) для обработки платежей. Данные банковских карт обрабатываются платёжными системами и не хранятся на наших серверах.</p>
                <p><strong className="text-primary">2.3. IP-адрес и техническая информация</strong> — для обеспечения безопасности, предотвращения мошенничества и улучшения работы сервиса.</p>
                <p><strong className="text-primary">2.4. Игровая статистика</strong> — данные о действиях в игре, использовании донат-валюты и внутриигровых покупках.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" size={24} className="text-primary" />
                3. Для чего мы используем данные
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p><strong className="text-primary">3.1.</strong> Обработка платежей и зачисление донат-валюты на игровой счёт.</p>
                <p><strong className="text-primary">3.2.</strong> Предоставление доступа к услугам внутриигрового магазина.</p>
                <p><strong className="text-primary">3.3.</strong> Обеспечение технической поддержки пользователей.</p>
                <p><strong className="text-primary">3.4.</strong> Предотвращение мошенничества и нарушений правил проекта.</p>
                <p><strong className="text-primary">3.5.</strong> Улучшение качества игрового опыта и развитие проекта.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-primary" />
                4. Защита данных
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Мы применяем современные технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения или уничтожения. Платёжные данные обрабатываются через защищённые каналы связи с использованием SSL-шифрования.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Share2" size={24} className="text-primary" />
                5. Передача данных третьим лицам
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, необходимых для обработки платежей (платёжные системы, банки) и в случаях, предусмотренных законодательством Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="UserX" size={24} className="text-primary" />
                6. Ваши права
              </h2>
              <div className="space-y-3 text-sm opacity-80">
                <p>Вы имеете право на доступ к своим персональным данным, их исправление или удаление.</p>
                <p>Для реализации этих прав обратитесь в службу поддержки проекта через игровой сервер или официальные контакты.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="FileEdit" size={24} className="text-primary" />
                7. Изменения в политике
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Мы оставляем за собой право вносить изменения в данную Политику конфиденциальности. Актуальная версия всегда доступна на нашем сайте. Продолжение использования сервисов после внесения изменений означает ваше согласие с новыми условиями.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="MessageCircle" size={24} className="text-primary" />
                8. Контакты
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                По вопросам обработки персональных данных обращайтесь через систему поддержки на игровом сервере или в официальных социальных сетях проекта Abyssal.
              </p>
            </section>

            <div className="pt-6 border-t border-primary/20 text-center">
              <p className="text-sm opacity-60">Дата последнего обновления: 7 января 2026 года</p>
              <p className="text-sm opacity-60 mt-2">Политика действует бессрочно до замены её новой версией</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
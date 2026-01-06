import { Button } from '@/components/ui/button';

const Terms = () => {
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
            <h1 className="text-4xl font-bold mb-4 tracking-wide">ДОГОВОР ОФЕРТЫ</h1>
            <p className="text-sm opacity-60">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-white/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Общие положения</h2>
              <p>
                Настоящий договор является публичной офертой в соответствии со статьей 437 Гражданского кодекса Российской Федерации.
              </p>
              <p className="mt-4">
                <strong>Исполнитель:</strong> ИП Киселев Николай Александрович<br />
                <strong>ОГРНИП:</strong> 324784700201111<br />
                <strong>ИНН:</strong> 784105099308<br />
                <strong>Дата регистрации:</strong> 21 июня 2024 г.<br />
                <strong>Регистратор:</strong> Межрайонная инспекция Федеральной налоговой службы №15 по Санкт-Петербургу
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Предмет договора</h2>
              <p>
                2.1. Исполнитель предоставляет Пользователю виртуальную валюту для использования на игровом сервере Abyssal SCP RP в игре Garry's Mod.
              </p>
              <p>
                2.2. Виртуальная валюта может быть использована для приобретения внутриигровых предметов, привилегий и улучшений.
              </p>
              <p>
                2.3. Виртуальная валюта не имеет реальной стоимости и не может быть обменена на денежные средства.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Права и обязанности сторон</h2>
              <p>
                3.1. Исполнитель обязуется:<br />
                - Зачислить виртуальную валюту на счёт Пользователя в течение 1-5 минут после подтверждения оплаты<br />
                - Обеспечить доступность игрового сервера не менее 95% времени<br />
                - Предоставить техническую поддержку по вопросам пополнения баланса
              </p>
              <p className="mt-4">
                3.2. Пользователь обязуется:<br />
                - Указывать корректный Steam ID при пополнении<br />
                - Соблюдать правила игрового сервера<br />
                - Не использовать виртуальную валюту в целях, противоречащих законодательству РФ
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Порядок оплаты</h2>
              <p>
                4.1. Оплата производится через платёжную систему Т-Банк.
              </p>
              <p>
                4.2. Минимальная сумма пополнения составляет 100 рублей.
              </p>
              <p>
                4.3. После успешной оплаты виртуальная валюта зачисляется автоматически.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Возврат средств</h2>
              <p>
                5.1. Возврат денежных средств осуществляется только в следующих случаях:<br />
                - Технический сбой, приведший к списанию средств без зачисления виртуальной валюты<br />
                - Двойное списание средств
              </p>
              <p>
                5.2. Возврат не осуществляется, если:<br />
                - Виртуальная валюта была успешно зачислена<br />
                - Пользователь указал неверный Steam ID<br />
                - Пользователь был заблокирован за нарушение правил сервера
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Ответственность сторон</h2>
              <p>
                6.1. Исполнитель не несёт ответственности за:<br />
                - Действия третьих лиц, повлёкшие утрату доступа к аккаунту<br />
                - Изменение функционала или закрытие игрового сервера<br />
                - Блокировку аккаунта за нарушение правил сервера
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Контактная информация</h2>
              <p>
                <strong>ИП Киселев Николай Александрович</strong><br />
                ОГРНИП: 324784700201111<br />
                ИНН: 784105099308<br />
                Регистрационный номер в ПФР: 1294891575<br />
                ОКПО: 2033527603<br />
                ОКАТО: 40298000000<br />
                ОКТМО: 40910000000
              </p>
              <p className="mt-4">
                По всем вопросам обращайтесь в Discord сообщество:{' '}
                <a href="https://discord.gg/jXuuBA9GXr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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

export default Terms;

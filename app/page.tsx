const categories = [
  { title: "Автозапчасти", description: "Подбор деталей под ваш автомобиль", icon: "⚙️" },
  { title: "Расходные материалы", description: "Всё для регулярного обслуживания", icon: "🛢️" },
  { title: "Аксессуары", description: "Полезные решения для каждой поездки", icon: "🧰" },
];
export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="/" className="logo" aria-label="АвтоОпора — главная"><span className="logo-mark">А</span>АвтоОпора</a>
        <nav aria-label="Основная навигация">
          <a href="#catalog">Каталог</a><a href="#advantages">Почему мы</a><a href="#contact">Связаться</a>
        </nav>
        <a className="header-link" href="#contact">Помощь с подбором ↗</a>
      </header>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow"><span className="status-dot" /> Поддержка вашего автомобиля</p>
          <h1>Надёжная опора<br /><span>для каждого километра.</span></h1>
          <p className="hero-description">АвтоОпора — пространство для поиска автотоваров и подбора решений под ваш автомобиль. Начните с нужной категории.</p>
          <div className="actions"><a className="button-primary" href="#catalog">Смотреть категории <span>↗</span></a><a className="button-secondary" href="#contact">Нужна помощь? →</a></div>
          <div className="hero-note">Подбор ассортимента и оформление заказов появятся здесь после подключения каталога.</div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-label">AUTO<br/>OPORA<span>●</span></div><div className="art-caption">ДВИЖЕНИЕ НАЧИНАЕТСЯ С УВЕРЕННОСТИ</div></div>
      </section>
      <section className="section categories" id="catalog">
        <div className="section-heading"><div><p className="eyebrow">01 / НАПРАВЛЕНИЯ</p><h2>Что вы ищете?</h2></div><p>Основные направления будущего каталога. Конкретные товары и наличие будут добавлены отдельно.</p></div>
        <div className="category-grid">{categories.map((item,i)=><article className="category-card" key={item.title}><div className="category-top"><span className="category-icon" aria-hidden="true">{item.icon}</span><span className="category-number">0{i+1}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="category-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>
      <section className="section feature" id="advantages"><p className="eyebrow">02 / НАШ ПОДХОД</p><h2>Понятный поиск.<br/><span>Уверенный выбор.</span></h2><div className="feature-grid"><div><strong>01</strong><h3>Начните с задачи</h3><p>Выберите нужную категорию товаров или опишите, что требуется вашему автомобилю.</p></div><div><strong>02</strong><h3>Уточните совместимость</h3><p>При подборе деталей всегда проверяйте марку, модель, год выпуска и характеристики автомобиля.</p></div><div><strong>03</strong><h3>Проверьте условия</h3><p>Наличие, стоимость, доставка и условия покупки будут показаны после запуска каталога.</p></div></div></section>
      <section className="contact" id="contact"><div><p className="eyebrow">03 / НА СВЯЗИ</p><h2>Нужен конкретный товар?</h2><p>Контактные данные и форма обращения будут подключены перед публикацией магазина.</p></div><div className="contact-symbol" aria-hidden="true">↗</div></section>
      <footer><span>© {new Date().getFullYear()} АвтоОпора</span><span>Сайт в разработке</span></footer>
    </main>
  );
}
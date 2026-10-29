"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { catalogCategories, products, type Product } from "../data/catalog";

export type CartItem = { id: string; quantity: number };
const STORAGE_KEY = "avtoopora-cart-v1";
function readCart(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem => typeof item === "object" && item !== null && typeof item.id === "string" && Number.isSafeInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 && products.some(p => p.id === item.id));
  } catch { return []; }
}
function money(value: number) { return new Intl.NumberFormat("ru-RU", {style:"currency",currency:"RUB",maximumFractionDigits:0}).format(value); }
export function Shop({ mode }: { mode: "catalog" | "cart" }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Все");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [buyer, setBuyer] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [draft, setDraft] = useState(false);
  useEffect(() => { setCart(readCart()); setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }, [cart, ready]);
  const visible = useMemo(() => products.filter(p => (category === "Все" || p.category === category) && [p.name,p.brand,p.sku,p.description || ""].join(" ").toLocaleLowerCase("ru").includes(query.trim().toLocaleLowerCase("ru"))), [category,query]);
  const add = (p: Product) => { if (!p.available) return; setCart(prev => { const existing = prev.find(i => i.id === p.id); return existing ? prev.map(i => i.id === p.id ? {...i, quantity: Math.min(i.quantity + 1,99)} : i) : [...prev,{id:p.id,quantity:1}]; }); };
  const change = (id: string, quantity: number) => setCart(prev => quantity < 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? {...i,quantity:Math.min(quantity,99)} : i));
  const lines = cart.map(item => ({...item,product:products.find(p => p.id === item.id)})).filter((item): item is CartItem & {product:Product} => Boolean(item.product));
  const total = lines.reduce((sum,item) => sum + item.quantity * item.product.price,0);
  const count = cart.reduce((sum,item) => sum + item.quantity,0);
  const exportDraft = () => {
    const data = { status:"Черновик — НЕ отправлен в магазин", buyer, phone, vehicle:{brand,model,year}, note, items:lines.map(i => ({sku:i.product.sku,name:i.product.name,quantity:i.quantity,unitPrice:i.product.price})), total, currency:"RUB", savedAt:new Date().toISOString() };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
    const a = document.createElement("a"); a.href=url; a.download="avtoopora-zayavka-chernovik.json"; a.click(); URL.revokeObjectURL(url); setDraft(true);
  };
  return <div className="shop-layout">
    <div className="shop-top"><div><Link href="/" className="shop-back">← На главную</Link><p className="eyebrow">АВТООПОРА / {mode === "catalog" ? "КАТАЛОГ" : "КОРЗИНА"}</p><h1>{mode === "catalog" ? "Каталог товаров" : "Корзина и заявка"}</h1></div><Link className="shop-cart-link" href="/cart">Корзина · {ready ? count : "—"} →</Link></div>
    {mode === "catalog" ? <>
      <p className="shop-info">Каталог подключён к структуре сайта. Реальные товары, цены и остатки пока не загружены — их нужно взять из вашего файла.</p>
      <div className="shop-filters"><label>Поиск по названию, артикулу или бренду<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Например, фильтр или артикул" /></label><label>Категория<select value={category} onChange={e=>setCategory(e.target.value)}>{catalogCategories.map(c=><option key={c}>{c}</option>)}</select></label></div>
      {visible.length ? <div className="product-grid">{visible.map(p=><article className="product-card" key={p.id}><div className="product-thumbnail">⚙</div><p className="product-meta">{p.brand} · {p.sku}</p><h2>{p.name}</h2><p>{p.description}</p><div className="product-bottom"><strong>{money(p.price)}</strong><button disabled={!p.available} onClick={()=>add(p)}>{p.available ? "В корзину +" : "Нет в наличии"}</button></div></article>)}</div> : <div className="empty-state"><span>▤</span><h2>{products.length ? "Ничего не найдено" : "Ожидаем ассортимент"}</h2><p>{products.length ? "Попробуйте изменить запрос или категорию." : "Добавим позиции, фото, характеристики и цены из исходного файла. Сейчас фиктивные товары не показываются."}</p></div>}
    </> : <>
      <p className="shop-info">Данные корзины хранятся только в этом браузере. Оплата и отправка заказов пока не подключены.</p>
      {lines.length ? <div className="cart-lines">{lines.map(i=><div className="cart-line" key={i.id}><div><strong>{i.product.name}</strong><p>{i.product.sku} · {money(i.product.price)} / шт.</p></div><div className="quantity"><button onClick={()=>change(i.id,i.quantity-1)} aria-label="Уменьшить количество">−</button><span>{i.quantity}</span><button onClick={()=>change(i.id,i.quantity+1)} aria-label="Увеличить количество">+</button></div><b>{money(i.product.price*i.quantity)}</b></div>)}<div className="cart-total">Итого <strong>{money(total)}</strong></div></div> : <div className="empty-state"><h2>Корзина пуста</h2><p>Выберите товары в каталоге, когда ассортимент будет загружен.</p><Link className="button-primary" href="/catalog">В каталог →</Link></div>}
      <section className="shop-form"><h2>Подготовить заявку</h2><p>Пока заявки можно только скачать как черновик, они не поступают менеджеру.</p><form onSubmit={e=>{e.preventDefault();exportDraft();}}><div className="form-grid"><label>Ваше имя<input required maxLength={100} value={buyer} onChange={e=>setBuyer(e.target.value)} placeholder="Имя" /></label><label>Телефон для связи<input required type="tel" maxLength={30} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+7..." /></label><label>Марка автомобиля<input maxLength={60} value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Марка" /></label><label>Модель<input maxLength={60} value={model} onChange={e=>setModel(e.target.value)} placeholder="Модель" /></label><label>Год выпуска<input inputMode="numeric" pattern="[0-9]{4}" value={year} onChange={e=>setYear(e.target.value)} placeholder="2020" /></label><label>Комментарий<input maxLength={500} value={note} onChange={e=>setNote(e.target.value)} placeholder="VIN, пожелания..." /></label></div><button className="button-primary" type="submit" disabled={!lines.length}>Скачать черновик заявки ↓</button>{draft && <p role="status">Черновик сохранён на устройство. Заявка НЕ отправлена.</p>}</form></section>
    </>}
  </div>;
}

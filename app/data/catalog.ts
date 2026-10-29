export type Product = { id: string; name: string; category: string; brand: string; sku: string; price: number; currency: "RUB"; description?: string; compatibility?: string; available: boolean };
/** Заполняйте только подтверждёнными товарами, ценами и остатками. */
export const products: Product[] = [];
export const catalogCategories = ["Все", "Автозапчасти", "Расходные материалы", "Аксессуары"] as const;

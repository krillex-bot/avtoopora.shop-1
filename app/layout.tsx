import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "АвтоОпора — всё для вашего автомобиля", description: "АвтоОпора — автозапчасти, расходные материалы и аксессуары. Сайт в разработке." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body>{children}</body></html>; }
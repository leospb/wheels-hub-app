'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, Users, MousePointerClick, TrendingUp, Copy, Check,
  QrCode, ChevronRight, ArrowUpRight, CreditCard, Clock, BadgeCheck,
  Share2, ChevronDown, Download, AlertCircle, Wallet
} from 'lucide-react';

const REFERRAL_CODE = 'ALEXEY-WH-2024';
const REFERRAL_LINK = `https://wheelshub.ru/r/${REFERRAL_CODE}`;

const earningsHistory = [
  { id: 1, date: '20 Мар 2026', action: 'Реферал купил Toyota Camry шины', amount: '+₽450', status: 'approved' },
  { id: 2, date: '18 Мар 2026', action: 'Переход по ссылке → Диски BBS', amount: '+₽1,200', status: 'approved' },
  { id: 3, date: '15 Мар 2026', action: 'Реферал купил Volkswagen Tiguan диски', amount: '+₽890', status: 'pending' },
  { id: 4, date: '12 Мар 2026', action: 'Переход по ссылке → Шины Michelin', amount: '+₽320', status: 'approved' },
  { id: 5, date: '08 Мар 2026', action: 'Вывод средств на карту **** 5678', amount: '−₽5,000', status: 'paid' },
  { id: 6, date: '05 Мар 2026', action: 'Реферал зарегистрировался', amount: '+₽100', status: 'approved' },
];

const topReferrals = [
  { name: 'Дмитрий П.', joinDate: '10 Фев 2026', orders: 4, earned: '₽2,840' },
  { name: 'Мария С.', joinDate: '01 Мар 2026', orders: 2, earned: '₽1,200' },
  { name: 'Игорь К.', joinDate: '15 Мар 2026', orders: 1, earned: '₽450' },
];

export default function PartnerPage() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-8">
          <Link href="/" className="hover:text-cyan-500 transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Партнерская программа</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 mb-2">
              <Share2 className="w-9 h-9 text-emerald-500" />
              Партнерская программа
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              Приглашайте друзей и зарабатывайте <span className="text-emerald-500 font-bold">до 8% комиссии</span> с каждой покупки по вашей ссылке. Без ограничений.
            </p>
          </div>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 whitespace-nowrap"
          >
            <Wallet className="w-5 h-5" />
            Вывести деньги
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { title: 'Доступно к выводу', value: '₽3,960', icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-500/10 dark:bg-emerald-950/30', border: 'group-hover:border-emerald-400/50' },
            { title: 'Всего заработано', value: '₽9,010', icon: DollarSign, color: 'text-cyan-400', bg: 'bg-cyan-500/10 dark:bg-cyan-950/30', border: 'group-hover:border-cyan-400/50' },
            { title: 'Рефералов привлечено', value: '3', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-950/30', border: 'group-hover:border-blue-400/50' },
            { title: 'Конверсия', value: '22%', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-950/30', border: 'group-hover:border-amber-400/50' },
          ].map(({ title, value, icon: Icon, color, bg, border }, idx) => (
            <div key={idx} className={`group bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 ${border} rounded-3xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-0.5 hover:shadow-xl`}>
              <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{value}</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Referral Link Card */}
          <div className="lg:col-span-3 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Ваша партнёрская ссылка</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Поделитесь с автовладельцами — получайте комиссию за каждую транзакцию в течение 30 дней.</p>
            </div>

            {/* Link Input */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 font-mono text-sm text-slate-700 dark:text-slate-300 overflow-hidden">
                <span className="flex-1 truncate">{REFERRAL_LINK}</span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-bold transition-all
                  ${copied ? 'bg-emerald-500 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-white'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>

            {/* Referral Code */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Промокод</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-widest">{REFERRAL_CODE}</div>
              </div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 transition-all"
              >
                <QrCode className="w-4 h-4 text-cyan-500" />
                {showQR ? 'Скрыть QR' : 'QR-код'}
              </button>
            </div>

            {/* QR Code area */}
            {showQR && (
              <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
                {/* SVG-based QR-Code placeholder (demo visual) */}
                <div className="relative p-3 bg-white rounded-xl border-4 border-slate-900/5 shadow-inner">
                  <svg width="180" height="180" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                    <rect width="9" height="9" fill="white" />
                    {/* Finder patterns */}
                    <rect x="0" y="0" width="3" height="3" fill="#0f172a" rx="0.3"/>
                    <rect x="1" y="1" width="1" height="1" fill="white"/>
                    <rect x="6" y="0" width="3" height="3" fill="#0f172a" rx="0.3"/>
                    <rect x="7" y="1" width="1" height="1" fill="white"/>
                    <rect x="0" y="6" width="3" height="3" fill="#0f172a" rx="0.3"/>
                    <rect x="1" y="7" width="1" height="1" fill="white"/>
                    {/* Data cells */}
                    {[
                      [3,0],[5,0],[8,0],
                      [4,1],[6,1],
                      [3,2],[4,2],[6,2],
                      [0,3],[1,3],[4,3],[6,3],[8,3],
                      [2,4],[5,4],[7,4],
                      [0,5],[3,5],[5,5],[6,5],
                      [4,6],[5,6],[7,6],[8,6],
                      [3,7],[6,7],[8,7],
                      [4,8],[6,8],[8,8],
                    ].map(([cx, cy], i) => (
                      <rect key={i} x={cx} y={cy} width="1" height="1" fill="#0f172a" />
                    ))}
                    {/* Center logo hint */}
                    <rect x="3.5" y="3.5" width="2" height="2" fill="#06b6d4" rx="0.3"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Отсканируйте для перехода на сайт</p>
                <button className="flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Скачать PNG
                </button>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                Кулинг-период: <strong>30 дней</strong>. Вы получаете комиссию за все покупки пользователя в течение 30 дней после перехода по вашей ссылке.
              </p>
            </div>
          </div>

          {/* Top Referrals */}
          <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Активные рефералы</h2>

            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/50">
              {topReferrals.map((ref, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {ref.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{ref.name}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">Присоединился: {ref.joinDate}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">{ref.earned}</div>
                    <div className="text-xs text-slate-400">{ref.orders} заказа</div>
                  </div>
                </div>
              ))}
            </div>

            {topReferrals.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-8 text-slate-400">
                <Users className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">Рефералов пока нет. Поделитесь своей ссылкой!</p>
              </div>
            )}

            {/* Commission structure */}
            <div className="mt-auto bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Структура комиссий</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Покупка шин', rate: '5%', color: 'bg-cyan-500' },
                  { label: 'Покупка дисков', rate: '8%', color: 'bg-emerald-500' },
                  { label: 'Регистрация', rate: '₽100', color: 'bg-blue-500' },
                ].map(({ label, rate, color }, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${color}`}></div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Earnings History */}
        <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">История начислений</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Download className="w-3.5 h-3.5" />
              Выгрузить
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="pb-4 px-3 text-xs font-bold tracking-wider text-slate-500 uppercase">Дата</th>
                  <th className="pb-4 px-3 text-xs font-bold tracking-wider text-slate-500 uppercase">Событие</th>
                  <th className="pb-4 px-3 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Сумма</th>
                  <th className="pb-4 px-3 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {earningsHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-3 text-sm font-medium text-slate-500 whitespace-nowrap">{item.date}</td>
                    <td className="py-4 px-3 text-sm font-medium text-slate-700 dark:text-slate-300">{item.action}</td>
                    <td className={`py-4 px-3 text-sm font-black text-right whitespace-nowrap ${item.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {item.amount}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap
                        ${item.status === 'approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                         item.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                         'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {item.status === 'approved' ? 'Зачислено' : item.status === 'pending' ? 'В обработке' : 'Выплачено'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Withdrawal Modal */}
      {withdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setWithdrawOpen(false)}>
          <div className="w-full max-w-md mx-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Вывод средств</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Доступно к выводу: <span className="text-emerald-500 font-black text-lg">₽3,960</span></p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Способ вывода</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Банковская карта', icon: CreditCard },
                    { label: 'СБП', icon: Share2 },
                  ].map(({ label, icon: Icon }, idx) => (
                    <button key={idx} className={`flex items-center gap-2 p-4 rounded-2xl border-2 text-sm font-bold transition-all ${idx === 0 ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/20' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Сумма вывода</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₽</span>
                  <input type="number" defaultValue={3960} className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Номер карты</label>
                <input type="text" placeholder="**** **** **** 5678" defaultValue="**** **** **** 5678" className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Срок обработки: 1–3 рабочих дня. Комиссия: 0%</p>
              </div>

              <button
                onClick={() => setWithdrawOpen(false)}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-lg shadow-lg shadow-emerald-500/25 transition-all mt-2"
              >
                Подать заявку на вывод
              </button>
              <button onClick={() => setWithdrawOpen(false)} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-center transition-colors">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

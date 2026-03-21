'use client';

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  TrendingUp, Users, MousePointerClick, DollarSign, ArrowUpRight, 
  ArrowDownRight, ChevronDown, Download, Filter, MoreHorizontal,
  ExternalLink, Calendar as CalendarIcon, PieChart, Activity
} from 'lucide-react';

const revenueData = [
  { name: '1 Окт', revenue: 4000, leads: 240 },
  { name: '5 Окт', revenue: 3000, leads: 139 },
  { name: '10 Окт', revenue: 5000, leads: 980 },
  { name: '15 Окт', revenue: 7780, leads: 390 },
  { name: '20 Окт', revenue: 5890, leads: 480 },
  { name: '25 Окт', revenue: 9390, leads: 380 },
  { name: '30 Окт', revenue: 8490, leads: 430 },
];

const trafficSourcesData = [
  { name: 'SEO (Яндекс/Google)', value: 65, color: '#06b6d4' },
  { name: 'Яндекс.Директ', value: 20, color: '#3b82f6' },
  { name: 'Соц. сети', value: 10, color: '#8b5cf6' },
  { name: 'Прямые заходы', value: 5, color: '#f59e0b' },
];

const recentActivity = [
  { id: 1, type: 'clickout', product: 'Michelin Pilot Sport 4S', origin: 'tires-aggregator', payout: '₽1,250', status: 'pending', time: '2 мин назад', network: 'Admitad' },
  { id: 2, type: 'conversion', product: 'Vossen HF-2 20"', origin: 'wheels-detail', payout: '₽8,400', status: 'approved', time: '15 мин назад', network: 'Yandex.Market' },
  { id: 3, type: 'clickout', product: 'Pirelli P Zero', origin: 'tires-aggregator', payout: '₽950', status: 'pending', time: '1 час назад', network: 'Admitad' },
  { id: 4, type: 'conversion', product: 'BBS Super RS 19"', origin: 'wheels-detail', payout: '₽12,000', status: 'approved', time: '3 часа назад', network: 'Yandex.Market' },
  { id: 5, type: 'clickout', product: 'Yokohama Advan Sport', origin: 'calculator', payout: '₽800', status: 'declined', time: '5 часов назад', network: 'Admitad' },
];

function KPICard({ title, value, change, isPositive, icon: Icon, trendStr }: any) {
  return (
    <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-2xl group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/30 transition-colors">
          <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-cyan-500" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">{trendStr}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState('Последние 30 дней');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 relative overflow-hidden font-sans">
      {/* Background glow for admin context */}
      <div className="absolute top-0 right-0 w-[1000px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
               Панель управления
               <span className="px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">Admin</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Финансовая аналитика и статистика лидогенерации партнерских сетей.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              {dateRange}
              <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg">
              <Download className="w-4 h-4" />
              Экспорт
            </button>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KPICard 
             title="Выручка (Партнерки)" 
             value="₽845,900" 
             change="+12.5%" 
             isPositive={true} 
             icon={DollarSign} 
             trendStr="по сравнению с прошлым месяцем" 
          />
          <KPICard 
             title="Клики (Лиды)" 
             value="12,450" 
             change="+8.2%" 
             isPositive={true} 
             icon={MousePointerClick} 
             trendStr="переходы в партнерские сети" 
          />
          <KPICard 
             title="Конверсия (CR)" 
             value="3.8%" 
             change="-0.4%" 
             isPositive={false} 
             icon={TrendingUp} 
             trendStr="из клика в подтвержденный заказ" 
          />
          <KPICard 
             title="EPC (Заработок за клик)" 
             value="₽67.9" 
             change="+4.1%" 
             isPositive={true} 
             icon={Activity} 
             trendStr="средний доход с одного перехода" 
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Динамика выручки</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Прогноз на конец месяца: <span className="text-emerald-500 font-bold">₽1,200,000</span></p>
              </div>
              <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                 <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(val) => `₽${val / 1000}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" name="Выручка" stroke="#06b6d4" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#020817' }} activeDot={{ r: 8, stroke: '#06b6d4', strokeWidth: 2, fill: '#020817' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-cyan-500" />
                Источники
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              {trafficSourcesData.map((source, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{source.name}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{source.value}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${source.value}%`, backgroundColor: source.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50 rounded-2xl">
               <p className="text-sm text-cyan-800 dark:text-cyan-400 font-medium">
                 SEO трафик вырос на <span className="font-bold text-cyan-600 dark:text-cyan-300">14%</span> после последнего обновления каталога дисков.
               </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Recent Activity */}
        <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Лента транзакций & Лидов</h2>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Фильтр
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Товар / Услуга</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Источник</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Сетка</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Выплата</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Статус</th>
                  <th className="pb-4 pt-2 px-4 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Время</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'conversion' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500' : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500'}`}>
                           {activity.type === 'conversion' ? <DollarSign className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{activity.product}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">{activity.origin.replace('-', ' ')}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {activity.network}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-black text-slate-900 dark:text-white tracking-tight">{activity.payout}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider
                         ${activity.status === 'approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                           activity.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 
                           'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}
                       `}>
                         {activity.status === 'approved' ? 'Подтвержден' : activity.status === 'pending' ? 'В ожидании' : 'Отклонен'}
                       </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{activity.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="text-sm font-bold text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors">
              Показать больше истории
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Plus, Tag, Search,
  Eye, MessageSquare, Heart, Clock, CheckCircle2,
  XCircle, Edit3, Trash2, TrendingUp, X, Upload,
  ChevronDown, LayoutGrid, List,
} from 'lucide-react';

// ─── Demo data ─────────────────────────────────────────────────────────────────
const myListings = [
  {
    id: 1, type: 'Шины', title: 'Michelin Pilot Sport 4S',
    subtitle: '255/35 R19',
    price: 42000, condition: 'Б/У — Отличное', views: 312, messages: 7, favorites: 14,
    status: 'active', season: 'Лето', brand: 'Michelin', country: '🇫🇷',
    posted: '15 Мар 2026', expires: '14 Апр 2026',
    specs: ['255', '35', 'R19'],
  },
  {
    id: 2, type: 'Диски', title: 'BBS RS-GT',
    subtitle: '19" 5×112 ET45 · 4 шт.',
    price: 68000, condition: 'Б/У — Хорошее', views: 180, messages: 3, favorites: 22,
    status: 'active', brand: 'BBS', country: '🇩🇪',
    posted: '18 Мар 2026', expires: '17 Апр 2026',
    specs: ['19"', '5×112', 'ET45'],
  },
  {
    id: 3, type: 'Шины', title: 'Continental WinterContact TS 870',
    subtitle: '225/50 R17',
    price: 12000, condition: 'Б/У — Среднее', views: 54, messages: 1, favorites: 5,
    status: 'moderation', season: 'Зима', brand: 'Continental', country: '🇩🇪',
    posted: '20 Мар 2026', expires: '19 Апр 2026',
    specs: ['225', '50', 'R17'],
  },
  {
    id: 4, type: 'Диски', title: 'OZ Leggera HLT',
    subtitle: '17" 4×100 — Новые',
    price: 28500, condition: 'Новые', views: 0, messages: 0, favorites: 0,
    status: 'closed', brand: 'OZ Racing', country: '🇮🇹',
    posted: '01 Мар 2026', expires: 'Истёк',
    specs: ['17"', '4×100', 'ET38'],
  },
];

type Listing = typeof myListings[0];

const STATUS_MAP: Record<string, { label: string; dot: string; text: string }> = {
  active:     { label: 'Активно',     dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  moderation: { label: 'На проверке', dot: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400' },
  closed:     { label: 'Закрыто',     dot: 'bg-slate-400',   text: 'text-slate-500 dark:text-slate-400' },
};

// ─── New Listing Modal ─────────────────────────────────────────────────────────
function NewListingModal({ onClose }: { onClose: () => void }) {
  const [adType, setAdType] = useState<'tires' | 'wheels'>('tires');
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md overflow-y-auto py-10" onClick={onClose}>
      <div className="w-full max-w-2xl mx-4 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Подать объявление</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="px-8 py-6 flex flex-col gap-6">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Категория</label>
            <div className="grid grid-cols-2 gap-3">
              {(['tires', 'wheels'] as const).map(t => (
                <button key={t} onClick={() => setAdType(t)}
                  className={`py-3.5 rounded-2xl text-sm font-black border-2 transition-all ${adType === t ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`}>
                  {t === 'tires' ? '🛞 Шины' : '⚫ Диски'}
                </button>
              ))}
            </div>
          </div>
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Заголовок</label>
            <input type="text" placeholder={adType === 'tires' ? 'Michelin Pilot Sport 4S 255/35 R19' : 'BBS CH-R 19" 5×112 ET45'}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
          </div>
          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            {(adType === 'tires'
              ? [['Ширина', '245'], ['Профиль', '40'], ['Диаметр', '18']]
              : [['Диаметр', '19'], ['PCD', '5×112'], ['ET', '45']]
            ).map(([label, placeholder]) => (
              <div key={label}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
                <input type="text" placeholder={placeholder}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
              </div>
            ))}
          </div>
          {/* Condition + Season */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Состояние', opts: ['Новые', 'Б/У — Отличное', 'Б/У — Хорошее', 'Б/У — Среднее'] },
              { label: adType === 'tires' ? 'Сезонность' : 'Кол-во', opts: adType === 'tires' ? ['Лето', 'Зима', 'Всесезонные'] : ['4 шт.', '2 шт.', '1 шт.'] },
            ].map(({ label, opts }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
          {/* Price */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Цена (₽)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₽</span>
              <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Описание</label>
            <textarea rows={3} placeholder="Остаток протектора, причина продажи, история использования..."
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
          </div>
          {/* Photo upload */}
          <div className="flex items-center justify-center w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-cyan-50/20 dark:hover:bg-cyan-950/10 transition-all cursor-pointer text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-slate-400" />
              <p className="text-sm font-bold text-slate-500">Перетащите или <span className="text-cyan-500">выберите фото</span></p>
              <p className="text-xs text-slate-400">До 8 файлов · JPG, PNG до 10MB</p>
            </div>
          </div>
          {/* Submit */}
          <button onClick={onClose} className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl text-base shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5">
            Опубликовать объявление
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Listing Card ─────────────────────────────────────────────────────────
function ListingCardGrid({ listing }: { listing: Listing }) {
  const status = STATUS_MAP[listing.status];
  const isTire = listing.type === 'Шины';
  const isClosed = listing.status === 'closed';

  return (
    <div className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-cyan-500/40 ${isClosed ? 'opacity-60' : ''}`}>
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        {/* Placeholder icon */}
        <div className={`flex flex-col items-center gap-2 ${isClosed ? '' : 'group-hover:scale-110 transition-transform duration-500'}`}>
          <span className="text-6xl opacity-15 select-none">{isTire ? '🛞' : '⚫'}</span>
        </div>

        {/* Country flag top-right */}
        {listing.country && (
          <span className="absolute top-3 right-3 text-2xl drop-shadow-sm">{listing.country}</span>
        )}

        {/* Status badge top-left */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm
          ${listing.status === 'active' ? 'bg-emerald-500/15 dark:bg-emerald-950/60 border border-emerald-500/30' :
            listing.status === 'moderation' ? 'bg-amber-500/15 dark:bg-amber-950/60 border border-amber-500/30' :
            'bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className={status.text}>{status.label}</span>
        </div>

        {/* Season pill (tires only) */}
        {isTire && (listing as any).season && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 border border-white/50 dark:border-slate-700">
            {(listing as any).season}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Brand + type */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{listing.type} · {listing.brand}</span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate ml-2">{listing.condition}</span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-black text-slate-900 dark:text-white text-sm leading-snug line-clamp-1">{listing.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{listing.subtitle}</p>
        </div>

        {/* Spec chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {listing.specs.map((s, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black text-slate-600 dark:text-slate-300">{s}</span>
          ))}
        </div>

        {/* Price */}
        <div className="text-lg font-black text-cyan-600 dark:text-cyan-400">
          ₽{listing.price.toLocaleString('ru-RU')}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views}</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{listing.messages}</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{listing.favorites}</span>
          <span className="flex items-center gap-1 ml-auto"><Clock className="w-3 h-3" />{listing.posted}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          {listing.status === 'active' && (
            <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
              <Edit3 className="w-3.5 h-3.5" />Редактировать
            </button>
          )}
          {listing.status === 'moderation' && (
            <div className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Clock className="w-3.5 h-3.5" />На проверке
            </div>
          )}
          {listing.status === 'closed' && (
            <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-xs font-bold text-cyan-600 dark:text-cyan-400 transition-colors">
              <TrendingUp className="w-3.5 h-3.5" />Обновить
            </button>
          )}
          <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-[11px] font-bold text-red-500 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── List Listing Card ─────────────────────────────────────────────────────────
function ListingCardRow({ listing }: { listing: Listing }) {
  const status = STATUS_MAP[listing.status];
  const isTire = listing.type === 'Шины';
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-cyan-500/30 hover:shadow-lg transition-all group">
      {/* Thumb */}
      <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
        <span className="text-3xl opacity-15">{isTire ? '🛞' : '⚫'}</span>
        {listing.country && <span className="absolute top-1 right-1 text-base">{listing.country}</span>}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`flex items-center gap-1 text-[10px] font-black uppercase ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          <span className="text-[10px] text-slate-400 font-bold">{listing.type} · {listing.condition}</span>
        </div>
        <h3 className="font-black text-sm text-slate-900 dark:text-white truncate">{listing.title} <span className="font-medium text-slate-400">{listing.subtitle}</span></h3>
        <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-400">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views}</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{listing.messages}</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{listing.favorites}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{listing.posted}</span>
        </div>
      </div>
      {/* Specs chips */}
      <div className="hidden md:flex items-center gap-1.5">
        {listing.specs.map((s, i) => (
          <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black text-slate-600 dark:text-slate-300">{s}</span>
        ))}
      </div>
      {/* Price */}
      <div className="text-base font-black text-cyan-600 dark:text-cyan-400 whitespace-nowrap w-24 text-right">
        ₽{listing.price.toLocaleString('ru-RU')}
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {listing.status === 'active' && (
          <button className="flex items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
            <Edit3 className="w-3.5 h-3.5" />Ред.
          </button>
        )}
        {listing.status === 'closed' && (
          <button className="flex items-center gap-1 px-3 py-2 bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 transition-colors">
            <TrendingUp className="w-3.5 h-3.5" />Обновить
          </button>
        )}
        <button className="p-2 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MyListingsPage() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'moderation' | 'closed'>('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = myListings.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all:        myListings.length,
    active:     myListings.filter(l => l.status === 'active').length,
    moderation: myListings.filter(l => l.status === 'moderation').length,
    closed:     myListings.filter(l => l.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-24 pb-24 font-sans">
      {/* ── Aligned with FloatingNav width ── */}
      <div className="w-full md:w-[calc(100%-2rem)] max-w-screen-2xl mx-auto px-4 md:px-0">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-6">
          <Link href="/" className="hover:text-cyan-500 transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Мои объявления</span>
        </nav>

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Tag className="w-7 h-7 text-blue-500" />
              Мои объявления
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Управляйте объявлениями о продаже шин и дисков
            </p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/30 text-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Подать объявление
          </button>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {([
            { key: 'all',        label: 'Все',         icon: Tag,          cnt: counts.all },
            { key: 'active',     label: 'Активные',    icon: CheckCircle2, cnt: counts.active },
            { key: 'moderation', label: 'На проверке', icon: Clock,        cnt: counts.moderation },
            { key: 'closed',     label: 'Закрытые',    icon: XCircle,      cnt: counts.closed },
          ] as const).map(({ key, label, icon: Icon, cnt }) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${filter === key
                ? 'bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`min-w-[18px] h-[18px] flex items-center justify-center rounded-md text-[10px] font-black px-1 ${filter === key ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {cnt}
              </span>
            </button>
          ))}

          {/* Spacer + view toggle + search */}
          <div className="flex items-center gap-2 ml-auto">
            {/* View toggle */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск среди своих объявлений..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition" />
        </div>

        {/* ── Results count ── */}
        {filtered.length > 0 && (
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Найдено {filtered.length} объявлени{filtered.length === 1 ? 'е' : filtered.length < 5 ? 'я' : 'й'}
          </p>
        )}

        {/* ── Listings ── */}
        {filtered.length > 0 ? (
          view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(l => <ListingCardGrid key={l.id} listing={l} />)}

              {/* "Add new" placeholder card */}
              <button onClick={() => setShowModal(true)}
                className="min-h-[280px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/50 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/30 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                </div>
                <p className="text-sm font-bold text-slate-400 group-hover:text-cyan-500 transition-colors">Подать объявление</p>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(l => <ListingCardRow key={l.id} listing={l} />)}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
              <Tag className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-2">Объявления не найдены</h3>
            <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">Попробуйте изменить фильтры или подайте новое объявление.</p>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-xl transition-all">
              <Plus className="w-4 h-4" />Подать первое объявление
            </button>
          </div>
        )}
      </div>

      {showModal && <NewListingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

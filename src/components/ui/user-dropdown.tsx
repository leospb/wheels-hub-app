/* eslint-disable */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react";

import { useRouter } from "next/navigation";

const MENU_ITEMS = {
  status: [
    { value: "focus", icon: "solar:emoji-funny-circle-line-duotone", label: "Режим фокуса" },
    { value: "offline", icon: "solar:moon-sleep-line-duotone", label: "Не в сети" }
  ],
  admin: [
    { icon: "solar:shield-warning-bold-duotone", label: "Админка", href: "/admin", iconClass: "text-purple-500 dark:text-purple-400 font-bold" }
  ],
  profile: [
    { icon: "solar:user-circle-line-duotone", label: "Мой профиль", action: "profile" },
    { icon: "solar:tag-price-bold-duotone", label: "Мои объявления", href: "/listings", iconClass: "text-blue-500 dark:text-blue-400" },
    { icon: "solar:bell-line-duotone", label: "Уведомления", action: "notifications" }
  ],
  premium: [
    { 
      icon: "solar:star-bold", 
      label: "Перейти на Pro", 
      action: "upgrade",
      iconClass: "text-amber-600",
      badge: { text: "Скидка 20%", className: "bg-amber-600 text-white text-[11px] border-none" }
    },
    { icon: "solar:gift-line-duotone", label: "Партнерская программа", href: "/partner", iconClass: "text-emerald-600 dark:text-emerald-400" }
  ],
  support: [
    { icon: "solar:download-line-duotone", label: "Скачать приложение", action: "download" },
    { 
      icon: "solar:question-circle-line-duotone", 
      label: "Техподдержка", 
      action: "help",
      rightIcon: "solar:square-top-down-line-duotone"
    }
  ],
  account: [
    { icon: "solar:logout-2-bold-duotone", label: "Выйти", action: "logout" }
  ]
};

export const UserDropdown = ({ 
  user = {
    name: "Алексей",
    username: "@alexey.auto",
    avatar: "https://avatars.githubusercontent.com/u/101?v=4",
    initials: "АЛ",
    status: "online"
  },
  onAction = (action: string) => console.log('Действие:', action),
  onStatusChange = (val: string) => console.log('Смена статуса:', val),
  selectedStatus = "online",
  promoDiscount = "Скидка 20%",
  accounts = []
}) => {
  const router = useRouter();

  const handleAction = (item: any) => {
    if (item.href) {
      router.push(item.href);
    } else {
      onAction(item.action);
    }
  };

  const renderMenuItem = (item: any, index: number) => (
    <DropdownMenuItem 
      key={index}
      className={cn(item.badge || item.showAvatar || item.rightIcon ? "justify-between" : "", "p-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10")}
      onClick={() => handleAction(item)}
    >
      <span className="flex items-center gap-1.5 font-medium">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Icon
          icon={item.icon}
          className={`size-5 ${item.iconClass || "text-slate-500 dark:text-slate-400"}`}
        />
        {item.label}
      </span>
      {item.badge && (
        <Badge className={item.badge.className}>
          {promoDiscount || item.badge.text}
        </Badge>
      )}
      {item.rightIcon && (
        <Icon
          icon={item.rightIcon}
          className="size-4 text-slate-500 dark:text-slate-400"
        />
      )}
      {item.showAvatar && (
        <Avatar className="cursor-pointer size-6 shadow border border-white dark:border-slate-700">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      )}
    </DropdownMenuItem>
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      online: "text-green-600 bg-green-100 border-green-300 dark:text-green-400 dark:bg-green-900/30 dark:border-green-500/50",
      offline: "text-slate-600 bg-slate-100 border-slate-300 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-600",
      busy: "text-red-600 bg-red-100 border-red-300 dark:text-red-400 dark:bg-red-900/30 dark:border-red-500/50"
    };
    return colors[status.toLowerCase()] || colors.online;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-8 border border-white dark:border-slate-800 hover:ring-2 ring-cyan-500/50 transition-all">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="no-scrollbar w-[310px] rounded-2xl bg-white dark:bg-slate-900/95 p-0 shadow-xl border border-slate-200 dark:border-slate-800" align="end" sideOffset={8}>
        <section className="bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-lg rounded-t-2xl p-1 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center p-2">
            <div className="flex-1 flex items-center gap-2">
              <Avatar className="cursor-pointer size-10 border border-white dark:border-slate-700">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{user.name}</h3>
                <p className="text-muted-foreground text-xs text-slate-500 dark:text-slate-400">{user.username}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(user.status)} border text-[11px] rounded-sm capitalize font-medium`}>
              {user.status === 'online' ? 'онлайн' : user.status === 'offline' ? 'не в сети' : user.status === 'busy' ? 'занят' : user.status}
            </Badge>
          </div>


        </section>

        <section className="p-1">
          <DropdownMenuGroup>
            {MENU_ITEMS.admin.map(renderMenuItem)}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50 my-1 -mx-1" />

          <DropdownMenuGroup>
            {MENU_ITEMS.profile.map(renderMenuItem)}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50 my-1 -mx-1" />
          <DropdownMenuGroup>
            {MENU_ITEMS.premium.map(renderMenuItem)}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50 my-1 -mx-1" />
          <DropdownMenuGroup>
            {MENU_ITEMS.support.map(renderMenuItem)}
          </DropdownMenuGroup>
        </section>

        <section className="bg-slate-50/50 dark:bg-slate-800/30 rounded-b-2xl p-1 border-t border-slate-100 dark:border-slate-800/50">
          <DropdownMenuGroup>
            {MENU_ITEMS.account.map(renderMenuItem)}
          </DropdownMenuGroup>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

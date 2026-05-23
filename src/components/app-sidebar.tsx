import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { List, Zap } from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
    const menuItems = [
        {
            icon: List,
            label: 'Listar usuários',
            href: '/',
            color: 'from-orange-500 to-stone-500',
        },
    ];

    return (
        <Sidebar className="border-r border-slate-700">
            {/* Content */}
            <SidebarContent className="px-3 py-6">
                <SidebarGroup className="space-y-4">
                    <SidebarMenu className="space-y-3">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        className="group"
                                    >
                                        <Link
                                            href={item.href}
                                            className="relative h-auto rounded-xl p-4 transition-all duration-300 hover:bg-slate-800/80"
                                        >
                                            {/* Background com gradiente */}
                                            <div
                                                className={`absolute inset-0 rounded-xl bg-linear-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                                            />

                                            {/* Content */}
                                            <div className="relative flex w-full items-center gap-4">
                                                {/* Icon Box */}
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${item.color} shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                                >
                                                    <Icon className="h-5 w-5 text-white" />
                                                </div>

                                                {/* Label */}
                                                <span className="flex-1 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-slate-100">
                                                    {item.label}
                                                </span>

                                                {/* Indicator */}
                                                <div className="h-1.5 w-1.5 rounded-full bg-slate-600 opacity-0 transition-opacity duration-300 group-hover:bg-slate-400 group-hover:opacity-100" />
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

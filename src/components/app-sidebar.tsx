'use client';

import { apiOn } from '@/actions/handle-api';
import { useApi } from '@/app/utils/ApiContext';
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
import { List, Code2, FileText } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export function AppSidebar() {
    const { isApiOn, setIsApiOn } = useApi();

    useEffect(() => {
        if (!isApiOn) {
            let intervalId: NodeJS.Timeout;

            const checkApi = async () => {
                const state = await apiOn();

                setIsApiOn(state);

                if (state) {
                    clearInterval(intervalId);

                    // API voltou
                    window.location.reload();
                }
            };

            const init = async () => {
                const initialState = await apiOn();

                setIsApiOn(initialState);

                // só começa a monitorar se estiver offline
                if (!initialState) {
                    intervalId = setInterval(checkApi, 2000);
                }
            };

            init();

            return () => {
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [isApiOn, setIsApiOn]);

    const menuItems = [
        {
            icon: List,
            label: 'Listar usuários',
            href: '/',
            color: 'from-pink-500 to-rose-500',
        },
        {
            icon: FileText,
            label: 'Listar posts',
            href: '/posts',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <Sidebar className="border-r border-purple-900/30 bg-linear-to-r from-slate-950 via-purple-950 to-slate-950">
            {/* Header */}
            <SidebarHeader className="border-b border-purple-900/30 py-3 md:py-4 px-3 md:px-4">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-8 md:h-9 w-8 md:w-9 items-center justify-center rounded-lg bg-linear-to-br from-pink-500 to-rose-500 shadow-lg flex-shrink-0">
                        <Code2 className="h-4 md:h-5 w-4 md:w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold text-white truncate">
                            UserHub
                        </p>
                        <p className="text-xs text-purple-300/70 truncate">
                            Management
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="px-2 md:px-3 py-4 md:py-6">
                <SidebarGroup>
                    <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider mb-3 md:mb-4 px-2">
                        Menu
                    </p>
                    <SidebarMenu className="space-y-1 md:space-y-2">
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
                                            className="relative h-auto rounded-lg p-2 md:p-3 transition-all duration-300 hover:bg-purple-800/40"
                                        >
                                            {/* Background com gradiente */}
                                            <div
                                                className={`absolute inset-0 rounded-lg bg-linear-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                                            />

                                            {/* Content */}
                                            <div className="relative flex w-full items-center gap-2 md:gap-3">
                                                {/* Icon Box */}
                                                <div
                                                    className={`flex h-8 md:h-9 w-8 md:w-9 items-center justify-center rounded-md bg-linear-to-br ${item.color} shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110`}
                                                >
                                                    <Icon className="h-3.5 md:h-4 w-3.5 md:w-4 text-white" />
                                                </div>

                                                {/* Label */}
                                                <span className="flex-1 text-xs md:text-sm font-medium text-purple-100 transition-colors duration-300 group-hover:text-white truncate">
                                                    {item.label}
                                                </span>

                                                {/* Indicator */}
                                                <div className="h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-purple-700 opacity-0 transition-opacity duration-300 group-hover:bg-pink-400 group-hover:opacity-100 flex-shrink-0" />
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-purple-900/30 py-3 md:py-4 px-3 md:px-4">
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">
                        Status
                    </p>
                    {isApiOn ? (
                        <div className="flex items-center gap-2 rounded-lg bg-purple-800/20 p-2 md:p-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                            <p className="text-xs text-purple-200/70 truncate">
                                Sistema Operacional
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 rounded-lg bg-purple-800/20 p-2 md:p-3">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                            <p className="text-xs text-purple-200/70 truncate">
                                API fora do ar
                            </p>
                        </div>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

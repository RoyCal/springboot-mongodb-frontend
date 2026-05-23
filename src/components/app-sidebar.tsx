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
import { List, Code2 } from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
    const menuItems = [
        {
            icon: List,
            label: 'Listar usuários',
            href: '/',
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    return (
        <Sidebar className="border-r border-slate-800 bg-linear-to-r from-slate-900 to-slate-950">
            {/* Header */}
            <SidebarHeader className="border-b border-slate-800 py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <Code2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">UserHub</p>
                        <p className="text-xs text-slate-400">Management</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="px-3 py-6">
                <SidebarGroup>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
                        Menu Principal
                    </p>
                    <SidebarMenu className="space-y-2">
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
                                            className="relative h-auto rounded-lg p-3 transition-all duration-300 hover:bg-slate-800/80"
                                        >
                                            {/* Background com gradiente */}
                                            <div
                                                className={`absolute inset-0 rounded-lg bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                                            />

                                            {/* Content */}
                                            <div className="relative flex w-full items-center gap-3">
                                                {/* Icon Box */}
                                                <div
                                                    className={`flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br ${item.color} shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110`}
                                                >
                                                    <Icon className="h-4 w-4 text-white" />
                                                </div>

                                                {/* Label */}
                                                <span className="flex-1 text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                                                    {item.label}
                                                </span>

                                                {/* Indicator */}
                                                <div className="h-1.5 w-1.5 rounded-full bg-slate-700 opacity-0 transition-opacity duration-300 group-hover:bg-cyan-400 group-hover:opacity-100" />
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
            <SidebarFooter className="border-t border-slate-800 py-4 px-4">
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Status
                    </p>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs text-slate-300">
                            Sistema Operacional
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

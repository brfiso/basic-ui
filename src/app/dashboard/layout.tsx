'use client';
import { AppShell, Burger } from "@mantine/core";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Loading from "../ui/Loading";
import { useRouter } from "next/navigation";

export default function LayoutDashboard({ children }: Readonly<{
    children: React.ReactNode;
}>) {


    const router = useRouter();
    const [opened, { toggle }] = useDisclosure();
    const { data: session, status } = useSession();

    if (status == "unauthenticated") {
        return router.push("/login");
    }
    else if (status == "loading")
        return (<Loading />);
    else
        return (
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />

                    <Header />
                </AppShell.Header>

                <AppShell.Navbar p="md">
                    <Sidebar />
                </AppShell.Navbar>

                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        );
}
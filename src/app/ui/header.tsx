import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
} from '@mantine/core';
// import { MantineLogo } from '';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';


export default function Header({ opened, toggle }) {
    const theme = useMantineTheme();

    const { data: session, status } = useSession();

    return (
        <header className={classes.header}>
            <Group justify="space-between" h="100%" w="100%">
                <Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <h3>BFcode</h3>
                </Group>
                {LoginButtons(session, status)}
            </Group>
        </header>
    );
}

export function LoginButtons(session, status) {
    if (status === "authenticated") {
        return (
            <Group>
                <span>{session.user.name}</span>
                <Button variant="default" onClick={() => signOut()}>Sair</Button>
            </Group>
        );
    } else if (status === "loading") {
        return (<p>Carregando...</p>);

    } else {
        return (
            <Group>
                <Button>Cadastro</Button>
                <Button variant="default" onClick={() => signIn()}>Login</Button>
            </Group>
        );
    }
}
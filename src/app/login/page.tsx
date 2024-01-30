'use client';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './login.module.css';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Loading from '../ui/Loading';

export default function Page() {

    const router = useRouter();
    const { data: session, status } = useSession();

    const onSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);

        const username = form.get("username");
        const password = form.get("password");

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (!result.error) {
            return router.push("/");
        }
    };

    if (status === "loading")
        return (<Loading />);
    else if (status === 'authenticated')
        return router.push("/dashboard");
    else {

        return (
            <form onSubmit={(e) => onSubmit(e)}>
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Welcome back!
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Anchor size="sm" component="button">
                            Create account
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Email" placeholder="seu@email.com" required name="username" />
                        <PasswordInput label="Password" placeholder="********" required mt="md" name="password" />
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me" />
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type="submit">
                            Login
                        </Button>
                    </Paper>
                </Container>
            </form>
        );
    }
}
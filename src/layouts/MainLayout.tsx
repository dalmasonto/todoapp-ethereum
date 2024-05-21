import { AppShell, Burger, Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { useWeb3Modal } from '@web3modal/wagmi/react';
import { ReactNode } from 'react';


interface IMainLayout {
    children: ReactNode
}

function MainLayout(props: IMainLayout) {
    // const { open } = useWeb3Modal()
    // const { address, isConnected } = useAccount()

    const [opened, { toggle }] = useDisclosure();
    const { children } = props

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify='space-between'>
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Title>Todo List</Title>
                    </Group>
                    <Group gap={0} visibleFrom="sm" align='center' wrap='nowrap'>
                        {/* <Box>
                            <NavLink label="Home" />
                        </Box> */}
                        <w3m-button />
                        {/* <Button onClick={() => open()} radius={'xl'} variant='light'>
                            {
                                isConnected ? (
                                    <>{truncateString(address ?? '', 10, true)}</>
                                ) : (
                                    'Connect'
                                )
                            }
                        </Button> */}
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size={'xl'}>
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}

export default MainLayout
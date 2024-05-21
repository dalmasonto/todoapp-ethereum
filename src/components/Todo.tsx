import { ActionIcon, Alert, Button, Card, Group, Loader, LoadingOverlay, Stack, Text, Tooltip } from "@mantine/core"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { TODOABI } from "../config/abi"
import { CONTRACTADDRESS } from "../config/config"
import { IconChecks, IconInfoCircleFilled, IconReload, IconX } from "@tabler/icons-react"
import { useState } from "react"


export const Todo = ({ index, title, complete, mutate }: { index: number, title: string, complete: boolean, mutate: any }) => {
    const { writeContractAsync } = useWriteContract()
    const [loading, setLoading] = useState(false)

    const updateTodoStatus = () => {
        setLoading(true)
        writeContractAsync({
            abi: TODOABI,
            address: CONTRACTADDRESS,
            functionName: 'completeTodo',
            args: [
                index
            ],
        }).then(() => {
            mutate && mutate()
        }).catch(() => {
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Card radius={'md'}>
            <LoadingOverlay visible={loading} />
            <Group align="start" wrap="nowrap">
                <Tooltip label={complete ? 'Mark as Incomplete' : 'Mark as complete'}>
                    <ActionIcon radius={'xl'} size={'md'} color={complete ? 'green' : 'yellow'} onClick={updateTodoStatus}>
                        {
                            complete ? (
                                <IconChecks stroke={1.5} size={'18px'} />
                            ) : (
                                <IconX stroke={1.5} size={'18px'} />
                            )
                        }
                    </ActionIcon>
                </Tooltip>
                <Text>
                    {title}
                </Text>
            </Group>
        </Card>
    )
}

const Todos = () => {
    const { address } = useAccount()

    const { data, isLoading, refetch, isRefetching } = useReadContract({
        abi: TODOABI,
        address: CONTRACTADDRESS,
        functionName: 'getAddressTodos',
        args: [
            address
        ],
        account: address
    })
    const todos: any = data

    return (
        <>
            {

                !address ? (
                    <Alert radius={'md'} color="indigo" title="Wallet not connected" icon={<IconInfoCircleFilled />}>
                        <Stack justify="center" align="center">
                            <w3m-button />
                        </Stack>
                    </Alert>
                ) : null
            }
            {
                (address && isLoading) ? (
                    <Loader />
                ) : (
                    <Stack>
                        {
                            address ? (
                                <Group>
                                    <Button radius={'xl'} loading={isRefetching || isLoading} onClick={() => refetch()} leftSection={<IconReload />}>Refresh</Button>
                                </Group>
                            ) : null
                        }
                        {
                            data ? (
                                todos?.map((todo: any, i: number) => (
                                    <Todo key={`todo_${i}`} {...todo} index={i} mutate={() => refetch()} />
                                ))
                            ) : null
                        }
                        {
                            todos?.length > 10 ? (
                                <Group>
                                    <Button radius={'xl'} loading={isRefetching || isLoading} onClick={() => refetch()} leftSection={<IconReload />}>Refresh</Button>
                                </Group>
                            ) : null
                        }
                    </Stack>
                )
            }
        </>
    )
}

export default Todos
import { Button, Card, Grid, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useWriteContract } from 'wagmi'
import { TODOABI } from '../config/abi'
import { CONTRACTADDRESS } from '../config/config'
import { useEffect, useState } from 'react'

const AddTodo = () => {

    const { writeContractAsync, isPending, status } = useWriteContract()
    const [color, setColor] = useState("transparent")
    const form = useForm({
        initialValues: {
            todo: ""
        },
        validate: {
            todo: val => val === "" ? "Todo is required" : null
        }
    })

    const addTodo = async () => {
        writeContractAsync({
            abi: TODOABI,
            address: CONTRACTADDRESS,
            functionName: 'addTodo',
            args: [
                form.values.todo
            ],
        }).then(() => {

        }).catch(() => {

        }).finally(() => {
            form.reset()
            setColor("transparent")
        })
    }

    const getColor = () => {
        let color = "transparent"
        switch (status) {
            case "error":
                color = "red"
                break;

            case "idle":
                color = "transparent"
                break;

            case "pending":
                color = "yellow"
                break;

            case "success":
                color = "transparent"
                break;

            default:
                color = "transparent"
                break;
        }
        setColor(color)
        return color;
    }

    useEffect(() => {
        getColor()
    }, [status])

    return (
        <div>
            <Card radius={'md'} withBorder style={{ borderColor: color }}>
                <form onSubmit={form.onSubmit(_values => addTodo())}>
                    <Grid>
                        <Grid.Col span={12}>
                            <Textarea {...form.getInputProps('todo')} label="Todo" placeholder='Write your todo here' minRows={3} radius={'md'} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Button radius={'md'} type='submit' loading={isPending}>
                                Add Todo
                            </Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}

export default AddTodo
import { Container, Stack } from "@mantine/core"
import AddTodo from "../components/AddTodo"
import Todos from "../components/Todo"


const HomePage = () => {
    return (
        <div>
            <Container size={'sm'}>
                <Stack>
                    <AddTodo />
                    <Todos />
                </Stack>
            </Container>
        </div>
    )
}

export default HomePage
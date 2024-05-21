import "@mantine/core/styles.css";
import MainProvider from "./providers/MainProvider";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <MainProvider>
      <MainLayout>
        <></>
        <HomePage />
      </MainLayout>
    </MainProvider>
  )
}

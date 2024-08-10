import { ContentBody, ContentLayout, TitleBar } from "@/components";
import { useSetAtom } from "jotai";
import { loadConfigAtom } from "@/store";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components";

function App() {
  const loadConfig = useSetAtom(loadConfigAtom);

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <main className="h-full overflow-hidden antialiased select-none text-foreground font-Krypton rounded-lg bg-background">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TitleBar />
        <ContentLayout className="border-l border-slate-800">
          <ContentBody />
        </ContentLayout>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </main>
  );
}

export default App;

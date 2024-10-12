import { ContentBody, ContentLayout, Control } from "@/components";
import { useAtomValue, useSetAtom } from "jotai";
import { fontFamilyAtom, loadConfigAtom } from "@/store";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components";
import { cn } from "@/libs";

function App() {
  const loadConfig = useSetAtom(loadConfigAtom);
  const fontFamily = useAtomValue(fontFamilyAtom);

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <main
      className={cn(
        "h-full overflow-hidden antialiased select-none text-foreground rounded-lg bg-background",
        fontFamily,
      )}
    >
      <ThemeProvider defaultTheme="system">
        <Control />
        <ContentLayout>
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

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableView from "@/components/TableView/TableView";
import { ThemeProvider } from "@/components/controls/settings/theme-toggle/ThemeProvider";
import { Control } from "@/components/controls/Control";
import { cn } from "@/libs/utils/utils";
import { fontFamilyAtom, loadConfigAtom } from "@/libs/store/config";

function App() {
  const loadConfig = useSetAtom(loadConfigAtom);
  const fontFamily = useAtomValue(fontFamilyAtom);

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <main
      className={cn(
        "h-screen overflow-auto antialiased select-none text-foreground rounded-lg bg-background",
        fontFamily
      )}
    >
      <ThemeProvider defaultTheme="system">
        <Control />
        <div className="p-10">
          <TableView />
        </div>
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

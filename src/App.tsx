import { ContentBody, ContentLayout, RootLayout, Sidebar, TitleBar } from "@/components";
import { useSetAtom } from "jotai";
import { loadConfigAtom } from "@/store";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const loadConfig = useSetAtom(loadConfigAtom);

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <main className="h-full overflow-hidden antialiased text-white select-none font-Krypton bg-slate-700">
      <TitleBar />
      <RootLayout>
        <Sidebar className="pr-1" />
        <ContentLayout className="border-l border-slate-800">
          <ContentBody />
        </ContentLayout>
      </RootLayout>
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
    </main>
  );
}

export default App;

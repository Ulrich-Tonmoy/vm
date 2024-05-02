import { ContentBody, ContentLayout, RootLayout, Sidebar } from "@/components";
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
    <>
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
    </>
  );
}

export default App;

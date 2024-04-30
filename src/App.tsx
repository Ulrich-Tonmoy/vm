import { ContentBody, ContentLayout, RootLayout, Sidebar } from "@/components";
import { useSetAtom } from "jotai";
import { loadConfigAtom } from "@/store";
import { useEffect } from "react";

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
    </>
  );
}

export default App;

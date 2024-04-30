import { ContentBody, ContentLayout, RootLayout, Sidebar } from "@/components";

function App() {
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

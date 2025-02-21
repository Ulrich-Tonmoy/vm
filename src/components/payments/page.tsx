import { getNodeVersionList, VersionType } from "@/libs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { loadNodeVersionAtom } from "@/store";

export default function DemoPage() {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const all = getNodeVersionList(VersionType.DEFAULT);

  const refreshAvailableVersion = async (isRefresh: boolean) => {
    await loadNodeVersion(isRefresh);
  };

  useEffect(() => {
    refreshAvailableVersion(false);
  }, []);

  return (
    <div className="container mx-auto py-10 overflow-auto">
      <DataTable columns={columns} data={all} />
    </div>
  );
}

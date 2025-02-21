import { getNodeVersionList, VersionType } from "@/libs";
import { DataTable } from "./DataTable";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { loadNodeVersionAtom } from "@/store";
import { Column } from "@/components/TableView/Column";

export default function TableView() {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const all = getNodeVersionList(VersionType.DEFAULT);

  const refreshAvailableVersion = async (isRefresh: boolean) => {
    await loadNodeVersion(isRefresh);
  };

  useEffect(() => {
    refreshAvailableVersion(false);
  }, []);

  return <DataTable columns={Column} data={all} />;
}

import { DataTable } from "./DataTable";
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { loadNodeVersionAtom, nodeAllVersionAtom } from "@/store";
import { Column } from "@/components/TableView/Column";

export default function TableView() {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const all = useAtomValue(nodeAllVersionAtom);

  const refreshAvailableVersion = async (isRefresh: boolean) => {
    await loadNodeVersion(isRefresh);
  };

  useEffect(() => {
    refreshAvailableVersion(false);
  }, []);

  return <DataTable columns={Column} data={all} />;
}

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  dataDirPath,
  deleteFolder,
  NODE_DOWNLOAD_URL,
  NODE_INSTALLED_PATH,
  NODE_UNZIP_FOLDER_NAME,
  NodeVersionListModel,
  removeFromPath,
  setToPath,
  showToaster,
  ToasterType,
} from "@/libs";
import { useAtomValue, useSetAtom } from "jotai";
import {
  downloadingProgressAtom,
  downloadingVersionAtom,
  loadNodeVersionAtom,
  nodeAtom,
  toastIdAtom,
  updateConfigAtom,
  updateDownloadingAtom,
} from "@/store";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { ColumnFilter } from "./ColumnFilter";
import { ask } from "@tauri-apps/plugin-dialog";

export const Column: ColumnDef<NodeVersionListModel>[] = [
  {
    accessorKey: "version",
    header: ({ column }) => <ColumnFilter column={column} title="Version" />,
    enableMultiSort: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnFilter column={column} title="Date" />,
    enableMultiSort: true,
  },
  {
    accessorKey: "npm",
    header: ({ column }) => <ColumnFilter column={column} title="NPM" />,
    enableMultiSort: true,
  },
  {
    accessorKey: "v8",
    header: ({ column }) => <ColumnFilter column={column} title="V8" />,
    enableMultiSort: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <ColumnFilter
        column={column}
        title="Type"
        filterValues={["LTS", "Current", "Stable", "Unstable"]}
      />
    ),
    enableMultiSort: true,
    filterFn: (row, id, filterValues: string[]) => {
      if (!filterValues?.length) return true;
      const value = row.getValue(id) as string;
      return filterValues.includes(value);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ColumnFilter
        column={column}
        title="Status"
        filterValues={["Active", "Installed"]}
      />
    ),
    enableMultiSort: true,
    filterFn: (row, id, filterValues: string[]) => {
      if (!filterValues?.length) return true;
      const value = row.getValue(id) as string;
      return filterValues.includes(value);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const downloadingVersion = useAtomValue(downloadingVersionAtom);
      const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
      const toastId = useAtomValue(toastIdAtom);
      const downloadingProgress = useAtomValue(downloadingProgressAtom);
      const updateDownloading = useSetAtom(updateDownloadingAtom);
      const node = useAtomValue(nodeAtom);
      const updateConfig = useSetAtom(updateConfigAtom);

      const downloadFile = async () => {
        const newName = row.original.version;
        const oldName = NODE_UNZIP_FOLDER_NAME(newName);
        const url = NODE_DOWNLOAD_URL(newName);
        const dest = await dataDirPath();
        await invoke("download_and_unzip", { url, dest, oldName, newName });
        updateDownloading({ version: row.original.version });
      };

      const onClickDownload = async () => {
        if (downloadingVersion !== "") return;
        downloadFile();
        const id = showToaster({
          type: ToasterType.LOADING,
          msg: `Downloading ${downloadingVersion} - ${downloadingProgress.toFixed(2)}%`,
        });
        updateDownloading({ toastId: id as number });
      };

      useEffect(() => {
        if (downloadingVersion === row.original.version) {
          if (downloadingProgress > 1 && downloadingProgress < 100) {
            showToaster(
              { type: ToasterType.UPDATE, id: toastId },
              {
                render: `Downloading ${downloadingVersion} - ${downloadingProgress.toFixed(
                  2,
                )}%`,
                isLoading: true,
              },
            );
          }

          if (downloadingProgress >= 100) {
            showToaster(
              { type: ToasterType.UPDATE, id: toastId },
              {
                render: `Installed Node ${downloadingVersion}`,
                type: "success",
                isLoading: false,
              },
            );
            updateConfig({
              Node: {
                active: node.active,
                installed: [...node.installed, downloadingVersion],
              },
            });

            loadNodeVersion(false);
            updateDownloading({ version: row.original.version, toastId: 0, progress: 0 });
          }
        }
      }, [downloadingProgress]);

      useEffect(() => {
        const listenProgress = listen("download_progress", (event) => {
          updateDownloading({ progress: event.payload as number });
        });

        return () => {
          listenProgress.then((f) => f());
        };
      }, []);

      const useVersion = async () => {
        const path = await dataDirPath();
        const active = node.active;
        if (active) {
          removeFromPath([NODE_INSTALLED_PATH(path, active)]);
        }
        setToPath(NODE_INSTALLED_PATH(path, row.original.version));
        updateConfig({
          Node: {
            active: row.original.version,
            installed: [...node.installed],
          },
        });
        loadNodeVersion(false);
        showToaster({
          msg: "Activated Node " + row.original.version,
          type: ToasterType.SUCCESS,
        });
      };

      const unUseVersion = async () => {
        const path = await dataDirPath();
        removeFromPath([NODE_INSTALLED_PATH(path, row.original.version)]);
        updateConfig({
          Node: {
            active: "",
            installed: [...node.installed],
          },
        });
        loadNodeVersion(false);
        showToaster({
          msg: "Deactivated Node " + row.original.version,
          type: ToasterType.WARN,
        });
      };

      const deleteVersion = async () => {
        const confirmed = await ask(
          `Are you sure you want to delete '${row.original.version}'?\nThis action cannot be reverted.`,
          {
            title: `Are you sure you want to delete '${row.original.version}'?`,
            kind: "warning",
          },
        );

        if (!confirmed) return false;

        const path = await dataDirPath();
        const res = await deleteFolder(NODE_INSTALLED_PATH(path, row.original.version));
        if (res) {
          const newTools = node.installed.filter((v) => v !== row.original.version);
          updateConfig({
            Node: {
              active: node.active,
              installed: [...newTools],
            },
          });
          loadNodeVersion(false);
          showToaster({
            msg: "Uninstalled Node " + row.original.version,
            type: ToasterType.WARN,
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {!row.original.status && (
              <DropdownMenuItem onClick={onClickDownload}>Install</DropdownMenuItem>
            )}
            {row.original.status && row.original.status !== "Active" && (
              <DropdownMenuItem onClick={useVersion}>Activate</DropdownMenuItem>
            )}
            {row.original.status === "Active" && (
              <DropdownMenuItem onClick={unUseVersion}>Deactivate</DropdownMenuItem>
            )}
            {row.original.status === "Installed" && (
              <DropdownMenuItem onClick={deleteVersion}>Uninstall</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

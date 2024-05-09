import { selectedToolAtom } from "@/store";
import { ResponseType, fetch } from "@tauri-apps/api/http";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export const Available = () => {
  const selectedTool = useAtomValue(selectedToolAtom);

  useEffect(() => {
    fetch(`https://nodejs.org/dist/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: ResponseType.Text,
    }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <title>{selectedTool}</title>
      <div className="mb-4 text-xl font-black">Available For Installation</div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">Current</div>
          <div>
            Current
            <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
              Install
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">LTS</div>
          <div>
            LTS
            <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
              Install
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">Old</div>
          <div>
            Old
            <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
              Install
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

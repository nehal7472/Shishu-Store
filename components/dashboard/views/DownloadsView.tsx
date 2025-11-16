/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/views/DownloadsView.tsx
"use client";
import { useAppSelector } from "@/lib/hooks";

export default function DownloadsView() {
  const downloads = useAppSelector((s) => s.dashboard.downloads || []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Downloads</h2>

      {downloads.length === 0 ? (
        <div className="text-sm text-gray-500">No downloads available.</div>
      ) : (
        <div className="grid gap-3">
          {downloads.map((d: any) => (
            <div key={d.id} className="bg-white border rounded-lg p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{d.name}</div>
                {d.expiresAt && <div className="text-sm text-gray-500">Expires: {new Date(d.expiresAt).toLocaleDateString()}</div>}
              </div>
              <a className="text-sm text-[#EC8923]" href={d.url} download>Download</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

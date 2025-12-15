import React, { useState } from "react";
import DashboardCard from "../../../shared/ui/card";
import { Upload } from "lucide-react";

interface AICommandCenterProps {
  onUploadCalendar: (file: File) => void;
  onCommand: (command: string) => void;
}

const AICommandCenter: React.FC<AICommandCenterProps> = ({
  onUploadCalendar,
  onCommand,
}) => {
  const [command, setCommand] = useState("");

  return (
    <DashboardCard title="AI Command Center">
      <div className="space-y-3">
        {/* Input Command */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., Generate weekly study plan for Unit 1 & 2..."
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 border border-zinc-600 text-white px-4 py-3"
          />
          <button
            className="px-4 py-2 bg-emerald-600 rounded-xl hover:bg-emerald-700"
            onClick={() => onCommand(command)}
          >
            Execute
          </button>
        </div>

        {/* Upload Calendar */}
        <label className="flex items-center gap-2 cursor-pointer bg-zinc-700 hover:bg-zinc-600 px-4 py-3 rounded-xl text-gray-200">
          <Upload size={18} />
          Upload Academic Calendar
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUploadCalendar(file);
            }}
          />
        </label>

        {/* Response Area */}
        <div className="bg-zinc-900 text-gray-400 h-32 p-3 rounded-xl overflow-y-auto text-sm">
          AI responses will appear here...
        </div>
      </div>
    </DashboardCard>
  );
};

export default AICommandCenter;

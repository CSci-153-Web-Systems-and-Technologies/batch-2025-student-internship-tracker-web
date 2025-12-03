"use client";
import { ProjectSelectorProps } from "@/types";


export default function ProjectSelect({ projects, selected, onChange }:ProjectSelectorProps) {
  return (
    <select
      className="bg-slate-900 border border-slate-700 text-white rounded-md p-2"
      value={selected ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {projects.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
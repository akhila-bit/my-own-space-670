import { createContext, useContext, type ReactNode } from "react";
import { GripVertical, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ShellCtx = { dragAttributes?: Record<string, unknown>; dragListeners?: Record<string, unknown> };
const Ctx = createContext<ShellCtx>({});
export const useShell = () => useContext(Ctx);

export function WidgetShell({
  id,
  title,
  subtitle,
  onRemove,
  children,
  accent,
}: {
  id: string;
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: ReactNode;
  accent?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="paper rounded-md flex flex-col">
      <header className="flex items-center gap-2 px-3 py-2 border-b border-[var(--rule)] bg-[oklch(0.95_0.025_85)] rounded-t-md">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-[var(--muted-foreground)] hover:text-[var(--ink)]"
          aria-label="Drag widget"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[13px] font-mono uppercase tracking-wider text-[var(--ink)] truncate">
            {accent && <span className="text-[var(--accent)] mr-1.5">§</span>}
            {title}
          </h2>
          {subtitle && <p className="text-[11px] text-[var(--muted-foreground)] font-mono truncate">{subtitle}</p>}
        </div>
        <button
          onClick={onRemove}
          className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition"
          aria-label="Remove widget"
        >
          <X className="w-4 h-4" />
        </button>
      </header>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}

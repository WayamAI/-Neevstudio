import { AppIcon } from "@/components/ui/app-icon";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { BreakdownNode } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { classStyle, domainStyle } from "@/lib/breakdown-styles";

export function TreeNode({
  node,
  depth = 0,
  onSelect,
  selectedId,
}: {
  node: BreakdownNode;
  depth?: number;
  onSelect: (n: BreakdownNode) => void;
  selectedId: string;
}) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const selected = selectedId === node.id;
  return (
    <div>
      <div
        onClick={() => onSelect(node)}
        className={cn(
          "group flex items-center gap-2 py-1.5 pr-3 rounded-md cursor-pointer text-label-md hover:bg-muted/60",
          selected && "bg-primary/8 ring-1 ring-primary/20",
        )}
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        <button
          type="button"
          aria-label={`${open ? "Collapse" : "Expand"} ${node.name}`}
          aria-expanded={hasChildren ? open : undefined}
          tabIndex={hasChildren ? 0 : -1}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className={cn(
            "h-4 w-4 flex items-center justify-center text-muted-foreground shrink-0",
            !hasChildren && "invisible",
          )}
        >
          {open ? (
            <AppIcon name="chevronDown" size="sm" />
          ) : (
            <AppIcon name="chevronRight" size="sm" />
          )}
        </button>
        <Badge
          variant="outline"
          className={cn("h-5 text-micro px-1.5 tabular border-0", domainStyle[node.domain])}
        >
          {node.domain}
        </Badge>
        <span className="tabular text-muted-foreground text-caption">{node.id}</span>
        <span className="truncate font-medium">{node.name}</span>
        <span className="ml-auto flex items-center gap-2">
          {node.classification && (
            <Badge
              variant="outline"
              className={cn("h-5 text-micro px-1.5 border-0", classStyle[node.classification])}
            >
              {node.classification}
            </Badge>
          )}
          <span className="tabular text-caption text-muted-foreground">{node.reqs} req</span>
          <span className="tabular text-caption text-muted-foreground/70">L{node.level}</span>
        </span>
      </div>
      {open && hasChildren && (
        <div>
          {node.children!.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function BreakdownTree({
  root,
  selectedId,
  onSelect,
}: {
  root: BreakdownNode;
  selectedId: string;
  onSelect: (n: BreakdownNode) => void;
}) {
  return <TreeNode node={root} onSelect={onSelect} selectedId={selectedId} />;
}

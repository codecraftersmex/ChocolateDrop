"use client";

import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface Column<T> {
  align?: "center" | "left" | "right";
  collapsible?: boolean;
  header: string;
  key: string;
  render: (item: T, isExpanded?: boolean, onToggle?: () => void) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  expandedContent?: (item: T) => ReactNode;
  getRowKey: (item: T) => string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchTerm?: string;
  tableClassName?: string;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No hay datos disponibles",
  expandedContent,
  getRowKey,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  searchTerm = "",
  tableClassName,
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    () => new Set(),
  );
  return (
    <div className="space-y-4">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        {onSearchChange && (
          <div className="relative w-full max-w-md flex-1">
            <Search
              className={`
                absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform
                text-muted-foreground
              `}
            />
            <Input
              className="border-input bg-background pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              value={searchTerm}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div
        className={`
          overflow-hidden rounded-lg border border-border bg-background shadow-sm
        `}
      >
        <Table className={cn("min-w-[720px]", tableClassName)}>
          <TableHeader>
            <TableRow
              className={`
                border-b border-border bg-muted/50
                hover:bg-muted/50
              `}
            >
              {columns.map((column) => (
                <TableHead
                  className="font-semibold text-foreground"
                  key={column.key}
                  style={{
                    textAlign: column.align,
                    width: column.width,
                  }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  className={`
                    bg-background py-12 text-center text-muted-foreground
                  `}
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const rowKey = getRowKey(item);
                const isExpanded = expandedRows.has(rowKey);
                const hasExpandableContent =
                  expandedContent && columns.some((col) => col.collapsible);

                const toggleExpanded = () => {
                  setExpandedRows((prev) => {
                    const newSet = new Set(prev);
                    if (newSet.has(rowKey)) {
                      newSet.delete(rowKey);
                    } else {
                      newSet.add(rowKey);
                    }
                    return newSet;
                  });
                };

                return (
                  <React.Fragment key={rowKey}>
                    <TableRow
                      className={`
                        border-b border-border/50 bg-background
                        transition-colors
                        hover:bg-muted/30
                      `}
                    >
                      {columns.map((column) => (
                        <TableCell
                          className="text-foreground"
                          key={column.key}
                          style={{
                            textAlign: column.align,
                            width: column.width,
                          }}
                        >
                          {column.render(
                            item,
                            column.collapsible ? isExpanded : undefined,
                            column.collapsible ? toggleExpanded : undefined,
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {hasExpandableContent && isExpanded && expandedContent && (
                      <TableRow>
                        <TableCell className="p-0" colSpan={columns.length}>
                          <div
                            className={`border-t border-border bg-muted/20 p-6`}
                          >
                            {expandedContent(item)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

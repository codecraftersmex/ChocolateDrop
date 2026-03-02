"use client";

import type { Event } from "@/lib/types/event";

import { MobileEventCard } from "@/components/dashboard/mobile-event-card";
import { DataTable } from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEventColumns } from "@/hooks/event/use-event-columns";
import { useEvents } from "@/hooks/event/use-events";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateEventFilterTabs } from "@/lib/constants/event-constants";
import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function EventSection() {
  const isMobile = useIsMobile();
  const { events, loadEvents, loading, updateStatus, updatingEvent } =
    useEvents();
  const [expandedEventKeys, setExpandedEventKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const getEventKey = (event: Event) => event.id || "";

  // Filter events when search term or status filter changes
  useEffect(() => {
    let filtered = events;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((event) => event.status === selectedStatus);
    }

    // Filter by search term (event number or customer name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.id?.toLowerCase().includes(term) ||
          event.customer.name.toLowerCase().includes(term),
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedStatus, searchTerm]);

  const filterTabs = generateEventFilterTabs(events);
  const hasActiveFilters = searchTerm.trim() || selectedStatus !== "all";
  const emptyMessage = hasActiveFilters
    ? "No se encontraron eventos con los filtros aplicados"
    : "No hay eventos disponibles";

  // Get reusable table columns
  const columns = useEventColumns({
    onStatusChange: updateStatus,
    updatingEvent,
  });

  const toggleExpanded = (rowKey: string) => {
    setExpandedEventKeys((prev) => {
      const updated = new Set(prev);
      if (updated.has(rowKey)) {
        updated.delete(rowKey);
      } else {
        updated.add(rowKey);
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-6xl">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Cargando eventos...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`
        container mx-auto my-auto
        sm:px-4 sm:py-8
      `}
    >
      <Card
        className={`
          border-border/80 bg-gradient-to-b from-card via-card to-accent/20
          shadow-md
        `}
      >
        <CardHeader
          className={`
            rounded-t-xl border-b border-border/70 bg-gradient-to-r
            from-accent/35 to-background/70 px-4 py-4
            sm:px-6 sm:py-6
          `}
        >
          <div
            className={`
              flex flex-col gap-3
              sm:flex-row sm:items-center sm:justify-between sm:gap-0
            `}
          >
            <CardTitle
              className={`
                text-xl font-bold
                sm:text-2xl
              `}
            >
              Gestión de Eventos
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent
          className={`
            space-y-3 p-4 pt-0
            sm:space-y-6 sm:p-6 sm:pt-0
          `}
        >
          {/* Filter Tabs */}
          <FilterTabs
            onValueChange={setSelectedStatus}
            tabs={filterTabs}
            value={selectedStatus}
          />

          {isMobile ? (
            <div
              className={`
                space-y-4 rounded-xl border border-border/70 bg-background/50
                p-3
              `}
            >
              <div className="relative">
                <Search
                  className={`
                    pointer-events-none absolute top-1/2 left-3 h-4 w-4
                    -translate-y-1/2 text-muted-foreground
                  `}
                />
                <Input
                  className={`
                    h-10 border-border/70 bg-background/85 pl-9
                    focus-visible:ring-primary/40
                  `}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar evento..."
                  value={searchTerm}
                />
              </div>
              {filteredEvents.length === 0 ? (
                <div
                  className={`
                    rounded-lg border border-dashed border-border bg-muted/20
                    px-4 py-8 text-center text-sm text-muted-foreground
                  `}
                >
                  {emptyMessage}
                </div>
              ) : (
                filteredEvents.map((event) => {
                  const rowKey = getEventKey(event);
                  return (
                    <div className="relative pb-2" key={rowKey}>
                      <div
                        className={`
                          pointer-events-none absolute inset-x-2 top-2 bottom-0
                          rounded-xl border border-border/50 bg-accent/30
                        `}
                      />
                      <div className="relative">
                        <MobileEventCard
                          event={event}
                          isExpanded={expandedEventKeys.has(rowKey)}
                          isUpdating={updatingEvent === rowKey}
                          onStatusChange={(status) =>
                            updateStatus(rowKey, status)
                          }
                          onToggleExpanded={() => toggleExpanded(rowKey)}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div
              className={`
                rounded-xl border border-border/70 bg-background/55 p-3
                shadow-inner
              `}
            >
              <DataTable
                columns={columns}
                data={filteredEvents}
                emptyMessage={emptyMessage}
                getRowKey={getEventKey}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Buscar por # de evento o nombre del cliente..."
                searchTerm={searchTerm}
                tableClassName="min-w-[940px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

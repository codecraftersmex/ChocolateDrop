"use client";

import type { Order } from "@/lib/types/order";

import { MobileOrderCard } from "@/components/dashboard/mobile-order-card";
import { DataTable } from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { ExpandedProducts } from "@/components/shared/table/cells/expanded-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOrderColumns } from "@/hooks/order/use-order-columns";
import { useOrders } from "@/hooks/order/use-orders";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateOrderFilterTabs } from "@/lib/constants/order-constants";
import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function OrderSection() {
  const isMobile = useIsMobile();
  const { loading, loadOrders, orders, updateStatus, updatingOrder } =
    useOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrderKeys, setExpandedOrderKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const getOrderKey = (order: Order) => order.id || order.orderNumber || "";

  // Filter orders when search term or status filter changes
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Filter by search term (order number or customer name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id?.toLowerCase().includes(term) ||
          order.orderNumber?.toLowerCase().includes(term) ||
          order.customer.name.toLowerCase().includes(term),
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm]);

  const filterTabs = generateOrderFilterTabs(orders);
  const hasActiveFilters = searchTerm.trim() || selectedStatus !== "all";
  const emptyMessage = hasActiveFilters
    ? "No se encontraron pedidos con los filtros aplicados"
    : "No hay pedidos disponibles";

  // Get reusable table columns
  const columns = useOrderColumns({
    onStatusChange: updateStatus,
    updatingOrder,
  });

  const toggleExpanded = (rowKey: string) => {
    setExpandedOrderKeys((prev) => {
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
              Cargando pedidos...
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
            rounded-t-xl border-b border-border/70 bg-gradient-to-r px-4 py-4
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
              Gestión de Pedidos
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent
          className={`
            space-y-3 p-1 pt-0
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
                    h-10 border-border/70 bg-white pl-9
                    focus-visible:ring-primary/40
                  `}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar pedido..."
                  value={searchTerm}
                />
              </div>
              {filteredOrders.length === 0 ? (
                <div
                  className={`
                    rounded-lg border border-dashed border-border bg-muted/20
                    px-4 py-8 text-center text-sm text-muted-foreground
                  `}
                >
                  {emptyMessage}
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const rowKey = getOrderKey(order);
                  const rowIdentity = order.orderNumber || order.id || "";
                  return (
                    <div className="relative pb-0" key={rowKey}>
                      <div
                        className={`
                          pointer-events-none absolute inset-x-2 top-2 bottom-0
                          rounded-xl border border-border/50 bg-accent/30
                        `}
                      />
                      <div className="relative">
                        <MobileOrderCard
                          isExpanded={expandedOrderKeys.has(rowKey)}
                          isUpdating={updatingOrder === rowIdentity}
                          onStatusChange={(status) =>
                            updateStatus(rowIdentity, status)
                          }
                          onToggleExpanded={() => toggleExpanded(rowKey)}
                          order={order}
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
                data={filteredOrders}
                emptyMessage={emptyMessage}
                expandedContent={(order: Order) => (
                  <ExpandedProducts items={order.items} />
                )}
                getRowKey={getOrderKey}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Buscar por # de pedido o nombre del cliente..."
                searchTerm={searchTerm}
                tableClassName="min-w-[860px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

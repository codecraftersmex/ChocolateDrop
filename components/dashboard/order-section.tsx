"use client";

import type { Order } from "@/lib/types/order";

import { DataTable } from "@/components/shared";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { ExpandedProducts } from "@/components/shared/table/cells/expanded-products";
import { MobileOrderCard } from "@/components/dashboard/mobile-order-card";
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
        container mx-auto px-2 pb-4
        sm:px-4 sm:py-8
      `}
    >
      <Card>
        <CardHeader
          className={`
            px-4 py-4
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
            <Button
              className={`
                self-start
                sm:self-auto
              `}
              onClick={loadOrders}
              size="sm"
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span
                className={`
                  hidden
                  sm:inline
                `}
              >
                Actualizar
              </span>
              <span className="sm:hidden">Refresh</span>
            </Button>
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
            <div className="space-y-3">
              <div className="relative">
                <Search
                  className={`
                    pointer-events-none absolute top-1/2 left-3 h-4 w-4
                    -translate-y-1/2 text-muted-foreground
                  `}
                />
                <Input
                  className="h-10 border-input bg-background pl-9"
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
                    <MobileOrderCard
                      isExpanded={expandedOrderKeys.has(rowKey)}
                      isUpdating={updatingOrder === rowIdentity}
                      key={rowKey}
                      onStatusChange={(status) =>
                        updateStatus(rowIdentity, status)
                      }
                      onToggleExpanded={() => toggleExpanded(rowKey)}
                      order={order}
                    />
                  );
                })
              )}
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}

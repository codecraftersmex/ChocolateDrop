"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart } from "recharts";

interface StatusData {
  color: string;
  name: string;
  status?: string;
  value: number;
}

interface StatusPieChartProps {
  className?: string;
  data: StatusData[];
  legendPosition?: "bottom" | "right";
  showLegend?: boolean;
  size?: "lg" | "md" | "sm";
  title?: string;
}

export function StatusPieChart({
  className,
  data,
  legendPosition = "right",
  showLegend = true,
  size = "md",
  title,
}: StatusPieChartProps) {
  const chartConfig: ChartConfig = data.reduce((config, item) => {
    config[item.name] = {
      color: item.color,
      label: item.name,
    };
    return config;
  }, {} as ChartConfig);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Size configurations
  const sizeConfig = {
    lg: {
      containerHeight: "h-[240px] sm:h-[250px]",
      height: "h-[240px] sm:h-[250px]",
      innerRadius: 48,
      outerRadius: 94,
    },
    md: {
      containerHeight: "h-[210px] sm:h-[220px]",
      height: "h-[210px] sm:h-[220px]",
      innerRadius: 42,
      outerRadius: 82,
    },
    sm: {
      containerHeight: "h-[180px]",
      height: "h-[180px]",
      innerRadius: 36,
      outerRadius: 68,
    },
  };

  const currentSize = sizeConfig[size];

  if (total === 0) {
    return (
      <div className={cn("rounded-lg bg-card p-4 sm:p-6", className)}>
        {title && (
          <h3
            className={`
              mb-3 text-center text-base font-semibold text-card-foreground
              sm:mb-4 sm:text-lg
            `}
          >
            {title}
          </h3>
        )}
        <div
          className={cn(
            "flex items-center justify-center text-muted-foreground",
            currentSize.height,
          )}
        >
          <div className="text-center">
            <div className="mb-2 text-4xl">📊</div>
            <p className="text-sm">No hay datos disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  const isBottomLegend = legendPosition === "bottom";

  return (
    <div className={cn("rounded-lg bg-card p-4 sm:p-6", className)}>
      {title && (
        <div className="mb-4 text-center sm:mb-6">
          <h3 className="text-base font-semibold text-card-foreground sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Total: {total.toLocaleString()} elementos
          </p>
        </div>
      )}

      <div
        className={cn(
          "flex gap-6",
          isBottomLegend
            ? "flex-col items-center"
            : `
              flex-col
              lg:flex-row lg:items-center
            `,
        )}
      >
        <div
          className={cn("flex-shrink-0", isBottomLegend ? "w-full" : "flex-1")}
        >
          <ChartContainer
            className={cn(currentSize.containerHeight, "w-full")}
            config={chartConfig}
          >
            <PieChart>
              <Pie
                animationBegin={0}
                animationDuration={800}
                cx="50%"
                cy="50%"
                data={data}
                dataKey="value"
                innerRadius={currentSize.innerRadius}
                outerRadius={currentSize.outerRadius}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    className={`
                      transition-opacity duration-200
                      hover:opacity-80
                    `}
                    fill={entry.color}
                    key={`cell-${index}`}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="rounded-lg border bg-background p-3 shadow-lg"
                    formatter={(value, name) => [
                      <span className="font-medium" key="value">
                        {Number(value).toLocaleString()} (
                        {((Number(value) / total) * 100).toFixed(1)}%)
                      </span>,
                      <span className="text-muted-foreground" key="name">
                        {name}
                      </span>,
                    ]}
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        </div>

        {showLegend && data.length > 0 && (
          <div
            className={cn(
              "flex gap-3",
              isBottomLegend
                ? "w-full flex-wrap justify-center"
                : `
                  flex-col sm:flex-row sm:flex-wrap
                  lg:min-w-[240px]
                `,
            )}
          >
            {data.map((item, index) => (
              <div
                className={cn(
                  `
                    group flex items-center gap-3 rounded-md p-2
                    transition-colors
                    hover:bg-muted/50
                  `,
                  isBottomLegend ? "min-w-[140px]" : "w-full",
                )}
                key={index}
              >
                <div
                  className={`
                    h-4 w-4 rounded-full shadow-sm transition-transform
                    group-hover:scale-110
                  `}
                  style={{ backgroundColor: item.color }}
                />
                <div
                  className={cn("flex-1", isBottomLegend ? "text-center" : "")}
                >
                  <div className="text-xs font-medium text-card-foreground sm:text-sm">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground sm:text-xs">
                    {item.value.toLocaleString()} (
                    {((item.value / total) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

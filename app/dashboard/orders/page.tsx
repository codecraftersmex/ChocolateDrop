import { OrderSection } from "@/components/dashboard";

export default function OrderPage() {
  return (
    <div
      className={`
        mobile-vh-fix bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
      `}
    >
      <OrderSection />
    </div>
  );
}

/** Indicative rate used only for the optional USD display toggle. */
export const PKR_PER_USD = 280;

export function formatPKR(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

export function formatUSD(pkr: number) {
  return `$${Math.round(pkr / PKR_PER_USD).toLocaleString("en-US")}`;
}

export function formatPrice(pkr: number, currency: "PKR" | "USD") {
  return currency === "PKR" ? formatPKR(pkr) : formatUSD(pkr);
}
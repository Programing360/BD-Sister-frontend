import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

export function formatDate(date: string | Date, formatStr: string = "PPP"): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsed)) return "Invalid date";
  return format(parsed, formatStr);
}

export function formatRelativeTime(date: string | Date): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsed)) return "Invalid date";
  return formatDistanceToNow(parsed, { addSuffix: true });
}

export function formatCurrency(
  amount: number,
  currency: "BDT" | "USD" = "BDT",
  locale: string = "en-BD"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

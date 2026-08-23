type CheckoutResponse = {
  error?: string;
  url?: string;
};

export async function createCheckoutUrl(): Promise<string> {
  const response = await fetch("/api/checkout", { method: "POST" });
  const data = (await response.json()) as CheckoutResponse;

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Impossibile avviare il checkout.");
  }

  return data.url;
}

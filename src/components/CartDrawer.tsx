import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders.functions";

const money = (n: number) => `$${n.toFixed(2)}`;

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const placeOrder = useServerFn(createOrder);

  const submit = async () => {
    setError(null);
    if (name.trim().length < 2 || phone.trim().length < 5) {
      setError("Please enter your name and phone number.");
      return;
    }
    setBusy(true);
    try {
      const res = await placeOrder({
        data: {
          customerName: name.trim(),
          phone: phone.trim(),
          note: note.trim(),
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      clear();
      setName("");
      setPhone("");
      setNote("");
      setPlaced(true);
    } catch {
      setError("Could not place your order. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;


  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-espresso/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-label="Your order"
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift sm:w-[26rem]"
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl font-semibold text-espresso">Your Order</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="rounded-full p-2 text-espresso transition-colors hover:bg-sand"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="text-muted-foreground" size={32} />
              <p className="mt-4 font-sans text-sm text-muted-foreground">
                {placed ? "Thank you — your order has been placed." : "Your cart is empty."}
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4">
                  <img
                    src={i.image}
                    alt={i.name}
                    loading="lazy"
                    className="h-20 w-20 rounded-xl object-cover shadow-soft"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-espresso">{i.name}</h3>
                      <button
                        onClick={() => remove(i.id)}
                        aria-label={`Remove ${i.name}`}
                        className="p-1 text-muted-foreground transition-colors hover:text-espresso"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">{money(i.price)}</p>
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1">
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        aria-label={`Decrease ${i.name}`}
                        className="text-espresso transition-opacity hover:opacity-70"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center font-sans text-sm text-espresso">{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, i.qty + 1)}
                        aria-label={`Increase ${i.name}`}
                        className="text-espresso transition-opacity hover:opacity-70"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-muted-foreground">Total</span>
            <span className="font-serif text-2xl font-semibold text-espresso">{money(total)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => {
              clear();
              setPlaced(true);
            }}
            className="mt-4 w-full rounded-full bg-espresso px-7 py-3 font-sans text-sm font-medium tracking-wide text-primary-foreground shadow-soft transition-all duration-300 hover:bg-primary hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place Order
          </button>
        </footer>
      </aside>
    </div>
  );
}

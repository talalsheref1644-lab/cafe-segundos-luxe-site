import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(80),
        name: z.string().min(1).max(120),
        price: z.number().nonnegative(),
        qty: z.number().int().positive().max(99),
      }),
    )
    .min(1)
    .max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const total = Number(data.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2));

    const { error } = await supabase.from("orders").insert({
      customer_name: data.customerName,
      phone: data.phone,
      note: data.note ? data.note : null,
      items: data.items,
      total,
    });

    if (error) {
      console.error("createOrder failed", error.message);
      return { ok: false as const, error: "Could not place your order. Please try again." };
    }

    return { ok: true as const, total };
  });

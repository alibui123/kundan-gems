"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/rings";
import { useCart } from "@/components/CartProvider";
import { ProductImageFrame } from "@/components/ProductImageFrame";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    count,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-void/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              Your selection
            </p>
            <h2 className="font-display text-2xl text-ink">
              Cart ({count})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm tracking-wide text-muted hover:text-ink"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="font-display text-2xl text-ink">Your cart is empty</p>
              <p className="max-w-xs text-sm text-muted">
                Discover the Rings collection and add a piece that feels eternal.
              </p>
              <Link
                href="/collections/rings"
                onClick={closeCart}
                className="mt-2 inline-flex h-12 items-center rounded-full bg-gold px-7 text-[11px] tracking-[0.16em] text-void uppercase"
              >
                Browse Rings
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const href = `${item.collectionPath ?? "/collections/rings"}/${item.slug}`;
                return (
                <li
                  key={`${item.id}-${item.size ?? ""}`}
                  className="flex gap-4 border-b border-border pb-6"
                >
                  <Link
                    href={href}
                    onClick={closeCart}
                    className="relative block h-24 w-20 shrink-0 overflow-hidden"
                  >
                    <ProductImageFrame
                      src={item.image}
                      alt={item.name}
                      sizes="80px"
                      aspect="portrait"
                      padding="thumb"
                      fillContainer
                      className="h-full w-full"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={href}
                          onClick={closeCart}
                          className="font-display text-lg text-ink hover:text-gold"
                        >
                          {item.name}
                        </Link>
                        {item.size && (
                          <p className="mt-1 text-xs tracking-wide text-muted">
                            {item.size}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-ink">{item.priceLabel}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.size)
                          }
                          className="text-muted hover:text-ink"
                        >
                          −
                        </button>
                        <span className="min-w-4 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.size)
                          }
                          className="text-muted hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-[11px] tracking-[0.14em] text-muted uppercase hover:text-gold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="font-display text-2xl text-ink">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="button"
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-gold text-[12px] font-medium tracking-[0.16em] text-void uppercase transition-all hover:bg-gold-bright"
            >
              Checkout
            </button>
            <p className="mt-3 text-center text-[11px] text-muted">
              Complimentary insured shipping on every order
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

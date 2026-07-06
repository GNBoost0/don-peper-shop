import { describe, it, expect, beforeEach } from 'vitest';

// Cart store mock test
function createMockCartStore() {
  let items: Array<{
    id: string;
    slug: string;
    flavorId: string;
    flavorName: string;
    formatId: string;
    formatLabel: string;
    volume: string;
    price: number;
    quantity: number;
    colorFrom: string;
    colorTo: string;
  }> = [];

  return {
    items,
    addItem: (item: Omit<(typeof items)[0], 'id' | 'quantity'> & { quantity?: number }) => {
      const id = `${item.slug}-${item.formatId}`;
      const existing = items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += item.quantity ?? 1;
      } else {
        items.push({ ...item, id, quantity: item.quantity ?? 1 });
      }
    },
    removeItem: (id: string) => {
      items = items.filter((i) => i.id !== id);
    },
    updateQuantity: (id: string, qty: number) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        if (qty <= 0) {
          items = items.filter((i) => i.id !== id);
        } else {
          item.quantity = qty;
        }
      }
    },
    getSubtotal: () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    getTotalItems: () => items.reduce((sum, i) => sum + i.quantity, 0),
    clearCart: () => { items = []; },
  };
}

describe('Cart Logic', () => {
  let cart: ReturnType<typeof createMockCartStore>;

  beforeEach(() => {
    cart = createMockCartStore();
  });

  it('should start empty', () => {
    expect(cart.getTotalItems()).toBe(0);
    expect(cart.getSubtotal()).toBe(0);
  });

  it('should add item correctly', () => {
    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    });

    expect(cart.getTotalItems()).toBe(1);
    expect(cart.getSubtotal()).toBe(35);
  });

  it('should increment quantity for same item', () => {
    const item = {
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    };

    cart.addItem(item);
    cart.addItem(item);

    expect(cart.getTotalItems()).toBe(2);
    expect(cart.getSubtotal()).toBe(70);
  });

  it('should handle different formats as separate items', () => {
    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'fiole-10cl',
      formatLabel: 'Fiole 10cl',
      volume: '10cl',
      price: 15,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    });

    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    });

    expect(cart.getTotalItems()).toBe(2);
    expect(cart.getSubtotal()).toBe(50);
  });

  it('should remove item correctly', () => {
    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    });

    cart.removeItem('fraise-bouteille-75cl');
    expect(cart.getTotalItems()).toBe(0);
  });

  it('should remove item when quantity reaches 0', () => {
    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
      quantity: 2,
    });

    cart.updateQuantity('fraise-bouteille-75cl', 0);
    expect(cart.getTotalItems()).toBe(0);
  });

  it('should clear cart', () => {
    cart.addItem({
      slug: 'fraise',
      flavorId: 'fraise',
      flavorName: 'Fraise',
      formatId: 'bouteille-75cl',
      formatLabel: 'Bouteille 75cl',
      volume: '75cl',
      price: 35,
      colorFrom: '#ff006e',
      colorTo: '#ff4d8d',
    });

    cart.clearCart();
    expect(cart.getTotalItems()).toBe(0);
    expect(cart.getSubtotal()).toBe(0);
  });
});

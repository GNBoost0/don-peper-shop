import { describe, it, expect } from 'vitest';
import { PRODUCTS, getProduct, getAllProducts, getFormatPrice, FORMATS, FLAVORS } from '../lib/products';
import { getShippingCost, getShippingLabel, isDeliverable, EU_COUNTRIES } from '../lib/shipping';

describe('Products', () => {
  it('should have 8 flavors', () => {
    expect(FLAVORS).toHaveLength(8);
  });

  it('should have 3 formats per product', () => {
    PRODUCTS.forEach((product) => {
      expect(product.formats).toHaveLength(3);
    });
  });

  it('should have correct prices for formats', () => {
    expect(FORMATS.find((f) => f.id === 'fiole-10cl')?.price).toBe(15);
    expect(FORMATS.find((f) => f.id === 'bouteille-75cl')?.price).toBe(35);
    expect(FORMATS.find((f) => f.id === 'bouteille-1l')?.price).toBe(45);
  });

  it('should find product by slug', () => {
    const product = getProduct('fraise');
    expect(product).toBeDefined();
    expect(product?.flavor.name).toBe('Fraise');
  });

  it('should return undefined for unknown slug', () => {
    expect(getProduct('unknown')).toBeUndefined();
  });

  it('should return all products', () => {
    expect(getAllProducts()).toHaveLength(8);
  });

  it('should return format price', () => {
    expect(getFormatPrice('fraise', 'fiole-10cl')).toBe(15);
    expect(getFormatPrice('myrtille', 'bouteille-1l')).toBe(45);
    expect(getFormatPrice('unknown', 'fiole-10cl')).toBe(0);
  });

  it('each flavor should have unique colors', () => {
    const colorFroms = FLAVORS.map((f) => f.colorFrom);
    const unique = new Set(colorFroms);
    expect(unique.size).toBe(FLAVORS.length);
  });

  it('each product should have a slug matching flavor id', () => {
    PRODUCTS.forEach((product) => {
      expect(product.slug).toBe(product.flavor.id);
    });
  });
});

describe('Shipping', () => {
  it('should return 0 shipping for France', () => {
    expect(getShippingCost('FR')).toBe(0);
  });

  it('should return 0 shipping for Belgium', () => {
    expect(getShippingCost('BE')).toBe(0);
  });

  it('should return 4.99 for Germany', () => {
    expect(getShippingCost('DE')).toBe(4.99);
  });

  it('should return 4.99 for Italy', () => {
    expect(getShippingCost('IT')).toBe(4.99);
  });

  it('should not deliver to non-EU countries', () => {
    expect(isDeliverable('US')).toBe(false);
    expect(isDeliverable('JP')).toBe(false);
  });

  it('should deliver to all EU countries in list', () => {
    EU_COUNTRIES.forEach((country) => {
      expect(isDeliverable(country.code)).toBe(true);
    });
  });

  it('should return correct label for free shipping', () => {
    expect(getShippingLabel('FR')).toContain('Offerte');
  });

  it('should return correct label for paid shipping', () => {
    expect(getShippingLabel('DE')).toContain('4,99');
  });
});

-- Named maison catalogs (Hanif / Gold Bank style house lines)
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS catalog text;

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_catalog_check;

ALTER TABLE products
  ADD CONSTRAINT products_catalog_check
  CHECK (catalog IS NULL OR catalog IN ('mehr', 'noor', 'rozana'));

CREATE INDEX IF NOT EXISTS products_catalog_idx ON products (catalog)
  WHERE catalog IS NOT NULL;

WITH ranked AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY sort_order, created_at) AS rn,
    COUNT(*) OVER () AS total
  FROM products
  WHERE active = true
)
UPDATE products p
SET catalog = CASE
  WHEN r.rn <= CEIL(r.total / 3.0) THEN 'mehr'
  WHEN r.rn <= CEIL(2.0 * r.total / 3.0) THEN 'noor'
  ELSE 'rozana'
END
FROM ranked r
WHERE p.id = r.id;

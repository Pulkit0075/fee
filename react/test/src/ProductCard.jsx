function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-image ${product.color}`}>
        <img src={product.image} alt={product.name} />
        <button
          className="quick-add"
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          +
        </button>
        <span className="product-tag">{product.category}</span>
      </div>
      <div className="product-details">
        <div>
          <h3>{product.name}</h3>
          <p>
            <span>★</span> {product.rating}
          </p>
        </div>
        <strong>${product.price}</strong>
      </div>
    </article>
  );
}
export default ProductCard;

import "./App.css";
import ProductCard from "./ProductCard.jsx";
import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Cloud ceramic mug",
    category: "Home",
    price: 24,
    rating: "4.9",
    color: "cream",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "The daily tote",
    category: "Accessories",
    price: 38,
    rating: "4.8",
    color: "blue",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Soft form lamp",
    category: "Home",
    price: 68,
    rating: "4.7",
    color: "orange",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Sunday wool socks",
    category: "Apparel",
    price: 18,
    rating: "5.0",
    color: "pink",
    image:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Field notes set",
    category: "Stationery",
    price: 16,
    rating: "4.9",
    color: "green",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Everyday bottle",
    category: "Accessories",
    price: 32,
    rating: "4.8",
    color: "yellow",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  "All items",
  "Home",
  "Accessories",
  "Apparel",
  "Stationery",
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All items");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 },
  ]);   
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        return (
          (activeCategory === "All items" ||
            product.category === activeCategory) &&
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [activeCategory, search],
  );
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      return existing
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <div className="store-shell">
      <main id="top">
        <section className="intro" id="shop">
          <div>
            <p className="eyebrow">Small joys, thoughtfully made</p>
            <h1>
              Good things for
              <br />
              <em>everyday living.</em>
            </h1>
          </div>
          <p className="intro-copy">
            A considered collection of useful, beautiful objects for the spaces
            and rituals that make up your day.
          </p>
        </section>
        <section className="shop-layout">
          <div className="catalog">
            <div className="catalog-toolbar">
              <div
                className="category-tabs"
                role="tablist"
                aria-label="Product categories"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    className={activeCategory === category ? "selected" : ""}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search the collection"
                  aria-label="Search the collection"
                />
              </label>
            </div>
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </div>
            {visibleProducts.length === 0 && (
              <p className="empty-state">
                No good things found for “{search}”.
              </p>
            )}
          </div>
          <aside className="cart-panel" id="cart">
            <div className="cart-heading">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>
                  Shopping bag <span>{itemCount}</span>
                </h2>
              </div>
              <span className="bag-mark">✳</span>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your bag is waiting for something good.</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("All items")}
                >
                  Browse items
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.category}</p>
                        </div>
                        <strong>${item.price * item.quantity}</strong>
                        <div className="quantity">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>${subtotal}</strong>
                  </div>
                  <div>
                    <span>Shipping</span>
                    <strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong>
                  </div>
                  <div className="total">
                    <span>Total</span>
                    <strong>${total}</strong>
                  </div>
                  <button
                    className="checkout"
                    type="button"
                    onClick={() =>
                      alert("Thanks for shopping with Good Things!")
                    }
                  >
                    Continue to checkout <span>↗</span>
                  </button>
                  <p className="secure-note">
                    Free shipping on orders over $60
                  </p>
                </div>
              </>
            )}
          </aside>
        </section>
      </main>
      <footer>
        <span>© 2024 Good Things</span>
        <span>Made for the little moments.</span>
        <span>Instagram&nbsp;&nbsp; Pinterest</span>
      </footer>
    </div>
  );
}

export default App;

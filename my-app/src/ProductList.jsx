import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    fetch("https://dummyjson.com/products?limit=12")
      .then((res) => {
        if (!res.ok) throw new Error(`No response: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const countText = `${filteredProducts.length} of ${products.length} products`;

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleToggleFav = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isFav: !product.isFav } : product,
      ),
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product list</h2>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>
        <strong>{countText}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>
              {product.isFav ? "fav " : ""}
              {product.title}
            </h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>

            <button onClick={() => handleToggleFav(product.id)}>
              {product.isFav ? "remove from fav": "add to fav"}
            </button>

            <button
              onClick={() => handleDelete(product.id)}
              style={{ color: "red", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

import { useState , useEffect } from "react";

function ProductList(){
    const [products , setProducts ]= useState([])
    const [loading , setLoading ] = useEffect(true)
    const [error , setError] = useState (null);
    const [searsch , setSearchTerm] = useState("")
}

useEffect(() => {
  setLoading(true);
  setError(null);

  fetch("https://dummyjson.com/products?limit=12").then((res) => {
    if (!res.ok) throw new Error("no respons: ${res.status");
    return res.json();
  })
  .then((data) => setProducts (data.products))
  .catch((err) => setError (err.message))
  .finally(() => setLoading(false))
},[]);

const filteredProduct = products.filter((product) =>
  product.title.tolowerCase().includes(searchTerm.tolowerCase())
);

const countText = `${filteredProduct.length} of ${products.length} products`;

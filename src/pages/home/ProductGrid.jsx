import Product from "./Product";

export default function ProductGrid({ products, cart, loadCart }) {
  const productList = products.map((product) => (
    <Product product={product} loadCart={loadCart}/>
  ));

  return <>{productList}</>;
}

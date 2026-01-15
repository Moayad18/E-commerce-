import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./productDetails.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching related products:", error);
      })
      .finally(() => {
        setIsRelatedLoading(false);
      });
  }, [product]);

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <PageTransition key={id}>
      <div>
        {isLoading ? (
          <ProductDetailsLoading />
        ) : (
          <div className="item_details">
            <div className="container">
              <ProductImages product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        )}

        {isRelatedLoading ? (
          <SlideProductLoading />
        ) : (
          <SlideProduct
            key={product.category}
            title={product.category.replace("-", " ")}
            data={relatedProducts}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetails;

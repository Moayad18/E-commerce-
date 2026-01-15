import React from "react";

const ProductImages = ({ product }) => {
  return (
    <div className="imgs_item">
      <div className="big_img">
        <img id="big_img" src={product?.images[0]} alt={product?.title} />
      </div>

      <div className="small_imgs">
        {product.images.map((img, index) => (
          <img
            key={`${product.title} ${index + 1}`}
            src={img}
            alt={`${product.title} ${index + 1}`}
            onClick={() => {
              document.getElementById("big_img").src = img;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

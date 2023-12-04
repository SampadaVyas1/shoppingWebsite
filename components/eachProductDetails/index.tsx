import React from "react";
import classes from "./eachProductDetails.module.scss";
import StarRating from "../starRating";
import { size } from "./size";
import { MdOutlineShoppingBag } from "react-icons/md";
import { addCart } from "@/reduxSaga/actions/actions";
import { useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

const EachProductDetails = (props: any) => {
  const { productDetails } = props;
  console.log(JSON.parse(productDetails));
  const dispatch = useDispatch();
  const product = JSON.parse(productDetails);

  return (
    <div className={classes.productDetails}>
      <div className={classes.imageDetails}>
        <img src={product.photo} alt="" width={500} />
      </div>
      <div className={classes.info}>
        <div className={classes.productInfo}>
          <h1>{product.name}</h1>
          <div className={classes.content}>{product.productDetails}</div>
          <div className={classes.ratingStar}>
            <StarRating starRating={product.ratingStar} />
            {product.ratingCount}
          </div>
        </div>
        <div className={classes.priceDetails}>
          <div className={classes.price}>
            <h1 className={classes.cost}>₹{product.price}</h1>
            <div className={classes.offPrice}>({product.offPrice})</div>
          </div>
          <div className={classes.inclusiveTaxes}>inclusive of all taxes</div>
        </div>
        <div className={classes.sizeChartData}>
          <div className={classes.selectSize}>SELECT SIZE</div>
          <div className={classes.sizeDetails}>
            {product.sizeAvailable.map((element: any, index: any) => {
              return (
                <div key={index} className={classes.size}>
                  {element}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.addToCart}
            onClick={() => dispatch(addCart(product))}
          >
            {" "}
            <MdOutlineShoppingBag />
            Add to Cart
          </button>
          <button className={classes.addToCart}>
            <FaRegHeart />
            WishList
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachProductDetails;

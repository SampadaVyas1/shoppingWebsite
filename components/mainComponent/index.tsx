import {
  addCart,
  emptyCard,
  productList,
  removetocart,
} from "@/reduxSaga/actions/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./mainComponent.module.scss";
import Image from "next/image";
import StarRating from "../starRating";
import { MdAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/router";

const MainComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const data = useSelector((state: any) => state.productList);

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  const handleRouteChange = (route: any, item: any) => {
    router.push({
      pathname: route,
      query: { item: JSON.stringify(item) },
    });
  };
  return (
    <div className={classes.mainContainerWrapper}>
      <button onClick={() => dispatch(emptyCard())}>Empty card</button>
      <div className={classes.productList}>
        {data.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={classes.card}
              onClick={() => handleRouteChange("/productDetails/", item)}
            >
              <Image
                src={item.photo}
                alt={""}
                width={300}
                height={300}
                className={classes.productImage}
              />
              <div className={classes.details}>
                <div>{item.name}</div>
                <div className={`${classes.price} price`}>{item.price}</div>
              </div>
              <div className={`${classes.productContent} productContent`}>
                {item.productDetails}
              </div>
              <div className={classes.ratingCartSection}>
                <div
                  className={classes.cartSection}
                  onClick={() => dispatch(addCart(item))}
                >
                  <MdAddShoppingCart className={classes.cartIcon} />
                  Add to Cart
                </div>
                <StarRating starRating={item.ratingStar} />
              </div>
              <div className={classes.cardButtons}>
                {/* <button
                  onClick={() => dispatch(addCart(item))}
                  className={classes.addtocartButton}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(removetocart(item.id))}
                  className={classes.removetocartButton}
                >
                  Remove from Cart
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainComponent;

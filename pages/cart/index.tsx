import React from "react";
import classes from "./cart.module.scss";
import Header from "@/components/header";
import { useSelector } from "react-redux";
import TopHeader from "@/components/topHeader";
const Cart = () => {
  const cartData = useSelector((state: any) => state.cartData);
  console.log(cartData);
  let amount =
    cartData.length &&
    cartData
      .map((item: any) => item.price)
      .reduce((prev: number, next: number) => prev + next);
  console.log(amount);
  return (
    <div>
      <TopHeader />
      <Header />
      <div className={classes.cartPageContainer}>
        <table className={classes.cartPageTable}>
          <tr>
            <td>Name</td>
            <td>Color</td>
            <td>Price</td>
            <td>Brand</td>
            <td>Category</td>
          </tr>
          {cartData.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.color}</td>
                <td>{item.price}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
              </tr>
            );
          })}
        </table>
        <div className={classes.priceDetails}>
          <div className={classes.adjustPrice}>
            <span>AMOUNT</span>
            <span>{amount}</span>
          </div>
          <div className={classes.adjustPrice}>
            <span>DisCount</span>
            <span>{amount / 10}</span>
          </div>
          <div className={classes.adjustPrice}>
            <span>Taxes</span>
            <span>0000</span>
          </div>
          <div className={classes.adjustPrice}>
            <span>Total</span>
            <span>{amount - amount / 10}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

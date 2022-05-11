import React, { useState } from 'react'
import { useOrders } from '../../context'
import OrderItemCard from '../checkout/OrderItemCard';

export default function Orders() {

  const {orders} = useOrders()

  return (
    <div className="orders-container">
      <h2>Orders</h2>
        {[...orders].reverse().map((order) => {
      return <div className="orders-card">
        <div>
        <div className="order-id-title">Order Placed</div>
        <div className="order-date">Date: {order.createdAt.substring(0,10)}</div>
        </div>
        <hr />
        <div className="orders-content">
          <div className="orders-contact-info">
            <div className="order-content-title">
              Contact:
            </div>
            <div className="order-data">{order.address.fullName}</div>
            <div className="order-data">{order.address.phoneNumber}</div>
          </div>
          <div className="orders-shipping-address">
            <div className="order-content-title">
              Shipping Address:
            </div>
            <div className="order-data">{order.address.streetAddress}, {order.address.city},{order.address.state} </div>
            <div className="order-data">{order.address.pinCode}</div>

          </div>
          <div className="orders-payment-details">
            <div className="order-content-title">
              Payment:
            </div>
            <div className="order-data">Id: {order.paymentId} </div>
            <div className="order-data">Total Amount: Rs {order.amount/100}</div>

          </div>
        </div>
        <hr />
        <div className="orders-list">
        {order.list.map((product) => {
            return <OrderItemCard product={product} />;
        })}
        </div>
      </div>
        // {orders.map((order)=>{
        // return <div>{order.paymentId}</div>})}
        })}
    </div>
  )
}

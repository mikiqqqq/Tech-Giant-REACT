import React from 'react';
import style from './Order.module.css'; // Adjust the path as necessary
import { OrderObject } from '../../../../MainContainerData';
import image_placeholder from '../../../../../images/image_placeholder.gif';

interface OrderProps {
    order: OrderObject;
}

const Order: React.FC<OrderProps> = ({ order }) => {
    const formatOrderId = (id: number): string => {
        return (id + 1000).toString();
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={`${style.heading} u-h2`}>Order #{formatOrderId(order.id)}</div>
                <div className={`u-p3`}>Placed on {new Date(order.date).toLocaleString()}</div>
            </div>
            <div className={style.item_container}>
                {order.orderItems.map(item => (
                    <div key={item.id} className={style.order_item}>
                        <img className={style.item_image} src={item.item.image || image_placeholder} alt={item.item.title} />
                        <div className={style.item_info}>
                            <p className={`${style.item_heading} u-pb1`}>{item.item.title}</p>
                            <p className='u-p3'>€ {item.item.price.toFixed(2)}</p>
                            <p className='u-p3'>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.order_sumary}>
                <div className={`${style.price_item} u-p2`}>
                    <p>Subtotal: </p><p>€ {order.total.toFixed(2)}</p>
                </div>
                <div className={`${style.price_item} u-p2`}>
                    <p>Shipping: </p><p>€ 0.00</p>
                </div>
                <div className={`${style.total_price} u-pb1`}>
                    <p>Total: </p><p>€ {order.total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Order;
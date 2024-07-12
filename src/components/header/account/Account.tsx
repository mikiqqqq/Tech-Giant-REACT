import React, { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { User, OrderObject, OrderItemType } from '../../MainContainerData';
import Orders from './orders/Orders';
import SidebarMenu from './sidebar_menu/SidebarMenu';
import UserInformation from './user_information/UserInformation';
import style from './Account.module.css';
import OrderService from '../../../services/OrderService';
import OrderItemService from '../../../services/OrderItemService';

const Account: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activeOrders, setActiveOrders] = useState<OrderObject[]>([]);
    const [completedOrders, setCompletedOrders] = useState<OrderObject[]>([]);
    const navigate = useNavigate();

    const fetchOrdersAndProducts = useCallback(async (user: User) => {
        if (!user) return;
        try {
            const activeResponse = await OrderService.fetchActiveOrders(user.email);
            const activeOrdersWithItems = await Promise.all(
                activeResponse.data.map(async (order: OrderObject) => {
                    const orderItemsResponse = await OrderItemService.fetchAllByOrderId(order.id);
                    const orderItems: OrderItemType[] = orderItemsResponse.data;

                    return { ...order, orderItems };
                })
            );
            setActiveOrders(activeOrdersWithItems);

            const completedResponse = await OrderService.fetchCompletedOrders(user.email);
            const completedOrdersWithItems = await Promise.all(
                completedResponse.data.map(async (order: OrderObject) => {
                    const orderItemsResponse = await OrderItemService.fetchAllByOrderId(order.id);
                    const orderItems: OrderItemType[] = orderItemsResponse.data;

                    return { ...order, orderItems };
                })
            );
            setCompletedOrders(completedOrdersWithItems);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userInfo = await UserService.getUserInfo();
            if (userInfo) {
                setUser(userInfo);
                await fetchOrdersAndProducts(userInfo);
            } else {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate, fetchOrdersAndProducts]);

    if (!user) {
        return null;
    }

    return (
        <main className={style.account_main}>
            <SidebarMenu user={user} />
            <Routes>
                <Route path="/" element={<Navigate to="information" replace />} />
                <Route path="information" element={<UserInformation />} />
                <Route path="orders" element={<Orders activeOrders={activeOrders} completedOrders={completedOrders} />} />
            </Routes>
        </main>
    );
};

export default Account;
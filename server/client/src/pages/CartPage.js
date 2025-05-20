import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import CartItems from "../components/cartComponents/CartItems";
import CartSummary from "../components/cartComponents/CartSummary";
import Spinner from "../components/Layout/Spinner";
import "./cart.css";



const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            setLoading(true); // Start loading before the request
            const token = JSON.parse(localStorage.getItem("auth"))?.token;
            if (!token) {
                toast.error("User not authenticated.");
                return;
            }

            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/cart/getCart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                setCart(res.data.cart);
            } else {
                toast.error(res.data.message || "Failed to fetch cart.");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error fetching cart.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <Layout title="Your Cart">
            <div className="cart-container">
                {loading ? (
                    <Spinner />
                ) : cart.length > 0 ? (
                    <>
                        <div className="cart-items">
                            {cart.map(item => (
                                <CartItems
                                    key={item.productId}
                                    item={item}
                                    refresh={fetchCart}
                                />
                            ))}

                        </div>
                        <CartSummary cart={cart} />
                    </>
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
            </div>
        </Layout>
    );
};

export default CartPage;

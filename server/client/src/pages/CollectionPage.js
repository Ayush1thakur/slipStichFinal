import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Layout/Spinner";
import "./collectionPage.css";

const CollectionPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayDD, setDisplayDD] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  // add to cart feature
  const handleAddToCart = async (productId) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      if (!token) {
        toast.error("Please login to add items to cart.");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Item added to cart!");
      } else {
        toast.error(res.data.message || "Could not add to cart.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart.");
    }
  };


  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-all-products`
      );
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error("Something Went Wrong" || res.data.message);
      }
    } catch (error) {
      toast.error("Error Fetching Products" || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    getAllCategory();
  }, []);

  return (
    <Layout title={`Our Collections - ${slug}`}>
      <div className="collection-top">
        <div className="collection-content">
          <h1>{slug}</h1>
          <p>Explore our diverse range of quality products.</p>
        </div>
        <div className="collection-dropdown" onClick={() => setDisplayDD(!displayDD)}>
          <button className="collection-filter tone-up">Filter</button>

          <ul className="collection-dropdown-menu" style={{ display: displayDD ? "flex" : "none" }}>
            <div
              onClick={() => setDisplayDD(!displayDD)}
              className="collection-dropdown-item"
            >
              All Products
            </div>
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => setDisplayDD(!displayDD)}
                className="collection-dropdown-item"
              >
                {category.name}
              </div>
            ))}
          </ul>
        </div>

      </div>
      <div className="collection-container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="collection-card">
                  <img
                    src={product.photo[0]}
                    alt=""
                    className="collection-photo"
                  />
                  <div className="collection-data">
                    <div className="collection-left">
                      <h2>{product.name}</h2>
                      <h3>₹{product.price}</h3>
                    </div>
                    <h5>{product.category?.name || " "}</h5>
                  </div>

                  <button
                    className="collection-button tone-down"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to cart
                  </button>

                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CollectionPage;

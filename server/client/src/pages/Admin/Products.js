import { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import axios from "axios";
import "./products.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Layout/Spinner";
import { NavLink, Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/product/get-all-products`)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          // console.log(products);
        } else {
          console.error("Failed to fetch products:", res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);


  return (
    <AdminLayout title="Create Product">
      <div className="padd">
        <h2>Product</h2>
        <NavLink to="/admin/products/create-product">
          <button className="catBtn tone-down">Create Product</button>
        </NavLink>
      </div>
      <div className="pshow">
        {loading ? (
          <Spinner />
        ) : (
          <div className="pcont">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="pcard">
                  <img src={product.photo[0]} alt="" className="pphoto" />
                  <div className="pdata">
                    <div className="pdataleft">
                      <h2>{product.name}</h2>
                      <h5>{product.category?.name || " "}</h5>
                    </div>
                    <h3>₹{product.price}</h3>
                  </div>
                  <Link to={`/admin/products/product/${product._id}`}>
                    <button className="proBtn tone-up">Edit</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;

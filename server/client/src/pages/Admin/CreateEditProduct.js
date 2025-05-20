import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Layout/Spinner";
import "./products.css";
import { ImCross } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";

const CreateEditProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  // Split image states into existing (URLs) and new (File)
  const [existingPhotos, setExistingPhotos] = useState([]); 
  const [newPhotos, setNewPhotos] = useState([]); 

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product-id/${id}`
      );
      if (data?.success) {
        setForm({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          quantity: data.product.quantity,
          category: data.product.category?._id || "",
        });

        //  Only store string image URLs in existingPhotos
        setExistingPhotos(data.product.photo || []);
        setEditing(true);
      } else {
        toast.error("Failed to load product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading product");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
        );
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = (index) => {
    const combined = [...existingPhotos, ...newPhotos];
    const removed = combined[index];

    //  If it's a URL, remove from existing
    if (typeof removed === "string") {
      setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      //  Else remove from new uploads
      setNewPhotos((prev) => prev.filter((_, i) => i !== index - existingPhotos.length));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalImages = existingPhotos.length + newPhotos.length;

    if (totalImages === 0) {
      toast.error("At least one product image is required");
      return;
    }

    if (totalImages > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );

    // Append new image files
    newPhotos.forEach((file) => {
      formData.append("photo", file);
    });

    // Append existing URLs after deletion
    formData.append("existingPhotos", JSON.stringify(existingPhotos));

    try {
      setLoading(true);
      const url = editing
        ? `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`
        : `${process.env.REACT_APP_API}/api/v1/product/create-product`;

      const method = editing ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (res.data.success) {
        toast.success("Product deleted");
        navigate("/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => (
    <>
      {[...existingPhotos, ...newPhotos].map((file, i) => {
        const src = typeof file === "string" ? file : URL.createObjectURL(file);
        return (
          <div key={i} className="preview-container">
            <span className="remove-btn" onClick={() => handleRemoveImage(i)}>
              <ImCross />
            </span>
            <img
              src={src}
              alt={`preview-${i}`}
              title={i === 0 ? "Banner Image" : `Image ${i + 1}`}
            />
          </div>
        );
      })}
    </>
  );

  return (
    <AdminLayout title={editing ? "Edit Product" : "Create Product"}>
      <div className="cecont">
        <h2>{editing ? "Edit Product" : "Create Product"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="pimg">
            <h3>Add product images</h3>
            <label className="form-label" htmlFor="photo">
              <p>
                Add up to 5 images. First image is the cover image that will be
                highlighted everywhere.
              </p>
              <div className="image-preview">
                {(existingPhotos.length > 0 || newPhotos.length > 0) &&
                  renderPreview()}
                  <label className="form-label fileimglabel" htmlFor="photos"><IoCloudUploadOutline/></label>
                <input
                  className="form-control fileimg"
                  type="file"
                  id="photos"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const total = existingPhotos.length + newPhotos.length + files.length;

                    if (total > 5) {
                      toast.error("Maximum 5 images allowed");
                    } else {
                      setNewPhotos((prev) => [...prev, ...files]);
                    }
                  }}
                  required={!editing}
                />
              </div>
            </label>
          </div>

          <div className="pdet">
            <h3>Enter product details</h3>
            <label className="form-label" htmlFor="category">
              <p>Select product category</p>
              <select
                className="form-control"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-label" htmlFor="name">
              <p>Product name</p>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-label" htmlFor="description">
              <p>Product description</p>
              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-label" htmlFor="price">
              <p>Product price</p>
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-label" htmlFor="quantity">
              <p>Product quantity</p>
              <input
                className="form-control"
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="edit-delete">
            {editing && (
              <button
                type="button"
                className="catBtn tone-down"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete Product
              </button>
            )}
            <button className="proBtn tone-up" type="submit" disabled={loading}>
              {loading ? (
                <Spinner />
              ) : editing ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateEditProduct;

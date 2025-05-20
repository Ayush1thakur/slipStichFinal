import { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import "./categories.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Layout/Spinner";
import axios from "axios";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Action from "./Action";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState("");
  
  const [action, setAction] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionType, setActionType] = useState(""); 


  const getAllCategory = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      if (data.success) {
        setLoad(false);
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      setLoad(false);
      if (res.data.success) {
        getAllCategory();
        toast.success(res.data.message);
        setName("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.error(error.data?.message || "Something went wrong.");
    }
  };

  const toggleMenu = (id) => {
    if (openId === id) {
      setOpen(!open); // toggle current one
    } else {
      setOpen(true);   // open new menu
      setOpenId(id);
    }
  };

  const handleEdit = (category) => {
  setSelectedCategory(category);
  setActionType("edit");
  setAction(true);
  setOpen(false);
};

const handleDelete = (category) => {
  setSelectedCategory(category);
  setActionType("delete");
  setAction(true);
  setOpen(false);
};

const closeAction = () => {
  setAction(false);
  setSelectedCategory(null);
  setActionType("");
};

const confirmAction = async (inputValue) => {
  try {
    setLoad(true);
    if (actionType === "edit") {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selectedCategory._id}`,
        { name: inputValue }
      );
      if (res.data.success) toast.success(res.data.message);
    } else if (actionType === "delete") {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selectedCategory._id}`
      );
      if (res.data.success) toast.success(res.data.message);
    }
    await getAllCategory();
    closeAction();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong.");
    setLoad(false);
  }
};

  

  return (
    <AdminLayout title={"Category"}>
      {action && (
        <Action
          type={actionType}
          category={selectedCategory}
          onClose={closeAction}
          onConfirm={confirmAction}
        />
      )}

      <div className="create-category">
        <h2>Category</h2>
        <form onSubmit={submitHandler} className="add-category">
          <input
            className="form-control"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <button className="catBtn tone-down">Add Category</button>
        </form>
      </div>
      <hr />
      <div className="show-category">
        {load ? (
          <Spinner className="spin" />
        ) : (
          <table className="display-category">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((val, index) => {
                return (
                  <tr key={val._id}>
                    <td>{index + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.slug}</td>
                    <td>{moment(val.createdAt).format("DD-MM-YYYY")}</td>
                    <td className="modification-cont">
                    
                        <BiDotsVerticalRounded onClick={() => toggleMenu(val._id)}
                        className="three-dot"/>
                      {openId === val._id && open && (
                        <div className="modi">
                           <button onClick={() => handleEdit(val)}>Edit</button>
                           <button onClick={() => {
                            handleDelete(val);
                           }}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Categories;

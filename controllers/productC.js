const { default: slugify } = require("slugify");
const Product = require("../models/Product");
const { uploadToCloudinary } = require("../utils/imageUpload");

// create
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const files = req.files?.photo;

    if (!name || !description || !price || !quantity || !category) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Normalize to array
    const fileArray = Array.isArray(files) ? files : files ? [files] : [];

    if (fileArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    if (fileArray.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 images allowed",
      });
    }

    // Validate and upload
    const supportedTypes = ["jpg", "jpeg", "png"];
    const photoUrls = [];

    for (let file of fileArray) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type: " + file.name,
        });
      }

      const uploadRes = await uploadToCloudinary(
        file,
        process.env.PRODUCT_FOLDER
      );
      photoUrls.push(uploadRes.secure_url);
    }

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      category,
      photo: photoUrls,
    });
    console.log(product);

    return res.status(200).send({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// get products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    

    return res.status(200).send({
      success: true,
      total: products.length,
      message: "all products fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in getting all products",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.find({ slug }).populate("category");

    return res.status(200).send({
      success: true,
      message: "product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in getting product",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      product,
      message: "Product fetched by ID",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error fetching product by ID",
    });
  }
};

// delete
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in deleting product",
    });
  }
};

// update
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, existingPhotos } = req.body;
    const { id } = req.params;
    let files = req.files?.photo || [];
    files = Array.isArray(files) ? files : [files];

    if (!name || !description || !price || !quantity || !category) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Parse remaining photos from frontend
    let remainingPhotos = [];
    if (existingPhotos) {
      remainingPhotos = typeof existingPhotos === "string"
        ? JSON.parse(existingPhotos)
        : existingPhotos;
    }

    // Upload new photos
    const photoUrls = [];
    const supportedTypes = ["jpg", "jpeg", "png"];

    for (let file of files) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: "One or more files have unsupported formats.",
        });
      }

      const uploadRes = await uploadToCloudinary(file, process.env.PRODUCT_FOLDER);
      photoUrls.push(uploadRes.secure_url);
    }

    const finalPhotoArray = [...remainingPhotos, ...photoUrls]; // mix existing + newly uploaded

    const updateFields = {
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      category,
      photo: finalPhotoArray, // always update this
    };

    const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });

    return res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};


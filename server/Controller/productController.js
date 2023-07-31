const Product = require("../Model/Products")

exports.allProduct = async(req,res,next)=>{
try{
  const allProduct = await Product.find()
  // console.log(allProduct,'========================>')
  res.status(200).json(allProduct)

}catch(err){
  res.status(500).json(err)
}
}

exports.allProductPost = async(req,res,next)=>{
  console.log(req.body)
  try{
    // Extract the product details from the request body
    const { name, product_details, price, img, category, netWeight, grossWeight } = req.body;

    // Validate the required fields
    if (!name || !product_details || !price || !img || !category || !netWeight || !grossWeight) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new instance of the Product model
    const newProduct = new Product({
      name,
      product_details,
      price,
      img,
      category,
      netWeight,
      grossWeight,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json(savedProduct);

  }catch(err){
    res.status(500).json(err)
  }
}

exports.findProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product by ID in the database
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
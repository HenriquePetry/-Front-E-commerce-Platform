import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  // Check for admin permissions
  try {
    await isAdminRequest(req, res);
  } catch (error) {
    console.error("Admin check failed:", error);
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    if (method === "GET") {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        if (!product) {
          return res.status(404).json({ message: "Product not found." });
        }
        return res.json(product);
      } else {
        const products = await Product.find();
        return res.json(products);
      }
    }

    if (method === "POST") {
      const { title, description, price, images, category, properties } = req.body;

      // Validate input data
      if (!title || !description || !price || !category) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      return res.status(201).json(productDoc);
    }

    if (method === "PUT") {
      const { title, description, price, images, category, properties, _id } = req.body;

      if (!_id) {
        return res.status(400).json({ message: "Product ID is required." });
      }

      const updatedProduct = await Product.updateOne(
        { _id },
        { title, description, price, images, category, properties }
      );

      if (updatedProduct.nModified === 0) {
        return res.status(404).json({ message: "Product not found." });
      }

      return res.json({ message: "Product updated successfully." });
    }

    if (method === "DELETE") {
      if (req.query?.id) {
        const deletedProduct = await Product.deleteOne({ _id: req.query?.id });
        if (deletedProduct.deletedCount === 0) {
          return res.status(404).json({ message: "Product not found." });
        }
        return res.json({ message: "Product deleted successfully." });
      } else {
        return res.status(400).json({ message: "Product ID is required." });
      }
    }

    return res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]).status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  try {
    if (method === "GET") {
      const categories = await Category.find().populate("parent");
      return res.status(200).json(categories);
    }

    if (method === "POST") {
      const { name, parentCategory, properties } = req.body;

      // Validação simples para garantir que o nome da categoria seja enviado
      if (!name) {
        return res
          .status(400)
          .json({ message: "Nome da categoria é obrigatório" });
      }

      const categoryDoc = await Category.create({
        name,
        parent: parentCategory || undefined, // Garante que 'parent' não seja undefined
        properties,
      });
      return res.status(201).json(categoryDoc);
    }

    if (method === "PUT") {
      const { _id, name, parentCategory, properties } = req.body;

      // Validação básica para garantir que o _id esteja presente
      if (!_id) {
        return res
          .status(400)
          .json({ message: "ID da categoria é obrigatório" });
      }

      const categoryDoc = await Category.updateOne(
        { _id },
        {
          name,
          parent: parentCategory || undefined, // Garante que 'parent' não seja undefined
          properties,
        }
      );
      return res.status(200).json(categoryDoc);
    }

    if (method === "DELETE") {
      const { _id } = req.query;

      // Validação básica para garantir que o _id esteja presente
      if (!_id) {
        return res
          .status(400)
          .json({ message: "ID da categoria é obrigatório" });
      }

      await Category.deleteOne({ _id });
      return res
        .status(200)
        .json({ message: "Categoria deletada com sucesso" });
    }

    // Se o método não for permitido, retorne um erro 405
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).json({ message: `Método ${method} não permitido` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor", error });
  }
}

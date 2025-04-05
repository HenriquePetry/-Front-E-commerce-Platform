import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts"; // Ensure you import from the correct path

export default function HomePage({ product, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProducts products={newProducts} /> {/* Correctly close the component */}
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66eec898126ef1669aa1f946";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

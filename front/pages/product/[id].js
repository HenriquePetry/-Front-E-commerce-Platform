import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import styled from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import SizeSelector from "@/components/SizeSelector";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.7fr 0.3fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: auto;
`;

const ProductImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column; /* Mudar para coluna */
  gap: 2rem; /* Aumentar o espaço entre os elementos para 2rem */
  align-items: flex-start; /* Alinhar os itens à esquerda */
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold; /* Negrito para destacar o preço */
`;

// Estilizando o botão
const StyledFlyingButton = styled(FlyingButton)`
  border: 1px solid black; /* Borda preta de 1px */
  padding: 10px 20px; /* Ajuste o padding para um tamanho normal */
  font-size: 1rem; /* Defina um tamanho de fonte normal */
  display: flex; /* Garantindo que o ícone e o texto fiquem alinhados */
  align-items: center; /* Centraliza verticalmente o conteúdo */
`;

const Description = styled.p`
  margin-top: 2rem; /* Aumentar espaço acima da descrição */
`;

export default function ProductPage({ product, sizes }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }
    // Aqui você pode realizar a ação de adicionar ao carrinho com o tamanho selecionado
    console.log("Produto:", product._id, "Tamanho selecionado:", selectedSize);
  };

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages>
              {product.images?.map((img, index) => (
                <img src={img} alt={`Product Image ${index}`} key={index} />
              ))}
            </ProductImages>
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>

            <PriceRow>
              <Price>R$ {product.price.toFixed(2)}</Price>
              <SizeSelector sizes={sizes} onSizeChange={handleSizeChange} />
              <StyledFlyingButton
                main
                _id={product._id}
                src={product.images?.[0]}
                onClick={handleAddToCart}
              >
                <CartIcon /> Adicionar ao carrinho
              </StyledFlyingButton>
            </PriceRow>
            <Description>{product.description}</Description>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id).populate("category");
  if (!product) {
    return { notFound: true };
  }

  const category = await Category.findById(product.category).populate("properties");
  const sizeProperty = category.properties?.find(
    (prop) => prop.name === "Tamanho"
  );
  const sizes = sizeProperty ? sizeProperty.values : [];

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      sizes,
    },
  };
}

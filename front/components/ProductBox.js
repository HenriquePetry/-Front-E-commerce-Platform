import styled from "styled-components";
import Button, {ButtonStyle} from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import {primary} from "@/lib/colors";
import FlyingButton from "@/components/FlyingButton";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  display: flex; /* Para facilitar a adaptação da altura */
  flex-direction: column; /* Alinhar os elementos na coluna */
  width: 100%; /* Opcional: Definir a largura do box */
  /* A altura será automaticamente ajustada pelo conteúdo */
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
   border-radius: 10px 10px 0 0;
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%; 
    object-fit: contain; /* Mantém a proporção da imagem */
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  
  background-color: #fff; /* Fundo branco para a caixa de informações do produto */
  padding: 10px; /* Padding interno para espaçamento */
   border-radius: 0 0 10px 10px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 50px !important;
  height: 50px;
  padding: 10px;
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color: red;
  ` : `
    color: black;
  `}
  svg {
    width: 16px;
  }
`;

// Estilização do botão "Add to Cart"
const StyledFlyingButton = styled(FlyingButton)`
  background-color: black !important; /* Cor de fundo preta */
  color: white !important; /* Cor do texto branca */
  border: none !important; /* Remove bordas */
  padding: 5px 10px !important; /* Espaçamento interno */
  border-radius: 5px !important; /* Bordas arredondadas */
  cursor: pointer !important; /* Cursor de ponteiro ao passar o mouse */

  &:hover {
    background-color: #333 !important; /* Cor ao passar o mouse */
  }
`;

export default function ProductBox({
  _id, title, description, price, images, wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wished);
  
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post('/api/wishlist', {
      product: _id,
    }).then(() => {});
    setIsWished(nextValue);
  }
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
          R$ {price}
          </Price>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

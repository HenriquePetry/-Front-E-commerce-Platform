import Center from "@/components/Center";
import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import {RevealWrapper} from 'next-reveal'

// Componente do fundo com imagem
const Bg = styled.div`
  background-color: rgba(34, 34, 34, 0.9);
  color: #fff;
  padding: 300px 0;
  background-image: url("/background.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 300px;
  width: 100%;
  margin-top: -70px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Adiciona uma sombra leve */
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 3.5rem;
  }
`;
const Desc = styled.p`
  color: #fff;
  font-size: 0.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Adiciona uma sombra leve */
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img.main {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    & > div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImgColumn = styled(Column)`
  & > div {
    width: 100%;
  }
`;

const ContentWrapper = styled.div``;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={"left"} delay={0}>
                <ContentWrapper>
                  <Title>{product.title}</Title>
                  <Desc>{product.description}</Desc>
                  <ButtonsWrapper>

                  <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Read more</ButtonLink>
                  <FlyingButton _id={product._id} src={product.images?.[0]}>
                      <CartIcon />
                      Add to cart
                    </FlyingButton>

                  </ButtonsWrapper>
                </ContentWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img className={"main"} src="" alt="" />
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

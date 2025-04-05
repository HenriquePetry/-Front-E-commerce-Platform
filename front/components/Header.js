import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => (props.scrolled ? "white" : "transparent")};
  transition: background-color 0.3s ease; /* Para uma transição suave */
`;

const Logo = styled(Link)`
  color: black;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: black; /* Cor preta para o ícone do menu */
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: black; /* Cor preta para os ícones */
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Função para monitorar o scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHeader scrolled={scrolled}>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Unisinos TCC</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Produtos</NavLink>
            <NavLink href={'/categories'}>Categorias</NavLink>
            <NavLink href={'/account'}>Conta</NavLink>
            <NavLink href={'/cart'}>Carrinho</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}>
              <SearchIcon style={{ color: 'black' }} /> {/* Cor preta para o ícone de busca */}
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

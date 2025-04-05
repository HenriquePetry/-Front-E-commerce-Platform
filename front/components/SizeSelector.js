import styled from "styled-components";
import { useState } from "react";

const SelectorWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 1rem;
`;

export default function SizeSelector({ sizes, onSizeChange }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    onSizeChange(size); // Chama a função passada como props para manipular a mudança de tamanho
  };

  return (
    <SelectorWrapper>
      <Label htmlFor="size">Tamanho:</Label>
      <Select id="size" value={selectedSize} onChange={handleChange}>
        <option value="">--Selecione o Tamanho--</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Select>
    </SelectorWrapper>
  );
}

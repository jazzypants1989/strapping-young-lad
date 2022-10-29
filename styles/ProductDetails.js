import styled from "styled-components";

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    max-width: 60vw;
    max-height: 60vh;
    object-fit: contain;
  }
`;

export const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const Buy = styled.button`
  background: var(--primary);
  width: 100%;
  color: white;
  font-size: 1.5rem;
  font-weight: medium;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

import styled from "styled-components";

export const CartWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyle = styled.div`
  max-width: 33vw;
  min-width: 300px;
  background: #f2f2f2;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 0.2rem;
  margin: 5%;
  padding: 0.2rem;
  background: #fff;
  width: 90%;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 50%;
  p {
    font-size: 1rem;
  }
  svg {
    font-size: 1rem;
    margin-top: 0.2rem;
    cursor: pointer;
  }
  span {
    font-weight: 600;
  }
`;

export const CardButton = styled.button`
  background: inherit;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #000;
  padding: 0.25rem;
  width: fit-content;
`;

export const TotalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 15%;
  text-align: justify;
`;

export const EmptyStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: 1rem;
  }
  svg {
    font-size: 8rem;
    color: #aa88ff;
  }
`;

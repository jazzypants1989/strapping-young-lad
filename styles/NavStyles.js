import styled from "styled-components";

export const NavStyles = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-size: 1.2rem;
  }
`;

export const NavItems = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  li {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-size: 1rem;
  }
  svg {
    font-size: 1.5rem;
  }
`;

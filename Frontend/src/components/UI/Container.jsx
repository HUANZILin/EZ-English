import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem 0rem;
`;

const Container = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;

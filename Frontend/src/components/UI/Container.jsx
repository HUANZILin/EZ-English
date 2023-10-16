import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Container = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;

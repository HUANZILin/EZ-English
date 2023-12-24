import styled from "styled-components";
import { Button } from "antd";

const StyledButton = styled(Button)`
  background-color: #e2e4dd;
  color: #314543;
  font-size: 26px;
  letter-spacing: 2px;
  width: fit-content;
  height: fit-content;
  align-self: center;
  padding: 5px 20px;
  margin: 2rem;
  border: none;

  &:hover {
    color: #7b8072 !important;
  }
`;

const LoadButton = (props) => {
  return (
    <StyledButton onClick={props.onClickHandler}>{props.children}</StyledButton>
  );
};

export default LoadButton;

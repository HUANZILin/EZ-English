import styled from "styled-components";

const StyledDiv = styled.div`
  align-self: center;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 1rem;
  margin-bottom: 5rem;

  div {
    box-sizing: border-box;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #e2e4dd;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #e2e4dd transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function LoadingIndicator() {
  return (
    <StyledDiv>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledDiv>
  );
}

import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: #e2e4dd;
  margin: 8rem 0;
  padding: 1rem;
  border-radius: 4px;
  color: #6d2134;
  display: flex;
  width: 35%;
  gap: 2rem;
  align-items: center;
  align-self: center;
  text-align: left;

  .error-block-icon {
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    color: #fff;
    background-color: #6d2134;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h2 {
    color: inherit;
    font-size: 1.25rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

export default function ErrorBlock({ title, message, style }) {
  return (
    <StyledDiv style={style}>
      <div className="error-block-icon">!</div>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </StyledDiv>
  );
}

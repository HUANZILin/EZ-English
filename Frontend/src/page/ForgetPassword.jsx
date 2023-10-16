import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 8rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .formTop {
        display: flex;
        margin: 3rem 0rem 3rem 0rem;
      }
      .formButtom {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        margin-bottom: 5rem;
        a {
          color: #e2e4dd;
          text-decoration: none;
          padding: 0.1rem 3rem;
        }
        .register {
          margin-top: 10px;
          text-decoration: underline;
        }
      }
      .label {
        display: flex;
        flex-direction: column;
        padding-right: 2rem;
        align-items: center;
        label {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 15px;
        }
      }
      .input {
        display: flex;
        flex-direction: column;
        input {
          background-color: #e2e4dd;
          color: #314543;
          border: none;
          outline: none;
          border-radius: 20px;
          padding: 6px 25px 6px 25px;
          margin-bottom: 2rem;
        }
      }
      button {
        background-color: #314543;
        color: #e2e4dd;
        border: none;
        border-radius: 30px;
        padding: 0.5rem 1rem;
      }
`;

const ForgetPassword = () => {
    return(
        <Container>
            <h1 style={{color: "#e2e4dd",
            letterSpacing: "1rem",
            textAlign: "center"}}>忘記密碼</h1>
            <div style={{margin: "0 auto",
            marginTop: "2rem",
            height: "0.1rem",
            width: "50vw",
            backgroundColor: "#e2e4dd",
            alignItems: "center"}}></div>
            <StyledForm>
            <div class="formTop">
          <div class="label">
            <label for="email">帳號/Email</label>
          </div>
          <div class="input">
            <input id="email" type="email" name="email" required />
          </div>
        </div>

        <div class="formButtom">
          <button id="submit" type="submit">
          <a href="#">寄出驗證信</a></button>
        </div>
            </StyledForm>
        </Container>

    );
};

export default ForgetPassword;
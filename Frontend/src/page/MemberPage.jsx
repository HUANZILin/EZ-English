import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { fetchMember } from "../util/http";
import Modal from "../components/UI/Modal";
import Container from "../components/UI/Container";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  label {
    font-size: 1.5rem;
    padding: 10px;
    margin-top: 10px;
  }

  input {
    height: 2.5rem;
    width: 20vw;
    text-align: center;
    line-height: 2.5rem;
    background-color: #e2e4dd;
    border: 0px;
    border-radius: 2rem;
    float: right;
    outline: none;
  }

  input::placeholder {
    color: #314543;
    opacity: 1;
  }

  button {
    margin: 60px 10px 100px 10px;
    height: 2.5rem;
    font-size: 1rem;
    color: #e2e4dd;
    background-color: #314543;
    border: none;
    border-radius: 30px;
    padding: 10px 40px;
  }
`;

const GeneralButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #e2e4dd;
  background-color: #314543;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
`;

const AlertButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #e2e4dd;
  background-color: #6d2134;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
`;

const MemberPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["memberData"],
    queryFn: fetchMember,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const memberData = {
    id: "#1234",
    account: "abc@gmail.com",
    password: "123abc",
  };

  const editHandler = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setIsDelete(true);
  };

  const handleStartDelete = () => {
    // mutate({ id: params.id });
  };

  const handleStopDelete = () => {
    setIsDelete(false);
  };

  let content;

  if (isPending) {
    content = <h1>Loading...</h1>;
  }

  if (isError) {
    content = <h1>An Error occurred.</h1>;
  }

  if (data) {
    content = (
      <StyledForm action="">
        <label htmlFor="userId">UID</label>
        <input type="text" placeholder={memberData.id} disabled />
        <label htmlFor="account">帳號/Email</label>
        <input type="email" placeholder={memberData.account} disabled />
        <label htmlFor="password">密碼</label>
        {isEdit ? (
          <input id="password" type="text" />
        ) : (
          <input type="text" placeholder={data} disabled />
        )}
        <div>
          {!isEdit && <button onClick={editHandler}>修改密碼</button>}
          {isEdit && <button onClick={saveHandler}>儲存</button>}
          {isEdit && (
            <button
              type="button"
              style={{
                backgroundColor: "#6d2134",
              }}
              onClick={deleteHandler}
            >
              刪除帳號
            </button>
          )}
        </div>
      </StyledForm>
    );
  }

  return (
    <Container>
      <h1
        style={{
          paddingTop: "100px",
          textAlign: "center",
          letterSpacing: "2rem",
        }}
      >
        &thinsp;會員資料
      </h1>
      <hr width="80%" />
      {isDelete && (
        <Modal>
          <h2>確定要刪除嗎?</h2>
          <p>確定要刪除此帳號?此動作無法回復</p>
          <div>
            <GeneralButton onClick={handleStopDelete}>取消</GeneralButton>
            <AlertButton onClick={handleStartDelete}>刪除</AlertButton>
          </div>
        </Modal>
      )}
      {content}
    </Container>
  );
};

export default MemberPage;

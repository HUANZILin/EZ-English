import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { fetchMember } from "../util/http";
import Modal from "../components/UI/Modal";
import Container from "../components/UI/Container";
import ErrorBlock from "../components/UI/ErrorBlock";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Title from "../components/Title";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;

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
  const memberData = {
    id: "12",
    account: "testuser1216@gmail.com",
    password: "testuser1216",
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["memberData"],
    queryFn: fetchMember,
  });
  const [newPassword, setNewPassword] = useState(memberData.password);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const editHandler = (e) => {
    e.preventDefault();
    setIsEdit(true);
    setNewPassword("");
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setNewPassword(e.target.value);
    alert("修改成功！");
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

  if (isLoading) {
    content = (
      <>
        <h2
          style={{ fontSize: "28px", alignSelf: "center", marginTop: "2rem" }}
        >
          Loading...
        </h2>
        <LoadingIndicator />
      </>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title={"發生錯誤"}
        message={"取得資料時發生錯誤，請確認網路連線或於片刻後重整頁面。"}
      />
    );
  }

  if (data) {
    content = (
      <StyledForm action="">
        <label htmlFor="userId">UID</label>
        <input type="text" placeholder={memberData.id} disabled />
        <label htmlFor="account">帳號/Email</label>
        <input type="email" placeholder={data} disabled />
        <label htmlFor="password">密碼</label>
        {isEdit ? (
          <input id="password" type="text" />
        ) : (
          <input type="text" placeholder={newPassword} disabled />
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
      <Title title={"會員資料"} />
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

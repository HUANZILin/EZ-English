import { useContext, useState } from "react";
import { WordData } from "../../store/WordDataContext";

import styled from "styled-components";
import Modal from "./Modal";
import { Input, List, Alert } from "antd";
let { Search } = Input;

Search = styled(Search)`
  padding-bottom: 10px;

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper:focus-within,
  .ant-input-affix-wrapper:hover,
  .ant-btn-default:not(:disabled):not(.ant-btn-disabled):active {
    border-color: #314543;
  }

  .ant-input-affix-wrapper:focus-within {
    box-shadow: none;
  }

  .ant-btn-primary {
    background-color: #314543;
  }

  .ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
    background-color: #58805e;
  }
`;

const GeneralButton = styled.button`
  cursor: pointer;
  border: none;
  color: #e2e4dd;
  background-color: #58805e;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
`;

const CreateButton = styled.button`
  cursor: pointer;
  border: none;
  color: #e2e4dd;
  background-color: #314543;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
`;

const StyledAlert = styled(Alert)`
  .ant-alert-message {
    color: #314543;
  }
`;

export const NewCardModal = ({ handleStopCreate, handleCreateCard }) => {
  const wordCtx = useContext(WordData);
  const [loadMore, setLoadMore] = useState(10);
  const [searched, setSearched] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState({});
  const [onCreate, setOnCreate] = useState(false);

  const onChange = (event) => {
    setSearchWord(event.target.value);
  };

  const onSearch = () => {
    setSearched(true);
    let searchResult = wordCtx.filter((word) =>
      word.w_word.toLowerCase().includes(searchWord.toLowerCase())
    );
    setFoundWords(searchResult.slice(0, loadMore));
    console.log(foundWords);
  };

  const handleWordSelect = (word) => {
    setSelectedWord(word);
  };

  const handleStartCreate = () => {
    if (Object.keys(selectedWord).length !== 0) {
      setOnCreate(true);
      handleCreateCard(selectedWord);
    }
  };

  return (
    <Modal>
      <h2>新增單字卡</h2>
      <p>請搜尋單字列表中的單字，並新增至單字卡。</p>
      <Search
        placeholder="請輸入想搜尋的單字"
        allowClear
        enterButton="搜尋"
        onChange={onChange}
        onSearch={onSearch}
      />
      {searched && foundWords.length === 0 ? (
        <List />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={foundWords}
          renderItem={(item) => (
            <List.Item key={item.w_id}>
              <List.Item.Meta
                avatar={
                  <label key={item.w_id}>
                    <input
                      type="radio"
                      name="objectRadio"
                      value={item.w_id}
                      checked={
                        selectedWord && selectedWord.w_word === item.w_word
                      }
                      onChange={() => handleWordSelect(item)}
                      disabled={onCreate}
                    />
                  </label>
                }
                title={
                  <p style={{ color: "#314543", fontWeight: "bold" }}>
                    {item.w_word} ({item.w_part_of_speech})
                  </p>
                }
                description={item.w_meaning}
                style={{ alignItems: "center" }}
              />
            </List.Item>
          )}
        />
      )}
      <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <GeneralButton onClick={handleStopCreate}>取消</GeneralButton>
        <CreateButton onClick={handleStartCreate}>新增</CreateButton>
      </div>
      {onCreate && Object.keys(selectedWord).length !== 0 && (
        <StyledAlert message="新增成功" type="success" showIcon />
      )}
    </Modal>
  );
};

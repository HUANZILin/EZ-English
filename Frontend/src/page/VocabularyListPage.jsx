import Title from "../components/Title";
import styled from "styled-components";
import FuncBar from "../components/FuncBar";
import VocabularyCard from "../components/UI/VocabularyCard";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import LoadButton from "../components/UI/LoadButton";
import { useEffect, useState, useContext } from "react";
import { WordData } from "../store/WordDataContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 3rem 0rem;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60rem;
`;

const Smalltit = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 60rem;
`;

const VocabularyListPage = () => {
  const wordCtx = useContext(WordData);
  const [onPlaying, setOnPlaying] = useState([]);
  const [loadMore, setLoadMore] = useState(10);
  const [noMoreResult, setNoMoreResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOnPlaying(wordCtx.slice(0, loadMore));
    if (wordCtx.length > 0) {
      setIsLoading(false);
    }
  }, [wordCtx, loadMore]);

  const NowSearchWord = (searchWord) => {
    if (searchWord) {
      let searchResult = wordCtx.filter((word) =>
        word.w_word.toLowerCase().includes(searchWord)
      );
      console.log(searchResult.length);
      if (searchResult.length <= loadMore) {
        setNoMoreResult(true);
        setOnPlaying(searchResult);
      } else {
        setNoMoreResult(false);
        setOnPlaying(searchResult.slice(0, loadMore));
      }
    } else {
      setOnPlaying(wordCtx.slice(0, loadMore));
    }
  };

  const NowSorting = (isSorting) => {
    if (isSorting) {
      const sortedWords = [...onPlaying].sort((a, b) => {
        const nameA = a.w_word.toLowerCase();
        const nameB = b.w_word.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOnPlaying(sortedWords);
    }
  };
  if (isLoading) {
    return (
      <Container>
        <Title title="單字列表" />
        <>
          <h2
            style={{ fontSize: "28px", alignSelf: "center", marginTop: "2rem" }}
          >
            Loading...
          </h2>
          <LoadingIndicator />
        </>
      </Container>
    );
  }

  const loadHandler = (e) => {
    e.preventDefault();
    setLoadMore((prevLoadMore) => prevLoadMore + 10);
  };

  return (
    <Container>
      <Title title="單字列表" />
      <FuncBar isSearching={NowSearchWord} isSorting={NowSorting} />
      <Smalltit>
        <h2 style={{ paddingLeft: "10rem" }}>單字(詞性)</h2>
        <h2 style={{ paddingLeft: "6rem" }}>正確率</h2>
        <h2 style={{ paddingRight: "2rem" }}>最後測驗時間</h2>
      </Smalltit>
      {onPlaying.length == 0 ? (
        <h2 style={{ color: "#e2e4dd" }}>沒有搜尋到單字，請重新搜尋</h2>
      ) : (
        <Card>
          {onPlaying.map((word) => (
            <VocabularyCard
              key={word.w_id}
              word={word.w_word}
              pos={word.w_part_of_speech}
              corr={word.average_score}
              lp={word.latest_datetime}
              collected={word.collect}
              theID={word.w_id}
            />
          ))}
          {noMoreResult ? (
            <></>
          ) : (
            <LoadButton onClickHandler={loadHandler}>Load More</LoadButton>
          )}
        </Card>
      )}
    </Container>
  );
};

export default VocabularyListPage;

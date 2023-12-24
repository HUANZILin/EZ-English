import styled from "styled-components";
import { Collapse, Progress } from "antd";
import { useEffect, useState } from "react";

const Container = styled(Collapse)`
  display: flex;
  align-items: center;
  background-color: #e2e4dd;
  border: none;
  color: #314543;
  margin: 1rem;

  h2 {
    color: #314543;
  }

  .ant-collapse-item {
    width: 100%;
  }

  .ant-collapse-content-box {
    background-color: #eff1e9;
  }

  .ant-collapse-item li {
    color: #314543;
    font-size: large;
  }

  .ant-collapse-expand-icon {
    padding-left: 2rem;
    margin-right: -2rem;
    align-self: center;
  }

  .ant-collapse-header,
  .ant-collapse-header-text {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const BarDiv = styled.div`
  display: flex;
  width: 20rem;
  justify-content: center;
  color: #314543;
`;

const Record = (props) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore((prevScore) => (prevScore = 0));
    props.data.map((word) => {
      setScore((prevScore) => prevScore + parseInt(word.p_score));
    });
  }, [props.data]);

  return (
    <>
      <Container
        collapsible="header"
        items={[
          {
            key: props.time,
            label: (
              <>
                <h2>{props.time.slice(0, 10)}</h2>
                <h2>{props.data[0].p_select}</h2>
                <BarDiv>
                  <Progress
                    strokeColor="#58805e"
                    percent={(score / props.data.length) * 33}
                    trailColor="#314543"
                    size={[300, 20]}
                    showInfo={false}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  ></Progress>
                  <h2>{`${(score / props.data.length) * 33}`.slice(0, 4)}%</h2>
                </BarDiv>
              </>
            ),
            children: (
              <ol>
                {props.data.map((word) => (
                  <li key={word.w_id}>{word.w_word}</li>
                ))}
              </ol>
            ),
          },
        ]}
      />
    </>
  );
};

export default Record;

import { createContext, useState, useEffect } from "react";

export const RecordData = createContext({
  recordList: [],
});

export default function RecordDataProvider({ children }) {
  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    const url = "https://jybluega.com/ez-backend/quizData";
    const token = sessionStorage.getItem("memberToken");
    async function fetchData() {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await response.json();

      if (!response.ok) {
        setRecordData({
          [2023 - 12 - 19]: [
            { w_word: "Apple", p_select: "隨機", p_score: "1" },
          ],
        });
        throw Error("Something went wrong!");
      }

      const filteredData = resData.data.wordsData.filter(
        (item) => item.w_id !== null
      );

      const groupedArrays = filteredData.reduce((accumulator, currentValue) => {
        const { created_at } = currentValue;

        // 如果 accumulator 中已經有這個分組的陣列，則將元素加入該陣列，否則創建新的陣列
        if (accumulator[created_at]) {
          accumulator[created_at].push(currentValue);
        } else {
          accumulator[created_at] = [currentValue];
        }

        return accumulator;
      }, {});

      setRecordData(groupedArrays);
    }
    try {
      fetchData();
    } catch (error) {
      console.log("The error occurred! :", error.message);
    }
  }, []);

  return (
    <RecordData.Provider value={recordData}>{children}</RecordData.Provider>
  );
}

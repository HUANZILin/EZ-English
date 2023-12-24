import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./page/Layout/Root";
import Practice from "./page/Layout/Practice";
import HomePage from "./page/HomePage";
import RemindLoginPage from "./page/RemindLoginPage";
import MemberPage from "./page/MemberPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ForgetPassword from "./page/ForgetPassword";
import CardPage from "./page/CardPage";
import DefaultPracticePage from "./page/DefaultPracticePage";
import CollectionPracticePage from "./page/CollectionPracticePage";
import { queryClient } from "./util/http";
import VocabularyListPage from "./page/VocabularyListPage";
import PracticeRecordPage from "./page/PracticeRecordPage";
import VideoPage from "./page/VideoPage";
import CollectionWord from "./page/CollectionWord";
import AnalysisPage from "./page/AnalysisPage";
import AI from "./page/Layout/AI";
import AICommunication from "./page/AICommunication";
import AICommunicationGrammar from "./page/AICommunicationGrammar";
import WordDataProvider from "./store/WordDataContext";
import RecordDataProvider from "./store/RecordDataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "remindlogin", element: <RemindLoginPage /> },
      {
        path: "member",
        children: [{ index: true, element: <MemberPage /> }],
      },
      {
        path: "register",
        children: [{ index: true, element: <RegisterPage /> }],
      },
      { path: "login", children: [{ index: true, element: <LoginPage /> }] },
      {
        path: "forgetpassword",
        children: [{ index: true, element: <ForgetPassword /> }],
      },
      {
        path: "vocabulary",
        children: [
          { path: "list", element: <VocabularyListPage /> },
          { path: "card", element: <CardPage /> },
          { path: "collection", element: <CollectionWord /> },
          {
            path: "practice",
            element: <Practice />,
            children: [
              { index: true, element: <DefaultPracticePage /> },
              { path: "collection", element: <CollectionPracticePage /> },
            ],
          },
        ],
      },
      { path: "video", element: <VideoPage /> },
      {
        path: "aicommunication",
        element: <AI />,
        children: [
          { index: true, element: <AICommunication /> },
          { path: "grammar", element: <AICommunicationGrammar /> },
        ],
      },
      {
        path: "analysis",
        children: [
          { index: true, element: <AnalysisPage /> },
          { path: "record", element: <PracticeRecordPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <WordDataProvider>
      <RecordDataProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </RecordDataProvider>
    </WordDataProvider>
  );
}

export default App;

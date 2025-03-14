import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';

import Notification from './components/common/Notification/Notification';
import SharedLayout from './components/common/SharedLayout/SharedLayout';
import PrivatePage from './pages/PrivatePage/PrivatePage';
import RestrictedPage from './pages/RestrictedPage/RestrictedPage';

import ProjectPage from './pages/ProjectPage/ProjectPage.styled';

// todo : => de integrat
import StyledNewBoard from './components/NewBoard/NewBoard.styled';
import StyledEditBoard from './components/EditBoard/EditBoard.styled';
import StyledAddCard from './components/common/AddCard/AddCard.styled';
import StyledEditCard from './components/common/EditCard/EditCard.styled';
import StyledColumnContainer from './components/ColumnContainer/ColumnContainer.styled';
import StyledCardContent from './components/CardContent/CardContent.styled';
import StyledBoard from './components/Board/Board.styled';
import StyledAddColumn from './components/AddColumn/AddColumn.styled';
import StyledEditColumn from './components/EditColumn/EditColumn.styled';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.styled'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.styled'));
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage/RegisterPage.styled')
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage/DashboardPage.styled')
);
// const ProjectPage = lazy(() =>
//   import('./pages/ProjectPage/ProjectPage.styled')
// );

// todo => verificat shared layout cu lazy, verificat use effect daor atunci cand nu sunt logat
// todo => project page cu lazy la sfarsit, dupa ce este stilizat, gata

const columnsData = [
  {
    title: 'To Do',
    cards: [
      {
        title: 'The Watch Spot Design',
        description:
          "Create a visually stunning and eye-catching watch dial design that embodies our brand's...",
        priority: 'Low',
        deadline: '12/05/2023',
      },
      {
        title: 'Research and Analysis',
        description:
          "Conduct in-depth research and analysis on the project's topic, gather relevant data, and identify...",
        priority: 'Medium',
        deadline: '12/05/2023',
      },
      {
        title: 'Concept Development',
        description:
          "Brainstorm and develop creative concepts and ideas that align with the project's objectives...",
        priority: 'Without',
        deadline: '12/05/2023',
      },
    ],
  },
  {
    title: 'In Progress',
    cards: [
      {
        title: 'Wireframing',
        description: 'Create wireframes for the new website layout...',
        priority: 'High',
        deadline: '12/10/2023',
      },
    ],
  },
  {
    title: 'Completed',
    cards: [
      {
        title: 'Logo Design',
        description: 'Design the new company logo...',
        priority: 'Medium',
        deadline: '12/01/2023',
      },
    ],
  },
  // Add more columns as needed
];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<RestrictedPage page={HomePage} />} />
          <Route
            path="/register"
            element={<RestrictedPage page={RegisterPage} />}
          />
          <Route path="/login" element={<RestrictedPage page={LoginPage} />} />

          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<PrivatePage page={DashboardPage} />} />
            <Route
              path=":projectId"
              element={<PrivatePage page={ProjectPage} />}
            />
          </Route>

          {/* todo: => astea sterse si intorduse elementele acolo unde trebuie */}
          <Route path="/addcard" element={<StyledAddCard />}></Route>
          <Route path="/editcard" element={<StyledEditCard />}></Route>
          <Route path="/addcolumn" element={<StyledAddColumn />}></Route>
          <Route path="/editcolumn" element={<StyledEditColumn />}></Route>
          <Route path="/newboard" element={<StyledNewBoard />}></Route>
          <Route path="/editboard" element={<StyledEditBoard />}></Route>
          <Route
            path="/columncontainer"
            element={<StyledColumnContainer />}
          ></Route>
          <Route path="/cardcontent" element={<StyledCardContent />}></Route>
          <Route
            path="/board"
            element={<StyledBoard columns={columnsData} />}
          ></Route>
        </Routes>
      </Suspense>

      <Notification />
    </>
  );
};

export default App;

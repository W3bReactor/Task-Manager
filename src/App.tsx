import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Header, Sidebar } from './components';
import './assets/styles/main.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { StatsPage } from './pages/StatsPage';
import styled from 'styled-components';
import { Container } from './styles';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './hooks/useAppSelector';
import { selectIsAuth } from './store/auth/selectors';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setIsAuth, setUser } from './store/auth';
import Loading from './components/UI/Loading';
import VerifyPage from './pages/VerifyPage';
import NotFound from './pages/NotFound';
import { authApi } from './store/services/AuthService';
import AddProjectPage from './pages/AddProjectPage';
import ProjectPage from './pages/ProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskPage from './pages/TaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage';
import { socket } from './socket';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const App = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();
	const { data, isSuccess, isLoading } = authApi.useCheckAuthQuery();

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('token', data.accessToken);
			dispatch(setUser(data.user));
			dispatch(setIsAuth(true));
		}
	}, [isSuccess]);

	useEffect(() => {
		socket.connect();
		return () => {
			socket.disconnect();
		};
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<HashRouter>
			<Page>
				<Header />
				<GridWrapper>
					{isAuth ? (
						<>
							<Sidebar />
							<Main auth={isAuth}>
								<Routes>
									<Route path="/privacy" element={<PrivacyPolicyPage />} />

									<Route path="/dashboard" element={<StatsPage />} />
									<Route path="/projects" element={<ProjectsPage />} />
									<Route path="/settings" element={<SettingsPage />} />
									<Route path="/task" element={<TasksPage />} />
									<Route path="/account/:id" element={<AccountPage />} />
									<Route path="/verify" element={<VerifyPage />} />
									<Route path="/project/add" element={<AddProjectPage />} />
									<Route
										path="/project/:projectId/update"
										element={<UpdateProjectPage />}
									/>
									<Route path="/project/:projectId" element={<ProjectPage />} />
									<Route
										path="/project/:projectId/task/add"
										element={<AddTaskPage />}
									/>
									<Route
										path="/project/:projectId/task/:taskId/update"
										element={<UpdateTaskPage />}
									/>
									<Route
										path="/project/:projectId/task/:taskId"
										element={<TaskPage />}
									/>
									<Route path="/search/:query" element={<SearchPage />} />
									<Route path="/*" element={<NotFound />} />
								</Routes>
							</Main>
						</>
					) : (
						<Main auth={isAuth}>
							<Section>
								<Routes>
									<Route path="/privacy" element={<PrivacyPolicyPage />} />
									<Route path="/register" element={<RegisterPage />} />
									<Route path="/login" element={<LoginPage />} />
									<Route path="/*" element={<RegisterPage />} />
								</Routes>
							</Section>
						</Main>
					)}
				</GridWrapper>
			</Page>
		</HashRouter>
	);
};

export default App;

const Page = styled.div`
	${Container};
`;

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Main = styled.main<{ auth: boolean }>`
	grid-column: ${(props) => (props.auth ? 10 : 12)} span;
	padding: 30px;
	background-color: #f9f8f8;
`;
const Section = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 80vh;
`;

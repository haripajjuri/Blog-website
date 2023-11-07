import './App.css';
import MainPage from './MainPage';
import { useState } from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from './components/IndexPage';
import Login from './components/Login'
import Register from './components/Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import LoadingBar from 'react-top-loading-bar'
import EditPost from './components/EditPost';
import UserPage from './components/UserPage';
import MyPosts from './components/MyPosts';

function App() {
  const [progress, setProgress] = useState(0)
  return (
    
    <BrowserRouter>
    <UserContextProvider>
    <Routes>

      <Route path='/' element={<MainPage/>}>
        <Route index element={<IndexPage/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/createPost' element={<CreatePost/>}></Route>
        <Route path='/post/:id' element={<PostPage/>}></Route>
        <Route path='/edit/:id' element={<EditPost />}></Route>
      </Route>
    </Routes>
    </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

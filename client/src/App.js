

import TextEditor from './TextEditor';
import Home from './Home';

import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
const router = createBrowserRouter([
  {path:"/", element: <Home/>},
  {path:"/documents/:id", element:<TextEditor/>}

])
function App() {

  
  return (

    <RouterProvider router={router}/>
   
  );
}

export default App;

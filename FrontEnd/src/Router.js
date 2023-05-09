import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./shared/Login";
import SideBar from "./Admin/components/SideBar";
import Assign from "./Admin/pages/Assign";
import Main from "./Instructor/pages/Main";
import Home from "./shared/Home";
import AllCourses from "./Student/pages/AllCourses";
import MyCourses from "./Student/pages/MyCourses";
import Show from "./Admin/pages/Show";
import AdminAdd from "./Admin/pages/AdminAdd";
import AdminUpdate from "./Admin/pages/AdminUpdate";
import Header from "./shared/Header";
import Courses from "./Instructor/pages/Courses";
import StudentCourse from "./Instructor/pages/StudentCourse";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import Student from "./middleware/Student";
import Instructor from "./middleware/Instructor";
export const router = createBrowserRouter([
  {
    element: <Guest />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <>
            <Header />
            <App />
          </>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "*",
            element: <div>Notfound</div>,
          },
        ],
      },
    ],
  },
  {
    element: <Admin />,
    children: [
      {
        path: "/Admin",
        element: (
          <>
            <Header />
            <App />
            <SideBar />
          </>
        ),
        children: [
          {
            path: "/Admin:type",
            element: <Show />,
          },
          {
            path: "/Admin",
            element: <Show />,
          },
          {
            path: "/Admin/Add",
            element: <AdminAdd />,
          },
          {
            path: "/Admin/Add/:type",
            element: <AdminAdd />,
          },
        ],
      },
      {
        path: "/Admin/Update",
        element: (
          <>
            <Header />
            <AdminUpdate />
            <App />
          </>
        ),
      },
      {
        path: "/Admin/Update/:type/:id",
        element: (
          <>
            <Header />
            <AdminUpdate />
            <App />
          </>
        ),
      },

      {
        path: "/Admin/assign",
        element: (
          <>
            <Header />
            <Assign />
            <App />
          </>
        ),
      },
    ],
  },

  {
    element: <Instructor />,
    children: [
      {
        path: "/Instructor",
        element: (
          <>
            <Header />
            <App />
          </>
        ),
        children: [
          {
            path: "/Instructor",
            element: <Main />,
          },
          {
            path: "/Instructor/Main",
            element: <Main />,
          },
          {
            path: "/Instructor/courses",
            element: <Courses />,
          },
          {
            path: "/Instructor/StudentCourse",
            element: <StudentCourse />,
          },
          {
            path: "/Instructor/StudentCourse/:code",
            element: <StudentCourse />,
          },
        ],
      },
    ],
  },
  {
    element: <Student />,
    children: [
      {
        path: "/Student",
        element: (
          <>
            <Header />
            <App />
          </>
        ),
        children: [
          {
            path: "/Student",
            element: <AllCourses />,
          },
          {
            path: "/Student/AllCourses",
            element: <AllCourses />,
          },
          {
            path: "/Student/MyCourses",
            element: <MyCourses />,
          },
        ],
      },
    ],
  },
]);
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import App from "./App";
// import Guest from "./middleware/Guest";
// import Login from "./shared/Login";
// import SideBar from "./Admin/components/SideBar";
// import Assign from "./Admin/pages/Assign";
// import Main from "./Instructor/pages/Main";
// import Home from "./shared/Home";
// import AllCourses from "./Student/pages/AllCourses";
// import MyCourses from "./Student/pages/MyCourses";
// import Show from "./Admin/pages/Show";
// import AdminAdd from "./Admin/pages/AdminAdd";
// import AdminUpdate from "./Admin/pages/AdminUpdate";
// import Courses from "./Instructor/pages/Courses";
// import StudentCourse from "./Instructor/pages/StudentCourse";
// export const router = createBrowserRouter([
//   {
//     path: "",
//     element: <App />,
//     children: [
//       {
//         element: <Guest />,
//         children: [
//           {
//             path: "/",
//             element: <Home />,
//           },
//           {
//             path: "/login",
//             element: <Login />,
//           },
//         ],
//       },

//       {
//         path: "/Admin",
//         element: (
//           <>
//             <SideBar />
//           </>
//         ),
//         children: [
//           {
//             path: "/Admin",
//             element: <Show />,
//           },
//           {
//             path: "/Admin/add",
//             element: <AdminAdd />,
//           },
//           {
//             path: "/Admin/Update",
//             element: <AdminUpdate />,
//           },

//           {
//             path: "/Admin/assign",
//             element: <Assign />,
//           },
//         ],
//       },
//       {
//         path: "/Instructor",
//         element: <App />,
//         children: [
//           {
//             path: "/Instructor",
//             element: <Main />,
//           },
//           {
//             path: "/Instructor/Main",
//             element: <Main />,
//           },
//           {
//             path: "/Instructor/courses",
//             element: <Courses />,
//           },
//           {
//             path: "/Instructor/StudentCourse",
//             element: <StudentCourse />,
//           },
//         ],
//       },
//       {
//         path: "/Student",
//         element: <App />,
//         children: [
//           {
//             path: "/Student",
//             element: <AllCourses />,
//           },
//           {
//             path: "/Student/AllCourses",
//             element: <AllCourses />,
//           },
//           {
//             path: "/Student/MyCourses",
//             element: <MyCourses />,
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <Navigate to={"/"} />,
//       },
//     ],
//   },
// ]);

// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
// import Log from "./components/Log";
// import Registraion from "./components/Registraion";
// import Home from "./components/Home";
// import RequestResetPassword from "./components/RequestResetPassword";
// import ResetPassword from "./components/ResetPassword";
// import PrivateRoute from "./components/PrivateRoute";
// import { Container } from "react-bootstrap";
// import { Route, Routes, Navigate } from "react-router-dom";
// const App = () => {
//   return (
//     <Container>
//       <Routes>
//         <Route
//           path="/request-reset-password"
//           element={<RequestResetPassword />}
//         />
//         <Route
//           path="/reset-password/:token"
//           element={
//             <PrivateRoute>
//               <ResetPassword />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
//         <Route
//           path="/login"
//           element={
//             <PrivateRoute>
//               {" "}
//               <Log />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/reg"
//           element={
//             <PrivateRoute>
//               <Registraion />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/home"
//           element={
//             // <PrivateRoute>
//             <Home></Home>
//             // </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Container>
//   );
// };

// export default App;

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Log from "./components/Log";
import Registraion from "./components/Registraion";
import Home from "./components/Home";
import RequestResetPassword from "./components/RequestResetPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute"; // Add this import
import { Container } from "react-bootstrap";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <Routes>
        <Route
          path="/request-reset-password"
          element={<RequestResetPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Log />
            </PublicRoute>
          }
        />
        <Route
          path="/reg"
          element={
            <PublicRoute>
              <Registraion />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;

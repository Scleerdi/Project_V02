import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { CategoryProvider } from "./context/CategoryContext";
import { UserProvider } from "./context/UserContext";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AddEventPage } from "./pages/AddEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
      },
      {
        path: "/AddEventPage",
        element: <AddEventPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { GitApp } from '../GitApp';

import { ListView, IssueView, ListViewInfiniteScroll } from '../issues/views';

export const router = createBrowserRouter([
  {
    path: '/issues',
    element: <GitApp />,
    children: [
        { path: 'list', element: <ListView />,  },
        { path: 'issue/infinite', element: <IssueView /> },
        { path: 'issue/:id', element: <ListViewInfiniteScroll /> },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="issues/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);


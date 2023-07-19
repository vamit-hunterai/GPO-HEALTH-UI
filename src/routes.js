/**
 * Author: Lakshman Veti
 * Type: Router
 * Objective: To route user navigation
 * Associated Route/Usage: Global
*/

import React from 'react';

const Insights = React.lazy(() => import('./views/insights/index'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Search = React.lazy(() => import('./views/search/search'));
const Upload = React.lazy(() => import('./upload/Upload'));
const SearchClassification = React.lazy(() => import('./views/search/SearchClassification'));
const SearchSow = React.lazy(() => import('./views/search/SearchSow'));
//const Page401 = React.lazy(() => import("./views/pages/errors/Page404"));

const routes = [
  { path: '/', exact: true, name: 'Home',component: Upload },
  { path: '/insights/:segment', exact: true, name: 'Insights',component: Insights },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/upload', name: 'Upload', component: Upload },
  { path: '/search/:segment', name: '', component: Search },
  { path: '/search', name: 'Search', component: Search },
  // { path: '/search/:fileId', name: 'File', exact: true, component: Search },
  { path: '/sow/:sow', name: 'Search Classification', exact: true, component: SearchClassification },
  { path: '/search-similar/:sow', name: 'Search Similar SOW', exact: true, component: SearchSow },
//  { path: "/page401", name: "Unauthorized", component: Page401 },
];

export default routes;

// @flow
import { lazy } from 'react';
import { USER_ROLES } from 'constants/user';
import authRoutes from 'modules/auth/routes';

/**
 * Auth property should set to true after authentication feature is developed
 */
export default [
  {
    path: '/',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/dashboard/home')),
  },
  {
    path: '/artist-profile',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/artistProfile')),
  },
  {
    path: '/gallery-listing',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/gallery/galleryListing')),
  },
  {
    path: '/integrations',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/integrations')),
  },
  {
    path: '/new-registrations',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/newRegistrations')),
  },
  {
    path: '/system-users',
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import('modules/systemUsers/systemUsers')),
  },
  ...authRoutes,
];

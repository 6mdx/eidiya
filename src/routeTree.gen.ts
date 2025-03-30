/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SuccessImport } from './routes/success'
import { Route as SignInImport } from './routes/sign-in'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedAccountImport } from './routes/_authed/account'
import { Route as AuthedLinkIdImport } from './routes/_authed/$linkId'
import { Route as AuthedGiftsLinkIdImport } from './routes/_authed/gifts.$linkId'

// Create/Update Routes

const SuccessRoute = SuccessImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedAccountRoute = AuthedAccountImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedLinkIdRoute = AuthedLinkIdImport.update({
  id: '/$linkId',
  path: '/$linkId',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedGiftsLinkIdRoute = AuthedGiftsLinkIdImport.update({
  id: '/gifts/$linkId',
  path: '/gifts/$linkId',
  getParentRoute: () => AuthedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/success': {
      id: '/success'
      path: '/success'
      fullPath: '/success'
      preLoaderRoute: typeof SuccessImport
      parentRoute: typeof rootRoute
    }
    '/_authed/$linkId': {
      id: '/_authed/$linkId'
      path: '/$linkId'
      fullPath: '/$linkId'
      preLoaderRoute: typeof AuthedLinkIdImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/account': {
      id: '/_authed/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AuthedAccountImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/gifts/$linkId': {
      id: '/_authed/gifts/$linkId'
      path: '/gifts/$linkId'
      fullPath: '/gifts/$linkId'
      preLoaderRoute: typeof AuthedGiftsLinkIdImport
      parentRoute: typeof AuthedImport
    }
  }
}

// Create and export the route tree

interface AuthedRouteChildren {
  AuthedLinkIdRoute: typeof AuthedLinkIdRoute
  AuthedAccountRoute: typeof AuthedAccountRoute
  AuthedGiftsLinkIdRoute: typeof AuthedGiftsLinkIdRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedLinkIdRoute: AuthedLinkIdRoute,
  AuthedAccountRoute: AuthedAccountRoute,
  AuthedGiftsLinkIdRoute: AuthedGiftsLinkIdRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/success': typeof SuccessRoute
  '/$linkId': typeof AuthedLinkIdRoute
  '/account': typeof AuthedAccountRoute
  '/gifts/$linkId': typeof AuthedGiftsLinkIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/success': typeof SuccessRoute
  '/$linkId': typeof AuthedLinkIdRoute
  '/account': typeof AuthedAccountRoute
  '/gifts/$linkId': typeof AuthedGiftsLinkIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/success': typeof SuccessRoute
  '/_authed/$linkId': typeof AuthedLinkIdRoute
  '/_authed/account': typeof AuthedAccountRoute
  '/_authed/gifts/$linkId': typeof AuthedGiftsLinkIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/sign-in'
    | '/success'
    | '/$linkId'
    | '/account'
    | '/gifts/$linkId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/sign-in'
    | '/success'
    | '/$linkId'
    | '/account'
    | '/gifts/$linkId'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/sign-in'
    | '/success'
    | '/_authed/$linkId'
    | '/_authed/account'
    | '/_authed/gifts/$linkId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  SignInRoute: typeof SignInRoute
  SuccessRoute: typeof SuccessRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  SignInRoute: SignInRoute,
  SuccessRoute: SuccessRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/sign-in",
        "/success"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/$linkId",
        "/_authed/account",
        "/_authed/gifts/$linkId"
      ]
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/success": {
      "filePath": "success.tsx"
    },
    "/_authed/$linkId": {
      "filePath": "_authed/$linkId.tsx",
      "parent": "/_authed"
    },
    "/_authed/account": {
      "filePath": "_authed/account.tsx",
      "parent": "/_authed"
    },
    "/_authed/gifts/$linkId": {
      "filePath": "_authed/gifts.$linkId.tsx",
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */

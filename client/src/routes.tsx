import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import RoutesPaths from './enums/routesPaths'
import { Booking, Profile, Equipment, Contacts, Price, Rules } from './pages'
import Registration from './pages/Registration'

export type RoutesArrayType = {
  path: string
  element: (() => ReactNode) | ReactNode
}

const RoutesArray: RoutesArrayType[] = [
  {
    path: RoutesPaths.NOT_FOUND,
    element: <Navigate to={RoutesPaths.BOOKING} />,
  },
  {
    path: RoutesPaths.BOOKING,
    element: <Booking />,
  },
  {
    path: RoutesPaths.PROFILE,
    element: <Profile />,
  },
  {
    path: RoutesPaths.EQUIPMENT,
    element: <Equipment />,
  },
  {
    path: RoutesPaths.CONTACTS,
    element: <Contacts />,
  },
  {
    path: RoutesPaths.PRICE,
    element: <Price />,
  },
  {
    path: RoutesPaths.RULES,
    element: <Rules />,
  },
  {
    path: RoutesPaths.REGISTRATION,
    element: <Registration />,
  },
]

export default RoutesArray

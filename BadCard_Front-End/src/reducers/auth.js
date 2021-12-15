// @flow
import { type Action } from 'shared/types/ReducerAction';
import {
  type AsyncStatusType,
  type NotificationType,
} from 'shared/types/General';

import { USER_ROLES } from 'constants/user';
import { ASYNC_STATUS } from 'constants/async';

export type AuthStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  isAuthenticated: boolean,
  isUserInitiated: boolean,
  role: null | typeof USER_ROLES.ADMIN,
  isAuthSuccess: boolean,
};

const initialState: AuthStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  isAuthenticated: false,
  isUserInitiated: true,
  role: USER_ROLES.ADMIN,
  isAuthSuccess: false,
};

export default (
  state: AuthStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    default:
      return state;
  }
};

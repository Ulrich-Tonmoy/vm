import { NotificationType } from "../enums";

export interface PromiseNotification {
  type: NotificationType.PROMISE;
  msg: { pending: string; success: string; error: string };
  promise: Promise<any> | (() => Promise<any>);
}

export interface NotificationModel {
  type: Exclude<NotificationType, NotificationType.PROMISE>;
  msg: string;
}

export type NotificationParam = NotificationModel | PromiseNotification;

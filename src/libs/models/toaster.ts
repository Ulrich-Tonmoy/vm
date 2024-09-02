import { ToasterType } from "../enums";

export interface PromiseToasterParam {
  type: ToasterType.PROMISE;
  msg: { pending: string; success: string; error: string };
  promise: Promise<any> | (() => Promise<any>);
}

export interface ToasterBaseParam {
  type: Exclude<ToasterType, ToasterType.PROMISE | ToasterType.UPDATE>;
  msg: string;
}

export interface UpdateToasterParam {
  type: ToasterType.UPDATE;
  id: number;
}

export type ToasterParam = ToasterBaseParam | UpdateToasterParam | PromiseToasterParam;

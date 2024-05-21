import { toast } from "react-toastify";
import { NotificationType } from "../enums/notification-type";
import { NotificationParam } from "../models";

export const showNotification = (param: NotificationParam) => {
  switch (param.type) {
    case NotificationType.SUCCESS:
      toast.success(param.msg);
      break;
    case NotificationType.ERROR:
      toast.error(param.msg);
      break;
    case NotificationType.WARN:
      toast.warn(param.msg);
      break;
    case NotificationType.INFO:
      toast.info("Info!");
      break;
    case NotificationType.PROMISE:
      toast.promise(param.promise, {
        pending: param.msg.pending,
        success: param.msg.success,
        error: param.msg.error,
      });
      break;
    default:
      toast.info("UnValid notification type!");
      break;
  }
};

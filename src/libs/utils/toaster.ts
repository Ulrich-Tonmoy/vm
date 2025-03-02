import { ToasterType } from "@/libs/enums/toaster-type";
import { ToasterParam } from "@/libs/models/toaster";
import { Bounce, toast, ToastOptions } from "react-toastify";

interface ToastAllOptions extends ToastOptions {
  render: string;
}

export const showToaster = (param: ToasterParam, options?: ToastAllOptions) => {
  switch (param.type) {
    case ToasterType.SUCCESS:
      return toast.success(param.msg);

    case ToasterType.ERROR:
      return toast.error(param.msg);

    case ToasterType.WARN:
      return toast.warn(param.msg);

    case ToasterType.INFO:
      return toast.info(param.msg);

    case ToasterType.PROMISE:
      return toast.promise(param.promise, {
        pending: param.msg.pending,
        success: param.msg.success,
        error: param.msg.error,
      });

    case ToasterType.LOADING:
      return toast.loading(param.msg, {
        autoClose: 5000,
        pauseOnFocusLoss: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        ...options,
      });

    case ToasterType.UPDATE:
      return toast.update(param.id, {
        autoClose: 5000,
        pauseOnFocusLoss: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        ...options,
      });

    default:
      return toast.info("Invalid notification type!");
  }
};

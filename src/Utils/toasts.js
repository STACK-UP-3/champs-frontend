import { toast } from "react-toastify";

export const errorToast = message => {
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const succcessToast = message => {
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const removeToast = () => {
  toast.dismiss();
};

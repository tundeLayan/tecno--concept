// import { toast, ToastOptions } from 'react-toastify';

type Types = "success" | "info" | "warn" | "error";

/**
 *
 * @param {String} message - Message to appear on toast
 * @param {String} type - success | info | warn | error
 */
export const showToast = (
  message: string,
  type: Types = "info",
  optionArgs = {}
) => {
  // if (type) type = type.toLowerCase() as Types;
  // const options: ToastOptions = {
  //   autoClose: 3000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   ...optionArgs,
  // };
  // switch (type) {
  //   case 'success':
  //     toast.success(message, options);
  //     break;
  //   case 'warn':
  //     toast.warn(message, options);
  //     break;
  //   case 'error':
  //     toast.error(message, options);
  //     break;
  //   case 'info':
  //     toast.info(message, options);
  //     break;
  //   default:
  //     toast.info(message, options);
  //     break;
  // }
};

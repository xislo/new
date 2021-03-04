import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const config = {
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const Toaster = (msg, type, onClose) => {
  debugger;

  switch (type) {
    case "success":
      toast.success(msg, { onClose: onClose, ...config });
      break;
    case "error":
      toast.error(msg, { onClose: onClose, ...config });
      break;
    default:
      break;
  }
};

const showToaster = (isShowToaster = true, message, type) => {
  isShowToaster && Toaster(message, type);
};

export const handleResponseWithToaster = ({
  response,
  isShowToaster = true,
  onAfterSuccess,
  onAfterFailure,
}) => {
  debugger;
  const { data = {}, meta = {} } = response;
  let { error, error_description, status, success, msg } = data;

  if (!isEmpty(error) && error === "error") {
    const {
      errors: { msg },
    } = data;

    if (msg) {
      showToaster(isShowToaster, msg, "error");
      return (
        onAfterFailure &&
        onAfterFailure({ response, status, error_description })
      );
    } else {
      showToaster(isShowToaster, `${status} - ${error_description}`, "error");
      return (
        onAfterFailure &&
        onAfterFailure({ response, status, error_description })
      );
    }
  } else {
    showToaster(isShowToaster, msg, "success");
    onAfterSuccess && onAfterSuccess({ response });
  }
};

export default Toaster;

import './Toasts.scss';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  // icon: 'success',
  // title: 'General Title',
  // animation: true,
  position: 'top-right',
  showConfirmButton: true,
  confirmButtonText: '✖',
  timer: 2500,
  timerProgressBar: true,
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const ToastConfirmDialog = async ({
  title = 'אתה בטוח?',
  text = 'לא תוכל לבטל את השינויים',
  icon = 'question',
  confirmButtonText = 'כן, אני בטוח',
  afterConfirmTitle = 'בוצע בהצלחה!',
  afterConfirmText = 'השינויים שלך בוצעו',
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,

    showCancelButton: true,
    cancelButtonText: 'ביטול',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText,
    confirmButtonColor: '#3085d6',
  });

  if (result.isConfirmed) {
    ToastSuccess();
  }

  return result.isConfirmed;
};

const ToastSuccess = async (title = 'בוצע בהצלחה!') => {
  await Toast.fire({
    title: title,
    icon: 'success',
  });
};

const ToastError = async (title = 'שגיאה') => {
  await Toast.fire({
    title: title,
    icon: 'error',
  });
};

export { ToastSuccess, ToastError, ToastConfirmDialog };

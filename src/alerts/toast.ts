import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "slate-900",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
  });
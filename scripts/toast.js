function success(message) {
  Toastify({
    text: message,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}

function error(message) {
  Toastify({
    text: message,
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #e64c4c, #b83232)",
    }
  }).showToast();
}

export { success, error };
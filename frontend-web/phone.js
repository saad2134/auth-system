const phoneInput = document.querySelector("#register-phone");

window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("us"));
  },
  excludeCountries: ["il"],
  separateDialCode: true,
  loadUtils: () => import("assets/intl-tel-input-25.2.1/build/js/utils.js?1733756310855") // for formatting/placeholders etc
});
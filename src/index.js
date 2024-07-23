const initSlider = () => {
  const imageList = document.querySelector(".slide-wrapper .img-list");
  const sliderScrollbar = document.querySelector(".slideshow .slide-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listener for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
};

window.addEventListener("load", initSlider);

// Appointment Calendar

document.addEventListener("DOMContentLoaded", () => {
  const currentDate = document.querySelector(".current-date");
  const daysTag = document.querySelector(".days");
  const prevNextIcon = document.querySelectorAll(".icons span");
  const appointmentDropdown = document.getElementById("appointment-dropdown");
  const selectedDateElement = document.getElementById("selected-date");
  const bookingForm = document.getElementById("booking-form");
  const timeSlotInput = document.getElementById("time-slot");
  const form = document.getElementById("appointment-form");
  const bookButtons = document.querySelectorAll(".book-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const formCancelBtn = document.getElementById("form-cancel-btn");

  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateofMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const lastDayofMonth = new Date(
      currentYear,
      currentMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li class="${isToday}" data-date="${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

    document.querySelectorAll(".days li:not(.inactive)").forEach((day) => {
      day.addEventListener("click", (e) => {
        const clickedDate = e.target.getAttribute("data-date");
        showDropdown(e.target, clickedDate);
      });
    });
  };

  const showDropdown = (target, day) => {
    const rect = target.getBoundingClientRect();
    const dateStr = `${months[currentMonth]} ${day}, ${currentYear}`;
    selectedDateElement.innerText = dateStr;
    appointmentDropdown.style.top = `${rect.bottom + window.scrollY}px`;
    appointmentDropdown.style.left = `${rect.left + window.scrollX}px`;
    appointmentDropdown.classList.remove("hidden");
    bookingForm.classList.add("hidden");
  };

  bookButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const timeSlot = e.target.previousSibling.textContent.trim();
      showBookingForm(timeSlot);
    });
  });

  const showBookingForm = (timeSlot) => {
    timeSlotInput.value = timeSlot;
    appointmentDropdown.classList.add("hidden");
    bookingForm.classList.remove("hidden");
  };

  prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

      if (currentMonth < 0 || currentMonth > 11) {
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const timeSlot = document.getElementById("time-slot").value;
    const service = document.getElementById("service").value;

    // Process the form data (send to server, display confirmation, etc.)
    alert(`Appointment booked successfully!
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Time Slot: ${timeSlot}
    Service: ${service}`);

    bookingForm.classList.add("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    bookingForm.classList.add("hidden");
  });

  formCancelBtn.addEventListener("click", () => {
    bookingForm.classList.add("hidden");
  });

  renderCalendar();
});

/* =========================================
        Preloader & Initial Animation
============================================ */
// makes sure the whole site is loaded
// jQuery(window).load(function () {
//     // will first fade out the loading animation
//     jQuery("#status").fadeOut();
//     // will fade out the whole DIV that covers the website.
//     jQuery("#preloader").delay(1000).fadeOut("slow");
// })

$(window).on("load", function () {
  // makes sure that whole site is loaded
  //   $("#status").fadeOut();
  $("#preloader").delay(2000).fadeOut("slow");
  $(".home_heading h2").addClass("animate__animated animate__fadeInDown");
  $(".home_heading h3").addClass("animate__animated animate__lightSpeedInLeft");
  $(".home_heading p").addClass("animate__animated animate__zoomIn");
  $(".content_btn a").addClass("animate__animated animate__zoomIn");
  $("#arrow_down svg").addClass("animate__animated animate__fadeInDown");
});

// Toggle Sidemenu
function openSlideMenu() {
  document.getElementById("side-menu").style.width = "250px";
  // document.getElementById('main').style.marginLeft = '250px';
}
function closeSlideMenu() {
  document.getElementById("side-menu").style.width = "0";
  // document.getElementById('main').style.marginLeft = '0';
}

// Home page service Slider
$("#service_carousel")
  .not("slick-initialized")
  .slick({
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

//Active Nav Link
$(".nav_ul li a").click(function () {
  $(".nav_ul li a").removeClass("active");
  $(this).addClass("active");
});

// Smooth Scrolling
$(function () {
  $("a.smooth-scroll").click(function (event) {
    event.preventDefault();

    // get section id like #about, #servcies, #work, #team and etc.
    var section_id = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(section_id).offset().top - 64,
      },
      1250,
      "easeInOutExpo"
    );
  });
});

/* =========================================
                Animation
============================================ */
// Animate on scroll
$(function () {
  new WOW().init();
});

/* =========================================
        SELECT SERVICE DETAILS
============================================ */

$("#service").on("change", function () {
  if ($(this).val() == "Dropoff") {
    $("#destination-div").css("display", "none");
    $("#origin-div").css("display", "block");
    $("#hourly-time-div").css("display", "none");
    $("#dropoff-div").css("display", "none");
    $("#pickup-div").css("display", "block");
  } else if ($(this).val() == "Pickup") {
    $("#destination-div").css("display", "block");
    $("#origin-div").css("display", "none");
    $("#hourly-time-div").css("display", "none");
    $("#dropoff-div").css("display", "block");
    $("#pickup-div").css("display", "none");
  } else if ($(this).val() == "Hourly") {
    $("#origin-div").css("display", "block");
    $("#destination-div").css("display", "none");
    $("#hourly-time-div").css("display", "block");
    $("#dropoff-div").css("display", "none");
    $("#pickup-div").css("display", "none");
    $("#vehicleType ").css("display", "none");
  } else if ($(this).val() == "OneWay") {
    $("#origin-div").css("display", "block");
    $("#destination-div").css("display", "block");
    $("#hourly-time-div").css("display", "none");
    $("#dropoff-div").css("display", "none");
    $("#pickup-div").css("display", "none");
    $("#vehicleType ").css("display", "block");
  } else {
    $("#origin-div").css("display", "none");
    $("#destination-div").css("display", "none");
    $("#hourly-time-div").css("display", "none");
    $("#dropoff-div").css("display", "none");
    $("#pickup-div").css("display", "none");
    $("#vehicleType ").css("display", "none");
  }
});

/* =================================
        hover effect
===================================== */
$("#bounce_hover1").hover(function () {
  $("#bounce_hover1").toggleClass("animate__animated animate__bounce");
});
$("#bounce_hover2").hover(function () {
  $("#bounce_hover2").toggleClass("animate__animated animate__bounce");
});
$("#bounce_hover3").hover(function () {
  $("#bounce_hover3").toggleClass("animate__animated animate__bounce");
});
// ==================================
//          Set the Date
// ==================================
var field = document.querySelector("#date");
var date = new Date();

field.value =
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0) +
  "-" +
  date.getFullYear().toString();

// Pick Current Time
$(function () {
  var d = new Date();
  var d2 = new Date(d);
  d2.setHours(d.getHours() + 12);
  var h = d2.getHours();
  var m = d2.getMinutes();
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  $("#time").each(function () {
    $(this).attr({ value: h + ":" + m });
  });
});
$("#date").datetimepicker({
  timepicker: false,
  datepicker: true,
  format: "d-m-y",
  weeks: false,
  yearStart: 2020,
  yearEnd: 2030,
  minDate: 0,
});
$("#toggle").on("click", function () {
  $("#date").datetimepicker("toggle");
});

$("#time").datetimepicker({
  timepicker: true,
  datepicker: false,
  format: "H:i",
  weeks: false,
  hours12: true,
});
$("#toggletime").on("click", function () {
  $("#time").datetimepicker("toggle");
});

$(window).keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    return false;
  }
});

// Form Validation
const errorElement = document.getElementById("error");
const bookForm = document.getElementById("bookForm");
const originInput = document.getElementById("origin-input");
const destinationInput = document.getElementById("destination-input");

bookForm.addEventListener("submit", (e) => {
  let msgs = [];

  if (originInput.value === "" || originInput.value == null) {
    msgs.push("Pickup Address is required");
  }

  if (msgs.length > 0) {
    e.preventDefault();
    errorElement.innerText = msgs.join(", ");
  }
});

// ================================
//   Book A Ride Button Redirect
// ================================

function getTaxi() {
  location.href = "/getTaxi.html";
}

// ================================
//   Add & Remove Active Class
// ================================

$(".nav_ul").on("click", "li", function () {
  $(".nav_ul li.active").removeClass("active");
  $(this).addClass("active");
});

// ================================
//   Work With Local Storage
// ================================

// var continueBtn = document.getElementById("continueBtn");

// continueBtn.addEventListener("click", function () {

//     var hourlyInputValue = document.getElementById("hourlyInput").value;
//     var pickup = document.getElementById("origin-input").value;
//     var date = document.getElementById("today").value;
//     var time = document.getElementById("time").value;
//     var passenger = document.getElementById("passenger").value;
//     var luggage = document.getElementById("luggage").value;
//     var x = document.getElementById("service").selectedIndex;
//     var y = document.getElementById("service").options;
//     var service = y[x].text;

//     console.log(service);
//     // Store
//     localStorage.setItem("pickup", pickup);
//     localStorage.setItem("date", date);
//     localStorage.setItem("time", time);
//     localStorage.setItem("passenger", passenger);
//     localStorage.setItem("luggage", luggage);
//     localStorage.setItem("hourlyInputValue", hourlyInputValue);
//     localStorage.setItem("service", service);

//     console.log(localStorage)
// })

// var getlivelocation = document.getElementById("origin-input");
// getlivelocation.addEventListener("change", function () {

//     var livelocation = document.getElementById("origin-input").value;

//     localStorage.setItem("livelocation", livelocation);

// })

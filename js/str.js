var continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", function () {

    var hourlyInputValue = document.getElementById("hourlyInput").value;
    var pickup = document.getElementById("origin-input").value;
    var dropoff = document.getElementById("destination-input").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var passenger = document.getElementById("passenger").value;
    var luggage = document.getElementById("luggage").value;
    var x = document.getElementById("service").selectedIndex;
    var y = document.getElementById("service").options;
    var service = y[x].text;
    var distance = document.getElementById("distance2").options;

    console.log(service);
    // Store
    localStorage.setItem("pickup", pickup);
    localStorage.setItem("dropoff", dropoff);
    localStorage.setItem("date", date);
    localStorage.setItem("time", time);
    localStorage.setItem("passenger", passenger);
    localStorage.setItem("luggage", luggage);
    localStorage.setItem("hourlyInputValue", hourlyInputValue);
    localStorage.setItem("service", service);
    localStorage.setItem("distance", distance);

    console.log(localStorage)
})

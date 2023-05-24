const units = ["distance", "area", "volume", "mass", "speed", "temp"];

//---------to make the page dynamic making data for each page------
const conversion_arr = {
  "distance": {
    "heading_of_nav": "Length and distance",
    "distance_arr": {
      "m": "Meter",
      "km": "Kilometer",
      "cm": "Centimeter",
      "mm": "Millimeter",
      "mcm": "Micrometer",
      "nm": "Nanometer",
      "mile": "Mile",
      "yard": "Yard",
      "foot": "Foot",
      "inch": "Inch",
    },
  },
  "area": {
    "heading_of_nav": "Area",
    "area_arr": {
      "sqm": "Square meter",
      "sqkm": "Square Kilometer",
      "sqcm": "Square Centimeter",
      "sqmm": "Square Millimete",
      "hec": "Hectare",
      "yard": "Square Yard",
      "sqft": "Square Foot",
      "sqinch": "Square Inch",
      "acre": "Acre",
    },
  },
  "volume": {
    "heading_of_nav": "Volume and Capacity",
    "volume_arr": {
      "m3": "Cubic meter",
      "km3": "Cubic Kilometer",
      "cm3": "Cubic Centimeter",
      "mm3": "Cubic Millimeter",
      "l": "liter",
      "ml": "Milliliter",
      "gallon": "Gallon",
    },
  },
  "mass": {
    "heading_of_nav": "Mass and Weight",
    "mass_arr": {
      "kg": "kilogram",
      "gm": "Gram",
      "mgm": "Milligram",
      "ton": "Metric Ton",
      "pound": "Pound",
      "carrat": "Carrat",
    },
  },
  "speed": {
    "heading_of_nav": "Speed",
    "speed_arr": {
      "mps": "Meter per second",
      "fps": "Foot per second",
      "kmph": "Kilometer per hour",
      "mph": "Mile per hour",
    },
  },
  "temp": {
    "heading_of_nav": "Temperature",
    "temp_arr": {
      "celcius": "Celcius",
      "kelvin": "Kelvin",
      "fr": "Fahrenheit",
    },
  },
};

//------------making nav bar--------------
for (let i = 1; i <= Object.keys(conversion_arr).length; i++) {
  $("#nav-tab").append(`<button data-name="${units[i - 1]}" class="nav-link ${
    i == 1 ? "active" : ""
  }" id="nav-panel${i}-tab" data-bs-toggle="tab" data-bs-target="#nav-panel${
    i - 1
  }"
  type="button" role="tab" aria-controls="nav-panel${i}" aria-selected=" ${
    i == 1 ? "true" : "false"
  }">${conversion_arr[units[i - 1]]["heading_of_nav"]}</button>`);
}

//----------getting values in select tag options---------
const get_unit_str = (page) => {
  let varname = page + "_arr";
  let str = "";
  let obj = conversion_arr[page][varname];
  for (i in obj) {
    str += `<option value="${i}"> ${obj[i]} </option>`;
  }
  return str;
};

//------------toggle form code--------

//------------setting attributes for distance at landing page----------
var fromunitid = "#distancefromunit";
var tounitid = "#distancetounit";
var fromid = "#distancefrom";
var toid = "#distanceto";
$(fromunitid + "," + tounitid).html(get_unit_str("distance"));

$(fromid).attr("oninput", "conversion(1,'distance')");
$(toid).attr("oninput", "conversion(2,'distance')");
$(fromunitid).attr("onchange", "conversion(1,'distance')");
$(tounitid).attr("onchange", "conversion(2,'distance')");
$(fromid + "," + toid).attr("min", "0");

$(".nav-link").click(function (event) {
  let headingname = $(this).data("name"); //getting which page is open

  $("#convertor-form").fadeOut(300);

  $("#heading-form").html(conversion_arr[headingname]["heading_of_nav"]); //changing heading according to page

  $(fromunitid + "," + tounitid).html(get_unit_str(headingname)); // getting option in select tag

  $("#swapbuttonid").attr("onclick", "swap('" + headingname + "')"); // swap button

  $(fromid).val(0); //setting value equal to 0 when page altered
  $(toid).val(0);

  $(fromid).attr("oninput", "conversion(1,'" + headingname + "')"); // setting attribute of function onchange and oninput
  $(toid).attr("oninput", "conversion(2,'" + headingname + "')");
  $(fromunitid).attr("onchange", "conversion(1,'" + headingname + "')");
  $(tounitid).attr("onchange", "conversion(2,'" + headingname + "')");

  $(fromunitid).attr("id", headingname + "fromunit"); //finally changing id when page altered
  $(tounitid).attr("id", headingname + "tounit");
  $(fromid).attr("id", headingname + "from");
  $(toid).attr("id", headingname + "to");

  fromunitid = "#" + headingname + "fromunit"; // gloval variables value change according to input
  tounitid = "#" + headingname + "tounit";
  fromid = "#" + headingname + "from";
  toid = "#" + headingname + "to";

  headingname != "temp"
    ? $(fromid + "," + toid).attr("min", "0")
    : $(fromid + "," + toid).removeAttr("min"); //setting min value equal to zero except for temperature page

  $("#convertor-form").fadeIn(300);
});

//---------------Swap Button code-----------
$(".buttonswap").click(function (event) {
  event.preventDefault();
});

const swap = (pagename) => {
  let fromval = $("#" + pagename + "from").val();
  let toval = $("#" + pagename + "to").val();
  $("#" + pagename + "from").val(toval);
  $("#" + pagename + "to").val(fromval);
  fromval = $("#" + pagename + "fromunit").val();
  toval = $("#" + pagename + "tounit").val();
  $("#" + pagename + "fromunit").val(toval);
  $("#" + pagename + "tounit").val(fromval);
};

//--------------Diaplay Alert-------------
const display_alert = (msg) => {
  $("#alert").css("display", "block");
  $("#alert").text(msg);
};

//--------------Ajax call-------------------
const callajax = (pagename, id1, id2, id3, id4, targetid) => {
  $("#alert").css("display", "none");

  let value_from = $(id1).val(),
    value_to = $(id2).val();

  if (/[a-df-zA-DF-Z]/.test(value_from) || /[a-df-zA-DF-Z]/.test(value_to)) {
    display_alert("Enter Numeric Value Only");
  } else if ((value_from < 0 || value_to < 0) && pagename != "temp") {
    display_alert("Please Enter Positive value");
    value_from < 0 ? $(id2).val(0) : $(id1).val(0);
  } else if (
    !(
      conversion_arr[pagename][pagename + "_arr"].hasOwnProperty(
        $(id3).val()
      ) &&
      conversion_arr[pagename][pagename + "_arr"].hasOwnProperty($(id3).val())
    )
  ) {
    display_alert("Invalid value in conversion");
  } else {
    $.ajax({
      type: "POST",
      url: "convert.php",
      data: {
        pagename: pagename,
        valfrom: $(id1).val(),
        valto: $(id2).val(),
        unitfrom: $(id3).val(),
        unitto: $(id4).val(),
      },
      success: function (data) {
        $(targetid).val(data);
      },
      error: function (error) {
        $("#target").html(data);
      },
    });
  }
};

//-----------code for conversion oninput or change in select tag-----------
const conversion_func = (page, pagename) => {
  if (page == 1) {
    id1 = "#" + pagename + "from";
    id2 = "#" + pagename + "to";
    id3 = "#" + pagename + "fromunit";
    id4 = "#" + pagename + "tounit";
    callajax(pagename, id1, id2, id3, id4, id2);
  }
  if (page == 2) {
    id2 = "#" + pagename + "from";
    id1 = "#" + pagename + "to";
    id3 = "#" + pagename + "fromunit";
    id4 = "#" + pagename + "tounit";
    callajax(pagename, id1, id2, id4, id3, id2);
  }
};

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const conversion = debounce(conversion_func);

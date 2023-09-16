// create product

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#411302";
  }
}

// ................................................
// save product

let datdpro;
if (localStorage.product != null) {
  datdpro = JSON.parse(localStorage.product);
} else {
  datdpro = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // ............................................
  // countvalue
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datdpro.push(newpro);
        }
      } else {
        datdpro.push(newpro);
      }
    } else {
      datdpro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearinput();
  }

  localStorage.setItem("product", JSON.stringify(datdpro));
  readdata();
};

// ............................................
// clear product

function clearinput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// ............................................
// read product

function readdata() {
  getTotal();
  let table = "";
  for (let i = 0; i < datdpro.length; i++) {
    table += `
   <tr>
   <td >${i + 1}</td>
   <td>${datdpro[i].title}</td>
   <td>${datdpro[i].price}</td>
   <td>${datdpro[i].taxes}</td>
   <td>${datdpro[i].ads}</td>
   <td>${datdpro[i].discount}</td>
   <td>${datdpro[i].total}</td>
   <td>${datdpro[i].category}</td>
   <td><button onclick="updateData(${i})" id="update">update</button></td>
   <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deletAll");
  if (datdpro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deletall()">Delete All (${datdpro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
readdata();

// .......................................................
//              delete data

function deleteData(i) {
  datdpro.splice(i, 1);
  localStorage.product = JSON.stringify(datdpro);
  readdata();
}

function deletall() {
  localStorage.clear();
  datdpro.splice(0);
  readdata();
}

// .......................................................
//              update  Data

function updateData(i) {
  title.value = datdpro[i].title;
  price.value = datdpro[i].price;
  taxes.value = datdpro[i].taxes;
  ads.value = datdpro[i].ads;
  discount.value = datdpro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datdpro[i].category;
  submit.innerHTML = "Ubdate";
  mood = "Ubdate";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// .......................................................
//              search  Data

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search By" + searchMood;
  search.focus();
  search.value = "";
  readdata;
}

function searchData(value) {
  console.log(value)
  let table = "";
  for (let i = 0; i < datdpro.length; i++) {
    if (searchMood == "title") {
      if (datdpro[i].title.toLowerCase().includes(value)) {
        table += `
   <tr>
   <td >${i}</td>
   <td>${datdpro[i].title}</td>
   <td>${datdpro[i].price}</td>
   <td>${datdpro[i].taxes}</td>
   <td>${datdpro[i].ads}</td>
   <td>${datdpro[i].discount}</td>
   <td>${datdpro[i].total}</td>
   <td>${datdpro[i].category}</td>
   <td><button onclick="updateData(${i})" id="update">update</button></td>
   <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
    `;
      }
    } else {
      if (datdpro[i].category.toLowerCase().includes(value)) {
        table += `
 <tr>
 <td >${i}</td>
 <td>${datdpro[i].title}</td>
 <td>${datdpro[i].price}</td>
 <td>${datdpro[i].taxes}</td>
 <td>${datdpro[i].ads}</td>
 <td>${datdpro[i].discount}</td>
 <td>${datdpro[i].total}</td>
 <td>${datdpro[i].category}</td>
 <td><button onclick="updateData(${i})" id="update">update</button></td>
 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
 </tr>
  `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

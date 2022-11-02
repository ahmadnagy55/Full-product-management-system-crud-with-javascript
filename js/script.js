// declare all variable
let title = document.getElementById('title'),
    price = document.getElementById('price'),
    taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit'),
    search = document.getElementById('search'),
    searchByTitle = document.getElementById('searchByTitle'),
    searchByCategory = document.getElementById('searchByCategory'),
    indexUpdate;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [
        { "title": "relme", "price": "5000", "taxes": "200", "ads": "100", "discount": "200", "total": "5100", "count": "", "category": "net" },
        { "title": "sumsang", "price": "7000", "taxes": "300", "ads": "150", "discount": "350", "total": "7100", "count": "", "category": "phone" },
        { "title": "nokia", "price": "2500", "taxes": "125", "ads": "135", "discount": "400", "total": "2360", "count": "", "category": "ajax" },
        { "title": "oppp", "price": "6000", "taxes": "75", "ads": "25", "discount": "65", "total": "6035", "count": "", "category": "phone" }];
}
submit.onclick = function () {
    // check if input is not empty
    if (title.value && price.value
        && taxes.value && ads.value
        && discount.value && category.value != ''
        && count.value < 101) {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        }
        // check if button submit is create or update
        if (submit.innerHTML === 'Create') {
            // make more item based on count number
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[indexUpdate] = newPro;
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }


        console.log(dataPro)
        // save localStorage
        localStorage.setItem("product", JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        throw Error('you must fill all input')
    }
    getTotal();


}
// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read
function showData() {

    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        console.log(dataPro[i])
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick= 'updateData(${i})' id="update">update</button></td>
            <td><button onclick= 'deleteData(${i})' id="delete">delete</button></td>
        </tr>
    `
    }
    document.getElementById("tbody").innerHTML = table;

    //render delete all button if there is data
    let btnDeleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {

        btnDeleteAll.innerHTML = `<button onclick= 'deleteAll()'>Delete All (${dataPro.length})</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }


}
showData();

// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteAll() {
    dataPro.splice(0); /* dataPro.length = 0;*/
    localStorage.clear(); /* dataPro.length = 0;*/
    showData();
}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal() /*total.innerHTML = dataPro[i].total;*/
    count.style.display = 'none'
    submit.innerHTML = 'Update';
    indexUpdate = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//search
let searchMood = 'title';
function moodSearch(id) {
    if (id === 'searchByTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
        searchByTitle.style.background = '#51025f';
        searchByCategory.style.background = '#390053';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
        searchByCategory.style.background = '#51025f';
        searchByTitle.style.background = '#390053';
    }
    search.focus();
    search.value = '';
    showData();
}
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title') {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                            <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= 'updateData(${i})' id="update">update</button></td>
                            <td><button onclick= 'deleteData(${i})' id="delete">delete</button></td>
                            </tr>
                        `
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                            <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= 'updateData(${i})' id="update">update</button></td>
                            <td><button onclick= 'deleteData(${i})' id="delete">delete</button></td>
                            </tr>
                        `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
//clean data [control input data from user]


var inputName = document.getElementById('name')
var inputPrice = document.getElementById('price')
var inputCategory = document.getElementById('category')
var inputdesc = document.getElementById('desc')
var desplayTable = document.getElementById('data')
var searchInput = document.getElementById('search')

getDatafrom = JSON.parse(localStorage.getItem('proudcts'))
var allProudcts = []
allProudcts = getDatafrom
console.log(allProudcts);
var updateIndex
function addProudct() {
    var newProudct = {
        name: inputName.value,
        price: inputPrice.value,
        category: inputCategory.value,
        desc: inputdesc.value,
    }
    allProudcts.push(newProudct)
    localStorage.setItem('proudcts', JSON.stringify(allProudcts))
    console.log(allProudcts);
    displayProudcts(allProudcts)
    clear()
}

function clear() {
    inputName.value = ''
    inputPrice.value = ''
    inputCategory.value = ''
    inputdesc.value = ''
}
function displayProudcts(arr) {
    var prod = ``
    for (var i = 0; i < arr.length; i++) {
        prod += `<tr class='my-2'><td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="updateTable(${i})" class="btn btn-warning ">update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger ">delete</button></td></tr>
        `
    }
    document.getElementById('data').innerHTML = prod
}
displayProudcts(allProudcts)

function deleteProduct(ind) {
    allProudcts.splice(ind, 1)
    localStorage.setItem('proudcts', JSON.stringify(allProudcts))
    displayProudcts(allProudcts)
}

function getSearch(char) {
    if (allProudcts.length > 0) {
        var newProd = []
        for (var i = 0; i < allProudcts.length; i++) {
            if (allProudcts[i].name.toLowerCase().includes(char.toLowerCase())) {
                newProd.push(allProudcts[i])
            }
        }
        // console.log(newProd);
        displayProudcts(newProd)
    }
}

function updateTable(ind) {
    if (document.getElementById('add').className.includes('d-block')) {
        document.getElementById('add').classList.replace('d-block', 'd-none')
        document.getElementById('update').classList.replace('d-none', 'd-block')
        inputName.value = allProudcts[ind].name
        inputPrice.value = allProudcts[ind].price
        inputCategory.value = allProudcts[ind].category
        inputdesc.value = allProudcts[ind].desc
        updateIndex = ind
    }
    else {
        document.getElementById('update').classList.replace('d-block', 'd-none')
        document.getElementById('add').classList.replace('d-none', 'd-block')
        clear()
    }

}

function updateProduct() {
    var updatedProduct = {
        name: inputName.value,
        price: inputPrice.value,
        category: inputCategory.value,
        desc: inputdesc.value
    }
    allProudcts.splice(updateIndex, 1, updatedProduct)
    console.log(updateIndex);
    displayProudcts(allProudcts)
    localStorage.setItem('proudcts', JSON.stringify(allProudcts))
}

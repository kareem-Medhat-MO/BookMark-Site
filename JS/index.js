let allBookMarks = [];
let siteNameInput = document.getElementById("bookmarkName");
let siteUrlInput = document.getElementById("bookmarkURL");
let submitBtn = document.getElementById("submitBtn");
let dataWrapper = document.getElementById("tableContent");
let searchInput = document.getElementById('search');
let bookMarkUpdate;
if (localStorage.allBookMarks != null) {
    allBookMarks = JSON.parse(localStorage.allBookMarks)
    displayData(allBookMarks);
}

siteNameInput.addEventListener('input', function () {
    if (siteNameInput.value != "") {
        siteNameValid()
    } else {
        siteNameInValid()
    }
})
siteUrlInput.addEventListener('input', function () {
    if (validateUrl() != true) {
        siteUrlInValid()
    } else {
        siteUrlValid()
    }
})

submitBtn.addEventListener('click', function addBookmark() {
    if (validateUrl() == true && siteNameInput.value != "") {
        var newBookMark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }
        allBookMarks.push(newBookMark);
        localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks));
        displayData(allBookMarks);
        clearInputs();
    }
    else {
        Swal.fire({
            title: "Invalid Data",
            text: `${siteNameInput.value == "" && validateUrl() != true ? "Please Enter Site Name And Valid URL" : ""} ${siteNameInput.value == "" && validateUrl() == true ? "Please Enter Site Name" : ""} ${validateUrl() != true && siteNameInput.value != "" ? "Please Enter Valid URL" : ""}`,
            icon: "error"
        });
    }

})



function displayData(arr) {
    var cartoona = "";
    for (var i = 0; i < arr.length; i++) {
        cartoona += `
                    <tr data-aos="fade-right"  data-aos-offset="0" data-aos-easing="ease-in-sine"  data-aos-delay="${i * 50}">
                    <td>${i + 1}</td>
                    <td>${arr[i].siteName}</td>
                    <td><a href="${arr[i].siteUrl}" class="btn btn-info f-button" target="_blank"><i class="fa-solid fa-eye text-dark f-button"></i> visit</a></td>
                    <td><button href="" class="btn btn-warning f-button" onclick="updateData(${i})"><i class="fa-solid fa-wrench  f-button"></i> Update</button></td>
                    <td><button href="" class="btn btn-danger f-button"onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can f-button"></i> Delete</button></td>
                    </tr>
                    `;
    }
    dataWrapper.innerHTML = cartoona;
}

function updateData(index) {
    bookMarkUpdate = index;
    siteNameInput.value = allBookMarks[index].siteName;
    siteUrlInput.value = allBookMarks[index].siteUrl;
    displayUpdateBtn();
}

function displayUpdateBtn() {
    document.getElementById('submitBtn').classList.replace('d-block', 'd-none');
    document.getElementById('updateBtn').classList.replace('d-none', 'd-block');
}
function displaySubmitBtn() {
    document.getElementById('updateBtn').classList.replace('d-block', 'd-none');
    document.getElementById('submitBtn').classList.replace('d-none', 'd-block');
}

function finalUpdate() {
    let newBookMark = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    }
    allBookMarks.splice(bookMarkUpdate, 1, newBookMark);
    localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks));
    displayData(allBookMarks);
    displaySubmitBtn();
    clearInputs();
}

function deleteBookMark(index) {
    allBookMarks.splice(index, 1);
    localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks));
    displayData(allBookMarks);
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

searchInput.addEventListener('input', function (event) {
    var searchResult = [];
    for (var i = 0; i < allBookMarks.length; i++) {
        if (allBookMarks[i].siteName.toLowerCase().includes(event.target.value.toLowerCase())) {
            searchResult.push(allBookMarks[i]);
        }
    }
    displayData(searchResult);
});

function validateUrl() {
    var pattern = /[-a-zA-Z0-9@: %._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@: %_\+. #?&//=]*)/gi;
    return pattern.test(siteUrlInput.value);
}


function siteNameValid() {
    siteNameInput.classList.replace('is-invalid', 'is-valid');
}
function siteNameInValid() {
    siteNameInput.classList.add('is-invalid');
}


function siteUrlValid() {
    siteUrlInput.classList.replace('is-invalid', 'is-valid');
}
function siteUrlInValid() {
    siteUrlInput.classList.add('is-invalid');
}

//end
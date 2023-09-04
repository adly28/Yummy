let box = document.getElementById("box");
let search = document.getElementById("search");


$(document).ready(() => {
    firstpage("").then(() => {
        $(".loading").fadeOut(500)

    })
})

function openSideNav() {
    $(".nav-menu").animate({left: 0}, 500)


    $(".icon").removeClass("fa-align-justify");
    $(".icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({  top: 0})
    }
}

function  closeSideNav() {
    let Width = $(".nav-menu .nav-tab").outerWidth()
    $(".nav-menu").animate({left: -Width}, 300)

    $(".icon").addClass("fa-align-justify");
    $(".icon").removeClass("fa-x");


    $(".links li").animate({top: 300}, 200)
}

closeSideNav()
$(".nav-menu i.icon").click(() => {
    if ($(".nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
async function firstpage(mealname) {
    
    box.innerHTML = ""
    let finalapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`)
    finalapi = await finalapi.json()

    if(finalapi.meals ){
        displayMeals(finalapi.meals)
    }else{
        displayMeals([])
    }
    $(".inner-loading").fadeOut(300)

}



function displayMeals(arr) {
    let all = "";

    for (let i = 0; i < arr.length; i++) {
        all += `
        <div class="col-md-3">
                <div onclick="getapi('${arr[i].idMeal}')" class="meal">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer ">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    box.innerHTML = all
}





async function getapi(mealID) {
    closeSideNav()
    box.innerHTML = ""
   

    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayDetails(respone.meals[0])
    $(".inner-loading").fadeOut(300)

}

function displayDetails(meal) {
    
    
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-danger m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

   


    let all = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

               
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    box.innerHTML = all
}






async function getapiCategories() {
    box.innerHTML = ""
    let finalapi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    finalapi = await finalapi.json()
    displayCategories(finalapi.categories)
    $(".inner-loading").fadeOut(300)

}

function displayCategories(array) {
    let all = "";

    for (let i = 0; i < array.length; i++) {
        all += `
        <div class="col-md-3">
                <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    box.innerHTML = all
}


async function getArea() {
    box.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    

}


function displayArea(array) {
    let all = "";

    for (let i = 0; i < array.length; i++) {
        all += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                </div>
        </div>
        `
    }

    box.innerHTML = all
}


async function getIngredients() {
    box.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 10))
    

}


function displayIngredients(array) {
    let all = "";

    for (let i = 0; i < array.length; i++) {
        all += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription}</p>
                </div>
        </div>
        `
    }

    box.innerHTML = all
}













function searchh() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control  " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)"  class="form-control " type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    box.innerHTML = ""
}

async function searchByName(mealname) {
    
    box.innerHTML = ""
    let finalapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`)
    finalapi = await finalapi.json()

    if(finalapi.meals ){
        displayMeals(finalapi.meals)
    }else{
        displayMeals([])
    }
    $(".inner-loading").fadeOut(300)

}

async function searchByFirstLetter(mealfirstletter) {
    box.innerHTML = ""
    let finalapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealfirstletter}`)
    finalapi = await finalapi.json()
    if(finalapi.meals){
        displayMeals(finalapi.meals)
    }else{
        displayMeals([])
    }

}


function Contactus() {
    box.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="namee" onkeyup="check()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="check()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="check()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age"  type="number" class="form-control " placeholder="Enter Your Age">
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="check()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one upper  letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup="check()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter password again 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
document.getElementById("namee")
document.getElementById("email")
document.getElementById("phone")
document.getElementById("password")
document.getElementById("repassword")
document.getElementById("submitBtn")
document.getElementById("age")

namee.addEventListener("focus", () => {
    nameeclicked = true
})

phone.addEventListener("focus", () => {
    phoneclicked = true
})
password.addEventListener("focus", () => {
    passwordclicked = true
})
repassword.addEventListener("focus", () => {
    repasswordclicked = true
})
email.addEventListener("focus", () => {
    emailclicked = true
})

}




let nameeclicked = false;
let emailclicked = false;
let phoneclicked = false;
let passwordclicked = false;
let repasswordclicked = false;


function validemaill(){
    var regex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email.value)
}


function validname(){
    var regex= /\b[a-zA-Z]{3,10}\b$/
    return regex.test(namee.value)
}



function validpass(){
    var regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return regex.test(password.value)
}


function validRepass(){
    return repassword.value == password.value
    
}



function validphone(){
    var regex= /^(010|011|012|015)\d{8}$/;
    return regex.test(phone.value)
}



function check(){
    console.log("helo")
    if (nameeclicked) {
        if (validname()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailclicked) {

        if (validemaill()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneclicked) {
        if (validphone()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    

    if (passwordclicked) {
        if (validpass()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordclicked) {
        if (validRepass()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }



    if(validemaill()  && validpass() && validRepass() && validphone() )
    {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } 
}







    
const currentMenuStored = JSON.parse(localStorage.getItem("currentMenu"))

console.log(currentMenuStored)

const singlePageTitle = document.querySelector(".singlePageTitle")

const foodDesc = document.querySelector(".foodDesc")

singlePageTitle.innerHTML = currentMenuStored[0].recipes[0].title
foodDesc.innerHTML = currentMenuStored[0].recipes[0].summary

$(".close").click(function(){
    window.close()
})
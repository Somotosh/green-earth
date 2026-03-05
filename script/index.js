const categoriesContainer =document.getElementById('categories-container');
const treesContainer =document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner")


async function loeadCategories(){
  const res = await fetch("https://openapi.programming-hero.com/api/categories")
  const data =await res.json()
  data.categories.forEach(category => {
  const btn = document.createElement("button")
   btn.className="btn btn-outline border-none justify-start w-full";
   btn.textContent =category.category_name;
  categoriesContainer.append(btn)
  });

}
async function lodeTrees() {
  loadingSpinner.classList.remove("hidden")
  const res = await fetch("https://openapi.programming-hero.com/api/plants")
  const data =await res.json()
  displayTrees(data.plants)
}
function displayTrees(plants){
  plants.forEach(trees=>{
    console.log(trees)
    const card = document.createElement("div")
    card.className="card bg-white shadow-sm p-2"
    card.innerHTML=` <figure>
                          <img src="${trees.image}"
                          alt="${trees.name}"
                          class="h-48 w-full object-cover"
                           />
                     </figure>
                     <div class="card-body p-1 ">
                         <h2 class="card-title">${trees.name}</h2>
                         <p class="line-clamp-2 overflow-hidden">${trees.description}</p>
                     <div class="flex gap-4">
                         <p class="badge badge-success text-nowrap">${trees.category}</p>
                         <h2 class="font-bold text-xl">$${trees.price}</h2>
                     </div>
                        <button class="btn bg-green rounded-full text-white ">Add to Cart</button>
                      </div>`
    treesContainer.appendChild(card)
     loadingSpinner.classList.add("hidden")
  })

}
loeadCategories()
lodeTrees()
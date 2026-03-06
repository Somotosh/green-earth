const categoriesContainer = document.getElementById('categories-container');
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner")
const allTreesBtn = document.getElementById("allTreesBtn");
const treeDetailsModal = document.getElementById("tree-details-modal");
const modalIMg = document.getElementById("modalImg");
const modalCategory = document.getElementById("modelCategory");
const modalDescription = document.getElementById("modelDescription");
const modalPrice = document.getElementById("modalPrice");
const modalTaitle = document.getElementById("modalTaitle");
const cardContainer = document.getElementById("cardContainer");
const totalPrice = document.getElementById("totalPrice");
const emptyCardMessege =document.getElementById("emptyCardMessege");
let card = []

async function loeadCategories() {
  const res = await fetch("https://openapi.programming-hero.com/api/categories")
  const data = await res.json()
  data.categories.forEach(category => {
    const btn = document.createElement("button")
    btn.className = "btn btn-outline border-none justify-start w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategoty(category.id, btn)
    categoriesContainer.append(btn)
  });

}
async function selectCategoty(categoryId, btn) {
  loadingSpinner.classList.remove("hidden")
  const allBtns = document.querySelectorAll("#categories-container button,#allTreesBtn");
  allBtns.forEach(btn => {
    btn.classList.remove("bg-green", "text-white");

  })
  btn.classList.add("bg-green", "text-white")
  const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
  const data = await res.json()
  displayTrees(data.plants)
  loadingSpinner.classList.add("hidden")
}

allTreesBtn.addEventListener("click", () => {
  const allBtns = document.querySelectorAll("#categories-container button,#allTreesBtn");
  allBtns.forEach(btn => {
    btn.classList.remove("bg-green", "text-white");

  })
  allTreesBtn.classList.add("bg-green", "text-white")
  lodeTrees()
})

async function lodeTrees() {
  loadingSpinner.classList.remove("hidden")
  const res = await fetch("https://openapi.programming-hero.com/api/plants")
  const data = await res.json()
  displayTrees(data.plants)
}
function displayTrees(trees) {
  treesContainer.innerHTML = "";
  trees.forEach(tree => {
    const card = document.createElement("div")
    card.className = "card h-90 w-full bg-white shadow-sm p-2"
    card.innerHTML = ` <figure>
                          <img src="${tree.image}"
                          alt="${tree.name}"
                          onclick="openTreeModal(${tree.id})"
                          class="h-48 w-full object-cover cursor-pointer"
                           />
                     </figure>
                     <div class="card-body p-1 ">
                         <h2 class="card-title cursor-pointer hover:text-[#4ade80] "onclick="openTreeModal(${tree.id})" >${tree.name}</h2>
                         <p class="line-clamp-2 overflow-hidden">${tree.description}</p>
                     <div class="flex gap-4">
                         <p class="badge badge-success text-nowrap">${tree.category}</p>
                         <h2 class="font-bold text-xl">$${tree.price}</h2>
                     </div>
                        <button onclick="addToCard(${tree.id},'${tree.name}',${tree.price})" class="btn bg-green rounded-full text-white  ">Add to Cart</button>
                      </div>`
    treesContainer.appendChild(card)
    loadingSpinner.classList.add("hidden")
  })

}

async function openTreeModal(treeId) {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
  const data = await res.json()
  const planDetails = data.plants
  modalTaitle.textContent = planDetails.name;
  modalIMg.src = planDetails.image;
  modalCategory.textContent = planDetails.category;
  modalDescription.textContent = planDetails.description;
  modalPrice.textContent = planDetails.price;
  treeDetailsModal.showModal()

}

function addToCard(id, name, price) {
  const existingItem = card.find(item => item.id === id)
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    card.push({
      id,
      name,
      price,
      quantity: 1
    })
  }

  updateCard()
}

function updateCard() {
  cardContainer.innerHTML = "";
  if(card.length===0){
    emptyCardMessege.classList.remove("hidden")
    return
  }
  emptyCardMessege.classList.add("hidden")
  
  let total = 0;
  card.forEach(item => {
    total += item.price * item.quantity
    const cardItem = document.createElement("div")
    cardItem.innerHTML = `<div class="card  bg-[#F0FDF4] p-2">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="text-xl font-medium">${item.name}</p>
                                    <p>$${item.price} x ${item.quantity}</p>
                                </div>
                                <button onclick="removeCard(${item.id})" class="btn btn-outline btn-ghost btn-circle border-none">X</button>
                            </div>
                            <p class="font-semibold text-right">$${item.price * item.quantity}</p>

                        </div>`
    cardContainer.appendChild(cardItem)
  })
  totalPrice.innerText = total;
}
function removeCard(treeId) {
  const updateCardElements = card.filter(item => item.id != treeId)
  card = updateCardElements
  updateCard()
}

loeadCategories()
lodeTrees()
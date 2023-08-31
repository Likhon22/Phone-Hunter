const loadPhone = async (searchPhone = "a", isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
  );
  const data = await response.json();
  const phone = data.data;
  displayPhone(phone, isShowAll);
};
const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear previous data after adding new data
  phoneContainer.textContent = "";
  const showAllBtn = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");

    phoneCard.classList = "card p-4 bg-gray-100 shadow-xl";
    phoneCard.innerHTML = `
    
          <figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt="${phone.phone_name}"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              
              <p class="w-[291px] text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
              <h2 class="card-title">$999</h2>
              <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')"
                  class="btn btn-primary text-white bg-[#0D6EFD] border-none"
                >
                 Show Details
                </button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  spinnerHandle(false);
};

// handle serach
const handleSearch = (isShowAll) => {
  spinnerHandle(true);
  const searchField = document.getElementById("search-field");
  const searchFieldValue = searchField.value;
  console.log(searchFieldValue);
  loadPhone(searchFieldValue, isShowAll);
};
// spinner
const spinnerHandle = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
const handleShowAll = () => {
  handleSearch(true);
};
const handleShowDetails = async (slug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();

  displayShowDetails(data.data);
};
const displayShowDetails = (phone) => {
  console.log(phone);
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
        <img class='mx-auto' src="${phone.image}" alt="">
              <h2 class='my-6 text-4xl font-bold'>${phone.name}</h2>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          
            <h3 class='mt-5'><span class="font-bold text-lg ">Storage : </span>${phone.mainFeatures["storage"]}</h3>
            <h3><span class="font-bold text-lg ">Display Size : </span>${phone.mainFeatures["displaySize"]}</h3>
            <h3><span class="font-bold text-lg ">Chip Set : </span>${phone.mainFeatures["chipSet"]}</h3>
            <h3><span class="font-bold text-lg ">Memory : </span>${phone.mainFeatures["memory"]}</h3>
            <h3><span class="font-bold text-lg ">Brand : </span>${phone.brand}</h3>
            <h3><span class="font-bold text-lg ">Relase Date : </span>${phone.releaseDate}</h3>
            <h3><span class="font-bold text-lg ">Slug : </span>${phone.slug}</h3>
            <h3><span class="font-bold text-lg ">GPS : </span>${phone.others.GPS}</h3>
      
          
    
    
    `;
  show_details_modal.showModal();
};

loadPhone();

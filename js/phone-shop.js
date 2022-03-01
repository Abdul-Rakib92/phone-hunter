const searchPhone = () => {
    // document.getElementById("phone-container").innerHTML = "";
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear data
    searchField.value = '';

    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then (data => displaySearchResult(data.data.slice(0,20)));
}


const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // if(searchResult == 0 || searchResult == ''){
    //     document.getElementById('error-message').style.display = 'block';
    // }
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-secondary border-3">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto p-2" alt="...">
            <div class="card-body mx-auto">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text fw-bold">${phone.brand}</p>
            </div>
            <button onclick="phoneDetail('${phone.slug}')" class="btn btn-success w-50 mx-auto my-2">Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const phoneDetail = phoneId => {
    // console.log(phoneId);

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.textContent = '';
    
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `

        <img src="${phone.image}" class="card-img-top w-50 mx-auto p-2" alt="...">    
        <div class="card-body">
            
            <h4 class="card-title">${phone.name}</h4>
            if(${phone.releaseDate} == null){
                    'No Released date found'
            }
            else{
                <h5 class="card-title">${phone.releaseDate}</h5>
            }

                
            <p class="card-text">${phone.mainFeatures.chipSet}</p>
            <p class="card-text">${phone.mainFeatures.displaySize}</p>
            <p class="card-text">${phone.mainFeatures.memory}</p>
            <p class="card-text">${phone.mainFeatures.sensors[0]}</p>
            <p class="card-text">${phone.mainFeatures.sensors[1]}</p>
            <p class="card-text">${phone.mainFeatures.sensors[2]}</p>
            <p class="card-text">${phone.mainFeatures.sensors[3]}</p>
            <p class="card-text">${phone.mainFeatures.sensors[4]}</p>
            <p class="card-text">${phone.mainFeatures.sensors[5]}</p>
            <p class="card-text">${phone.mainFeatures.storage}</p>
        </div>
    `;
    phoneDetails.appendChild(div);
}
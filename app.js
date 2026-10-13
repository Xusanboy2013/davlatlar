// Malumotlarni Apidan olib kelish
// Api asosida templatega uzatish
// Filtratsiya qismi qilamiz
// Search qismini qilamiz
// tungi rejim

let countries = document.querySelector('.countries');

async function getCountry() {
  try {
    // REST Countries o'rniga barqaror va tezkor CDN JSON
    const response = await fetch('https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json');
    const data = await response.json();

    data.forEach((element) => {
      showCountry(element);
    });
  } catch (error) {
    console.error('API dan maʼlumot olishda xatolik:', error);
  }
}

getCountry();

function showCountry(data) {
  let country = document.createElement('div');
  country.classList.add('country');

  // CDN ma'lumotlar strukturasiga moslangan xavfsiz o'qish
  const flagImg = data.flags?.png || `https://flagcdn.com/w320/${data.cca2.toLowerCase()}.png`;
  const countryCommonName = data.name?.common || 'N/A';
  const capitalName = data.capital?.[0] || 'N/A';
  const populationCount = data.population ? data.population.toLocaleString() : '0';
  const bordersList = data.borders?.length ? data.borders.join(', ') : 'No Borders';

  country.innerHTML = `
    <div class="country-img">
        <img src="${flagImg}" alt="${countryCommonName}" loading="lazy">
    </div>
    <div class="country-info">
        <h5 class="countryName">${countryCommonName}</h5>
        <p class="regionName"><strong>Region: </strong>${data.region || 'N/A'}</p>
        <p><strong>Population: </strong>${populationCount}</p>
        <p><strong>Capital: </strong>${capitalName}</p>
        <p><strong>Borders: </strong>${bordersList}</p>
    </div>`;
  countries.append(country);
}

// === Region filter ===
let dropDown = document.querySelector('.dropDown');
let drop = document.querySelector('.drop');
let region = document.querySelectorAll('.region');
let regionName = document.getElementsByClassName('regionName');

region.forEach((element) => {
  element.addEventListener('click', () => {
    drop.classList.remove('showDropDown');
    const selectedRegion = element.innerText.trim();

    Array.from(regionName).forEach((item) => {
      if (item.innerText.includes(selectedRegion) || selectedRegion === 'All') {
        item.closest('.country').style.display = "grid";
      } else {
        item.closest('.country').style.display = "none";
      }
    });
  });
});

dropDown.addEventListener('click', () => {
  drop.classList.toggle('showDropDown');
});

// === Search filter ===
let search = document.querySelector('.search');
let countryName = document.getElementsByClassName('countryName');

search.addEventListener('input', (e) => {
  let element = e.target.value.toLowerCase().trim();
  Array.from(countryName).forEach((item) => {
    let data = item.innerText.toLowerCase();
    if (data.includes(element)) {
      item.closest('.country').style.display = "grid";
    } else {
      item.closest('.country').style.display = "none";
    }
  });
});

// === Dark mode ===
let toggle = document.querySelector('.toggle');
let moon = document.querySelector('.moon');

toggle.addEventListener('click', () => {
  moon.classList.toggle('fas');
  document.body.classList.toggle('dark');
});

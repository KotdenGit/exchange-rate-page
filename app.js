const warningInfo = document.getElementById("info");
const listRate = document.getElementById("list");
async function getCurrantExchangeRate () {
    try {
        const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
        const res = await fetch(url);
        const data = await res.json();
        createList(data);
    } catch (error) {
        warningInfo.innerHTML = 'Something went wrong, ${error}';
    }
};

async function createList (rates) {
    const fragment = document.createDocumentFragment();
    const exchangeRate = await rates;
    console.log(exchangeRate);
    for (let rate of exchangeRate) {
        let exchangeRateItem = document.createElement("ul");
        exchangeRateItem.classList.add("rate-item");

        let itemName = document.createElement("div");
        itemName.innerHTML = rate.Cur_Name;
        exchangeRateItem.appendChild(itemName);

        let itemScale = document.createElement("div");
        itemScale.innerHTML = rate.Cur_Scale;
        exchangeRateItem.appendChild(itemScale);

        let itemAbbreviation = document.createElement("div");
        itemAbbreviation.innerHTML = rate.Cur_Abbreviation;
        exchangeRateItem.appendChild(itemAbbreviation);

        let itemOfficialRate = document.createElement("div");
        itemOfficialRate.innerHTML = rate.Cur_OfficialRate;
        exchangeRateItem.appendChild(itemOfficialRate);

        fragment.appendChild(exchangeRateItem);
    }
    listRate.appendChild(fragment);
}

window.addEventListener("DOMContentLoaded", function () {
    getCurrantExchangeRate();
});
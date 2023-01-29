// 1832f20d470426bda083860ccbba4e90a76c51960e8a450d1fc0febc3e0fd6a3 

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR

// https://min-api.cryptocompare.com/data/blockchain/list (Coins List)
const Query = document.querySelector('.Query');
var crypto_items = document.querySelector('.List_items');
const Currency = document.querySelector('.Currency');
const price = document.querySelector('.Price');
const Volume = document.querySelector('.volume')
const btn = document.querySelector('.Search');
const News = document.querySelector('.News');
const NewsImg = document.getElementById('NewsImg');
const News_link = document.getElementById('News_link');
const NewsCont = document.getElementById('NewsCont');
var BtnLeft = document.querySelector('.BtnLeft');
var BtnRight = document.querySelector('.BtnRight');
price.style.display = "none"

var Crypto_Name = 0;
const style = {
    " background-color": "=white"

}

var curr = '';
const Api_key = '1832f20d470426bda083860ccbba4e90a76c51960e8a450d1fc0febc3e0fd6a3';
// Search button for fulfilling Query
btn.addEventListener('click', () => {
    var val = Query.value;
    var curr_val = Currency.value;
    Crypto_Name = val;
    curr = curr_val;
    console.log(Crypto_Name);
    // console.log(Crypto_curr);
    console.log(curr);
    Query.value = '';
    Currency.value = '';
    if (Crypto_Name && curr != '') {
        CryptoFetch();
    } else {
        alert("FIll The Fields")
    }
});

// To the moon coins function
const CoinsList = () => {
    const Coins_list = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${Api_key}`;

    fetch(Coins_list)
        .then(data => data.json())
        .then((json) => {
            console.log("Success");
            console.log(json);
            for (var i = 0; i < json.Data.length; i++) {
                var coins = `
            <div className="container " style="color=white">
            
 <i class="fa-brands fa-bitcoin"></i>    - ${json.Data[i].CoinInfo.Name} 
            </div>
`
                crypto_items.classList = 'UpCoins';
                crypto_items.innerHTML += coins;
            }
        })
        .catch((err) => {
            console.log("Error Occured");
            console.log(err)
        })
}
// Will fire when page will load
CoinsList();

// Function for fetching the coin and its price in typed currency
const CryptoFetch = async () => {
    price.style.display = "block"
    const Api_url  = `https://min-api.cryptocompare.com/data/price?fsym=${Crypto_Name}&tsyms=${curr}`
    if (curr == 'USD' || curr == 'usd') {
       await fetch (Api_url)
            .then(data => data.json())
            .then((json) => {
                price.innerHTML = `${Crypto_Name} - ${json.USD} USD`
            })
            .catch((err) => {
                price.innerHTML = "Error Occured";
                console.log(err);
            })

    }
    if (curr == 'INR' || curr == 'inr') {
      await  fetch(Api_url)
            .then(data => data.json())
            .then((json) => {
                price.innerHTML = `${Crypto_Name} - ${json.INR} INR`
            })
            .catch((err) => {
                price.innerHTML = "Error Occured";
                console.log(err);
            })

    }
    if (curr == 'EUR' || curr == 'eur') {
      await  fetch(Api_url)
            .then(data => data.json())
            .then((json) => {
                price.innerHTML = `${Crypto_Name} - ${json.EUR} EUR`
            })
            .catch((err) => {
                price.innerHTML = "Error Occured";
                console.log(err);
            })

    }

}

// News Fetch Function
const FetchNews = () => {
    const News_api = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`;

    fetch(News_api)
        .then(data =>
            data.json()
        ).then((json) => {
            var i = 0;
            var title = json.Data[i].title;
            var imgUrl = json.Data[i].imageurl;
            var ReadUrl = json.Data[i].url;
            NewsImg.setAttribute('src', imgUrl);
            NewsCont.innerHTML = title;
            News_link.setAttribute('href', ReadUrl)

            BtnLeft.addEventListener("click", () => {
                if (i != 0) {
                    i--;
                    var title = json.Data[i].title;
                    var imgUrl = json.Data[i].imageurl;
                    var ReadUrl = json.Data[i].url;
                    NewsImg.setAttribute('src', imgUrl);
                    NewsCont.innerHTML = title;
                    News_link.setAttribute('href', ReadUrl)
                    console.log("Clicked");
                } else {
                    alert("This is the first one")
                }
            })
            BtnRight.addEventListener('click', () => {
                i += 1;
                var title = json.Data[i].title;
                var imgUrl = json.Data[i].imageurl;
                var ReadUrl = json.Data[i].url;
                NewsImg.setAttribute('src', imgUrl);
                NewsCont.innerHTML = title;
                News_link.setAttribute('href', ReadUrl)
                console.log("Clicked");
            })



        })
        .catch((err) => {
            console.log(err);
        })
}

FetchNews()







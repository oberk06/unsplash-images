const container = document.querySelector(".container");
const form = document.querySelector("form");
const resimler = document.getElementById("bilgikutu");
const search = document.getElementById("search");
const body = document.querySelector("body");
let veriler = [];

fetch(
  "https://api.unsplash.com/photos/?client_id=hGyLlrDvRbPeV_Wwfw94YVdTk5vOpXD7-vNAHgdnJvo"
)
  .then((response) => response.json())
  .then((data) => {
    veriler = data;
    herbiri(veriler);
  })
  .catch((error) => {
    console.log(error);
    const hatabilgi = document.createElement("div");
    const hataresim = document.createElement("img");
    hatabilgi.textContent = "UPPS ! Birşeyler Ters Gitti";
    hataresim.src = "404.jpg";
    hataresim.classList = "hataresim";
    hatabilgi.classList = "hatabilgi";
    resimler.appendChild(hataresim);
    resimler.appendChild(hatabilgi);
  });

function herbiri(veriler) {
  veriler.forEach((item) => {
    const { urls, alt_description, user } = item;
    const resimdiv = document.createElement("div");
    resimdiv.classList = "tekresim";
    resimdiv.innerHTML = ` 
         <p> ${user.name} </p>
         <img src="${urls.small}">  </img>
         <p class="lorem">  ${alt_description} </p>
         `;
    resimler.appendChild(resimdiv);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const kullanicigiris = search.value.trim().toLowerCase();
  const filtre = veriler.filter((item) => {
    const userName = item.user.name ? item.user.name.toLowerCase() : "";
    const altDescription = item.alt_description
      ? item.alt_description.toLowerCase()
      : "";
    return (
      userName.includes(kullanicigiris) ||
      altDescription.includes(kullanicigiris)
    );
  });

  resimler.innerHTML = "";
  herbiri(filtre);
  search.value = "";
});

const API_KEY="16544a9dabb84e9f842ad9640e9eac36";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));

function reload(){
  window.location.reload();
}
async function fetchNews(quary){
  const res=await fetch(`${url}${quary}&apiKey=${API_KEY}`)
  const data= await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles){
  const cardscontainer=document.querySelector('#cards-container');

  const newCardTemp=document.getElementById('template-new-card')

  cardscontainer.innerHTML='';
  articles.forEach((article) => {
    if(!article.urlToImage) return ;
    const cardClone=newCardTemp.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardscontainer.appendChild(cardClone);
    
  });
};

function fillDataInCard(cardClone,article)
{
  const newImg=cardClone.querySelector("#new-image");
  const newstitle =cardClone.querySelector("#news-title");
  const newssourse=cardClone.querySelector("#news-sourse");
  const newsdesc=cardClone.querySelector("#news-desc");
  newImg.src=article.urlToImage;
  newstitle.innerHTML=article.title;
  
  newsdesc.innerHTML=article.description;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });
  newssourse.innerHTML=(`${article.source.name} : ${date}`);
cardClone.firstElementChild.addEventListener('click',function(){
  window.open(article.url,"_blank")
})
  

}
let currSelectedNav=null;
 function onNavItemClick(id){
  fetchNews(id);
  const navItme=document.getElementById(id)
  currSelectedNav?.classList.remove('active');
  currSelectedNav=navItme;
  currSelectedNav.classList.add('active');

 }

 const serachbutton=document.querySelector('#serach-button');
 const newinput=document.querySelector('#new-input');

 serachbutton.addEventListener('click',function(){
  const quary=newinput.value;
  if(!quary) return;
  fetchNews(quary);
  currSelectedNav?.classList.remove('active')
  currSelectedNav=null;
 })


  // nav hidden******************


let item=document.querySelector("#menu-icon");
let navlist=document.querySelector(".ul-nav");

item.onclick = ()=>
{
  item.classList.toggle("bx-x");
  navlist.classList.toggle("open");

}

window.onscroll = ()=>
{
  item.classList.toggle("bx-x");
  navlist.classList.remove("open");

}
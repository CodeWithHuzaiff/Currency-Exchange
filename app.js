// alert("Welcome to Currency Exchange")

let Base_url="https://hexarate.paikama.co/api/rates/latest"
let dropdowns=document.querySelectorAll(".select-cont select")
let button=document.querySelector(".btn")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")

window.addEventListener("load",()=>{
    updateExchangeRate();
})

for (select of dropdowns){
    for(CurrCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=CurrCode;
        newOption.value=CurrCode;
        if(select.name==="from" && CurrCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && CurrCode==="INR"){
            newOption.selected="selected"
        };
        select.append(newOption);      
    };
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
};

const updateFlag=(ele)=>{
    let CurrCode=ele.value;
    let CountryCode=countryList[CurrCode];
    let newSrcLink=`https://flagsapi.com/${CountryCode}/flat/64.png`;
    let imgLink=ele.parentElement.querySelector("img");
    imgLink.src=newSrcLink;  
};



button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();


});

const updateExchangeRate = async  () => {
    let Amount=document.querySelector(".EntrAmt");
    let Amtval=Amount.value;
    if(Amtval==="" || Amtval<1){
        Amtval=1;
        Amount.value="1";
    }
    url=`${Base_url}/${fromCurr.value}?target=${toCurr.value}`
    let response=await fetch(url);
    let result = await response.json();
    let rate =result.data.mid;
    let finalAmount=Amtval*rate;
    msg.innerText=`${Amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


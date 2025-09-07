let balance=document.querySelector("#Balance");
let income=document.querySelector("#Income");
let expenses=document.querySelector("#Expenses");
let entry=document.querySelector("#Entrytype");
let name=document.querySelector("#name");
let amount=document.querySelector("#amount");
let btn=document.querySelector("#btn");
let body=document.querySelector("tbody");

let  Balance=0;
let Income=0;
let Expenses=0;
let serial=1;

btn.addEventListener("click",()=>{
    let Entry=entry.value;
    let Name=name.value.trim();
    let Amount=Number(amount.value);
    
    if(!Name ||!Amount){
        alert("please enter valid data");
        return;
    }
    let row=document.createElement("tr");
    row.classList.add("row");

    row.innerHTML=`<td>${serial++}</td>
    <td>${Name}</td>
    <td>${Amount}</td>
    <td>${Entry}</td>
    <td><button class="delBtn">❌</button></td>`;

    body.appendChild(row);

    if(Entry==="Income"){
        Income+=Amount;
    }
    else{
        Expenses+=Amount;

    }
    Balance=Income-Expenses;

    updateUI();
    name.value="";
    amount.value="";

    row.querySelector(".delBtn").addEventListener("click",()=>{
        if(Entry==="Income"){
            Income-=Amount;
        }
        else{
            Expenses-=Amount;
        }
        Balance=Income-Expenses;
        updateUI();
        row.remove();
    });
});

function updateUI(){
    income.textContent=Income;
    expenses.textContent=Expenses;
    balance.textContent=Balance;
}


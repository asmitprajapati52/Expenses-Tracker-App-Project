let balance=document.querySelector("#Balance");
let income=document.querySelector("#Income");
let expenses=document.querySelector("#Expenses");
let entry=document.querySelector("#Entrytype");
let name=document.querySelector("#name");
let amount=document.querySelector("#amount");
let btn=document.querySelector("#btn");
let body=document.querySelector("tbody");

window.addEventListener("load", loadNotes);

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
    saveNotes();
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

function saveNotes(){
    const data=[];
    document.querySelectorAll("tbody tr").forEach(tr=>{
        const tds=tr.querySelectorAll("td");
        data.push({
            name:tds[1].textContent,
            amount:Number(tds[2].textContent),
            entry:tds[3].textContent
        });
    });
    localStorage.setItem("trackerData", JSON.stringify(data));
}

function loadNotes(){
    const saved=JSON.parse(localStorage.getItem("trackerData"))|| [];
    saved.forEach((item)=>{
        let row=document.createElement("tr");
        row.classList.add("row");

        row.innerHTML=`
        <td>${serial++}</td>
        <td>${item.name}</td>
        <td>${item.amount}</td>
        <td>${item.entry} </td>
        <td><button class="delBtn">❌</button></td>
        `;
        body.appendChild(row);

        if(item.entry==="Income"){
            Income+=item.amount;
        } else {
            Expenses+=item.amount;
        }
        row.querySelector(".delBtn").addEventListener("click", () => {
    if (item.entry === "Income") {
      Income -= item.amount;
    } else {
      Expenses -= item.amount;
    }
    Balance = Income - Expenses;
    updateUI();
    row.remove();
    saveNotes();
  });
});
 Balance = Income - Expenses;
  updateUI();
}
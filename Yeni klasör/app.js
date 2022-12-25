var Filter={
    Elements:{

            form:document.querySelector("form"),
            nameInput:document.querySelector("#name"),
            ageInput:document.querySelector("#age"),
            jobInput:document.querySelector("#job"),
            kiloInput:document.querySelector("#kilo"),
            boyInput:document.querySelector("#boy"),
            tableDiv:document.querySelector("table"),
            inputs:document.querySelectorAll(".inputt"),
            duzeltBtn:document.querySelector("#düzelt"),
            

    },
    Status:{
        arr:[],
        person:{},
        index:0
    },
    Actions:{

        init:()=>{
            Filter.Actions.getvalue();
            Filter.Elements.duzeltBtn.disabled=true;
        },
        getvalue:()=>{
           
            var name=Filter.Elements.nameInput.value;
            var age=Filter.Elements.ageInput.value;
            var job=Filter.Elements.jobInput.value;
            var kilo=Filter.Elements.kiloInput.value;
            var boy=Filter.Elements.boyInput.value;
            Filter.Status.person={name,age,job,kilo,boy};
            Filter.Status.arr.push(Filter.Status.person);
            Filter.Elements.inputs.forEach(x=>{
                x.classList.remove("tomato")
                x.value="";
            })
            Filter.Actions.addToHTML()
            
        },

        delete:(e)=>{
          
            var del=e.target.parentElement.parentElement;
            del.remove()
        }
        ,
        yenile:()=>{
            
        },

        edit:(e)=>{
           
            var editt=e.target.parentElement.parentElement;
            var tds=editt.querySelectorAll("td")
            console.log(tds)
            Filter.Elements.inputs.forEach(x=>{
                x.classList.add("tomato")
                Filter.Elements.duzeltBtn.disabled=false;
                x.addEventListener("change",Filter.Actions.yenile())
                Filter.Elements.nameInput.value=tds[0].innerText;
                Filter.Elements.ageInput.value=tds[1].innerText;
                Filter.Elements.jobInput.value=tds[2].innerText;
                Filter.Elements.kiloInput.value=tds[3].innerText;
                Filter.Elements.boyInput.value=tds[4].innerText;
            })
          
            Filter.Elements.duzeltBtn.addEventListener("click",()=>{
                tds[0].innerText=Filter.Elements.nameInput.value;
                tds[1].innerText=Filter.Elements.ageInput.value;
                tds[2].innerText=Filter.Elements.jobInput.value;
                tds[3].innerText=Filter.Elements.kiloInput.value;
                tds[4].innerText=Filter.Elements.boyInput.value;
                Filter.Elements.inputs.forEach(x=>{
                    x.classList.remove("tomato")
                    x.value="";
                })
                    Filter.Elements.duzeltBtn.disabled=true;
            })
          
            
        },
        addToHTML:()=>{
          
            divtr=document.createElement("tr");
            divtr.classList.add="divtr";
            Filter.Elements.tableDiv.appendChild(divtr)
            var personHTML=`
            <td> ${Filter.Status.person.name} </td>
            <td> ${Filter.Status.person.age}  </td>
            <td> ${Filter.Status.person.job}  </td>
            <td> ${Filter.Status.person.kilo} </td>
            <td> ${Filter.Status.person.boy}  </td>
            <td> <button id="deleteBtn"> X </button></td>
            <td> <button id="editBtn" > Düzenle </button></td>
             `
            divtr.innerHTML=personHTML;
            Filter.Actions.addToDeleteFunc();
            Filter.Actions.addToEditFunc();
            Filter.Elements.form.reset()
            Filter.Elements.duzeltBtn.disabled=true;

        },
        addToDeleteFunc:()=>{
            var delBtns=document.querySelectorAll("#deleteBtn");
            delBtns.forEach(btn=>btn.addEventListener("click",Filter.Actions.delete))
        },

        addToEditFunc:()=>{
            var editBtns=document.querySelectorAll("#editBtn");
            editBtns.forEach(btn=>btn.addEventListener("click",Filter.Actions.edit))
        }

    }

}

//BÖYLE ÇALIŞMADI DELETE FUNCTİON İLE

// divtr=document.createElement("tr");
// divtr.classList.add="divtr";
// Filter.Elements.tableDiv.appendChild(divtr)
// var personHTML=`
// <td> ${Filter.Status.person.name} </td>
// <td> ${Filter.Status.person.age}  </td>
// <td> ${Filter.Status.person.job}  </td>
// <td> ${Filter.Status.person.kilo} </td>
// <td> ${Filter.Status.person.boy}  </td>
// <td> <button id="deleteBtn" onclick="Filter.Actions.delete()"> X </button></td>
// <td> <button id="editBtn" > Düzenle </button></td>
//  `
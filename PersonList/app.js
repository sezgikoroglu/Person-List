var Filter={
    Elements:{

            form:document.querySelector("form"),
            nameInput:document.querySelector("#name"),
            ageInput:document.querySelector("#age"),
            jobInput:document.querySelector("#job"),
            kiloInput:document.querySelector("#kilo"),
            sizeInput:document.querySelector("#boy"),
            tableDiv:document.querySelector("table"),
            tBodyDiv:document.querySelector("tbody"),
            inputs:document.querySelectorAll(".inputt"),
            duzeltBtn:document.querySelector("#düzelt"),
            ekleBtn:document.querySelector("#ekle")
            
    },
    Status:{
        arr:[],
        person:{},
    },
    Actions:{

        init:()=>{
            const personList=JSON.parse(localStorage.getItem("personList"));
            if (!personList){
               localStorage.setItem("personList",JSON.stringify([]));
            }else{
                Filter.Status.arr=personList;
                Filter.Actions.addToHTML()
            }
        },

        control:()=>{
            var array=[];
            Filter.Elements.inputs.forEach(input=>{
                if(input.value.trim() == ""){
                    array.push(input);
                }
            });
            if (array.length>0){
                array.forEach(x=>{
                    x.classList.add("tomato")
                    setTimeout(()=>{
                        x.classList.remove("tomato")
                    },2500)}
                 )
                alert("Tüm inputları doldurunuz")
            }else{
                Filter.Actions.getvalue()
            }
        },

        getvalue:()=>{
           
            var name=Filter.Elements.nameInput.value;
            var age=Filter.Elements.ageInput.value;
            var job=Filter.Elements.jobInput.value;
            var kilo=Filter.Elements.kiloInput.value;
            var size=Filter.Elements.sizeInput.value;
            Filter.Status.person={name,age,job,kilo,size};
            Filter.Status.arr.push(Filter.Status.person);
            const list=JSON.parse(localStorage.getItem("personList"));
            list.push(Filter.Status.person);
            localStorage.setItem("personList",JSON.stringify(list))
            Filter.Elements.inputs.forEach(x=>{
                x.value="";
            })
            
            Filter.Actions.addToHTML()
            
        },
        addToHTML:()=>{
          
            Filter.Elements.tBodyDiv.innerHTML="";
            for (let i = 0; i <Filter.Status.arr.length; i++) {
                var person=Filter.Status.arr[i];
                var divtr=document.createElement("tr");
                divtr.classList.add="divtr";
                Filter.Elements.tBodyDiv.appendChild(divtr)
                var personHTML=`
                <td> ${person.name} </td>
                <td> ${person.job}  </td>
                <td> ${person.age}  </td>
                <td> ${person.kilo} </td>
                <td> ${person.size}  </td>
                <td> <button id="deleteBtn" onclick="Filter.Actions.delete(${i})"> X </button></td>
                <td> <button id="editBtn" onclick="Filter.Actions.edit(${i})" > Düzenle </button></td>
                 `
                Filter.Elements.tBodyDiv.innerHTML+=personHTML;
                Filter.Elements.form.reset()
                Filter.Elements.duzeltBtn.disabled=true;
                Filter.Elements.ekleBtn.disabled=false;
                Filter.Elements.inputs.forEach(x=>
                    x.classList.remove("tomato")
                )
            }
        },

        edit:(i)=>{
          
            var person=Filter.Status.arr[i];
            //inputları kırmızı yap
            Filter.Elements.inputs.forEach(x=>
               x.classList.add("tomato")
            )
            //Person daki değerleri input a geri yerleştir
            Filter.Elements.nameInput.value= person.name;
            Filter.Elements.ageInput.value= person.age;
            Filter.Elements.jobInput.value= person.job;
            Filter.Elements.kiloInput.value= person.kilo;
            Filter.Elements.sizeInput.value= person.size;
            //Butonları aktif/pasif yap
            Filter.Elements.ekleBtn.disabled=true;
            Filter.Elements.duzeltBtn.disabled=false;
            Filter.Status.arr[i]="";
            Filter.Elements.duzeltBtn.setAttribute('onclick', `Filter.Actions.editPerson(${i})`);

        },

        editPerson:(i)=>{
            
            var name=Filter.Elements.nameInput.value;
            var age=Filter.Elements.ageInput.value;
            var job=Filter.Elements.jobInput.value;
            var kilo=Filter.Elements.kiloInput.value;
            var size=Filter.Elements.sizeInput.value;
            var person={name,age,job,kilo,size};
            Filter.Status.arr[i]=person;
            localStorage.setItem("personList",JSON.stringify(Filter.Status.arr))
            Filter.Actions.addToHTML();
        },

        delete:(i)=>{
            alert((Filter.Status.arr[i].name)+" kişisi siliniyor")
            Filter.Status.arr.splice(i,1);
            Filter.Actions.addToHTML();
            
            localStorage.setItem("personList",JSON.stringify(Filter.Status.arr))

        }
        ,

    }

}
Filter.Actions.init();
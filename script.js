let ulDom=document.querySelector('#list')
let addDom=document.querySelector('#liveToastBtn')
let alertDOM=document.querySelector('#alert')
let newLocalStorage=[]


let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


addDom.addEventListener('click', handler())


//Listeye ekleme ile birlikte birde silme butonu ekledik
const addtoList=(text)=>{
    let liDom=document.createElement('li')
    liDom.innerHTML=`${text}             
    <button
    type="button"
    class="close mt-2 mr-4"
    data-dismiss="toast"
    aria-label="Close"
    id="close-btn">
    <span aria-hidden="true">&times;</span>
</button>`
    ulDom.append(liDom)
}

function getAll(){
    data.forEach(item => {
    addtoList(item);});
    removeElement()
    checked()
} 
getAll()
//handler ile hem text in bos olup olmadigini kontol ettik
// hemde eklenen li elementleri silmek icin cagri yaptik
function handler(){
    const user_text=document.querySelector('#task')
    if(user_text.value.trim()){
        $(".success").toast("show")
        itemsArray.push(user_text.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        addtoList(user_text.value)
        user_text.value=""
    }else{
        $(".error").toast("show")
    }
    removeElement()
    checked()

}


// li elementlerini ve localStoragedan silme metodu
function removeElement(){
    let closeBtn=document.querySelectorAll('#close-btn')
    let liDOMmark=document.querySelectorAll('li')
    for(let i=0; i<closeBtn.length; i++){
        closeBtn[i].addEventListener('click',function(evt){
            evt.preventDefault()
            itemsArray = itemsArray.filter(item => item !== closeBtn[i].parentElement.innerText.slice(0,itemsArray[i].length))
            localStorage.setItem('items',JSON.stringify(itemsArray))
            closeBtn[i].parentElement.remove()
            }
        )   
    }
}

//yapildi isaretlemesi metodu

function checked(){
    let liDOMmark=document.querySelectorAll('li')
    for(let i=0; i<liDOMmark.length; i++){
        liDOMmark[i].addEventListener('click', function(evt){
            evt.preventDefault()
            liDOMmark[i].style='text-decoration:line-through'
        })
    }
}



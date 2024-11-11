let products=getProducts()
const filters={searchItem:'',mojodicheckBox:false,sortByedited:'ByEdited',sortBycreated:'ByCreated'}
const divProducts=document.querySelector('#products')
const textBoxSearch=document.querySelector('#search')
const chekbox=document.querySelector('#chek')
// ......................................................

renderProducts(products,filters)
textBoxSearch.addEventListener('input',function(e) {//.................................search event
    filters.searchItem=e.target.value
    renderProducts(products,filters)
});

chekbox.addEventListener('change',function(e) {//......................................checkBox event
    divProducts.classList.add('show')
    filters.mojodicheckBox=e.target.checked
    renderProducts(products,filters)
})
document.querySelector('#Add-Form').addEventListener('submit',function(e){//...........form event
    e.preventDefault()
    const id=uuidv4()
    const timestamp=moment().valueOf()
    if(e.target.elements.searchTitle.value !== ''){
        products.push({id:id,
                      title:e.target.elements.searchTitle.value,
                      mojodi:parseInt(prompt('enter stock :')),
                      price:parseInt(prompt('enter price :')),
                      Created:timestamp,
                      Updated:timestamp,
                     })
        divProducts.classList.add('show')
        saveProducts()
        renderProducts()
        e.target.elements.searchTitle.value=""
    }else{
        alert('enter any thing in text-Box')
    }
    
    renderProducts(products,filters)
})
window.addEventListener('storage',function(e) {
    if(e.key==='space'){
        products=JSON.parse(e.newValue)
        renderProducts(products,filters)
    }
   
})
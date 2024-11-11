const productTitle=document.querySelector('#product-title')
const productStock=document.querySelector('#product-stock')
const removeButton=document.querySelector('#removeproduct')
const productPrice=document.querySelector('#product-price')
const dateElem=document.querySelector('#byedited')
const creatElem=document.querySelector('#bycreated')

const productId=location.hash.substring(1)
let products=getProducts()

let product=products.find(function(item){
    return item.id===productId
})
if(product === undefined){
    location.assign('./index.html')
}

productTitle.value=product.title
productStock.value=product.mojodi
productPrice.value=product.price
dateElem.textContent=LastEditFormat(product.Updated)
creatElem.textContent=LastCreatedFormat(product.Created)

productTitle.addEventListener('input',function(e) {
    product.title=e.target.value
    product.Updated=moment().valueOf()
    dateElem.textContent=LastEditFormat(product.Updated)
    creatElem.textContent=LastCreatedFormat(product.Created)    
    saveProducts(products)
})
productStock.addEventListener('input',function(e) {
    product.mojodi=parseInt(e.target.value)
    product.Updated=moment().valueOf()
    dateElem.textContent=LastEditFormat(product.Updated)
    creatElem.textContent=LastCreatedFormat(product.Created)
    saveProducts(products)
})
productPrice.addEventListener('input',function(e) {
    product.price=parseInt(e.target.value)
    product.Updated=moment().valueOf()
    dateElem.textContent=LastEditFormat(product.Updated)
    creatElem.textContent=LastCreatedFormat(product.Created)
    saveProducts(products)
})

removeButton.addEventListener('click',function(e) {
    removeProduct(product.id)
    saveProducts(products)
    location.assign('./index.html')
})

window.addEventListener('storage',function(e) {
    if(e.key==='space'){
        
        products=JSON.parse(e.newValue)
        product=products.find(function(item) {
            return item.id===productId
        })
        if(product===undefined){
            location.assign('./index.html')
        }  
        productTitle.value=product.title
        productStock.value=product.mojodi
        productPrice.value=product.price
        
        dateElem.textContent=LastEditFormat(product.Updated)
        creatElem.textContent=LastCreatedFormat(product.Created)
    }
    
})











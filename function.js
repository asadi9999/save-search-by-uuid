
let getProducts=function() {//.................................get-products.......................
    let productjson=localStorage.getItem('space')
    if(productjson !== null){
        return JSON.parse(productjson)
}else{
    return []
}
}
let saveProducts=function() {//.................................save-Products.......................
    localStorage.setItem('space',JSON.stringify(products))
}
let toggleProducts=function(id) {//...............................toggleProducts.......................
        let productfind= products.find(function(item){
            return item.id===id
        })
        if(productfind !== undefined){
            productfind.mojodi != productfind.mojodi
        }    
}
let removeProduct=function(id) {
   let productIndex=products.findIndex(function(item){
        return item.id===id
    })
    if(productIndex > -1){
        products.splice(productIndex,1)
    }
}

const sortByCreatProduct=function (products,creatby) {
    if(creatby === 'ByCreated'){
        return products.sort(function(a,b){
            if(a>b){
                return -1
            }else if(a<b){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return products
    }
}
const sortByeditProduct=function(products,byedited) {
    if(byedited==='ByEdited'){
        return products.sort(function(a,b){
            if(a>b){
                return -1
            }else if(a<b){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return products
    }
}

//...............................renderProducts.......................
    let renderProducts=function(mahsol,mojoodi){
        products=sortByCreatProduct(products,filters.sortBycreated)
        products=sortByeditProduct(products,filters.sortByedited)
        let filterMhsol=products.filter(function(item){
              return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
          });
          filterMhsol=filterMhsol.filter(function(item){
              if(filters.mojodicheckBox){
                  return item.mojodi
              }else{
                  return true
              }
          });
                divProducts.innerHTML=""
                filterMhsol.forEach(function(item){
                divProducts.appendChild(creatDom(item))
                
                });
          }

let creatDom=function (count) {
   let productElement= document.createElement('div')
   let checkBox= document.createElement('input')
   let productName= document.createElement('a')
   let removButt= document.createElement('button')
   let Stock=document.createElement('span')
   let productPrice=document.createElement('span')
   let ByEdited=document.createElement('span')
   let ByCreated=document.createElement('span')
   
        removButt.classList='btn btn-primary'
        checkBox.setAttribute('type','checkbox')
        checkBox.checked=!count.mojodi
        productElement.appendChild(checkBox)
        productElement.appendChild(removButt)
        productElement.appendChild(productPrice)
    
    checkBox.addEventListener('change',function() {
        toggleProducts(count.id)
        saveProducts(products)
        renderProducts(products,filters)
    });
    // console.log(index);
    productPrice.textContent=`price :${count.price}`
    productName.textContent=`${count.title}`
    productName.style.textDecoration=count.mojodi ? 'intial' : 'line-through'
    if(count.mojodi){
        Stock.innerHTML+=`<span class="badge badge-success text-white ">${count.mojodi}: موجودی</span>`
    }else{
        Stock.innerHTML+=`<span class="badge badge-danger text-white ">${count.mojodi}: موجودی</span>`
        
    }
    productName.classList=('text-warning opacity-100 d-flex flex-row align-content-center text-align-center flex-wrap-wrap align-item-center')
    productName.setAttribute('href',`./product-edit.html#${count.id}`)
    productElement.appendChild(productName)
    productElement.appendChild(Stock)
    
    removButt.textContent='x'
    removButt.addEventListener('click',function(){
        removeProduct(count.id)
        saveProducts(products)
        renderProducts(products,filters)
    })
    return productElement
}


const LastEditFormat=function(timestamp){
    return `ویرایش شده${moment(timestamp).local('fa').fromNow()}`
}
const LastCreatedFormat=function(timestamp){
    return `ایجادشده:${moment(timestamp).local('fa').fromNow()}`
}
document.querySelector('#sellected').addEventListener('change',function(e) {
    filters.sortBycreated=e.target.value
    filters.sortByedited=e.target.value
    renderProducts(products,filters)
})
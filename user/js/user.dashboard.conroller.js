let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
import { getParam, postschema, request,getdata, adcm, geturl,showOrder,addshade,setErrorFor,setSuccessFor,alertMessage,getschema,setFocusFor,setBlurFor,checkFileType,checkFileSize,ai,getcips,geimgturl } from "../../js/functions.js";
import{ initiatewishlist } from '../../js/wishlist.controller.js'
let pages = new Array(0,1,2);
a = getParam('page')
c = Array.from(document.querySelectorAll('span.cpcards'))
p = Array.from(document.querySelectorAll('div.pagecontentsection'))
if(a != null){
	pages.forEach(target=>{
		if (a == target) {
			t = target
            window.history.pushState('','',`?page=${t}`)
            c.forEach((cp)=>{
                cp.classList.remove('active','bb-1-s-theme','bc-tr-theme','theme')
            })
            c[t].classList.add('active','bb-1-s-theme','bc-tr-theme','theme')
            cpgcntn(t)
            return 0
		}
	})
}else{
	window.history.pushState('','','?page=0')
    cpgcntn(0)

}
c.forEach((cudstp)=>{
    cudstp.addEventListener('click',()=>{
      c.forEach((cp)=>{
        cp.classList.remove('active','bb-1-s-theme','bc-tr-theme','theme')
      })
      cudstp.classList.add('active','bb-1-s-theme','bc-tr-theme','theme')
      cpgcntn(c.indexOf(cudstp))
    })
  })
async  function cpgcntn(step) {
    p.forEach(page=>{
        if(p.indexOf(page) == step){
           page.classList.replace('l-100','l-0')
           page.classList.replace('l--100','l-0')
           window.history.pushState('','',`?page=${step}`)
           gsd(page)
        }else if (p.indexOf(page) > step) {
            page.classList.replace('l--100','l-100')
            page.classList.replace('l-0','l-100')
        }else if (p.indexOf(page) < step) {
            page.classList.replace('l-100','l--100')
            page.classList.replace('l-0','l--100')
        }
    })
  }
  async function gsd(page) {
    x = page.id
    if (x == 'my-orders') {
        k = page.querySelector('div.orders')
        v = postschema
        v.body = JSON.stringify({token: getdata('user')})
        r = await request('myorders',v)
        if (!r.success) {
            k.innerHTML = `<div class="w-100 h-a">
            <div class="center p-10p bsbb w-100 h-100p svg-hol">
                <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
            </div>
            <div class="center p-10p bsbb w-100 h-100">
                <span class="verdana fs-18p ta-c dgray">there was an error while connecting to the servers</span>
            </div>
        </div>`
        }
        if (r.message.length <= 0) {
            k.innerHTML = `<div class="w-100 h-a">
            <div class="center p-10p bsbb w-100 h-100p svg-hol">
                <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
            </div>
            <div class="center p-10p bsbb w-100 h-100">
                <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no orders in your order history</span>
            </div>
        </div>`
           return  0
        }
        k.innerHTML = null
        for (const order of r.message) {
            h = document.createElement('div')
            k.appendChild(h)
            h.className = 'w-100 h-a p-10p bsbb'
            h.innerHTML = `<div class="w-100 h-100 b-1-s-gray br-10p hover-2 ordr" >
                            <div class="w-100 h-100 obody flex bblock-resp p-10p bsbb">
                                <div class="imgs-cont w-100p h-100p bfull-resp bcenter-500p-resp p-r ordr" data-wrap="${order.id}">
                                    
                                </div>
                                <div class="odesc w-80 h-100 ml-10p bsbb flex  bblock-resp bfull-resp bm-a-resp">
                                    <div class="ordr left w-90 h-100 m-0 bfull-resp bmt-10p" data-wrap="${order.id}">
                                        <div class="oidhol w-100 h-30p p-5p bsbb">
                                            <div class="flex">
                                                <span class="w-a h-20p verdana dgray fs-12p pr-10p bsbb capitalize br-5p center">
                                                    order:
                                                </span>
                                                <span class="w-a h-20p verdana theme consolas br-5p">
                                                    #${order.id}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="odeschol w-80 h-a p-5p bsbb bfull-resp ">
                                            <div class="thedesc p-10p bsbb ">
                                                <ul class="flex bblock-resp p-0 m-0">
                                                    <li class="w-100 h-a flex">
                                                        <span class="w-a h-20p verdana dgray fs-10p pr-10p bsbb capitalize br-5p center">
                                                            products:
                                                        </span>
                                                        <span class="w-a h-20p verdana theme consolas br-5p">
                                                            X${order.products.length}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-150p h-100 p-10p bsbb bh-a-resp bfull-resp ">
                                        <div class="w-100 h-100  osthol ">
                                            <div class="w-100 h-a mb-10p center">
                                                <span class="w-a h-20p verdana dgray fs-10p pr-10p bsbb capitalize br-5p center nowrap">
                                                    total price:
                                                </span>
                                                <span class="w-a h-20p fs-13p verdana black consolas br-5p nowrap">
                                                    ${adcm(order.totalprice)} RWF
                                                </span>
                                            </div>
                                            <div class="w-100 h-a mb-10p center-2">
                                                <span class="w-a p-5p courier bold-2 ${coc(order.status)} bsbb h-a ${cobc(order.status)} br-2p fs-12p block">
                                                    ${order.status}
                                                </span>
                                            </div>
                                            ${(order.status == 'delivered')?    `<div class="w-100 h-a mb-10p center-2">
                                            <span class="w-a p-5p courier bold-2 addfb dgray bsbb h-a bc-tr-theme br-3p bb-1-s-theme fs-12p block capitalize" data-wrap="${order.id}">
                                                add feedback
                                            </span>
                                        </div>` : ''}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            i = h.querySelector('div.imgs-cont')
            q = 1
            for (const product of order.products) {

                i.innerHTML+= `<div class="w-60p h-60p br-5p bc-white b-1-s-gray p-a ml-${q}p bcntr-resp">
                    <img src="${geimgturl()}/product-imgz/${product.image}" class="contain w-100 h-100">
                </div>`
                q+=5
            }
        }
        let ordr = Array.from(k.querySelectorAll('div.ordr'))
        let addfb = Array.from(k.querySelectorAll('span.addfb'))

        for (const ord of ordr) {
            ord.addEventListener('click',async()=>{
                l = ord.getAttribute('data-wrap');
                z = postschema
                z.body = JSON.stringify({orderid: l,token: getdata('user')})
                r = await request('getorder',z)
                if (!r.success ) return 0
                if (r.success) {
                    showOrder(r.message)
                }
            })
        }
        for (const feedback of addfb) {
            feedback.addEventListener('click',async()=>{
                l = feedback.getAttribute('data-wrap');
                z = postschema
                z.body = JSON.stringify({orderid: l,token: getdata('user')})
                r = await request('getorder',z)
                if (!r.success ) return 0
                if (r.success) {
                    addfbpopup(r.message[0])
                }
            })
        }
    }else if (x == 'my-account') {
        t = postschema
        t.body = JSON.stringify({token: getdata('user')})
        r = await request('getuser',t)
        if (!r.success) return 0
        r=r.message
        n = page.querySelector('span.n-img')
        n.textContent = r.firstname.substring(0,1)
        b = page.querySelector('span.name')
        b.innerHTML = r.firstname+'&nbsp;'+r.lastname
        let editbuts = Array.from(page.querySelectorAll('span.icon-edit-icon'))
        for (const button of editbuts) {
            button.addEventListener('click',()=>{
                l = button.getAttribute('data-target')
                shedtpopup(l,r);
            })
        }

    }else{
        initiatewishlist()
    }
  }
  function coc(string) {
    if (string == 'pending') {
        return 'green'
    }else if (string == 'delivered') {
        return 'theme'
    }else if (string == 'new') {
        return 'dgray'
    }
  }
  function cobc(string) {
    if (string == 'pending') {
        return 'bc-tr-green'
    }else if (string == 'delivered') {
        return 'bc-tr-theme'
    }else if (string == 'new') {
        return 'bc-gray'
    }
  }
function shedtpopup(type,basicinfo) {
    s = addshade()
	a = document.createElement('div')
	s.appendChild(a)
    if (type == 'names') {
        a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
            a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
                                <span class="fs-18p black capitalize igrid center h-100 verdana">edit names</span>
                            </div>
                            <div class="body w-100 h-a p-5p grid mt-10p">
                                <form method="post" id="edit-names-form" name="edit-names-form">
                                    <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                        <div class="p-r w-100 igrid mr-10p left parent">
                                            <input type="text" name="name" placeholder="first name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name" value="${basicinfo.firstname}">
                                            <span class="p-a r-0 mt-10p mr-5p">
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
                                                    <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
                                                </svg>
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#68D753"></circle>
                                                    <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
                                                    <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
                                                </svg>
                                            </span>
                                            <small class="red verdana hidden ml-5p">error mssg</small>
                                        </div>
                                    </div>
                                    <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                        <div class="p-r w-100 igrid mr-10p left parent">
                                            <input type="text" name="lastname" placeholder="last name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="lastname" value="${basicinfo.lastname}">
                                            <span class="p-a r-0 mt-10p mr-5p">
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
                                                    <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
                                                </svg>
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#68D753"></circle>
                                                    <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
                                                    <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
                                                </svg>
                                            </span>
                                            <small class="red verdana hidden ml-5p">error mssg</small>
                                        </div>
                                    </div>
                                    <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                        <div class="p-r w-100 igrid mr-10p left parent">
                                            <input type="password" name="password" placeholder="password" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="password">
                                            <span class="p-a r-0 mt-10p mr-5p">
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
                                                    <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
                                                </svg>
                                                <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10" cy="10" r="10" fill="#68D753"></circle>
                                                    <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
                                                    <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
                                                </svg>
                                            </span>
                                            <small class="red verdana hidden ml-5p">error mssg</small>
                                        </div>
                                    </div>
                                    <div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                        <div class="w-100 igrid">
                                            <span class="center iblock">
                                                <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                    <span class="verdana white fs-15p capitalize"> proceed</span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>`
            f = a.querySelector('form#edit-names-form')
            f.addEventListener('submit',async (e)=>{
                e.preventDefault()
                i = Array.from(f.querySelectorAll('input.main-input'))
                let name,lastname,password
                for(const input of i){
                  if (input.value == '') {
                    setErrorFor(input,'this is a required field')
                  }else(
                    setSuccessFor(input)
                  )
                  if (input.id == 'name') {
                     name = input.value
                  }
                  if (input.id == 'lastname') {
                    lastname = input.value
                 }
                 if (input.id == 'password') {
                    password = input.value
                 }
                }
                if(name != '' && lastname != '' && password != ''){
                    o = postschema
                    o.body = JSON.stringify({token: getdata('user'),firstname:name,lastname,password,reqtype:'names'})
                    r = await request('edituser',o)
                    console.log(r)
                    if (r.success) {
                        alertMessage(r.message)
                        f.reset()
                    }else{
                        console.log(r.status)
                        alertMessage(r.message)
                    }
                }else{
                }
            })
    }else if (type == 'password') {
        a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
        a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
                            <span class="fs-18p black capitalize igrid center h-100 verdana">edit password</span>
                        </div>
                        <div class="body w-100 h-a p-5p grid mt-10p">
                            <form method="post" id="edit-password-form" name="edit-password-form">
                                <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                    <div class="p-r w-100 igrid mr-10p left parent">
                                        <input type="text" name="newpassword" placeholder="new password" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="newpassword">
                                        <span class="p-a r-0 mt-10p mr-5p">
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
                                                <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
                                            </svg>
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#68D753"></circle>
                                                <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
                                                <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
                                            </svg>
                                        </span>
                                        <small class="red verdana hidden ml-5p">error mssg</small>
                                    </div>
                                </div>
                                
                                <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                    <div class="p-r w-100 igrid mr-10p left parent">
                                        <input type="password" name="password" placeholder="password" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="password">
                                        <span class="p-a r-0 mt-10p mr-5p">
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
                                                <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
                                            </svg>
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#68D753"></circle>
                                                <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
                                                <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
                                            </svg>
                                        </span>
                                        <small class="red verdana hidden ml-5p">error mssg</small>
                                    </div>
                                </div>
                                <div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize"> proceed</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>`
        f = a.querySelector('form#edit-password-form')
        f.addEventListener('submit',async (e)=>{
            e.preventDefault()
            i = Array.from(f.querySelectorAll('input.main-input'))
            let newpassword,password
            for(const input of i){
              if (input.value == '') {
                setErrorFor(input,'this is a required field')
              }else(
                setSuccessFor(input)
              )
              if (input.id == 'newpassword') {
                 newpassword = input.value
              }
             if (input.id == 'password') {
                password = input.value
             }
            }
            if(newpassword != '' && password != ''){
                o = postschema
                o.body = JSON.stringify({token: getdata('user'),newpassword,password,reqtype:'password'})
                r = await request('edituser',o)
                if (r.success) {
                    alertMessage(r.message)
                    f.reset()
                }else{
                    alertMessage(r.message)
                }
            }else{
            }
        })
    }
}
async function addfbpopup(orderinfo) {
    s = addshade();
  a = document.createElement('div')
	s.appendChild(a)
  a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp"
  a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a feedback</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-discount-form" name="add-discount-form">
                               
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="w-100 h-100 parent bsbb p-r">
										<label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">product</label>
										<select type="text" id="product" name="product" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
												<option></option>
										</select>
										<span class="p-a r-0 t-0 mr-10p mt-10p">
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#FF0000"/>
												<path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
											</svg>
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#68D753"/>
												<line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
												<line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
											</svg>
										</span>
										<small class="red verdana left hidden ml-5p">error mssg</small>				
									</div>
								</div>
                                <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                    <span class="black bold verdana capitalize">rate this product</span>
                                    <div class="p-5p bsbb w-100 h-a flex rates-hol">
                                    
                                    </div>
                                </div>
                                <div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
										</label>
									  </div>
									  <input type="file" name="image" placeholder="Thumbnail" class="p-a l-0 t-0 center hover-2 h-40p w-100 op-0">
									  <span class="p-a r-0 mt--37p mr-5p w-20p h-20p zi-10000">
										<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
										  <circle cx="10" cy="10" r="10" fill="#FF0000"/>
										  <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
										</svg>
										<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
										  <circle cx="10" cy="10" r="10" fill="#68D753"/>
										  <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
										  <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
										</svg>
									  </span>
									  <small class="red verdana hidden ml-5p">error mssg</small>
									  <div class="w-100 h-a bsbb mt-10p">
										<div class="butt-hol">
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
                                <div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
                                    <div class="p-r w-100 igrid mr-10p left parent">
                                        <textarea rows="4" cols="50" placeholder="Message" name="message" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="message"></textarea>
                                        <span class="p-a r-0 mt-10p mr-5p">
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                                <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                            </svg>
                                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                                <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                                <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                            </svg>
                                        </span>
                                        <small class="red verdana hidden ml-5p">error mssg</small>
                                    </div>
                                 </div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">proceed</span>
                                            </button>
                                        </span>
                                    </div>
                                 </div>
							</form>
						</div>`
		f = a.querySelector('form#add-discount-form')
        let rateshol = a.querySelector('div.rates-hol')
        for (let index = 1; index <= 5; index++) {
            rateshol.innerHTML+= ` <span class="#icon h-40p center-2 w-40p">
            <svg xmlns="http://www.w3.org/2000/svg" class="rateicon" fill="#f2f2f2" width="40" height="40" id="${index}" viewBox="0 0 32 32" version="1.1">
            <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"/>
            </svg>
        </span>`
            
        }
        let rateicons = Array.from(rateshol.querySelectorAll('svg.rateicon'));
        for (const rate of rateicons) {
            rate.addEventListener('click',v=>{
                rateicons.forEach(rt=>{
                    rt.style.fill = ''
                    rt.classList.remove('active');
                    if (rateicons.indexOf(rt)< rateicons.indexOf(rate)) {
                        rt.style.fill = 'var(--main-color)'

                    }
                })
                rate.classList.add('active');
                rate.style.fill = 'var(--main-color)'

                
            })
        }
		s = Array.from(f.querySelectorAll('select.main-input'))
		s.forEach(select=>{
			select.addEventListener('focus',e=>{
				setFocusFor(select);
			})
			select.addEventListener('blur',e=>{
				if (select.value == '') {
					setBlurFor(select);
				}
			})
		})
        let rating = null
        
		o = getschema
		t= await request('tree',o)
		if (!t.success) {
			return 0
		}
		for (const product of orderinfo.products) {
            console.log(product)
        o = document.createElement('option')
        o.value = product.id
        o.className = 'p-10p bsbb'
        o.innerHTML = `<div class="w-100 h-100 block verdana black capitalize">${product.pname}</div>`
        s[0].appendChild(o)
		}
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('.main-input'))
            z = f.querySelector('div.previewpanel');

			let product,message,image
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'message') {
				 message = input.value
			  }
			  if (input.id == 'product') {
				product = input.value
			 }
			}
            image = getcips(z)
            for (const rate of rateicons) {
                if (rate.classList.contains('active')) {
                    rating = parseInt(rate.id)
                }
            }
            console.log(rating)
			if(message != '' && product != ''){
                console.log(message,product,image)
		        o = postschema
                o.body = JSON.stringify({product,message,image,rating,token: getdata('user')})
			  r = await request('addfeedback',o)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		})
        let litbuts = Array.from(a.querySelectorAll('span.virtualitbut'));
        litbuts.forEach(button=>{
            button.addEventListener('click',()=>{
                 if (button.id == 'images') {
                    p =  button.parentNode.parentNode.parentNode.parentNode
                    i = Array.from(p.querySelectorAll('input'));
                    i.forEach(inp=>{
                        if (inp.type == 'file' && inp.value == '') {
                            setErrorFor(inp,"choose an image");
                            return 0;
                        }else if (inp.type == 'file' && inp.value != '') {
                            d = checkFileType(inp)[0];
                            if (d == 'image') {
                                setSuccessFor(inp);
                                ai(inp,p.querySelector('div.previewpanel'))
                            return 1;
                            }else{
                                setErrorFor(inp,'only images are allowed')
                                return 0;
                            }
                    
                        }
                    })
                }
            })
        })
}

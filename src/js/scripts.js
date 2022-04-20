window.onload = () =>{
    // Menu Burger
    const burgerMenu = document.getElementById("burger-icon");
    const navUl = document.getElementById("nav-ul");

    burgerMenu.addEventListener("click", ()=> {
        navUl.classList.toggle("show")
    })

    // API
    const shorten = document.getElementById("shorten");
    const error = document.querySelector("form p");
    const input = document.getElementById("input-text");
    const submit = document.getElementById("submit");
    

    //Response API
    
    const loadStorage = localStorage.getItem("links-list");
    const list = loadStorage ? JSON.parse(loadStorage): [];

    //create container api  links
    function addLinkElement (userLink,apiLink) { 
        const div = document.createElement("div");
        const shortLink = document.createElement("p");
        const longLink = document.createElement("p");
        const button = document.createElement("button");
        
        div.classList.add("links-list");
        longLink.innerHTML = userLink;
        shortLink.innerHTML = apiLink;
        button.innerHTML = "Copy";
        div.appendChild(longLink);
        div.appendChild(shortLink);
        div.appendChild(button);        
        shorten.appendChild(div);
        
        button.addEventListener('click', ()=>{
            navigator.clipboard.writeText(apiLink).then(()=>{
                button.innerText = "Copied!"
                button.classList.add("copied")
            })
        })

        
    }
   
    submit.addEventListener('click',shortenLink);

    
    function shortenLink (e) {
      
        let linkValue = input.value;  
        
        const url_Api = "https://api-ssl.bitly.com/v4/shorten";
        const accessToken = "c9cd368eecfa6e3fb059461ad3e02c69752fbcb6"
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' +accessToken,
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({ "long_url": linkValue, "domain": "bit.ly"})
            }    
            
          

        localStorage.setItem("links-list", JSON.stringify(list));
            
        if(linkValue === ''){
            console.log("valor invalido");
            input.style.border = " 2px solid var(--Error-input)"
            input.classList.add("input-error")
            error.style.display = "block"

        }else{

            // localStorage.setItem("links-list", JSON.stringify(list));
            
            fetch(url_Api, options).then(function(res){
            return res.json();
            }).then(function(data){

            // list.forEach((userLink, apiLink )=>{
            //     userLink = linkValue;
            //     apiLink = data.link
            //     addLinkElement(userLink,apiLink)
            // })
            
            addLinkElement(linkValue,data.link);// funciona me muestra cada enlace
            
            let linkInfo = {userLink:linkValue, apiLink: data.link};
            list.push(linkInfo);
            
            console.log(data);

    
            
            
            }).catch(function(err){
            console.log(err);
          
            })

            
        }

        

         
        input.value = ''

        e.preventDefault();
    }

    

      

      

}

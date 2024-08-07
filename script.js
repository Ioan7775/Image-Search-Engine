const access_key = 'QJkVz1N8JHGXKhTchA6wkjldlMe8eElu-WkcSpg2FQQ';
let page = 1,url,keyword,showmore,getData;
const button = document.getElementById('button');
let container = document.getElementById('container');



function createCard(element){
    let div = document.createElement('div');
    let img = document.createElement('img');
    let imageLink = document.createElement('a');
    
    img.src = element.urls.small;
    imageLink.href = element.links.html;
    imageLink.target = '_blank';
    
    imageLink.appendChild(img);
    div.appendChild(imageLink);
    
    
    div.classList.add('card');
    container.appendChild(div);
    
}


getData = async(page,keyword) =>{
    try{
        url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}`    
        const response = await axios.get(url);
        const data = response.data.results;
        
        data.forEach(element => {
            createCard(element);
        });
        
        showmore = document.createElement('button');
        showmore.textContent = 'More';
        showmore.classList.add('more');
        container.appendChild(showmore);
        
        showmore.addEventListener('click',()=>{
            page ++;
            container.removeChild(showmore);
            getData(page,keyword);
        })
    }
    catch{
        console.error('Something went wrong..');
    }
}

button.addEventListener('click',()=>{
    keyword = document.getElementById('input').value;
    
    getData(1,keyword);
})


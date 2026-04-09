// Compareit App -Main JavaScript File

alert("JavaScript is connected!");
let page = 1;
const productList = 
document.getElementById('product-list');
const searchInput =
document.getElementById('search');
const loadingIndicator =
document.getElementById('loading');
const limit =5; //Example limit, adjust as needed
let requestCount = 0;

//1.API connection with User-Agent 
const fetchProducts = async (query ="",pageNum = 1) => {
    if (requestCount >= limit) {
        //if limit reached show message
        showRateLimit();
        return;}
    }

    const userAgent = "CompareIt/1.0 (Contact:ap7258616@gmail.com)";
    const url = 
    'https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&page=${pageNum}&json=1';
try {
    requestCount++;
    const responese = await fetch(url, {
        headers: {"User-Agent":'userAgent'}
        });
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
    console.error("error fetching data:",error);
    }
    // 2.DisplayProducts
    const displayProducts = (products) => {
        products.forEach(product => {
            const productCard =
            document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML =  `
            <img src="${product.image_url ||
            'placeholder.png'}" alt="$
            {product.product_name}">
                <h3>${productCard.product_name ||
                'unknown Product'}</h3>
                <p>Brand: ${product.brands || 'N/A'}</p>
                    `;
                    productList.appendChild(productCard);
                });
            };
            
            //3.infinite Scrolling Logic
            const observer = new
            ibtersectionObserver((entries) => {
                if (entries[0].isintersecting) {
                    page++;
                    fetchProducts(searchInput.ariaValueMax, page);
                }
            },{ threshold: 1.0 });
            observer.observe(loadingIndicator);

            //4.Search Functionality
            let timeout = null;
            searchInput.addEventListener('input',() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {productList.innerHTML = ""; 

                    //Cler current list
                    page = 1;
                    requestCount = 0;
                    //Reset the request count
                    fetchProducts(searchInput.value, page);
                }, 500);
            });

            //5. Login integration Logic
            function handleLogin(event) {
                event.preventDefauIt();
                const name =
                document.getElementById('name').value;
                const age = 
                document.getElementById('age').value;
                const gender =
                document.querySelector('input[name="gender"]:checked')?.value;

                if(name && age && gender) {
                    localStorage.setItem('name',name);
                    localStorage.setItem('age',age);
                     localStorage.setItem('gender',gender);

                     document.getElementById('login-interface').sty
                     le.display = 'none';
                     document.getElementById('main-app-interface')
                     .style.display = 'block';
                     fetchProducts();//load products on app start
                } else {
                    alert("Please provide all the details")
                }
            }
            //Show rate limit message
            function showRateLimit() {
                loadingIndicator.innerText = 'Loading...(Limit Reached)';
                loadingindicator.style.color = 'red';
            }
            
            //Data Credit T&C Requirment)
            console.Iog("Data provided by Open Food Facts API under ODbl license");
                
                
            
            
            
        
    



 

let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendBookResult(result) {
    let {title, imageLink, author} = result;
    let columnContainerEl = document.createElement("div");
    columnContainerEl.classList.add("container");
    searchResultsEl.appendChild(columnContainerEl);
    
    let rowContainerEl = document.createElement("div");
    rowContainerEl.classList.add("row");
    columnContainerEl.appendChild(rowContainerEl);
    
    let bookContainerEl = document.createElement("div");
    bookContainerEl.classList.add("col-12","col-md-4", "col-lg-3", "mb-3" );
    rowContainerEl.appendChild(bookContainerEl);
    
    let imageContainerEl = document.createElement("img");
    imageContainerEl.src = imageLink;
    imageContainerEl.alt =title;
    imageContainerEl.classList.add("custom-image");
    bookContainerEl.appendChild(imageContainerEl);
    
    let authorEl = document.createElement("p");
    authorEl.textContent = author;
    authorEl.classList.add("author-name");
    bookContainerEl.appendChild(authorEl);
    let authorBreakEl = document.createElement("br");
    bookContainerEl.appendChild(authorBreakEl);
}


function displayResults(search_results){
    spinnerEl.classList.add("d-none");
    searchResultsEl.classList.remove("d-none");
    if (search_results.length === 0) {
        let errorEl = document.createElement("p");
        errorEl.textContent = "No result found";
        searchResultsEl.appendChild(errorEl);
    }else {
        let resultHeadingEl = document.createElement("h1");
        resultHeadingEl.textContent = "Popular Books";
        resultHeadingEl.classList.add("resultHeading");
        searchResultsEl.appendChild(resultHeadingEl);
        
        for(let result of search_results){
            createAndAppendBookResult(result);
        }
    }
}


function searchBook(event){
    if (event.key === "Enter"){
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchVal = searchInputEl.value;
        let httpRequestUrl = "https://apis.ccbp.in/book-store?title=" + searchVal;
        let options = {
            method: "GET",
        };
        
        fetch(httpRequestUrl, options)
            .then(function(response){
                return response.json();
            })
            .then(function(jsonData){
                let {search_results} = jsonData;
                displayResults(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchBook);
const $body = document.querySelector("body"),
$list = document.querySelector(".pokemons"),
$pokemonCard = document.querySelector(".pokemon-card"),
$linkNext = document.querySelector(".link-next"),
$linkPrevious = document.querySelector(".link-previous"),
$searchForm = document.querySelector(".header-form"),
$fragment = document.createDocumentFragment();





async function listarPokemons (url){
    //realizamos la peticion ajax con el manejo de errores
    try {

        $list.innerHTML=`<img class="loader" src="loader.svg" alt="Cargando...">`;

        let resultado = await fetch(url);
        let json = await resultado.json();


        console.log(json)

        if(!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText} 
        let $template = "";

        for(let i = 0; i< json.results.length ; i++){

            try {

                let resultado = await fetch(json.results[i].url);
                let pokemon = await resultado.json();
        
                if(!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText}

                $template += `
                    
                        <figure>
                            <a class="pokemon-link" href="${json.results[i].url}">
                                <img src="${pokemon.sprites.front_default}">
                            </a>
                            <div class="list-card-footer">
                                <figcaption>${pokemon.name}</figcaption>
                                <figcaption> N° ${pokemon.id}</figcaption>
                            </div>
                        </figure>
                   
                `;

                
            } catch (error) {
                
                console.log(`ocurrio un error: ${error.status}, ${error.statusText}`);

            }

        }

        $list.innerHTML = $template;

        if(json.previous){
            $linkPrevious.href = json.previous;
        }else{
            $linkPrevious.href ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
        }

        if(json.next){
            $linkNext.href = json.next;
        }else{
            $linkNext.href = "https://pokeapi.co/api/v2/pokemon/?offset=1098&limit=20";
        }
       
        
        
    } catch (error) {
        console.log(`ocurrio un error: ${error.status}, ${error.statusText}`);
    }

}

async function busquedaPokemon(url){


    try {
        let $template = "";
        let resultado = await fetch(url);
        let pokemon = await resultado.json();

        if(!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText}

        console.log(pokemon)

        $template += `
            
                <figure>
                    <a class="pokemon-link" href="${url}">
                        <img src="${pokemon.sprites.front_default}">
                    </a>
                    <div class="list-card-footer">
                        <figcaption>${pokemon.name}</figcaption>
                        <figcaption> N° ${pokemon.id}</figcaption>
                    </div>
                </figure>
           
        `;

        $list.innerHTML = $template;


            $linkPrevious.href ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";


   
            $linkNext.href ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
        

        
    } catch (error) {
        
        $list.innerHTML = ` <div class="not-found">
                                <p>El pokemon no ha sido encontrado</p>
                                <a href="index.html">Ver lista</a>
                            </div>`;

    }

}


document.addEventListener("DOMContentLoaded", listarPokemons("https://pokeapi.co/api/v2/pokemon/"));



document.addEventListener("submit", (event)=>{

    event.preventDefault();

if(event.target.matches(".header-form") && $searchForm.find.value != ""){
    
    console.log($searchForm.find.value)
    busquedaPokemon(`https://pokeapi.co/api/v2/pokemon/${$searchForm.find.value}`)

}

})



document.addEventListener("click", (event)=> {
    

    // si se clickea la imagen de un pokemon de la lista
   if(event.target.matches(".pokemon-link img") || event.target.matches(".pokemon-link")){

       event.preventDefault();   

       let figure = event.target.closest("figure");  
       let url = figure.querySelector(".pokemon-link").getAttribute("href");
       let imgUrl = figure.querySelector("img").getAttribute("src");
       let name = figure.querySelector(".list-card-footer").firstElementChild.textContent;
       let id = figure.querySelector(".list-card-footer").lastElementChild.textContent;

       let $template = `

       <h2>${name}</h2>
       <img src="${imgUrl}">
       <a class="pokedex-link" href="${url}">Ver Pokedex</a>
       `;

       $pokemonCard.innerHTML = $template;

   }


   // si se clickea los botones de prev y next de la lista de pokemons
   if(event.target.matches(".link-previous") || event.target.matches(".link-next") ){

       event.preventDefault();   
  
       listarPokemons(event.target.getAttribute("href"))
  
   }

   // si se busca un pokemon en el buscador

    // si se clickean el enlace para ver la pokedex
    if(event.target.matches(".pokedex-link")){

        event.preventDefault();

        pokedex(event.target.getAttribute("href"))

    }

    // si se clickean los enlaces para ver los siguientes pokemon de la pokedex
    if(event.target.matches(".pokedex-previous") || event.target.matches(".pokedex-next") ){

        event.preventDefault();

        pokedex(event.target.getAttribute("href"))

    }

})






async function pokedex (url){

    try {

        $body.innerHTML = `
        <div class="pokedex">
        <div class="pokedex-header">

            <div class="eye">
                <div class="eye-center">
                    <div class="white-circle1"></div>
                    <div class="white-circle2"></div>
                </div>
            </div>
            <div class="red-circle"></div>
            <div class="yellow-circle"></div>
            <div class="green-circle"></div>
        </div>

        <div class="pokedex-body">
            <div class="img-outer-screen">
                <div class="top">
                    <div class="red-button"></div>
                    <div class="red-button"></div>
                </div>

                <div class="screen"></div>

                <div class="bottom">
                    <div class="red-button"></div>
                    <i class="bi bi-list"></i>
                </div>
            </div>

            <div class="text-screen"></div>
        </div>

        <div class="pokedex-controls">
            <div class="right-controls">
                <a class="btn-listado" href="index.html">LISTADO</a>
                <div class="green-screen"></div>
                <div class="joistick">
                    <div class="left">
                        <a href=""><i class="bi bi-arrow-left-short"></i></a>    
                    </div>
                    <div class="middle">
                        <a href=""><i class="bi bi-arrow-up-short"></i></a> 
                        <a href=""><i class="bi bi-arrow-down-short"></i></a>
                    </div>
                    <div class="right">
                        <a href=""><i class="bi bi-arrow-right-short"></i></a>  
                    </div>

                </div>
            </div>

            <div class="left-controls">
                <a class="pokedex-previous" href="#">previous</a>
                <a class="pokedex-next" href="#">Next</a>
            </div>

        </div>
        
        `;

        $pokedexScreen = document.querySelector(".screen"),
        $pokedexTextScreen = document.querySelector(".text-screen"),
        $pokedexGreenScreen = document.querySelector(".green-screen"),
        $pokedexLinkPrevious = document.querySelector(".pokedex-previous"),
        $pokedexLinkNext = document.querySelector(".pokedex-next"),
        $pokedexScreen.innerHTML=`<img class="pokedex-loader" src="loader.svg" alt="Cargando...">`;
        $pokedexTextScreen.innerHTML=`<img class="pokedex-loader" src="loader.svg" alt="Cargando...">`;

        let $statsTemplate = "",
        $tipesTemplate= "",
        $abilitiesTemplate = "";

        let respuesta = await fetch(url);
        let pokemon = await respuesta.json();

        if(!respuesta.ok) throw {status: respuesta.status, statusText:respuesta.statusText}

        console.log(pokemon)


        for(i = 0; i < pokemon.stats.length; i++){

            $statsTemplate += `
                <p>${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat} </p>
            `;

        }

        for(i = 0; i < pokemon.types.length; i++){

            $tipesTemplate += `
                <p>${pokemon.types[i].type.name}</p>
            `;

        }

        for(i = 0; i < pokemon.abilities.length; i++){

            $abilitiesTemplate += `
                <p>${pokemon.abilities[i].ability.name}</p>
            `;

        }

        $pokedexScreen.innerHTML = `<img src="${pokemon.sprites.front_default}">`

        $pokedexTextScreen.innerHTML = `
                <div class="screen-text-content"> 
                    <div class="description">
                        <h1 class="nombre">${pokemon.name}</h1>
                        <div>
                            <p class="id">Pokemon N°${pokemon.id}</p>
                            <p class="weight">Weight: ${pokemon.weight} Kg </p>
                            <p class="experience">Experience: ${pokemon.base_experience} </p>
                        </div>
                    </div>

                    <div class="types">
                        <h2>Types</h2>
                        <div>
                            ${$tipesTemplate}
                        </div>   
                    </div>

                    <div class="stats">
                        <h2>Stats</h2>
                        <div>
                            ${$statsTemplate}
                        </div>
                        
                    </div>

                    <div class="abilities">
                        <h2>Abilities</h2>
                        <div>
                            ${$abilitiesTemplate}
                        </div>
                        
                    </div>
                </div>
                                                      
        `;

        $pokedexGreenScreen.innerHTML = `<p>N° ${pokemon.id}</p>`



        if(pokemon.id == 1){
            $pokedexLinkPrevious.href = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        }else{
            $pokedexLinkPrevious.href = `https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`
        }

        if(pokemon.id == 1098){
            $pokedexLinkNext.href = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        }else{
            $pokedexLinkNext.href = `https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`
        }

        
       


    } catch (error) {
        console.log(`ocurrio un error: ${error.status}, ${error.statusText}`);
    }


}
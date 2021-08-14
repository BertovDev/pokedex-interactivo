const container = document.querySelector(".container");
//Search Pokemon constants
const search = document.querySelector(".s-poke");
const searchTittle = document.querySelector(".search-tittle");
const searchImg = document.querySelector(".poke-shadow");
const searchType = document.querySelector(".search-type");
const searchBtn = document.querySelector(".btn");
const addBtn = document.querySelector(".add-btn");

//conts
let cont = 0;

const checkTypes = (data) => {
    //This checks if the pokemon has more than 1 type , if is not return the only one
    if((data.types).length > 1){
        return `${data.types[0].type.name} , ${data.types[1].type.name}`;
    } else {
        return `${data.types[0].type.name}`;
    }
}

const createPokemon = (data) => {

    //Create the elements for the pokemon
    const pokeName = document.createElement("h2");
    const img = document.createElement("img");
    const poke = document.createElement("div");
    const type = document.createElement("span");

    //Set the content of the elements created
    pokeName.innerHTML = `#${data.id} - ${data.name}`;
    img.src = data.sprites.front_default;
    type.innerHTML = checkTypes(data);

    //Add to the Div poke
    poke.appendChild(pokeName);
    poke.appendChild(img);
    poke.appendChild(type);

    //add style
    poke.classList = "poke";

    //add all to the container
    container.appendChild(poke);
}

const getPokemon = async (i) => {
    //Request the pokeApi and get the data
    const format = { headers: { Accept: "application/json" } };
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`, format);
    //Pass the data to the function createPokemon
    createPokemon(res.data);
}

const fillContainer = async () => {
    for(let i = 1;i<=151;i++){
       await getPokemon(i);
    }
}

const getPokemonByName = async (name) => {
    const format = { headers: { Accept: "application/json" } };
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, format);
    return res.data;
}

fillContainer();


searchBtn.addEventListener("click", async () => {
    if(search.value !== ""){
        const data = await getPokemonByName((search.value).toLowerCase());
        searchTittle.innerHTML = `#${data.id} - ${data.name}`;;
        searchImg.src = data.sprites.front_default;
        searchImg.style.width = "100px";
        searchImg.style.height = "100px";
        searchType.innerHTML = checkTypes(data);
        if(cont === 0){
            await addToMyTeam(data);
            cont = 1;
        }
    }
})
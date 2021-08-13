const container = document.querySelector(".container");
const search = document.querySelector(".s-poke");

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
    const btn = document.createElement("button");

    //Set the content of the elements created
    btn.innerText = "Add To Team";
    pokeName.innerHTML = `#${data.id} - ${data.name}`;
    img.src = data.sprites.front_default;
    type.innerHTML = checkTypes(data);

    //Add to the Div poke
    poke.appendChild(pokeName);
    poke.appendChild(img);
    poke.appendChild(type);
    poke.appendChild(btn);

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

fillContainer();


const searchPokemon = () => {
    
}
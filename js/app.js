const formulario = document.querySelector('#formulario');
const resultado= document.querySelector('#resultado');
const container = document.querySelector('.container');



window.addEventListener('load', () => {
    formulario.addEventListener('submit',buscarClima);
});


function buscarClima(e) {
    e.preventDefault();
    const ciudadInput = document.querySelector('#ciudad').value; 
    const paisSelect = document.querySelector('#pais').value;


    //validar
    if (ciudadInput === '' || paisSelect === '') {
        mostrarAlert('todos los campos son obligatorios');
        return;
    }
   
    //consultar la api

        consultarAPI(ciudadInput,paisSelect);



   
}

    function consultarAPI(ciudad, pais){
            const appId = '0e3c980120917e468b19ad9e86b36ece';

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

            spinners();

            setTimeout(() => {
                fetch(url)
                    .then(response => response.json())
                    .then(datos => {
                            limpiarHTML();
                            if (datos.cod === '404') {
                                mostrarAlert('Ciudad no Encontrada');
                                return;
                            }

                            mostrarClima(datos);
                    } )
            }, 1000);
            
    }

    function mostrarClima(datos) {
            
            const {name, main: {temp,temp_max,temp_min}}  = datos;
        
                    const centigrados = convertirGrados(temp);
                    const centigradosMax = convertirGrados(temp_max);
                    const centigradosMin = convertirGrados(temp_min);

                
                    const actual = document.createElement('p');
                    const nombre= document.createElement('p');

                    nombre.textContent = `Clima en ${name}`;
                    nombre.classList.add('font-bold','text-2xl');

                    actual.innerHTML = `${centigrados} &#8451;`;
                    actual.classList.add('font-bold','text-6xl');

                            const max = document.createElement('p');

                    max.innerHTML = `MAX:${centigradosMax} &#8451;`;
                    max.classList.add('text-xl');

                            const min = document.createElement('p');

                    min.innerHTML = `MIN:${centigradosMin} &#8451;`;
                    min.classList.add('text-xl');


                    const resultadoDiv = document.createElement('div');


                    resultadoDiv.classList.add('text-center','text-white');
                    resultadoDiv.appendChild(nombre);
                    resultadoDiv.appendChild(actual);
                     resultadoDiv.appendChild(max);
                      resultadoDiv.appendChild(min);

                    resultado.appendChild(resultadoDiv);

    }

const convertirGrados = grados => parseInt(grados - 273.15);
    

    function limpiarHTML(){

            while(resultado.firstChild){
                resultado.removeChild(resultado.firstChild);
            }

    }

function mostrarAlert(mensaje){

    const alertas = document.querySelector('.bg-red-100');

    if (!alertas) {
            const alert = document.createElement('div');

        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

        alert.innerHTML =`
            <strong class="font-bold">Error</strong>
            <span class="block">${mensaje}</span>
        
        `;

        container.appendChild(alert);

        setTimeout(() => {
                alert.remove();
        }, 3000);
    }

   

}

function spinners() {
    limpiarHTML();
    const DivSpinners = document.createElement('div');

    DivSpinners.classList.add('sk-fading-circle');


    DivSpinners.innerHTML = `
              <div class="sk-circle1 sk-circle"></div>
                <div class="sk-circle2 sk-circle"></div>
                <div class="sk-circle3 sk-circle"></div>
                <div class="sk-circle4 sk-circle"></div>
                <div class="sk-circle5 sk-circle"></div>
                <div class="sk-circle6 sk-circle"></div>
                <div class="sk-circle7 sk-circle"></div>
                <div class="sk-circle8 sk-circle"></div>
                <div class="sk-circle9 sk-circle"></div>
                <div class="sk-circle10 sk-circle"></div>
                <div class="sk-circle11 sk-circle"></div>
                <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(DivSpinners);
}




let statsHeroArray = []

$(function () {
    $('#btnSearch').click(() => {
        searchHero();

    });
});

function searchHero() {
    let numHero = $('#heroInput').val()
    console.log(numHero)
    if (validateNumb(numHero) == false) {
        noValid()
        return
    }

    getHero(numHero)
}

function validateNumb(numero) {
    let expression = /^\d{1,3}$/

    if (expression.test(numero)) {
        return true
    }

    return false
}

function noValid() {
    alert('Error ingreso número SuperHero')
    //$('#heroInput').val('Ingrese número')

}

function getHero(id) {
    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/10225987047762296/${id}`,
        success: function (response) {
            $('#cardHero').empty()
            $('#cardHero').append(printCardHero(response))

            let datapoints = getStats(response)
            statGraphic(getName(response), datapoints)
        },
        error: function (error) {
            console.log(error)
        }

    })
}

function printCardHero(superhero) {
    let card = `
    <div class="col-md-4">
    <img src="${superhero.image.url}" class="img-fluid rounded-start" style=" width: 7.5rem; padding: 10px 0 0 1.25rem;" alt="superhero.jpg">
    </div>
    <div class="col-md-8">
        <div class="card-body" class="opacity-0">
            <h5 class="card-title">Nombre: <span style="font-family: 'Permanent Marker', cursive;background-color: transparent;">${superhero.name}</span> </h5>
            <p class="card-text">Conexiones: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive; background-color: transparent;">${superhero.connections['group-affiliation']}</span></p>
            <ul class="list-group list-group-flush" style= "background-color: transparent;">
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Publicado por</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;background-color: transparent;">${superhero.biography.publisher}</span></li>
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Ocupación</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;">${superhero.work.occupation}</span></li>
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Primera Aparición</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;">${superhero.biography['first-appearance']}</span></li>
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Altura</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;">${superhero.appearance.height}</span></li>
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Peso</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;">${superhero.appearance.weight}</span></li>
                <li class="list-group-item" style= "background-color: transparent; border: none;"><span class="span-list">Alianzas</span>: <span style= "font-size: 0.75rem; font-family: 'Permanent Marker', cursive;">${superhero.biography.aliases}</span></li>
            </ul>
        </div>
    </div>
    `
    return card
}


function statGraphic(nameHero, datapoint) {
    
    var options = {

        height: 300,
        theme: "light2",
        
        title: {
            text: `Estadísticas de Poder para ${nameHero}`,
            fontSize: 20,
        },
        data: [{
            type: "pie",
            startAngle: 45,
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} ({y})",
            yValueFormatString: "#,##0.#" % "",
            dataPoints: datapoint
        }]
    };

    console.log(checkDatapoint(datapoint))

    if (checkDatapoint(datapoint)) {
        
        $("#chartHero").CanvasJSChart(options);
    }
    else {
        alert("Aviso: No se pudo generar gráfico de stats")
        document.getElementById('chartHero').innerHTML =  '<p>Sin datos para graficar</p>'
       
    }
    
}

function getName(superhero) {
    return nameHero = superhero.name
}

function getStats(shero) {
    let statHero = []

    for (key in shero.powerstats) {
        statHero.push({ label: key, y: shero.powerstats[key] })

    }

    return statHero

}

function checkDatapoint(datapoint) {
    let valid = true
    datapoint.forEach(function(data) {
        console.log(data)
        
        if(data.y == 'null'){
            console.log(data.y == 'null')
            valid = false
        }
    })
    console.log(valid)
    return valid
}
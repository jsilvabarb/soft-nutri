

        // localStorage.setItem('token', "<%= JSON.stringify(token) %>");
        localStorage.setItem('token', "<%=token%>");
        localStorage.setItem('idNutri', "<%=id%>");

        var idDieta = null;        
        
        async function makeRequest(url, method, payload) {
            var jwtToken = localStorage.getItem('token');
    
            if(jwtToken) {
                // headers['Authorization'] = 'Bearer ' + jwtToken;
                var content = 'Bearer ' + jwtToken;
                var myHeader = new Headers();
                myHeader.append('Authorization', content)

            }
    
          return response = await fetch(url, {
                method: method,
                mode: 'cors',
                headers: myHeader,
                body: payload
            });
    
        }
    
        function preparaPayload(nomeFormulario) {
            // Aqui prepara o payload para ser enviado no makeRequest
            // Desenrolar a busca dos campos no formulario indicado.
            payload = 'texto';

            return payload;
        }

        function loggoff() {
            localStorage.removeItem('token');
        }

        function carregaDietas_emTexto() {

            var dietas = makeRequest('http://localhost:3000/nutricionistas/<%=id%>/dietas', 'GET');
            dietas.then(function(response) {
                //console.log("contentType: " + response.headers.get("content-type"));
                response.text().then(function (textoRecebido) {
                    console.log("textorecebido:" + textoRecebido);
                    document.getElementById("resultado").innerHTML = textoRecebido;
                });
            });
            
        }


        
        function carregaDietas() {

            var dietas = makeRequest('http://localhost:3000/nutricionistas/<%=id%>/dietas', 'GET');
            dietas.then(function(response) {
                response.json().then(function(retornoJSON) {
        
                    console.log(retornoJSON);
                    console.log(retornoJSON.nome);
                })
            });

        }

        // function exemploArrayJson() {
        //     var nutris = makeRequest('http://localhost:3000/nutris', 'GET');
        //     nutris.then(function(response) {
        //         response.json().then(function(vetorDeNutris) {
        //             console.log(vetorDeNutris);
        //             console.log(vetorDeNutris.length);
        //             vetorDeNutris.forEach(nutricionista => {
        //                 var elementoPre = document.createElement("pre");
        //                 elementoPre.innerHTML = nutricionista.nome + " " + nutricionista.email;
		// 	            document.getElementById("listaNutris").appendChild(elementoPre);                 
        //             });
        //         });
        //     });
        // }

        function showDietas() {
            var dieta = [];
            var cont = 0;
            var nutris = makeRequest('http://localhost:3000/dietas/<%=id%>', 'GET');
            nutris.then(function(response) {
                response.json().then(function(nutriDieta) {
                    console.log(nutriDieta);
                    console.log(nutriDieta.dieta);
                    nutriDieta.dieta.forEach(Dieta => {
                        var elementoPre = document.createElement("pre");
                        elementoPre.setAttribute('onclick', 'showDetalhesDieta();')
                        elementoPre.innerHTML = nutriDieta.dieta[cont].descricao;
                        idDieta = "/"+ nutriDieta.dieta[cont].id;
                        document.getElementById("listaDietas").appendChild(elementoPre);   
                         cont++;             
                    });
                });
            });
        }

        function showDetalhesDieta() {
            var items = [];
            var cont = 0;

            var detailDieta = makeRequest('http://localhost:3000/dietas/itens/1', 'GET');
            detailDieta.then(function(response) {
                response.json().then(function(detailDieta) {
                    console.log(detailDieta);
                    console.log(detailDieta.dietaItem);
                    detailDieta.forEach(Item => {
                        var elementoPre = document.createElement("pre");
                        elementoPre.innerHTML = Item.id_alimento + Item.descricao + Item.tipo ;
                        document.getElementById("listaDietas").appendChild(elementoPre);   
                         cont++;             
                    });
                });
            });


        }
        function showConsultas() {
            var meses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

            var now = new Date();
            var year = now.getFullYear();
            var mounth = meses [now.getMonth()];
            var day = now.getDate();
            var date = '"/'+ year +'-' + mounth + '-' + day +'"';    
            var url = '/nutris/consultas/<%=id%>'+ date;
            var cont = 0;

            var nutris = makeRequest(url, 'GET');
            nutris.then(function(response) {
                response.json().then(function(nutriConsultas) {
                    console.log(nutriConsultas);                   
                    if(nutriConsultas.length > 0) {
                        var dataCosulta = '';
                        nutriConsultas.forEach(Consulta => {
                            var elementoPre = document.createElement("pre");

                            var dataAndHora = Consulta.data;

                            var parts = dataAndHora.split('T');

                            var [data, hora] = parts;

                            var partsData = data.split('-');
                            var partsHora = hora.split('.')

                            dataCosulta = partsData[2] +"/"+ partsData[1] +"/"+ partsData [0];
                            var horaConsulta = partsHora[0];

                            elementoPre.innerHTML = "<br> Paciente:  "+ Consulta.nome + " "+ Consulta.sobrenome + " |Horário: "+  horaConsulta;                 
                            document.getElementById("listaconsultas").appendChild(elementoPre);
                            cont++;
                        });
                        //document.getElementById("listaconsultas").innerText = dataCosulta;
                    } else {
                        var elementoPre = document.createElement("pre");
                        elementoPre.innerHTML = "Você não possui nenhuma consulta marcada para hoje";                 
                        document.getElementById("listaconsultas").appendChild(elementoPre);
                    }
                });
            });
        }  
        
        function showPacientes() {
            var url = '/consultas/pacientes/<%=id%>';

            var pacientes = makeRequest(url, 'GET');
            pacientes.then(function(response) {
                response.json().then(function(pacientesNutri) {
                    console.log(pacientesNutri);                   
                    pacientesNutri.forEach(Paciente => {
                        var elementoPre = document.createElement("pre");
                        elementoPre.setAttribute('onclick', 'showDetalhesPaciente();');
                        elementoPre.innerHTML = Paciente.nome +" "+ Paciente.sobrenome;                 
                        document.getElementById("listaPacientes").appendChild(elementoPre);
                    });
                });
            });
        }

        function showDetalhesPaciente() {
            var pacientes = makeRequest('/detalhespaciente', 'GET');
            pacientes.then(function(response){
                response.redirected;
            });
        }

        showConsultas();
    
	<!-- creating on click action for button -->
		let spawnButton = document.querySelector("button");
		spawnButton.addEventListener('click',spawnList);
		
		
		<!-- create function to generate list of countries with codes -->
        async function spawnList(){
		<!-- used axios to retrieve list of countries provided by a free REST API -->
            let countryList= (await axios.get("https://api.first.org/data/v1/countries")).data.data;
			
			<!-- returns array of the keys and values of countries -->
            let countryCodes=Object.keys(countryList);
            let countryNames=Object.values(countryList);
            let totalCountries=countryCodes.length;
			
			<!-- initialize max list length -->
			let listLength=25;
			
			<!-- create variables for random list -->
            let randomList=[];
            let storage=[];
			
		    <!-- Generates random list -->
            for(let i=0;i<listLength;i++){
                rand=generateRandom(totalCountries,storage);
                let holder={
                    [countryCodes[rand-1]]:countryNames[rand-1]
                }
                randomList.push(holder);
            }
            createList(randomList,countryCodes,countryList);
        }
		
<!-- returns random countries out of the total list -->
        let generateRandom=(totalCountries,storage)=>{
            let rand=Math.floor(Math.random()*totalCountries+1);
			
			<!-- increase the count by 1 for each country iteration -->
            for(let i=0;i<storage.length;i++){
                if(storage[i]==rand){
                    return generateRandom(totalCountries,storage);
                }
            }
            storage.push(rand);
            return rand;
        }
		
<!-- function to make sure countries are unique -->
        let createList=(list,countryCodes,countries)=>{
            let html=document.querySelector('.countries');
            html.innerHTML='';
            list.map(country=>{
                let code=Object.keys(country)[0];
                countryCodes=countryCodes.filter(c=>c!==code)
                let countryName=Object.values(country)[0].country;
                let template=`<li><span style="font-weight:bold;">${code}</span> ${countryName}</li>`;
                html.innerHTML+=template;
            })
            countryCodes.forEach(code=>console.log(countries[`${code}`].country))
        }


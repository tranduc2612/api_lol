const URL_CHAMP = "http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US";
const URL_CHAMP_DETAIL =
	"http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion";
const URL_IMG = "https://ddragon.leagueoflegends.com/cdn/img/champion";
const champList = document.querySelector(".content");
class App {
	dataChamp = [];
	getNameChamp() {
		return fetch(URL_CHAMP + "/champion.json")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data.data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getDetailChamp(nameChamp) {
		return fetch(URL_CHAMP_DETAIL + `/${nameChamp}.json`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data.data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getImageChamp(nameChamp) {}

	async loadChamp() {
		let str = "";
		const object = await this.getNameChamp();

		this.dataChamp = Object.values(object).map((e) => {
			return {
				id: e.id,
				title: e.title,
				image: e.image,
				name: e.name,
				partype: e.partype,
				blurb: e.blurb,
				info: e.info,
				stats: e.stats,
				key: e.key,
			};
		});

		this.dataChamp.map((e) => {
			str += `<div class=" col-4 ms-3 me-3 mb-3 p-2 card" style="width: 18rem" name-champ=${e.id}>
            <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${e.id}_0.jpg" class="card-img-top" alt="" />
            <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">
                    ${e.blurb}
                </p>
                <a name-champ="${e.id}" href="#" class="btn btn-primary btn-detail">See detail</a>
            </div>
        </div>`;
		});

		champList.innerHTML = str;
		this.eventDetails();
	}

	eventDetails() {
		const btnDetail = document.querySelectorAll(".btn-detail");
		btnDetail.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				e.preventDefault();
				const nameChamp = elem.getAttribute("name-champ");
				this.getDetailChamp(nameChamp)
					.then((res) => {
						const data = Object.values(res);
						data.map((e) => {
							let str = `<div class="container d-flex justify-content-center flex-column">
                            <h1>${e.name}</h1>
                            <div
                                id="carouselExampleControls"
                                class="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div class="carousel-inner">
                                    
                                </div>
                                <button
                                    class="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="prev"
                                >
                                    <span
                                        class="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button
                                    class="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="next"
                                >
                                    <span
                                        class="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
        
                        <div class="accordion accordion-flush mt-5" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                        Introduce
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div class="accordion-body">
                                    ${e.lore}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                    >
                                        Information in-game
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseTwo"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div class="accordion-body">
                                        <h1>Attack: ${e.info.attack}</h1>
                                        <h1>Defense: ${e.info.defense}</h1>
                                        <h1>Magic: ${e.info.magic}</h1>
                                        <h1>Difficulty: ${e.info.difficulty}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThree">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseThree"
                                    >
                                        Ability
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseThree"
                                    class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div class="accordion-body ability-list">
                                        

                                      
                                    </div>
                                </div>
                            </div>
                        </div>`;

							let strImg = "";

							let strSpell = "";

							e.skins.map((img) => {
								let isActive = "";
								if (img.num == 0) {
									isActive = "active";
								} else {
									isActive = "";
								}
								strImg += `<div class="carousel-item ${isActive}">
                                <img
                                    src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${e.id}_${img.num}.jpg"
                                    class="d-block w-100"
                                    alt="..."
                                    style="object-fit: contain"
                                    height="600"
                                />

                                <h1>${img.name}</h1>
                            </div>`;
							});

							e.spells.map((spell) => {
								strSpell += `<div class="ability-item d-flex align-items-center mb-3">
                                <image src="http://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${spell.id}.png" alt=""/>
                                <p class="ms-3">${spell.description}</p>
                            </div>`;
							});

							champList.innerHTML = str;
							const spellElem = document.querySelector(".ability-list");
							const elemImg = document.querySelector(".carousel-inner");
							spellElem.innerHTML = strSpell;

							elemImg.innerHTML = strImg;
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	}

	start() {
		this.loadChamp();
	}
}

const app = new App();
app.start();

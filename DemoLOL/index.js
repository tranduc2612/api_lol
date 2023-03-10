const API_KEY = "RGAPI-d780b2d9-f2e7-4473-bc35-a708e73bf995";

const StringAPi = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/123/${API_KEY}`;

fetch(
  "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/123?api_key=RGAPI-d780b2d9-f2e7-4473-bc35-a708e73bf995"
)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));

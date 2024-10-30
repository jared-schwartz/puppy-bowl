const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");



describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    const fetchAllPlayersData = {data:{players: [{ id: 1, name: "Item One" }, { id: 2, name: "Item Two" }, ]}}; 
    global.fetch = jest.fn(() => Promise.resolve({ ok : true,json: () => Promise.resolve(fetchAllPlayersData), }) );
    players = await fetchAllPlayers();
    console.log(players);
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});
// TODO: Tests for `fetchSinglePlayer`

describe("fetchSinglePlayer", ()=> {
  let player;
  beforeAll(async () => {
    const Data = {data:{player: {id: 1, name:""}}};
    global.fetch = jest.fn(() => Promise.resolve({ ok : true,json: () => Promise.resolve(Data), }));
    player = await fetchSinglePlayer(1);
  })
  test("returns player with id and name", async () => {
    expect(player).toHaveProperty("name");
    expect(player).toHaveProperty("id");
  })
})

// TODO: Tests for `addNewPlayer`
describe("addNewPlayer", ()=> {
  let player;
  beforeAll()
})

// (Optional) TODO: Tests for `removePlayer`
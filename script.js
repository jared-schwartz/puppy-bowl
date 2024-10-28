// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2408-FTB-MT-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const players = [];
/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
*/
const fetchAllPlayers = async () => {
  try {
    const response = await fetch (`${API_URL}/players`);
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const obj = await response.json();
    console.log(obj.data);
    console.log (players);
    return obj.data.players || [];
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return [];
  }
};
 


/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch (`${API_URL}/${playerId}`);
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const data = await response.json();
    return data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });

    const addedPlayer = await response.json(); 
    return addedPlayer; 

  } catch (err) {
    console.error('Whoops, trouble adding the player!', err);
  }
};
/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: 'DELETE',
    });
    }
  catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  const main = document.querySelector('.main');
  main.innerHTML = '';

// Create Player Card
  playerList.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');
// Add Player Name
    const playerName = document.createElement('h2')
    playerName.textContent = player.name;
    playerCard.appendChild(playerName)
// Player Image with alt text
    const playerImage = document.createElement('img');
    playerImage.src = player.imageUrl;
    playerImage.alt = player.name;
    playerCard.appendChild(playerImage);
// Player details button
    const seeDetailsButton = document.createElement('button');
    seeDetailsButton.textContent = 'See Details!';
    seeDetailsButton.addEventListener('click', () => {
      renderSinglePlayer(player.id);
    });
    playerCard.appendChild(seeDetailsButton);
// Remove player button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove from roster';
    removeButton.addEventListener('click', async () => {
      await removePlayer(player.id);
      const updatedPlayers = await fetchAllPlayers();
      renderAllPlayers(updatedPlayers);
    });
    playerCard.appendChild(removeButton);

    main.appendChild(playerCard);
  });
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
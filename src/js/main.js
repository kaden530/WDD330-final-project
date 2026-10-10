import { loadHeaderFooter } from './utils.mjs';
import DndApi from "./D&DAPI.js";
import Open5eApi from "./Open5eAPI.js";

const api = new DndApi();
const openApi = new Open5eApi();
const monsters = await api.getMonsters();
const openMonsters = await openApi.fetchAllCreatures(5); // Example: Fetch monsters in the forest environment


console.log(openMonsters);
loadHeaderFooter();

import { GeometryDash } from './lib/GeometryDash/Source';
import { FilePersistence } from './lib/State';

const gd = new GeometryDash(new FilePersistence('data/state.json'));

let res;

// res = await gd.getGJGauntlets()
res = await gd.getGJTopArtists();

console.log(res);

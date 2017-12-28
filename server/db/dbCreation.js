import { menus } from './models';

for(let [key, item] of Object.entries(menus)) {
    item.save(function(err) {
        if(err) {
            console.log("Failed to save " + key);
            return console.error(err);
        }
        else {
            console.log("Succeeded to save " + key);
        }
    });
}

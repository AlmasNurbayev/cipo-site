




export default function goto(history ,location, e, id, path) {
    
    //console.log(location.pathname);
    let hero = document.getElementById(id);
    e.preventDefault();  // Stop Page Reloading
    if (location.pathname === '/') {
        hero && hero.scrollIntoView();
    } else {
        history(path);
    }
    if (path) {
        history(path);
    }

}
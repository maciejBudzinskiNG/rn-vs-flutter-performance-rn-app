const shuffle = list => {
    for (let i = list.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * i+1);
        const temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return [...list];
}

const sort = list => {
    list.sort((a, b) => a.id > b.id);
    return [...list];
}

export {
    shuffle,
    sort
}

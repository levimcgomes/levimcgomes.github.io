export const sortByDate = (a, b) => {
    a = a.frontmatter.date.split("/")
    b = b.frontmatter.date.split("/")
    let date1 = new Date(`${a[2]}-${a[1]}-${a[0]}`);
    let date2 = new Date(`${b[2]}-${b[1]}-${b[0]}`);

    let comp = 0;

    if (date1 < date2) {
        comp = 1;
    } else if (date1 > date2) {
        comp = -1;
    }
    return comp;
}
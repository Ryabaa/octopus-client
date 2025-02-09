export default (items: any) => {
    return items.filter((item: any) => item.availability > 0).length;
};



const mountArff = (json) => {
    const relation = '@relation analysis';
    const data = '@data';
    const newLine = '\r\n';
    const newAttribute = '@attribute';
    const numeric = 'numeric';

    const arff =
        `
    ${relation}${newLine}
    ${newLine}
    ${newAttribute}
    `
}
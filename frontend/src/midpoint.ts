/**
 * simple midpoint displacement implementation
 * @param numStartVals number of starting points for the terrain
 * @param iterations number of iterations to divide the terrain through
 * @return midpoint displaced array
 */
export default function midpoint(numStartVals: number, iterations: number, rng: seedrandom.prng): Array<number> {
    let arr: Array<number> = [];
    for (let i = 0; i < numStartVals; i++) {
        arr.push(rng());
    }

    let origArr = arr;
    let mdArr = [];
    let decayFactor = 0.5;
    let midval = 0;
    for (let i = 0; i < iterations; i++) {
        origArr.map((val, j) => {
            if (j === 0) {
                mdArr.push(val);
                return;
            }
            midval = (val + origArr[j - 1]) / 2 + 
                (rng() - 0.5) * decayFactor;
            if (midval > 1) midval = 1;
            mdArr.push(midval);
            mdArr.push(val);
        });
        origArr = mdArr;
        decayFactor *= 1.1;
    }

    return origArr;
}
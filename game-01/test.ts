import { Game01 } from './game-01';
const M = [2, 5, 8, 14, 0];
const N = 10;

const result = Game01.findPairWithSum(M, N);

if (result) {
    console.log(`The pair of numbers that add up ${N} is: [${result[0]}, ${result[1]}]`);
} else {
    console.log(`No pair found to add ${N}`);
}

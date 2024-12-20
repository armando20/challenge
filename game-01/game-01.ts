export class Game01 {
    // Method that receives an array of numbers and a value N
    static findPairWithSum(M: number[], N: number): number[] | null {
        const seen = new Set<number>();

        // We iterated on the M arrangement
        for (let i = 0; i < M.length; i++) {
            const currentNumber = M[i];
            const complement = N - currentNumber;

            // If the complement is already in the set, we return the pair
            if (seen.has(complement)) {
                return [complement, currentNumber];
            }

            // If not, we add the current number to the set
            seen.add(currentNumber);
        }

        // If we don’t find the pair, we return null
        return null;
    }
}

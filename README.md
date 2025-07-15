# Modified Text Processing kata

## Iterations:

1. Indicate that the analysis is case-insensitive (it's case-sensitive by default). Use the `caseInsensitive` parameter (hint
   use `caseInsensitive=false`).

2. Don't show some words using the `excludedWords` parameter (hint use
   `excludedWords=pepe,koko`).

3. Don't show infrequent words. Indicate the minimum frequency to show using the `freqAbove` parameter (hint use
   `freqAbove=3`).

4. Indicate the maximum number of words to show. Use the `wordsListed` parameter  (hint use `wordsListed=2`).

## Testing the endpoint manually.

   To run the server: `ts-node src/api/server.ts`

   To manually test de endpoint:
   `curl "http://localhost:3000/v1/analysis?text=pipa+hello+world+world+hello+koko+pepe+chacha+pipa+pipa+chacha&excludedWords=pepe,koko&freqAbove=1&wordsListed=3"`

For instance, once all functionality is done, if the endpoint receives a request like:

GET "www.textitos.es/v1/analysis?text=pipa+hello+world+world+hello+koko+pepe+chacha+pipa+pipa+chacha&excludedWords=pepe,koko&freqAbove=1&wordsListed=3"

that corresponds to the `Input`
`{text: "pipa hello world world hello koko pepe chacha pipa pipa chacha", options = {minFreq: 2, max: 3, noShow: ["pepe", "koko"]}}`,

it will produce the following JSON response:

`{"analysis":{"countedWords": 11, "wordsWithFrequency": [{"word": "pipa", "frequency": 3}, {"word": "hello","frequency": 2}, {"word": "world", "frequency": 2}]}}`

## Constraints.

- Introduce variations in behavior by composition, not modification of the existing code.

- Options are not exclusive, they may all work together.

### Tools

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

### Acknowledgements

Thanks to Matheus Marabesi and Emmanuel Valverde for the
original [Text Processing kata](https://www.codurance.com/katas/text-processing).

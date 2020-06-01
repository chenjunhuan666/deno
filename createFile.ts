const encoder = new TextEncoder()

const greetText = encoder.encode('hello deno \ni like use it')

await Deno.writeFile('greet.txt',greetText)
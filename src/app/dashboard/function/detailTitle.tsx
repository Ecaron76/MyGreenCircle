export function calculateDetailTitle(word: string) {
  const vowels = ["a", "e", "i", "o", "u", "h"];
  const firstLetter = word[0].toLowerCase();

  if (vowels.includes(firstLetter)) {
    return "de l’";
  } else {
    return "du ";
  }
}

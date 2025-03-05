

export class MathComponent {
    getRandomInt() {
        var minimum = 1
        var maximum = 5
    
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      }
}
  
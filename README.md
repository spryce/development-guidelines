# development-guidelines
An example of some development guidelines that I provided to my team after performing a couple of code reviews many years ago.


## Return Early
This is a real-world example of refactoring to remove nesting, reduce code complexity, and enhance readability and maintainability

The basic principle is a shift in mindset. Rather than checking if a condition is true and then performing some work or returning, you should instead check if it is false and exit the function as early as possible.

## Avoid nested promises
The codebase we inherited had many anti-pattern examples of nested promises that proved difficult to maintain. I provided an example for future development and refactoring purposes.
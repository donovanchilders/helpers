# AnyArrayNeedlesInHaystack

Just a simple piece of script to check if any items from an array exist in a block of text.

## Example

```javascript
let needles = ['"', '[', ']'];
let result = anyArrayNeedlesInHaystack(needles, 'This is a [test]');
let result2 = anyArrayNeedlesInHaystack(needles, 'This is a ~~test~~');

console.log(result); // true
console.log(result2); // false
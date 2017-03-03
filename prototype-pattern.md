# Prototype Pattern Pros & Cons

## Pros
- Leverage JavaScript's built-in prototyping feature
- Modularize code into re-useable object
- Variables/functions taken out of global namespace
- Functions loaded into memory once
- Possible to "override" functions through prototyping

## Cons
- Uses "this" which may be tricky
- It has two parts: constructor is separate from protoype definition

# Prototype Pattern Structure

```
var Calculator = function(eq) {
    this.eqCtl = document.getElementById(eq);
};

Calculator.protoype = {
    add: function (x, y) {
        var val = x + y;
        this.eqCtl.innerHTML = val;
    }
}
```


- These are notes from the Pluralsight Structuring JavaScript Code Course by Dan Wahlin
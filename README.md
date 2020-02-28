# Sketches Website

This is the branch `database` that will be used to develop a database backend to the website.

## Creating a new sketch
1. Copy the file `template.js` into a new folder under `./sketches`.
2. Create a new unique id for that sketch and and replace the template at the top.
3. Add the database entry with the unique_id as `variableName`.

## Sketch View Level
```
0 - Default: Only the sketches with NULL
1 - Series: Default + sketches for Series
2 - Placeholder: Series + Placeholder
3 - Hidden: Placeholder + Hidden (All)
```


# tailwind-css-prefix-remover

This repository provides a TypeScript function called `tcpr` (Tailwind CSS Prefix Remover) that helps remove duplicated prefixes from class names and ensures that only one class with a specific prefix is included in the final output.

## Example

```tsx
...
const className = "w-20"
...

<div className="mt-2">
    <input
      ...
      className={tcpr(`
        block
        w-full
        ...
        mb-2`, className)}
    />
</div>
```

After calling the `tcpr` function, the resulting class name will look like this:

```diff
<div className="mt-2">
    <input
      ...
      className={`
        block
-       w-full
        ...
        mb-2
+       w-20
        `}
    />
</div>
```

<br />

The provided code is a TypeScript function called `tcpr` that takes a list of classes as arguments and returns a string containing unique class names. It removes duplicated prefixes from the class names and combines classes with the same prefix.

<br />


```ts
/**
 * Takes a list of classes as arguments and returns a string containing unique class names.
 * If a class name starts with a prefix that has already been included, the previous class with the same prefix is replaced.
 * @param classes - An array of strings representing class names.
 * @returns A string containing unique class names.
 * 
 * Author: Ala GARBAA - www.AlaGARBAA.com
 *
 */
export function tcpr(...classes: (string | undefined)[]) {
  // Filter out undefined and non-string values from the classes array
  const filteredClasses = classes.filter((c) => typeof c === "string");

  // Join the filtered class names with a space to create a string
  const classnames = filteredClasses.filter(Boolean).join(" ");

  // Initialize an array to store the final result
  const result: string[] = [];

  // Initialize an object to keep track of included prefixes
  const classnameMap: { [key: string]: boolean } = {};

  // Split the classnames string into an array of individual class names
  const classNamesArray = classnames.split(" ");

  // Iterate over each class name
  for (const classname of classNamesArray) {
    // Check if the class name contains one dash ("-")
    const firstDashIndex = classname.indexOf("-");

    if (firstDashIndex === -1) {
      // If the class name doesn't contain a dash, add it to the result array
      result.push(classname);
      continue;
    }

    // Find the index of the last occurrence of the dash ("-") in the classname
    const lastDashIndex = classname.lastIndexOf("-");

    // Extract the prefix substring from the start of the string (index 0) until the index before the last dash
    const prefix = classname.substring(0, lastDashIndex);

    if (!classnameMap.hasOwnProperty(prefix)) {
      // If the prefix is not included in the classnameMap, add the class name to the result array
      classnameMap[prefix] = true;
      result.push(classname);
    } else {
      // If the prefix is already included, find the previous class with the same prefix and replace it with the current class
      const index = result.findIndex((name) => name.startsWith(prefix));
      if (index !== -1) {
        result.splice(index, 1);
        result.push(classname);
      }
    }
  }

  // Join the result array into a string with spaces between class names
  return result.join(" ");
}

```

<br />
<br />

## How it works

The `tcpr` function takes an array of class names as arguments and performs the following steps:

1. Filters out any undefined or non-string values from the array.
2. Joins the filtered class names together with spaces to create a string.
3. Initializes an empty array called `result` to store the final unique class names.
4. Initializes an empty object called `classnameMap` to keep track of included prefixes.
5. Splits the class names string into an array of individual class names.
6. Iterates over each class name in the array.
7. If a class name doesn't contain a dash ("-"), it is added directly to the `result` array.
8. If a class name contains a dash ("-"), the code extracts the prefix substring from the start of the string until the index before the last dash.
9. If the prefix is not included in the `classnameMap`, the current class name is added to the `result` array, and the prefix is added to the `classnameMap` object.
10. If the prefix is already included in the `classnameMap`, the code finds the previous class with the same prefix in the `result` array, replaces it with the current class name, and updates the `result` array accordingly.
11. Finally, the `result` array is joined into a string with spaces between the class names, and the resulting string is returned.

This function can be helpful when working with styling frameworks like Tailwind CSS to generate class names with unique prefixes and avoid duplication.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please feel free to open an issue or submit a pull request.

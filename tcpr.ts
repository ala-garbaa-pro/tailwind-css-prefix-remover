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

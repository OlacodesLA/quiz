export function getKeysWithEmptyValues(obj: any) {
  const keysWithEmptyValues = Object.keys(obj).filter((key) => obj[key] === "");
  return keysWithEmptyValues.join(", ");
}

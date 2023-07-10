export const generateUUID = (): string => {
  const uuid = URL.createObjectURL(new Blob()).split('/').at(-1);
  if (uuid) {
    URL.revokeObjectURL(uuid);
    return uuid;
  }
  return `${(new Date().getTime() - 3).toString(16)}-${(new Date().getTime() - 2).toString(16)}-${(new Date().getTime() - 1).toString(16)}-${new Date().getTime().toString(16)}`;
}

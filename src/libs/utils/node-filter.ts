import { NodeVersionDataModel } from "../models";

export const isLTS = (element: NodeVersionDataModel): boolean => {
  const lts = element.lts;
  switch (typeof lts) {
    case "boolean":
      return lts;
    case "string":
      return true;
    default:
      return false;
  }
};

export const parseVersion = (
  versionStr: string,
): { major: number; minor: number; patch: number } | null => {
  const match = versionStr.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    return null;
  }
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
};

export const isCurrent = (element: NodeVersionDataModel): boolean => {
  if (isLTS(element)) {
    return false;
  }

  const version = parseVersion(element.version);
  const benchmark = { major: 1, minor: 0, patch: 0 };

  if (!version || !benchmark) {
    return false;
  }

  if (
    version.major < benchmark.major ||
    (version.major === benchmark.major && version.minor < benchmark.minor) ||
    (version.major === benchmark.major &&
      version.minor === benchmark.minor &&
      version.patch < benchmark.patch)
  ) {
    return false;
  }

  return true;
};

export const isStable = (element: NodeVersionDataModel): boolean => {
  if (isCurrent(element)) {
    return false;
  }

  const version = parseVersion(element.version);
  if (!version) {
    return false;
  }

  if (version.major !== 0) {
    return false;
  }

  return version.minor % 2 === 0;
};

export const isUnstable = (element: NodeVersionDataModel): boolean => {
  if (isStable(element)) {
    return false;
  }

  const version = parseVersion(element.version);
  if (!version) {
    return false;
  }

  if (version.major !== 0) {
    return false;
  }

  return version.minor % 2 !== 0;
};

import { Project } from "../../types";
import { generateRandomString } from "../../utils";

export default function projectFactory(
  projectFields: Omit<Project, "id">
): Project {
  return {
    id: generateRandomString(8),
    ...projectFields,
  };
}

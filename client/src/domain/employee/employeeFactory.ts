import { Employee } from "../../types";
import { generateRandomString } from "../../utils";

export default function employeeFactory(
  employeeFieds: Omit<Employee, "id">
): Employee {
  return {
    id: generateRandomString(8),
    ...employeeFieds,
  };
}
